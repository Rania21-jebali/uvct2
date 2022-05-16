import React from 'react'
import { Navbar,Nav, Button } from 'react-bootstrap'
import './DevenirInstructeur.css'

function HeaderInstructeur() {
  return (
    <div>
    <Navbar className='navbarHeaderInst'>
        <Nav >
        <Nav.Link className='linkHeaderInst'>Accueil</Nav.Link>
        <Nav.Link className='linkHeaderInst'>Cours</Nav.Link>
        <Nav.Link className='linkHeaderInst'>Instructeurs</Nav.Link>
        <Nav.Link className='linkHeaderInst'>Événements</Nav.Link>
        <Nav.Link className='linkHeaderInst'>Offres</Nav.Link>
        <Nav.Link className='linkHeaderInst'>A propos</Nav.Link>
        <Nav.Link className='linkHeaderInst'>Blog</Nav.Link>
        <Nav.Link className='linkHeaderInst'>Contact</Nav.Link>
        </Nav>
    </Navbar>
    <div className='posterInstr'>
      <div>
        <h2>Partenaire avec Uvct-Training</h2>
        <p>Engagez-vous auprès d'un public large et motivé avec vos connaissances et votre expertise.</p>
        <Button href="/devenir-instructeur" className='btn-devInst'>Devenir instructeur</Button>
      </div>
      <div>
          <img src='./images/Instructeur.jpg' alt="" className='imgInstructeur'/>
      </div>
    </div>
    <div className='content2Inst'>
        <h2 className='contentTitle2'>Pourquoi enseigner sur notre platforme?</h2>
        <h5 className='contentTitle3'>Créez des cours qui vous ressemblent</h5>
        <p className='contentTitle4'>Postez le cours que vous souhaitez, comme vous le souhaitez, <br />
        et gardez toujours le contrôle sur votre propre contenu.</p>
        <h5 className='contentTitle3'>Inspirez les participants</h5>
        <p className='contentTitle4'>Aidez les participants à explorer leurs intérêts, <br />
        à acquérir de nouvelles compétences et à développer leur carrière.</p>
        <h5 className='contentTitle3'>Soyez récompensé</h5> 
        <p className='contentTitle4'>Développez votre réseau professionnel et votre expertise, 
        <br />et gagnez de l'argent à chaque inscription rémunérée.</p>
    </div>
    <div className='content3Inst'>
     <h2 className='contentTitle2'>Comment ça marche?</h2>
     <h5 className='contentTitle3'>Plannifiez le cours</h5>
     <p className='contentTitle4'>Ta façon d'enseigner est à toi. En plus, notre tableau de bord des instructeurs <br />
     vous permet de rester organisé.</p>
     <h5 className='contentTitle3'>Enregistrez votre vidéos</h5>
     <p className='contentTitle4'>Utilisez les outils de base tels que les smartphones, les webcams,<br />
      les caméras numériques... Tant que ça a une bonne résolution et un enregistrement de voix clair.</p>
      <h5 className='contentTitle3'>Lancez votre cours</h5>
      <p className='contentTitle4'>Votre cours sera visible sur notre place de marché où vous toucherez des revenus<br />
       à chaque inscription payante.</p>
    </div>
    </div>
  )
}

export default HeaderInstructeur