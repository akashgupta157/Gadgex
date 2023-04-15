import React, { useRef } from "react";
import "../CSS/Card.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
export default function Card({ img, name, price }) {
  return (
    <div id="dept">
      <FavoriteBorderIcon id="heart" />
      <img src={img} alt="" />
      <p>{name}</p>
      <div id="price">
        <small>
          ₹
          {new Intl.NumberFormat("en-IN", {
            maximumSignificantDigits: 3,
          }).format(Math.floor(price - ((Math.floor(Math.random() * (50 - 20)) + 20) / 100) * price))}
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
