import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import {  Autoplay } from 'swiper';

function PopularLessons(){

    function LessonCard({img,avatar,username,position,rate,price,link}){
      return(
        <div className="lesson-card">
          <div className="lc-header">
            <img className="lesson-img" src={img} alt="img" />
            <div className="lesson-teacher">
              <img className="teacher-avatar" src={avatar} alt="avatar" />
              <span className="teacher-name">{username}</span>
              <span className="teacher-info">{position}</span>
            </div>
          </div>
          <div className="lc-body">
            <div className="lesson-info">
              <div className="lesson-rate">
                <svg className="rate-logo" width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.73986 14C4.84986 13.51 4.64986 12.81 4.29986 12.46L1.86986 10.03C1.10986 9.27 0.809859 8.46 1.02986 7.76C1.25986 7.06 1.96986 6.58 3.02986 6.4L6.14986 5.88C6.59986 5.8 7.14986 5.4 7.35986 4.99L9.07986 1.54C9.57986 0.55 10.2599 0 10.9999 0C11.7399 0 12.4199 0.55 12.9199 1.54L14.6399 4.99C14.7699 5.25 18.2099 6.23 18.4999 6.4L5.99988 18C5.85988 18.14 4.49988 19 3.99988 19L4.73986 14Z" fill="#F2AF12"/>
                  <path d="M17.6998 12.46C17.3398 12.82 17.1398 13.51 17.2598 14L17.9498 17.01C18.2398 18.26 18.0598 19.2 17.4398 19.65C17.1898 19.83 16.8898 19.92 16.5398 19.92C16.0298 19.92 15.4298 19.73 14.7698 19.34L11.8398 17.6C11.3798 17.33 10.6198 17.33 10.1598 17.6L7.2298 19.34C6.1198 19.99 5.1698 20.1 4.5598 19.65C4.3298 19.48 4.1598 19.25 4.0498 18.95L16.2098 6.79002C16.6698 6.33002 17.3198 6.12002 17.9498 6.23002L18.9598 6.40002C20.0198 6.58002 20.7298 7.06002 20.9598 7.76002C21.1798 8.46002 20.8798 9.27002 20.1198 10.03L17.6998 12.46Z" fill="#F2AF12"/>
                </svg>
                <span className="rate-txt">{rate}</span>
              </div>
              <div className="lesson-price">
                <svg className="price-logo" width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.97007 0.900041C4.45007 0.920041 -0.0199331 5.41004 6.68532e-05 10.93C0.0200668 16.45 4.51007 20.92 10.0301 20.9C15.5501 20.88 20.0201 16.39 20.0001 10.87C19.9801 5.35004 15.4901 0.890041 9.97007 0.900041ZM12.2601 11C13.0401 11.27 14.0901 11.85 14.0901 13.64C14.0901 15.18 12.8801 16.42 11.4001 16.42H10.7501V17C10.7501 17.41 10.4101 17.75 10.0001 17.75C9.59007 17.75 9.25007 17.41 9.25007 17V16.42H8.89007C7.25007 16.42 5.92007 15.04 5.92007 13.34C5.92007 12.93 6.26007 12.59 6.67007 12.59C7.08007 12.59 7.42007 12.93 7.42007 13.34C7.42007 14.21 8.08007 14.92 8.89007 14.92H9.25007V11.54L7.74007 11C6.96007 10.73 5.91007 10.15 5.91007 8.36004C5.91007 6.82004 7.12007 5.58004 8.60007 5.58004H9.25007V5.00004C9.25007 4.59004 9.59007 4.25004 10.0001 4.25004C10.4101 4.25004 10.7501 4.59004 10.7501 5.00004V5.58004H11.1101C12.7501 5.58004 14.0801 6.96004 14.0801 8.66004C14.0801 9.07004 13.7401 9.41004 13.3301 9.41004C12.9201 9.41004 12.5801 9.07004 12.5801 8.66004C12.5801 7.79004 11.9201 7.08004 11.1101 7.08004H10.7501V10.46L12.2601 11Z" fill="#10B981"/>
                </svg>
                <span className="price-txt">{price}</span>
              </div>
            </div>
          </div>
          <div className="lc-footer">
            <a href="/panier" className="lesson-button">Ajouter au panier</a>
          </div>
        </div>
      )
    }

    return(
      <div className="home-sections background-color">
        <div className="container">
          <div className="row mb-3">
            <div className="col-md-12">
              <div className="section-header">
                <h3 className="section-title mb-2">Cours populaires</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="section-body">
                <div className="lessons-wrapper">
                  <div className="lessons-categories mb-3">
                    <ul className="list-categories">
                      <li className="category-item">
                        <a href="/design" className="category-link">Design</a>
                      </li>
                      <li className="category-item">
                        <a href="/devweb" className="category-link">Developpement web</a>
                      </li>
                      <li className="category-item">
                        <a href="/devper" className="category-link">Developpement personel</a>
                      </li>
                      <li className="category-item">
                        <a href="/business" className="category-link">Business</a>
                      </li>
                      <li className="category-item">
                        <a href="/marketing" className="category-link">Marketing</a>
                      </li>
                      <li className="category-item">
                        <a href="/photographe" className="category-link">Photographe</a>
                      </li>
                    </ul>
                  </div>
                  <div className="lessons-card">
                    <Swiper
                      className="lessons-swiper"
                      spaceBetween={20}
                      slidesPerView={4}
                      autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                      }}
                      modules={[Autoplay]}
                      loop={true}
                      breakpoints={{
                        320:{slidesPerView:1.65},
                        520:{slidesPerView:1.75},
                        620:{slidesPerView:1.85},
                        768:{slidesPerView:2.5},
                        992:{slidesPerView:3.25},
                        1200:{slidesPerView:4},
                      }}
                      onSlideChange={() => console.log('slide change')}
                      onSlideChangeTransitionStart={()=>console.log('start')}
                      onSlidePrevTransitionEnd={()=>console.log('start')}
                      onSwiper={(swiper) => console.log(swiper)}>
                      
                      <SwiperSlide>
                        <LessonCard 
                          img="./images/Rectangle88.png"
                          avatar="https://cdn3.iconfinder.com/data/icons/avatars-round-flat/33/avat-01-512.png"
                          username="John doe"
                          position="HR management diploma"
                          rate="4.8"
                          price="320 DT"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <LessonCard 
                          img="./images/Rectangle88.png"
                          avatar="https://cdn3.iconfinder.com/data/icons/avatars-round-flat/33/avat-01-512.png"
                          username="John doe"
                          position="HR management diploma"
                          rate="4.8"
                          price="320 DT"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <LessonCard 
                          img="./images/Rectangle88.png"
                          avatar="https://cdn3.iconfinder.com/data/icons/avatars-round-flat/33/avat-01-512.png"
                          username="John doe"
                          position="HR management diploma"
                          rate="4.8"
                          price="320 DT"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <LessonCard 
                          img="./images/Rectangle88.png"
                          avatar="https://cdn3.iconfinder.com/data/icons/avatars-round-flat/33/avat-01-512.png"
                          username="John doe"
                          position="HR management diploma"
                          rate="4.8"
                          price="320 DT"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <LessonCard 
                          img="./images/Rectangle88.png"
                          avatar="https://cdn3.iconfinder.com/data/icons/avatars-round-flat/33/avat-01-512.png"
                          username="John doe"
                          position="HR management diploma"
                          rate="4.8"
                          price="320 DT"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <LessonCard 
                          img="./images/Rectangle88.png"
                          avatar="https://cdn3.iconfinder.com/data/icons/avatars-round-flat/33/avat-01-512.png"
                          username="John doe"
                          position="HR management diploma"
                          rate="4.8"
                          price="320 DT"
                        />
                      </SwiperSlide>

                    </Swiper>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }


export default PopularLessons