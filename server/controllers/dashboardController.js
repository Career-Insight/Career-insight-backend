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

// Anlysis 3 : Get Frontend technologies dynamic
const frontendDistrubtion = async (req, res, next) => {
    const { count } = req.params;
    const topCount = parseInt(count);

    try {
        if (isNaN(topCount) || topCount <= 0) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Invalid count parameter. Please provide a positive integer.' });
        }

        if(topCount > 14) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Invalid count parameter. We only have 14 frontend frameworks.' });
        }

        const result = await Result.aggregate([
            { $project: { frontend_technologies_distribution: { $objectToArray: '$frontend_technologies_distribution' } } },
            { $unwind: '$frontend_technologies_distribution' },
            { $sort: { 'frontend_technologies_distribution.v': -1 } },
            { $limit: topCount },
            { $group: { _id: null, top_languages: { $push: '$frontend_technologies_distribution' } } },
            { $project: { _id: 0, top_languages: 1 } }
        ]);

        res.status(StatusCodes.OK).json(result[0].top_languages);
    } catch (error) {
        next(error);
    }
}

// Anlysis 4 : Get Backend technologies dynamic
const backendDistrubtion = async (req, res, next) => {
    const { count } = req.params;
    const topCount = parseInt(count);

    try {
        if (isNaN(topCount) || topCount <= 0) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Invalid count parameter. Please provide a positive integer.' });
        }

        if(topCount > 55) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Invalid count parameter. We only have 55 backend technologies.' });
        }

        const result = await Result.aggregate([
            { $project: { backend_technologies_distribution: { $objectToArray: '$backend_technologies_distribution' } } },
            { $unwind: '$backend_technologies_distribution' },
            { $sort: { 'backend_technologies_distribution.v': -1 } },
            { $limit: topCount },
            { $group: { _id: null, top_languages: { $push: '$backend_technologies_distribution' } } },
            { $project: { _id: 0, top_languages: 1 } }
        ]);

        res.status(StatusCodes.OK).json(result[0].top_languages);
    } catch (error) {
        next(error);
    }
}

// Anlysis 4 : Get offerings_distribution
const offeringsDistribution = async (req, res, next) => {
    try {
        const result = await Result.aggregate([
            { $project: { offerings_distribution: { $objectToArray: '$offerings_distribution' } } },
            { $unwind: '$offerings_distribution' },
            { $sort: { 'offerings_distribution.v': -1 } },
            { $limit: 3 },
            { $group: { _id: null, top_languages: { $push: '$offerings_distribution' } } },
            { $project: { _id: 0, top_languages: 1 } }
        ]);
        res.status(StatusCodes.OK).json(result[0].top_languages);
        
    } catch (error) {
        next(error)
    }
}



module.exports = { 
    plTopTen,
    pldynamic,
    frontendDistrubtion,
    backendDistrubtion,
    offeringsDistribution
}