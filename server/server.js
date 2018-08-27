require("./config/config.js");

const path = require("path");
const bodyParsers = require("body-parser");
const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT;

let app = express();
let server = http.createServer(app);  // manually create http server
let io = socketIO(server);

app.use(express.static(publicPath));


io.on("connection", (socket) => {
  console.log("New user connected");

  // socket.emit("newEmail", {
  //   from: "dick@ocp.com",
  //   text: "I think you'd better do what he says, Mr. Kinney.",
  //   createdAt: 2203
  // });

  socket.on("createMessage", (msg) => {
    socket.emit("newMessage", {
      from: msg.from,
      text: msg.text,
      createdAt: 666
    });
  });

  socket.on("createEmail", (newEmail) => {
    console.log("createEmail:", newEmail);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected.");
  });
});


// Start server
server.listen(port, () => {
  console.log(`Started on port ${port}.`);
});
