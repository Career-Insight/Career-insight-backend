const OpenAIApi  = require('openai');
require('dotenv').config();

const openai = new OpenAIApi({
    apiKey: process.env.OPENAI_API_KEY
});

const generateRoadmap = async (req, res, next) => {
    try {
        const { prompt } = req.body;

        const response = await openai.chat.completions.create({
            model: 'ft:gpt-3.5-turbo-0125:personal::9ZHgO91t:ckpt-step-26',
            messages: [
                {
                    role: 'system',
                    content: `content: As an instructor, help me to generate a roadmap or learning path suitable for the market demand in the IT field for${prompt}` 
                }
            ],
            max_tokens: 1000,
        });

        res.status(200).json({ roadmap: response.choices[0].message.content});
        console.log(response.data);
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