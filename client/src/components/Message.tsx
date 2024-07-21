type MessageProps = {
  user: string;
  timeStamp: number;
  text: string;
};

const Message = ({ user, timeStamp, text }: MessageProps) => {
  return (
    <div>
      <div>{user}</div>
      <div>{text}</div>
      <div>{timeStamp}</div>
    </div>
  );
};

export default Message;
