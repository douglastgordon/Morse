const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const port = process.env.PORT || 5000;

app.use("/", express.static(__dirname));

io.on("connection", (socket) => {
  // console.log("user connected")
  socket.on("morse message", (msg) => {
    // console.log(msg)
    io.emit("morse message", msg)
  });
  socket.on('disconnect', () => {
    // console.log("user disconnected");
  });
})

http.listen(port, function() {
  console.log("Listening on " + port);
});
