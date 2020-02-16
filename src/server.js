import path from "path";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import config from "./config";
import { connect } from "./db";
import { appRouter, userRouter, recordRouter } from "./routers";

const { PORT } = config || 8000;
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/css", express.static(path.join(__dirname, "/public/css")));
app.use("/js", express.static(path.join(__dirname, "/public/js")));

app.use(bodyParser.json());
app.use(appRouter);
app.use(userRouter);
app.use(recordRouter);

app.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}`);

  connect()
    .then(({ message }) => console.log(message))
    .catch(error => console.log(error));
});
