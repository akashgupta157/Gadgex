import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getProducts } from "../Redux/productReducer/action";
export default function SearchPage() {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const obj = { q: state };
  let param
  useEffect(() => {
    dispatch(getProducts(param,obj));
  }, [state]);
  const data = useSelector((state) => state.productReducer);
  console.log(data)
  return <div>{state}</div>;
}
