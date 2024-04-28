const express = require("express");
const { getCompanyByName } = require("../controllers/companiesController");
const router = express.Router();

router.get('/get-company', getCompanyByName)

module.exports = router