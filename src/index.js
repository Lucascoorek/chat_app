require('dotenv').config();
const connectDB = require('./config/db');
const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
connectDB();
const io = socketio(server);

/* Passing io object to routes */
const routes = require('./routes/index')(io);
app.use('/', routes);

const port = process.env.PORT || 5000;
const publicDirectoryPath = path.join(__dirname, '../client/public');

app.use(express.static(publicDirectoryPath));

server.listen(port, () => {
  console.log(`Server is up on port ${port}!`);
});
