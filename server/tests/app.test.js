const request = require('supertest')
const app = require('../app')
const mongoose = require('mongoose')


beforeAll(async () => {
    // Set up any necessary resources (e.g., database connection) before tests run
    await mongoose.connect(process.env.MONGO_DB, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
    // Tear down resources after all tests are complete
    await mongoose.connection.close();
});

describe('Test the /api/v1/test/dummy route', () => {
    it('responds with 200 status code and correct JSON', async () => {
        const response = await request(app).get('/api/v1/test/dummy');

      // Check the status code
        expect(response.statusCode).toBe(200);

      // Check the response body
        expect(response.body).toEqual('hello from Dummy Route');
    });
});