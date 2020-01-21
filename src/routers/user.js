import express from "express";
import { UserModel } from "../models";
import { auth } from "../middlewares";

const router = express.Router();

/**
 * Register a new user to the system
 *
 */
router.post("/users", async (req, res) => {
  try {
    const user = new UserModel(req.body);

    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

/**
 * Login an existing registered user of the system
 *
 */
router.post("/users/login", async (req, res) => {
  console.log(req.body);
  try {
    const { email, password } = req.body;
    const user = await UserModel.findByCredentials(email, password);

    if (!user) {
      return res
        .status(401)
        .send({ error: "Login failed! Check authentication credentials" });
    }

    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

/**
 * Signout a registered user of the system
 *
 */
router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => {
      return token.token != req.token;
    });
    console.log(req.user, req.token);
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
