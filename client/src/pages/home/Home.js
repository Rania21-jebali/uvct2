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
                    <img src="images/presention-chart.png" alt=""/>
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
                    <img src="images/user-octagon.png" alt=""/>
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
                    <img src="images/glass.png" alt=""/>
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
                  <img src="images/Badge_Bronze.png" alt=""/>
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
                  <img src="images/Badge_Silver.png" alt="" />
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
                  <img src="images/Badge_Gold.png" alt=""/>
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


    </div>

  )
}

export default Home