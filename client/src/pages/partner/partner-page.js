import {QuickNavigation} from "../../components/quick-navigation/quick-navigation";
import './partner-page.scss'
import {Button, Typography} from "antd";
import {WhyToChooseUs} from "./components/why-to-choose-us/why-to-choose-us";
import {HowDoesItWork} from "./components/how-does-it-work/how-does-it-work";

const PartnerPage = () => {
  return(
      <div className={'partner-page'}>
          <QuickNavigation/>
          <div className={'container'}>
              <div className={'header-section flex-row'}>
                  <div>
                      <Typography className={'title'}>Partenaire avec Uvct-Training</Typography>
                      <Typography className={'subtitle'}>Engagez-vous auprès d'un public large et
                          motivé avec vos connaissances et votre expertise.
                      </Typography>
                      <Button className={'become-instructor-btn'}>Devenir instructeur</Button>
                  </div>
                  <div>
                      <img
                          src={'https://images.unsplash.com/photo-1530268729831-4b0b9e170218?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fA%3D%3D&w=1000&q=80'}
                          className={'image'}
                       alt={'instructor'}/>
                  </div>
              </div>
          </div>
          <WhyToChooseUs/>
            <HowDoesItWork/>
      </div>
  )
}
export default PartnerPage