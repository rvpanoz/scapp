import express from "express";
import { RecordModel } from "../models";
import { auth } from "../middlewares";

const { mk } = global;
const router = express.Router();

router.post("/record/create", auth, async (req, res) => {
  try {
    const record = new RecordModel(req.body);

    await record.save();
    res.status(200).send({
      success: true
    });
  } catch (error) {
    const {
      user: { email }
    } = req || {};

    mk.log(`${email && email}: ${error.message}`);
    res.status(400).send({
      success: false,
      error: error.message
    });
  }
});

router.get("/record/list", auth, async (req, res) => {
  const {
    user: { _id }
  } = req;

  const records = await RecordModel.findByUserId(_id);
  res.status(200).send({
    success: true,
    data: records
  });
});

export default router;
