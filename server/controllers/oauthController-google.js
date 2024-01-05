const passport = require("passport");
const User = require("../models/userModel");
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
            let user = await User.findOne({
            providerId: profile.id,
            provider: "google",
            });

            // If the OAuth user doesn't exist, create a new one.
            if (!user) {
            user = new User({
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
            user.accessToken = accessToken;
            // Update other user-specific fields if needed.
            user.gender = profile.gender;
            }

            await user.save();
            return done(null, user);
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
    User.findById(id)
    .then(user => {
        done(null, user);
    })
    .catch(err => {
        done(err, null);
    });
});
