import { Link } from "react-router-dom";
import "../styles/Chat.css";
import { useEffect, useState } from "react";
import { useSocket } from "../contexts/SocketContext";
import useSocketConnection from "../hooks/useSocketConnection";
import { Socket } from "socket.io-client";
import Message from "../components/Message";

type Message = {
  user: string;
  timeStamp: number;
  text: string;
};

const Chat = () => {
  const [userMessage, setUserMessage] = useState("");
  const [messages, setMessagesArray] = useState<Array<Message>>([]);

  const displayMessages = messages.map((message, index) => {
    return (
      <Message
        key={index}
        user={message.user}
        timeStamp={message.timeStamp}
        text={message.text}
      />
    );
  });

  const socket = useSocket();
  useSocketConnection(socket as Socket);

  const sendMessage = async () => {
    socket?.emit("send_public_message", { message: userMessage });
    setUserMessage("");
  };

  useEffect(() => {
    const handleReceivePublicMessage = (data: Message) => {
      setMessagesArray((prevMessages) => [...prevMessages, { ...data }]);
    };

    socket?.on("receive_public_message", handleReceivePublicMessage);

    return () => {
      socket?.off("receive_public_message", handleReceivePublicMessage);
    };
  }, [socket]);

  useEffect(() => {
    fetch("http://localhost:3000/api/get-latest-messages")
      .then((response) => response.json())
      .then((data) => setMessagesArray(data.latestMessages));
  }, []);

  return (
    <div id="main">
      <div id="sidebar">
        <Link to="/" id="leave-chat-room">
          <div>← EXIT</div>
        </Link>
      </div>
      <div id="chat-main">
        <div>{displayMessages}</div>
        <div>
          <input
            type="text"
            name="message"
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
          />
          <button onClick={() => sendMessage()}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
