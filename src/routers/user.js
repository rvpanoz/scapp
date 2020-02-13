import express from "express";
import { UserModel } from "../models";
import { auth } from "../middlewares";

const { mk } = global;
const router = express.Router();

/**
 * Register a new user to the system
 */
router.post("/users/create", async (req, res) => {
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
 * Login an existing registered user to the system
 */
router.post("/users/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findByCredentials(email, password);

    if (!user) {
      return res
        .status(401)
        .send({ error: "Login failed! Check authentication credentials" });
    }

    const token = await user.generateAuthToken();
    mk.log(`User ${email} logged in`);
    res.send({ user, token });
  } catch (error) {
    mk.log(error.message);
    res.status(400).send({ error: error.message });
  }
});

/**
 * View logged in user profile
 */
router.get("/users/profile", auth, async (req, res) => {
  res.send(req.user);
});

/**
 * Signout a registered user of the system
 */
router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => {
      return token.token != req.token;
    });

    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
});

/**
 *  Log out user from all devices
 */
router.post("/users/logoutall", auth, async (req, res) => {
  try {
    req.user.tokens.splice(0, req.user.tokens.length);
    await req.user.save();

    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
