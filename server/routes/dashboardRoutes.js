const express = require("express");
const router = express.Router();

const { 
        plTopTen,
        pldynamic,
        frontendDistrubtion,
        backendDistrubtion,
        offeringsDistribution
    }
= require('../controllers/dashboardController')

router.get('/general/programming-languages/top-ten',plTopTen )
router.get('/general/programming-languages/:count',pldynamic )

router.get('/general/frontend-technologies/:count',frontendDistrubtion )
router.get('/general/backend-technologies/:count',backendDistrubtion )
router.get('/general/offering-distributions', offeringsDistribution)



module.exports = router 