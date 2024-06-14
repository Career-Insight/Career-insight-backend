const express = require("express");
const router = express.Router();

const { selectAndSaveUserRoadmap, getAllUserRoadmaps } = require('../controllers/roadmapController');

router.post('/select-and-save', selectAndSaveUserRoadmap)
router.get('/user/:userId', getAllUserRoadmaps)


module.exports = router 