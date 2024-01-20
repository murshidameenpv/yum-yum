import React, { useState } from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Cards from '../../components/Cards';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

function SpecialDishes() {
  const [recipes, setRecipes] = useState([])
  //mutable object
  const slider = React.useRef(null)
  // console.log(slider,"oooooooooooooooooo");
  React.useEffect(() => {
    fetch('/data/menu.json').then((res) => res.json()).then((data) => {
        const specials = data.filter((item)=>item.category==="popular")
      // console.log(specials);
      setRecipes(specials)
    })
  },[])
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],

  };
  return (
    <div className="section-container my-20 relative">
      <div className="text-left">
        <p className="subtitle">Special Dishes from our menu</p>
        <h2 className="title md:w-[520px]">Exceptional Dishes From Our Menu</h2>
      </div>
      {/* Arrow Buttons */}
      <div className='md:absolute right-3 top-8 mb-10 md:mr-24'>
        {/* using ref we can create slide buttons both slickPrev and slicKNext are the API from SLick */}
        <button className='btn p-2 rounded-full ml-5 bg-brown' onClick={() => slider?.current?.slickPrev()}>
          <FaAngleLeft className='w-7 h-7 p-1'/>
        </button>
        <button className='btn p-2 rounded-full ml-5 bg-brown' onClick={() => slider?.current?.slickNext()}>
          <FaAngleRight className='w-7 h-7 p-1'/>
        </button>
      </div>
      <Slider ref={slider} {...settings} className='overflow-hidden -mt-2 space-x-5'>
        {
          recipes.map((item, index) => (
            <Cards key={index} item={item} />
          ))
       }
      </Slider>
    </div>
  );
}

export default SpecialDishes