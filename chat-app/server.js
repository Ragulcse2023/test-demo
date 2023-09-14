const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const PORT = process.env.PORT || 3000; // Use the provided port or default to 3000

// Serve static files (e.g., HTML, CSS, JavaScript)
app.use(express.static(__dirname + '/public'));

// User data storage (for simplicity, you can replace this with a database)
const users = {};

io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle user authentication (you can implement a more secure authentication mechanism)
  socket.on('authenticate', (username) => {
    if (!users[username]) {
      users[username] = socket.id;
      socket.username = username;
      io.emit('user-connected', username);
    }
  });

  // Handle chat messages
  socket.on('chat message', (message) => {
    io.emit('chat message', { username: socket.username, message });
  });

  // Handle user disconnection
  socket.on('disconnect', () => {
    if (socket.username) {
      delete users[socket.username];
      io.emit('user-disconnected', socket.username);
    }
  });
});
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
