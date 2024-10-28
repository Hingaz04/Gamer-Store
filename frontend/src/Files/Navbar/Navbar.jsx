import React, { useContext } from "react";
import "./Navbar.css";
import logo from "../Assets/logo.png";
import { Link } from "react-router-dom";
import { UserContext } from "../../UserContext";

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);

  const logout = () => {
    setUser(null); // Clear the user context
    // You can also add any other logout logic here, such as clearing tokens or redirecting the user.
  };

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
          {!user ? (
            <>
              <Link className="user-links" to="/login">
                Log In
              </Link>
              <Link className="user-links" to="/signup">
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <span className="user-links">Welcome, {user.firstName}!</span>
              <Link className="logout" onClick={logout}>
                Log Out
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
