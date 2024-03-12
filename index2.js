// code for socket connection javascript server side

// Path: index.js
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

// listen to socket io connection

io.on("connection", (socket) => {
  console.log("New connection from: " + socket.handshake.address);
});

// io receive data
io.on("data", (data) => {
  console.log("Data received: " + data);
});

io.on("disconnect", (socket) => {
  console.log("Connection closed from: " + socket.handshake.address);
});

// express to handle all requests
app.get("/", (req, res) => {
  console.log('------ GET REQUEST ------');
  console.log(req);
  res.status(200).json({ message: "GET request received" });
});

app.post("/", (req, res) => {
  console.log('------ POST REQUEST ------');
  console.log(req);
  res.status(200).json({ message: "POST request received" });
});

app.all("*", (req, res) => {
  console.log('------ ALL REQUEST ------');
  console.log(req);
  res.status(200).json({ message: "ALL request received" });
});

server.listen(3000, (req, res) => {
  console.log("TEST Server started on port 3000");
  // keep repeat the heartbeat call every 5 seconds
  // const hbRes = heartBeat('52303');
  // console.log(hbRes);
});