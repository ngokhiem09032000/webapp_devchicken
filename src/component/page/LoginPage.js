import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { token } from "../../services/serviceLogin";
import Logo from "../element/Logo";
import PopupReponse from "../popup/PopupReponse";
import { CiLogin } from "react-icons/ci";
import { PiTrademarkRegisteredLight } from "react-icons/pi";
import { GlobalContext } from "../element/GlobalContext";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Hook để điều hướng
  const [popup, setPopup] = useState({ isOpen: false, message: "", type: "" });

  // Hàm xử lý khi input thay đổi
  const handleInputChange = (event) => {
    setUsername(event.target.value); // Cập nhật state với giá trị mới
  };

  // Hàm xử lý khi input password thay đổi
  const handlePasswordChange = (event) => {
    setPassword(event.target.value); // Cập nhật state password
  };

  const handleClosePopup = () => {
    setPopup({ ...popup, isOpen: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const acount = {
      userName: username,
      passWord: password,
    };

    if (!username || !password) {
      // setPopup({
      //   isOpen: true,
      //   message: "Login failed!",
      //   type: "error",
      //   closeButton: false,
      // });
      alert("Đăng nhập thất bại");
      return;
    }

    const data = await token(acount);

    if (data && data.code === 1000 && data.result.authenticated === true) {
      // setPopup({
      //   isOpen: true,
      //   message: "Login successful!",
      //   type: "success",
      //   closeButton: false,
      // });
      alert("Đăng nhập Thành công");
      localStorage.setItem("authToken", data.result.token);
      navigate("/Home");
    } else {
      // setPopup({
      //   isOpen: true,
      //   message: "Login failed!",
      //   type: "error",
      //   closeButton: false,
      // });
      alert("Đăng nhập thất bại");
      localStorage.removeItem("authToken");
    }
  };
  return (
    <div className="flex p-5">
      {/* Nửa bên phải không có background */}
      <div className="w-full flex items-center justify-center">
        <div className="w-full sm:w-full md:w-3/4 lg:w-1/2 p-8 pt-4 border rounded shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-6">
            Đăng nhập
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-text mb-2">Email</label>
              <input
                type="text"
                className="w-full p-2 border border-border rounded"
                placeholder="Nhập email của bạn"
                value={username}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-1">
              <label className="block text-text mb-2">Mật khẩu</label>
              <input
                type="password"
                className="w-full p-2 border border-border rounded"
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <div className="mb-6">
              <div className="block mb-2 cursor-pointer text-gray-400 hover:text-text text-sm">Quên mật khẩu</div>
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-950 text-white rounded-3xl hover:bg-white border border-blue-950 hover:text-blue-950 mb-3"
            >
              <div className='flex justify-center items-center'>
                <CiLogin size={30} className='mr-2' />
                <span>Đăng nhập</span>
              </div>
            </button>
            <button
              type="button" onClick={() => {
                navigate("/register");
              }}
              className="w-full py-2 px-4 bg-blue-950 text-white rounded-3xl hover:bg-white border border-blue-950 hover:text-blue-950"
            >
              <div className='flex justify-center items-center'>
                <PiTrademarkRegisteredLight size={30} className='mr-2' />
                <span>Đăng ký</span>
              </div>
            </button>
          </form>
          {popup.isOpen && (
            <PopupReponse
              type={popup.type}
              message={popup.message}
              onClose={handleClosePopup}
              closeButton={popup.closeButton} // Quyết định có nút đóng hay không
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
