import { useState } from "react";
import { Link } from "react-router-dom";

import { images } from "./../../constants";

import { HiMenuAlt4, HiX } from "react-icons/hi";
import "./Navbar.scss";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <nav className="w-full bg-blue-100">
      <div className="max-w-[1260px] mx-auto flex flex-col md:flex-row lg:flex-row items-center gap-5 justify-between px-10 py-3">
        <div>
          <Link to="/">
            <img src={images.vite} alt="logo" />
          </Link>
        </div>
        <ul className="flex items-center justify-center gap-10 md:gap-14 lg:gap-14 uppercase font-bold text-gray-600">
          {["login", "register", "data"].map((item) => (
            <li key={`links-${item}`}>
              <div />
              <Link to={`/${item}`}>{item}</Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
