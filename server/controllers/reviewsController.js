const Review = require('../models/Review');
const Company = require('../models/Company');

// get best companies depend on some aspect like culture ,CEO

const findBestCompanies = async (req, res, next) => {
    const limit = parseInt(req.query.limit) || 10; // Use query parameter or default to 10

    try {
        const pipeline = [
            {
                "$lookup": {
                    "from": "companies",
                    "localField": "company_id",
                    "foreignField": "_id",
                    "as": "company"
                }
            },
            {
                "$unwind": {
                    "path": "$company",
                    "preserveNullAndEmptyArrays": false // This will filter out documents that do not match in the lookup
                }
            },
            {
                "$addFields": {
                    "overall_rating": { "$toDouble": "$overall_rating" },
                    "work_life_balance": { "$toDouble": "$work_life_balance" },
                    "culture_values": { "$toDouble": "$culture_values" },
                    "diversity_inclusion": { "$toDouble": "$diversity_inclusion" },
                    "career_opp": { "$toDouble": "$career_opp" },
                    "comp_benefits": { "$toDouble": "$comp_benefits" },
                    "senior_mgmt": { "$toDouble": "$senior_mgmt" }
                }
            },
            {
                "$group": {
                    "_id": "$company.company_name",
                    "avg_overall_rating": { "$avg": "$overall_rating" },
                    "avg_work_life_balance": { "$avg": "$work_life_balance" },
                    "avg_culture_values": { "$avg": "$culture_values" },
                    "avg_diversity_inclusion": { "$avg": "$diversity_inclusion" },
                    "avg_career_opportunities": { "$avg": "$career_opp" },
                    "avg_compensation_benefits": { "$avg": "$comp_benefits" },
                    "avg_senior_management": { "$avg": "$senior_mgmt" }
                }
            },
            { "$sort": { "avg_overall_rating": -1 } },
            { "$limit": limit }
        ];

        
        
        const result = await Review.aggregate(pipeline);
        if (!result || result.length === 0) {
            console.log('No data found for the aggregation pipeline');}
        res.json(result);
    } catch (error) {
        next(error);    
    }
}

const numberOfReviewsPerEachCompany = async (req, res, next) => {
    try {
        const pipeline = [
            {
                "$lookup": {
                    "from": "companies",
                    "localField": "company_id",
                    "foreignField": "_id",
                    "as": "company"
                }
            },
            {
                "$unwind": {
                    "path": "$company",
                    "preserveNullAndEmptyArrays": false // This will filter out documents that do not match in the lookup
                }
            },
            {
                "$group": {
                    "_id": "$company.company_name",
                    "count": { "$sum": 1 }
                }
            },
            {
                "$project": {
                    "company_name": "$_id",
                    "count": 1,
                    "_id": 0
                }
            },
            { "$sort": { "count": -1 } },
            { "$limit": 10 }
        ];
        const result = await Review.aggregate(pipeline);
        if (!result || result.length === 0) {
            console.log('No data found for the aggregation pipeline');
        }
        res.json(result);
    } catch (error) {
        next(error);
    }
}

const getAverageRatingOverTimeByCompanyName = async (req, res, next) => {
    try {
        const company_name = req.query.company_name;

        const companyExists = await Company.exists({ company_name });
        if (!companyExists) {
            return res.send('Company not found');
        }


        const pipeline = [
            {
                "$lookup": {
                    "from": "companies",
                    "localField": "company_id",
                    "foreignField": "_id",
                    "as": "company"
                }
            },
            { "$unwind": "$company" },
            { "$match": { "company.company_name": company_name } },
            { "$addFields": { "date_review": { "$toDate": "$date_review" } } },
            {
                "$addFields": {
                    "overall_rating_num": { "$toDouble": "$overall_rating" }
                }
            },
            {
                "$project": {
                    "year_month": {
                        "$dateToString": { "format": "%Y-%m", "date": "$date_review" }
                    },
                    "overall_rating_num": 1,
                }
            },
            {
                "$group": {
                    "_id": "$year_month",
                    "avg_rating": { "$avg": "$overall_rating_num" },
                }
            },
            { "$sort": { "_id": 1 } },
        ];

        const result = await Review.aggregate(pipeline);
        if (!result || result.length === 0) {
            console.log('No data found for the aggregation pipeline');
        }
        res.json(result);

    } catch (error) {
        next(error);
    }
}

const getSentimentDistributionDependOnCompany = async (req, res, next) => {
    try {
        const company_name = req.query.company_name;

        const companyExists = await Company.exists({ company_name });
        if (!companyExists) {
            return res.send('Company not found');
        }

        const pipeline = [
            {
                "$lookup": {
                    "from": "companies",
                    "localField": "company_id",
                    "foreignField": "_id",
                    "as": "company"
                }
            },
            { "$unwind": "$company" },
            { "$match": { "company.company_name": company_name } },
            {
                "$group": {
                    "_id": "$pros_cons_sentiment",
                    "count": { "$sum": 1 }
                }
            },
            {
                "$project": {
                    "count": 1,
                    "_id": 1
                }
            }
        ]

        const result = await Review.aggregate(pipeline);
        if (!result || result.length === 0) {
            console.log('No data found for the aggregation pipeline');
        }
        res.json(result);

    } catch (error) {
        next(error);
    }
}

const getOpinionReviewer = async (req, res, next) => {
    try {
        const pipeline = [
            {
                "$lookup": {
                    "from": "companies",
                    "localField": "company_id",
                    "foreignField": "_id",
                    "as": "company"
                }
            },
            { "$unwind": "$company" },
            {
                "$addFields": {
                    "work_life_balance_num": {
                        "$convert": {
                            "input": "$work_life_balance",
                            "to": "double",
                            "onError": 0
                        }
                    }
                }
            },
            {
                "$group": {
                    "_id": "$company.company_name",
                    "average_work_life_balance": {
                        "$avg": "$work_life_balance_num"
                    }
                }
            },
            { "$sort": { "average_work_life_balance": -1 } },
            { "$limit": 15 },
        ];

        const result = await Review.aggregate(pipeline);
        if (!result || result.length === 0) {
            console.log('No data found for the aggregation pipeline');
        }
        res.json(result);
    } catch (error) {
        next(error);
    }
}

const getCareerOpportunities = async (req, res, next) => {
    try {
        const pipeline = [
            {
                "$lookup": {
                    "from": "companies",
                    "localField": "company_id",
                    "foreignField": "_id",
                    "as": "company"
                }
            },
            { "$unwind": "$company" },
            {
                "$addFields": {
                    "career_opp_num": {
                        "$convert": {
                            "input": "$career_opp",
                            "to": "double",
                            "onError": 0
                        }
                    }
                }
            },
            {
                "$group": {
                    "_id": "$company.company_name",
                    "average_career_opportunities": {
                        "$avg": "$career_opp_num"
                    }
                }
            },
            { "$sort": { "average_career_opportunities": -1 } },
            { "$limit": 15 },
        ];

        const result = await Review.aggregate(pipeline);
        if (!result || result.length === 0) {
            console.log('No data found for the aggregation pipeline');
        }
        res.json(result);
    } catch (error) {
        next(error);
    }
}

const getOverallRatingSumByYearAndCompany = async (req, res, next) => {
    try {
        const pipeline = [
            {
                "$lookup": {
                    "from": "companies",
                    "localField": "company_id",
                    "foreignField": "_id",
                    "as": "company",
                }
            },
            { "$unwind": "$company" },
            {
                "$addFields": {
                    "overall_rating_num": {
                        "$convert": {
                            "input": "$overall_rating",
                            "to": "double",
                            "onError": 0
                        }
                    }
                }
            },
            {
                "$group": {
                    "_id": {
                        "year": "$year",
                        "firm": "$company.company_name"
                    },
                    "overall_rating_sum": {
                        "$sum": "$overall_rating_num"
                    },
                }
            },
            { "$sort": { "overall_rating_sum": -1 } },
            { "$limit": 20 },
            {
                "$project": {
                    "year": "$_id.year",
                    "firm": "$_id.firm",
                    "overall_rating_sum": 1,
                    "_id": 0,
                }
            },
        ];

        const result = await Review.aggregate(pipeline);
        if (!result || result.length === 0) {
            console.log('No data found for the aggregation pipeline');
        }
        res.json(result);
    } catch (error) {
        next(error);
    }
}


module.exports = {
    findBestCompanies,
    numberOfReviewsPerEachCompany,
    getAverageRatingOverTimeByCompanyName,
    getSentimentDistributionDependOnCompany,
    getOpinionReviewer,
    getCareerOpportunities,
    getOverallRatingSumByYearAndCompany
}