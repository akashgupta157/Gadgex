import React from "react";
import styled from "styled-components";

export default function PageNotFound() {
  return (
    <DIV>
      <img
        src="https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/f_auto,q_auto,d_Croma%20Assets:No_image.png/Croma%20Assets/UI%20Assets//error-404.svg/mxw_1440,f_auto"
        alt=""
      />
      <h1>404 Error page not found</h1>
    </DIV>
  );
}
const DIV = styled.div`
  min-height: 80vh;
  background-color: #181819;
  padding: 100px;
  img {
    margin: auto;
    display: block;
    width: 40%;
  }
  h1 {
    text-align: center;
    color: white;
  }
  @media screen and (max-width: 865px) /* Tablet */ {
    min-height: 60vh;
    img {
      margin: auto;
      display: block;
      width: 50%;
    }
    h1 {
      text-align: center;
      color: white;
    }
  }
  @media screen and (max-width: 480px) /* Mobile */ {
    min-height: 50vh;
    padding: 50px;
    img {
      margin: auto;
      display: block;
      width: 100%;
    }
    h1 {
      text-align: center;
      color: white;
      font-size: 20px;
    }
  }
`;
