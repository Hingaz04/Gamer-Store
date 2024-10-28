import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../Auth";
import "../../Files/Pages/Signup/Signup.css";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = {
      email,
      password,
    };

    fetch("http://127.0.0.1:5000/admin/admin-login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not okay");
        }
        return res.json();
      })
      .then((data) => {
        if (data["Access Token"] && data["Refresh Token"]) {
          login({
            accessToken: data["Access Token"],
            refreshToken: data["Refresh Token"],
          });
          console.log("Login successful, navigating to admin panel.");
          navigate("/admin-panel");
        } else {
          alert(
            "Login failed: Invalid email or password. Please input correct credentials"
          );
        }
      })

      .catch((err) => {
        console.error("Fetch error:", err);
        alert("Login failed: Invalid email or password. Please try again.");
      });
  };
  return (
    <div className="login-container">
      <div className="login">
        <h2>Admin Log in</h2>
        <form onSubmit={handleSubmit}>
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
