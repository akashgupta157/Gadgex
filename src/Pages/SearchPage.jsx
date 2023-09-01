import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getProducts } from "../Redux/productReducer/action";
import { ThreeDots } from "react-loader-spinner";
import { Checkbox, FormControlLabel } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Sidebar from "../Components/Sidebar";
export default function SearchPage() {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const Nav = useNavigate();
  const obj = { params: { q: state } };
  useEffect(() => {
    dispatch(getProducts(obj));
  }, [state]);
  const data = useSelector((state) => state.productReducer);
  const toIndianCurrency = (num) => {
    const curr = num.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
    });
    return curr;
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
          <div id="whole">
            {/* <Sidebar /> */}
            {data.product.length === 0 ? (
              <>
                <h1>Product Not Found</h1>
              </>
            ) : (
              <>
                <div id="mainbody">
                  <div id="name">
                    <p>Results for "{state}"</p>
                    <small>{data.product.length} Products found</small>
                  </div>
                  <div>
                    {data.product?.map((e) => (
                      <div
                        key={e.id}
                        onClick={() => {
                          Nav(`/product/${state}/` + e.id);
                        }}
                        id="p"
                      >
                        <div id="pimg">
                          <img src={e.image[0]} alt="" />
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
                            label="Compare"
                          />
                        </div>
                        <div id="pmain">
                          <p id="ptitle">{e.title}</p>
                          <small id="pof">
                            {toIndianCurrency(e.offer_price)}
                          </small>
                          <span style={{ color: "white", fontSize: "12px" }}>
                            (Incl. all Taxes)
                          </span>
                          <div id="pprice">
                            <strike>MRP: {toIndianCurrency(e.price)}</strike>
                            <small>
                              (Save {toIndianCurrency(e.price - e.offer_price)})
                            </small>
                            <p>{e.discount}% Off</p>
                          </div>
                          <div id="bn">
                            <button>Buy Now</button>
                            <button>Add to Cart</button>
                          </div>
                        </div>
                        <FavoriteBorderIcon id="pheart" />
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
}
