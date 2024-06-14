const express = require("express");
const router = express.Router();

const 
    { 
        selectAndSaveUserRoadmap,
        getAllUserRoadmaps,
        getSpecificRoadmapbyId,
        deleteRoadmapById
    } 
    = require('../controllers/roadmapController');

router.post('/select-and-save', selectAndSaveUserRoadmap)
router.get('/user/:userId', getAllUserRoadmaps)
router.get('/user/:userId/roadmap/:roadmapId', getSpecificRoadmapbyId)
router.delete('/user/:userId/roadmap/:roadmapId', deleteRoadmapById)




module.exports = router 