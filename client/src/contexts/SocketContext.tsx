import { createContext, useContext, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import { SocketProviderProps } from "../interfaces/SocketProviderProps";
import { SERVER_URL } from "../constants";

const SocketContext = createContext<Socket | null>(null);

export const SocketProvider = ({ children }: SocketProviderProps) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketInstance = io(SERVER_URL, {
      autoConnect: false,
    });

    setSocket(socketInstance);

    return () => {
      if (socketInstance.connected) {
        socketInstance.disconnect();
      }
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};
