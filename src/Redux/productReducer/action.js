import axios from "axios";

export const getProducts = (param, obj) => (dispatch) => {
  dispatch({ type: "PRODUCT_REQUEST" });
  axios
    .get(
      `https://incandescent-nettle-pirate.glitch.me/products?category=${param}`,
      obj
    )
    .then((response) => {
      dispatch({ type: "PRODUCT_SUCCESS", payload: response.data });

    });
};
