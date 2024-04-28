import mongoose from "mongoose";

const connectDB = async (URI) => {
  try {
    await mongoose.connect(URI);
  } catch (err) {
    console.log(err);
  }
};

export default connectDB;
