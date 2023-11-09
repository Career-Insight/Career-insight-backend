const express = require('express')
const passport = require('passport');
const router = express.Router()
require('../controllers/oauthController-facebook')

// Facebook authentication route
router.get('/auth/facebook',
passport.authenticate('facebook', {
    scope: ['public_profile', 'email', 'user_gender']
  })
);

// Callback route for Facebook authentication
router.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/protected', // Redirect to a protected route on success
    failureRedirect: '/auth/failure' // Redirect to a failure route on failure
  })
);

// Failure route
router.get('/auth/failure', (req, res) => {
  res.send('Something went wrong.');
});

// Protected route
router.get('/protected', (req, res) => {
  if (req.isAuthenticated()) {
    res.send(`Hello ${req.user.firstName}`);
  } else {
    res.sendStatus(401); // Unauthorized if not authenticated
  }
});

router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/')
    });
});

module.exports = router