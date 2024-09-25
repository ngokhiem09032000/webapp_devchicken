import React, { useState } from "react";
import Logo from "./Logo";
import { Link } from "react-router-dom";
import AvatarDropdown from "./AvatarDropdown";
import { useNavigate } from 'react-router-dom';

const Navbar = (props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <div>
      <header className="flex justify-between items-center text-text py-6 px-8 md:px-32 bg-white drop-shadow-md">
        <a href="#">
          <Logo name="devchicken"></Logo>
        </a>

        <ul className="hidden xl:flex items-center gap-12 font-semibold text-base">
          {props.categorys.map((item, index) => (
            <Link key={index} to={props.categoryLinks[index]}>
              <li
                className="p-3 hover:bg-accent hover:text-background rounded-md translate-all cursor-pointer"
              >
                {item}</li>
            </Link>
          ))}
        </ul>

        <div className="relative hidden md:flex items-center justify-center gap-3">
          <div className="absolute left-3 text-2xl">
            <box-icon name="search" color="#4A4A4A"></box-icon>
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="py-2 pl-10 rounded-xl border-2 border-border focus:bg-background
            focus:outline-accent"
          ></input>
        </div>

        <div>
          <AvatarDropdown></AvatarDropdown>
        </div>

        <div
          className="xl:hidden block cursor-pointer text-5xl"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <box-icon name="menu" color="#4A4A4A" size="lg"></box-icon>
        </div>
        <div
          className={`absolute xl:hidden top-24 left-0 w-full bg-background flex flex-col items-center gap-6 font-semibold text-lg 
        transform transition-transform ${isMenuOpen ? "opacity-100" : "opacity-0"}`}
          style={{ transition: "transform 0.3s ease, opacity 0.3s ease" }}
        >
          {props.categorys.map((item, index) => (
            <li key={index} onClick={() => navigate(props.categoryLinks[index])}
              className="list-none w-full text-center p-4 hover:bg-accent hover:text-background transition-all cursor-pointer">
              {item}
            </li>
          ))}
        </div>
      </header>
    </div>
  );
};

export default Navbar;