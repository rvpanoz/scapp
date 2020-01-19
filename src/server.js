import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import config from "./config";
import { connect } from "./db";
import { userRouter } from "./routers";

const { port } = config || 8000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(userRouter);

app.listen(port, () => {
  console.log(`Server is running at port: ${port}`);
  connect();
});
