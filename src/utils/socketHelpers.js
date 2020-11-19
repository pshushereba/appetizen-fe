import io from "socket.io-client";
let socket;

export const initiateSocket = (room) => {
  socket = io("http://localhost:5000/", {
    transports: ["websocket"],
  });
  console.log(`Connecting socket...`);
  if (socket && room) socket.emit("join", room);
};

export const initiateVideoSocket = (room) => {
  socket = io("http://localhost:5000/video", {
    transports: ["websocket"],
  });
  console.log(`Connecting socket...`);
  if (socket && room) socket.emit("join", room);
};

export const initiateChatSocket = (room, username) => {
  socket = io("http://localhost:5000/chat", {
    transports: ["websocket"],
  });
  console.log(`Connecting socket...`);
  if (socket && room) socket.emit("join", room, username);
};

export const disconnectSocket = () => {
  console.log("Disconnecting socket...");
  if (socket) socket.disconnect();
};

export const subscribeToChat = (cb) => {
  if (!socket) return true;
  socket.on("chat", (msg) => {
    console.log("Websocket event received!");
    return cb(null, msg);
  });
};

export const sendMessage = (room, message) => {
  if (socket) socket.emit("chat", { message, room });
};
