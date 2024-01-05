const passport = require('passport')
const User = require('../models/userModel');
const FacebookStrategy = require('passport-facebook');
require("dotenv").config();

const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID;
const FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET;

passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:8000/auth/facebook/callback",
    profileFields: ['id']
},
    async function(accessToken, refreshToken, profile, done) {
        try {

            let user = await User.findOne({
                    providerId: profile.id,
                    provider: "facebook",
            });

            if(!user) {
                user = new User({
                    provider: "facebook",
                    providerId: profile.id,
                    accessToken: accessToken,
                    firstName: profile.displayName.split(' ')[0],
                    lastName: profile.displayName.split(' ')[1],
                    email: profile.emails[0].value,
                    gender: profile.gender,
                })
                await user.save()
                return done(null, oauthUser)
            }else {
                // If the user already exists, update the access token and any other necessary fields.
                oauthUser.accessToken = accessToken;
                // Update other user-specific fields if needed.
            }

        } catch (err) {
            console.error(err)
            return done(err);
        }
    }
));


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