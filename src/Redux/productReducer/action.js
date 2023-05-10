import axios from "axios";

export const getProducts = (loc,counter) => (dispatch) => {
  dispatch({ type: "PRODUCT_REQUEST" });
  axios
    .get(`https://incandescent-nettle-pirate.glitch.me/products?category=${loc.state.end}&_page=${counter}`)
    .then((response) => {
      dispatch({ type: "PRODUCT_SUCCESS", payload: response.data });
    });
};
