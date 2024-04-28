import { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { api } from "./../../config/api";
import "./Register.scss";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [userInfo, setUserInfo] = useState({
    username: "",
    age: "",
    email: "",
    education: "",
    gender: "Male",
    normalPassword: "",
    emojiPassword: "",
  });
  const [agree, setAgree] = useState(false);
  const [toogle, setToogle] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userInfo);
    try {
      const result = await api.post("/register", userInfo);
      if (result.status == 200) navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  const handleEmoji = (emojiData, event) => {
    const { emoji } = emojiData;
    if (emoji) {
      setUserInfo((prevUserInfo) => ({
        ...prevUserInfo,
        emojiPassword: prevUserInfo.emojiPassword + emoji,
      }));
    } else {
      setUserInfo((prevUserInfo) => ({
        ...prevUserInfo,
        emojiPassword: prevUserInfo.emojiPassword.slice(0, -1),
      }));
    }
  };

  const handleInput = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    if (name == "emojiPassword") return;
    console.log(name, value);
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };
  console.log(userInfo);
  return (
    <div className="w-full min-h-screen bg-white ">
      <div className="w-full md:w-11/12 lg:w-11/12 max-w-[1260px]  mx-auto flex flex-col items-center justify-center mt-10">
        <h1 className="text-2xl font-bold text-gray-700">Sign Up</h1>
        <form
          onSubmit={handleSubmit}
          className=" flex flex-col gap-10 p-5 md:p-10 lg:p-10 w-full"
        >
          <div className="w-full flex gap-10 flex-col lg:flex-row items-center justify-center lg:items-start lg:justify-normal">
            <div className="w-full md:w-[60%] lg:w-[50%] flex flex-col items-center  shadow-xl border-2 border-blue-500 rounded-lg p-5 md:p-10 lg:p-10 gap-5">
              {/* {username} */}
              <p className="text-2xl font-bold text-gray-700">
                User Information
              </p>
              <input
                required
                type="text"
                name="username"
                placeholder="Username"
                value={userInfo["username"]}
                onChange={handleInput}
                className="w-full p-3 rounded-md bg-blue-100 outline-none"
              />
              <input
                required
                type="text"
                name="email"
                placeholder="Email"
                value={userInfo["email"]}
                onChange={handleInput}
                className="w-full p-3 rounded-md bg-blue-100 outline-none"
              />
              {/* {education} */}
              <select
                required
                onChange={handleInput}
                name="education"
                value={userInfo["education"]}
                className="w-full p-3 rounded-md bg-blue-100 outline-none"
                placeholder="education"
              >
                <option value="">Select Education</option>
                <option value="Elementary">Elementary</option>
                <option value="Secondary">Secondary</option>
                <option value="10+2">10+2</option>
                <option value="Undergraduate"> Undergraduate</option>
                <option value="postgraduate"> Postgraduate</option>
                <option value="Other"> Other...</option>
              </select>
              <select
                required
                onChange={handleInput}
                name="gender"
                value={userInfo["gender"]}
                className="w-full p-3 rounded-md bg-blue-100 outline-none"
                placeholder="gender"
              >
                <option value="Select Gender "> Select Gender</option>
                <option value="Male "> Male</option>
                <option value="Female"> Female</option>
                <option value="Prefer not to Say"> Prefer not to Say</option>
              </select>
              {/* {age} */}
              <select
                required
                onChange={handleInput}
                name="age"
                value={userInfo["age"]}
                className="w-full p-3 rounded-md bg-blue-100 outline-none"
                placeholder="age"
              >
                <option value="Select age">Select Age</option>
                <option value="below 18">Below 18</option>
                <option value="18-25">18-25</option>
                <option value="Secondary">26-32</option>
                <option value="Secondary">33-40</option>
                <option value="Secondary">41-50</option>
                <option value="50-above">51-above</option>
              </select>
              {/* normalPassword */}
              <div
                className="app__password"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  gap: "1rem",
                  marginTop: "1rem",
                }}
              >
                <p className="text-2xl font-bold text-gray-700">
                  Text Based Password
                </p>
                <input
                  required
                  type={toogle ? "text" : "password"}
                  name="normalPassword"
                  placeholder="Password"
                  value={userInfo["normalPassword"]}
                  onChange={handleInput}
                  className="w-full p-3 rounded-md bg-blue-100 outline-none"
                />

                {/* {age} */}
              </div>
              <span>
                {" "}
                <input
                  type="checkbox"
                  name="agree"
                  onChange={() => setAgree(!agree)}
                />{" "}
                *I agree to consent
              </span>

              <button
                type="button"
                onClick={() => setToogle(!toogle)}
                className="bg-blue-500 text-white w-full p-3 rounded-md"
              >
                Show Password
              </button>
            </div>

            <div className="w-full md:w-[60%] lg:w-[50%] flex flex-col items-center  shadow-xl border-2 border-blue-500 rounded-lg p-5 md:p-10 lg:p-10 gap-5">
              <div className="w-full items-center justify-center gap-10 flex-col flex">
                <p className="text-2xl font-bold text-gray-700">
                  Emoji Password
                </p>
                <input
                  required
                  type={toogle ? "text" : "password"}
                  name="emojiPassword"
                  placeholder="Emoji Password"
                  value={userInfo["emojiPassword"]}
                  className="w-full p-3 rounded-md bg-blue-100 outline-none"
                  onChange={handleEmoji}
                />
              </div>
              <div>
                <EmojiPicker onEmojiClick={handleEmoji} width={300} />
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={agree ? handleSubmit : () => {}}
            className="bg-blue-500 text-white w-full p-3 rounded-md"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
