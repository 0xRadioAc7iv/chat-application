import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div>
      <h1>GoChat - A Chat App</h1>
      <Link to="/chat">
        <button>Get Started!</button>
      </Link>
    </div>
  );
};

export default Landing;
