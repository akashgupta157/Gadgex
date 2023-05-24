import { effect } from "@chakra-ui/react";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  MenuItem,
  Select,
} from "@mui/material";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import ImportExportOutlinedIcon from '@mui/icons-material/ImportExportOutlined';
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import styled from "styled-components";
export default function Sidebar() {
  const param = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialBrand = searchParams.getAll("brand");
  const initialOrder = searchParams.getAll("order");
  const [order, setOrder] = useState(initialOrder || "");
  const [brand, setBrand] = useState(initialBrand || []);
  const [data, setData] = useState();
  const handleChangeSort = (event) => {
    setOrder(event.target.value);
  };
  const handleChangeBrand = (event) => {
    const { value } = event.target;
    let newBrand = [...brand];
    if (newBrand.includes(value)) {
      newBrand = newBrand.filter((e) => e !== value);
    } else {
      newBrand.push(value);
    }
    setBrand(newBrand);
  };
  useEffect(() => {
    let params = {
      brand,
    };
    order && (params.order = order);
    setSearchParams(params);
  }, [brand, order]);
  const brandArr = [];
  useEffect(() => {
    axios
      .get(
        `https://incandescent-nettle-pirate.glitch.me/products?category=${param.category}`
      )
      .then((res) => setData(res.data));
  }, [brand, param]);
  data?.map((e) => {
    brandArr.push(e.brand.trim());
  });
  let uniqueBrand = [...new Set(brandArr)];
  return (
    <>
      <DIV>
        <h4>SORT BY</h4>
        <select
          value={order}
          onChange={handleChangeSort}
          style={{
            border: "1px solid white",
            marginTop: "5px",
            width: "200px",
            color: "white",
            backgroundColor: "transparent",
          }}
        >
          <option value="" defaultChecked={order === ""}>
            FEATURED
          </option>
          <option value="desc" defaultChecked={order === "desc"}>
            PRICE (HIGHEST FIRST)
          </option>
          <option value="asc" defaultChecked={order === "asc"}>
            PRICE (LOWEST FIRST)
          </option>
          {/* <option value="desc">DISCOUNT (DESCENDING)</option> */}
        </select>
        <h4>BRAND</h4>
        <div id="brand">
          {uniqueBrand?.map((e) => (
            <FormControlLabel
              key={e}
              control={
                <Checkbox
                  sx={{
                    color: "grey",
                    width: "40px",
                    "&.Mui-checked": { color: "#00e8be" },
                  }}
                />
              }
              value={e}
              onChange={handleChangeBrand}
              label={e}
              checked={brand.includes(e)}
            />
          ))}
        </div>
      </DIV>
      <DIV2>
        <button>
          <ImportExportOutlinedIcon/>
          SORT</button>
        <button>
          <FilterAltOutlinedIcon />
          FILTER
        </button>
      </DIV2>
    </>
  );
}
const DIV2 = styled.div`
  display: none;
  @media screen and (max-width: 865px) /* Tablet */ {
    display: flex;
    position: fixed;
    width: 100%;
    bottom: 0;
    width: 100%;
    left: 0;
    button {
      width: 50%;
      background-color: #343435;
      font-size: 20px;
    }
  }
  @media screen and (max-width: 480px) /* Mobile */ {
  }
`;
const DIV = styled.div`
  width: 25%;
  color: white;
  padding-bottom: 50px;
  border-right: 1px solid gray;
  #brand {
    display: flex;
    flex-direction: column;
  }
  h4 {
    padding-top: 20px;
  }
  select {
    font-size: 14px;
    font-weight: bold;
    padding: 15px 10px;
    border-radius: 10px;
    outline: none;
    option:checked,
    option:hover {
      color: #00e8be;
      background-color: #121212;
    }
    option {
      color: white;
      font-size: 16px;
      font-weight: bold;
      background: #121212;
    }
  }
  @media screen and (min-width: 866px) and (max-width: 1024px) /* Laptop */ {
    width: 30%;
  }
  @media screen and (max-width: 865px) /* Tablet */ {
    display: none;
  }
  @media screen and (max-width: 480px) /* Mobile */ {
  }
`;
