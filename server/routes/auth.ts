import { Router } from "express";
import passport from "passport";
import "../strategies/local-strategy";
import { User } from "../models/User";
import { hashPassword } from "../helpers/passwordHelpers";

const router = Router();

router.post("/api/auth/signup", async (request, response) => {
  const {
    body: { email, password },
  } = request;

  if (!email || !password) return response.sendStatus(400);

  try {
    const existingUser = await User.findOne({ email: email });

    if (existingUser)
      return response.status(400).send({ msg: "Email already in use!" });
  } catch (error) {
    return response.sendStatus(500);
  }

  const hashedPassword = hashPassword(password);
  const newUser = new User({ email: email, password: hashedPassword });
  newUser.save();

  request.login(newUser, (err) => {
    if (err) {
      return response.sendStatus(500);
    }
    return response
      .status(201)
      .send({ msg: "Signed up and logged in successfully!" });
  });

  request.logIn(newUser, () => {});
});

router.post(
  "/api/auth/signin",
  passport.authenticate("local"),
  (request, response) => {
    response.status(200).send({ msg: "Logged In Successfully!" });
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
  return request.user ? response.sendStatus(200) : response.sendStatus(401);
});

export default router;
