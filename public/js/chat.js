let socket = io(); // open up the web socket

// don't use arrow functions in browser side code,
// for compatibility reasons
function scrollToBottom () {

  let messages = jQuery("#messages");
  let newMessage = messages.children("li:last-child");

  let clientHeight = messages.prop("clientHeight");
  let scrollTop = messages.prop("scrollTop");
  let scrollHeight = messages.prop("scrollHeight");
  let newMessageHeight = newMessage.innerHeight();
  let lastMessageHeight = newMessage.prev().innerHeight();

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  }
}


socket.on("connect", function () {
  console.log("Connected to server.");
  let params = jQuery.deparam(window.location.search);  // some kind of hack

  socket.emit("join", params, function (error) {
    if (error) {
      alert(error);
      window.location.href = "/";
    } else {
      console.log("parametrit:", params);
      console.log("No error in joining channel.");
    }
  });
});

socket.on("disconnect", function () {
  console.log("Disconnected from server.");
});

socket.on("newMessage", function (msg) {
  let formattedTime = moment(msg.createdAt).format("H:mm");
  let template = jQuery("#message-template").html();
  let html = Mustache.render(template, {
    text: msg.text,
    from: msg.from,
    createdAt: formattedTime
  });
  jQuery("#messages").append(html);
  scrollToBottom();
});

socket.on("newLocationMessage", function (msg) {
  let formattedTime = moment(msg.createdAt).format("H:mm");
  let template = jQuery("#location-message-template").html();
  let html = Mustache.render(template, {
    from: msg.from,
    url: msg.url
  });
  jQuery("#messages").append(html);
  scrollToBottom();
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
