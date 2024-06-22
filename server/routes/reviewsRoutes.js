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

const { cache } = require('../middlewares/cache');

router.get('/best-companies',cache ,findBestCompanies)
router.get('/get-reviews', cache,numberOfReviewsPerEachCompany)
router.get('/get-rating', cache,getAverageRatingOverTimeByCompanyName)
router.get('/get-distribution', getSentimentDistributionDependOnCompany)
router.get('/get-opinion-on-review', getOpinionReviewer)
router.get('/get-career-opportuities', getCareerOpportunities)
router.get('/get-overall-rating', getOverallRatingSumByYearAndCompany)


module.exports = router;