const Result = require('../models/Result')
const { StatusCodes } = require("http-status-codes");
const Job = require('../models/Job')
const Company = require('../models/Company')
const Location = require('../models/Location')
const Skill = require('../models/Skill')
const { redisClient } = require('../utils/redis')

// General

//  Analysis 1: Get Programming Languages Top 10
const plTopTen = async (req, res, next) => {
    const cacheKey = req.originalUrl
    try {
        const result = await Result.aggregate([
            { $project: { programming_languages_distribution: { $objectToArray: '$programming_languages_distribution' } } },
            { $unwind: '$programming_languages_distribution' },
            { $sort: { 'programming_languages_distribution.v': -1 } },
            { $limit: 10 },
            { $group: { _id: null, top_languages: { $push: '$programming_languages_distribution' } } },
            { $project: { _id: 0, top_languages: 1 } }
        ]);
        const finalResult = result[0].top_languages

        const cacheValue = JSON.stringify( finalResult );
        await redisClient.set(cacheKey, cacheValue, {EX: 60*60*24}); // expire after one day

        res.status(StatusCodes.OK).json(finalResult);
        
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

//Job posting dashboard 
// Anlyze the frequency of  job posting over time (mothly, yearly, country):
const frequencyOfJob = async (req, res, next) => {
    const { year, month, country } = req.query;
    let pipeline = [];

    if (year) pipeline.push({ $match: { year: parseInt(year) } });
    if (month) pipeline.push({ $match: { month: parseInt(month) } });
    if (country) pipeline.push({ $match: { country } });

    pipeline = pipeline.concat([
        { $group: { _id: '$key_job', count: { $sum: 1 } } },
        { $project: { key_job: '$_id', count: 1, _id: 0 } },
        { $sort: { count: -1 } }
    ]);

    try {
        const jobCounts = await Job.aggregate(pipeline);
        const resultDict = jobCounts.reduce((acc, entry) => {
            acc[entry.key_job] = entry.count;
            return acc;
        }, {});
        res.status(StatusCodes.OK).json(resultDict);
    } catch (error) {
        next(error)
    }
}

// Skill Demand Analsis : identfy the most in-demand skills by anlyzing the freuency of skill mentions in job posting :
const frequencyOfSkills = async (req, res, next) => {
    const { track_name } = req.params;
    const pipeline = [
        { $lookup: { from: 'skills', localField: 'skill_ids', foreignField: '_id', as: 'job_result' } },
        { $unwind: { path: '$job_result', includeArrayIndex: 'string', preserveNullAndEmptyArrays: false } },
        { $project: { key_job: 1, 'job_result.skill_name': 1 } },
        { $match: { key_job: track_name } },
        { $group: { _id: '$job_result.skill_name', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
    ];

    try {
        const result = await Job.aggregate(pipeline);
        const resultDict = result.reduce((acc, item) => {
            acc[item._id] = { count: item.count };
            return acc;
        }, {});
        //console.log(resultDict);
        res.json(resultDict);
    } catch (error) {
        next(error)
    }
}


// Frequency Of Experience Levels
const frequencyOfExperienceLevels  = async (req, res, next) => {
    try {
        const pipeline = [
            {$group: {_id: '$career_level',count: { $sum: 1 }}},
            {$project: {experience_level: '$_id',count: 1,_id: 0}},
            {$sort: { count: -1 }}
        ];
        const result = await Job.aggregate(pipeline);
        res.status(StatusCodes.OK).json(result);
    } catch (error) {
        next(error);
        console.log(error)
    }
}

const frequencyOfJobByCountry = async (req, res, next) => {
    try {
        const pipeline = [
            {
                $group: {
                    _id: "$country",
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    country: "$_id",
                    count: 1,
                    _id: 0
                }
            },
            {
                $sort: { count: -1 }
            }
        ];

        const result = await Job.aggregate(pipeline);
        res.status(StatusCodes.OK).json(result);
    } catch (error) {
        next(error);
    }
}

const trendNowInTech = async (req, res, next) => {
    const { track } = req.params;
    
    try {
        const result = await Job.aggregate([
            { $match: { key_job: track } }, 
            { $unwind: "$skill_ids" }, 
            { $lookup: { from: "skills", localField: "skill_ids", foreignField: "_id", as: "skill" } }, // Lookup skill details
            { $unwind: "$skill" }, 
            { $group: { _id: "$skill.skill_name", count: { $sum: 1 } } }, 
            { $sort: { count: -1 } },
            { $limit: 1 }
        ]);

        res.status(StatusCodes.OK).json(result);
    } catch (error) {
        console.log(error)
        next(error);
    }
}

const recommendedTechStack = async (req, res, next) => {
    try {
        const result = await Job.aggregate([
            { $unwind: "$key_job" }, 
            { $group: { _id: "$key_job", count: { $sum: 1 } } }, 
            { $sort: { count: -1 } }, 
            { $limit: 1 } 
        ]);

        const keyJobTrends = result.map(item => ({
            Tech_stack: item._id,
            count: item.count
        }));

        res.json(keyJobTrends);
    } catch (error) {
        next(error);
    }
}

// Salary Insights
const salaryInsightsOnJobRoles = async (req, res ,next) => {
    const { jobRole } = req.params;
    try {
        const salaryInsights = await Job.aggregate([
            { $match: { key_job: jobRole } }, 
            { $group: { _id: null, averageSalary: { $avg: "$salary_range" } } } 
        ]);
        
        if (salaryInsights.length > 0) {
            res.json({ jobRole, averageSalary: salaryInsights[0].averageSalary });
        } else {
            res.status(404).json({ error: "Job role not found" });
        }
    } catch (error) {
        next(error);
    }
}

const salaryInsightsOnCareerLevel = async (req, res ,next) => {
    const { careerLevel } = req.params;
    try {
        const salaryAnalysis = await Job.aggregate([
            { $match: { career_level: careerLevel } }, 
            { $group: { _id: null, averageSalary: { $avg: "$salary_range" } } }
        ]);
        
        if (salaryAnalysis.length > 0) {
            res.json({ careerLevel, averageSalary: salaryAnalysis[0].averageSalary });
        } else {
            res.status(404).json({ error: "Career level not found" });
        }
    } catch (error) {
        next(error);
    }
}

const countJobs = async (req, res, next) => {
    try {
        const jobCount = await Job.countDocuments({});
        res.status(StatusCodes.OK).json({ count: jobCount });
    } catch (error) {
        next(error);
    }
}

const countSkills = async (req, res, next) => {
    try {
        const skillCount = await Skill.countDocuments({});
        res.status(StatusCodes.OK).json({ count: skillCount });
    } catch (error) {
        next(error);
    }
}


module.exports = { 
    plTopTen,
    pldynamic,
    frontendDistrubtion,
    backendDistrubtion,
    offeringsDistribution,
    frequencyOfJob,
    frequencyOfSkills,
    frequencyOfExperienceLevels,
    frequencyOfJobByCountry,
    trendNowInTech,
    recommendedTechStack,
    salaryInsightsOnJobRoles,
    salaryInsightsOnCareerLevel,
    countJobs,
    countSkills
}