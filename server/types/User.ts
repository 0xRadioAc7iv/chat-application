import { Socket } from "socket.io";

export type User = {
  socketId: Socket;
  username: String;
};
