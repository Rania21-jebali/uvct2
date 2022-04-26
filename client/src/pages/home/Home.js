import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Autoplay } from 'swiper';
import { motion } from 'framer-motion'
import './home.scss'


function HomeOld() {
  return (

    <div id="home">

      <div id="slider">
        <div className="slider-background"></div>
        <div className="container">
          <div className="col-sm-12">
            <div className="row">
              <div className="col-sm-12">
                <ul>
                  <li>Accueil</li>
                  <li>Cours</li>
                  <li>Instructeurs</li>
                  <li>Evenements</li>
                  <li>Offres</li>
                  <li>A propos</li>
                  <li>Blog</li>
                  <li>Contact</li>
                </ul>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-8 slide-block1">
                <h1>Transformez votre vie
                  grâce à l'apprentissage</h1>
              </div>

              <div className="col-sm-5 slide-block1">
                <p>Développez de nouvelles compétences et améliorez-les avec des cours et des certificats d'instructeurs de classe mondiale.</p>
                <button className="btn btn-slider">Explorer les cours</button>
              </div>
            </div>

            <div className="row slider-block3" >

              <div className="col-sm-3 ">
                <div className="row slider-block3-item">
                  <div className="col-sm-4">
                    <img src="images/presention-chart.png" alt=""/>
                  </div>

                  <div className="col-sm-8">
                    <h3>Business et solutions</h3>
                    <p>Voir plus <i className="fa fa-angle-right"></i> </p>
                  </div>
                </div>
              </div>

              <div className="col-sm-3 ">
                <div className="row slider-block3-item">
                  <div className="col-sm-4">
                    <img src="images/user-octagon.png" alt=""/>
                  </div>

                  <div className="col-sm-8">
                    <h3>Developpement personel</h3>
                    <p>Voir plus <i className="fa fa-angle-right"></i> </p>
                  </div>
                </div>
              </div>

              <div className="col-sm-3 ">
                <div className="row slider-block3-item">
                  <div className="col-sm-4">
                    <img src="images/glass.png" alt=""/>
                  </div>

                  <div className="col-sm-8">
                    <h3>Education et l’enseigenement</h3>
                    <p>Voir plus <i className="fa fa-angle-right"></i> </p>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>




      <div id="offre">
        <div className="container">

          <h1>Nos offres</h1>

          <div className="ligne-sous-titre"> </div>

          <div className="col-sm-12">
            <div className="row">

              <div className="col-sm-4 offre-item">
                <div className="offre-item-inside">
                  <img src="images/Badge_Bronze.png" alt=""/>
                  <br />
                  <p>Cours Marketing :</p>
                  <ul>
                    <li>23 Conférences</li>
                    <li>Accès sur tablette et téléphone</li>
                    <li>Cours en direct et enregistreur</li>
                  </ul>
                  <button className="btn">Acheter</button>
                </div>
              </div>

              <div className="col-sm-4 offre-item">
                <div className="offre-item-inside">
                  <img src="images/Badge_Silver.png" alt="" />
                  <br />
                  <p>Cours Marketing :</p>
                  <ul>
                    <li>23 Conférences</li>
                    <li>Accès sur tablette et téléphone</li>
                    <li>Cours en direct et enregistreur</li>
                    <li>Certificat d'achèvement</li>
                  </ul>
                  <button className="btn">Acheter</button>
                </div>
              </div>
              <div className="col-sm-4 offre-item">
                <div className="offre-item-inside">
                  <img src="images/Badge_Gold.png" alt=""/>
                  <br />
                  <p>Cours Marketing :</p>
                  <ul>
                    <li>23 Conférences</li>
                    <li>Accès sur tablette et téléphone</li>
                    <li>Cours en direct et enregistreur</li>
                    <li>Certificat d'achèvement</li>
                    <li>Accès aux ateliers en ligne après la fin du cours</li>

                  </ul>
                  <button className="btn">Acheter</button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>


    </div>

  )
}

const Home = () => {

  function BannerSection(){

    function BannerItem({img,text,description}){
      return(
        <div className="banner-items">
          <img className="items-bg" src={img} alt="bg"/>
          <motion.div className="items-content">
            <motion.h5 className="ic-heading">{text}</motion.h5>
          </motion.div>
        </div>
      )
    }

    return(
      <div className="container-fluid g-0">
        <div className="row g-0">
          <div className="col-md-12">
            <div className="banner-wrapper">
              <Swiper
                className="banner-swiper"
                spaceBetween={10}
                slidesPerView={1}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                modules={[EffectFade,Autoplay]}
                loop={true}
                effect={"fade"}
                onSlideChange={() => console.log('slide change')}
                onBeforeSlideChangeStart={()=>console.log('onBeforeSlideChangeStart')}
                onBeforeTransitionStart={()=>console.log('onBeforeTransitionStart')}
                onSlideChangeTransitionStart={()=>console.log('onSlideChangeTransitionStart')}
                onSlidePrevTransitionEnd={()=>console.log('onSlidePrevTransitionEnd')}
                onSwiper={(swiper) => console.log(swiper)}>
                <SwiperSlide>
                  <BannerItem img="./images/neonbrand.jpg" text="Transformez votre vie grâce à l'apprentissage" />
                </SwiperSlide>
                <SwiperSlide>
                  <BannerItem img="./images/Rectangle88.png" text="Transformez votre vie grâce à l'apprentissage" />
                </SwiperSlide>
              </Swiper>
              {/* <div className="banner-cards">
                <ul className="cards-list">
                  <li className="cards-items">
                    
                  </li>
                  <li className="cards-items">
                  </li>
                  <li className="cards-items">
                  </li>
                </ul>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    )
  }

  function OffersSection(){
    return(
      <div className="home-sections">
        <div className="container">
          <div className="row mb-3">
            <div className="col-md-12">
              <div className="section-header">
                <h3 className="section-title">Nos Offres</h3>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="section-body">
                <div className="row g-4 justify-content-center">
                  <div className="col-md-6 col-lg-4">
                    <div className="offers-cards m-auto">
                      <div className="oc-header">
                        <svg className="header-logo" width="115" height="129" viewBox="0 0 115 129" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M84.299 58.7039L84.2989 58.7737C84.2989 74.486 73.3571 90.6487 57.4677 97.2826C41.5784 90.6487 30.6365 74.486 30.6365 58.7737V41.4055L56.464 30.8334C56.4664 30.8325 56.4688 30.8315 56.4711 30.8306C57.1108 30.5719 57.8888 30.5719 58.5286 30.8305C58.531 30.8315 58.5334 30.8325 58.5358 30.8334L84.3384 41.3953L84.299 58.7039Z" stroke="#CCA073" strokeWidth="61.2731" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <div className="header-info">
                          <h4 className="info-title">Bronze</h4>
                          <p className="info-desc">Cours marketing</p>
                        </div>
                      </div>
                      <div className="oc-body">
                        <ul className="body-content">
                          <li className="list-items">23 Conférences</li>
                          <li className="list-items">Accès sur tablette et téléphone</li>
                          <li className="list-items">Cours en direct et enregistreur</li>
                        </ul>
                      </div>
                      <div className="oc-footer">
                        <a href="#" className="footer-button">Acheter</a>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-4">
                    <div className="offers-cards m-auto">
                      <div className="oc-header">
                        <svg className="header-logo" width="115" height="129" viewBox="0 0 115 129" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M84.299 58.7039L84.2989 58.7737C84.2989 74.486 73.3571 90.6487 57.4677 97.2826C41.5784 90.6487 30.6365 74.486 30.6365 58.7737V41.4055L56.464 30.8334C56.4664 30.8325 56.4688 30.8315 56.4711 30.8306C57.1108 30.5719 57.8888 30.5719 58.5286 30.8305C58.531 30.8315 58.5334 30.8325 58.5358 30.8334L84.3384 41.3953L84.299 58.7039Z" stroke="#CFCCC5" strokeWidth="61.2731" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <div className="header-info">
                          <h4 className="info-title">Silver</h4>
                          <p className="info-desc">Cours marketing</p>
                        </div>
                      </div>
                      <div className="oc-body">
                        <ul className="body-content">
                          <li className="list-items">23 Conférences</li>
                          <li className="list-items">Accès sur tablette et téléphone</li>
                          <li className="list-items">Cours en direct et enregistreur</li>
                          <li className="list-items">Certificat d'achèvement</li>
                        </ul>
                      </div>
                      <div className="oc-footer">
                        <a href="#" className="footer-button">Acheter</a>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-4">
                    <div className="offers-cards m-auto">
                      <div className="oc-header">
                        <svg className="header-logo" width="115" height="129" viewBox="0 0 115 129" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M84.299 58.7039L84.2989 58.7737C84.2989 74.486 73.3571 90.6487 57.4677 97.2826C41.5784 90.6487 30.6365 74.486 30.6365 58.7737V41.4055L56.464 30.8334C56.4664 30.8325 56.4688 30.8315 56.4711 30.8306C57.1108 30.5719 57.8888 30.5719 58.5286 30.8305C58.531 30.8315 58.5334 30.8325 58.5358 30.8334L84.3384 41.3953L84.299 58.7039Z" stroke="#D9BC6C" strokeWidth="61.2731" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <div className="header-info">
                          <h4 className="info-title">Gold</h4>
                          <p className="info-desc">Cours marketing</p>
                        </div>
                      </div>
                      <div className="oc-body">
                        <ul className="body-content">
                          <li className="list-items">23 Conférences</li>
                          <li className="list-items">Accès sur tablette et téléphone</li>
                          <li className="list-items">Cours en direct et enregistreur</li>
                          <li className="list-items">Certificat d'achèvement</li>
                          <li className="list-items">Accès aux ateliers en ligne après la fin du cours</li>
                        </ul>
                      </div>
                      <div className="oc-footer">
                        <a href="#" className="footer-button">Acheter</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
        </div>
      </div>
    )
  }

  function LastEvents(){


    function EventCard({img, date, hour, title, username, avatar, link, info}) {
      return(
        <div className="events-card">
          <div className="card-left">
            <img className="event-img" src={img} alt="img" />
          </div>
          <div className="card-right">
            <div className="event-info">
              <div className="event-header">
                <h6 className="event-date">{date} - {hour}</h6>
                <h4 className="event-title">{title}</h4>
              </div>
              <div className="event-body">
                <div className="event-organiser">
                  <span className="or-made">Organisé par</span>
                  <div className="or-by">
                    <img src={avatar} alt="avatar" className="or-avatar" />
                    <a href="#" className="or-name">{username}</a>
                  </div>
                </div>
                <a href="#" className="event-reserve">Réserver</a>
              </div>
              <div className="event-footer">
                <a href="#" className="event-button">Plus d'information</a>
              </div>
            </div>
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
                <h3 className="section-title">Derniers évènements</h3>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="section-body">
                <div className="events-wrapper">
                  <Swiper
                    className="events-swiper"
                    spaceBetween={20}
                    slidesPerView={1}
                    autoplay={{
                      delay: 3000,
                      disableOnInteraction: false,
                    }}
                    modules={[Autoplay]}
                    loop={true}
                    onSlideChange={() => console.log('slide change')}
                    onSlideChangeTransitionStart={()=>console.log('start')}
                    onSlidePrevTransitionEnd={()=>console.log('start')}
                    onSwiper={(swiper) => console.log(swiper)}>
                    <SwiperSlide>
                      <EventCard
                        img="https://ericsgoodkarmacookies.com/wp-content/uploads/2016/04/School-Events-3-edited.jpg"
                        date="06/04/2022"
                        hour="22H:00"
                        title="Selling from A to Z"
                        avatar="https://cdn3.iconfinder.com/data/icons/avatars-round-flat/33/avat-01-512.png"
                        username="John doe"
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <EventCard
                        img="https://ericsgoodkarmacookies.com/wp-content/uploads/2016/04/School-Events-3-edited.jpg"
                        date="06/04/2022"
                        hour="22H:00"
                        title="Selling from A to Z"
                        avatar="https://cdn3.iconfinder.com/data/icons/avatars-round-flat/33/avat-01-512.png"
                        username="John doe"
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <EventCard
                        img="https://ericsgoodkarmacookies.com/wp-content/uploads/2016/04/School-Events-3-edited.jpg"
                        date="06/04/2022"
                        hour="22H:00"
                        title="Selling from A to Z"
                        avatar="https://cdn3.iconfinder.com/data/icons/avatars-round-flat/33/avat-01-512.png"
                        username="John doe"
                      />
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

  function SomeVideos(){

    function VideoCard({img,title,link}) {
      return(
        <div className="video-card">
          <img className="video-img" src="./images/Rectangle88.png" alt="img" />
          <h6 className="video-title">Introduction au monde de l'administration des affaires</h6>
        </div>
      )
    }

    return(
      <div className="home-sections">
        <div className="container">
          <div className="row mb-3">
            <div className="col-md-12">
              <div className="section-header">
                <h3 className="section-title">Quelques vidéos</h3>
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
                      <VideoCard title="Introduction au monde de l'administration des affaires" img="./images/Rectangle88-1.png" />
                    </SwiperSlide>
                    <SwiperSlide>
                      <VideoCard title="Introduction au monde de l'administration des affaires" img="./images/Rectangle88-1.png" />
                    </SwiperSlide>
                    <SwiperSlide>
                      <VideoCard title="Introduction au monde de l'administration des affaires" img="./images/Rectangle88-1.png" />
                    </SwiperSlide>
                    <SwiperSlide>
                      <VideoCard title="Introduction au monde de l'administration des affaires" img="./images/Rectangle88-1.png" />
                    </SwiperSlide>
                    <SwiperSlide>
                      <VideoCard title="Introduction au monde de l'administration des affaires" img="./images/Rectangle88-1.png" />
                    </SwiperSlide>
                    <SwiperSlide>
                      <VideoCard title="Introduction au monde de l'administration des affaires" img="./images/Rectangle88-1.png" />
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
            <a href="#" className="lesson-button">Ajouter au panier</a>
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
                        <a href="#" className="category-link">Design</a>
                      </li>
                      <li className="category-item">
                        <a href="#" className="category-link">Developpement web</a>
                      </li>
                      <li className="category-item">
                        <a href="#" className="category-link">Developpement personel</a>
                      </li>
                      <li className="category-item">
                        <a href="#" className="category-link">Business</a>
                      </li>
                      <li className="category-item">
                        <a href="#" className="category-link">Marketing</a>
                      </li>
                      <li className="category-item">
                        <a href="#" className="category-link">Photographe</a>
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

  function BestCategories(){

    const backgroundMotion = {
      rest: {
        height:'0',
        transition: {
          duration: 0.4,
          type: "tween",
          ease: "easeIn"
        }
      },
      hover: {
        height:'100%',
        transition: {
          duration: 0.4,
          type: "tween",
          ease: "easeOut"
        }
      }
    };

    const textMotion = {
      rest: {
        color: "#ffffff",
        transition: {
          duration: 0.4,
          type: "tween",
          ease: "easeIn"
        }
      },
      hover: {
        color: "#000000",
        transition: {
          duration: 0.4,
          type: "tween",
          ease: "easeOut"
        }
      }
    };

    function CategoryCard({title,desc,link})
    {
      return(
        <motion.li variants={textMotion} initial="rest" whileHover="hover" animate="rest" className="category-item">
          <motion.span variants={backgroundMotion} className="lc-overlay"></motion.span>
          <div className="lc-header">
            <h3 className="category-title">{title}</h3>
          </div>
          <div className="lc-body">
            <p className="category-desc">{desc}</p>
          </div>
          <div className="lc-footer">
            <a href="/" className="category-button">Voir plus</a>
          </div>
        </motion.li>
      )
    }

    return(
      <div className="home-sections background-img">
        <img className="bg-img" src="./images/austin-distel.jpg" alt="" />
        <span className="bg-overlay"></span>
        <div className="container">
          <div className="row mb-3">
            <div className="col-md-12">
              <div className="section-header">
                <h3 className="section-title mb-2">Meilleures catégories</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="section-body">
                <div className="categories-wrapper">
                  <ul className="list-categories">
                    <CategoryCard title="Développement personnel" desc="Fixer des objectifs afin de réaliser et de maximiser votre potentiel." />
                    <CategoryCard title="Business" desc="Idées, initiatives et des activités qui contribuent à améliorer une entreprise." />
                    <CategoryCard title="MARKETING" desc="Promouvoir et vendre des produits ou des services, y compris des études de marché et de la publicité." />
                    <CategoryCard title="COMMUNICATION" desc="Une variété d'aspects sont importants tels que l'écoute, la parole, l'observation et l'empathie." />
                    <CategoryCard title="MODE DE VIE" desc="Les habitudes, les coutumes et les croyances d'une personne ou d'un groupe de personnes en particulier." />
                    <CategoryCard title="DESIGN" desc="Créer des concepts visuels, à l'aide d'un logiciel informatique ou à la main, pour communiquer des idées." />
                    <CategoryCard title="DÉVELOPPEMENT" desc="Processus de création d'un ensemble d'instructions indiquant à un ordinateur comment effectuer une tâche." />
                    <CategoryCard title="INFORMATIQUE ET LOGICIELS" desc="Ensemble d'instructions, de données ou de programmes permettant d'exécuter des tâches spécifiques." />
                    <CategoryCard title="PHOTOGRAPHIE" desc="La photographie est une façon de faire une image à l'aide d'un appareil photo." />
                    <CategoryCard title="MUSIQUE" desc="Un arrangement de sons ayant une mélodie, un rythme et généralement une harmonie de musique classique." />
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  function Insctructors(){

    const cardMotion = {
      rest:{
        rotateY:0,
        transition:{duration:0.4,}
      },
      rotate:{
        rotateY:180,
        transition:{duration:0.4,}
      }
    };

    const imgMotion = {
      rest:{
        opacity:1,
        transition:{duration:0.4,}
      },
      rotate:{
        opacity:0,
        transition:{duration:0.4,}
      }
    }

    function InstructorCard({img, name, desc}){
      return(
        <motion.div className="instructor-card" initial="rest" whileHover="rotate" animate="rest">
          <motion.div variants={cardMotion} className="card-content">
            <motion.img className="instructor-img" variants={imgMotion} src={img} alt="avatar" />
            <div className="instructor-header">
              <h4 className='instructor-name'>{name}</h4>
            </div>
            <div className="instructor-body">
              <p className="instructor-position">{desc}</p>
            </div>
          </motion.div>
        </motion.div>
      )
    }


    

    return(
      <div className="home-sections background-color">
        <div className="container">
          <div className="row mb-3">
            <div className="col-md-6">
              <div className="section-header">
                <h3 className="section-title mb-2">Devenir instructeur</h3>
                <p className="section-desc">Nos instructeurs enseignent à des milliers de personnes à travers le monde.
Nous vous offrons l'appui et les outils nécessaires pour démontrer votre expertise.</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="section-body">
                <div className="instructor-wrapper">
                  <Swiper className="instructor-swiper"
                    spaceBetween={20}
                    slidesPerView={2.25}
                    autoplay={{
                      delay: 3000,
                      disableOnInteraction: false,
                    }}
                    modules={[Autoplay]}
                    loop={true}
                    >
                    <SwiperSlide>
                      <InstructorCard img="./images/Rectangle88.png" name="avatar" desc="Text goes here" />
                    </SwiperSlide>
                    <SwiperSlide>
                      <InstructorCard img="./images/Rectangle881.png" name="avatar" desc="Text goes here" />
                    </SwiperSlide>
                    <SwiperSlide>
                      <InstructorCard img="./images/Rectangle882.png" name="avatar" desc="Text goes here" />
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