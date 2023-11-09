// const passport = require('passport')
// const OAuthData = require("../models/OAuthUserModel");
// const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
// require("dotenv").config();

// const LINKEDIN_KEY = process.env.LINKEDIN_KEY;
// const LINKEDIN_SECRET = process.env.LINKEDIN_SECRET;

// passport.use(new LinkedInStrategy({
//     clientID: LINKEDIN_KEY,
//     clientSecret: LINKEDIN_SECRET,
//     callbackURL: "http://localhost:8000/auth/linkedin/callback",
//     scope: ['r_emailaddress', 'r_liteprofile'],
// },  async function (accessToken, refreshToken, profile, done) {
//     try {
//         // Use async/await to work with Mongoose promises.
//         let oauthUser = await OAuthData.findOne({
//             providerId: profile.id,
//             provider: "linkedin",
//         });

//         if (!oauthUser) {
//             oauthUser = new OAuthData({
//                 provider: "linkedin",
//                 providerId: profile.id,
//                 accessToken: accessToken,
//                 firstName: profile.name.givenName,
//                 lastName: profile.name.familyName,
//                 email: profile.emails && profile.emails.length > 0 ? profile.emails[0].value : "",
//                 // Add other user-specific fields as needed
//             });
//         } else {
//             // If the user already exists, update the access token and any other necessary fields.
//             oauthUser.accessToken = accessToken;
//             // Update other user-specific fields if needed.
//         }

//         await oauthUser.save();
//         return done(null, oauthUser);
//     } catch (err) {
//         return done(err);
//     }
// }
// )
// );

// passport.serializeUser(function (user, done) {
//     done(null, user);
// });

// passport.deserializeUser(function(id, done) {
//     OAuthData.findById(id)
//     .then(user => {
//         done(null, user);
//     })
//     .catch(err => {
//         done(err, null);
//     });
// });