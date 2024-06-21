const nodemailer = require('nodemailer');
const User = require('../models/userModel')
const CustomError = require('../errors/index')
const { StatusCodes } = require('http-status-codes')
const dotenv = require("dotenv");
const Logger = require('../services/loggerServices');
const { sendHelloEmail } = require('../utils/emails');

const verifyLogger = new Logger({ log:'verify User' })



dotenv.config();

const configOptions = {
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.APP_PASSWORD
    }
};



const transporter = nodemailer.createTransport(configOptions);


async function sendVerificationEmail(user) {
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    try {
        const updatedUser = await User.findByIdAndUpdate(
            user._id,
            { verificationCode: verificationCode },
            { new: true }
        );
    
        const mailOptions = {
            from: process.env.EMAIL,
            to: updatedUser.email,
            subject: 'Account Verification',
            text: `Your verification code is: ${verificationCode}`
        };

        // Wrap the sendMail in a Promise
        const sendMailPromise = new Promise((resolve, reject) => {
            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    resolve(info);
                }
            });
        });
    
        const info = await sendMailPromise;
        console.log('Verification email sent:', info.response);
    
        return updatedUser;
    } catch (error) {
        throw error;
    }
}

const verify = async (req, res) => {
    const { verificationCode } = req.body;
    const email = req.body.email; // Retrieve the email from the session

    try {
        const user = await User.findOneAndUpdate(
            { email, verificationCode :  {$eq: verificationCode }},
            { $unset: { verificationCode: 1 }, isVerified: true },
            { new: true }
        )

        

        if(!user){
            return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Invalid verification code' });
        }

        // Clear the email from the session
        delete req.session.email;

        await verifyLogger.info('Verification success');
        res.json({ message: 'Email verification successful. User now has access.' });

        await sendHelloEmail(user)
    } catch (error) {
        await verifyLogger.error('Error during email verification:', error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error during email verification' })
    }
}


module.exports = {
    verify,
    sendVerificationEmail
};