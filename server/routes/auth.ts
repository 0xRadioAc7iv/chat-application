import { Router } from "express";
import passport from "passport";
import "../strategies/local-strategy";
import { User } from "../models/User";
import { hashPassword } from "../helpers/passwordHelpers";

const router = Router();

router.post("/api/auth/signup", async (request, response) => {
  const {
    body: { email, username, password },
  } = request;

  if (!email || !username || !password) return response.sendStatus(400);

  try {
    const existingUser = await User.findOne({ email: email });

    if (existingUser)
      return response.status(400).send({ msg: "Email already in use!" });

    const hashedPassword = hashPassword(password);
    const newUser = new User({
      email: email,
      username: username,
      password: hashedPassword,
    });
    await newUser.save();

    request.logIn(newUser, (err) => {
      if (err) {
        return response.sendStatus(500);
      }
      return response.status(201).send({ username: username });
    });
  } catch (error) {
    return response.sendStatus(500);
  }
});

router.post(
  "/api/auth/signin",
  passport.authenticate("local"),
  (request, response) => {
    response.sendStatus(200);
  }
);

router.post("/api/auth/signout", (request, response) => {
  if (request.user) {
    request.session.destroy((err) => {
      if (err) {
        return response.status(500).send("Failed to log out.");
      }
      response.send({ msg: "Logged out Successfully!" });
    });
  } else {
    response.send({ msg: "Already Logged out!" });
  }
});

router.get("/api/auth/status", (request, response) => {
  return request.user
    ? response.status(200).send({ user: request.user })
    : response.sendStatus(401);
});

export default router;
