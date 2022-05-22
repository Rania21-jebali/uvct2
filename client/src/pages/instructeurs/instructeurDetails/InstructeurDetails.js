import { Typography } from 'antd'
import React from 'react'
import { QuickNavigation } from '../../../components/quick-navigation/quick-navigation'
import './InstructeurDetails.css'

function InstructeurDetails() {
  return (
    <div className={'events-container'}>
        <QuickNavigation />
    <div className='instructeur-details'>
    <div className='info-instr'>
        <h5 className='f-title'>Instructeur</h5>
        <h2 className='name-instr'>Matthieu GASTON</h2>
        <div className='nb-instructeur'>
        <div className='nb-t-instr'>
            <h5 className='f-title'>Nombre total de participants</h5>
            <h3 className='number-instr'>21 988</h3>
        </div>
        <div>
            <h5 className='f-title'>Avis</h5>
            <h3 className='number-instr'>6 056</h3>
        </div>
        </div>
        <div>
         <h3 className='number-instr'>Informations personnelles</h3>
         <Typography className='info-perso-instr'>
         Professionnel de l'informatique depuis 2012, après un Master MIAGE acquis à Toulouse en Alternance auprès d'IBM, j'ai travaillé dans des grandes structures comme Capgemini et CGI en qualité de développeur et de chef de projet.

        Intervenant en école supérieure d'informatique, j’enseigne aujourd’hui sur internet en particulier sur Udemy et sur H2PROG afin de faire partager mes compétences et mon expérience.

        L’objectif principal de mes formations est de vous amener à pratiquer un maximum, et de vous sentir à l’aise avec le développement informatique.

        Si vous arrivez ensuite à trouver un emploi, j’aurais réussi ma mission.
         </Typography>
        </div>
        <div>
          <h3 className='number-instr'>Mes cours</h3>
        </div>
    </div>
    <div className='info-instr'>
        <img src="./images/Instruteur1.png" alt="" className='img-instructeur'></img>
    </div>
    </div>
    </div>
  )
}

export default InstructeurDetails