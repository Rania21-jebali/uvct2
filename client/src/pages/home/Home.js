import React from 'react'
import BannerSection from './bannerSection/BannerSection';
import OffersSection from './offersSection/OffersSection';
import LastEvents from './lastEvents/LastEvents';
import SomeVideos from './someVideos/SomeVideos';
import PopularLessons from './popularLessons/PopularLessons';
import BestCategories from './bestCategories/BestCategories';
import Insctructors from './insctructors/Insctructors';
import Footer1 from '../../components/footer/footer';



const Home = () => {
  return(
    <div>
      <BannerSection />
      <OffersSection />
      <LastEvents />
      <SomeVideos />
      <PopularLessons />
      <BestCategories />
      <Insctructors />
      <Footer1 />
    </div>
  )
}

export default Home