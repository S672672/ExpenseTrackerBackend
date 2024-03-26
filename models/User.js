const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    // Add more fields as needed for user profile
});

// Apply passport-local-mongoose plugin
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);
