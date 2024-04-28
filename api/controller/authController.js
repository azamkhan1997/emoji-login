import User from "./../model/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config.js";

const emojiUser = async (req, res) => {
  const { username, emojiPassword } = req.body;
  if (!username || !emojiPassword)
    return res.status(400).json({ message: "Username and password required" });
  try {
    const result = await User.findOne({ username: username }).exec();
    if (!result) return res.sendStatus(401);

    if (emojiPassword === result.emojiPassword) {
      const accessToken = await jwt.sign(
        { username, id: result._id },
        "secret"
      );

      return res.status(200).json({
        id: result._id,
        username,
      });
    } else return res.sendStatus(401);
  } catch (err) {
    console.log("hello");
    console.log(err.message);
  }
  res.send(username);
};

const authUser = async (req, res) => {
  const { username, normalPassword } = req.body;

  console.log(req.body);
  if (!username || !normalPassword)
    return res.status(400).json({ message: "Username and password required" });
  try {
    const result = await User.findOne({ username: username }).exec();
    console.log(result);
    if (!result) return res.sendStatus(401);

    if (normalPassword === result.normalPassword) {
      const accessToken = await jwt.sign(
        { username, id: result._id },
        "secret"
      );

      return res.status(200).json({
        id: result._id,
        username,
      });
    } else return res.sendStatus(401);
  } catch (err) {
    console.log("hello");
    console.log(err.message);
  }
  res.send(username);
};

const updateNormalAttempt = async (req, res) => {
  const { username, score } = req.body;
  console.log(username);
  try {
    const user = await User.findOne({ username: username }).exec();
    console.log(username);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.normalAttempt = score;

    await user.save();

    res.status(200).json({ user });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateEmojiAttempt = async (req, res) => {
  const { username, score } = req.body;
  console.log(username);
  try {
    const user = await User.findOne({ username: username }).exec();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.emojiAttempt = score;

    await user.save();

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllUser = async (req, res) => {
  try {
    const result = await User.find({}).exec();

    return res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};
export default {
  authUser,
  emojiUser,
  updateEmojiAttempt,
  updateNormalAttempt,
  getAllUser,
};
