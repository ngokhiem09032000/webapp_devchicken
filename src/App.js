import "./App.css";
import LoginPage from "./component/LoginPage";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./component/Home";
import Navbar from "./component/Navbar";
import ManageModule from "./component/category/ManageModule";

function App() {
  const categorys = ["Home", "Products", "Category", "Contact"];
  const categoryLinks = ["/Home", "/", "/Category", "#"];

  const location = useLocation();
  const isLoginPage = location.pathname === "/"; // Kiểm tra nếu là trang login

  return (
    <div className={`w-full h-full overflow-y-auto absolute ${!isLoginPage ? 'bg-gradient-to-r from-primary to-secondary' : ''}`}>
      {!isLoginPage && <Navbar categorys={categorys} categoryLinks={categoryLinks} />}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Category" element={<ManageModule />} />
      </Routes>
    </div>
  );
}

const MainApp = () => (
  <Router>
    <App />
  </Router>
);

export default MainApp;
