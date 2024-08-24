const express = require('express');
const cors = require('cors');
const projectRoutes = require('./routes/projects');
const helmet = require('helmet');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // middleware
app.use(helmet());

app.use(cors({
  origin: 'http://localhost:4200'
}));

// MongoDB connection
const connectDB = require("./config/db");
connectDB();

app.use('/api', projectRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist/anjali-portfolio/browser")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend", "dist", "anjali-portfolio", "browser", "assets", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.json({
      message: "API running..."
    });
  })
};

app.listen(port, () => {
  console.log(`Anjali's Portfolio is listening on port ${port}`)
});