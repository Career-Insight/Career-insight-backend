const request = require('supertest');
const app = require('../app'); 
const mongoose = require('mongoose');
const User = require('../models/userModel');
const { sendVerificationEmail } = require('../controllers/verificationController')
const { attachCookieToResponse, neededPayload } = require('../services/userServices')

describe('User Registration', () => { 
    // Clear the User collection before running the tests
    beforeAll(async () => {
        await User.deleteMany({});
    });

    it('registers a new user', async () => {
        const userData = {
            firstName: 'John',
            lastName: 'Doe',
            phone: '01111111111',
            email: `testuser_${Date.now()}@gmail.com`,
            password: 'mazen37',
            passwordConfirm: 'mazen37',
        };
    
        const response = await request(app)
            .post('/api/v1/auth/register')
            .send(userData);
    
        // Check the response
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('user');
        // Verify Response Body
        expect(response.body.user).toHaveProperty('userId');
        expect(response.body.user).toHaveProperty('userName', 'John Doe');


        //check cookie
        expect(response.headers['set-cookie']).toBeDefined();

        // Check if the user is saved in the database
        const user = await User.findOne({ email: userData.email });
        expect(user).toBeTruthy();
    
    });
})

// describe('User Verification', () => {
//     let user; // Save the user object for later use in the test

    
//     // Before each test, create a new user and send a verification email
//     beforeEach(async () => {

        
//       // Create a new user (you may want to adjust the user data as needed)
//         // Create a unique email address for each test
//         const userEmail = `testuser_${Date.now()}@gmail.com`;

//         user = await User.create({
//         firstName: 'John',
//         lastName: 'Doe',
//         email: userEmail,
//         phone: '01111111111',
//         password: 'password123',
//         passwordConfirm: 'password123',
//         isVerified: false,
//         //verificationCode: '123456', 
//         });

//             // Send a verification email
//             await sendVerificationEmail(user);
//     });

    

//     it('verifies a user with valid verification code', async () => {
//         const response = await request(app)
//         .post('/api/v1/auth/verify')
//         .set('Content-Type', 'application/json; charset=utf-8') // Set the Content-Type header
//         .send({verificationCode: user.verificationCode });

//         console.log('Response Body:', response.body);
//         console.log('Response Status Code:', response.statusCode);
        
//         expect(response.statusCode).toBe(200);
//         expect(response.body).toHaveProperty('message', 'Email verification successful. User now has access.');
    
//       // Check if the user is updated in the database
//         const updatedUser = await User.findById(user._id);
//         expect(updatedUser.isVerified).toBe(true);
//         expect(updatedUser.verificationCode).toBeUndefined();
//     });

//     it('fails to verify a user with invalid verification code', async () => {
//         const response = await request(app)
//         .post('/api/v1/auth/verify')
//         .set('Content-Type', 'application/json; charset=utf-8') // Set the Content-Type header
//         .send({ verificationCode: 'invalid_code' });
    
//         expect(response.statusCode).toBe(400);
//         expect(response.body).toHaveProperty('error', 'Invalid verification code');
//     });

//     // Add more test cases as needed

//     // After all tests, clean up the database
//     afterAll(async () => {
//         await mongoose.connection.close();
//     });
// });

describe('User Login', () => {
    let user;

    // Before each test, create a new user
    beforeEach(async () => {
        const userEmail = `testuser_${Date.now()}@gmail.com`;

        user = await User.create({
            firstName: 'John',
            lastName: 'Doe',
            email: userEmail,
            phone: '01111111111',
            password: 'password123',
            passwordConfirm: 'password123',
            isVerified: true, // Assuming the user is verified for the login test
        });
    });

    it('logs in a user with valid credentials', async () => {
        const loginData = {
            email: user.email,
            password: 'password123',
        };

        const response = await request(app)
            .post('/api/v1/auth/login')
            .send(loginData);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('user');


        // Check if the user is logged in (e.g., check for the presence of a token in the response)
        expect(response.headers['set-cookie']).toBeDefined();
    });

    it('fails to log in with invalid credentials', async () => {
        const invalidLoginData = {
            email: user.email,
            password: 'wrongpassword',
        };

        const response = await request(app)
            .post('/api/v1/auth/login')
            .send(invalidLoginData);

        expect(response.statusCode).toBe(401);
        expect(response.body).toBe("No user with this Email");

    });


    // After all tests, clean up the database
    afterAll(async () => {
        await mongoose.connection.close();
    });
});

describe('User Logout', () => {

    let user;
    beforeAll(async () => {
        // Set up any necessary resources (e.g., database connection) before tests run
        await mongoose.connect(process.env.MONGO_DB, { useNewUrlParser: true, useUnifiedTopology: true });
    });



    // Before each test, create a new user
    beforeEach(async () => {
        const userEmail = `testuser_${Date.now()}@gmail.com`;

        user = await User.create({
            firstName: 'John',
            lastName: 'Doe',
            email: userEmail,
            phone: '01111111111',
            password: 'password123',
            passwordConfirm: 'password123',
            isVerified: true, // Assuming the user is verified for the logout test
        });
    });

    it('logs out a user successfully', async () => {
        // Perform a login before attempting to logout
        const loginData = {
            email: user.email,
            password: 'password123',
        };

        const loginResponse = await request(app)
            .post('/api/v1/auth/login')
            .send(loginData);

        // Ensure the login was successful
        expect(loginResponse.statusCode).toBe(200);
        expect(loginResponse.body).toHaveProperty('user');
        expect(loginResponse.headers['set-cookie']).toBeDefined();

        // Perform the logout
        const logoutResponse = await request(app)
            .post('/api/v1/auth/logout')
            .set('Cookie', loginResponse.headers['set-cookie']);

        // Expect a successful logout response
        expect(logoutResponse.statusCode).toBe(200);
        expect(logoutResponse.body).toHaveProperty('message', 'Logged out successfully.');

        // Ensure the authentication token is cleared in the response cookie
        expect(logoutResponse.headers['set-cookie'][0]).toContain('token=;');

    });

    // After all tests, clean up the database
    afterAll(async () => {
        await mongoose.connection.close();
    });
});
