import React, { useContext, useState } from "react";
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
const style = {
  bgcolor: "#131213",
};
export default function Navbar() {
  const nav=useNavigate()
  const { setAuth, Login, user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
  const login = () => {
    let loginbtn = document.getElementById("login");
    let loginform = document.getElementById("loginform");
    let signinbtn = document.getElementById("signin");
    let signinform = document.getElementById("ca");
    signinbtn.classList.remove("clrbtn");
    loginbtn.classList.add("clrbtn");
    loginform.style.display = "flex";
    signinform.style.display = "none";
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
      theme: "colored"
    })
  };
  return (
    <>
      <nav>
        <div id="part1">
          <Link to={"/"}>
            <img src="../Logo.png" alt="" id="logo" />
          </Link>
          <div id="menu">
            <svg
              className="hb"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 10 10"
              stroke="#eee"
              strokeWidth=".6"
              fill="rgba(0,0,0,0)"
              strokeLinecap="round"
            >
              <path d="M2,3L5,3L8,3M2,5L8,5M2,7L5,7L8,7">
                <animate
                  dur="0.2s"
                  attributeName="d"
                  values="M2,3L5,3L8,3M2,5L8,5M2,7L5,7L8,7;M3,3L5,5L7,3M5,5L5,5M3,7L5,5L7,7"
                  fill="freeze"
                  begin="start.begin"
                />
                <animate
                  dur="0.2s"
                  attributeName="d"
                  values="M3,3L5,5L7,3M5,5L5,5M3,7L5,5L7,7;M2,3L5,3L8,3M2,5L8,5M2,7L5,7L8,7"
                  fill="freeze"
                  begin="reverse.begin"
                />
              </path>
              <rect width="10" height="10" stroke="none">
                <animate
                  dur="2s"
                  id="reverse"
                  attributeName="width"
                  begin="click"
                />
              </rect>
              <rect width="10" height="10" stroke="none">
                <animate
                  dur="0.001s"
                  id="start"
                  attributeName="width"
                  values="10;0"
                  fill="freeze"
                  begin="click"
                />
                <animate
                  dur="0.001s"
                  attributeName="width"
                  values="0;10"
                  fill="freeze"
                  begin="reverse.begin"
                />
              </rect>
            </svg>
            <p>Menu</p>
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
            <BsCartFill style={{ cursor: "pointer" }} onClick={()=>{
              nav("/cart")
            }} />
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
            <input type="submit" />
          </form>
        </Box>
      </Modal>
    </>
  );
}
