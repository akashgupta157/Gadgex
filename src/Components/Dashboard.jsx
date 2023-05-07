import React, { useEffect, useRef, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import StorageIcon from "@mui/icons-material/Storage";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import TimelineIcon from "@mui/icons-material/Timeline";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import "../CSS/Dashboard.css";
import { Button, TextField, TextareaAutosize } from "@mui/material";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Dashboard() {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
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
  const url = `http://localhost:8080/products`;
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
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...product,
        discount: Math.floor(Math.random() * (50 - 20)) + 20,
        offer_price: Math.floor(
          product.price -
            ((Math.floor(Math.random() * (50 - 20)) + 20) / 100) * product.price
        ),
      }),
    });
    toast.success("Data Added Successfully", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    document.getElementById("addproductform").reset();
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
          paddingLeft: "50px",
          paddingRight: "50px",
          justifyContent: "space-between",
          position: "sticky",
          top: "0px",
          zIndex: "1",
          height: "12vh",
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
      <Box sx={{ width: "100%", display: "flex" }}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            display: "flex",
            flexDirection: "column",
            width: "20%",
            padding: "20px",
            bgcolor:"black",
            height: "88vh",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            orientation="vertical"
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab
              icon={<DashboardIcon />}
              iconPosition="start"
              label="Dashboard"
              {...a11yProps(0)}
            />
            <Tab
              icon={<AddCircleIcon />}
              iconPosition="start"
              label="Add Product"
              {...a11yProps(1)}
            />
            <Tab
              icon={<StorageIcon />}
              iconPosition="start"
              label="Manage Products"
              {...a11yProps(2)}
            />
            <Tab
              icon={<PersonAddAlt1Icon />}
              iconPosition="start"
              label="Add Admin"
              {...a11yProps(3)}
            />
            <Tab
              icon={<SupervisorAccountIcon />}
              iconPosition="start"
              label="Manage Admin"
              {...a11yProps(4)}
            />
            <Tab
              icon={<ShoppingCartIcon />}
              iconPosition="start"
              label="Manage Order"
              {...a11yProps(5)}
            />
            <Tab
              icon={<TimelineIcon />}
              iconPosition="start"
              label="Analyses"
              {...a11yProps(6)}
            />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          Item One
        </TabPanel>
        <TabPanel value={value} index={1} id="addproduct">
          <div>
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
              <Button
                type="submit"
                variant="contained"
                sx={{ width: "30%", margin: "auto", marginTop: "30px",color:"black",fontWeight:"800"}}
              >
                Submit
              </Button>
            </form>
          </div>
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
        <TabPanel value={value} index={3}>
          Item Three
        </TabPanel>
        <TabPanel value={value} index={4}>
          Item Three
        </TabPanel>
        <TabPanel value={value} index={5}>
          Item Three
        </TabPanel>
        <TabPanel value={value} index={6}>
          Item Three
        </TabPanel>
      </Box>
    </>
  );
}
