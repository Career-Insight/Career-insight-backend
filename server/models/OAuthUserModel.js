const mongoose = require('mongoose')
const oauthDataSchema = new mongoose.Schema({
    provider: {
        type: String,  //(e.g., 'google', 'linkedin', 'facebook')
        required: true,
    },
    providerId: {
        type: String, //OAuth provider's user ID
        required: true,
    },
    accessToken: {
        type: String, //Store the OAuth access token
        required: true,
    },
    // Add other fields as needed (e.g., refresh tokens, token expiration, etc.)
    firstName:String,
    lastName :String,
    email: String,
    phone: Number,
    address: String,
    gender: String
});

const OAuthData = mongoose.model('OAuthData', oauthDataSchema);

module.exports = OAuthData;