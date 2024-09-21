import React, { useState } from "react";
import Navbar from "./Navbar";

const Home = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Name:", name);
    console.log("Email:", email);
  };

  return (
    <div className="w-full h-full absolute bg-gradient-to-r from-primary to-secondary">
      <Navbar />
    </div>
  );
};

export default Home;
