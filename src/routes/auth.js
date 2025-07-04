// File: src/routes/auth.js

const express = require('express');
const { signup, login } = require('../controllers/authController');
const router = express.Router();

// POST /api/auth/signup
// Registers a new user (name, email, password)
router.post('/signup', signup);

// POST /api/auth/login
// Logs in an existing user and returns a JWT
router.post('/login', login);

module.exports = router;
