import mongoose from "mongoose";
import { DB_URL } from "./serverConfig.js";

const connectToDB = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.error("successfully connected to db...");
  } catch (error) {
    console.error("error connecting to db..." + error);
  }
};

export default connectToDB;
