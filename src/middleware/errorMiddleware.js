// File: src/middleware/errorMiddleware.js

// Central error handler: catches any error passed via next(err)
function errorHandler(err, req, res, next) {
    console.error(err.stack);              // Log full stack to console
    res.status(err.statusCode || 500).json({
      message: err.message || 'Server Error'
    });
  }
  
  module.exports = { errorHandler };
  