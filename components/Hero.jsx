'use client'
import React, { useEffect, useState } from 'react'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HeroSlide from './HeroSlide';

export default function Hero() {
  
  var settings = {
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <Slider {...settings}>
     <HeroSlide wi='w-[500px] max-sm:w-[300px]' animate='animate-pulse' img='bitcoinimg.png' action='Start Earning' title='Bitcoin currency, easy way to trade' desc='Start earning with our stable goal-oriented investment program'/>
     <HeroSlide wi='w-[500px] max-sm:w-[300px]' animate='animate-bounce' img='rocket.png' action='Get Started' title='Invest, to grow your money' desc='The 4Elevenfxtrade is the most reliable and secure platform that makes trading, invseting and mining of crypto currency easy and safe.. and it supports variety of most popular digital currencies'/>
     <HeroSlide wi='w-[100px]' animate='animate-ping' img='thumbsup.png'  action='Invest Now' title='Bitcoin invest, easy and secure way' desc='Dont waste anymuch time after seeing this oppurtunity, start earning now'/>
    </Slider>
  )
}
