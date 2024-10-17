import React, { useContext, useState } from "react";
import Logo from "./Logo";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { CiShoppingCart, CiUser } from "react-icons/ci";
import { GlobalContext } from "./GlobalContext";
import { IoIosMenu } from "react-icons/io";

const Navbar = (props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { globalVariable, setGlobalVariable } = useContext(GlobalContext);

  return (
    <div>
      <header className="bg-white drop-shadow-md">
        <div className="flex justify-between items-center text-text py-6 px-8">
          <a href="#">
            <Logo name="DEVCHICKEN"></Logo>
          </a>

          <ul className="hidden xl:flex items-center gap-12 font-semibold text-base">
            {props.categorys.map((item, index) => (
              <Link key={index} to={props.categoryLinks[index]}>
                <li
                  className="p-3 hover:bg-blue-950 hover:text-white rounded-3xl translate-all cursor-pointer"
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

          <div className="flex space-x-2">
            <div onClick={props.onAccount}>
              <CiUser size={30} />
            </div>
            <div className="relative" onClick={props.onCart}>
              <CiShoppingCart size={30} />
              {globalVariable > 0 && <div className="absolute -top-1 left-5 bg-black rounded-full w-auto h-4 flex items-center justify-center p-1">
                <span className="text-xs text-white">{globalVariable}</span>
              </div>}
            </div>
          </div>

          <div
            className="xl:hidden block cursor-pointer text-5xl"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <IoIosMenu color="#4A4A4A" />
          </div>
        </div>
        <div
          className={`xl:hidden w-full bg-background flex flex-col items-center gap-6 font-semibold text-lg
        transform transition-transform ${isMenuOpen ? "opacity-100 " : "opacity-0 hidden"} z-10`}
          style={{ transition: "transform 0.3s ease, opacity 0.3s ease" }}
        >
          {props.categorys.map((item, index) => (
            <li key={index} onClick={() => navigate(props.categoryLinks[index])}
              className="list-none w-full text-center text-blue-950 p-4 hover:bg-blue-950 hover:text-white transition-all cursor-pointer">
              {item}
            </li>
          ))}
        </div>
      </header>
    </div>
  );
};

export default Navbar;
