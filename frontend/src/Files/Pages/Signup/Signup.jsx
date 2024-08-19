import React, { useState } from "react";
import "./Signup.css";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";

const SignupForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  async function registerUser(ev) {
    ev.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/register/register",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      alert("Registration successful");
      setRedirect(true);
    } catch (error) {
      console.error("Registration failed:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        alert("Registration failed: " + error.response.data.error);
      } else {
        alert("Registration failed: Network error");
      }
    }
  }

  if (redirect) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container">
      <div className="signup">
        <h2>Sign Up</h2>
        <form onSubmit={registerUser}>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              placeholder=""
              value={firstName}
              onChange={(ev) => setFirstName(ev.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              placeholder=""
              value={lastName}
              onChange={(ev) => setLastName(ev.target.value)}
            />
          </div>
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
          <button type="submit">Sign Up</button>
        </form>
        <p className="form-p">
          Already have an account?{" "}
          <Link className="form-link" to="/login">
            Log-in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
