const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const projectRoutes = require('./routes/projects');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(helmet());
app.use(cors({
  origin: ['http://localhost:4200', 'https://anjali-portfolio-backend.onrender.com']
}));

// MongoDB connection
const connectDB = require("./config/db");
connectDB();

// API Routes
app.use('/api', projectRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to Anjali\'s Portfolio!');
});

// Start the server
app.listen(port, () => {
  console.log(`Anjali's Portfolio is listening on port ${port}`);
});
