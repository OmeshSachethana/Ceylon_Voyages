import React from 'react'

import Slider from 'react-animated-slider'
import 'react-animated-slider/build/horizontal.css'
import 'normalize.css/normalize.css'
import './slider-animations.css'
import './styles.css'

const content = [
  {
    title: 'Sri Lankan Cultural Tours',
    description: "Experience the rich culture of Sri Lanka on this unforgettable tour. Visit ancient temples, explore bustling markets, and sample delicious local cuisine. This tour is perfect for those who want to immerse themselves in Sri Lanka's vibrant culture.",
    button: 'Learn More',
    image: 'assets/images/tour-slider/culture.jpg',
  },
  {
    title: 'Sri Lankan Adventure Tours',
    description: "Get your adrenaline pumping with our Sri Lankan adventure tour. Trek through lush rainforests, raft down raging rivers, and climb towering mountains. This tour is perfect for thrill-seekers who want to experience the best of Sri Lanka's natural beauty.",
    button: 'Discover',
    image: 'assets/images/tour-slider/adventure.jpg',
  },
  {
    title: 'Sri Lankan Beach Escapes',
    description: "Escape to paradise on our Sri Lankan beach tour. Relax on pristine white-sand beaches, swim in crystal-clear waters, and soak up the sun. This tour is perfect for those who want to unwind and enjoy the beauty of Sri Lanka's coastline.",
    button: 'Book Now',
    image: 'assets/images/tour-slider/beach.jpg',
  },
  {
    title: 'Sri Lankan Camping Adventures',
    description: "Experience the great outdoors on our Sri Lankan camping adventure. Sleep under the stars, hike through stunning wilderness, and enjoy campfire meals. This tour is perfect for those who want to connect with nature and experience Sri Lanka's rugged beauty.",
    button: 'Get Started',
    image: 'assets/images/tour-slider/camping.webp',
  },
]

const Hero = () => (
  <div className="w-screen relative select-none">
    {/* <Slider autoplay={3000} className="slider-wrapper">
      {content.map((item, index) => (
        <div key={index} className="slider-content" style={{ background: `url('${item.image}') no-repeat center center` }}>
          <div className="inner">
            <h1>{item.title}</h1>
            <p>{item.description}</p>
            <button className="bg-primary hover:bg-opacity-75 py-3 px-5 text-white">{item.button}</button>
          </div>
        </div>
      ))}
    </Slider> */}

    <div
      className="w-full 

      relative select-none slider-wrapper"
    >
      <div className="inner">
        <img className="slider-content " src="assets/images/tour-slider/culture.jpg" />
      </div>
    </div>
  </div>
)

export default Hero
