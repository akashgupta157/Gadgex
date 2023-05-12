const initialState = {
    isLoading: false,
    product: [],
  };
  export const SProductReducer = (state = initialState, {type,payload}) => {
    switch (type) {
      case "S_PRODUCT_REQUEST":
        return { ...state, isLoading: true };
      case "S_PRODUCT_SUCCESS":
        return { ...state, isLoading: false, product: payload };
      default:
        return state;
    }
  };
  