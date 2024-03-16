const { rateLimit } = require('express-rate-limit');

const limiter = rateLimit({
    max: 100,
    windowMs: 5 * 60 * 1000,
    message: "You can't make any more requests at this moment. Please try again later.",
});

module.exports = limiter;