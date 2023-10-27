const express = require("express");
const router = express.Router();

router.route("/dummy").get((req,res)=> {
    res.json('hello from Dummy Route')
});

module.exports = router 