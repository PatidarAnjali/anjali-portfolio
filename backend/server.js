const express = require('express');
const cors = require('cors');
const projectRoutes = require('./routes/projects');
const helmet = require('helmet');

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

app.use('/projects', projectRoutes);

app.listen(port, () => {
  console.log(`Anjali's Portfolio is listening on port ${port}`)
})

