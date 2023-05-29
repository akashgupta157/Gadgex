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
  function numberWithCommas(x) {
    return x.toString().split(".")[0].length > 3
      ? x
          .toString()
          .substring(0, x.toString().split(".")[0].length - 3)
          .replace(/\B(?=(\d{2})+(?!\d))/g, ",") +
          "," +
          x.toString().substring(x.toString().split(".")[0].length - 3)
      : x.toString();
  }
  return (
    <div id="dept" onClick={() => to(navigate)}>
      <FavoriteBorderIcon id="heart" />
      <img src={img} alt="" />
      <p>{name}</p>
      <div id="price">
        <small>
          ₹
          {numberWithCommas(partialValue(20, price))}
          .00
        </small>
        <strike>
          ₹
          {numberWithCommas(price)}
          .00
        </strike>
      </div>
    </div>
  );
}
