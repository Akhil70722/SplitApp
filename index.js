const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db');
const cors = require('cors');
const morgan = require('morgan');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

// ===== MIDDLEWARE =====
app.use(cors());
app.use(express.json()); // Parse JSON request bodies
app.use(morgan('dev'));  // Log HTTP requests

// Serve frontend files
app.use(express.static(path.join(__dirname, 'public')));

// ===== ROUTES =====
const expenseRoutes = require('./routes/expenseRoutes');
const settlementRoutes = require('./routes/settlementRoutes');
const balanceRoutes = require('./routes/balanceRoutes');
const userRoutes = require('./routes/userRoutes');

// ===== API ROUTES =====
app.use('/api/expenses', expenseRoutes);         // Add, view, update, delete expenses
app.use('/api/settlements', settlementRoutes);   // Settlement logic
app.use('/api/balances', balanceRoutes);         // Balance calculations
app.use('/api/user', userRoutes);                // Login/Register

// Root route serves dashboard
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

// ===== ERROR HANDLING =====
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');

app.use(notFound);       // 404 for unknown routes
app.use(errorHandler);   // General error handler

// ===== START SERVER =====
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
