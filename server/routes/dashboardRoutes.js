const express = require("express");
const router = express.Router();

const { plTopTen, pldynamic } = require('../controllers/dashboardController')

router.get('/general/programming-languages/top-ten',plTopTen )
router.get('/general/programming-languages/:count',pldynamic )

router.get('/general/frontend-technologies', )
router.get('/general/backend-technologies', )
router.get('/general/offering-distributions', )



module.exports = router 