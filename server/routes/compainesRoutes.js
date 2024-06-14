const express = require("express");
const router = express.Router();
const { getCompanyByName, getAllCompaniesNameandId } = require("../controllers/companiesController");

router.get('/get-companies-data', getAllCompaniesNameandId)
router.get('/get-company', getCompanyByName)

module.exports = router