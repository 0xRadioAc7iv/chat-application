import { useEffect } from "react";
import { Socket } from "socket.io-client";

const useSocketConnection = (socket: Socket) => {
  useEffect(() => {
    if (socket && !socket.connected) {
      socket.connect();
    }

    return () => {
      if (socket && socket.connected) {
        socket.disconnect();
      }
    };
  }, [socket]);
};

export default useSocketConnection;
