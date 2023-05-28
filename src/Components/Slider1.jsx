import React, { Component } from "react";
import Slider from "react-slick";
import "../CSS/Slider1.css";
import { useNavigate } from "react-router-dom";
export const Slider1 = () => {
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 7,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 4,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
    ],
  };
  const nav = useNavigate();
  const to = (e) => {
    nav(`/product/${e}`, { state: e });
  };
  return (
    <div id="slider1">
      <Slider {...settings}>
        <div onClick={() => to("")}>
          <img
            src="https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1676968095/Croma%20Assets/CMS/LP%20Page%20Banners/2023/01_HP_BUGS_LP_BUGS/FEB/21-02-2023/Category%20Navigation%20-%20Audio%20Split/CategoryNavigation_AudioSplit_TopTrends_21Feb2023_et7h6t.png/mxw_1440,f_auto"
            alt=""
          />
        </div>
        <div onClick={() => to("Mobile")}>
          <img
            src="https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1676968095/Croma%20Assets/CMS/LP%20Page%20Banners/2023/01_HP_BUGS_LP_BUGS/FEB/21-02-2023/Category%20Navigation%20-%20Audio%20Split/CategoryNavigation_AudioSplit_Mobile_21Feb2023_y6hsfe.png/mxw_1440,f_auto"
            alt=""
          />
        </div>
        <div onClick={() => to("TV")}>
          <img
            src="https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1676968095/Croma%20Assets/CMS/LP%20Page%20Banners/2023/01_HP_BUGS_LP_BUGS/FEB/21-02-2023/Category%20Navigation%20-%20Audio%20Split/CategoryNavigation_AudioSplit_TV_21Feb2023_repyuk.png/mxw_1440,f_auto"
            alt=""
          />
        </div>
        <div onClick={() => to("Laptops")}>
          <img
            src="https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1650991659/Croma%20Assets/CMS/Homepage%20Banners/Category%20Navigation/Laptop_zp1dxi.png/mxw_1440,f_auto"
            alt=""
          />
        </div>
        <div onClick={() => to("Headphone")}>
          <img
            src="https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1676968094/Croma%20Assets/CMS/LP%20Page%20Banners/2023/01_HP_BUGS_LP_BUGS/FEB/21-02-2023/Category%20Navigation%20-%20Audio%20Split/CategoryNavigation_AudioSplit_H_E_21Feb2023_cw375r.png/mxw_1440,f_auto"
            alt=""
          />
        </div>
        <div onClick={() => to("")}>
          <img
            src="https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1676968095/Croma%20Assets/CMS/LP%20Page%20Banners/2023/01_HP_BUGS_LP_BUGS/FEB/21-02-2023/Category%20Navigation%20-%20Audio%20Split/CategoryNavigation_AudioSplit_S_M_21Feb2023_qllhag.png/mxw_1440,f_auto"
            alt=""
          />
        </div>
        <div onClick={() => to("")}>
          <img
            src="https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1676968094/Croma%20Assets/CMS/LP%20Page%20Banners/2023/01_HP_BUGS_LP_BUGS/FEB/21-02-2023/Category%20Navigation%20-%20Audio%20Split/CategoryNavigation_AudioSplit_HT_SB_21Feb2023_rk8ohd.png/mxw_1440,f_auto"
            alt=""
          />
        </div>
        <div onClick={() => to("AC")}>
          <img
            src="https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1676968094/Croma%20Assets/CMS/LP%20Page%20Banners/2023/01_HP_BUGS_LP_BUGS/FEB/21-02-2023/Category%20Navigation%20-%20Audio%20Split/CategoryNavigation_AudioSplit_AC_21Feb2023_azyacw.png/mxw_1440,f_auto"
            alt=""
          />
        </div>
        <div onClick={() => to("")}>
          <img
            src="https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1676968094/Croma%20Assets/CMS/LP%20Page%20Banners/2023/01_HP_BUGS_LP_BUGS/FEB/21-02-2023/Category%20Navigation%20-%20Audio%20Split/CategoryNavigation_AudioSplit_Ref_21Feb2023_ztynzt.png/mxw_1440,f_auto"
            alt=""
          />
        </div>
        <div onClick={() => to("Washing Machine")}>
          <img
            src="https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1650991658/Croma%20Assets/CMS/Homepage%20Banners/Category%20Navigation/WM_a9evzk.png/mxw_1440,f_auto"
            alt=""
          />
        </div>
        <div onClick={() => to("")}>
          <img
            src="https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1650991657/Croma%20Assets/CMS/Homepage%20Banners/Category%20Navigation/ka_v9m9zt.png/mxw_1440,f_auto"
            alt=""
          />
        </div>
        <div onClick={() => to("")}>
          <img
            src="https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1650991658/Croma%20Assets/CMS/Homepage%20Banners/Category%20Navigation/Grooming_olyszz.png/mxw_1440,f_auto"
            alt=""
          />
        </div>
        <div onClick={() => to("")}>
          <img
            src="https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1650991657/Croma%20Assets/CMS/Homepage%20Banners/Category%20Navigation/Tablets_t4ezyx.png/mxw_1440,f_auto"
            alt=""
          />
        </div>
        <div onClick={() => to("")}>
          <img
            src="https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1650991658/Croma%20Assets/CMS/Homepage%20Banners/Category%20Navigation/Wear_d0c5fu.png/mxw_1440,f_auto"
            alt=""
          />
        </div>
        <div onClick={() => to("")}>
          <img
            src="https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1650991658/Croma%20Assets/CMS/Homepage%20Banners/Category%20Navigation/camera_lk2wn3.png/mxw_1440,f_auto"
            alt=""
          />
        </div>
        <div onClick={() => to("")}>
          <img
            src="https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1680608144/Croma%20Assets/CMS/Homepage%20Banners/Category%20Navigation/CategoryNavigation_AudioSplit_Accessories_21Feb2023_mtqgol.png/mxw_1440,f_auto"
            alt=""
          />
        </div>
        <div onClick={() => to("")}>
          <img
            src="https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1650991658/Croma%20Assets/CMS/Homepage%20Banners/Category%20Navigation/gaming_phwbyi.png/mxw_1440,f_auto"
            alt=""
          />
        </div>
      </Slider>
    </div>
  );
};
