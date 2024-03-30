const Result = require('../models/Result')
const { StatusCodes } = require("http-status-codes");

// General

//  Analysis 1: Get Programming Languages Top 10
const plTopTen = async (req, res, next) => {
    try {
        const result = await Result.aggregate([
            { $project: { programming_languages_distribution: { $objectToArray: '$programming_languages_distribution' } } },
            { $unwind: '$programming_languages_distribution' },
            { $sort: { 'programming_languages_distribution.v': -1 } },
            { $limit: 10 },
            { $group: { _id: null, top_languages: { $push: '$programming_languages_distribution' } } },
            { $project: { _id: 0, top_languages: 1 } }
        ]);
        res.status(StatusCodes.OK).json(result[0].top_languages);
        
    } catch (error) {
        next(error)
    }
}


//  Analysis 2: Get All Programming Languages 
const pldynamic = async (req, res, next) => {
    const { count } = req.params;
    const topCount = parseInt(count);

    try {
        if (isNaN(topCount) || topCount <= 0) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Invalid count parameter. Please provide a positive integer.' });
        }

        if(topCount > 18) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Invalid count parameter. We only have 18 progrmming laguages.' });
        }

        const result = await Result.aggregate([
            { $project: { programming_languages_distribution: { $objectToArray: '$programming_languages_distribution' } } },
            { $unwind: '$programming_languages_distribution' },
            { $sort: { 'programming_languages_distribution.v': -1 } },
            { $limit: topCount },
            { $group: { _id: null, top_languages: { $push: '$programming_languages_distribution' } } },
            { $project: { _id: 0, top_languages: 1 } }
        ]);

        res.status(StatusCodes.OK).json(result[0].top_languages);
    } catch (error) {
        next(error);
    }
}




module.exports = { 
    plTopTen,
    pldynamic
}