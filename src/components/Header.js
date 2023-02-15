import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";

function Header() {
  const [activeTab, setActiveTab] = useState("Home");
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      setActiveTab("Home");
    } else if (location.pathname === "/add") {
      setActiveTab("AddUser");
    } else if (location.pathname === "/about") {
      setActiveTab("About");
    }
  }, [location]);

  return (
    <div className="header">
      <Link to="/">
        <p className="logo">User Management</p>
      </Link>
      <div className="header-right">
        <Link to="/">
          <p
            onClick={() => setActiveTab("Home")}
            className={`${activeTab === "Home" ? "active" : ""}`}
          >
            Home
          </p>
        </Link>
        <Link to="/add">
          <p
            onClick={() => setActiveTab("AddUser")}
            className={`${activeTab === "AddUser" ? "active" : ""}`}
          >
            Add User
          </p>
        </Link>
        <Link to="/about">
          <p
            onClick={() => setActiveTab("About")}
            className={`${activeTab === "About" ? "active" : ""}`}
          >
            About
          </p>
        </Link>
      </div>
    </div>
  );
}

export default Header;
