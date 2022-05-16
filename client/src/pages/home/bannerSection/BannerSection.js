import React from 'react';
import { Carousel,Navbar,Nav} from 'react-bootstrap';
import './BannerSection.css';
import Menu from '../Menu/Menu';
import {MdNavigateNext} from 'react-icons/md';
import BusinessIcon from '@material-ui/icons/Business';
import PersonIcon from '@material-ui/icons/Person';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';

function BannerSection() {
  return (
    <div className='poster'>
      <Navbar className='navbar-poster'>
        <Nav className='nav-poster'>
            <Menu menu="Accueil"/>
            <Menu menu="Cours"/>
            <Menu menu="Instructeurs"/>
            <Menu menu="Événements"/>
            <Menu menu="Offres"/>
            <Menu menu="A propos"/>
            <Menu menu="Blog"/>
            <Menu menu="Contact"/>
        </Nav>
    </Navbar>
 <Carousel className='carousel-poster' fade>
    <Carousel.Item className='carousel-item'>
      <img
        className="d-block w-100"
        src="./images/neonbrand.jpg"
        alt="First slide"
        height="700px"
      />
          <Carousel.Caption className='caption-poster'>
            <h1 className='title-carousel'>Transformez votre vie grâce à l'apprentissage</h1>
              <div className='caption-rect1'>
                <p className="captionTitle"><BusinessIcon className="captionIcon"/> Business et solutions</p>
                <a href="/" className='link-rect'>Voir plus <MdNavigateNext /> </a>
              </div>
            <div className='caption-rect2'>
              <p className="captionTitle"> <PersonIcon className="captionIcon"/>Developpement personel</p>
              <a href="/" className='link-rect'>Voir plus <MdNavigateNext /> </a>
            </div>
            <div className='caption-rect3'>
              <p className="captionTitle"><AccountBalanceIcon className="captionIcon"/>Education et l’enseigenement</p>
              <a href="/" className='link-rect'>Voir plus <MdNavigateNext /> </a>
            </div>
          </Carousel.Caption>
    </Carousel.Item>
</Carousel>

    </div>
  )
}

export default BannerSection;