import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import Signup from "../components/Signup";
import Signin from "../components/Signin";

const Landing = () => {
  const { isAuthenticated, logout } = useAuth();
  const [isSigningUp, setIsSigningUp] = useState<Boolean>(false);

  return (
    <div>
      <h1>GoChat - A Chat App</h1>
      {isAuthenticated && (
        <div>
          <Link to="/chat">
            <button>Get Started!</button>
          </Link>
          <button onClick={logout}>Sign Out</button>
        </div>
      )}
      {!isAuthenticated &&
        (isSigningUp ? (
          <Signup setIsSigningUp={setIsSigningUp} />
        ) : (
          <Signin setIsSigningUp={setIsSigningUp} />
        ))}
    </div>
  );
};

export default Landing;
