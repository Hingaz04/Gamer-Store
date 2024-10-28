import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  async function loginUser(ev) {
    ev.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/login/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      setUser(data);
      alert("Login successful");
      setRedirect(true);
    } catch (error) {
      console.error("Login failed:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        alert("Login failed: " + error.response.data.message);
      } else {
        alert("Login failed: Network error");
      }
    }
  }

  if (redirect) {
    return <Navigate to="/" />;
  }
  return (
    <div className="login-container">
      <div className="login">
        <h2>Log in</h2>
        <form onSubmit={loginUser}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder=""
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder=""
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
            />
          </div>
          <button type="submit">Log In</button>
        </form>
        <p className="form-p">
          Dont have an account?{" "}
          <Link className="form-link" to="/signup">
            Sign-in
          </Link>
        </p>
        <p className="form-p">
          Log in as admin?{" "}
          <Link className="form-link" to="/admin-login">
            Admin
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
