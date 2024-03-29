const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const User = require('../models/User');

// Profile route
router.get('/profile', authMiddleware.ensureAuthenticated, async (req, res) => {
    try {
        // Retrieve user information from the authenticated user object (req.user)
        const user = req.user;

        // Fetch additional user profile information from the database if needed
        // Example: const userProfile = await UserProfile.findOne({ userId: user._id });

        res.render('profile', { user }); // Render the profile page template with user information
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
