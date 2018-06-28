const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const port = process.env.PORT || 5000;

app.use("/", express.static(__dirname));

io.on("connection", (socket) => {
  console.log("user connected")
})

http.listen(port, function() {
  console.log("Listening on " + port);
});
