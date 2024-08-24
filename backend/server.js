const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const projectRoutes = require('./routes/projects'); // Adjust the path if necessary

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(helmet());
app.use(cors({
  origin: ['http://localhost:4200', 'https://anjali-portfolio-backend.onrender.com/']
}));

// MongoDB connection
const connectDB = require("./config/db");
connectDB();

// API Routes
app.use('/api', projectRoutes);

// Serve static files from Angular build
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "anjali-portfolio/browser")));
  
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "anjali-portfolio/browser", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.json({ message: "API running..." });
  });
}

// Start the server
app.listen(port, () => {
  console.log(`Anjali's Portfolio is listening on port ${port}`);
});
