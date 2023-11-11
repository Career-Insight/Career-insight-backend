const express = require("express");
const router = express.Router();
const { register, login, logout } = require("../controllers/authController")
//authenticationUser middelware
const { authenticationUser } = require("../middlewares/authentication")
const validateEmail  = require("../middlewares/emailValidator")
const { verify } = require("../controllers/verificationController")

//register, login and logout from controllers file

router.post("/register", validateEmail, register)
router.post("/verify", verify)
router.route("/login").post(login);
router.get("/logout", authenticationUser, logout);

module.exports = router 