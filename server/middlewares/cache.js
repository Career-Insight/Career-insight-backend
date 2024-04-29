const {redisClient} = require('../utils/redis');

const cache = async (req, res, next) =>  {
    try {
        const cacheKey = req.originalUrl;

        if(!cacheKey){
            return next()
        }
        const cache = await redisClient.get(cacheKey)
        if (cache !== null) {
            const cachedData = JSON.parse(cache)
            console.log(`Cached Data: ${JSON.stringify(cachedData)}`)
            return res.status(200).json( cachedData )
        }
        next()
    } catch (error) {
        console.error('Error checking cache:', error);
        next(error)
    }
};

module.exports = { cache };

/**
 * Example :
 * in Routes : router.get('/jobs/frequency-of-experience-levels',cache ,frequencyOfExperienceLevels )
    in Controller :
    const frequencyOfExperienceLevels  = async (req, res, next) => {
    const cacheKey = req.originalUrl
    try {
        const pipeline = [
            {$group: {_id: '$career_level',count: { $sum: 1 }}},
            {$project: {experience_level: '$_id',count: 1,_id: 0}},
            {$sort: { count: -1 }}
        ];
        const result = await Job.aggregate(pipeline);

        const cacheValue = JSON.stringify({ result });
        await redisClient.set(cacheKey, cacheValue, {EX: 60*60*24}); // expire after one day

        res.status(StatusCodes.OK).json(result);
    } catch (error) {
        next(error);
        console.log(error)
    }
}
 */