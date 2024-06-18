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
            messages: [{ role: 'system', content: `content: As an instructor, help me to generate a roadmap or learning path suitable for the market demand in the IT field for${prompt}` }],
            max_tokens: 1000,
        });

        res.json({ response: response.choices[0].message.content});
        console.log(response);
    } catch (error) {
        console.error('Error communicating with OpenAI API:', error);
        next(error)
    }
}

module.exports = {
    generateRoadmap
}