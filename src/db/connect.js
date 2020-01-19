import mongoose from "mongoose";

const uri =
  "mongodb+srv://dbAdmin:z0ubr0!28@cluster0-diifo.mongodb.net/db_z0?retryWrites=true&w=majority";
const db = mongoose.connection;

// setup mongoose
mongoose.Promise = global.Promise;
mongoose.set("useCreateIndex", true);

const connect = () => {
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  //bind connection to error event (to get notification of connection errors)
  db.on("error", console.error.bind(console, "MongoDB connection error:"));

  db.once("open", () => {
    console.log("database connection: OK");
  });
};

export default connect;
