import React from "react";
import { FaUserAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import StorageIcon from "@mui/icons-material/Storage";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import TimelineIcon from "@mui/icons-material/Timeline";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import "../CSS/Dashboard.css";
import { Button, TextField } from "@mui/material";
export default function Dashboard() {
  const nav = useNavigate();
  return (
    <>
      <div
        style={{
          display: "flex",
          background: "#000000",
          fontSize: "20px",
          color: "white",
          alignItems: "center",
          padding: "10px 50px 10px 50px",
          justifyContent: "space-between",
          position: "sticky",
          top: "0px",
        }}
      >
        <Link to={"/"}>
          <img src="../Logo-removebg-preview.png" alt="" id="logo" />
        </Link>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "20%",
            justifyContent: "space-evenly",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
              width: "50%",
            }}
          >
            <FaUserAlt id="l1" style={{ cursor: "pointer" }} />
            <p>Admin</p>
          </div>
          <LogoutIcon id="l2" style={{ cursor: "pointer" }} />
        </div>
      </div>
      <div id="row" style={{ display: "flex" }}>
        <div id="sidebar">
          <div className="sideicon">
            <DashboardIcon />
            Dashboard
          </div>
          <div className="sideicon">
            <AddCircleIcon />
            Add Product
          </div>
          <div className="sideicon">
            <StorageIcon />
            Manage Products
          </div>
          <div className="sideicon">
            <AddCircleIcon />
            Add Admin
          </div>
          <div className="sideicon">
            <SupervisorAccountIcon />
            Manage Admins
          </div>
          <div className="sideicon">
            <ShoppingCartIcon />
            Manage Orders
          </div>
          <div className="sideicon">
            <TimelineIcon />
            Analyse
          </div>
        </div>
        <div id="rightside">
          <div id="dashboard"></div>
          <div id="addproduct">
            <form style={{display:"flex",flexDirection:"column"}} action="">
              <div id="addform">
                <TextField
                  required
                  autoComplete="off"
                  id="outlined-basic"
                  label="Title"
                  variant="outlined"
                />
                <TextField
                  required
                  autoComplete="off"
                  id="outlined-basic"
                  label="Price"
                  variant="outlined"
                />
                <TextField
                  required
                  autoComplete="off"
                  id="outlined-basic"
                  label="Brand"
                  variant="outlined"
                />
                <TextField
                  required
                  autoComplete="off"
                  id="outlined-basic"
                  label="Image"
                  variant="outlined"
                />
                <TextField
                  required
                  autoComplete="off"
                  id="outlined-basic"
                  label="Image1"
                  variant="outlined"
                />
                <TextField
                  required
                  autoComplete="off"
                  id="outlined-basic"
                  label="Image2"
                  variant="outlined"
                />
                <TextField
                  required
                  autoComplete="off"
                  id="outlined-basic"
                  label="Image3"
                  variant="outlined"
                />
                <TextField
                  required
                  autoComplete="off"
                  id="outlined-basic"
                  label="Image4"
                  variant="outlined"
                />
              </div>
              <Button id="ss" type="submit" variant="contained">
                Submit
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
