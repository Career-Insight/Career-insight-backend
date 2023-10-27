const express = require("express");
const router = express.Router();
const { register, login, logout } = require("../controllers/authController")
//authenticationUser middelware
const { authenticationUser } = require("../middlewares/authentication")

//register, login and logout from controllers file

router.route("/register").post(register);
router.route("/login").post(login);
router.get("/logout", authenticationUser, logout);

module.exports = router 