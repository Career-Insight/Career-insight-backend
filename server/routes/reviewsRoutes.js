const express = require("express");
const router = express.Router();

const {
    findBestCompanies,
    numberOfReviewsPerEachCompany,
    getAverageRatingOverTimeByCompanyName,
    getSentimentDistributionDependOnCompany,
    getOpinionReviewer,
    getCareerOpportunities,
    getOverallRatingSumByYearAndCompany
} = require('../controllers/reviewsController')

router.get('/best-companies', findBestCompanies)
router.get('/get-reviews', numberOfReviewsPerEachCompany)
router.get('/get-rating', getAverageRatingOverTimeByCompanyName)
router.get('/get-distribution', getSentimentDistributionDependOnCompany)
router.get('/get-opinion-on-review', getOpinionReviewer)
router.get('/get-career-opportuities', getCareerOpportunities)
router.get('/get-overall-rating', getOverallRatingSumByYearAndCompany)


module.exports = router;