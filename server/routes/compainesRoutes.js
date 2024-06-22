const express = require("express");
const router = express.Router();
const { getCompanyByName, getAllCompaniesNameandId } = require("../controllers/companiesController");
const { cache } = require('../middlewares/cache');


router.get('/get-companies-data',cache,getAllCompaniesNameandId)
router.get('/get-company', getCompanyByName)

module.exports = router