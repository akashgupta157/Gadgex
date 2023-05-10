const initialState = {
  isLoading: false,
  product: [],
};
export const productReducer = (state = initialState, {type,payload}) => {
  switch (type) {
    case "PRODUCT_REQUEST":
      return { ...state, isLoading: true };
    case "PRODUCT_SUCCESS":
      return { ...state, isLoading: false, product: payload };
    default:
      return state;
  }
};
