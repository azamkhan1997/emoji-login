import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "./../../config/api";
import "./Data.scss";

const Data = () => {
  const { username } = useParams();
  const [userInfo, setUserInfo] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api("/login");
        setUserInfo(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  console.log(userInfo);
  return (
    <div className="w-full min-h-screen bg-white">
      <div className="w-11/12 max-w-[1260px] mx-auto bg-white">
        <ul className="flex flex-col items-center justify-center w-full uppercase py-10 gap-5 text-center">
          <li className="flex items-center justify-between w-full font-extrabold">
            <p className="w-[30%]">User Name</p>
            <div className="w-[30%]">Normal Attempt</div>
            <div className="w-[30%]">Emoji Attempt</div>
          </li>
          {userInfo &&
            userInfo.map((user, index) => (
              <li
                key={user._id}
                className="flex items-center justify-between w-full border p-1 py-2 border-blue-500 bg-blue-500 rounded-lg text-white"
              >
                <p className="w-[30%] font-semibold italic">{user.username}</p>
                <div className="w-[30%]">{user.normalAttempt}</div>
                <div className="w-[30%]">{user.emojiAttempt}</div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Data;
