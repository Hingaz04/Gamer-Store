import React, { useContext } from "react";
import "./Navbar.css";
import logo from "../Assets/logo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="header">
        <img className="logo" src={logo} alt="" />
        <h1 className="head1">HINGZ</h1>
        <h1 className="head">GAMING</h1>
      </div>
      <div className="navtags">
        <ul>
          <li>
            <Link className="links" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="links" to="/games">
              Games
            </Link>
          </li>
          <li>
            <Link className="links" to="/accessories">
              Accessories
            </Link>
          </li>
        </ul>

        <div className="user">
          <Link className="user-links" to="/login">
            Log In
          </Link>
          <Link className="user-links" to="/signup">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
