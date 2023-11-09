const passport = require("passport");
const OAuthData = require("../models/OAuthUserModel");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
require("dotenv").config();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

passport.use(
    new GoogleStrategy(
    {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:8000/google/callback",
        passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
        try {
            // Use async/await to work with Mongoose promises.
            let oauthUser = await OAuthData.findOne({
            providerId: profile.id,
            provider: "google",
            });

            // If the OAuth user doesn't exist, create a new one.
            if (!oauthUser) {
            oauthUser = new OAuthData({
                provider: "google",
                providerId: profile.id,
                accessToken: accessToken,
                // Map profile data to user-specific fields
                firstName: profile.given_name,
                lastName: profile.family_name,
                email: profile.email,
                gender: profile.gender,
                // Add other user-related fields as needed
            });
            } else {
            // If the user already exists, update the access token and any other necessary fields.
            oauthUser.accessToken = accessToken;
            // Update other user-specific fields if needed.
            oauthUser.gender = profile.gender;
            }

            await oauthUser.save();
            return done(null, oauthUser);
        } catch (err) {
            return done(err);
        }
    }
    )
);

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function(id, done) {
    OAuthData.findById(id)
    .then(user => {
        done(null, user);
    })
    .catch(err => {
        done(err, null);
    });
});
