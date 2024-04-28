import "./Home.scss";

import React from "react";
import universityLogo from "./staff_uni.png"; // Import your university logo image file

const Home = () => {
  //return <div className="app__home">Navigate to Login and Register</div>;
  return (
    <div className="home-section min-h-screen mx-auto w-full text-white flex items-center justify-center text-center">
      <div className="w-11/12 max-w-[1260px] py-10">
        <h1 className="home-main-head rounded-lg font-extrabold uppercase italic text-2xl sm:text-3xl lg:text-4xl">
          Analysing User Acceptance and Memorability <br />
          of <br />
          Emoji Based Passwords
        </h1>
        {/* <p className="text-gray-500 font-extrabold italic mt-16 text-3xl">
          Hello World!
        </p> */}
      </div>
    </div>
  );
};

export default Home;
