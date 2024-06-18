const express = require("express");
const router = express.Router();

const {
    getAllProgrammingLanguages,
    getAllFrontendTechnologies,
    getAllBackendTechnologies,
    getTargetCompnies,
    targetCompaniesBasedOnCity,
    getCompaniesLocations
} = require('../controllers/targetCompaniesController')

router.get('/pl', getAllProgrammingLanguages)
router.get('/frontend-technologies', getAllFrontendTechnologies)
router.get('/backend-technologies', getAllBackendTechnologies)
router.get('/search', getTargetCompnies)
router.get('/city', targetCompaniesBasedOnCity)
router.get('/location', getCompaniesLocations)


module.exports = router

// add cache here