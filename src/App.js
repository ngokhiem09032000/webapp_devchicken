import "./App.css";
import LoginPage from "./component/LoginPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./component/Home";
import "boxicons";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
