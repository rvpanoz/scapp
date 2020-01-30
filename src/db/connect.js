import mongoose from "mongoose";
import config from "../config";

const { URI } = config;

// setup mongoose
mongoose.Promise = global.Promise;
mongoose.set("useCreateIndex", true);

const connect = () => {
  const db = mongoose.connection;
  const resultP = new Promise((resolve, reject) => {
    mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    db.on("error", error =>
      reject({
        success: false,
        message: error
      })
    );

    db.once("open", () => {
      resolve({
        success: true,
        message: "database connection: OK"
      });
    });
  });

  return resultP;
};

export default connect;
