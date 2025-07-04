// File: src/middleware/authMiddleware.js

const jwt = require('jsonwebtoken');

/**
 * protect – Express middleware to guard routes via JWT.
 */
function protect(req, res, next) {
  const authHeader = req.headers.authorization;
  // 1. Check for header and “Bearer ”
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Not authorized, token missing' });
  }
  // 2. Extract token
  const token = authHeader.split(' ')[1];
  try {
    // 3. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // 4. Attach user payload to req.user
    req.user = decoded; // { id, name, email }
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token invalid or expired' });
  }
}

module.exports = { protect };
