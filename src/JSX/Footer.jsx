import React from "react";
import "../CSS/Footer.css";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import IconButton from "@mui/material/IconButton";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Divider } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
export default function Footer() {
  return (
    <>
    <div id="que">
      <div id="ill">
        <div id="dept">
          <p>CONNECT WITH US</p>
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 300,
            }}
          >
            <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Enter Email ID" />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <ArrowForwardIcon />
            </IconButton>
          </Paper>
        </div>
        <div id="icon">
          <YouTubeIcon id="yt" />
          <FacebookIcon id="fb" />
          <InstagramIcon id="ig" />
          <LinkedInIcon id="li" />
          <TwitterIcon id="ti" />
        </div>
        <span>© Copyright 2023 Gadgex. All rights reserved</span>
      </div>
      <Divider
      id="d1"
        orientation="vertical"
        sx={{ border: "1px solid white" }}
        flexItem
      />
      <div id="rib">
      <div>
        <p>USEUL LINKS</p>
        <div className="que1">
          <div>
            <span>About Gadgex</span>
            <span>Help And Support</span>
            <span>FAQs</span>
            <span>Buying Guide</span>
            <span>Return Policy</span>
            <span>B2B Orders</span>
            <span>Store Locator</span>
            <span>E-Waste</span>
          </div>
          <div>
            <span>Franchise Opportunity</span>
            <span>Site Map</span>
            <span>Careers At Croma</span>
            <span>Terms Of Use</span>
            <span>Disclaimer</span>
            <span>Privacy Policy</span>
            <span>Unboxed</span>
          </div>
        </div>
      </div>
      <Divider
        orientation="vertical"
        sx={{ border: "1px solid white" }}
        flexItem
      />
      <div>
        <p>PRODUCTS</p>
        <div className="que1">
          <div>
            <span>Televisions & Accessories</span>
            <span>Home Appliances</span>
            <span>Phones & Wearables</span>
            <span>Computers & Tablets</span>
            <span>Kitchen Appliances</span>
            <span>Audio & Video</span>
            <span>Health & Fitness</span>
          </div>
          <div>
            <span>Grooming & Personal Care</span>
            <span>Cameras & Accessories</span>
            <span>Smart Devices</span>
            <span>Gaming</span>
            <span>Accessories</span>
            <span>Top Brands</span>
          </div>
        </div>
      </div>
      </div>
      <p id="copy">© Copyright 2023 Gadgex. All rights reserved</p>

    </div>
    
      <div id="foot">
        <div id="con">
          <div>
            <p>CONNECT WITH US</p>
            <Paper
              component="form"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Enter Email ID" />
              <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                <ArrowForwardIcon />
              </IconButton>
            </Paper>
          </div>
          <div id="icon">
            <YouTubeIcon id="yt" />
            <FacebookIcon id="fb" />
            <InstagramIcon id="ig" />
            <LinkedInIcon id="li" />
            <TwitterIcon id="ti" />
          </div>
        </div>
        <Divider
          orientation="vertical"
          sx={{ border: "1px solid white", margin: "5px" }}
          flexItem
        />
        <div>
          <Accordion
            sx={{
              bgcolor: "transparent",
              border: "0",
              borderBottom: "2px solid white",
            }}
          >
            <AccordionSummary
              sx={{ color: "white" }}
              expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography
                sx={{ fontWeight: "800", fontSize: "15px", textAlign: "left" }}
              >
                USEUL LINKS
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <div className="que1">
                  <div>
                    <span>About Gadgex</span>
                    <span>Help And Support</span>
                    <span>FAQs</span>
                    <span>Buying Guide</span>
                    <span>Return Policy</span>
                    <span>B2B Orders</span>
                    <span>Store Locator</span>
                    <span>E-Waste</span>
                  </div>
                  <div>
                    <span>Franchise Opportunity</span>
                    <span>Site Map</span>
                    <span>Careers At Gadgex</span>
                    <span>Terms Of Use</span>
                    <span>Disclaimer</span>
                    <span>Privacy Policy</span>
                    <span>Unboxed</span>
                  </div>
                </div>
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            sx={{
              bgcolor: "transparent",
              border: "0",
              borderBottom: "2px solid white",
            }}
          >
            <AccordionSummary
              sx={{ color: "white" }}
              expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography
                sx={{ fontWeight: "800", fontSize: "15px", textAlign: "left" }}
              >
                PRODUCTS
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <div className="que1">
                  <div>
                    <span>Televisions & Accessories</span>
                    <span>Home Appliances</span>
                    <span>Phones & Wearables</span>
                    <span>Computers & Tablets</span>
                    <span>Kitchen Appliances</span>
                    <span>Audio & Video</span>
                    <span>Health & Fitness</span>
                  </div>
                  <div>
                    <span>Grooming & Personal Care</span>
                    <span>Cameras & Accessories</span>
                    <span>Smart Devices</span>
                    <span>Gaming</span>
                    <span>Accessories</span>
                    <span>Top Brands</span>
                  </div>
                </div>
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
        <p id="copy">© Copyright 2023 Gadgex. All rights reserved</p>
      </div>
    </>
  );
}
