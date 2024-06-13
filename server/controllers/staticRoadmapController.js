const StaticRoadmap = require('../models/StaticRoadmap')
const { StatusCodes } = require("http-status-codes");

// create Roadmap
// const createRoadmap = async (req, res, next) => {
//     const {name , RoadMap} = req.body
//     try {
//         await StaticRoadmap.create({
//             name,
//             RoadMap
//         })
//         res.status(StatusCodes.CREATED).json({ message: "Roadmap successfully created." });
//     } catch (error) {
//         next(error)
//     }
// }

// Get a list of All Roadmap
const getAllRoadmaps = async (req, res) => {
    try {
        const roadmaps = await StaticRoadmap.find();
        res.status(StatusCodes.OK).json(roadmaps);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching roadmaps', error });
    }
};

// Get a specific roadmap
const getRoadmapById = async (req, res) => {
    const { id } = req.params;
    try {
        const roadmap = await StaticRoadmap.findById(id);
        if (!roadmap) {
            return res.status(404).json({ message: 'Roadmap not found' });
        }
        res.status(200).json(roadmap);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching roadmap', error });
    }
}

// user choose a specific roadmap and save it

module.exports = {
    getAllRoadmaps,
    getRoadmapById
}