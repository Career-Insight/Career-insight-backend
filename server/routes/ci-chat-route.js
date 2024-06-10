const express = require("express");
const router = express.Router();

const { generateRoadmap } = require('../controllers/CI-chat-controller')
const { validatePrompt }  = require('../middlewares/validation')

router.post('/generate', validatePrompt ,generateRoadmap)

module.exports = router 