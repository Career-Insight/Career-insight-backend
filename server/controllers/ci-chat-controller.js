const OpenAIApi  = require('openai');
const userRoadMap = require('../models/RoadMap')
const User = require("../models/userModel");
require('dotenv').config();

const openai = new OpenAIApi({
    apiKey: process.env.OPENAI_API_KEY
});

const extractTrackFromPrompt = (prompt) => {
    // Assuming the track is explicitly mentioned in the prompt and follows a specific pattern
    // For example, "I am looking to enhance my knowledge and skills in DevOps..."
    const match = prompt.match(/in (\w+)/i);
    return match ? match[1] : 'IT field'; // Default to 'IT field' if no match is found
};

const generateRoadmap = async (req, res, next) => {
    try {
        const {
                prompt,
                userId
            } = req.body;

        const track = extractTrackFromPrompt(prompt);

        const systemMessageContent = `
        As an instructor, help me generate a detailed and structured roadmap or learning path suitable for the current market demand in the ${track} based on the following user prompt:
        "${prompt}"
        
        The roadmap should focus on enhancing knowledge and skills in ${track}. It should be designed for someone who does not have a basic understanding of ${track} but is eager to deepen their expertise. Include the following:

        - Key areas of study and skills development.
        - Consideration of external factors such as industry trends, technological advancements, and economic conditions.
        - Data-supported recommendations showcasing the percentage of companies using ${track} practices, the year-over-year increase in demand for ${track}, and the average salary for professionals in ${track}.

        Please provide the response in JSON format for clarity and readability.
        `;
        const response = await openai.chat.completions.create({
            model: 'ft:gpt-3.5-turbo-0125:personal::9ZHgO91t:ckpt-step-26',
            messages: [
                {
                    role: 'system',
                    content: systemMessageContent
                }
            ],
            max_tokens: 1000,
        });

        const roadmapContent = response.choices[0].message.content;

        const newRoadmap = new userRoadMap({
            name: `${track} roadmap`,
            completed: false,
            RoadMap: JSON.parse(roadmapContent),
            user_id: userId,
        });

        await newRoadmap.save();

        await User.findByIdAndUpdate(userId, { hasCreatedRoadmap: true });

        res.status(200).json({ roadmap: JSON.parse(roadmapContent) });
    } catch (error) {
        if (error.response) {
            console.error('Error details:', error.response.data);
            res.status(error.response.status).json({
                error: 'Error communicating with OpenAI API',
                details: error.response.data
            });
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
        next(error)
    }
}

module.exports = {
    generateRoadmap
}