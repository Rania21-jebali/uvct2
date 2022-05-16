import React from 'react'
import './home.scss'
import BannerSection from './bannerSection/BannerSection';
import OffersSection from './offersSection/OffersSection';
import LastEvents from './lastEvents/LastEvents';
import SomeVideos from './someVideos/SomeVideos';
import PopularLessons from './popularLessons/PopularLessons';
import BestCategories from './bestCategories/BestCategories';
import Insctructors from './insctructors/Insctructors';



const Home = () => {
  return(
    <div className="home-wrapper">
      <BannerSection />
      <OffersSection />
      <LastEvents />
      <SomeVideos />
      <PopularLessons />
      <BestCategories />
      <Insctructors />
    </div>
  )
}

export default Home