const redis = require('redis');

const redisHost = process.env.REDIS_HOST
const redisPort = process.env.REDIS_PORT


const redisClient = redis.createClient({
    url: `redis://${redisHost}:${redisPort}`
})

redisClient
    .connect()
    .then(async () => {
        console.log("Redis client connected successfully!")
})
    .catch((err) => {
        console.log("Redis client error, cached responses won't respond", err)
});

module.exports = {redisClient}
