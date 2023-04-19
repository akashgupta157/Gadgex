import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../CSS/Products.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Checkbox, FormControlLabel } from "@mui/material";
export default function Products() {
  const [data, setdata] = useState([]);
  const location = useLocation();
  const [isLoading, setisloading] = useState(true);
  useEffect(() => {
    fetch(
      `https://incandescent-nettle-pirate.glitch.me/products?category=${location.state.end}&_page=1&_limit=20`
    )
      .then((response) => response.json())
      .then((data) => setdata(data))
      .catch((err) => console.log(err));
    if (data.length > 1) {
      setisloading(false);
    }
  });
  return (
    <>
      {isLoading ? null : (
        <div id="mainbody">
          <div id="name">
            <p>{location.state.end}</p>
            <small>{data.length} Products found</small>
          </div>
          <div>
            {data?.map((e) => (
              <div key={e.id} id="p">
                <div id="pimg">
                  <img src={e.image} alt="" />
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
                </div>
                <FavoriteBorderIcon id="pheart" />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
