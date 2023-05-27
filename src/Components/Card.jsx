import React from "react";
import "../CSS/Card.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useNavigate } from "react-router-dom";
export default function Card({ img, name, price, navigate }) {
  const nav = useNavigate();
  const to = (e) => {
    nav(`/product/${e}`, { state: e });
  };
  return (
    <div id="dept" onClick={() => to(navigate)}>
      <FavoriteBorderIcon id="heart" />
      <img src={img} alt="" />
      <p>{name}</p>
      <div id="price">
        <small>
          ₹
          {new Intl.NumberFormat("en-IN", {
            maximumSignificantDigits: 3,
          }).format(
            Math.floor(
              price -
                ((Math.floor(Math.random() * (50 - 20)) + 20) / 100) * price
            )
          )}
          .00
        </small>
        <strike>
          ₹
          {new Intl.NumberFormat("en-IN", {
            maximumSignificantDigits: 3,
          }).format(price)}
          .00
        </strike>
      </div>
    </div>
  );
}
