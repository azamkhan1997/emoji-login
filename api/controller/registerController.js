import bcrypt from "bcrypt";
import "dotenv/config.js";
import User from "../model/userSchema.js";

const saltRounds = parseInt(process.env.SALT);

const createUser = async (req, res) => {
  const {
    username,
    gender,
    email,
    age,
    education,
    normalPassword,
    emojiPassword,
  } = req.body;
  console.log(
    username,
    gender,
    email,
    age,
    education,
    normalPassword,
    emojiPassword
  );
  if (
    !username ||
    !normalPassword ||
    !email ||
    !gender ||
    !emojiPassword ||
    !age ||
    !education
  )
    return res.status(400).json({ message: "Please Enter valid data" });
  const salt = bcrypt.genSaltSync(saltRounds);
  const hsPwdNormal = bcrypt.hashSync(normalPassword, 10);
  const hsPwdemoji = bcrypt.hashSync(emojiPassword, 10);

  //encrypt passoword
  try {
    const newUser = {
      username,
      age,
      education,
      email,
      gender,
      normalPassword,
      emojiPassword,
    };
    console.log(newUser);
    const result = await User.create(newUser);
    return res.status(200).json(result);
  } catch (err) {
    console.log(err.message);
    return res.status(err.status).json({ message: err.message });
  }
};

export default { createUser };
