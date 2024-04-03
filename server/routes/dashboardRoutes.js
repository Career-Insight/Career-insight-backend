const express = require("express");
const router = express.Router();

const { 
        plTopTen,
        pldynamic,
        frontendDistrubtion,
        backendDistrubtion,
        offeringsDistribution,
        frequencyOfJob,
        frequencyOfSkills
    }
= require('../controllers/dashboardController')

// Stack info route

router.get('/general/programming-languages/top-ten',plTopTen )
router.get('/general/programming-languages/:count',pldynamic )

router.get('/general/frontend-technologies/:count',frontendDistrubtion )
router.get('/general/backend-technologies/:count',backendDistrubtion )
router.get('/general/offering-distributions', offeringsDistribution)

// Job posting routes
router.get('/jobs',frequencyOfJob )
router.get('/jobs/skill/:track_name', frequencyOfSkills)



module.exports = router 