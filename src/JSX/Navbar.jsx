import React from "react";
import "../CSS/Navbar.css";
import { FaUserAlt } from "react-icons/fa";
import { BsCartFill } from "react-icons/bs";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import { useForm } from "react-hook-form";
const style = {
  bgcolor: "#131213",
  // border: '2px solid #000',
};

export default function Navbar() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
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
          <FaUserAlt onClick={handleOpen} />
          <BsCartFill />
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
            <button>Login</button>
            <button>Create Account</button>
          </div>
          <form id="ca" onSubmit={handleSubmit(onSubmit)}>
            <label>Enter your Name</label>
            <input
              {...register("Name", {
                required: true,
                maxLength: 20,
                minLength:3,
                pattern: /^[A-Za-z]+$/i,
              })}
            />
            {errors?.Name?.type === "required" && <p>This field is required</p>}
            {errors?.Name?.type === "maxLength" && (<p>Name cannot exceed 20 characters</p>)}
            {errors?.Name?.type === "minLength" && (<p>Name must be at 3 characters</p>)}
            {errors?.Name?.type === "pattern" && (<p>Alphabetical characters only</p>)}

            <label>Enter your Email</label>
            <input
              {...register("Email", {
                required: true,
                pattern:/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              })}
            />
            {errors?.Email?.type === "required" && <p>This field is required</p>}
            {errors?.Email?.type === "pattern" && (<p>Invalid email address</p>)}

            <label>Create your Password</label>
            <input
              type="password"
              {...register("Password", {
                required: true,
                minLength:6,
                maxLength:6
              })}
            />
            {errors?.Password?.type === "required" && <p>This field is required</p>}
            {errors?.Password?.type === "minLength" && (<p>Password must be at 6 characters</p>)}
            {errors?.Password?.type === "maxLength" && (<p>Password must be at 6 characters</p>)}

            <input type="submit" />
          </form>
        </Box>
      </Modal>
    </>
  );
}
