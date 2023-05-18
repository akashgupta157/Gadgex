import { Divider, IconButton, InputBase, Paper } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import React from "react";
import styled from "styled-components";

export default function Footer() {
  return (
    <FOOTER>
      <div>
        <h4>CONNECT WITH US</h4>
        <Paper
          id="search"
          component="form"
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <InputBase sx={{ ml: 3, flex: 1 }} placeholder="Enter Email ID" />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <ArrowForwardIcon />
          </IconButton>
        </Paper>
        <br />
        <div>
          <YouTubeIcon />
          <FacebookIcon />
          <InstagramIcon />
          <LinkedInIcon />
          <TwitterIcon />
        </div>
        <p>© Copyright 2023 Gadgex. All rights reserved</p>
      </div>
      <Divider
        orientation="vertical"
        sx={{ mx: 1, bgcolor: "white" }}
        flexItem
      />
      <div>
        <h4>USEFUL LINKS</h4>
        <div>
          <p>About Gadgex</p>
          <p>Help And Support</p>
          <p>FAQs</p>
          <p>Buying Guide</p>
          <p>Return Policy</p>
          <p>B2B Orders</p>
          <p>Store Locator</p>
          <p>E-Waste</p>
          <p>Franchise Opportunity</p>
          <p>Site Map</p>
          <p>Careers At Gadgex</p>
          <p>Terms Of Use</p>
          <p>Disclaimer</p>
          <p>Privacy Policy</p>
        </div>
      </div>
      <Divider
        orientation="vertical"
        sx={{ mx: 1, bgcolor: "white" }}
        flexItem
      />
      <div>
        <h4>PRODUCTS</h4>
        <div>
          <p>Televisions & Accessories</p>
          <p>Home Appliances</p>
          <p>Phones & Wearables</p>
          <p>Computers & Tablets</p>
          <p>Kitchen Appliances</p>
          <p>Audio & Video</p>
          <p>Health & Fitness</p>
          <p>Grooming & Personal Care</p>
          <p>Cameras & Accessories</p>
          <p>Smart Devices</p>
          <p>Gaming</p>
          <p>Accessories</p>
          <p>Top Brands</p>
        </div>
      </div>
      <div id="tabletDiv">
        <div>
          <h4>USEFUL LINKS</h4>
          <div>
            <p>About Gadgex</p>
            <p>Help And Support</p>
            <p>FAQs</p>
            <p>Buying Guide</p>
            <p>Return Policy</p>
            <p>B2B Orders</p>
            <p>Store Locator</p>
            <p>E-Waste</p>
            <p>Franchise Opportunity</p>
            <p>Site Map</p>
            <p>Careers At Gadgex</p>
            <p>Terms Of Use</p>
            <p>Disclaimer</p>
            <p>Privacy Policy</p>
          </div>
        </div>
        <Divider
          orientation="vertical"
          sx={{ mx: 1, bgcolor: "white" }}
          flexItem
        />
        <div>
          <h4>PRODUCTS</h4>
          <div>
            <p>Televisions & Accessories</p>
            <p>Home Appliances</p>
            <p>Phones & Wearables</p>
            <p>Computers & Tablets</p>
            <p>Kitchen Appliances</p>
            <p>Audio & Video</p>
            <p>Health & Fitness</p>
            <p>Grooming & Personal Care</p>
            <p>Cameras & Accessories</p>
            <p>Smart Devices</p>
            <p>Gaming</p>
            <p>Accessories</p>
            <p>Top Brands</p>
          </div>
        </div>
      </div>
    </FOOTER>
  );
}
const FOOTER = styled.footer`
  background-color: #1c1c1d;
  color: white;
  padding: 50px 100px;
  display: flex;
  justify-content: space-between;
  #tabletDiv {
    display: none;
  }
  > div:first-child {
    p {
      font-size: 14px;
      padding-top: 50%;
    }
    div {
      color: white;
      display: flex;
      align-items: center;
      justify-content: space-between;
      svg {
        font-size: 25px;
        cursor: pointer;
        :nth-child(1) {
          :hover {
            color: red;
          }
        }
        :nth-child(2) {
          :hover {
            color: #3b5998;
          }
        }
        :nth-child(3) {
          background-color: white;
          color: #1c1c1d;
          border-radius: 5px;
          :hover {
            color: white;
            background: linear-gradient(
              45deg,
              #f09433 0%,
              #e6683c 25%,
              #dc2743 50%,
              #cc2366 75%,
              #bc1888 100%
            );
          }
        }
        :nth-child(4) {
          :hover {
            color: #0077b5;
          }
        }
        :nth-child(5) {
          :hover {
            color: #00acee;
          }
        }
      }
    }
  }
  > div:nth-child(3),
  div:nth-child(5) {
    div {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      height: 100%;
      column-gap: 30px;
      p {
        font-weight: bolder;
        font-size: 14px;
        cursor: pointer;
        :hover {
          color: #01e8bf;
        }
      }
    }
  }
  @media screen and (max-width: 1024px) {
    display: flex;
    flex-direction: column;
    padding: 50px 70px;
    > div:first-child {
      form {
        margin: auto;
        width:100%;
      }
      h4 {
        text-align: center;
      }
      div {
        width: 100%;
        margin: auto;
      }
      width: 40%;
      margin: auto;
      p {
        display: none;
      }
    }
    > div:nth-child(3),
    div:nth-child(5) {
      display: none;
    }
    #tabletDiv {
      display: flex;
      margin: auto;
      padding-top: 10px;
      > div:nth-child(1),
      div:nth-child(3) {
        div {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          height: 100%;
          column-gap: 30px;
          p {
            font-weight: bolder;
            font-size: 14px;
            cursor: pointer;
            margin-top: 10px;
            :hover {
              color: #01e8bf;
            }
          }
        }
      }
    }
  }
  @media screen and (max-width: 480px) /* Mobile */ {
    padding: 30px 50px;
    #tabletDiv {
      display: none;
    }
    > div:first-child {
      width: 100%;
    }
    > div:nth-child(3),
    div:nth-child(5) {
      border-top: 1px solid white;
      display: initial;
      padding-top: 10px;
      margin-top: 10px;
      p{
        margin-top: 10px;
      }
    }
  }
`;
