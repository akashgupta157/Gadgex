import axios from "axios";

export const getProducts = (obj) => (dispatch) => {
  console.log(obj)
  dispatch({ type: "PRODUCT_REQUEST" });
  axios
    .get(
      `https://incandescent-nettle-pirate.glitch.me/products`,
      obj
    )
    .then((response) => {
      dispatch({ type: "PRODUCT_SUCCESS", payload: response.data });

    });
};
