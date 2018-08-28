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
  let formattedTime = moment(msg.createdAt).format("H:mm");
  let li = jQuery("<li></li>");
  li.text(`${formattedTime} ${msg.from}: ${msg.text}`);
  jQuery("#messages").append(li);
});

socket.on("newLocationMessage", function (msg) {
  let li = jQuery("<li></li>");
  let a = jQuery('<a target="_blank">My location</a>');
  let formattedTime = moment(msg.createdAt).format("H:mm");

  li.text(`${formattedTime} ${msg.from}: `);
  a.attr("href", msg.url);
  li.append(a);
  jQuery("#messages").append(li);
});

jQuery("#message-form").on("submit", function (event) {
  event.preventDefault();

  let messageTextBox = jQuery("[name=message]");

  socket.emit("createMessage", {
    from: "User",
    text: messageTextBox.val()
  }, function () {
    messageTextBox.val(""); // clear the box value
  });
});

let locationButton = jQuery("#send-location");
locationButton.on("click", function () {
  if (!navigator.geolocation) {
    return alert("Geolocation not supported by your browser.");
  }

  locationButton.attr("disabled", "disabled").text("Sending location...");

  navigator.geolocation.getCurrentPosition(function (position) {
    locationButton.removeAttr("disabled").text("Send location");
    socket.emit("createLocationMessage", {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
    locationButton.removeAttr("disabled").text("Send location");
    alert("Unable to fetch location.");
  });
});
