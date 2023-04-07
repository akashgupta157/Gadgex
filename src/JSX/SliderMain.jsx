import React from "react";
import Slider from "react-slick";
export default function SliderMain(props) {
  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: +props.no,
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
    <div id="slider2">
      <Slider  {...settings}>
        {props.img?.map((e) => (
          <div key={e}>
            <img src={e} width={props.width} height={props.height} style={{borderRadius:"10px",margin:"auto",display:"block"}} alt="" />
          </div>
        ))}
      </Slider>
    </div>
  );
}
