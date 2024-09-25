import React, { useState } from "react";
import Navbar from "../element/Navbar";

const Home = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const categorys = ["Home", "Products", "Category", "Contact"];
  const categoryLinks = ["/Home", "/", "/Category", "#"];

  return <div>
  </div>;
};

export default Home;
