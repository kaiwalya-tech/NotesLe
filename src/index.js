// File: src/index.js

// 1. Load environment variables
require('dotenv').config();

// 2. Import dependencies
const express       = require('express');
const cors          = require('cors');                  // <-- optional
const connectDB     = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');
const authRoutes = require('./routes/auth');
// 8. Protected routes (JWT required)
const { protect } = require('./middleware/authMiddleware');
const profileRoutes = require('./routes/profile');
const itemRoutes    = require('./routes/items');

// 3. Create the Express app
const app = express();

// 4. (Optional) Enable CORS so your plain‑HTML pages can call the API  
app.use(cors());

// 5. Connect to MongoDB
connectDB();

// 6. Built‑in middleware for JSON bodies
app.use(express.json());

// 7. Public routes (no auth required)
//    POST /api/auth/signup
//    POST /api/auth/login
app.use('/api/auth', authRoutes);


app.use('/api/profile', protect, profileRoutes);
app.use('/api/items',   protect, itemRoutes);

// 9. Central error handler (must be last)
app.use(errorHandler);

// 10. Start listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
