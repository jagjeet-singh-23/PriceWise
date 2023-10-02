import mongoose from "mongoose";

let isConnected = false; // Variable to check the connection status

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URI) {
    throw new Error("=> missing env.MONGODB_URI");
  }
  if (isConnected) {
    return console.log("=> using existing database connection");
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    isConnected = true;
    console.log("=> database connected successfully");
  } catch (error: any) {
    console.log("=> an error occurred when connecting to the database", error);
  }
};
