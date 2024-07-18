import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
import mongoose from "mongoose";
import { Server } from "socket.io";
import http from "http";

configDotenv();

const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);

app.get("/", (req, res) => {
  res.send({ msg: "Hello!" });
});

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

io.on("connection", (socket) => {
  console.log(`${socket} just connected!`);
});

mongoose.connect(process.env.MONGODB_URL as string).then(() => {
  console.log("Connected to MongoDB");
  server.listen(port, () => {
    console.log(`Server is listening on port:${port}`);
  });
});
