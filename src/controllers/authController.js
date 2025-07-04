// File: src/controllers/authController.js

const bcrypt = require('bcryptjs');
const jwt    = require('jsonwebtoken');
const User   = require('../models/User');

// POST /api/auth/signup
async function signup(req, res, next) {
  try {
    const { name, email, password } = req.body;
    // 1. Prevent duplicate emails
    if (await User.findOne({ email })) {
      return res.status(400).json({ message: 'Email already in use' });
    }
    // 2. Hash password
    const salt   = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    // 3. Create and save user
    const user = await User.create({ name, email, password: hashed });
    res.status(201).json({ message: 'User registered', userId: user._id });
  } catch (err) {
    next(err);
  }
}

// POST /api/auth/login
async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    // 1. Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    // 2. Compare plain vs. hashed
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });
    // 3. Sign a token
    const payload = { id: user._id, name: user.name, email: user.email };
    const token   = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    next(err);
  }
}

module.exports = { signup, login };
