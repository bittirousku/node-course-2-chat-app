let socket = io(); // open up the web socket

// don't use arrow functions in browser side code,
// for compatibility reasons
socket.on("connect", function () {
  console.log("Connected to server.");

  // socket.emit("createEmail", {
  //   to: "dick@ocp.com",
  //   text: "Dick, you are fired!"
  // });
  socket.emit("createMessage", {
    from: "boss",
    text: "Dick, you are fired!"
  });

});

socket.on("disconnect", function () {
  console.log("Disconnected from server.");
});

socket.on("newEmail", function (email) {
  console.log("New email.", email);
});

socket.on("newMessage", function (msg) {
  console.log(`${msg.createdAt} ${msg.from}: ${msg.text}`);
});
