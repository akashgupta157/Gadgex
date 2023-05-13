import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../CSS/Products.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Checkbox, FormControlLabel } from "@mui/material";
import { ThreeDots } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../Redux/productReducer/action";
export default function Products() {
  const Nav = useNavigate();
  const location = useLocation();
  const [counter, setcounter] = useState(1);
  const dispatch = useDispatch();
  const data = useSelector((store) => store.productReducer);
  useEffect(() => {
    dispatch(getProducts(location, counter));
  }, []);
  useEffect(() => {
    dispatch(getProducts(location, counter));
  }, [location, counter]);
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
        <div id="mainbody">
          <div id="name">
            <p>{location.state.end}</p>
            <small>{data.length * 32} Products found</small>
          </div>
          <div>
            {data.product?.map((e) => (
              <div
                key={e.id}
                onClick={() => {
                  Nav(`/product/${location.state.end}/` + e.id);
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
                    ₹
                    {new Intl.NumberFormat("en-IN", {
                      maximumSignificantDigits: 3,
                    }).format(e.offer_price)}
                    .00
                  </small>
                  <span style={{ color: "white", fontSize: "14px" }}>
                    (Incl. all Taxes)
                  </span>
                  <div id="pprice">
                    <strike>
                      MRP: ₹
                      {new Intl.NumberFormat("en-IN", {
                        maximumSignificantDigits: 3,
                      }).format(e.price)}
                      .00
                    </strike>
                    <small>(Save ₹{e.price - e.offer_price})</small>
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
          <div>
            <button
              onClick={(e) => {
                if (counter > 1) {
                  setcounter(counter - 1);
                }
              }}
            >
              Previous
            </button>
            <p>{counter}</p>
            <button onClick={(e) => setcounter(counter + 1)}>Next</button>
          </div>
        </div>
      )}
    </>
  );
}
