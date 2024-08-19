import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { UserContextProvider } from "./UserContext"; // Import UserContextProvider

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserContextProvider>
        {" "}
        {/* Use UserContextProvider */}
        <App />
      </UserContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
