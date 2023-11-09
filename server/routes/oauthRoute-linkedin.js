const express = require('express')
const router = express.Router()
const passport = require('passport');
require('../controllers/oauthController-linkedin')

function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401) ;

}


router.get('/', (req, res)=> {
    res.send('<a href="/auth/linkedin">Authenticate with linkedin </a>');
})

router.get('/auth/linkedin',
    passport.authenticate('linkedin',{ state: 'SOME STATE'  }));

router.get('/linkedin/callback',
    passport.authenticate('linkedin', {
        successRedirect: '/protected',
        failureRedirect: '/auth/failure' //return to login 
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