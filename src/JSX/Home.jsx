import React, { useState } from "react";
export default function Home() {
  let items = [
    "https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1680200926/Croma%20Assets/CMS/LP%20Page%20Banners/2023/PAY%20DAY%20APRIL/HP%20Rotating%20Banners/HP_Income-ingPayDay_29March2023_gqvr3i.jpg/mxw_1440,f_auto",
    "https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1679905651/Croma%20Assets/CMS/LP%20Page%20Banners/2023/01_HP_BUGS_LP_BUGS/HP%20Bugs/HP_GGR_24March2023_3_zytl95.jpg/mxw_1440,f_auto",
    "https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1675867200/Croma%20Assets/CMS/LP%20Page%20Banners/2023/Get%20Summer%20Ready/HP%20Rotating/HP_SummerCampaign_8Feb2023_d6ejae.png/mxw_1440,f_auto",
    "https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1679399853/Croma%20Assets/CMS/LP%20Page%20Banners/2023/Travel%20Essentials/HP%20Rotating%20Banners/HP_TravelEssentials_21March2023_smgajn.png/mxw_1440,f_auto",
  ];
  return (
    <div style={{backgroundColor:"#121313"}}>
      <img src={items[0]} width="100%" alt="" />
      <img width="80%" style={{padding:"10px",margin:"auto",display:"block",borderRadius:"20px"}} src="https://media.croma.com/image/upload/v1680174661/Croma%20Assets/CMS/LP%20Page%20Banners/2023/More%20For%20Your%20Money/APRIL/Tue_AU_YES/LP_SingleSplit_Bank_TUE_30march2023_b7myka.png" alt="" />
    </div>
  );
}
