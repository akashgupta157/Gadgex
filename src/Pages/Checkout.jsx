import React, { useState } from "react";
import styled from "styled-components";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { toast } from "react-toastify";
export default function Checkout() {
  const [submittedAdd, setSubmittedAdd] = useState(false);
  const [submittedPay, setSubmittedPay] = useState(false);

  const [address, setAddress] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    mobile: "",
    landmark: "",
  });
  const [cardInfo, setCardInfo] = useState({
    cardNumber: "",
    cardHolder: "",
    expirationMonth: "",
    expirationYear: "",
    cvv: "",
  });
  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateAddress(address);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      setSubmittedAdd(true);
    }
  };
  const validateAddress = (address) => {
    const errors = {};
    if (!address.name) {
      errors.name = "Name is required";
    }
    if (!address.street) {
      errors.street = "Street is required";
    }
    if (!address.city) {
      errors.city = "City is required";
    }
    if (!address.state) {
      errors.state = "State is required";
    }
    if (!address.landmark) {
      errors.landmark = "Landmark is required";
    }
    if (!address.zip) {
      errors.zip = "Zip code is required";
    } else if (!/^\d{6}$/.test(address.zip)) {
      errors.zip = "Pincode should be a 6-digit number";
    }
    if (!address.mobile) {
      errors.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(address.mobile)) {
      errors.mobile = "Mobile number should be a 10-digit number";
    }
    return errors;
  };
  const validateCardInfo = (cardInfo) => {
    const errors = {};
    if (!cardInfo.cardNumber) {
      errors.cardNumber = "Card number is required";
    } else if (!/^\d{16}$/.test(cardInfo.cardNumber)) {
      errors.cardNumber = "Card number should be a 16-digit number";
    }
    if (!cardInfo.cardHolder) {
      errors.cardHolder = "Card holder name is required";
    }
    if (!cardInfo.expirationMonth) {
      errors.expirationMonth = "Expiration month is required";
    } else if (!/^(0[1-9]|1[0-2])$/.test(cardInfo.expirationMonth)) {
      errors.expirationMonth = "Invalid expiration month";
    }
    if (!cardInfo.expirationYear) {
      errors.expirationYear = "Expiration year is required";
    } else if (!/^\d{4}$/.test(cardInfo.expirationYear)) {
      errors.expirationYear = "Invalid expiration year";
    }
    if (!cardInfo.cvv) {
      errors.cvv = "CVV is required";
    } else if (!/^\d{3}$/.test(cardInfo.cvv)) {
      errors.cvv = "Invalid CVV";
    }
    return errors;
  };
  const handleChange1 = (e) => {
    setCardInfo({
      ...cardInfo,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit1 = (e) => {
    e.preventDefault();
    const validationErrors = validateCardInfo(cardInfo);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      setSubmittedPay(true);
    }
  };
  if (submittedAdd && submittedPay) {
    toast.success("Order Conform", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }
  return (
    <DIV>
      <div>
        <Accordion className="con">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Shipping</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <form onSubmit={handleSubmit}>
                <div className="bow">
                  <label>
                    Name*
                    <input
                      type="text"
                      name="name"
                      value={address.name}
                      onChange={handleChange}
                    />
                    {errors.name && <span>{errors.name}</span>}
                  </label>
                  <label>
                    Mobile*
                    <input
                      type="number"
                      name="mobile"
                      value={address.mobile}
                      onChange={handleChange}
                    />
                    {errors.mobile && <span>{errors.mobile}</span>}
                  </label>
                </div>
                <br />
                <label>
                  Street*
                  <input
                    type="text"
                    name="street"
                    value={address.street}
                    onChange={handleChange}
                  />
                  {errors.street && <span>{errors.street}</span>}
                </label>
                <br />
                <div className="bow">
                  <label>
                    City*
                    <input
                      type="text"
                      name="city"
                      value={address.city}
                      onChange={handleChange}
                    />
                    {errors.city && <span>{errors.city}</span>}
                  </label>
                  <label>
                    State*
                    <input
                      type="text"
                      name="state"
                      value={address.state}
                      onChange={handleChange}
                    />
                    {errors.state && <span>{errors.state}</span>}
                  </label>
                </div>
                <br />
                <div className="bow">
                  <label>
                    Landmark*
                    <input
                      type="text"
                      name="landmark"
                      value={address.landmark}
                      onChange={handleChange}
                    />
                    {errors.zip && <span>{errors.landmark}</span>}
                  </label>
                  <label>
                    Zip*
                    <input
                      type="number"
                      name="zip"
                      value={address.zip}
                      onChange={handleChange}
                    />
                    {errors.zip && <span>{errors.zip}</span>}
                  </label>
                </div>
                <br />
                <button type="submit">Submit</button>
              </form>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <br />
        <Accordion className="con">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>Payment</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <form onSubmit={handleSubmit1}>
                <label>
                  Card Number:
                  <input
                    type="number"
                    name="cardNumber"
                    value={cardInfo.cardNumber}
                    onChange={handleChange1}
                  />
                  {errors.cardNumber && <span>{errors.cardNumber}</span>}
                </label>
                <br />
                <label>
                  Card Holder Name:
                  <input
                    type="text"
                    name="cardHolder"
                    value={cardInfo.cardHolder}
                    onChange={handleChange1}
                  />
                  {errors.cardHolder && <span>{errors.cardHolder}</span>}
                </label>
                <br />
                <div className="bow">
                  <label>
                    Expiration Month:
                    <input
                      type="number"
                      name="expirationMonth"
                      value={cardInfo.expirationMonth}
                      onChange={handleChange1}
                    />
                    {errors.expirationMonth && (
                      <span>{errors.expirationMonth}</span>
                    )}
                  </label>
                  <label>
                    Expiration Year:
                    <input
                      type="number"
                      name="expirationYear"
                      value={cardInfo.expirationYear}
                      onChange={handleChange1}
                    />
                    {errors.expirationYear && (
                      <span>{errors.expirationYear}</span>
                    )}
                  </label>
                  <label>
                    CVV:
                    <input
                      type="number"
                      name="cvv"
                      value={cardInfo.cvv}
                      onChange={handleChange1}
                    />
                    {errors.cvv && <span>{errors.cvv}</span>}
                  </label>
                </div>
                <br />
                <button type="submit">Submit</button>
              </form>
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
      <div>sdfvn</div>
    </DIV>
  );
}
const DIV = styled.div`
  background-color: #121313;
  min-height: 100vh;
  color: white;
  text-align: center;
  display: flex;
  padding: 50px;
  > div:first-child {
    width: 60%;
  }
  .con {
    color: white;
    background-color: transparent;
    border: 1px solid white;
    padding: 10px 20px;
    p {
      font-size: 20px;
      font-weight: bolder;
    }
    form {
      .bow {
        display: flex;
        justify-content: space-between;
        gap: 20px;
        label {
          width: 50%;
          input {
            background-color: #121313;
            border: 1px solid white;
            border-radius: 10px;
            padding: 15px;
            font-size: 16px;
            color: white;
          }
        }
      }
      label {
        text-align: left;
        display: flex;
        flex-direction: column;
        font-size: 14px;
        font-weight: lighter;
        input {
          background-color: #121313;
          border: 1px solid white;
          border-radius: 10px;
          padding: 15px;
          font-size: 16px;
          color: white;
        }
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        span {
          color: red;
        }
      }
      button {
        background-color: #00e8be;
        border: 0;
        padding: 10px 50px;
        font-size: 16px;
        font-weight: bolder;
        border-radius: 10px;
      }
    }
  }
`;
