import React, { useEffect, useState } from "react";
import Slider1 from "./Slider1";
import SliderMain from "./SliderMain";
import "../CSS/Home.css";
import Card from "./Card";
import Slider from "react-slick";
export default function Home() {
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
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };
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
        <p>Summer Deals</p>
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
        <p>Computer Accessories</p>
        <Slider {...settings} className="sde">
          <Card
            img={
              "https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1681400643/Croma%20Assets/Computers%20Peripherals/Computer%20Accessories%20and%20Tablets%20Accessories/Images/251383_0_lgedkn.png/mxw_240,f_auto"
            }
            name={
              "Aristocrat AMP Polyester Laptop Backpack for 17 Inch Laptop "
            }
            price={1200}
          />
          <Card
            img={
              "https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1643281752/Croma%20Assets/Computers%20Peripherals/Printers%20and%20Scanners/Images/247631_dcaanb.png/mxw_240,f_auto"
            }
            name={
              "HP DeskJet 2729 Wireless Color All-in-One Inkjet Printer "
            }
            price={7000}
          />
          <Card
            img={
              "https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1681402952/Croma%20Assets/Computers%20Peripherals/Computer%20Accessories%20and%20Tablets%20Accessories/Images/252054_0_gknwwu.png/mxw_1440,f_auto"
            }
            name={
              "logitech M186 Wireless Optical Mouse (1000 DPI, Smooth Cursor Control, Black)"
            }
            price={1111}
          />
          <Card
            img={
              "https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1605181858/Croma%20Assets/Computers%20Peripherals/Storage%20Devices/Images/8985568739358.png/mxw_1440,f_auto"
            }
            name={
              "Sandisk Cruzer Blade 32GB USB 2.0 Flash Drive (SDCZ50-032G-B35 | Red/Black)"
            }
            price={650}
          />
          <Card
            img={
              "https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1643355591/Croma%20Assets/Computers%20Peripherals/Toners%20and%20Ink%20Cartridges/Images/247650_jmnek3.png/mxw_1440,f_auto"
            }
            name={
              "Canon Ink Cart GI-790 Ink Bottle (0671C003AF, Black)"
            }
            price={560}
          />
          {/* <Card
            img={
              ""
            }
            name={
              ""
            }
            price={}
          /> */}
        </Slider>
      </div>
      <br />
    </div>
  );
}
