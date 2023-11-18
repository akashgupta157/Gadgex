import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../Redux/authReducer/action";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton, InputBase, Paper } from "@mui/material";
import { FaUserAlt } from "react-icons/fa";
import { BsCartFill } from "react-icons/bs";
import LogoutIcon from "@mui/icons-material/Logout";
import CloseIcon from "@mui/icons-material/Close";
import { useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PropTypes from "prop-types";
import ErrorIcon from "@mui/icons-material/Error";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../CSS/Navbar.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import logo from '../assets/Logo.png'
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

export default function Navbar() {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const {
    register: register1,
    handleSubmit: hS1,
    formState: { errors: errors1 },
  } = useForm();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [checked, setChecked] = useState(false);
  const handleChangeDrawer = () => {
    setChecked(!checked);
  };
  useEffect(() => {
    if (!checked) {
      document.getElementById("drawer").style.display = "none";
    } else {
      document.getElementById("drawer").style.display = "flex";
    }
  }, [checked]);
  document.addEventListener("mouseup", function (e) {
    var container = document.getElementById("drawer");
    if (!container.contains(e.target)) {
      container.style.display = "none";
      setChecked(false);
    }
  });
  const nav = useNavigate();
  const dispatch = useDispatch();
  const to = (e) => {
    document.getElementById("drawer").style.display = "none";
    nav(`/product/${e}`);
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "400px",
    bgcolor: "#121212",
    boxShadow: 24,
    p: 4,
    "@media screen and (max-width:480px)": {
      width: "90%",
    },
    "@media screen and (max-width:320px)": {
      width: "95%",
      p: 2,
      pt: 4,
    },
  };
  const detectDeviceType = () =>
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
      ? "Mobile"
      : "Desktop";
  const [emailArr, setEmailArr] = useState([]);
  useEffect(() => {
    axios
      .get(`https://incandescent-nettle-pirate.glitch.me/profile`)
      .then((response) => {
        setEmailArr(response.data);
      });
  }, []);
  const arr = [];
  emailArr.map((e) => {
    arr.push(e.id);
  });
  const onSubmit = (data) => {
    if (arr.includes(data.Email)) {
      toast.error("Email already registered", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      let obj = {
        name: data.Name,
        id: data.Email,
        password: data.Password,
        cart: [],
      };
      fetch("https://incandescent-nettle-pirate.glitch.me/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      });
      toast.success("Account Created Successfully", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      dispatch(login(obj));
      handleClose();
    }
  };
  const onLoginSubmit = (dat) => {
    const email = dat.Email;
    const password = dat.Password;
    fetch(`https://incandescent-nettle-pirate.glitch.me/profile/${email}`)
      .then((res) => res.json())
      .then((data) => {
        if (Object.keys(data).length === 0) {
          toast.error("Account Not Found ", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        } else {
          if (data.password !== password) {
            toast.error("Password do not match ", {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          } else {
            toast.success("Sign In Successful!", {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
            console.log(data);
            dispatch(login(data));
            handleClose();
            document.getElementById("loginForm").reset();
          }
        }
      });
  };
  const handleLogout = () => {
    nav("/");
    dispatch(logout());
    toast.success("Logout Successful!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };
  const authData = useSelector((state) => state.authReducer);
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = (e) => {
    e.preventDefault();
    nav(`/product/search`, { state: searchQuery });
  };
  return (
    <>
      <NAV>
        <div id="navPart1">
          <Link to={"/"}>
            <img src={logo} alt="" />
          </Link>
          <div id="menu">
            <input
              type="checkbox"
              style={{ display: "none" }}
              name=""
              id="click"
              checked={checked}
              onChange={handleChangeDrawer}
            />
            <label htmlFor="click">
              <MenuIcon sx={{ fontSize: "35px" }} />
              <p>Menu</p>
            </label>
          </div>
        </div>
        <Paper
          id="search"
          component="form"
          sx={{
            display: "flex",
            alignItems: "center",
            width: "40%",
          }}
          onSubmit={handleSearch}
        >
          <InputBase
            sx={{ ml: 3, flex: 1 }}
            placeholder="What are you looking for ?"
            required
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
        <div id="navPart2">
          {authData.isAuthenticated ? (
            <div>
              <p>{authData.user.name}</p>
              <LogoutIcon
                style={{ cursor: "pointer" }}
                onClick={handleLogout}
              />
            </div>
          ) : (
            <FaUserAlt style={{ cursor: "pointer" }} onClick={handleOpen} />
          )}
          <div
            id="cl"
            onClick={() => {
              nav("/cart");
            }}
          >
            <BsCartFill style={{ cursor: "pointer" }} />
            <button>
              {authData.isAuthenticated ? authData.user.cart.length : 0}
            </button>
          </div>
        </div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Box id="modal" sx={{ width: "100%" }}>
              <Box>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                  centered
                >
                  <Tab label="Login" {...a11yProps(0)} />
                  <Tab label="Create Account" {...a11yProps(1)} />
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                {authData.isLoading ? null : (
                  <form action="" id="loginForm" onSubmit={hS1(onLoginSubmit)}>
                    <label>Enter your Email</label>
                    <input
                      autoComplete="off"
                      {...register1("Email", {
                        required: true,
                        pattern: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                      })}
                    />
                    {errors1?.Email?.type === "required" && (
                      <p>
                        <ErrorIcon /> This field is required
                      </p>
                    )}
                    {errors1?.Email?.type === "pattern" && (
                      <p>
                        <ErrorIcon /> Invalid email address
                      </p>
                    )}

                    <label>Enter your Password</label>
                    <input
                      type="password"
                      autoComplete="off"
                      {...register1("Password", {
                        required: true,
                        minLength: 6,
                        maxLength: 6,
                      })}
                    />
                    {errors1?.Password?.type === "required" && (
                      <p>
                        <ErrorIcon /> This field is required
                      </p>
                    )}
                    {errors1?.Password?.type === "minLength" && (
                      <p>
                        <ErrorIcon /> Password must be 6 characters
                      </p>
                    )}
                    {errors1?.Password?.type === "maxLength" && (
                      <p>
                        <ErrorIcon /> Password must be 6 characters
                      </p>
                    )}
                    {detectDeviceType() === "Mobile" ? null : (
                      <small onClick={() => nav("/adminDashboard")}>
                        Login as Admin
                      </small>
                    )}
                    <input type="submit" />
                  </form>
                )}
              </TabPanel>
              <TabPanel value={value} index={1}>
                <form id="ca" onSubmit={handleSubmit(onSubmit)}>
                  <label>Enter your Name</label>
                  <input
                    autoComplete="off"
                    {...register("Name", {
                      required: true,
                      maxLength: 20,
                      minLength: 3,
                      pattern: /^[A-Za-z]+$/i,
                    })}
                  />
                  {errors?.Name?.type === "required" && (
                    <p>
                      <ErrorIcon /> This field is required
                    </p>
                  )}
                  {errors?.Name?.type === "maxLength" && (
                    <p>
                      <ErrorIcon /> Name cannot exceed 20 characters
                    </p>
                  )}
                  {errors?.Name?.type === "minLength" && (
                    <p>
                      <ErrorIcon /> Name must be at 3 characters
                    </p>
                  )}
                  {errors?.Name?.type === "pattern" && (
                    <p>
                      <ErrorIcon /> Alphabetical characters only
                    </p>
                  )}

                  <label>Enter your Email</label>
                  <input
                    autoComplete="off"
                    {...register("Email", {
                      required: true,
                      pattern: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                    })}
                  />
                  {errors?.Email?.type === "required" && (
                    <p>
                      <ErrorIcon /> This field is required
                    </p>
                  )}
                  {errors?.Email?.type === "pattern" && (
                    <p>
                      <ErrorIcon /> Invalid email address
                    </p>
                  )}

                  <label>Create your Password</label>
                  <input
                    type="password"
                    autoComplete="off"
                    {...register("Password", {
                      required: true,
                      minLength: 6,
                      maxLength: 6,
                    })}
                  />
                  {errors?.Password?.type === "required" && (
                    <p>
                      <ErrorIcon /> This field is required
                    </p>
                  )}
                  {errors?.Password?.type === "minLength" && (
                    <p>
                      <ErrorIcon /> Password must be 6 characters
                    </p>
                  )}
                  {errors?.Password?.type === "maxLength" && (
                    <p>
                      <ErrorIcon /> Password must be 6 characters
                    </p>
                  )}

                  <input type="submit" />
                </form>
              </TabPanel>
            </Box>
          </Box>
        </Modal>
      </NAV>
      <NAV1>
        <div>
          <Paper
            id="search"
            component="form"
            sx={{
              display: "flex",
              alignItems: "center",
              // width: "40%",
            }}
            onSubmit={handleSearch}
          >
            <InputBase
              sx={{ ml: 2, flex: 1 }}
              placeholder="What are you looking for ?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              required
            />
            <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </div>
      </NAV1>
      <div id="drawer">
        <p>Shop by Category</p>
        <div
          style={{
            paddingTop: "10px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <details>
            <summary>
              Televisions & Accessories <ExpandMoreIcon />
            </summary>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <small onClick={() => to("TV")}>
                All Televisions & Accessories
              </small>
              <small onClick={() => to("TV")}>LED TVs</small>
              <small onClick={() => to("TV")}>TV Accessories</small>
              <small onClick={() => to()}>Media Streaming Devices</small>
              <small onClick={() => to()}>Projectors</small>
            </div>
          </details>
          <details>
            <summary>
              Home Appliances
              <ExpandMoreIcon />
            </summary>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <small onClick={() => to("Washing Machine")}>
                Washing Machines
              </small>
              <small onClick={() => to("AC")}>Air Conditioners</small>
              <small onClick={() => to("Refrigerator")}>Refrigerators</small>
              <small onClick={() => to("")}>Air Coolers</small>
              <small onClick={() => to()}>Fans</small>
              <small onClick={() => to()}>Room Heaters</small>
            </div>
          </details>
          <details>
            <summary>
              Phones & Wearables
              <ExpandMoreIcon />
            </summary>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <small onClick={() => to("Mobile")}>Mobiles Phones</small>
              <small onClick={() => to("Headphone")}>
                Headphones & Earphones
              </small>
              <small onClick={() => to("Mobile")}>Telephone</small>
              <small onClick={() => to("Headphone")}>Wearables</small>
              <small onClick={() => to("Mobile")}>Screen Protectors</small>
            </div>
          </details>
          <details>
            <summary>
              Computers & Tablets
              <ExpandMoreIcon />
            </summary>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <small onClick={() => to()}>All Televisions & Accessories</small>
              <small onClick={() => to()}>LED TVs</small>
              <small onClick={() => to()}>TV Accessories</small>
              <small onClick={() => to()}>Media Streaming Devices</small>
              <small onClick={() => to()}>Projectors</small>
            </div>
          </details>
          <details>
            <summary>
              Kitchen Appliances
              <ExpandMoreIcon />
            </summary>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <small onClick={() => to()}>All Televisions & Accessories</small>
              <small>LED TVs</small>
              <small>TV Accessories</small>
              <small>Media Streaming Devices</small>
              <small>Projectors</small>
            </div>
          </details>
          <details>
            <summary>
              Audio & Video
              <ExpandMoreIcon />
            </summary>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <small>All Televisions & Accessories</small>
              <small>LED TVs</small>
              <small>TV Accessories</small>
              <small>Media Streaming Devices</small>
              <small>Projectors</small>
            </div>
          </details>
          <details>
            <summary>
              Smart Devices
              <ExpandMoreIcon />
            </summary>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <small>All Televisions & Accessories</small>
              <small>LED TVs</small>
              <small>TV Accessories</small>
              <small>Media Streaming Devices</small>
              <small>Projectors</small>
            </div>
          </details>
          <details>
            <summary>
              Grooming & Personal Care
              <ExpandMoreIcon />
            </summary>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <small>All Televisions & Accessories</small>
              <small>LED TVs</small>
              <small>TV Accessories</small>
              <small>Media Streaming Devices</small>
              <small>Projectors</small>
            </div>
          </details>
          <details>
            <summary>
              Health & Fitness
              <ExpandMoreIcon />
            </summary>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <small>All Televisions & Accessories</small>
              <small>LED TVs</small>
              <small>TV Accessories</small>
              <small>Media Streaming Devices</small>
              <small>Projectors</small>
            </div>
          </details>
          <details>
            <summary>
              Cameras & Accessories
              <ExpandMoreIcon />
            </summary>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <small>All Televisions & Accessories</small>
              <small>LED TVs</small>
              <small>TV Accessories</small>
              <small>Media Streaming Devices</small>
              <small>Projectors</small>
            </div>
          </details>
          <details>
            <summary>
              Gaming
              <ExpandMoreIcon />
            </summary>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <small>All Televisions & Accessories</small>
              <small>LED TVs</small>
              <small>TV Accessories</small>
              <small>Media Streaming Devices</small>
              <small>Projectors</small>
            </div>
          </details>
          <details>
            <summary>
              Accessories
              <ExpandMoreIcon />
            </summary>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <small>All Televisions & Accessories</small>
              <small>LED TVs</small>
              <small>TV Accessories</small>
              <small>Media Streaming Devices</small>
              <small>Projectors</small>
            </div>
          </details>
        </div>
      </div>
    </>
  );
}
const NAV1 = styled.nav`
  display: none;
  @media screen and (min-width: 481px) and (max-width: 865px) /* Tablet */ {
    display: flex;
    background-color: black;
    position: sticky;
    top: 8vh;
    z-index: 100;
    width: 100%;
    padding-left: 40px;
    padding-bottom: 10px;
    #search {
      width: 150%;
      display: flex;
      height: 7vh;
    }
  }
  @media screen and (max-width: 480px) /* Mobile */ {
    display: flex;
    background-color: black;
    padding-bottom: 10px;
    padding-left: 10px;
    padding-top: 5px;
    position: sticky;
    top: 7vh;
    z-index: 100;
    #search {
      width: 110%;
      display: flex;
      height: 5vh;
    }
  }
`;
const NAV = styled.nav`
  background-color: black;
  padding: 10px;
  display: flex;
  align-items: center;
  color: white;
  justify-content: space-around;
  position: sticky;
  top: 0;
  z-index: 100;
  height: 12vh;
  img {
    width: 160px;
  }
  #navPart1 {
    display: flex;
    align-items: center;
    font-size: 13px;
    cursor: pointer;
    gap: 20%;
    #menu label {
      display: flex;
      align-items: center;
      cursor: pointer;
    }
  }
  #navPart2 {
    display: flex;
    gap: 10%;
    font-size: 20px;
    width: 20%;
    justify-content: flex-end;
    align-items: center;
    div:first-child {
      display: flex;
      width: 40%;
      justify-content: space-between;
      align-items: center;
    }
    #cl {
      display: flex;
    }
    #cl button {
      position: relative;
      bottom: 5px;
      right: 10px;
      background-color: #00e8be;
      color: black;
      font-size: 12px;
      border-radius: 15px;
      width: 15px;
      height: 15px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 0;
    }
  }
  @media screen and (min-width: 866px) and (max-width: 1024px) /* Laptop */ {
    #menu p {
      display: none;
    }
    #navPart1 {
      flex-direction: row-reverse;
      gap: 10px;
    }
    #navPart2 {
      div:first-child {
        width: 50%;
      }
    }
  }
  @media screen and (max-width: 865px) /* Tablet */ {
    justify-content: space-between;
    align-items: center;
    height: 8vh;
    padding-left: 40px;
    padding-bottom: 0px;
    #navPart2 {
      width: 30%;
      div:first-child {
        width: 55%;
      }
    }
    img {
      width: 130px;
    }
    #search {
      display: none;
    }
    #menu {
      svg {
        font-size: 30px;
      }
    }
    #menu p {
      display: none;
    }
    #navPart1 {
      flex-direction: row-reverse;
      gap: 10px;
    }
  }
  @media screen and (max-width: 480px) /* Mobile */ {
    padding: 0px;
    padding-left: 10px;
    height: 7vh;
    img {
      width: 100px;
    }
    #navPart2 {
      width: 40%;
      div:first-child {
        width: 100%;
      }
    }
  }
  @media screen and (max-width: 320px) /* Mobile */ {
    #navPart2 {
      width: 45%;
    }
  }
`;
