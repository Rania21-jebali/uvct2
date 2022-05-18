import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import './SomeVideos.scss'


function SomeVideos(){

    function VideoCard({img,title,link}) {
      return(
        <div className="video-card">
          <img className="video-img" src={img} alt="img" />
          <h6 className="video-title">{title}</h6>
        </div>
      )
    }

    return(
      <div className="video-sections">
        <div className="container">
          <div className="row mb-3">
            <div className="col-md-12">
              <div className="section-header">
                <h3 className="video-title">Quelques vidéos</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="section-body">
                <div className="videos-wrapper">
                <Swiper
                    className="videos-swiper"
                    spaceBetween={20}
                    slidesPerView={3.5}
                    autoplay={{
                      delay: 3000,
                      disableOnInteraction: false,
                    }}
                    modules={[Autoplay]}
                    loop={true}
                    breakpoints={{
                      320:{slidesPerView:1.25},
                      520:{slidesPerView:1.5},
                      620:{slidesPerView:1.75},
                      720:{slidesPerView:2},
                      820:{slidesPerView:2.25},
                      920:{slidesPerView:2.5},
                      1020:{slidesPerView:2.75},
                      1120:{slidesPerView:3},
                      1220:{slidesPerView:3.5},
                    }}
                    onSlideChange={() => console.log('slide change')}
                    onSlideChangeTransitionStart={()=>console.log('start')}
                    onSlidePrevTransitionEnd={()=>console.log('start')}
                    onSwiper={(swiper) => console.log(swiper)}>
                    <SwiperSlide>
                      <VideoCard title="Introduction au monde de l'administration des affaires" img="./images/image15.png" />
                    </SwiperSlide>
                    <SwiperSlide>
                      <VideoCard title="Connaître le rôle du marketing" img="./images/image13.png" />
                    </SwiperSlide>
                    <SwiperSlide>
                      <VideoCard title="Introduction aux ressources humaines" img="./images/image14.png"/>
                    </SwiperSlide>
                    <SwiperSlide>
                      <VideoCard title="Introduction au monde de l'administration des affaires" img="./images/image15.png" />
                    </SwiperSlide>
                    <SwiperSlide>
                      <VideoCard title="Connaître le rôle du marketing" img="./images/image13.png" />
                    </SwiperSlide>
                    <SwiperSlide>
                      <VideoCard title="Introduction aux ressources humaines" img="./images/image14.png" />
                    </SwiperSlide>
                  </Swiper>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }


export default SomeVideos