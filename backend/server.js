const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const router = express.Router();
const Project = require('./models/Project');

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

app.get('/', (req, res) => {
  res.send('Welcome to Anjali\'s Portfolio!');
});

router.get('/projects', async (req, res, next) => {
  try {
    const projects = await Project.find();
    console.log(projects);
    res.json(projects);
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Anjali's Portfolio is listening on port ${port}`);
});
