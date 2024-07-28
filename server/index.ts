import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
import mongoose from "mongoose";
import { Server } from "socket.io";
import http from "http";
import session from "express-session";
import passport from "passport";
import authRouter from "./routes/auth";
import MongoStore from "connect-mongo";
import { Message } from "./types/Message";

configDotenv();

const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);

// Holds the latest 25 messages sent to new users on joining the server
const latestMessages: Array<Message> = [];
// Holds mapping of usernames with their socket ids
const users: Map<String, String> = new Map();

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_ORIGIN_URL,
  },
});

// Middlewares
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN_URL,
    credentials: true,
  })
);
app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 604800, // 7 Days in Seconds
      httpOnly: true,
      // secure: true
    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URL as string,
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Auth Routes
app.use(authRouter);

// Get latest messages API Route
app.get("/api/get-latest-messages", (request, response) => {
  response.send({ latestMessages: latestMessages });
});

// Socket Events
io.on("connection", (socket) => {
  socket.on("send_public_message", (data) => {
    const dataToSend = {
      user: data.username,
      text: data.message,
      timeStamp: Date.now(),
    };

    if (latestMessages.length == 25) {
      latestMessages.shift();
    }
    latestMessages.push(dataToSend);

    io.emit("receive_public_message", dataToSend);
  });

  socket.on("add_user", (data) => {
    users.set(socket.id, data.user);
    io.emit("updated_user_array", Array.from(users.values()));
  });

  socket.on("disconnect", () => {
    users.delete(socket.id);
    io.emit("updated_user_array", Array.from(users.values()));
  });
});

mongoose
  .connect(process.env.MONGODB_URL as string)
  .then(() => {
    server.listen(port);
  })
  .catch((error) => console.log(error));
