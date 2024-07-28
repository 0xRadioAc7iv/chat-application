import { useEffect } from "react";
import { Socket } from "socket.io-client";
import { useAuth } from "../contexts/AuthContext";

const useSocketConnection = (socket: Socket) => {
  const { user } = useAuth();

  useEffect(() => {
    if (socket && !socket.connected) {
      socket.connect();
      socket.emit("add_user", { user: user });
    }

    return () => {
      if (socket && socket.connected) {
        socket.disconnect();
      }
    };
  }, [socket]);
};

export default useSocketConnection;
