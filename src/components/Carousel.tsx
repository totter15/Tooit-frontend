import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/carousel.scss';

export default function SimpleSlider() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };
  return (
    <Slider {...settings}>
      <div className="carousel">
        <div className="TitleImage">
          <img alt="랜딩페이지" src="img\sampleImage1.png" />
        </div>
      </div>
      <div className="carousel">
        <div className="TitleImage">
          <img alt="랜딩페이지" src="img\sampleImage1.png" />
        </div>
      </div>
      <div className="carousel">
        <div className="TitleImage">
          <img alt="랜딩페이지" src="img\sampleImage1.png" />
        </div>
      </div>
      <div className="carousel">
        <div className="TitleImage">
          <img alt="랜딩페이지" src="img\sampleImage1.png" />
        </div>
      </div>
    </Slider>
  );
}
