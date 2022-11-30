const { Server } = require("socket.io");

const io = new Server(13500, {
  cors: { origin: "*" }
});

module.exports = io;
