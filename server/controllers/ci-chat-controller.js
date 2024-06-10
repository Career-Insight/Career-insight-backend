const OpenAIApi  = require('openai');
require('dotenv').config();

const openai = new OpenAIApi({
    apiKey: process.env.OPENAI_API_KEY
});

const generateRoadmap = async (req, res, next) => {
    try {
        const { prompt } = req.body;

        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo-16k-0613',
            prompt: prompt,
            max_tokens: 150,
        });

        res.json({ response: response.data.choices[0].text });
    } catch (error) {
        console.error('Error communicating with OpenAI API:', error);
        next(error)
    }
}

module.exports = {
    generateRoadmap
}