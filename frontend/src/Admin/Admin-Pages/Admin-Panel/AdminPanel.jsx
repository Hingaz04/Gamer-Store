import React from "react";
import "./AdminPanel.css";
import { Link } from "react-router-dom";

function AdminPanel() {
  return (
    <div className="admin-page">
      <h1 className="h1-admin">ADMIN PANEL</h1>
      <div className="admin-data">
        <button className="admin-button">
          <Link to="/game-manager">Manage Games</Link>
        </button>
        <button className="admin-button">
          <Link to="/accessory-manager">Accessories Manager</Link>
        </button>
      </div>
    </div>
  );
}

export default AdminPanel;
