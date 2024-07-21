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
  const [chatState, setChatState] = useState<"PRIVATE" | "PUBLIC" | null>(null);
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

  const setPublicChat = () => {
    setChatState("PUBLIC");
    joinPublicChatRoom();
  };

  const setPrivateChat = () => {
    setChatState("PRIVATE");
    leavePublicChatRoom();
  };

  const joinPublicChatRoom = () => {
    socket?.emit("join_public_room");
  };

  const leavePublicChatRoom = () => {
    socket?.emit("leave_public_room");
  };

  const sendMessage = async () => {
    if (chatState === "PUBLIC") {
      socket?.emit("send_public_message", { message: userMessage });
      setUserMessage("");
    }
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

  return (
    <div id="main">
      <div id="sidebar">
        <Link to="/" id="leave-chat-room">
          <div>←</div>
        </Link>
        <button onClick={() => setPublicChat()}>Public Chat</button>
        <div>
          <button onClick={() => setPrivateChat()}>Private Chat</button>
          <div>User</div>
          <div>User</div>
          <div>User</div>
        </div>
      </div>
      {chatState === null && (
        <div id="chat-main">
          <div>
            <h1>
              Join the Public Chat Room or Click on a user to start Chatting!!!
            </h1>
          </div>
        </div>
      )}
      {chatState !== null && (
        <div id="chat-main">
          <div>Chatting with User</div>
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
      )}
    </div>
  );
};

export default Chat;
