import axios from "axios";

export const getSProducts = (id) => (dispatch) => {
  dispatch({ type: "S_PRODUCT_REQUEST" });
  axios
    .get(`https://incandescent-nettle-pirate.glitch.me/products/${id.id}`)
    .then((response) => {
      dispatch({ type: "S_PRODUCT_SUCCESS", payload: response.data });
    });
};
