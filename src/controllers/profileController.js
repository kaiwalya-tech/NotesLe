// File: src/controllers/profileController.js

// GET /api/profile
function getProfile(req, res) {
    // req.user was set by authMiddleware
    const { id, name, email } = req.user;
    res.json({ id, name, email });
  }
  
  module.exports = { getProfile };
  