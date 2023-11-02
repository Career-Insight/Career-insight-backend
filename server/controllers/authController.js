const User = require("../models/userModel");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors/index")

const {
    createToken,
    isTokenValid,
    attachCookieToResponse,
    neededPayload,
    handleRegistrationError,
} = require("../services/userServices")

//register
const register = async (req, res) => {
    //take data from request
    const {firstName,lastName ,phone ,email, password, passwordConfirm} = req.body;
    //check fields before save user
    if(!firstName || !lastName || !phone || !email || !password || !passwordConfirm) {
        throw new CustomError.BadRequestError("All fields must be provide")
    }

    //save user
    try {
        const newUser = await User.create({
            firstName,
            lastName,
            phone,
            email,
            password,
            passwordConfirm,
            createdAt: new Date(Date.now()),
            //profile,
            //avatar
        });
        //create token and attach cookie
        const payload = neededPayload(newUser);
        attachCookieToResponse({ res, payload });
        res.status(StatusCodes.CREATED).json({ user: payload });
    } catch (err) {
        return handleRegistrationError(err, res);
    }
}

//Login
const login = async (req, res) => {
    //take data from request
    const { email, password } = req.body
    //check fields before get user email
    if(!email || !password) {
        throw new CustomError.BadRequestError("All fields must be provided");
    }
    //find user email
    const user = await User.findOne({ email });
    //check user email
    if(!user) {
        throw new CustomError.NotFoundError("No user with this Email")
    }
    //compare password
    const isMatch = await user.correctPassword(password)
    if(!isMatch) {
        throw new CustomError.UnauthorizedError("Wrong password");
    }
    const payload = neededPayload(user);
    attachCookieToResponse({ res, payload });
    res.status(StatusCodes.OK).json({ user: payload });
}

//Logout
const logout = (req, res) => {
    // Clear the authentication token from the client's cookie
    res.clearCookie('token');
    res.status(StatusCodes.OK).json({ message: 'Logged out successfully.' });
    //res.redirect('/') home page
};


module.exports = { register, login, logout }
