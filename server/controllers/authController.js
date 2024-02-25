const User = require("../models/userModel");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors/index")
const { sendVerificationEmail } = require('../controllers/verificationController')
const Logger = require('../services/loggerServices')

const registerLogger = new Logger({ log:'Register User' })
const loginLogger = new Logger({ log:'Login User' })
const logoutLogger = new Logger({ log:'Logout User' })

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

        // Save the user's email in the session
        req.session.email = newUser.email;

        // Send verification email after successful registration

        await sendVerificationEmail(newUser)

        //create token and attach cookie
        const payload = neededPayload(newUser);
        attachCookieToResponse({ res, payload });
        await registerLogger.info('Register successfuly', payload)
        res.status(StatusCodes.CREATED).json({ user: payload });
    } catch (err) {
        console.error('Error during registration:', err);
        await registerLogger.error('Register failed', {err: err.message})
        return handleRegistrationError(err, res);
    }
}

//Login
const login = async (req, res) => {
    try {
        
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
    
        // Check if the email is verified
        if(!user.isVerified){
            throw new CustomError.UnauthorizedError("Email is not verified. Please verify your email to log in.");
        }
    
        //compare password
        const isMatch = await user.correctPassword(password)
        if(!isMatch) {
            throw new CustomError.UnauthorizedError("Wrong password");
        }
        const payload = neededPayload(user);
        attachCookieToResponse({ res, payload });
        res.status(StatusCodes.OK).json({ user: payload });

        // Log success
        await loginLogger.info('Login successful', { email: user.email });
    } catch (error) {
        // Log errors
        loginLogger.error('Login failed', { error: error.message });
        res.status(StatusCodes.UNAUTHORIZED).json("No user with this Email")
    }
}

//Logout
const logout = (req, res) => {
    // Clear the authentication token from the client's cookie
    res.clearCookie('token');
    res.status(StatusCodes.OK).json({ message: 'Logged out successfully.' });
    logoutLogger.info('user logout successfully')
    //res.redirect('/') home page
};


module.exports = { register, login, logout }
