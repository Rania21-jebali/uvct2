import React from 'react'
import './Home.css'
function Home() {
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
                    <img src="images/presention-chart.svg" />
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
                    <img src="images/user-octagon.svg" />
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
                    <img src="images/glass.svg" />
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
                  <img src="images/Badge_Bronze.svg" />
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
                  <img src="images/Badge_Silver.svg" />
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
                  <img src="images/Badge_Gold.svg" />
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


      <div id="evenement">
        <div className="container">

          <h1>Derniers évènements <span>Voir plus</span></h1>

          <div className="ligne-sous-titre ligne-sous-titre-bottom-0"> </div>

          <div className="col-sm-12">
            <div className="row evenement-block0">

              <button class="btn btn-evenement-0-1"><i class="fa fa-arrow-left"></i></button>
              <button class="btn btn-evenement-0-2"><i class="fa fa-arrow-right"></i></button>


            </div>
          </div>

          <div className="col-sm-12">
            <div className="row">
              <div className="col-sm-8 evenement-block1">
                <img src="images/event.jpg" />
              </div>

              <div className="col-sm-4 evenement-block2">

                <p class="p-evenement-1">06/04/2022 - En ligne</p>
                <h3>Selling from a to z</h3>
                <p class="p-evenement-2">Organisé par</p>

                <div className="image-inspecteur">
                  <img src="images/Instruteur1.png" />
                  <p class="p-evenement-3">Omar Abdelrahman</p>
                </div>

                <button class="btn btn-evenement-1">Réserver</button>

                <button class="btn btn-evenement-2">Plus d'information</button>

              </div>

            </div>
          </div>

        </div>
      </div>


      <div id="video">
        <div className="container">

          <h1>Quelques vidéos </h1>

          <div className="ligne-sous-titre ligne-sous-titre-color-white ligne-sous-titre-bottom-0"> </div>

          <div className="col-sm-12">
            <div className="row evenement-block0">

              <button class="btn btn-video-0-1"><i class="fa fa-arrow-left"></i></button>
              <button class="btn btn-video-0-2"><i class="fa fa-arrow-right"></i></button>


            </div>
          </div>
        </div>

        <div className="content">

          <div className="col-sm-12">
            <div className="row">

              <div className="col-sm-3 item-video">
                  <img src="images/image_13.png"/>
              
              </div>

              <div className="col-sm-3 item-video">
                  <img src="images/image_13.png"/>
              
              </div>
              <div className="col-sm-3 item-video">
                  <img src="images/image_13.png"/>
              
              </div>
              <div className="col-sm-3 item-video">
                  <img src="images/image_13.png"/>
              
              </div>
              

            </div>
          </div>


          
        </div>

      </div>




    </div>

  )
}

export default Home