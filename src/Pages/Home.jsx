import React, { useEffect, useState } from "react";
import { Slider1 } from "../Components/Slider1";
import SliderMain from "../Components/SliderMain";
import "../CSS/Home.css";
import Card from "../Components/Card";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
export default function Home() {
  const nav = useNavigate()
  const to = (e) => {
    nav(`/product/${e}`, { state: e });
  };
  const [no, setno] = useState(0);
  let items = [
    "https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1680200926/Croma%20Assets/CMS/LP%20Page%20Banners/2023/PAY%20DAY%20APRIL/HP%20Rotating%20Banners/HP_Income-ingPayDay_29March2023_gqvr3i.jpg/mxw_1440,f_auto",
    "https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1679905651/Croma%20Assets/CMS/LP%20Page%20Banners/2023/01_HP_BUGS_LP_BUGS/HP%20Bugs/HP_GGR_24March2023_3_zytl95.jpg/mxw_1440,f_auto",
    "https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1675867200/Croma%20Assets/CMS/LP%20Page%20Banners/2023/Get%20Summer%20Ready/HP%20Rotating/HP_SummerCampaign_8Feb2023_d6ejae.png/mxw_1440,f_auto",
    "https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1679399853/Croma%20Assets/CMS/LP%20Page%20Banners/2023/Travel%20Essentials/HP%20Rotating%20Banners/HP_TravelEssentials_21March2023_smgajn.png/mxw_1440,f_auto",
  ];
  useEffect(() => {
    var arr = [1, 2, 3, 0];
    var index = 0;
    const my = setInterval(function () {
      setno(arr[index++]);
      if (index == arr.length) index = 0;
    }, 5000);
    return () => clearInterval(my);
  }, []);
  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };
  const wm = [
    {
      img: "https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1670588880/Croma%20Assets/Large%20Appliances/Washers%20and%20Dryers/Images/242865_0_uhtb54.png/mxw_240,f_auto",
      name: "Bosch 9/6 kg 5 Star Inverter Fully Automatic Front Load Washer Dryer",
      price: 27990,
    },
    {
      img: "https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1670591143/Croma%20Assets/Large%20Appliances/Washers%20and%20Dryers/Images/248076_0_vyw5if.png/mxw_1440,f_auto",
      name: "Candy 6.5 kg 5 Star Fully Automatic Top Load Washing Machine ",
      price: 15000,
    },
    {
      img: "https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1676636530/Croma%20Assets/Large%20Appliances/Washers%20and%20Dryers/Images/269579_bnblfs.png/mxw_1440,f_auto",
      name: "SAMSUNG 8.5 kg 5 Star Semi Automatic Washing Machine with Air Turbo Drying System",
      price: 18900,
    },
    {
      img: "https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1669196469/Croma%20Assets/Large%20Appliances/Washers%20and%20Dryers/Images/261905_0_fo5rts.png/mxw_1440,f_auto",
      name: "Foxsky 7.2 Kg 5 Star Semi Automatic Washing Machine with 3D Scrub Technology ",
      price: 15000,
    },
    {
      img: "https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1664421002/Croma%20Assets/Large%20Appliances/Washers%20and%20Dryers/Images/257199_0_tx35xr.png/mxw_1440,f_auto",
      name: "Croma 6.5 kg 5 Star Semi Automatic Washing Machine with Spiral Pulsator ",
      price: 12000,
    },
    {
      img: "https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1670592775/Croma%20Assets/Large%20Appliances/Washers%20and%20Dryers/Images/235268_0_grgu8c.png/mxw_1440,f_auto",
      name: "LG 7.5 kg 5 Star Inverter Fully Automatic Top Load Washing Machine",
      price: 28990,
    },
  ];
  const ca = [
    {
      img: "https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1681400643/Croma%20Assets/Computers%20Peripherals/Computer%20Accessories%20and%20Tablets%20Accessories/Images/251383_0_lgedkn.png/mxw_240,f_auto",
      name: "Aristocrat AMP Polyester Laptop Backpack for 17 Inch Laptop ",
      price: 1200,
    },
    {
      img: "https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1643281752/Croma%20Assets/Computers%20Peripherals/Printers%20and%20Scanners/Images/247631_dcaanb.png/mxw_240,f_auto",
      name: "HP DeskJet 2729 Wireless Color All-in-One Inkjet Printer ",
      price: 7000,
    },
    {
      img: "https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1681402952/Croma%20Assets/Computers%20Peripherals/Computer%20Accessories%20and%20Tablets%20Accessories/Images/252054_0_gknwwu.png/mxw_1440,f_auto",
      name: "logitech M186 Wireless Optical Mouse (1000 DPI, Smooth Cursor Control, Black)",
      price: 1111,
    },
    {
      img: "https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1605181858/Croma%20Assets/Computers%20Peripherals/Storage%20Devices/Images/8985568739358.png/mxw_1440,f_auto",
      name: "Sandisk Cruzer Blade 32GB USB 2.0 Flash Drive (SDCZ50-032G-B35 | Red/Black)",
      price: 650,
    },
    {
      img: "https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1643355591/Croma%20Assets/Computers%20Peripherals/Toners%20and%20Ink%20Cartridges/Images/247650_jmnek3.png/mxw_1440,f_auto",
      name: "Canon Ink Cart GI-790 Ink Bottle (0671C003AF, Black)",
      price: 560,
    },
  ];
  const ac = [
    {
      img: "https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1681446457/Croma%20Assets/Large%20Appliances/Air%20Conditioner/Images/270260_0_oetbjg.png/mxw_240,f_auto",
      name: "Voltas Vectra 4 in 1 Convertible 1.3 Ton 3 Star Inverter Split AC with Anti Dust Filter",
      price: 60636,
    },
    {
      img: "https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1681476800/Croma%20Assets/Large%20Appliances/Air%20Conditioner/Images/265345_exryuv.png/mxw_240,f_auto",
      name: "Croma 4 in 1 Convertible 1 Ton 3 Star Inverter Split AC with Dust Filter ",
      price: 38000,
    },
    {
      img: "https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1677846838/Croma%20Assets/Large%20Appliances/Air%20Conditioner/Images/268607_0_hxb7si.png/mxw_240,f_auto",
      name: "LG 6 in 1 Convertible 1.5 Ton 5 Star Inverter Split AC with 4 Way Swing",
      price: 75990,
    },
    {
      img: "https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1667484378/Croma%20Assets/Large%20Appliances/Air%20Conditioner/Images/247080_ew2dbp.png/mxw_240,f_auto",
      name: "Croma 1 Ton 2 Star Split AC (Copper Condenser, Dust Filter, CRLASA0123T0231)",
      price: 35000,
    },
    {
      img: "https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1681447590/Croma%20Assets/Large%20Appliances/Air%20Conditioner/Images/267578_0_kuvf9j.png/mxw_1440,f_auto",
      name: "Daikin Standard Plus 1 Ton 3 Star Inverter Split AC (Copper Condenser, Dew Clean Technology, MTKL35U)",
      price: 48200,
    },
  ];
  const laptop = [
    {
      img: "https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1683561746/Croma%20Assets/Computers%20Peripherals/Laptop/Images/256496_0_h1fl4x.png/mxw_240,f_auto",
      name: "HP 15s-dr3506TU Intel Core i3 11th Gen (15.6 inch, 8GB, 1TB and 256GB, Windows 11 Home, Intel UHD, FHD Display, Natural Silver, 6N038PA#ACJ)",
      price: 54051,
    },
    {
      img: "https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1668663171/Croma%20Assets/Gaming/Laptop/Images/259276_0_b5fwix.png/mxw_1440,f_auto",
      name: "Lenovo IdeaPad Gaming 3 15ACH6 AMD Ryzen5 (15.6 inch, 8GB, 512GB, Windows 11 Home, MS Office 2021, NVIDIA GeForce GTX 1650 Graphics, Full HD IPS Display, Shadow Black, 82K201YCIN)",
      price: 100690,
    },
    {
      img: "https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1666277581/Croma%20Assets/Computers%20Peripherals/Tablets%20and%20iPads/Images/257191_14_swffs3.png/mxw_1440,f_auto",
      name: "HP Pavilion x360 14-dy0208TU Intel Core i3 11th Gen (14 inch, Touchscreen Convertible, 8GB, 512GB, Windows 11 Home, MS Office 2019, Intel UHD, IPS Display, Spruce Blue, 67G61PA#ACJ)",
      price: 69267,
    },
    {
      img: "https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1664420326/Croma%20Assets/Computers%20Peripherals/Laptop/Images/248020_0_e52lla.png/mxw_1440,f_auto",
      name: "HP 15s-eq2143AU AMD Ryzen 3 (15.6 inch, 8GB, 512GB, Windows 11, MS Office 2019, AMD Radeon Graphics, FHD IPS Display, Natural Silver, 50M62PA#ACJ)",
      price: 51740,
    },
    {
      img: "https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1662553848/Croma%20Assets/Computers%20Peripherals/Laptop/Images/261170_u7tfva.png/mxw_240,f_auto",
      name: "Acer Aspire 5 A515-57G Intel Core i5 12th Gen (15.6 inch, 16GB, 512GB, Windows 11, MS Office 2021, NVIDIA RTX 2050, FHD IPS Display, Steel Gray, UN.K9TSI.003)",
      price: 88999,
    },
  ];
  const tablet = [
    {
      img: "https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1667852849/Croma%20Assets/Computers%20Peripherals/Tablets%20and%20iPads/Images/260078_0_wmbjbi.png/mxw_240,f_auto",
      name: "realme PAD X Wi-Fi + 5G Android Tablet (10.95 Inch, 4GB RAM, 64GB ROM, Glowing Grey)",
      price: 39999,
    },
    {
      img: "https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1667854675/Croma%20Assets/Computers%20Peripherals/Tablets%20and%20iPads/Images/247592_0_hsftw6.png/mxw_240,f_auto",
      name: "SAMSUNG Galaxy Tab A8 Wi-Fi + 4G Android Tablet (10.5 Inch, 3GB RAM, 32GB ROM, Pink Gold)",
      price: 26399,
    },
    {
      img: "https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1667850943/Croma%20Assets/Computers%20Peripherals/Tablets%20and%20iPads/Images/249484_0_jyr8ll.png/mxw_240,f_auto",
      name: "Lenovo Tab K10 Wi-Fi Android Tablet (10.3 Inch, 4GB RAM, 64GB ROM, Abyss Blue)",
      price: 20000,
    },
    {
      img: "https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1684946516/Croma%20Assets/Computers%20Peripherals/Tablets%20and%20iPads/Images/264264_0_d4qi8d.png/mxw_240,f_auto",
      name: "Apple iPad 10th Generation Wi-Fi (10.9 Inch, 256GB, Silver, 2022 model)",
      price: 59951,
    },
    {
      img: "https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1667849844/Croma%20Assets/Computers%20Peripherals/Tablets%20and%20iPads/Images/260616_0_ru7sr2.png/mxw_240,f_auto",
      name: "WishTel IRA Duo+ Wi-Fi + 4G Android Tablet (10 Inch, 4GB RAM, 64GB ROM, Black)",
      price: 22000,
    },
    
  ];
  return (
    <div style={{ backgroundColor: "#121313" }}>
      <img
        id="mainbanner"
        src={items[no]}
        width="100%"
        style={{ paddingBottom: "10px" }}
        alt=""
      />
      <img
        width="85%"
        style={{ margin: "auto", display: "block", borderRadius: "5px" }}
        src="https://media.croma.com/image/upload/v1680174661/Croma%20Assets/CMS/LP%20Page%20Banners/2023/More%20For%20Your%20Money/APRIL/Tue_AU_YES/LP_SingleSplit_Bank_TUE_30march2023_b7myka.png"
        alt=""
      />
      <Slider1 />
      <div className="sdiv">
        <p>Highlights</p>
        <SliderMain
          img={[
            "https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1672771547/Croma%20Assets/CMS/LP%20Page%20Banners/2022/Creators%20Studio/Update/HP_Highlights_Creatorstudio_28Dec2022_khzbgr.png/mxw_1440,f_auto",
            "https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1660409634/Croma%20Assets/CMS/Homepage%20Banners/Independence%20Day%20August%202022/Post_INDEPENDENT%20DAY_REVAMP/Highlights/HP_Highlights_522x331_VideoCall_7April2022_sk2gwe.png/mxw_1440,f_auto",
            "https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1663158067/Croma%20Assets/CMS/Homepage%20Banners/Highlights1/HP_highlight_unboxed_of6edn.png/mxw_1440,f_auto",
            "https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1676545803/Croma%20Assets/CMS/LP%20Page%20Banners/2023/Deals%20Corner/Highlights/HP_Highlights_DealsCorner_15Feb2023_b40laq.png/mxw_1440,f_auto",
            "https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1680091448/Croma%20Assets/CMS/Homepage%20Banners/New%20at%20croma/HP_Highlights_GiftCard_29March2023_tsoygr.jpg/mxw_1440,f_auto",
            "https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1677495035/Croma%20Assets/CMS/LP%20Page%20Banners/2023/EMI%20store/Highlights/HP_Highlights_EMIStore_22Feb2023_asnxoe.png/mxw_1440,f_auto",
          ]}
          width="95%"
          height=""
          no="3"
        />
      </div>
      <div className="sdiv" id="new">
        <p>New at Gadgex</p>
        <SliderMain
          img={[
            "https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1680505773/Croma%20Assets/CMS/Homepage%20Banners/01_Homepage%20Bugs%20Daily/03-04-2023/HP_4Split_NewAtCroma_cromaAC_3april2023_gemfzv.png/mxw_480,f_auto",
            "https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1679898323/Croma%20Assets/CMS/Homepage%20Banners/CROMA%20SERIES/HP_4Split_NewAtCroma_fireboltt_25march2023_im3aea.png/mxw_480,f_auto",
            "https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1680195003/Croma%20Assets/CMS/LP%20Page%20Banners/2023/01_HP_BUGS_LP_BUGS/MARCH/30-03-2023/WATCH/HP_4Split_NewAtCroma_FastrackSW_29March2023_vnzxjc.png/mxw_1440,f_auto",
            "https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1679988434/Croma%20Assets/CMS/Homepage%20Banners/New%20at%20croma/HP_4Split_NewAtCroma_Stabilizers_23march2023_bcocgs.png/mxw_480,f_auto",
            "https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1679638429/Croma%20Assets/CMS/LP%20Page%20Banners/2023/01_HP_BUGS_LP_BUGS/MARCH/24-03-2023/HP_4Split_NewAtCroma_1_haeir_24march2023_dynrft.png/mxw_480,f_auto",
            "https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1679638430/Croma%20Assets/CMS/LP%20Page%20Banners/2023/01_HP_BUGS_LP_BUGS/MARCH/24-03-2023/HP_4Split_NewAtCroma_SansuiTV_24march2023_uo8cvf.png/mxw_1440,f_auto",
            "https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1676975724/Croma%20Assets/CMS/Homepage%20Banners/New%20at%20croma/HP_4Split_NewAtCroma_oppo_21feb2023_qayy79.png/mxw_480,f_auto",
            "https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1679638429/Croma%20Assets/CMS/LP%20Page%20Banners/2023/01_HP_BUGS_LP_BUGS/MARCH/24-03-2023/HP_4Split_NewAtCroma_1_haeir_24march2023_dynrft.png/mxw_480,f_auto",
          ]}
          width="95%"
          no="4"
          height="330px"
        />
      </div>
      <div className="sdiv">
        <p>Best Deals</p>
        <div className="sd">
          <img
            src="https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1681485074/Croma%20Assets/CMS/LP%20Page%20Banners/2023/01_HP_BUGS_LP_BUGS/HP%20Bugs/HP_4Split_AC_14April2023_z8e4gh.png/mxw_1440,f_auto"
            alt=""
          />
          <img
            src="https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1681300873/Croma%20Assets/CMS/Bugs/HP_4Split_AC_CromaACs_12April2023-_1_fxl06s.png/mxw_1440,f_auto"
            alt=""
          />
          <img
            src="https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1681307579/Croma%20Assets/CMS/Bugs/01012023/HP_4Split_AC_12April2023_p4bk17.png/mxw_1440,f_auto"
            alt=""
          />
          <img
            src="https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1680672446/Croma%20Assets/CMS/Homepage%20Banners/01_Homepage%20Bugs%20Daily/HP_4Split_AC_HD_5April2023_keuehi.png/mxw_1440,f_auto"
            alt=""
          />
          <img
            src="https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1679638659/Croma%20Assets/CMS/LP%20Page%20Banners/2023/01_HP_BUGS_LP_BUGS/MARCH/24-03-2023/HP_4Split_ref_singledoor_24March2023_f0ow2z.png/mxw_1440,f_auto"
            alt=""
          />
          <img
            src="https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1679979045/Croma%20Assets/CMS/LP%20Page%20Banners/2023/01_HP_BUGS_LP_BUGS/HP%20Bugs/HP_4Split_ref_DD_28March2023_f1iqge.png/mxw_1440,f_auto"
            alt=""
          />
          <img
            src="https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1677855457/Croma%20Assets/CMS/LP%20Page%20Banners/2023/01_HP_BUGS_LP_BUGS/MARCH/03-03-2023/SUMMER%20DEALS/HP_4Split_ref_SbyS_03March2023_sv0gob.png/mxw_1440,f_auto"
            alt=""
          />
          <img
            src="https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1680505772/Croma%20Assets/CMS/Homepage%20Banners/01_Homepage%20Bugs%20Daily/03-04-2023/HP_4Split_ref_candy_3april2023_kw4smd.png/mxw_1440,f_auto"
            alt=""
          />
        </div>
      </div>
      <div className="sdiv">
        <p>Laptops</p>
        <Slider {...settings} className="sde">
          {laptop.map((e) => (
            <Card
              key={e}
              img={e.img}
              name={e.name}
              price={e.price}
              navigate={"Laptops"}
            />
          ))}
        </Slider>
      </div>
      <div className="sdiv">
        <p>Air Conditioners</p>
        <Slider {...settings} className="sde">
          {ac.map((e) => (
            <Card
              key={e}
              img={e.img}
              name={e.name}
              price={e.price}
              navigate={"AC"}
            />
          ))}
        </Slider>
      </div>
      <div className="sdiv">
        <p>Computer Peripheral Store</p>
        <div className="sd">
          <img
            src="https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1683731740/Croma%20Assets/CMS/Homepage%20Banners/Updated%20Banners%20-%2010th%20May/Computer%20Peripheral%20Store/HP_4Split_CPS_printers_9may2023_fmymcm.png/mxw_1440,f_auto"
            alt=""
          />
          <img
            src="https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1684393476/Croma%20Assets/CMS/Homepage%20Banners/01_Homepage%20Bugs%20Daily/May2023/18-05-2023/HP_4Split_CPS_monitors_18may2023_ij648a.png/mxw_1440,f_auto"
            alt=""
          />
          <img
            src="https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1683731740/Croma%20Assets/CMS/Homepage%20Banners/Updated%20Banners%20-%2010th%20May/Computer%20Peripheral%20Store/HP_4Split_CPS_M_K_9may2023_de3lmk.png/mxw_1440,f_auto"
            alt=""
          />
          <img
            src="https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1685425042/Croma%20Assets/CMS/Homepage%20Banners/01_Homepage%20Bugs%20Daily/May2023/30-05-2023/HP_4Split_CPS_LB_30may2023_lxrirm.png/mxw_1440,f_auto"
            alt=""
          />
        </div>
      </div>
      <div className="sdiv">
        <p>Washing Machines</p>
        <Slider {...settings} className="sde">
          {wm.map((e) => (
            <Card
              key={e}
              img={e.img}
              name={e.name}
              price={e.price}
              navigate={"Washing Machine"}
            />
          ))}
        </Slider>
      </div>
      <div className="sdiv">
        <p>Computer Accessories</p>
        <Slider {...settings} className="sde">
          {ca.map((e) => (
            <Card key={e} img={e.img} name={e.name} price={e.price} />
          ))}
        </Slider>
      </div>
      <div className="sdiv">
        <p>Kitchen Appliances</p>
        <div className="sd">
          <img
            src="https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1683731302/Croma%20Assets/CMS/Homepage%20Banners/Updated%20Banners%20-%2010th%20May/KA/HP_4Split_KA_MW_9may2023_zfdqq2.png/mxw_1440,f_auto"
            alt=""
          />
          <img
            src="https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1685166637/Croma%20Assets/CMS/Homepage%20Banners/01_Homepage%20Bugs%20Daily/May2023/27-05-2023/HP_4Split_KA_mixer_27may2023_mmynid.png/mxw_1440,f_auto"
            alt=""
          />
          <img
            src="https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1685082123/Croma%20Assets/CMS/Homepage%20Banners/01_Homepage%20Bugs%20Daily/May2023/26-05-2023/HP_4Split_KA_chimney_26may2023_rk7dvs.png/mxw_1440,f_auto"
            alt=""
          />
          <img
            src="https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1684393476/Croma%20Assets/CMS/Homepage%20Banners/01_Homepage%20Bugs%20Daily/May2023/18-05-2023/HP_4Split_KA_coffeemaker_18may2023_j0wdp1.png/mxw_1440,f_auto"
            alt=""
          />
        </div>
      </div>
      <br /><br />
      <h2 style={{ textAlign: "center", color: "white" }}>
        Shop Safely with Gadgex
      </h2>
      <div id="foal">
        <div>
          <img
            src="https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1637912096/Croma%20Assets/CMS/Shop%20Safely/Shop_with_Video_ioiaui.svg/mxw_1440,f_auto"
            alt=""
          />
          <div>
            <p>Store at Home</p>
            <span>START A VIDEO CALL</span>
          </div>
        </div>
        <div>
          <img
            src="https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1637912096/Croma%20Assets/CMS/Shop%20Safely/Zip_Delivery_l6o2gk.svg/mxw_1440,f_auto"
            alt=""
          />
          <div>
            <p>Express Delivery</p>
            <span>ENTER PINCODE</span>
          </div>
        </div>
        <div>
          <img
            src="https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1637912096/Croma%20Assets/CMS/Shop%20Safely/Connect_to_store_unfw5f.svg/mxw_1440,f_auto"
            alt=""
          />
          <div>
            <p>Connect to Store</p>
            <span>REGISTER NOW</span>
          </div>
        </div>
      </div>
      <div className="sdiv">
        <p>Tablets</p>
        <Slider {...settings} className="sde">
          {tablet.map((e) => (
            <Card key={e} img={e.img} name={e.name} price={e.price} navigate={"Tablet"}/>
          ))}
        </Slider>
      </div>
      <br /><br />
    </div>
  );
}
