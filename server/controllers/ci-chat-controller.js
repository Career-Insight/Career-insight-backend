const OpenAIApi = require('openai');
const userRoadMap = require('../models/RoadMap')
const User = require("../models/userModel");
const Market = require('../models/Market')
require('dotenv').config();

const openai = new OpenAIApi({
    apiKey: process.env.OPENAI_API_KEY
});

const generateRoadmap = async (req, res, next) => {
    try {
        const {
            userId,
            formData
        } = req.body;
        console.log(userId, formData);

        const track = formData.path;
        console.log(track);


        let focusArea = 'the specified area';
        const keysToCheck = ['option', 'framework'];

        for (const key of keysToCheck) {
            if (formData[track] && formData[track][key]) {
                focusArea = formData[track][key];
                break;
            }
        }
        console.log(focusArea);
        //this need to change 
        const understandingLevel = formData.understandingLevel || 'basic understanding';
        console.log(understandingLevel);

        const skillData = await Market.findOne({ track: track.toLowerCase() });
        console.log(skillData);
        if (!skillData) {
            return [];
        }
        console.log(skillData);

        const inDemandSkills = Object.keys(skillData.skills)
        console.log(inDemandSkills);
        const inDemandSkillsList = inDemandSkills.join(', ');
        console.log(inDemandSkillsList);

        const userMessageContent = `
        I am looking to enhance my knowledge and skills in ${track},
        with a specific focus on ${focusArea}. While ${understandingLevel} in ${track},
        I am eager to deepen my expertise in this area. I am interested in understanding how external factors such as industry trends, technological advancements,
        and economic conditions may impact my educational journey in ${track}. Could you please create a roadmap or learning plan that aligns with the current demands of the market?
        The most in-demand skills for a ${track} include ${inDemandSkillsList}. I would appreciate it if you could support your recommendations with data, specifically showcasing the
        percentage of companies using ${track} practices, the year-over-year increase in demand for ${track}, and the average salary for ${track}.
        Please provide your response in JSON format for clarity and readability.
        `;
        const response = await openai.chat.completions.create({
            model: 'ft:gpt-3.5-turbo-0125:personal::9ZHgO91t:ckpt-step-26',
            messages: [
                {
                    role: 'system',
                    content: "As a instructive, help me to generate roadmap or learning path suitable with market demand in IT field.  provide it in a JSON dict"
                },
                {
                    role: 'user',
                    content: userMessageContent
                }
            ],
            max_tokens: 1000,
        });

        const roadmapContent = response.choices[0].message.content;
        console.log(roadmapContent);

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