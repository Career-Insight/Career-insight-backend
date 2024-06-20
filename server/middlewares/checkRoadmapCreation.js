const User = require('../models/userModel')

const checkRoadmapCreation = async (req, res, next) => {
    try {
        const userId = req.body.userId;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        if (user.hasCreatedRoadmap) {
            return res.status(403).json({ error: "User has already created a roadmap" });
        }

        next();
    } catch (error) {
        next(error);
    }
};

module.exports = { checkRoadmapCreation }