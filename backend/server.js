const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// MongoDB connection
const connectDB = require("./config/db");
connectDB();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})