import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer, {
    path: '/sync-play/socket.io', // ✅ This is important
  });
  global._io = io;
  io.on("connection", (socket) => {
    console.log("✅ Socket connected");
    socket.on("join-room", (roomName) => {
      socket.join(roomName);
    });
  });

  httpServer.listen(port, () => {
    console.log(`✅ Server running at http://localhost:${port}/sync-play`);
  });
});
