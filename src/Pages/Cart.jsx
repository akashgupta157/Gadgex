import { Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { login } from "../Redux/authReducer/action";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export default function Cart() {
  const Nav = useNavigate();
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.authReducer);
  const [price, setprice] = useState(0);
  useEffect(() => {
    if (cartData.user.cart) {
      let total_price = cartData.user.cart.reduce((iv, ce) => {
        iv = iv + ce.offer_price;
        return iv;
      }, 0);
      setprice(total_price);
    }
  });
  const toIndianCurrency = (num) => {
    const curr = num.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
    });
    return curr;
  };
  const handledelete = (id) => {
    const filterdata = cartData.user.cart?.filter((el) => el.id != id);
    toast.error("Item Removed", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    axios
      .patch(
        `https://incandescent-nettle-pirate.glitch.me/profile/${cartData.user.id}`,
        { cart: filterdata }
      )
      .then((res) => {
        dispatch(login(res.data));
      })
      .catch((err) => console.log(err));
  };
  return (
    <div style={{ background: "#121313", height: "max-height" }}>
      {cartData.isAuthenticated ? (
        cartData.user.cart.length === 0 ? (
          <div
            style={{
              margin: "auto",
              width: "240px",
              paddingTop: "50px",
              paddingBottom: "50px",
              height: "80vh",
            }}
          >
            <svg width="238px" height="120px" viewBox="0 0 238 120">
              <title>Cart</title>
              <g
                id="Updated-Cart-|-Shipping-|-Payment-Page-Copy"
                stroke="none"
                strokeWidth="1"
                fill="none"
                fillRule="evenodd"
              >
                <g
                  id="Empty-Cart"
                  transform="translate(-549.000000, -178.000000)"
                >
                  <g id="Group-9" transform="translate(462.000000, 178.000000)">
                    <g id="Group-7" transform="translate(88.000000, 0.000000)">
                      <g
                        id="shopping-cart-simple"
                        transform="translate(58.400000, 0.000000)"
                      >
                        <rect
                          id="Rectangle"
                          x="0"
                          y="0"
                          width="120"
                          height="120"
                        ></rect>
                        <circle
                          id="Oval"
                          stroke="#FFFFFF"
                          fillRule="nonzero"
                          cx="37.5"
                          cy="101.25"
                          r="7.5"
                        ></circle>
                        <circle
                          id="Oval"
                          stroke="#FFFFFF"
                          fillRule="nonzero"
                          cx="86.25"
                          cy="101.25"
                          r="7.5"
                        ></circle>
                        <path
                          d="M19.828125,33.75 L103.921875,33.75 L91.546875,77.0625 C90.6393075,80.2935554 87.6841669,82.5195055 84.328125,82.5001272 L39.421875,82.5001272 C36.0658331,82.5195055 33.1106925,80.2935554 32.203125,77.0625 L15.234375,17.71875 C14.7736501,16.1079783 13.3003656,14.9982315 11.625,14.9999979 L3.75,14.9999979"
                          id="Path"
                          stroke="#FFFFFF"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </g>
                      <line
                        x1="0.3125"
                        y1="109.0625"
                        x2="235.9375"
                        y2="109.0625"
                        id="Line"
                        stroke="#353535"
                        strokeLinecap="square"
                      ></line>
                      <line
                        x1="12.1875"
                        y1="45.3125"
                        x2="52.8125"
                        y2="45.3125"
                        id="Line-Copy"
                        stroke="#353535"
                        strokeLinecap="square"
                      ></line>
                      <line
                        x1="4.6875"
                        y1="60.3125"
                        x2="19.0625"
                        y2="60.3125"
                        id="Line-Copy-2"
                        stroke="#353535"
                        strokeLinecap="square"
                      ></line>
                      <line
                        x1="167.1875"
                        y1="54.0625"
                        x2="181.5625"
                        y2="54.0625"
                        id="Line-Copy-3"
                        stroke="#353535"
                        strokeLinecap="square"
                      ></line>
                      <line
                        x1="167.1875"
                        y1="64.0625"
                        x2="220.3125"
                        y2="64.0625"
                        id="Line-Copy-4"
                        stroke="#353535"
                        strokeLinecap="square"
                      ></line>
                    </g>
                  </g>
                </g>
              </g>
            </svg>
            <p
              style={{
                color: "white",
                fontSize: "20px",
                textAlign: "center",
                paddingTop: "10px",
                fontWeight: "600",
              }}
            >
              Your Cart is Empty
            </p>
          </div>
        ) : (
          <>
            <DIV>
              <h2>YOUR CART</h2>
              <div id="cart">
                <div id="cartList">
                  {cartData.user.cart.reverse()?.map((e) => (
                    <div key={e.id}>
                      <img src={e.image[0]} alt="" />
                      <div>
                        <h3>{e.title}</h3>
                        <div id="snot">
                          <span>
                            {toIndianCurrency(e.offer_price)}
                            
                          </span>
                          <br />
                          <div>(Incl. all Taxes)</div>
                          <Divider
                            sx={{
                              backgroundColor: "#606160",
                              float: "right",
                              width: "90%",
                              mt: "10px",
                              mb: "10px",
                            }}
                          />
                          <strike>
                            MRP: {toIndianCurrency(e.price)}
                            
                          </strike>
                          <p>
                            (Save {toIndianCurrency(e.price - e.offer_price)}
                            )
                          </p>
                          <Divider
                            sx={{
                              backgroundColor: "#606160",
                              float: "right",
                              width: "90%",
                              mt: "10px",
                              mb: "10px",
                            }}
                          />
                          {e.offer_price > 5000 ? (
                            <h1>
                              {toIndianCurrency(Math.ceil(e.offer_price / 12))}
                              /mo* <small>EMI Options</small>
                            </h1>
                          ) : null}
                        </div>
                        <div>
                          <button>Move to Wishlist</button>
                          <button onClick={() => handledelete(e.id)}>
                            Remove
                          </button>
                        </div>
                      </div>
                      <div>
                        <span>
                          {toIndianCurrency(e.offer_price)}
                          
                        </span>
                        <div>(Incl. all Taxes)</div>
                        <Divider
                          sx={{
                            backgroundColor: "#606160",
                            float: "right",
                            width: "90%",
                            mt: "10px",
                            mb: "10px",
                          }}
                        />
                        <strike>
                          MRP: {toIndianCurrency(e.price)}
                          
                        </strike>
                        <p>
                          (Save {toIndianCurrency(e.price - e.offer_price)}
                          )
                        </p>
                        <Divider
                          sx={{
                            backgroundColor: "#606160",
                            float: "right",
                            width: "90%",
                            mt: "10px",
                            mb: "10px",
                          }}
                        />
                        {e.offer_price > 5000 ? (
                          <h1>
                            {toIndianCurrency(Math.ceil(e.offer_price / 12))}
                            /mo* <small>EMI Options</small>
                          </h1>
                        ) : null}
                      </div>
                    </div>
                  ))}
                </div>
                <div id="cartPrice">
                  <h4>Order Summary ({cartData.user.cart.length} items)</h4>
                  <div>
                    <p>Original Price</p>
                    <p>
                      {toIndianCurrency(price)}
                      
                    </p>
                  </div>
                  <div>
                    <p>Delivery</p>
                    <p>{price > 5000 ? "Free" : "₹100"}</p>
                  </div>
                  <div>
                    <p>Total</p>
                    <p>
                      {price > 5000
                        ? `
                      ${toIndianCurrency(price)}`
                        : ` ₹
                        ${toIndianCurrency(price + 100)}.00`}
                    </p>
                  </div>
                  <button
                    onClick={() => Nav("/checkout", { state: { price } })}
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </DIV>
          </>
        )
      ) : (
        <div
          style={{
            margin: "auto",
            width: "240px",
            paddingTop: "50px",
            paddingBottom: "50px",
            height: "80vh",
          }}
        >
          <svg width="238px" height="120px" viewBox="0 0 238 120">
            <title>Cart</title>
            <g
              id="Updated-Cart-|-Shipping-|-Payment-Page-Copy"
              stroke="none"
              strokeWidth="1"
              fill="none"
              fillRule="evenodd"
            >
              <g
                id="Empty-Cart"
                transform="translate(-549.000000, -178.000000)"
              >
                <g id="Group-9" transform="translate(462.000000, 178.000000)">
                  <g id="Group-7" transform="translate(88.000000, 0.000000)">
                    <g
                      id="shopping-cart-simple"
                      transform="translate(58.400000, 0.000000)"
                    >
                      <rect
                        id="Rectangle"
                        x="0"
                        y="0"
                        width="120"
                        height="120"
                      ></rect>
                      <circle
                        id="Oval"
                        stroke="#FFFFFF"
                        fillRule="nonzero"
                        cx="37.5"
                        cy="101.25"
                        r="7.5"
                      ></circle>
                      <circle
                        id="Oval"
                        stroke="#FFFFFF"
                        fillRule="nonzero"
                        cx="86.25"
                        cy="101.25"
                        r="7.5"
                      ></circle>
                      <path
                        d="M19.828125,33.75 L103.921875,33.75 L91.546875,77.0625 C90.6393075,80.2935554 87.6841669,82.5195055 84.328125,82.5001272 L39.421875,82.5001272 C36.0658331,82.5195055 33.1106925,80.2935554 32.203125,77.0625 L15.234375,17.71875 C14.7736501,16.1079783 13.3003656,14.9982315 11.625,14.9999979 L3.75,14.9999979"
                        id="Path"
                        stroke="#FFFFFF"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </g>
                    <line
                      x1="0.3125"
                      y1="109.0625"
                      x2="235.9375"
                      y2="109.0625"
                      id="Line"
                      stroke="#353535"
                      strokeLinecap="square"
                    ></line>
                    <line
                      x1="12.1875"
                      y1="45.3125"
                      x2="52.8125"
                      y2="45.3125"
                      id="Line-Copy"
                      stroke="#353535"
                      strokeLinecap="square"
                    ></line>
                    <line
                      x1="4.6875"
                      y1="60.3125"
                      x2="19.0625"
                      y2="60.3125"
                      id="Line-Copy-2"
                      stroke="#353535"
                      strokeLinecap="square"
                    ></line>
                    <line
                      x1="167.1875"
                      y1="54.0625"
                      x2="181.5625"
                      y2="54.0625"
                      id="Line-Copy-3"
                      stroke="#353535"
                      strokeLinecap="square"
                    ></line>
                    <line
                      x1="167.1875"
                      y1="64.0625"
                      x2="220.3125"
                      y2="64.0625"
                      id="Line-Copy-4"
                      stroke="#353535"
                      strokeLinecap="square"
                    ></line>
                  </g>
                </g>
              </g>
            </g>
          </svg>
          <p
            style={{
              color: "white",
              fontSize: "20px",
              textAlign: "center",
              paddingTop: "10px",
              fontWeight: "600",
            }}
          >
            Your Cart is Empty
          </p>
        </div>
      )}
    </div>
  );
}
const DIV = styled.div`
  padding: 50px 100px;
  #snot {
    display: none;
  }
  #cart {
    display: flex;
    gap: 3%;
  }
  h2 {
    color: white;
    font-size: 20px;
    padding-left: 10px;
  }
  #cartList {
    width: 65%;
    padding-bottom: 50px;
    display: flex;
    flex-direction: column;
    gap: 30px;
    overflow-y: scroll;
    height: 70vh;
    ::-webkit-scrollbar {
      width: 5px;
    }
    ::-webkit-scrollbar-track {
      background: #f1f1f1;
    }
    ::-webkit-scrollbar-thumb {
      background: #00e8be;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #00e8be;
    }
    padding-right: 20px;
  }
  #cartList > div {
    border-bottom: 1px solid #515151;
    padding: 30px 0px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    img {
      width: 15%;
      object-fit: contain;
    }
    > div {
      width: 60%;
      color: white;
      button {
        background: transparent;
        font-size: 12px;
        color: white;
        padding: 9px 15px;
        border: 1px solid white;
        border-radius: 10px;
        margin-right: 20px;
        margin-top: 30px;
        cursor: pointer;
      }
    }
  }
  #cartList > div > div:last-child {
    /* border: 1px solid red; */
    width: 20%;
    span {
      float: right;
      font-size: 24px;
      font-weight: 900;
    }
    > div {
      float: right;
      font-size: 14px;
    }
    strike,
    p {
      font-size: 12px;
      float: right;
      color: #9a9a9a;
    }
    h1 {
      font-size: 18px;
      float: right;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 5px;
      small {
        font-size: 12px;
        color: #12daa8;
        text-decoration: underline;
      }
    }
  }
  #cartPrice {
    border: 1px solid #515151;
    border-radius: 5px;
    width: 32%;
    height: fit-content;
    color: white;
    padding: 30px 20px;
    div {
      display: flex;
      justify-content: space-between;
      padding: 10px 0px;
    }
    p {
      font-size: 14px;
      font-weight: 530;
    }
    button {
      background-color: #12daa8;
      color: #103749;
      padding: 9px 15px;
      width: 100%;
      font-size: 12px;
      font-weight: bolder;
      border-radius: 5px;
      border: 0;
      margin-top: 20px;
      cursor: pointer;
    }
  }
  @media screen and (min-width: 866px) and (max-width: 1024px) /* Laptop */ {
    padding: 50px 50px 0 50px;
  }
  @media screen and (max-width: 865px) /* Tablet */ {
    padding: 50px 50px 0 50px;
    #cart {
      flex-direction: column;
    }
    #cartList {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 30px;
      overflow-y: hidden;
      height: max-content;
      margin-bottom: 50px;
    }
    #cartPrice {
      width: 50%;
      margin: auto;
      margin-bottom: 50px;
    }
  }
  @media screen and (max-width: 480px) /* Mobile */ {
    padding: 0;
    padding-top: 20px;
    #dos {
    }
    #cartList > div {
      border-bottom: 1px solid #515151;
      padding: 30px 0px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      img {
        width: 50%;
        object-fit: contain;
      }
      > div {
        width: 60%;
        color: white;
        h3 {
          font-size: 14px;
          margin: 0;
          text-overflow: ellipsis;
          overflow: hidden;
          display: -webkit-box !important;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          white-space: normal;
        }
        div:last-child {
          display: flex;
          justify-content: space-between;
          margin-top: 20px;
        }
        button {
          background: transparent;
          font-size: 10px;
          color: white;
          padding: 11px 10px;
          border: 1px solid white;
          border-radius: 10px;
          margin-right: 0px;
          margin-top: 0px;
          cursor: pointer;
        }
      }
    }
    #cartList > div > div:last-child {
      display: none;
    }
    #snot {
      display: initial;
      width: 20%;
      padding-top: 20px;
      hr {
        display: none;
      }
      span {
        font-size: 14px;
        font-weight: 900;
      }
      > div {
        font-size: 8px;
      }
      strike,
      p {
        font-size: 10px;
        color: #9a9a9a;
      }
      h1 {
        display: none;
      }
    }
    #cartPrice {
      width: 90%;
    }
  }
`;
