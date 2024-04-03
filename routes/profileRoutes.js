const express = require('express');
const router = express.Router();
const passport = require('passport');
const profileController = require('../controllers/profileController');
const authMiddleware = require('../middleware/authMiddleware');

// Route to get user profile
router.get('/:id', profileController.getUserProfile);

// Route to update user profile
router.put('/', authMiddleware.ensureAuthenticated, profileController.updateUserProfile);

module.exports = router;
