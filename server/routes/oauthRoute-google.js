const express = require('express')
const router = express.Router()
const passport = require('passport');
require('../controllers/oauthController-google')

//function (middeleware) to checks if a user is logged in or not
function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401) ;

}


router.get('/api/v1/authWithGoogle', (req, res)=> {
    res.send('<a href="/auth/google">Authenticate with Google </a>');
})

router.get('/auth/google',
    passport.authenticate('google', {scope: [
        'email',
        'profile',
    ]})
)

router.get('/google/callback',
    passport.authenticate('google', {
        successRedirect: '/protected',
        failureRedirect: '/auth/failure'
    })
)

router.get('/auth/failure', (req,res) => {
    res.send('something went wrong.');
})

router.get('/protected', isLoggedIn ,(req, res)=> {
    res.send(`hello ${req.user.firstName}`);
})

router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/')
    });
});

module.exports = router 