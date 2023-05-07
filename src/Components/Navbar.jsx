import React, { useContext, useEffect, useState } from "react";
import "../CSS/Navbar.css";
import { FaUserAlt } from "react-icons/fa";
import { BsCartFill } from "react-icons/bs";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import { useForm } from "react-hook-form";
import ErrorIcon from "@mui/icons-material/Error";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../Context/AuthContext";
import LogoutIcon from "@mui/icons-material/Logout";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MenuIcon from '@mui/icons-material/Menu';
const style = {
  bgcolor: "#131213",
};
export default function Navbar() {
  const nav = useNavigate();
  const { setAuth, Login, user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [checked, setChecked] = useState(false);
  const handleChange = () => {
    setChecked(!checked);
  };
  const to = (e) => {
    document.getElementById("drawer").style.display = "none";
    nav(`/product/${e}`, { state: { end: e } });
  };
  useEffect(() => {
    if (!checked) {
      document.getElementById("drawer").style.display = "none";
    } else {
      document.getElementById("drawer").style.display = "flex";
    }
  }, [checked]);

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
  const onSubmit = (data) => {
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
    let loginbtn = document.getElementById("login");
    let loginform = document.getElementById("loginform");
    let signinbtn = document.getElementById("signin");
    let signinform = document.getElementById("ca");
    signinbtn.classList.remove("clrbtn");
    loginbtn.classList.add("clrbtn");
    loginform.style.display = "flex";
    signinform.style.display = "none";
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
            toast.success("Sign In Successfull!", {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
            setAuth(true);
            Login(data);
            handleClose();
            let l1 = document.getElementById("l1");
            let l2 = document.getElementById("l2");
            l1.style.display = "none";
            l2.style.display = "flex";
          }
        }
      });
  };
  document.addEventListener('mouseup', function(e) {
    var container = document.getElementById('drawer');
    if (!container.contains(e.target)) {
        container.style.display = 'none';
        setChecked(false);
    }
});
  const login = () => {
    let loginbtn = document.getElementById("login");
    let loginform = document.getElementById("loginform");
    let signinbtn = document.getElementById("signin");
    let signinform = document.getElementById("ca");
    signinbtn.classList.remove("clrbtn");
    loginbtn.classList.add("clrbtn");
    loginform.style.display = "flex";
    signinform.style.display = "none";
    let adminform = document.getElementById("admin");
    adminform.style.display = "none";
  };
  const signin = () => {
    let loginbtn = document.getElementById("login");
    let loginform = document.getElementById("loginform");
    let signinbtn = document.getElementById("signin");
    let signinform = document.getElementById("ca");
    signinbtn.classList.add("clrbtn");
    loginbtn.classList.remove("clrbtn");
    loginform.style.display = "none";
    signinform.style.display = "flex";
    let adminform = document.getElementById("admin");
    adminform.style.display = "none";
  };
  const logout = () => {
    let l1 = document.getElementById("l2");
    let l2 = document.getElementById("l1");
    l1.style.display = "none";
    l2.style.display = "flex";
    setAuth(false);
    Login();
    toast.success("Logout Successfull!", {
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
  const admin = () => {
    let loginform = document.getElementById("loginform");
    let adminform = document.getElementById("admin");
    adminform.style.display = "flex";
    loginform.style.display = "none";
  };
  const adminlogin = (e) => {
    // e.preventDefault()
    handleClose();
    nav("/admindashboard");
  };
  const detectDeviceType = () =>
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
      ? "Mobile"
      : "Desktop";
  return (
    <>
      <nav>
        <div id="part1">
          <Link to={"/"}>
            <img src="../Logo.png" alt="" id="logo" />
          </Link>
          <div id="menu">
            <input
              type="checkbox"
              style={{ display: "none" }}
              name=""
              id="click"
              checked={checked}
              onChange={handleChange}
            />
            <label htmlFor="click">
              <MenuIcon sx={{fontSize:"35px"}} className="hb"/>
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
        >
          <InputBase
            sx={{ ml: 3, flex: 1 }}
            placeholder="What are you looking for ?"
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
        <div id="part2">
          <p>{user ? user.name : null}</p>
          <FaUserAlt
            id="l1"
            style={{ cursor: "pointer" }}
            onClick={handleOpen}
          />
          <LogoutIcon
            id="l2"
            style={{ cursor: "pointer", display: "none" }}
            onClick={logout}
          />
          <div id="cl">
            <BsCartFill
              style={{ cursor: "pointer" }}
              onClick={() => {
                nav("/cart");
              }}
            />
            <button>{user ? user.cart.length : 0}</button>
          </div>
        </div>
      </nav>
      <div id="nav1">
        <Paper
          id="search1"
          component="form"
          sx={{
            display: "flex",
            alignItems: "center",
            width: "40%",
          }}
        >
          <InputBase
            sx={{ ml: 3, flex: 1 }}
            placeholder="What are you looking for ?"
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} id="box">
          <CloseIcon
            onClick={handleClose}
            style={{
              color: "white",
              position: "relative",
              left: "95%",
              top: "0",
              cursor: "pointer",
            }}
          ></CloseIcon>
          <div id="modal1">
            <button id="login" onClick={login}>
              Login
            </button>
            <button id="signin" onClick={signin} className="clrbtn">
              Signin
            </button>
          </div>
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

          <form action="" id="loginform" onSubmit={hS1(onLoginSubmit)}>
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
              <small onClick={admin}>Login as Admin</small>
            )}
            <input type="submit" />
          </form>
          <form action="" id="admin">
            <p>Login as Admin</p>
            <label>Enter your Username</label>
            <input type="text" required />
            <label>Enter your Password</label>
            <input type="password" required />
            <input type="submit" onClick={adminlogin} />
          </form>
        </Box>
      </Modal>
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
              <small onClick={() => to("TV")}>All Televisions & Accessories</small>
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
              <small onClick={() => to("Washing Machine")}>Washing Machines</small>
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
              <small onClick={() => to("Headphone")}>Headphones & Earphones</small>
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
