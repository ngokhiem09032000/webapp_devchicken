import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Hook để điều hướng

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic xác thực ở đây (nếu cần)
    // Sau khi đăng nhập thành công, điều hướng về Home
    navigate("/Home");
  };
  return (
    <div className="w-full min-h-screen flex">
      {/* Nửa bên trái có background */}
      <div className="w-1/2 h-screen bg-primary flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-text">Welcome Login</h1>
        </div>
      </div>

      {/* Nửa bên phải không có background */}
      <div className="w-1/2 h-screen flex items-center justify-center bg-secondary">
        <div className="w-96 p-8 bg-background shadow-lg rounded-lg">
          <h2 className="text-2xl font-semibold text-center mb-6 text-primary">
            Login
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-text mb-2">Username</label>
              <input
                type="text"
                className="w-full p-2 border border-border rounded"
                placeholder="Enter your username"
              />
            </div>
            <div className="mb-6">
              <label className="block text-text mb-2">Password</label>
              <input
                type="password"
                className="w-full p-2 border border-border rounded"
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-button text-text font-semibold rounded hover:bg-accent"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
