const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const Project = require('./models/Project');
const connectDB = require("./config/db");

const app = express();
const url = 'https://anjali-portfolio-backend.onrender.com';

// Middleware
app.use(express.json());
app.use(helmet());
app.use(cors({
  origin: url
}));

// MongoDB connection
connectDB();

// Serve static files (if any)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
}

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to Anjali\'s Portfolio!');
});

app.get('/projects', async (req, res, next) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Global error handler 
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Anjali's Portfolio is listening on port ${port}`);
});
