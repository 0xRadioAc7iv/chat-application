import passport from "passport";
import { Strategy } from "passport-local";
import { User } from "../models/User";
import { IUser } from "../interfaces/User";
import { comparePasswords } from "../helpers/passwordHelpers";

passport.serializeUser((user, done) => {
  done(null, (user as IUser)._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const findUser = await User.findById(id);
    if (!findUser) throw new Error("User not found");
    done(null, findUser);
  } catch (error) {
    done(error, false);
  }
});

export default passport.use(
  new Strategy({ usernameField: "email" }, async (email, password, done) => {
    try {
      const findUser = await User.findOne({ email: email });
      if (!findUser) throw new Error("User not found");
      if (!comparePasswords(password, findUser.password))
        throw new Error("Invalid Credentials");
      done(null, findUser);
    } catch (error) {
      done(error, false);
    }
  })
);
