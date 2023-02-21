import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";

function Header({ onLogout }) {
  const [activeTab, setActiveTab] = useState("Home");
  const location = useLocation();
  // const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/home") {
      setActiveTab("Home");
    } else if (location.pathname === "/add") {
      setActiveTab("AddUser");
    } else if (location.pathname === "/about") {
      setActiveTab("About");
    }
  }, [location]);

  return (
    <div className="header">
      <Link to="/home">
        <Typography className="logo">User Management</Typography>
      </Link>
      <Box sx={{ display: "flex", gap: "10px", marginRight: "10px" }}>
        <Link to="/home">
          <Button
            onClick={() => setActiveTab("Home")}
            variant={activeTab === "Home" ? "contained" : "outlined"}
          >
            Home
          </Button>
        </Link>

        <Link to="/add">
          <Button
            onClick={() => setActiveTab("AddUser")}
            variant={activeTab === "AddUser" ? "contained" : "outlined"}
          >
            Add User
          </Button>
        </Link>

        <Link to="/about">
          <Button
            onClick={() => setActiveTab("About")}
            variant={activeTab === "About" ? "contained" : "outlined"}
          >
            About
          </Button>
        </Link>

        <Button onClick={onLogout} variant="contained">
          Logout
        </Button>
      </Box>
    </div>
  );
}

export default Header;
