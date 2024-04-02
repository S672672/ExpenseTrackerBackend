// Assuming you're using Express for your Node.js backend
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

// Dummy user data (replace this with your database)
const users = [];

// Sign up route
app.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Store user data (in memory, replace with database storage)
        users.push({ username, email, password: hashedPassword });

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Login route
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = users.find(u => u.email === email);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare passwords
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT
        const token = jwt.sign({ email: user.email }, 'your_secret_key');

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Example protected route
app.get('/protected', (req, res) => {
    // Verify JWT
    const token = req.headers.authorization;
    try {
        const decoded = jwt.verify(token, 'your_secret_key');
        res.status(200).json({ message: 'Access granted', user: decoded.email });
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized' });
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
