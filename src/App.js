import "./App.css";
import LoginPage from "./component/category/LoginPage";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./component/category/Home";
import Navbar from "./component/element/Navbar";
import ProductPage from "./component/category/ProductPage";
import ProductDetail from "./component/category/ProductDetail";

function App() {
  const categorys = ["Trang chủ", "Sản phẩm", "Sale", "Hệ thống cửa hàng"];
  const categoryLinks = ["/home", "/product", "/category", "/contact"];

  const location = useLocation();
  const isLoginPage = location.pathname === "/login"; // Kiểm tra nếu là trang login

  return (
    <div className={`w-full h-full overflow-y-auto absolute ${!isLoginPage ? '' : ''}`}>
      {!isLoginPage && <Navbar categorys={categorys} categoryLinks={categoryLinks} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/category" element={<ProductPage />} />
        <Route path="/contact" element={<ProductPage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
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
