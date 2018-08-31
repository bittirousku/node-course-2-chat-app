require("./config/config.js");

const path = require("path");
const bodyParsers = require("body-parser");
const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

const {generateMessage, generateLocationMessage} = require("./utils/message.js");
const {isRealString} = require("./utils/validation.js");
const {Users} = require("./utils/users.js");

const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT;

let app = express();
let server = http.createServer(app);  // manually create http server
let io = socketIO(server);
let users = new Users();

app.use(express.static(publicPath));

io.on("connection", (socket) => {
  console.log("New user connected");

  socket.on("join", (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.channel)) {
      return callback("Name and room name are required.");
    }
    // join the channel:
    socket.join(params.channel);

    // Update users list:
    users.removeUser(socket.id);  // user can be in only one room??
    users.addUser(socket.id, params.name, params.channel);
    io.to(params.channel).emit("updateUserList", users.getUserList(params.channel));

    // socket.emit sends it to self:
    socket.emit("newMessage", generateMessage(
      "Admin",
      `Welcome to channel #${params.channel}, user ${params.name}`
    ));

    // socket.broadcast sends it to everyone *else* (not self):
    socket.broadcast.to(params.channel).emit("newMessage", generateMessage(
      "Admin",
      `${params.name} joined the channel`
    ));

    callback();
  });

  socket.on("createMessage", (msg, callback) => {
    console.log(msg);
    // io.emit sends it to everyone:
    io.emit("newMessage", generateMessage(
      msg.from,
      msg.text
    ));
    callback();
  });

  socket.on("createLocationMessage", (coords) => {
    io.emit("newLocationMessage", generateLocationMessage(
      "Admin",
      coords.latitude,
      coords.longitude
    ));
  });

  socket.on("disconnect", () => {
    console.log("User disconnected.");
    let user = users.removeUser(socket.id);

    if (user) {
      io.to(user.channel).emit("updateUserList", users.getUserList(user.channel));
      io.to(user.channel).emit("newMessage", generateMessage(
        "Admin",
        `${user.name} has left the channel`
      ));
    }
  });
});


// Start server
server.listen(port, () => {
  console.log(`Started on port ${port}.`);
});
