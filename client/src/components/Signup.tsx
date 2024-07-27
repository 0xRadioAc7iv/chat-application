import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

type SignUpArgType = {
  setIsSigningUp: (arg: Boolean) => void;
};

const Signup = ({ setIsSigningUp }: SignUpArgType) => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleFormSubmission = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await signup(email, username, password);
      navigate("/", { replace: true });
    } catch (error) {
      alert("Failed to sign up");
    }
  };

  return (
    <div>
      <div>
        <p className="mt-8 text-3xl font-bold">Sign up</p>
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
          <label className="block mt-4 font-bold">Username </label>
          <input
            className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="username"
            value={username}
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label className="block mt-4 font-bold">Password </label>
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
        Have an account already?{" "}
        <span
          onClick={() => setIsSigningUp(false)}
          className="hover:underline hover:cursor-pointer text-blue-700"
        >
          Sign in
        </span>{" "}
        here
      </div>
    </div>
  );
};

export default Signup;
