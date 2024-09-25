import "./App.css";
import LoginPage from "./component/category/LoginPage";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./component/category/Home";
import Navbar from "./component/element/Navbar";
import ManaUser from "./component/category/ManaUser";
import ManaRole from "./component/category/ManaRole";
import ManaPermission from "./component/category/ManaPermission";

function App() {
  const categorys = ["Home", "Products", "Category", "Contact"];
  const categoryLinks = ["/Home", "/Product", "/Category", "/Contact"];

  const location = useLocation();
  const isLoginPage = location.pathname === "/"; // Kiểm tra nếu là trang login

  return (
    <div className={`w-full h-full overflow-y-auto absolute ${!isLoginPage ? 'bg-gradient-to-r from-primary to-secondary' : ''}`}>
      {!isLoginPage && <Navbar categorys={categorys} categoryLinks={categoryLinks} />}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Product" element={<ManaPermission />} />
        <Route path="/Category" element={<ManaUser />} />
        <Route path="/Contact" element={<ManaRole />} />
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
