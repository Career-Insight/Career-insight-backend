const express = require("express");
const router = express.Router();

const { 
        plTopTen,
        pldynamic,
        frontendDistrubtion,
        backendDistrubtion,
        offeringsDistribution,
        frequencyOfJob,
        frequencyOfSkills,
        frequencyOfExperienceLevels,
        frequencyOfJobByCountry,
        trendNowInTech,
        recommendedTechStack,
        salaryInsightsOnJobRoles,
        salaryInsightsOnCareerLevel
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
router.get('/jobs/frequency-of-experience-levels', frequencyOfExperienceLevels )
router.get('/jobs/frequency-of-job-by-country', frequencyOfJobByCountry )
router.get('/jobs/trend/:track', trendNowInTech )
router.get('/jobs/recommended-tech-stack', recommendedTechStack )
router.get('/jobs/salary-insights/job-roles/:jobRole', salaryInsightsOnJobRoles )
router.get('/jobs/salary-insights/career-levels/:careerLevel', salaryInsightsOnCareerLevel )








module.exports = router 