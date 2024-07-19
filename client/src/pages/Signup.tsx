import { FcGoogle } from "react-icons/fc";

const Signup = () => {
  return (
    <div>
      <div>
        <h1>Create your account</h1>
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
          <label>Confirm Password: </label>
          <br />
          <input type="password" name="passowrd2" required />
          <br />
          <button type="submit">Signup</button>
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

export default Signup;
