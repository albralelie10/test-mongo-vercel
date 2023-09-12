import mongoose from "mongoose";
import dotenv from "dotenv"

async function connect() {
  const dbUri = process.env.MONGO_URI as string;

  try {
    await mongoose.connect(dbUri);
    console.log("DB connected");
  } catch (error) {
    console.log("Could not connect to db");
    process.exit(1);
  }
}

export default connect;