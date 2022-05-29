import React from 'react';
import './BannerSection.scss';
import {MdNavigateNext} from 'react-icons/md';
import BusinessIcon from '@material-ui/icons/Business';
import PersonIcon from '@material-ui/icons/Person';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import {QuickNavigation} from "../../../components/quick-navigation/quick-navigation";
import {Button, Carousel} from "antd";

function BannerSection() {
  return (
    <div className='poster'>
        <div style={{position: "absolute", zIndex: 1000, textAlign: "center", width: '100%', top: 60}}>
            <QuickNavigation inverted={true}/>
        </div>
        <Carousel autoplay className='carousel-poster' fade>
            <div style={{margin: 500}}>
                <img
                    style={{objectFit: "cover", width: '100%', top: 0, bottom: 0,right: 0, left: 0, position: "absolute", zIndex: -1, objectPosition:'center'}}
                    src="./images/neonbrand.jpg"
                    alt="First slide"
                />
                <h1 className='title-carousel'>Transformez votre vie grâce à l'apprentissage</h1>
                <h2 className={'description-carousel'}>Développez de nouvelles compétences et améliorez-les avec des cours et des certificats d'instructeurs de classe mondiale.</h2>
                <div style={{paddingTop: 24,textAlign:"left"}}>
                    <Button className={'explore-courses-button'}>Explorer les cours</Button>
                </div>
                <div style={{marginTop: 30, paddingLeft: 133}} className={'flex-row justify-center'}>
                    <div className='caption-rect'>
                        <BusinessIcon className="captionIcon"/>
                        <div style={{textAlign: 'left', height: '100%', display: "grid"}}>
                            <p className="captionTitle"> Business et solutions</p>
                            <a href="/" className='link-rect'>Voir plus <MdNavigateNext /> </a>
                        </div>
                    </div>
                    <div className='caption-rect'>
                        <PersonIcon className="captionIcon"/>
                        <div style={{textAlign: 'left', height: '100%', display: "grid"}}>
                            <p className="captionTitle">Developpement personel</p>
                            <a href="/" className='link-rect'>Voir plus <MdNavigateNext /> </a>
                        </div>
                    </div>
                    <div className='caption-rect'>
                        <AccountBalanceIcon className="captionIcon"/>
                        <div style={{textAlign: 'left', height: '100%', display: "grid"}}>
                            <p className="captionTitle">Education et l’enseigenement</p>
                            <a href="/" className='link-rect'>Voir plus<MdNavigateNext /></a>
                        </div>
                    </div>
                </div>
            </div>
        </Carousel>
    </div>
  )
}

export default BannerSection;
