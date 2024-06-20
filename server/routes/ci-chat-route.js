const express = require("express");
const router = express.Router();

const { generateRoadmap } = require('../controllers/ci-chat-controller')
const { validatePrompt }  = require('../middlewares/validation')
const { checkRoadmapCreation } = require('../middlewares/checkRoadmapCreation')

router.post('/generate',validatePrompt ,checkRoadmapCreation,generateRoadmap)

module.exports = router 