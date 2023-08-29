import React, { useEffect } from "react";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import "../CSS/Products.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Checkbox, FormControlLabel } from "@mui/material";
import { ThreeDots } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../Redux/productReducer/action";
import Sidebar from "../Components/Sidebar";
export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const Nav = useNavigate();
  const param = useParams();
  const dispatch = useDispatch();
  const { state, search } = useLocation();
  const data = useSelector((store) => store.productReducer);
  let obj = {
    params: {
      brand: searchParams.getAll("brand"),
      _sort: searchParams.get("order") && "offer_price",
      _order: searchParams.get("order"),
      offer_price_lte: searchParams.get("lte"),
      offer_price_gte: searchParams.get("gte"),
      discount_lte: searchParams.getAll("discount"),
      discount_gte: searchParams.getAll("discountGte"),
    },
  };
  useEffect(() => {
    dispatch(getProducts(param.category, obj));
  }, []);
  useEffect(() => {
    dispatch(getProducts(param.category, obj));
  }, [param.category, search]);
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
            <Sidebar />
            {data.product.length === 0 ? (
              <>
                <h1>Product Not Found</h1>
              </>
            ) : (
              <>
                <div id="mainbody">
                  <div id="name">
                    <p>
                      {param.category === "TV"
                        ? "Television"
                        : param.category === "AC"
                        ? "Air Conditioners"
                        : param.category}
                    </p>
                    <small>{data.product.length} Products found</small>
                  </div>
                  <div>
                    {data.product?.map((e) => (
                      <div
                        key={e.id}
                        onClick={() => {
                          Nav(`/product/${param.category}/` + e.id);
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
