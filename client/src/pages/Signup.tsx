import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Signup = () => {
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
        <h1>Create your account</h1>
      </div>
      <div>
        <form onSubmit={handleFormSubmission}>
          <label>Email: </label>
          <br />
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <br />
          <label>Username: </label>
          <br />
          <input
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <br />
          <label>Password: </label>
          <br />
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <br />
          <button type="submit">Signup</button>
        </form>
      </div>
      <div>
        Have an account already? <Link to="/signin">Log in</Link> here
      </div>
    </div>
  );
};

export default Signup;
