import {QuickNavigation} from "../components/quick-navigation/quick-navigation";
import {Button, Typography} from "antd";
import './event-details.scss'
import {UserInfoComponent} from "../components/user-info-component/user-info-component";
import {AccessTime, TravelExplore} from "@mui/icons-material";
import SimilarEvents from "../components/similar-events/similar-events";

export const EventDetails = () => {
  return(
      <div className={'event-container'}>
          <div style={{background: "white", width: '100%'}}>
              <QuickNavigation />
              <div className={'event-details'}>
                  <Typography className={'date'}>Mercredi 06 Avril 2022</Typography>
                  <Typography className={'title'}>JavaScript from zero to hero</Typography>
                  <UserInfoComponent />
              </div>
          </div>
          <div className={'details-container'}>
              <div className={'event-details-container'}>
                  <img className={'instructor-image'} alt={'instructor'}
                       src={'https://www.koimoi.com/wp-content/new-galleries/2022/01/shweta-tripathi-i-am-a-bit-of-a-fiery-person-myself-001.jpg'}/>
                  <Typography className={'event-title'}>Détails</Typography>
                  <Typography.Paragraph className={'event-description'}>Ceci est un événement en ligne.<br/>
                      Les participants peuvent être situés n'importe où dans le monde !
                        <br/>
                        <br/>
                      Cet événement est gratuit!
                      <br/>
                      <br/>
                      Se presser! Les créneaux sont limités !
                      <br/>
                      <br/>
                      La vente d'une entreprise est l'un des plus grands événements dans la vie d'un propriétaire. Avec cela, il ne faut pas le prendre à la légère. Une préparation sérieuse doit être mise en œuvre et exécutée bien avant la signature des contrats.
                      <br/>
                      <br/>
                      Cette présentation mettra en lumière le processus de vente de votre entreprise. Cet événement est idéal pour tous ceux qui envisagent ou cherchent à vendre leur entreprise maintenant ou qui souhaitent en savoir plus pour l'avenir. Venez avec des questions et préparez-vous à avoir un aperçu des connaissances qui peuvent faire la différence dans le résultat d'un événement majeur de la vie.
                      <br/>
                      <br/>
                      Le conférencier abordera les points suivants :
                      <br/>
                      <br/>

                      · Combien de temps faut-il pour vendre votre entreprise ?
                      <br/>
                      · Quel est le processus étape par étape pour vendre une entreprise ?
                      <br/>
                      · Comment faites-vous pour obtenir le maximum de valeur pour votre entreprise ?
                      <br/>
                      · Est-il judicieux de travailler avec un banquier d'investissement ?
                      <br/>
                      · Quelles sont les choses à éviter pendant le processus de transaction ?
                      <br/>
                      et plus!
                      <br/>
                      <br/>
                      Merci de venir avec vos questions</Typography.Paragraph>
              </div>
              <div className={'event-time-actions-container'}>
                  <div className={'event-time-card'}>
                      <div className={'flex-row'}>
                          <AccessTime />
                          <Typography className={'date-time'}>Mercredi 06 Avril 2022, 18:00 jusqu'au
                              jeudi 07 Avril 2022, 20:00 UTC+1
                          </Typography>
                      </div>
                      <div className={'flex-row'}>
                          <TravelExplore />
                          <Typography className={'date-time'}>Événement en ligne
                              Lien visible pour les participants
                          </Typography>
                      </div>
                  </div>
                  <div className={'event-time-button'}>
                      <Button className={'event-time-button-share'}>Partager</Button>
                      <Button className={'event-time-button-booking'}>Réserver</Button>
                  </div>
              </div>
          </div>
          <div>
              <div className={'divider'}/>
                <SimilarEvents/>
          </div>
      </div>
  )
}