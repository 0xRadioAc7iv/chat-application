import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import { AuthArgType } from "../types/AuthArgType";

const Signin = ({ setIsSigningUp }: AuthArgType) => {
  const navigate = useNavigate();
  const { signin, checkIsUserLoggedIn } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleFormSubmission = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await signin(email, password);
      checkIsUserLoggedIn();
      navigate("/", { replace: true });
    } catch (error) {
      alert("Failed to sign in");
    }
  };

  return (
    <div>
      <div>
        <p className="mt-8 text-3xl font-bold">Sign in</p>
      </div>
      <div>
        <form onSubmit={handleFormSubmission} className="mt-6 max-w-sm mx-auto">
          <label className="block font-bold">Email </label>
          <input
            className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            name="email"
            value={email}
            placeholder="user@example.com"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label className="block mt-6 font-bold">Password </label>
          <input
            className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            name="password"
            value={password}
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="mt-8">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <div className="mt-4">
        Don't have an account?{" "}
        <span
          onClick={() => setIsSigningUp(true)}
          className="hover:underline hover:cursor-pointer text-blue-700"
        >
          Sign up
        </span>{" "}
        here
      </div>
    </div>
  );
};

export default Signin;
