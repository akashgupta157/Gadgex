import { useEffect, useState } from "react";
import Slider from "react-slick";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { getSProducts } from "../Redux/singleProductReducer/action";
import { ThreeDots } from "react-loader-spinner";
import GppGoodOutlinedIcon from "@mui/icons-material/GppGoodOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import StarIcon from "@mui/icons-material/Star";
import { Divider } from "@mui/material";
import { toast } from "react-toastify";
import { login } from "../Redux/authReducer/action";
import axios from "axios";
export default function SingleProductPage() {
  const param = useParams();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.SProductReducer);
  const authData = useSelector((state) => state.authReducer);
  useEffect(() => {
    dispatch(getSProducts(param));
  }, []);
  useEffect(() => {
    dispatch(getSProducts(param));
  }, [param]);
  const settings = {
    customPaging: function (i) {
      return (
        <a>
          <img src={data.product.image[i]} id="downImage" />
        </a>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: false,
    nextArrow: false,
  };
  const randomNumber = Math.random() * (5 - 3) + 3;
  const roundedNumber = Math.round(randomNumber * 10) / 10;
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  const randomInt = getRandomInt(20, 100);
  const randomInt1 = getRandomInt(20, 100);
  const atc = async () => {
    if (authData.isAuthenticated) {
      let arr = [];
      await axios
        .get(
          `https://incandescent-nettle-pirate.glitch.me/profile/${authData.user.id}`
        )
        .then((res) => {
          arr = res.data.cart;
          arr.push(data.product);
        });
      axios
        .patch(
          `https://incandescent-nettle-pirate.glitch.me/profile/${authData.user.id}`,
          {
            cart: arr,
          }
        )
        .then((res) => {
          dispatch(login(res.data));
        });
      toast.success("Product Added to Cart", {
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
      toast.error("Please Login First", {
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
  };
  const settings1 = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <>
      {data.isLoading ? (
        <div
          style={{
            backgroundColor: "#121212",
            display: "flex",
            justifyContent: "center",
            height: "88vh",
            paddingTop: "30px",
          }}
        >
          <ThreeDots
            height="80"
            width="80"
            radius="10"
            color="#00e8be"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          />
        </div>
      ) : (
        <>
          <DIV>
            <div style={{ width: "45%", margin: "50px" }} id="div1">
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  marginLeft: "90%",
                  gap: "10px",
                }}
              >
                <FavoriteBorderIcon
                  sx={{
                    "&:hover": {
                      color: "#12daa8",
                      cursor: "pointer",
                    },
                  }}
                />
                <ShareOutlinedIcon
                  sx={{
                    "&:hover": {
                      color: "#12daa8",
                      cursor: "pointer",
                    },
                  }}
                />
              </div>
              <Slider {...settings}>
                {data.product.image?.map((e) => (
                  <div key={e}>
                    <img
                      src={e}
                      id="mainImage"
                      style={{ display: "block", margin: "auto" }}
                      alt=""
                    />
                  </div>
                ))}
              </Slider>
            </div>
            <div id="div2">
              <div
                style={{
                  display: "flex",
                  // width: "100%",
                  marginLeft: "80%",
                  gap: "10px",
                }}
              >
                <FavoriteBorderIcon
                  sx={{
                    "&:hover": {
                      color: "#12daa8",
                      cursor: "pointer",
                    },
                  }}
                />
                <ShareOutlinedIcon
                  sx={{
                    "&:hover": {
                      color: "#12daa8",
                      cursor: "pointer",
                    },
                  }}
                />
              </div>
              <Slider {...settings1}>
                {data.product.image?.map((e) => (
                  <div key={e} class="dropdown">
                    <img
                      src={e}
                      width={300}
                      style={{ display: "block", margin: "auto" }}
                      alt=""
                    />
                  </div>
                ))}
              </Slider>
            </div>
            <div id="description">
              <h1>{data.product.title}</h1>
              <p id="rate">
                {roundedNumber} <StarIcon style={{ fontSize: "14px" }} /> (
                {randomInt} Ratings & {randomInt1} Reviews)
              </p>
              <div id="SPprice">
                <div id="fly">
                  <span>
                    {" "}
                    ₹{(data.product.offer_price)}
                    .00
                  </span>
                  <br />
                  <span>(Incl. all Taxes)</span>
                </div>
                {data.product.offer_price > 5000 ? (
                  <>
                    <div id="mud">
                      —<div>OR</div>—
                    </div>
                    <div id="muff">
                      <span>
                        ₹
                        {(
                          Math.ceil(data.product.offer_price / 12)
                        )}
                        /mo*
                      </span>
                      <br />
                      <span>EMI Option</span>
                    </div>
                  </>
                ) : null}
              </div>
              <div id="gut">
                <strike>
                  MRP: ₹{(data.product.price)}
                  .00
                </strike>
                <span>
                  (Save ₹
                  {(
                    data.product.price - data.product.offer_price
                  )}{" "}
                  , {data.product.discount}% off)
                </span>
              </div>
              <div id="kf">
                <h3>Key Features</h3>
                <ul>
                  {data.product.kf?.map((e) => (
                    <li key={e}>{e}</li>
                  ))}
                </ul>
              </div>
              <div id="pact">
                <div>
                  <img
                    src="https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1662565586/Croma%20Assets/Categories/ServiceIcon/3_e3klv8.png/mxw_1440,f_auto"
                    alt=""
                  />
                  <p>12 Months Warranty</p>
                </div>
                <div>
                  <img
                    src="https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1662565576/Croma%20Assets/Categories/ServiceIcon/2_u2h2gl.png/mxw_1440,f_auto"
                    alt=""
                  />
                  <p>7 Days Easy Replace</p>
                </div>
              </div>
              <br />
              <hr />
              <br />
              <div id="try">
                <h2>
                  <h2>
                    <GppGoodOutlinedIcon />
                    ZipCare Protection Plan{" "}
                  </h2>
                  <p>Add extra protection to your products.</p>
                </h2>
                <br />
                <hr />
                <br />
                <h3>
                  Extended Warranty
                  <p>
                    Extended protection for your device beyond the manufacturer
                    warranty with coverage against all manufacturing defects.
                  </p>
                </h3>
                <br />
                <hr />
                <br />
                <h4>ZipCare - Extended Warranty</h4>
                <br />
                <div id="coop">
                  <div>
                    <p>1 year</p>
                    <p>₹ 2354</p>
                    <Divider
                      variant="middle"
                      sx={{ backgroundColor: "#606160", width: "100%" }}
                    />
                    <p>₹ 232/mo</p>
                  </div>
                  <div>
                    <p>2 year</p>
                    <p>₹ 4354</p>
                    <Divider
                      variant="middle"
                      sx={{ backgroundColor: "#606160", width: "100%" }}
                    />
                    <p>₹ 432/mo</p>
                  </div>
                  <div>None</div>
                </div>
              </div>
              <br />
              <br />
              <br />
              <br />
            </div>
          </DIV>
          <BTMBAR id="btmBar">
            <div id="sob">
              <div>
                {data.product.image ? (
                  <img src={data.product.image[0]} alt="" />
                ) : null}
                <h1>
                  {data.product.title}
                  <p>
                    ₹{(data.product.offer_price)}
                    .00
                  </p>
                </h1>
              </div>
              <div>
                <button onClick={atc}>Buy Now</button>
                <button onClick={atc}>Add to Cart</button>
              </div>
            </div>
          </BTMBAR>
        </>
      )}
    </>
  );
}
const BTMBAR = styled.div`
  height: 10vh;
  background-color: #121212;
  -webkit-box-shadow: 3px 6px 39px -18px rgba(255, 255, 255, 1);
  -moz-box-shadow: 3px 6px 39px -18px rgba(255, 255, 255, 1);
  box-shadow: 3px 6px 39px -18px rgba(255, 255, 255, 1);
  position: fixed;
  width: 100%;
  bottom: 0px;
  color: white;
  z-index: 100;
  padding-top: 10px;
  #sob {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-evenly;
  }
  div div {
    display: flex;
    align-items: center;
    img {
      width: 50px;
    }
    h1 {
      font-size: 14px;
    }
  }
  button {
    margin-right: 20px;
    padding: 10px;
    padding-left: 25px;
    padding-right: 25px;
    font-size: 16px;
    font-weight: 700;
    border: 1px solid white;
    border-radius: 5px;
    background-color: #353434;
    color: white;
    height: 40px;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  button:first-child {
    border: 0;
    background-color: #12daa8;
    color: #191919;
  }
  @media screen and (max-width: 1024px) /* Laptop */ {
    #sob {
      margin: auto;
      display: flex;
      align-items: center;
      width: 80%;
      justify-content: space-evenly;
    }
    h1 {
      width: 80%;
      margin: 0;
      text-overflow: ellipsis;
      overflow: hidden;
      display: -webkit-box !important;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      white-space: normal;
    }
    button {
      padding: 10px;
      font-size: 16px;
      font-weight: 700;
      width: 150px;
      display: flex;
      justify-content: center;
    }
    button:first-child {
      width: 100px;
    }
  }
  @media screen and (max-width: 480px) /* Mobile */ {
    padding: 0px;
    #sob {
      width: 100%;
      padding: 0;
    }
    #sob div:first-child {
      display: none;
    }
    #sob div:last-child {
      width: 100%;
    }
    button {
      padding: 0;
      margin-right: 0;
      width: 100%;
      height: 10vh;
      border: 0;
      border-radius: 0;
    }
    button:first-child {
      width: 100%;
    }
  }
`;
const DIV = styled.div`
  display: flex;
  background-color: #121212;
  width: 100%;
  height: 88vh;
  color: white;
  padding: 50px 80px 0 40px;
  #pact {
    display: flex;
    justify-content: space-around;
    padding-top: 20px;
    img {
      width: 30%;
      display: block;
      margin: auto;
    }
    p {
      padding-top: 10px;
      text-align: center;
      font-size: 14px;
      font-weight: bolder;
    }
  }
  #div2 {
    display: none;
  }
  #mainImage {
    width: 450px;
    padding-left: 120px;
  }
  .slick-thumb li {
    width: 99px;
    height: 100px;
    border: 0.1px solid #515151;
    border-radius: 5px;
  }
  .slick-thumb {
    bottom: -20px;
    left: 0px;
    overflow-y: scroll;
    width: min-content;
    height: 400px;
    padding: 20px;
    background-color: #121212;
    ::-webkit-scrollbar {
      width: 3px;
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
  }
  li.slick-active,
  .slick-thumb li:hover {
    border: 3px solid #13daa9;
    border-radius: 1px;
  }
  #downImage {
    margin: auto;
    display: block;
    width: 85px;
    height: 100px;
    object-fit: contain;
    transition: 0.2s ease-in;
  }
  #downImage:hover {
    width: 82px;
    height: 99px;
  }
  .slick-arrow {
    display: none !important;
  }
  h1 {
    font-size: 20px;
  }
  #rate {
    display: flex;
    align-items: center;
    padding-top: 5px;
    gap: 5px;
    font-size: 14px;
    color: #01e9be;
  }
  #SPprice {
    border-bottom: 1px solid #515151;
    padding-top: 15px;
    padding-bottom: 15px;
    display: flex;
    align-items: center;
    gap: 25px;
  }
  #fly :first-child {
    font-size: 26px;
    font-weight: 800;
  }
  #fly :last-child {
    font-size: 12px;
  }
  #mud {
    display: flex;
    align-items: center;
    div {
      font-size: 12px;
      border: 1px solid;
      padding: 5px;
      border-radius: 5px;
    }
  }
  #muff :first-child {
    font-size: 20px;
    font-weight: 800;
  }
  #muff :last-child {
    font-size: 12px;
    text-decoration: underline;
    color: #01e9be;
  }
  #gut {
    font-size: 14px;
    padding-top: 15px;
    padding-bottom: 15px;
    strike {
      color: #9a9a9a;
      margin-right: 10px;
    }
  }
  #kf {
    font-size: 14px;
    border: 1.5px solid #9a9a9a;
    border-radius: 5px;
    padding: 20px;
    ul {
      padding-top: 15px;
      padding-left: 15px;
    }
    li {
      padding: 5px;
    }
  }
  #try {
    h2 {
      display: flex;
      align-items: center;
      font-size: 16px;
      p {
        font-size: 12px;
        margin-left: 20px;
      }
    }
    h3 {
      font-size: 18px;
      p {
        font-size: 12px;
        margin-top: 10px;
      }
    }
  }
  #description {
    height: 100%;
    overflow-y: scroll;
    width: 100%;
    ::-webkit-scrollbar {
      width: 0px;
    }
  }
  #btmBar {
    height: 10vh;
    background-color: #191919;
    position: absolute;
    bottom: 0;
    width: 100%;
  }
  #coop {
    display: flex;
    gap: 20px;
    div {
      border: 1px solid #606160;
      padding: 10px;
      border-radius: 5px;
      width: 20%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 5px;
      cursor: pointer;
      :hover {
        border: 1px solid #01e9be;
      }
    }
  }
  @media screen and (max-width: 1024px) /* Laptop */ {
    padding: 50px 50px 0 0px;
    #div1 {
      display: none;
    }
    #div2 {
      display: initial;
      width: 45%;
    }
    li.slick-active,
    .slick-thumb li:hover {
      border: none;
      button::before {
        color: #00e8be;
        font-size: 10px;
      }
    }
    li {
      button::before {
        color: #9a9a9a;
        font-size: 10px;
      }
    }
  }
  @media screen and (max-width: 865px) /* Tablet */ {
    padding: 20px;
    flex-direction: column;
    height: max-content;
    #div2 {
      margin: auto;
      width: 100%;
    }
    #description {
      padding-top: 50px;
      overflow-y: hidden;
    }
  }
  @media screen and (max-width: 480px) /* Mobile */ {
    #fly :first-child {
      font-size: 22px;
    }
    #fly :last-child {
      font-size: 10px;
    }
    #muff :first-child {
      font-size: 16px;
    }
    #muff :last-child {
      font-size: 11px;
    }
    #gut {
      font-size: 12px;
      padding-top: 15px;
      padding-bottom: 15px;
      strike {
        color: #9a9a9a;
        margin-right: 10px;
      }
    }
    #coop div {
      width: 100%;
    }
    #try {
      h2 {
        flex-direction: column;
        align-items: flex-start;
      }
      h2 h2 {
        flex-direction: row;
      }
    }
    #SPprice {
      gap: 10px;
    }
  }
  @media screen and (max-width: 320px) /* Mobile */ {
    #SPprice {
      flex-direction: column;
      align-items: flex-start;
    }
  }
`;
