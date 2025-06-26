import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderData: null,
};
const razorpaySlice = createSlice({
  name: "razorpay",
  initialState,
  reducers: {
    setOrderData: (state, action) => {
      state.orderData = action.payload;
    },
    clearOrderData: (state) => {
      state.orderData = null;
    },
  },
});
export const { setOrderData, clearOrderData } = razorpaySlice.actions;
export default razorpaySlice.reducer;