import { MessageType } from "../types/Message";

const Message = ({ user, timeStamp, text }: MessageType) => {
  const date = new Date(timeStamp);
  const humanReadableTime = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="flex items-start space-x-4 p-4 border-b border-gray-300 shadow-lg rounded-md bg-white">
      <div className="flex-shrink-0">
        <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
          {user.charAt(0).toUpperCase()}
        </div>
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-center">
          <div className="font-semibold text-lg text-gray-900">{user}</div>
          <div className="text-sm text-gray-500">{humanReadableTime}</div>
        </div>
        <div className="mt-2 text-gray-700">{text}</div>
      </div>
    </div>
  );
};

export default Message;
