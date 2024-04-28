import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 4,
    unique: true,
  },
  age: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  education: {
    type: String,
    required: true,
  },
  normalPassword: {
    type: String,
    required: true,
  },
  emojiPassword: {
    type: String,
    required: true,
  },
  normalAttempt: {
    type: Number,
    default: 0,
  },
  emojiAttempt: {
    type: Number,
    default: 0,
  },
});
const UserModel = mongoose.model("User", userSchema);

export default UserModel;
