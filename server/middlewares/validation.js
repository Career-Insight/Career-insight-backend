const { body, validationResult } = require('express-validator');

// Validation rules as middleware
const validatePrompt = [
    // Validate userId
    body('userId')
        .isMongoId().withMessage('UserId must be a valid MongoDB ObjectId'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const validateDataCollection = [
    body('interestedJob')
        .exists().withMessage('Interested job is required')
        .isString().withMessage('Interested job must be a string'),
    body('interestedSkills')
        .exists().withMessage('Interested skills are required')
        .isArray().withMessage('Interested skills must be an array'),
    body('careerLevel')
        .exists().withMessage('Career level is required')
        .isString().withMessage('Career level must be a string'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = {
    validatePrompt,
    validateDataCollection
};