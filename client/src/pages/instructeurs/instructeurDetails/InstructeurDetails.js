import { Typography } from 'antd'
import React from 'react'
import { QuickNavigation } from '../../../components/quick-navigation/quick-navigation'
import './InstructeurDetails.scss'
import {EventCard} from "../../events/components/event-card/event-card";
import {eventsScaffolding} from "../../events/allEvents/AllEvents";

function InstructeurDetails({_id,avatar,name,description,speciality}) {
  return (
    <div className={'instructor-details'}>
        <QuickNavigation />
        <div className='instructor-details-container'>
            <img src={avatar} alt={_id} className='instructorImageContainer'></img>
            <div className='info-instr'>
                <Typography className={"normal-text"}>{name}</Typography>
                <Typography className={"normal-text"}>Il a été formé par des experts dans le domaine de la gestion d'entreprise de l'intérieur et de l'extérieur du Moyen-Orient, et j'ai géré un certain nombre d'entreprises et d'organisations dans de nombreuses industries nationales et internationales, en plus de travailler comme conférencier dans les domaines de l'administration et des compétences générales. programmes. Il a de nombreux assistants qui travaillent avec lui dans divers domaines de la gestion et du développement corporatif. Il a formé des centaines de milliers de jeunes et diplômés qui recherchent de meilleures opportunités pour développer leurs domaines professionnels et personnels et sont de nombreuses nationalités en plus de la représentation de nombreux organismes et entreprises aux États-Unis et au Royaume-Uni.</Typography>
                <Typography className={'titles'}>Qu'en est-il des expériences dans le domaine de la formation</Typography>
                <Typography className={'normal-text'}>Mon domaine est les solutions d'affaires et le développement corporatif et personnel,
                        La gestion n'est pas un luxe, mais c'est une composante essentielle de la gestion des établissements,
                        des entreprises, des particuliers et des pays. Je travaille dans les solutions d'affaires.
                        C'est en tant que prestataire de services et en explorant les problèmes des entreprises et en travaillant pour leur trouver
                        des solutions. Gestion d'entreprise dans tout et n'importe quoi. Business Solutions en tant que fournisseur de services,
                        explorant les problèmes des entreprises et travaillant à leur trouver des solutions. De plus, il doit répondre au marché du
                        travail et aux défis existants. J'ai dirigé de nombreuses entreprises dans des postes de haute direction en tant que décideur
                        pour de nombreuses entreprises nationales et internationales ou multinationales pendant plus de 17 ans dans un monde Business.
                        Administration Avec un travail de conférencier et de conférencier dans le domaine de l'administration des affaires, des ressources
                        humaines, marketing, ventes et gestion des installations spécialisées dans le développement des individus, qui sont des programmes
                        de compétences générales. Des dizaines de milliers de personnes ont été formées dans le monde arabe et au Moyen-Orient dans de
                        nombreux collèges, instituts et universités spécialisés dans la formation de nombreuses entreprises locales et internationales pour
                        résoudre de nombreux problèmes d'entreprises et de crises et définir des politiques et procédures pour ces entreprises.
                        Il existe de nombreux assistants dans les domaines des solutions d'affaires, avec le domaine de la formation technique,
                        professionnelle et académique. instituts et universités spécialisés dans la formation de nombreuses entreprises locales et
                        internationales pour résoudre de nombreux problèmes d'entreprises et de crises et définir des politiques et des procédures
                        pour ces entreprises. Il existe de nombreux assistants dans les domaines des solutions d'affaires, avec le domaine de la formation
                        technique, professionnelle et académique. instituts et universités spécialisés dans la formation de nombreuses entreprises locales
                        et internationales pour résoudre de nombreux problèmes d'entreprises et de crises et définir des politiques et des procédures pour
                        ces entreprises. Il existe de nombreux assistants dans les domaines des solutions d'affaires, avec le domaine de la formation technique, professionnelle et académique.</Typography>
                    <Typography className={'titles'}>Prestations de service</Typography>
                    <Typography className={'normal-text'}>
                        <Typography className={'sub-titles'}>{speciality}</Typography>
                        </Typography>
                       
            </div>
        </div>
        <Typography className={'formations-list'}>Liste des formations proposées</Typography>
        <div className={'flex-row'}>
            {
                eventsScaffolding.slice(0,3).map(element=> {
                    return(
                        <EventCard {...element} />
                    )
                })
            }
        </div>
    </div>
  )
}

export default InstructeurDetails
