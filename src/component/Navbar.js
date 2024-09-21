import React, { useState } from "react";
import Logo from "./Logo";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div>
      <header className="flex justify-between items-center text-text py-6 px-8 md:px-32 bg-white drop-shadow-md">
        <a href="#">
          <Logo name="devchicken"></Logo>
        </a>

        <ul className="hidden xl:flex items-center gap-12 font-semibold text-base">
          <li className="p-3 hover:bg-accent hover:text-background rounded-md translate-all cursor-pointer">
            Home
          </li>
          <li className="p-3 hover:bg-accent hover:text-background rounded-md translate-all cursor-pointer">
            Products
          </li>
          <li className="p-3 hover:bg-accent hover:text-background rounded-md translate-all cursor-pointer">
            Explore
          </li>
          <li className="p-3 hover:bg-accent hover:text-background rounded-md translate-all cursor-pointer">
            Contact
          </li>
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

        <div
          className="xl:hidden block cursor-pointer text-5xl"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <box-icon name="menu" color="#4A4A4A" size="lg"></box-icon>
        </div>
        <div
          className={`absolute xl:hidden top-24 left-0 w-full bg-background flex flex-col items-center gap-6 font-semibold text-lg 
        transform transition-transform ${
          isMenuOpen ? "opacity-100" : "opacity-0"
        }`}
          style={{ transition: "transform 0.3s ease, opacity 0.3s ease" }}
        >
          <li className="list-none w-full text-center p-4 hover:bg-accent hover:text-background transition-all cursor-pointer">
            Home
          </li>
          <li className="list-none w-full text-center p-4 hover:bg-accent hover:text-background transition-all cursor-pointer">
            Products
          </li>
          <li className="list-none w-full text-center p-4 hover:bg-accent hover:text-background transition-all cursor-pointer">
            Explore
          </li>
          <li className="list-none w-full text-center p-4 hover:bg-accent hover:text-background transition-all cursor-pointer">
            Contact
          </li>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
