const { isTokenValid } = require("../services/userServices");
const CustomError = require ("../errors")


const authenticationUser = async (req, res, next) => {
    // Updated middleware for authentication checking for tokens and Retrieve token from the Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return next(new CustomError.UnauthenticatedError("Authentication failed - No token provided"));
    }
    const token = authHeader.split(' ')[1];
    //if token verify
    try {
        const payload = isTokenValid({ token })
        // this req.user will be accessed in the next middleware easily
        req.user = { ...payload };
        next();
    } catch (error) {
        next(new CustomError.UnauthenticatedError("Authentication failed - Invalid token"))
        //throw new CustomError.UnauthenticatedError("Authentication failed")
    }
}

module.exports = { authenticationUser }