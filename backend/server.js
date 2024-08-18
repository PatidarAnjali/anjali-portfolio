const express = require('express')
const projectRoutes = require('./routes/projects');

const app = express()
const port = 3000

app.use(express.json()); // middleware

// MongoDB connection
const connectDB = require("./config/db");
connectDB();

app.use('/api', projectRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})