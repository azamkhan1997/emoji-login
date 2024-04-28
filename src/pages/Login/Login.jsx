import { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import "./Login.scss";
import { api } from "../../config/api";
import { Link } from "react-router-dom";

const Login = () => {
  const [userNormalInfo, setUserNormalInfo] = useState({
    username: "",
    normalPassword: "",
  });
  const [toogle, setToogle] = useState(false);
  const [etoogle, setEToogle] = useState(false);
  const [normalAttempt, setNormalAttempt] = useState(0);
  const [correct, setCorrect] = useState(null);

  const handleNormalSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(userNormalInfo);
      const result = await api.post("/login/normal", userNormalInfo);

      if (result.status == 200) setCorrect("Correct Crendential");
    } catch (err) {
      setCorrect(null);
      setNormalAttempt(normalAttempt + 1);
      await handleNormalAttempt();

      console.log(err);
    }
  };
  const handleNormalAttempt = async () => {
    try {
      const result = await api.put("/login/normal-attempt", {
        username: userNormalInfo.username,
        score: normalAttempt + 1,
      });
    } catch (err) {
      console.log(err);
    }
  };
  const handleNormalInput = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setUserNormalInfo({
      ...userNormalInfo,
      [name]: value,
    });
  };

  //emoji password
  const [userEmojiInfo, setUserEmojiInfo] = useState({
    username: "",
    emojiPassword: "",
  });
  const [emojiAttempt, setEmojiAttempt] = useState(0);
  const [correctEmoji, setCorrectEmoji] = useState(null);

  const handleEmojiSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(userNormalInfo);
      const result = await api.post("/login/emoji", userEmojiInfo);

      if (result.status == 200) setCorrectEmoji("Correct Crendential");
    } catch (err) {
      setCorrect(null);
      setEmojiAttempt(emojiAttempt + 1);
      await handleEmojiAttempt();
      console.log(err);
    }
  };

  const handleEmojiAttempt = async () => {
    try {
      const result = await api.put("/login/emoji-attempt", {
        username: userNormalInfo.username,
        score: emojiAttempt + 1,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleEmojiInput = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setUserEmojiInfo({
      ...userEmojiInfo,
      [name]: value,
    });
  };
  //Demo hello@123 😁😁😁
  const handleEmoji = (emojiData, event) => {
    const { emoji } = emojiData;

    if (emoji) {
      setUserEmojiInfo((prevUserInfo) => ({
        ...prevUserInfo,
        emojiPassword: prevUserInfo.emojiPassword + emoji,
      }));
    } else {
      setUserEmojiInfo((prevUserInfo) => ({
        ...prevUserInfo,
        emojiPassword: prevUserInfo.emojiPassword.slice(0, -1),
      }));
    }
  };

  return (
    <div className="w-full min-h-screen bg-white">
      <div className="w-full md:w-11/12 lg:w-11/12 max-w-[1260px] mx-auto flex items-center justify-center flex-col gap-10 p-5 md:p-10 lg:p-10">
        <p>
          {correctEmoji && correct && (
            <div className="mx-auto p-5 flex items-center justify-center flex-col gap-5">
              <h1 className="text-xl text-gray-600 font-bold italic">
                Show Passoword Data
              </h1>
              <Link to={`/data/${userNormalInfo.username}`}>
                <button className="py-3 px-9 bg-blue-500 rounded-md text-white font-bold">
                  Show Data
                </button>
              </Link>
            </div>
          )}
        </p>
        <div className="flex gap-10 w-full flex-col lg:flex-row justify-center items-center lg:justify-normal lg:items-start">
          <div className="flex flex-col items-center gap-10 w-full md:w-[60%] lg:w-[50%]">
            <h1 className="text-2xl font-bold text-gray-700">Normal Login</h1>
            <form
              onSubmit={() => {
                handleNormalSubmit();
                handleNormalAttempt();
              }}
              className="flex flex-col items-center gap-5 w-full md:w-[90%] lg:w-[90%] bg-white p-5 md:p-10 lg:p-10 rounded-lg shadow-xl border-2 border-blue-500"
            >
              <input
                type="text"
                placeholder="Username"
                name="username"
                className="w-full p-3 rounded-md bg-blue-100 outline-none"
                value={userNormalInfo["username"]}
                onChange={handleNormalInput}
                required
              />
              <input
                type={toogle ? "text" : "password"}
                placeholder="Password"
                className="w-full p-3 rounded-md bg-blue-100 outline-none"
                name="normalPassword"
                onChange={handleNormalInput}
              />
              <button
                type="button"
                onClick={() => setToogle(!toogle)}
                className="bg-blue-500 text-white w-full p-3 rounded-md"
              >
                Show Password
              </button>
              {normalAttempt ? <p>{normalAttempt} attempt</p> : <></>}
              {correct ? <p>{correct}</p> : <></>}
              <button
                onClick={handleNormalSubmit}
                className="bg-blue-500 text-white w-full p-3 rounded-md"
              >
                Login
              </button>
            </form>
          </div>
          <div className="flex flex-col items-center gap-10 w-full md:w-[60%] lg:w-[50%]">
            <h1 className="text-2xl font-bold text-gray-700">Emoji Login</h1>
            <form
              onSubmit={() => {
                handleEmojiSubmit();
                handleEmojiAttempt();
              }}
              className="flex flex-col items-center gap-5 w-full md:w-[90%] lg:w-[90%] bg-white p-5 md:p-10 lg:p-10 rounded-lg shadow-xl border-2 border-blue-500"
            >
              <input
                type="text"
                placeholder="Username"
                className="w-full p-3 rounded-md bg-blue-100 outline-none"
                name="username"
                value={userEmojiInfo["username"]}
                onChange={handleEmojiInput}
              />
              <input
                type={etoogle ? "text" : "password"}
                placeholder="Password"
                className="w-full p-3 rounded-md bg-blue-100 outline-none"
                name="emojiPassword"
                value={userEmojiInfo["emojiPassword"]}
                onChange={handleEmoji}
              />
              <button
                type="button"
                onClick={() => setEToogle(!etoogle)}
                className="bg-blue-500 text-white w-full p-3 rounded-md"
              >
                Show Password
              </button>
              {emojiAttempt ? <p>{emojiAttempt} attempt</p> : <></>}
              {correctEmoji ? <p>{correctEmoji}</p> : <></>}
              <div>
                <EmojiPicker onEmojiClick={handleEmoji} width={300} />
              </div>
              <button
                onClick={handleEmojiSubmit}
                className="bg-blue-500 text-white w-full p-3 rounded-md"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
