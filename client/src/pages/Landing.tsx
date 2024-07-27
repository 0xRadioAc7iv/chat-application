import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import Signup from "../components/Signup";
import Signin from "../components/Signin";

const Landing = () => {
  const { isAuthenticated, logout } = useAuth();
  const [isSigningUp, setIsSigningUp] = useState<Boolean>(false);

  return (
    <div className="bg-gray-100 flex flex-col items-center justify-center h-screen">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl font-bold">Another F**king Chat App</h1>
        {isAuthenticated && (
          <div className="mt-8">
            <div className="mb-2">
              <Link to="/chat">
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  Start Chatting!
                </button>
              </Link>
            </div>
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Sign Out
            </button>
          </div>
        )}
        {!isAuthenticated &&
          (isSigningUp ? (
            <Signup setIsSigningUp={setIsSigningUp} />
          ) : (
            <Signin setIsSigningUp={setIsSigningUp} />
          ))}
      </div>
    </div>
  );
};

export default Landing;
