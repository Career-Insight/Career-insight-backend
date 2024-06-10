const express = require("express");
const { addDataCollection } = require("../controllers/dataCollectionController");
const { validateDataCollection } = require("../middlewares/validation")


const router = express.Router();

router.post('/add-data',validateDataCollection,addDataCollection)

module.exports = router