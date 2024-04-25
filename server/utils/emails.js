const nodemailer = require('nodemailer');
const { StatusCodes } = require('http-status-codes')
const dotenv = require("dotenv");

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.APP_PASSWORD
    }
})

const sendHelloEmail = async(user) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL,
            to: user.email,
            subject: 'Hello!',
            text: ` Welcome to Carrer Insight you can now login `
        };
        const info = await transporter.sendMail(mailOptions);
        console.log('Hello email sent:', info.response);
    } catch (error) {
        throw error;
    }
}

const sendWelcomeBackEmail = async (user) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL,
            to: user.email,
            subject: 'Welcome Back!',
            text: `Hello, ${user.firstName}! Welcome back to our platform.`
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Welcome back email sent:', info.response);
    } catch (error) {
        throw error;
    }
}

module.exports = {
    sendHelloEmail,
    sendWelcomeBackEmail
}