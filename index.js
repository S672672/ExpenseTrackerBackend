const express = require('express');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');
const User = require('./models/User');
const authRoutes = require('./routes/authRoutes');
const app = express();
const cors = require('cors');
const profileRoutes = require('./routes/profileRoutes');
const expenseRoutes = require('./routes/expenseRoutes');


// Configure Express
app.use(express.json());
// app.use(express.urlencoded({extended: false}));
app.use(cors());

// Configure session middleware
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));

// Initialize Passport and session
app.use(passport.initialize());
app.use(passport.session());

// Connect to MongoDB
mongoose.connect('mongodb+srv://bsmith672:smith123@cluster0.xdxj3gv.mongodb.net/expensetracker', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

// Passport configuration
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Routes
app.use('/auth', authRoutes);
app.use('/expenses',expenseRoutes);
app.use('/get-profile',profileRoutes);

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

