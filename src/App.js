import "./App.css";
import LoginPage from "./component/page/LoginPage";
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Home from "./component/page/Home";
import Navbar from "./component/element/Navbar";
import ProductPage from "./component/page/ProductPage";
import ProductDetail from "./component/page/ProductDetail";
import Footer from "./component/element/Footer";
import CartPage from "./component/page/CartPage";
import AccountPage from "./component/page/AccountPage";
import RegisterPage from "./component/page/RegisterPage";
import { GlobalContext, GlobalProvider } from "./component/element/GlobalContext";
import { useContext, useEffect } from "react";
import PayPage from "./component/page/PayPage";
import CompleteOrderPage from "./component/page/CompleteOrderPage";
import { orderDetailsTitle, orderTitle } from "./services/apiService";

function App() {
  const categorys = ["Trang chủ", "Sản phẩm", "Sale", "Hệ thống cửa hàng"];
  const categoryLinks = ["/home", "/product", "/category", "/contact"];

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    debugger;
    // Mỗi khi URL thay đổi, xóa dữ liệu trong sessionStorage
    if (location.pathname !== "/complete") {
      sessionStorage.removeItem(orderTitle);
      sessionStorage.removeItem(orderDetailsTitle);
    }
  }, [location]); // Chạy lại useEffect mỗi khi URL thay đổi

  return (
    <div className={`w-full h-full overflow-y-auto absolute`}>
      <Navbar categorys={categorys} categoryLinks={categoryLinks} onCart={() => { navigate("/cart"); }} onAccount={() => { navigate("/account"); }} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/category" element={<ProductPage />} />
        <Route path="/contact" element={<ProductPage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/pay" element={<PayPage />} />
        <Route path="/complete" element={<CompleteOrderPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

const MainApp = () => (
  <GlobalProvider>
    <Router>
      <App />
    </Router>
  </GlobalProvider>
);

export default MainApp;
