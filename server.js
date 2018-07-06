const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const port = process.env.PORT || 5000;
const messageName = "morse message"
app.use("/", express.static(__dirname));

io.on("connection", (socket) => {
  socket.on(messageName, (msg, userId) => {
    io.emit(messageName, msg, userId)
  });
  socket.on('disconnect', () => {
  });
})

http.listen(port, function() {
  console.log("Listening on " + port);
});
