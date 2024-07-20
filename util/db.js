import mongoose from "mongoose";

async function connect() {
  try {
    await mongoose.connect(process.env.mongo_uri);
  } catch (error) {
    console.log("Failed to connect with db.");
    throw error;
  }
}

export { connect as connectToDb };
