import React from "react";
import "../CSS/Card.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useNavigate } from "react-router-dom";
export default function Card({ img, name, price, navigate }) {
  const nav = useNavigate();
  const to = (e) => {
    nav(`/product/${e}`, { state: e });
  };
  function partialValue(percentage, totalValue) {
    return totalValue - (percentage * totalValue) / 100;
  }
  return (
    <div id="dept" onClick={() => to(navigate)}>
      <FavoriteBorderIcon id="heart" />
      <img src={img} alt="" />
      <p>{name}</p>
      <div id="price">
        <small>
          ₹
          {(partialValue(20, price))}
          .00
        </small>
        <strike>
          ₹
          {(price)}
          .00
        </strike>
      </div>
    </div>
  );
}
