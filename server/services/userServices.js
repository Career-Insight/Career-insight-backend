const jwt = require("jsonwebtoken");
//first create Token
const createToken = ({ payload }) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME,
    });
    return token
}

//neededPayload
const neededPayload = (data) => {
    const fullName = `${data.firstName} ${data.lastName}`
    return {
        userId: data._id,
        userName: fullName
    }
}

// verifyToken
const isTokenValid = ({ token }) => {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    return payload;
}

// attachCookieToResponse
const attachCookieToResponse = ({ res, payload }) => {
    const token = createToken({ payload });
    const day = 1000 * 60 * 60 * 24;
    res.cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + day),
        signed: true,
    });
};

//check is email not unique
const handleRegistrationError = (err, res) => {
    if (err.code === 11000 && err.keyPattern && err.keyPattern.email) {
      // Duplicate key error, email already exists
        return res.status(400).json({ message: 'Email already in use.' });
    } else {
      // Handle other errors
    console.error('Error during user registration:', err);
    return res.status(500).json({ message: 'Internal server error.' });
    }
};

module.exports = {
    createToken,
    neededPayload,
    isTokenValid,
    attachCookieToResponse,
    handleRegistrationError
}