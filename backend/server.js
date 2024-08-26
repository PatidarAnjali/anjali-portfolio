require("dotenv").config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const { createServer } = require("http");
const { Server } = require("socket.io");
const Project = require('./models/Project');
const connectDB = require("./config/db");

const app = express();
const frontendURL = 'https://anjali-portfolio-frontend.onrender.com';

// Middleware
app.use(helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false
}));
app.use(express.json());
app.use(cors({
  origin: frontendURL
}));
app.use(cookieParser());
app.use(fileUpload());

// MongoDB connection
connectDB();

// Socket.io setup
const httpServer = createServer(app);
global.io = new Server(httpServer);

const admins = [];
let activeChats = [];

function get_random(array) {
  return array[Math.floor(Math.random() * array.length)];
}

io.on("connection", (socket) => {
  socket.on("admin connected with server", (adminName) => {
    admins.push({ id: socket.id, admin: adminName });
  });

  socket.on("client sends message", (msg) => {
    if (admins.length === 0) {
      socket.emit("no admin", "");
    } else {
      let client = activeChats.find(client => client.clientId === socket.id);
      let targetAdminId;

      if (client) {
        targetAdminId = client.adminId;
      } else {
        let admin = get_random(admins);
        activeChats.push({ clientId: socket.id, adminId: admin.id });
        targetAdminId = admin.id;
      }

      socket.broadcast.to(targetAdminId).emit("server sends message from client to admin", {
        user: socket.id,
        message: msg,
      });
    }
  });

  socket.on("admin sends message", ({ user, message }) => {
    socket.broadcast.to(user).emit("server sends message from admin to client", message);
  });

  socket.on("admin closes chat", (socketId) => {
    socket.broadcast.to(socketId).emit("admin closed chat", "");
    let c = io.sockets.sockets.get(socketId);
    c.disconnect();
  });

  socket.on("disconnect", (reason) => {
    // Admin disconnected
    const removeIndex = admins.findIndex(item => item.id === socket.id);
    if (removeIndex !== -1) {
      admins.splice(removeIndex, 1);
    }
    activeChats = activeChats.filter(item => item.adminId !== socket.id);

    // Client disconnected
    const removeIndexClient = activeChats.findIndex(item => item.clientId === socket.id);
    if (removeIndexClient !== -1) {
      activeChats.splice(removeIndexClient, 1);
    }

    socket.broadcast.emit("disconnected", { reason: reason, socketId: socket.id });
  });
});

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to Anjali\'s Portfolio!');
});

app.get('/about', (req, res) => {
  res.send('This is Anjali\'s About section!');
});

app.get('/projects', async (req, res, next) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Serve static files for production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist/anjali-portfolio')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/anjali-portfolio/index.html'));
  });
}

// Global error handler
app.use((err, req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    console.error(err);
  }
  res.status(500).json({ message: err.message, stack: process.env.NODE_ENV === "development" ? err.stack : undefined });
});

// Start the server
const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Anjali's Portfolio is listening on port ${PORT}`);
});
