const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const port = process.env.PORT || 5000;
const messageName = "morse message"
app.use("/", express.static(__dirname));

io.on("connection", (socket) => {
  // console.log("user connected")
  socket.on(messageName, (msg, userId) => {
    console.log(msg)
    io.emit(messageName, msg, userId)
  });
  socket.on('disconnect', () => {
    // console.log("user disconnected");
  });
})

http.listen(port, function() {
  console.log("Listening on " + port);
});
