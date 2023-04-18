import React, { useEffect, useRef, useState } from "react";
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
import { Button, TextField, TextareaAutosize, alertClasses } from "@mui/material";
export default function Dashboard() {
  const nav = useNavigate();
  const initialState = {
    title: "",
    category: "",
    price: 0,
    brand: "",
    image: "",
    mimage: [],
    kf: [],
  };
  const [product, setProduct] = useState(initialState);
  const [inputValues, setInputValues] = useState({});
  const [counter, setCounter] = useState(0);
  const handleClick = () => {
    setCounter(counter + 1);
  };
  const handleOnChange = (e) => {
    const abc = {};
    abc[e.target.className] = e.target.value;
    setInputValues({ ...inputValues, ...abc });
  };
  useEffect(() => {
    let x = Object.values(inputValues);
    setProduct({ ...product, mimage: x });
  }, [inputValues]);
  const formSubmit = (e) => {
    e.preventDefault();
    fetch("https://incandescent-nettle-pirate.glitch.me/products",{
      method:"POST",
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify({...product,discount:Math.floor(Math.random() * (50 - 20)) + 20,offer_price:Math.floor(product.price - ((Math.floor(Math.random() * (50 - 20)) + 20) / 100) * product.price)})
    })
    document.getElementById("addproductform").reset()
  };
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
            <form action="" id="addproductform" onSubmit={formSubmit}>
              <input
                list="category"
                name="ecategory"
                id="ecategory"
                placeholder="Select Category"
                onChange={(e) =>
                  setProduct({ ...product, category: e.target.value })
                }
              />
              <datalist id="category">
                <option value="TV" />
                <option value="Mobile" />
                <option value="Refrigerator" />
                <option value="AC" />
                <option value="Washing Machine" />
                <option value="Headphone" />
              </datalist>
              <TextField
                required
                autoComplete="off"
                id="outlined-basic"
                label="Title"
                variant="outlined"
                onChange={(e) =>
                  setProduct({ ...product, title: e.target.value })
                }
              />
              <TextField
                required
                autoComplete="off"
                id="outlined-basic"
                label="Price"
                variant="outlined"
                onChange={(e) =>
                  setProduct({ ...product, price: +e.target.value })
                }
              />
              <TextField
                required
                id="outlined-basic"
                label="Brand"
                variant="outlined"
                onChange={(e) =>
                  setProduct({ ...product, brand: e.target.value })
                }
              />
              <TextField
                required
                autoComplete="off"
                label="Image"
                variant="outlined"
                onChange={(e) =>
                  setProduct({ ...product, image: e.target.value })
                }
              />
              {Array.from(Array(counter)).map((c, index) => {
                return (
                  <input
                    required
                    autoComplete="off"
                    onChange={handleOnChange}
                    key={c}
                    className={index}
                    type="text"
                    id="mimage"
                    placeholder="Image"
                  />
                );
              })}
              <p onClick={handleClick}>+ Add More Images</p>
              <TextareaAutosize
                required
                autoComplete="off"
                minRows={1}
                placeholder="Add Minimum 5 Key Features"
                variant="outlined"
                style={{ minHeight: 100 }}
                onChange={(e) =>
                  setProduct({ ...product, kf: e.target.value.split("\n") })
                }
              />
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
