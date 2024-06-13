const express = require("express");
const router = express.Router();

const {getAllRoadmaps, getRoadmapById} = require('../controllers/staticRoadmapController')

router.get('/all-roadmaps', getAllRoadmaps)
router.get('/roadmap/:id', getRoadmapById)


module.exports = router 