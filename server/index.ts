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

configDotenv();

const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_ORIGIN_URL,
  },
});

app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN_URL,
  })
);
app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 604800, // 7 Days
    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URL as string,
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(authRouter);

io.on("connection", (socket) => {
  console.log(`${socket.id} just connected!`);

  // Notify users in public room when some connects or disconnects

  socket.on("send_public_message", (data) => {
    const dataToSend = {
      user: socket.id,
      text: data.message,
      timeStamp: Date.now(),
    };
    io.emit("receive_public_message", dataToSend);
  });

  socket.on("disconnect", () => {
    console.log(`${socket.id} just disconnected!`);
  });
});

mongoose.connect(process.env.MONGODB_URL as string).then(() => {
  console.log("Connected to MongoDB");
  server.listen(port, () => {
    console.log(`Server is listening on port:${port}`);
  });
});
