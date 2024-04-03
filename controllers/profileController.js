const User = require('../models/User');

// Controller to get user profile
const getUserProfile = async (req, res) => {
    const {id} = req.params;
    console.log('id',id)
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(user);
    } catch (err) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};

// Controller to update user profile
const updateUserProfile = async (req, res) => {
    try {
        const { firstName, lastName } = req.body;
        const user = await User.findByIdAndUpdate(req.user.id, { firstName, lastName }, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(user);
    } catch (err) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};
module.exports = {
    getUserProfile,
    updateUserProfile
};
