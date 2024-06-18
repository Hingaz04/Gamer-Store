import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle the form submission, e.g., sending the data to a server
    console.log("Form data submitted:", formData);
  };
  return (
    <div className="login-container">
      <div className="login">
        <h2>Log in</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="Email"
              id="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
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
      </div>
    </div>
  );
}

export default Login;
