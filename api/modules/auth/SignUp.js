const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// POST endpoint to handle form submission
app.post('/submit-form', (req, res) => {
  const { firstName, lastName, email, password, passwordConfirmation, marketingAccept } = req.body;

  // Validate form data
  // (You would typically perform more thorough validation here)

  if (!firstName || !lastName || !email || !password || !passwordConfirmation || typeof marketingAccept !== 'boolean') {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (password !== passwordConfirmation) {
    return res.status(400).json({ error: 'Password and confirmation do not match' });
  }

  // If all validations pass, you can process the form data as needed
  // For example, you could save it to a database

  // Send a success response
  res.status(200).json({ message: 'Form submitted successfully' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
