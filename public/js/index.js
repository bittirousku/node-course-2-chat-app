let socket = io(); // open up the web socket

// don't use arrow functions in browser side code,
// for compatibility reasons
socket.on("connect", function () {
  console.log("Connected to server.");
});

socket.on("disconnect", function () {
  console.log("Disconnected from server.");
});

socket.on("newMessage", function (msg) {
  console.log(`${msg.createdAt} ${msg.from}: ${msg.text}`);
  let li = jQuery("<li></li>");
  li.text(`${msg.createdAt} ${msg.from}: ${msg.text}`);
  jQuery("#messages").append(li);
});

// example message emitter
// socket.emit("createMessage", {
//   from: "frank",
//   text: "are you talking to me?"
// }, function (data) {
//   console.log(data);
// });

jQuery("#message-form").on("submit", function (event) {
  event.preventDefault();
  socket.emit("createMessage", {
    from: "User",
    text: jQuery("[name=message]").val()
  }, function (data) {
    console.log(data);
  });
});
