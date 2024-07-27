import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSocket } from "../contexts/SocketContext";
import useSocketConnection from "../hooks/useSocketConnection";
import { Socket } from "socket.io-client";
import Message from "../components/Message";
import { useAuth } from "../contexts/AuthContext";

type Message = {
  user: string;
  timeStamp: number;
  text: string;
};

const Chat = () => {
  const [userMessage, setUserMessage] = useState("");
  const [messages, setMessagesArray] = useState<Array<Message>>([]);
  const users = ["manav", "m2", "m3"];
  const { user } = useAuth();

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
    if (!userMessage) {
      alert("Please enter a message!");
      return;
    }

    socket?.emit("send_public_message", {
      message: userMessage,
      username: user,
    });
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
    <div className="flex h-screen bg-gray-200">
      <div className="w-1/6 p-4 bg-white border-r border-gray-300">
        <div className="font-bold text-xl text-green-500">
          Users Online: {users.length}
        </div>
        <ul className="space-y-2">
          {users.map((user, index) => (
            <li
              key={index}
              className="text-gray-800 break-all text-xl mt-6 font-bold"
            >
              {user}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col flex-1">
        <div className="p-4">
          <Link to="/" className="text-blue-500 hover:text-blue-700">
            <div>Back to Home</div>
          </Link>
        </div>
        <div className="flex-1 p-4 overflow-y-auto custom-scrollbar">
          <div className="space-y-4">{displayMessages}</div>
        </div>
        <div className="p-4 bg-gray-100">
          <div className="flex space-x-4">
            <input
              type="text"
              name="message"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded-md"
              placeholder="Type your message..."
            />
            <button
              onClick={() => sendMessage()}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
