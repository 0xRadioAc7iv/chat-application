import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";

const Signin = () => {
  const navigate = useNavigate();
  const { signin } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleFormSubmission = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await signin(email, password);
      navigate("/", { replace: true });
    } catch (error) {
      alert("Failed to sign in");
    }
  };

  return (
    <div>
      <div>
        <h1>Log in to your account</h1>
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
          <button type="submit">Login</button>
        </form>
      </div>
      <div>
        Don't have an account? <Link to="/signup">Sign up</Link> here
      </div>
    </div>
  );
};

export default Signin;
