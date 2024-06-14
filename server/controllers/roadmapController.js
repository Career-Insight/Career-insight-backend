const User = require("../models/userModel");
const StaticRoadmap = require('../models/StaticRoadmap')
const { StatusCodes } = require("http-status-codes");
const userRoadMap = require('../models/RoadMap')

const selectAndSaveUserRoadmap = async (req, res, next) => {
    const { userId, roadmapId } = req.body;
    try {
        const user = await User.findById(userId);
        const staticRoadmap = await StaticRoadmap.findById(roadmapId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!staticRoadmap) {
            return res.status(404).json({ message: 'Static roadmap not found' });
        }

        // Create a new user roadmap
        const userRoadmap = new userRoadMap({
            name: staticRoadmap.name,
            RoadMap: staticRoadmap.RoadMap,
            user_id: userId,
            static_roadmap_id: roadmapId
        });

        await userRoadmap.save();

        res.status(StatusCodes.CREATED).json({ message: 'Roadmap saved successfully', userRoadmap });
    } catch (error) {
        next(error)
    }
}

const getAllUserRoadmaps = async (req , res , next) => {
    try {
        const userRoadmaps = await userRoadMap.find({ user_id: req.params.userId });
        res.status(StatusCodes.OK).json(userRoadmaps);
    } catch (error) {
        next(error)
    }
}

// get a specific user roadmap by ID
// update a specific user roadmap by ID


module.exports = {
    selectAndSaveUserRoadmap,
    getAllUserRoadmaps
}