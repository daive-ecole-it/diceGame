 

const express = require('express');
const http = require('http');
const cors = require('cors');
const socketIo = require('socket.io');
const connectDB = require('./config/database');
const authRoutes = require('./routes/auth');
const gameRoutes = require('./routes/game');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
app.use(cors());

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use('/api/auth', authRoutes);
app.use('/api/game', gameRoutes);

// Socket.io setup
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('joinGame', (gameId) => {
    socket.join(gameId);
    console.log(`User joined game: ${gameId}`);
  });

  socket.on('leaveGame', (gameId) => {
    socket.leave(gameId);
    console.log(`User left game: ${gameId}`);
  });

  socket.on('move', (data) => {
    const { gameId, move } = data;
    io.to(gameId).emit('move', move);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
