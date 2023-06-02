import React, { useEffect, useMemo, useRef, useState } from "react";
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
import {
  Button,
  IconButton,
  InputBase,
  Paper,
  TextField,
  TextareaAutosize,
} from "@mui/material";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import { ThreeDots } from "react-loader-spinner";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
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
    kf: [],
  };
  const editData = {
    title: "",
    price: 0,
    kf: [],
    discount: 0,
  };
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [openEdit, setOpenEdit] = useState(false);
  const handleClickOpenEdit = () => {
    setOpenEdit(true);
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };
  const [openView, setOpenView] = useState(false);
  const handleClickOpenView = () => {
    setOpenView(true);
  };
  const handleCloseView = () => {
    setOpenView(false);
  };
  const url = `https://incandescent-nettle-pirate.glitch.me/products`;
  const [product, setProduct] = useState(initialState);
  const [view, setView] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [img, setImg] = useState();
  const [edit, setEdit] = useState(editData);
  const [inputValues, setInputValues] = useState({});
  const [counter, setCounter] = useState(0);
  const [id1, setid] = useState(0);
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
    setProduct({ ...product, image: [img, ...x] });
  }, [inputValues, img]);
  const formSubmit = async (e) => {
    e.preventDefault();
    let obj = {
      ...product,
      discount: Math.floor(Math.random() * (50 - 20)) + 20,
      offer_price: Math.floor(
        product.price -
          ((Math.floor(Math.random() * (50 - 20)) + 20) / 100) * product.price
      ),
    };
    const addProduct = await axios.post(url, obj);
    setData([...data, addProduct.data].reverse());
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
  const fetchProduct = async () => {
    const response = await axios.get(url);
    return response.data;
  };
  useEffect(() => {
    const getAll = async () => {
      const allProducts = await fetchProduct();
      if (allProducts) {
        setData(allProducts.reverse());
        setLoading(false);
      }
    };
    getAll();
  }, []);
  const handleDelete = async () => {
    await axios.delete(`${url}/${id1}`);
    const deleteProducts = data.filter((data) => {
      return data.id !== id1;
    });
    console.log(deleteProducts);
    setData(deleteProducts);
    handleClose();
    toast.success("Data Delete Successfully", {
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
  const Aa = (e) => {
    fetch(`${url}/${e}`)
      .then((res) => res.json())
      .then((data) => {
        setEdit({
          title: data.title,
          price: +data.price,
          kf: data.kf,
          discount: data.discount,
        });
      });
  };
  const Bb = (e) => {
    fetch(`${url}/${e}`)
      .then((res) => res.json())
      .then((data) => {
        setView(data);
      });
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 3,
  };
  const handleEdit = async (e) => {
    e.preventDefault();
    const obj = {
      ...edit,
      offer_price: Math.floor(edit.price - (edit.discount / 100) * edit.price),
      price: +edit.price,
    };
    const editProduct = await axios.patch(`${url}/${id1}`, obj);
    const { id } = editProduct.data;
    setData(
      data.map((e) => {
        return e.id === id ? { ...editProduct.data } : e;
      })
    );
    handleCloseEdit();
    toast.success("Data Updated Successfully", {
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
  const handleSearchValue = () => {
    const clearIcon = document.getElementById("clearIcon");
    const searchForm = document.getElementById("searchForm");
    if (searchValue.length === 1) {
      clearIcon.style.display = "none";
    } else {
      clearIcon.style.display = "flex";
      searchForm.style.borderColor = "black";
    }
    clearIcon.onclick = () => {
      searchForm.style.borderColor = "black";
      setSearchValue("");
      clearIcon.style.display = "none";
      const getAll = async () => {
        const allProducts = await fetchProduct();
        if (allProducts) {
          setData(allProducts.reverse());
          setLoading(false);
        }
      };
      getAll();
    };
  };
  const handleSearch = async (e) => {
    e.preventDefault();
    const searchForm = document.getElementById("searchForm");
    if (searchValue === "") {
      searchForm.style.borderColor = "red";
    } else {
      searchForm.style.borderColor = "black";
      return await axios
        .get(`${url}?q=${searchValue}`)
        .then((res) => setData(res.data));
    }
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
          zIndex: "100",
          height: "12vh",
        }}
      >
        <Link to={"/"}>
          <img src="https://i.ibb.co/JKh5KX6/Logo.png" alt="" id="logo" />
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
            width: "300px",
            padding: "20px",
            bgcolor: "black",
            height: "88vh",
            position: "fixed",
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
        <TabPanel value={value} index={0} className="right">
          Item One
        </TabPanel>
        <TabPanel value={value} index={1} id="addproduct" className="right">
          <div>
            <form action="" id="addproductform" onSubmit={formSubmit}>
              <input
                list="category"
                name="ecategory"
                id="ecategory"
                autoComplete="off"
                placeholder="Select Category"
                onChange={(e) =>
                  setProduct({ ...product, category: e.target.value })
                }
              />
              <datalist id="category">
                <option value="TV" />
                <option value="Laptops" />
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
                onChange={(e) => setImg(e.target.value)}
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
                sx={{
                  width: "30%",
                  margin: "auto",
                  marginTop: "30px",
                  color: "black",
                  fontWeight: "800",
                }}
              >
                Submit
              </Button>
            </form>
          </div>
        </TabPanel>
        <TabPanel value={value} index={2} className="right">
          {loading ? (
            <div
              style={{
                position: "absolute",
                top: "30%",
                left: "60%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <ThreeDots
                height="80"
                width="80"
                radius="10"
                color="#0c76d2"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
              />
            </div>
          ) : (
            <>
              <div id="searchBar">
                <Paper
                  component="form"
                  id="searchForm"
                  sx={{
                    p: "2px 4px",
                    display: "flex",
                    alignItems: "center",
                    width: 450,
                    border: "1px solid black",
                  }}
                >
                  <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search by Title, Brand, Category"
                    onChange={(e) => {
                      handleSearchValue();
                      setSearchValue(e.target.value);
                    }}
                    value={searchValue}
                  />
                  <IconButton
                    type="button"
                    sx={{ p: "10px", display: "none" }}
                    id="clearIcon"
                  >
                    <ClearIcon />
                  </IconButton>
                  <IconButton
                    type="button"
                    sx={{ p: "10px" }}
                    aria-label="search"
                    onClick={handleSearch}
                  >
                    <SearchIcon />
                  </IconButton>
                </Paper>
              </div>
              {data.length === 0 ? (
                <h1>Data Not Found</h1>
              ) : (
                <table key={"p"}>
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Price</th>
                      <th>Image</th>
                      <th>Brand</th>
                      <th>Category</th>
                      <th>View</th>
                      <th>Edit</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  {data?.map((e) => (
                    <tbody>
                      <tr key={e.id}>
                        <td>{e.title}</td>
                        <td>
                          ₹{(e.price)}
                          .00
                        </td>
                        <td>
                          <div class="dropdown">
                            <img
                              src={
                                e.image
                                  ? e.image[0]
                                  : "https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"
                              }
                              alt="Cinque Terre"
                              width="100"
                            />
                          </div>
                        </td>
                        <td>{e.brand}</td>
                        <td>{e.category}</td>
                        <td>
                          <button
                            id="view"
                            onClick={() => {
                              handleClickOpenView();
                              setid(e.id);
                              Bb(e.id);
                            }}
                          >
                            View
                          </button>
                        </td>
                        <td>
                          <button
                            id="edit"
                            onClick={() => {
                              handleClickOpenEdit();
                              setid(e.id);
                              Aa(e.id);
                            }}
                          >
                            Edit
                          </button>
                        </td>
                        <td>
                          <button
                            id="delete"
                            onClick={() => {
                              handleClickOpen();
                              setid(e.id);
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  ))}
                </table>
              )}
            </>
          )}

          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Want to Delete the Product?"}
            </DialogTitle>
            <DialogActions>
              <Button
                onClick={handleClose}
                sx={{
                  bgcolor: "green",
                  color: "white",
                  "&:hover": { bgcolor: "green", color: "white" },
                }}
              >
                Disagree
              </Button>
              <Button
                onClick={() => handleDelete()}
                autoFocus
                sx={{
                  bgcolor: "red",
                  color: "white",
                  "&:hover": { bgcolor: "red", color: "white" },
                }}
              >
                Agree
              </Button>
            </DialogActions>
          </Dialog>
          <Modal
            open={openEdit}
            onClose={handleCloseEdit}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Edit Product
                </Typography>
                <CloseIcon
                  sx={{ cursor: "pointer" }}
                  onClick={handleCloseEdit}
                />
              </div>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <form
                  onSubmit={handleEdit}
                  action=""
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                  }}
                >
                  <TextField
                    required
                    autoComplete="off"
                    id="outlined-basic"
                    label="Title"
                    sx={{ width: "100%" }}
                    variant="outlined"
                    value={edit.title}
                    onChange={(e) =>
                      setEdit({ ...edit, title: e.target.value })
                    }
                  />
                  <TextField
                    required
                    autoComplete="off"
                    id="outlined-basic"
                    label="Price"
                    sx={{ width: "100%" }}
                    variant="outlined"
                    value={+edit.price}
                    onChange={(e) =>
                      setEdit({ ...edit, price: +e.target.value })
                    }
                  />
                  <TextField
                    required
                    autoComplete="off"
                    id="outlined-basic"
                    label="Discount"
                    sx={{ width: "100%" }}
                    variant="outlined"
                    value={edit.discount}
                    onChange={(e) =>
                      setEdit({ ...edit, discount: e.target.value })
                    }
                  />
                  <TextareaAutosize
                    required
                    autoComplete="off"
                    minRows={1}
                    value={edit.kf.join("\n")}
                    variant="outlined"
                    style={{
                      minHeight: 100,
                      fontSize: "16px",
                      border: "1px solid black",
                      padding: "10px",
                    }}
                    onChange={(e) =>
                      setEdit({ ...edit, kf: e.target.value.split("\n") })
                    }
                  />
                  <button
                    style={{
                      width: "20%",
                      paddingTop: "10px",
                      paddingBottom: "10px",
                      margin: "auto",
                      backgroundColor: "#00e8be",
                      border: "0",
                      fontSize: "16px",
                      fontWeight: "bolder",
                      borderRadius: "5px",
                    }}
                  >
                    Submit
                  </button>
                </form>
              </Typography>
            </Box>
          </Modal>
          <Modal
            open={openView}
            onClose={handleCloseView}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography id="modal-modal-title" variant="h5" component="h2">
                  View Product
                </Typography>
                <CloseIcon
                  sx={{ cursor: "pointer" }}
                  onClick={handleCloseView}
                />
              </div>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <img
                      src={view.image ? view.image[0] : null}
                      width={200}
                      alt=""
                    />

                    <div>
                      <h4
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "5px",
                        }}
                      >
                        <h3>Title: </h3>
                        {view.title}
                      </h4>
                      <h4
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                        }}
                      >
                        <h3>Price: </h3>₹{(view.price)}
                        .00
                      </h4>
                      <h4
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                        }}
                      >
                        <h3>Discount: </h3>
                        {view.discount}%
                      </h4>
                      <h4
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                        }}
                      >
                        <h3>Offer Price: </h3>₹
                        {(view.offer_price)}
                        .00
                      </h4>
                      <h4
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                        }}
                      >
                        <h3>Brand: </h3>
                        {view.brand}
                      </h4>
                    </div>
                  </div>
                  <ul>
                    <h3>Key Feature</h3>
                    {view.kf?.map((e) => (
                      <li key={e}>{e}</li>
                    ))}
                  </ul>
                </div>
              </Typography>
            </Box>
          </Modal>
        </TabPanel>
        <TabPanel value={value} index={3} className="right">
          Item Three
        </TabPanel>
        <TabPanel value={value} index={4} className="right">
          Item Three
        </TabPanel>
        <TabPanel value={value} index={5} className="right">
          Item Three
        </TabPanel>
        <TabPanel value={value} index={6} className="right">
          Item Three
        </TabPanel>
      </Box>
    </>
  );
}
