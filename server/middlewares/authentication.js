const { isTokenValid } = require("../services/userServices");
const CustomError = require ("../errors")

//create middleware for authentication checking for tokens
const authenticationUser = async (req, res, next) => {
    const token = req.signedCookies.token
    if(!token) {
        throw new CustomError.UnauthenticatedError("Authentication failed")
    }
    //if token verify
    try {
        const payload = isTokenValid({ token })
        // this req.user will be accessed in the next middleware easily
        req.user = { ...payload };
        next();
    } catch (error) {
        throw new CustomError.UnauthenticatedError("Authentication failed")
    }
}

module.exports = { authenticationUser }