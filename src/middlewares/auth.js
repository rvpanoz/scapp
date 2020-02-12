import jwt from "jsonwebtoken";
import { UserModel } from "../models";
import config from "../config";

const { JWT_KEY } = config || {};

/**
 * Auth middleware which verifies the token
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const auth = async (req, res, next) => {
  const authorizationHeader = req.header("Authorization");
  let token = null;

  if (!authorizationHeader) {
    res.status(400).send({ error: "Authorization Header is missing" });
  }

  token = req.header("Authorization").replace("Bearer ", "");

  try {
    const data = jwt.verify(token, JWT_KEY);
    const user = await UserModel.findOne({
      _id: data._id,
      "tokens.token": token
    });

    if (!user) {
      throw new Error("User not found");
    }

    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).send({ error: "Not authorized to access this resource" });
  }
};

export default auth;
