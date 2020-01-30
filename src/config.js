import dotenv from "dotenv";

const CONFIG = dotenv.config();
const {
  parsed: { DB_USER, DB_PASSWORD, ...rest }
} = CONFIG;

const URI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0-diifo.mongodb.net/db_z0?retryWrites=true&w=majority`;

const config = {
  URI,
  ...rest
};

export default config;
