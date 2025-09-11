import 'dotenv/config';
import { connectDB } from './src/config/connect.js';
import fastify from 'fastify';
import { PORT } from './src/config/config.js';
import { registerRoutes } from "./src/routes/index.js";
import { admin, buildAdminRouter } from './src/config/setup.js';
import { Server as SocketIOServer } from "socket.io";

const start = async () => {
  await connectDB(process.env.MONGO_URI);

  const app = fastify();

  // Register routes
  await registerRoutes(app);

  await buildAdminRouter(app);

  // Start Fastify server
  await app.listen({ port: PORT, host: '0.0.0.0' });
  console.log(`🚀 Grocery App running on http://localhost:${PORT}${admin.options.rootPath}`);

  // Attach socket.io to Fastify’s native HTTP server
  const io = new SocketIOServer(app.server, {
    cors: {
      origin: "*", // 👈 adjust for production
    },
    pingInterval: 10000,
    pingTimeout: 5000,
    transports: ["websocket"]
  });

  // Socket.io connection listener
  io.on("connection", (socket) => {
    console.log("✅ A User Connected:", socket.id);

    socket.on("joinRoom", (orderId) => {
      socket.join(orderId);
      console.log(`📦 User joined room ${orderId}`);
    });

    socket.on("disconnect", () => {
      console.log("❌ User Disconnected:", socket.id);
    });
  });
}; 

start();