import "./App.css";
import Navbar from "./Files/Navbar/Navbar";
import Home from "./Files/Pages/Home/Home";
import Signup from "./Files/Pages/Signup/Signup";
import Login from "./Files/Pages/Login/Login";
import Games from "./Files/Pages/Games/Games";
import Accessories from "./Files/Pages/Accessories/Accessories";
import { Routes, Route } from "react-router-dom";
import AdminLogin from "./Admin/Admin-Pages/AdminLogin";
import AdminPanel from "./Admin/Admin-Pages/AdminPanel";

function App() {
  return (
    <div className="app">
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-panel" element={<AdminPanel />} />
        <Route path="/games" element={<Games />} />
        <Route path="/accessories" element={<Accessories />} />
      </Routes>
    </div>
  );
}

export default App;
