const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const supabase = require('../supabaseClient');

// POST /signup
router.post('/signup', async (req, res) => {
const { name, email, password, role } = req.body;

try {
// Check if user already exists
const { data: existingUsers, error: existsError } = await supabase
.from('users')
.select('id')
.eq('email', email);

php
Copy
Edit
if (existsError) throw existsError;
if (existingUsers.length > 0) {
  return res.status(400).json({ error: 'User already exists' });
}

// Hash the password
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password, salt);

// Insert the user
const { data: newUser, error: insertError } = await supabase
  .from('users')
  .insert([{ name, email, password: hashedPassword, role }])
  .select();

if (insertError) throw insertError;

// Generate JWT token
const token = jwt.sign(
  { id: newUser[0].id, role: newUser[0].role },
  process.env.JWT_SECRET,
  { expiresIn: '1h' }
);

res.status(201).json({ token });
} catch (error) {
console.error('Signup Error:', error.message);
res.status(500).json({ error: 'Signup failed' });
}
});

module.exports = router;