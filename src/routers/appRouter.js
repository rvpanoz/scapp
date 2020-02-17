import path from "path";
import express from "express";
import { auth } from "../middlewares";

const router = express.Router();

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/index.html"), {
    headers: {
      Authorization: "Bearer 1234"
    }
  });
});

export default router;
