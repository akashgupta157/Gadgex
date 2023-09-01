import { Checkbox, FormControlLabel } from "@mui/material";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import ImportExportOutlinedIcon from "@mui/icons-material/ImportExportOutlined";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import styled from "styled-components";
export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [open1, setOpen1] = useState(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);
  const param = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialBrand = searchParams.getAll("brand");
  const initialDiscount = searchParams.getAll("discount");
  const initialDiscountGte = searchParams.getAll("discountGte");
  const initialOrder = searchParams.getAll("order");
  const initiallte = searchParams.get("lte");
  const initialgte = searchParams.get("gte");
  const [order, setOrder] = useState(initialOrder || "");
  const [brand, setBrand] = useState(initialBrand || []);
  const [data, setData] = useState();
  const [gteValue, setGteValue] = useState(initialgte || "");
  const [lteValue, setLteValue] = useState(initiallte || "");
  const [discount, setDiscount] = useState(initialDiscount || []);
  const [discountGte, setDiscountGte] = useState(initialDiscountGte || []);
  const handleChangeSort = (event) => {
    setOrder(event.target.value);
  };
  const handleChangeBrand = (event) => {
    const { value } = event.target;
    let newBrand = [...brand];
    if (newBrand.includes(value)) {
      newBrand = newBrand.filter((e) => e !== value);
    } else {
      newBrand.push(value);
    }
    setBrand(newBrand);
  };
  const handleChangeDiscount = (event) => {
    let newDiscount = [...discount];
    let newDiscountGte = [...discountGte];
    if (newDiscount.includes(event.target.value)) {
      newDiscount = newDiscount.filter((e) => e !== event.target.value);
    }
    if (newDiscountGte.includes(`${event.target.value - 10}`)) {
      newDiscountGte = newDiscountGte.filter(
        (e) => e !== `${event.target.value - 10}`
      );
    } else {
      newDiscount.push(event.target.value);
      newDiscountGte.push(event.target.value - 10);
    }
    setDiscount(newDiscount);
    setDiscountGte(newDiscountGte);
  };
  useEffect(() => {
    let params = {
      brand,
      discount,
      discountGte,
    };
    order && (params.order = order);
    lteValue && (params.lte = lteValue);
    gteValue && (params.gte = gteValue);
    setSearchParams(params);
  }, [brand, order, discount, discountGte]);
  const brandArr = [];
  useEffect(() => {
    axios
      .get(
        `https://incandescent-nettle-pirate.glitch.me/products?q=${param.category}`
      )
      .then((res) => setData(res.data));
  }, [brand, param]);
  data?.map((e) => {
    brandArr.push(e.brand);
  });
  let uniqueBrand = [...new Set(brandArr)];
  // uniqueBrand.pop();
  const style = {
    position: "absolute",
    top: "80%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    bgcolor: "#191818",
    boxShadow: 24,
    color: "white",
    p: 2,
    pt: 4,
  };
  const style1 = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    bgcolor: "#191818",
    boxShadow: 24,
    color: "white",
    p: 2,
    pt: 4,
    height: "100%",
  };
  function ListItem({ value, item, selected, handleClick }) {
    const className = selected ? "selected" : "";
    return (
      <li className={className} onClick={() => handleClick(value)}>
        {item}
      </li>
    );
  }
  const [selectedItem, setSelectedItem] = useState(null);
  const handleClick = (value) => {
    setSelectedItem(value);
    setOrder(value);
  };
  const fetchData = (e) => {
    e.preventDefault();
    let params = {
      discount,
      brand,
      discountGte,
    };
    order && (params.order = order);
    lteValue && (params.lte = lteValue);
    gteValue && (params.gte = gteValue);
    setSearchParams(params);
  };
  const handleReset = () => {
    setBrand([]);
    setOrder("");
    setGteValue("");
    setLteValue("");
    setDiscount([]);
    setDiscountGte([]);
  };
  function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
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
      id: `vertical-tab-${index}`,
      "aria-controls": `vertical-tabpanel-${index}`,
    };
  }
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <DIV>
        <h4>SORT BY</h4>
        <select
          value={order}
          onChange={handleChangeSort}
          style={{
            border: "1px solid white",
            marginTop: "5px",
            width: "200px",
            color: "white",
            backgroundColor: "transparent",
          }}
        >
          <option value="" defaultChecked={order === ""}>
            FEATURED
          </option>
          <option value="desc" defaultChecked={order === "desc"}>
            PRICE (HIGHEST FIRST)
          </option>
          <option value="asc" defaultChecked={order === "asc"}>
            PRICE (LOWEST FIRST)
          </option>
        </select>
        <h4>BRAND</h4>
        <div id="brand">
          {uniqueBrand?.map((e) => (
            <FormControlLabel
              key={e}
              control={
                <Checkbox
                  sx={{
                    color: "grey",
                    width: "40px",
                    "&.Mui-checked": { color: "#00e8be" },
                  }}
                />
              }
              value={e}
              onChange={handleChangeBrand}
              label={e}
              checked={brand.includes(e)}
            />
          ))}
        </div>
        <h4>PRICE</h4>
        <form id="priceFilter" onSubmit={fetchData}>
          <input
            type="number"
            value={gteValue}
            onChange={(e) => setGteValue(e.target.value)}
            placeholder="Min Price"
          />
          <input
            type="number"
            value={lteValue}
            onChange={(e) => setLteValue(e.target.value)}
            placeholder="Max Price"
            required
          />
          <button>
            <ArrowForwardIcon />
          </button>
        </form>
        <h4>DISCOUNT</h4>
        <div id="discount">
          <FormControlLabel
            control={
              <Checkbox
                sx={{
                  color: "grey",
                  width: "40px",
                  "&.Mui-checked": { color: "#00e8be" },
                }}
              />
            }
            value={10}
            onChange={handleChangeDiscount}
            label={"0% to 10%"}
            checked={discount.includes("10")}
          />
          <FormControlLabel
            control={
              <Checkbox
                sx={{
                  color: "grey",
                  width: "40px",
                  "&.Mui-checked": { color: "#00e8be" },
                }}
              />
            }
            value={20}
            onChange={handleChangeDiscount}
            label={"10% to 20%"}
            checked={discount.includes("20")}
          />
          <FormControlLabel
            control={
              <Checkbox
                sx={{
                  color: "grey",
                  width: "40px",
                  "&.Mui-checked": { color: "#00e8be" },
                }}
              />
            }
            value={"30"}
            onChange={handleChangeDiscount}
            label={"20% to 30%"}
            checked={discount.includes("30")}
          />
          <FormControlLabel
            control={
              <Checkbox
                sx={{
                  color: "grey",
                  width: "40px",
                  "&.Mui-checked": { color: "#00e8be" },
                }}
              />
            }
            value={"40"}
            onChange={handleChangeDiscount}
            label={"30% to 40%"}
            checked={discount.includes("40")}
          />
          <FormControlLabel
            control={
              <Checkbox
                sx={{
                  color: "grey",
                  width: "40px",
                  "&.Mui-checked": { color: "#00e8be" },
                }}
              />
            }
            value={"50"}
            onChange={handleChangeDiscount}
            label={"40% to 50%"}
            checked={discount.includes("50")}
          />
        </div>
        <button id="reset" onClick={handleReset}>
          Reset
        </button>
      </DIV>
      <DIV2>
        <Modal open={open} onClose={handleClose}>
          <Box sx={style} id="list">
            <h7>SORT BY</h7>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <ul>
                <ListItem
                  value=""
                  item="FEATURED"
                  selected={selectedItem === ""}
                  handleClick={handleClick}
                />
                <ListItem
                  value="desc"
                  item="PRICE (HIGHEST FIRST)"
                  selected={selectedItem === "desc"}
                  handleClick={handleClick}
                />
                <ListItem
                  value="asc"
                  item="PRICE (LOWEST FIRST)"
                  selected={selectedItem === "asc"}
                  handleClick={handleClick}
                />
              </ul>
            </Typography>
          </Box>
        </Modal>
        <button onClick={handleOpen}>
          <ImportExportOutlinedIcon />
          SORT
        </button>
        <button onClick={handleOpen1}>
          <FilterAltOutlinedIcon />
          FILTER
        </button>
        <Modal
          open={open1}
          onClose={handleClose1}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style1}>
            <Box
              sx={{
                flexGrow: 1,
                bgcolor: "transparent",
                display: "flex",
                height: "90%",
              }}
            >
              <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{ borderRight: 1, borderColor: "gray", width: "30%" }}
              >
                <Tab label="BRAND" {...a11yProps(0)} />
                <Tab label="PRICE" {...a11yProps(1)} />
                <Tab label="DISCOUNT" {...a11yProps(2)} />
              </Tabs>
              <div style={{ width: "70%" }}>
                <TabPanel value={value} index={0}>
                  <div id="brand">
                    {uniqueBrand?.map((e) => (
                      <FormControlLabel
                        key={e}
                        control={
                          <Checkbox
                            sx={{
                              color: "grey",
                              width: "40px",
                              "&.Mui-checked": { color: "#00e8be" },
                            }}
                          />
                        }
                        value={e}
                        onChange={handleChangeBrand}
                        label={e}
                        checked={brand.includes(e)}
                      />
                    ))}
                  </div>
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <form id="priceFilter" onSubmit={fetchData}>
                    <input
                      type="number"
                      value={gteValue}
                      onChange={(e) => setGteValue(e.target.value)}
                      placeholder="Min Price"
                    />
                    <input
                      type="number"
                      value={lteValue}
                      onChange={(e) => setLteValue(e.target.value)}
                      placeholder="Max Price"
                      required
                    />
                    <button>
                      <ArrowForwardIcon />
                    </button>
                  </form>
                </TabPanel>
                <TabPanel value={value} index={2}>
                  <div id="discount">
                    <FormControlLabel
                      control={
                        <Checkbox
                          sx={{
                            color: "grey",
                            width: "40px",
                            "&.Mui-checked": { color: "#00e8be" },
                          }}
                        />
                      }
                      value={10}
                      onChange={handleChangeDiscount}
                      label={"0% to 10%"}
                      checked={discount.includes("10")}
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          sx={{
                            color: "grey",
                            width: "40px",
                            "&.Mui-checked": { color: "#00e8be" },
                          }}
                        />
                      }
                      value={20}
                      onChange={handleChangeDiscount}
                      label={"10% to 20%"}
                      checked={discount.includes("20")}
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          sx={{
                            color: "grey",
                            width: "40px",
                            "&.Mui-checked": { color: "#00e8be" },
                          }}
                        />
                      }
                      value={"30"}
                      onChange={handleChangeDiscount}
                      label={"20% to 30%"}
                      checked={discount.includes("30")}
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          sx={{
                            color: "grey",
                            width: "40px",
                            "&.Mui-checked": { color: "#00e8be" },
                          }}
                        />
                      }
                      value={"40"}
                      onChange={handleChangeDiscount}
                      label={"30% to 40%"}
                      checked={discount.includes("40")}
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          sx={{
                            color: "grey",
                            width: "40px",
                            "&.Mui-checked": { color: "#00e8be" },
                          }}
                        />
                      }
                      value={"50"}
                      onChange={handleChangeDiscount}
                      label={"40% to 50%"}
                      checked={discount.includes("50")}
                    />
                  </div>
                </TabPanel>
              </div>
            </Box>
            <div id="btmBtn" style={{ marginTop: "10px" }}>
              <button
                style={{
                  width: "50%",
                  padding: "15px",
                  fontSize: "14px",
                  border: "1px solid white",
                  backgroundColor: "transparent",
                  color: "white",
                  fontWeight: "bolder",
                  borderRadius: "5px",
                }}
                onClick={handleReset}
              >
                RESET
              </button>
              <button
                style={{
                  width: "50%",
                  padding: "15px",
                  fontSize: "14px",
                  border: "1px solid white",
                  backgroundColor: "transparent",
                  color: "white",
                  fontWeight: "bolder",
                  borderRadius: "5px",
                }}
                onClick={handleClose1}
              >
                CLOSE
              </button>
            </div>
          </Box>
        </Modal>
      </DIV2>
    </>
  );
}
const DIV2 = styled.div`
  display: none;
  @media screen and (max-width: 865px) /* Tablet */ {
    display: flex;
    position: fixed;
    width: 100%;
    bottom: 0;
    width: 100%;
    left: 0;
    z-index: 1;
    #priceFilter {
      border: 1px solid red;
      display: flex;
      gap: 10px;
      align-items: center;
      margin-top: 10px;
      input {
        width: 35%;
        font-size: 16px;
        padding: 10px;
        padding-left: 5px;
        background-color: transparent;
        border: 1px solid white;
        border-radius: 5px;
        outline: none;
        color: white;
      }
      input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
      button {
        height: 50%;
        background-color: #00e8be;
        border: 0;
        outline: none;
        display: flex;
      }
    }
    #brand,
    #discount {
      display: flex;
      flex-direction: column;
    }
    #list {
      border: 1px solid red;
    }
    button {
      width: 50%;
      background-color: #343435;
      font-size: 14px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
      padding: 20px;
      border: 0;
      font-weight: 900;
      :first-child {
        border-right: 1px solid;
      }
      svg {
        font-size: 25px;
      }
    }
  }
  @media screen and (max-width: 480px) /* Mobile */ {
  }
`;
const DIV = styled.div`
  width: 30%;
  color: white;
  padding-bottom: 50px;
  border-right: 1px solid gray;
  #reset {
    background-color: #00e8be;
    border: 0;
    outline: none;
    padding: 10px 20px;
    margin-top: 5%;
    font-size: 16px;
    border-radius: 10px;
    font-weight: bolder;
  }
  #priceFilter {
    /* border: 1px solid red; */
    display: flex;
    gap: 10px;
    align-items: center;
    margin-top: 10px;
    input {
      width: 35%;
      font-size: 16px;
      padding: 10px;
      padding-left: 5px;
      background-color: transparent;
      border: 1px solid white;
      border-radius: 5px;
      outline: none;
      color: white;
    }
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    button {
      height: 50%;
      background-color: #00e8be;
      border: 0;
      outline: none;
      display: flex;
    }
  }
  #brand,
  #discount {
    display: flex;
    flex-direction: column;
  }
  h4 {
    padding-top: 20px;
  }
  select {
    font-size: 14px;
    font-weight: bold;
    padding: 15px 10px;
    border-radius: 10px;
    outline: none;
    option:checked,
    option:hover {
      color: #00e8be;
      background-color: #121212;
    }
    option {
      color: white;
      font-size: 16px;
      font-weight: bold;
      background: #121212;
    }
  }
  @media screen and (min-width: 866px) and (max-width: 1024px) /* Laptop */ {
    width: 30%;
  }
  @media screen and (max-width: 865px) /* Tablet */ {
    display: none;
  }
  @media screen and (max-width: 480px) /* Mobile */ {
  }
`;
