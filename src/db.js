import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();



mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useFindAndModify: false
});

const db = mongoose.connection;

const hndleOpen = () => console.log("Connected to DB");
const handleError = error => console.log("Error on DB connection");

db.once("open", hndleOpen);
db.on("error", handleError);