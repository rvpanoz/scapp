import express from "express";
import { RecordModel } from "../models";
import { auth } from "../middlewares";

const { mk } = global;
const router = express.Router();

router.post("/records/create", auth, async (req, res) => {
  try {
    const record = new RecordModel(req.body);

    await record.save();
    res.status(200).send();
  } catch (error) {
    mk.log(error.message);
    res.status(400).send(error.message);
  }
});

export default router;
