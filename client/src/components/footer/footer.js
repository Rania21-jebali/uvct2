import React from 'react';
import './footer.scss'
import {uvctTraining} from "../../assets";
import {Typography} from "antd";
import {Instagram, LinkedIn, Twitter} from "@material-ui/icons";
import {FacebookRounded} from "@mui/icons-material";

const Footer = () => {
    return(
        <div className={'footer'}>
            <div className={'logo-description-container'}>
                <img alt={'logo'} className={'logo'} src={uvctTraining}/>
                <Typography className={'site-description'}>Notre projet ayant comme objectifs la conception et la réalisation d’une plateforme de « e-Learning » qui consiste à mettre en place une plateforme web destinée à l’apprentissage en ligne.</Typography>
                <Typography className={'copyright'}>Tous les droits sont réservés © {new Date().getFullYear()} Uvct-Training</Typography>
            </div>
            <div className={'enterprise-container'}>
                <Typography className={'title'}>Entreprise</Typography>
                <Typography className={'site-description'}>À propos d'Uvct</Typography>
                <Typography className={'site-description'}>Enseigner sur Uvct</Typography>
                <Typography className={'site-description'}>Contactez-nous</Typography>
                <Typography className={'site-description'}>Blog</Typography>
            </div>
            <div className={'links-container'}>
                <Typography className={'title'}>Liens</Typography>
                <Typography className={'site-description'}>Cours</Typography>
                <Typography className={'site-description'}>Instructeurs</Typography>
                <Typography className={'site-description'}>Événements</Typography>
                <Typography className={'site-description'}>Offres</Typography>
            </div>
            <div className={'social-links'}>
                <Typography className={'title'}>Réseaux sociaux</Typography>
                <div>
                    <FacebookRounded className={'icons'}/>
                    <Instagram className={'icons'}/>
                    <Twitter className={'icons'}/>
                    <LinkedIn className={'icons'}/>
                </div>
            </div>
        </div>
    )
}
export default Footer;
