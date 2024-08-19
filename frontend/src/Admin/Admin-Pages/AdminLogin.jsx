import React, { useContext, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import axios from "axios";
import "../../Files/Pages/Signup/Signup.css";
import { UserContext } from "../../UserContext";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);

  async function loginAdmin(ev) {
    ev.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/admin/admin-login",
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
    return <Navigate to="/admin-panel" />;
  }
  return (
    <div className="login-container">
      <div className="login">
        <h2>Log in</h2>
        <form onSubmit={loginAdmin}>
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

          <button type="submit">Admin Log In </button>
        </form>
        <p className="form-p">
          Not an admin?{" "}
          <Link className="form-link" to="/login">
            User Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
export default AdminLogin;
