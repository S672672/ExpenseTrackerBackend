const express = require('express');
const passport = require('passport');
const User = require('../models/User');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

// Login route
router.post('/login', passport.authenticate('local'), (req, res) => {
    res.send('Login successful');
});

// Signup route
router.post('/register', (req, res, next) => {
    User.register(new User({ email: req.body.email }), req.body.password, (err, user) => {
        if (err) {
            return next(err);
        }
        res.send('Signup successful');
    });
});

// Logout route
router.get('/logout',authMiddleware.ensureAuthenticated, (req, res) => {
    req.logout();
    res.send('Logout successful');
});

module.exports = router;
