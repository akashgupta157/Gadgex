import { useEffect } from "react";
import Slider from "react-slick";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { getSProducts } from "../Redux/singleProductReducer/action";
import { ThreeDots } from "react-loader-spinner";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import StarIcon from "@mui/icons-material/Star";
export default function SingleProductPage() {
  const param = useParams();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.SProductReducer);
  useEffect(() => {
    dispatch(getSProducts(param));
  }, []);
  useEffect(() => {
    dispatch(getSProducts(param));
  }, [param]);
  console.log();
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
    speed: 500,
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
        <DIV>
          <div style={{ width: "45%", margin: "50px" }}>
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
          <div>
            <h1>{data.product.title}</h1>
            <p id="rate">
              {roundedNumber} <StarIcon style={{ fontSize: "14px" }} /> (
              {randomInt} Ratings & {randomInt1} Reviews)
            </p>
            <div id="SPprice">
              <div id="fly">
                <span>
                  {" "}
                  ₹
                  {new Intl.NumberFormat("en-IN", {
                    maximumSignificantDigits: 3,
                  }).format(data.product.offer_price)}
                  .00
                </span>
                <br />
                <span>(Incl. all Taxes)</span>
              </div>
              {data.product.offer_price > 5000 ? (
                <>
                  <div id="mud">
                    --
                    <div>OR</div>
                    --
                  </div>
                  <div id="muff">
                    <span>
                      ₹
                      {new Intl.NumberFormat("en-IN", {
                        maximumSignificantDigits: 3,
                      }).format(data.product.offer_price / 12)}
                      /mo*
                    </span>
                    <br />
                    <span>EMI Option</span>
                  </div>
                </>
              ) : null}
            </div>
            <div>
              <strike>
                MRP: ₹
                {new Intl.NumberFormat("en-IN", {
                  maximumSignificantDigits: 3,
                }).format(data.product.price)}
                .00
              </strike>
            </div>
          </div>
        </DIV>
      )}
    </>
  );
}
const DIV = styled.div`
  display: flex;
  background-color: #121212;
  width: 100%;
  height: 88vh;
  color: white;
  padding: 50px 80px 0 40px;
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
`;
