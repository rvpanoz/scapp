import path from "path";
import express from "express";
import { auth } from "../middlewares";

const router = express.Router();

router.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/login.html"));
});

router.get("/", auth, (req, res) => {
  res.sendFile(path.join(__dirname, "../views/index.html"));
});

router.get("/create", auth, (req, res) => {
  res.sendFile(path.join(__dirname, "../views/create.html"));
});

export default router;
