const express = require('express');
const passport = require('passport');
const User = require('../models/User');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

// Login route
// Login route
router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).send('Invalid username or password');
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            // Authentication successful, send user data in response
            res.json({
                firstName: req.user.firstName,
                lastName: req.user.lastName,
                email: req.user.email
            });
        });
    })(req, res, next);
});



// Signup route
router.post('/register', (req, res, next) => {
    const newUser = new User({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    });
    User.register(newUser, req.body.password, (err, user) => {
        if (err) {
            return next(err);
        }
        res.json({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        });
        res.send('Signup successful');
    });
});



// Logout route
router.post('/logout',authMiddleware.ensureAuthenticated, (req, res,next) => {
    req.logout();
    res.send('Logout successful');
    (req, res, next)
});

router.get('/profile', authMiddleware.ensureAuthenticated, (req, res, next) => {
    // Assuming req.user contains the authenticated user object
    const userId = req.user.email;
    User.findByUsername(userId)
        .select('firstName lastName email')
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(user);
        })
        .catch(err => {
            console.error('Error fetching user profile:', err);
            res.status(500).json({ message: 'Internal server error' });
        });
});

module.exports = router;
