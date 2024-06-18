import "./App.css";
import Navbar from "./Files/Navbar/Navbar";
import Home from "./Files/Pages/Home/Home";
import Signup from "./Files/Pages/Signup/Signup";
import Login from "./Files/Pages/Login/Login";
import Games from "./Files/Pages/Games/Games";
import Accessories from "./Files/Pages/Accessories/Accessories";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/games" element={<Games />} />
        <Route path="/accessories" element={<Accessories />} />
      </Routes>
    </div>
  );
}

export default App;
