import { FcGoogle } from "react-icons/fc";

const Signin = () => {
  return (
    <div>
      <div>
        <h1>Log in to your account</h1>
      </div>
      <div>
        <form method="post">
          <label>Email: </label>
          <br />
          <input type="email" name="email" required />
          <br />
          <label>Password: </label>
          <br />
          <input type="password" name="password1" required />
          <br />
          <button type="submit">Login</button>
          <br />
          <p>OR</p>
          <div>
            <button type="submit">
              <div>
                <FcGoogle />
                Google
              </div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
