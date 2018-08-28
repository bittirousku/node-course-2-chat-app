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

socket.on("newLocationMessage", function (message) {
  let li = jQuery("<li></li>");
  let a = jQuery('<a target="_blank">My location</a>');

  li.text(`${message.from}: `);
  a.attr("href", message.url);
  li.append(a);
  jQuery("#messages").append(li);
});

jQuery("#message-form").on("submit", function (event) {
  event.preventDefault();
  socket.emit("createMessage", {
    from: "User",
    text: jQuery("[name=message]").val()
  }, function (data) {
    console.log(data);
  });
});

let locationButton = jQuery("#send-location");
locationButton.on("click", function () {
  if (!navigator.geolocation) {
    return alert("Geolocation not supported by your browser.");
  }
  navigator.geolocation.getCurrentPosition(function (position) {
    console.log(position);
    socket.emit("createLocationMessage", {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
    alert("Unable to fetch location.");
  });
});
