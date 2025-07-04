// File: src/routes/profile.js

const express = require('express');
const { getProfile } = require('../controllers/profileController');
const router = express.Router();

// GET /api/profile
// Returns the logged-in user’s id, name, and email
router.get('/', getProfile);

module.exports = router;
