import React from 'react'
import './Inspecteur.css'
function Inspecteur() {
  return (

    <div id="inspecteur">

      <div id="slider-inspecteur">
         
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

            <div className="row slider-inspecteur-block">
                <div className="col-sm-7">

                    <div className="col-sm-8 slide-block1">
                      <h1>Partenaire avec Uvct-Training</h1>
                    </div>

                    <div className="col-sm-8 slide-block1">
                      <p>Engagez-vous auprès d'un public large et motivé avec vos connaissances et votre expertise.</p>
                      <button className="btn btn-slider">Devenir instructeur</button>
                    </div>

                </div>

                <div className="col-sm-5 image-slider" >

                    <img src="images/inspecteur.jpg" />
                 
                </div>
              
            </div>



          </div>
        </div>
      </div>


      

     
      <div id="block2-inspecteur">
        <div className='block2-inspecteur-background'></div>
        
        <div className="container">

          <div className="col-sm-12">
            <div className="row">

              <div className="col-sm-6 item-video">
                <h1>Pourquoi enseigner sur notre platforme?</h1>

                <p>Créez des cours qui vous ressemblent </p>
                <ul> <li> Postez le cours que vous souhaitez, comme vous le souhaitez, et gardez toujours le contrôle sur votre propre contenu. </li></ul>

                
                <p>Inspirez les participants </p>
                <ul> <li> Aidez les participants à explorer leurs intérêts, à acquérir de nouvelles compétences et à développer leur carrière. </li></ul>

                <p>Soyez récompensé </p>
                <ul> <li> Développez votre réseau professionnel et votre expertise, et gagnez de l'argent à chaque inscription rémunérée.</li></ul>

              </div>

            </div>
          </div>



        </div>

      </div>


      <div id="block3-inspecteur">
        
        <div className="container">

          <div className="col-sm-12">
            <div className="row">

              <div className="col-sm-4">
              </div>
             
              <div className="col-sm-8">
                <h1>Comment ça marche?</h1>

               

                <p> Plannifiez le cours </p>
                <ul> <li> Ta façon d'enseigner est à toi. En plus, notre tableau de bord des instructeurs vous permet de rester organisé. </li></ul>

                
                <p>Enregistrez votre vidéos </p>
                <ul> <li> Utilisez les outils de base tels que les smartphones, les webcams, les caméras numériques... Tant que ça a une bonne résolution et un enregistrement de voix clair. </li></ul>

                

                <p>Lancez votre cours</p>
                <ul> <li> Your course will be visible on our marketplace where you will get income with every paid registration.</li></ul>

              </div>

            </div>
          </div>



        </div>

      </div>




    </div>

  )
}

export default Inspecteur