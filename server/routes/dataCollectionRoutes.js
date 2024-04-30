const express = require("express");
const { addDataCollection } = require("../controllers/dataCollectionController");
const { authenticationUser } = require("../middlewares/authentication")

const router = express.Router();

router.post('/add-data',addDataCollection)

module.exports = router