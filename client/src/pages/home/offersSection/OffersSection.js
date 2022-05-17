import React from 'react'
import './OffresSections.scss'

function OffersSection(){
    return(
      <div className="home-sections">
        <div className="container">
          <div className="row mb-3">
            <div className="col-md-12">
              <div className="section-header">
                <h3 className="section-title">Nos Offres</h3>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="section-body">
                <div className="row g-4 justify-content-center">
                  <div className="col-md-6 col-lg-4">
                    <div className="offers-cards m-auto">
                      <div className="oc-header">
                        <svg className="header-logo" width="115" height="129" viewBox="0 0 115 129" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M84.299 58.7039L84.2989 58.7737C84.2989 74.486 73.3571 90.6487 57.4677 97.2826C41.5784 90.6487 30.6365 74.486 30.6365 58.7737V41.4055L56.464 30.8334C56.4664 30.8325 56.4688 30.8315 56.4711 30.8306C57.1108 30.5719 57.8888 30.5719 58.5286 30.8305C58.531 30.8315 58.5334 30.8325 58.5358 30.8334L84.3384 41.3953L84.299 58.7039Z" stroke="#CCA073" strokeWidth="61.2731" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <div className="header-info">
                          <h4 className="info-title">Bronze</h4>
                          <p className="info-desc">Cours marketing</p>
                        </div>
                      </div>
                      <div className="oc-body">
                        <ul className="body-content">
                          <li className="list-items">23 Conférences</li>
                          <li className="list-items">Accès sur tablette et téléphone</li>
                          <li className="list-items">Cours en direct et enregistreur</li>
                        </ul>
                      </div>
                      <div className="oc-footer">
                        <a href="/acheter" className="footer-button">Acheter</a>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-4">
                    <div className="offers-cards m-auto">
                      <div className="oc-header">
                        <svg className="header-logo" width="115" height="129" viewBox="0 0 115 129" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M84.299 58.7039L84.2989 58.7737C84.2989 74.486 73.3571 90.6487 57.4677 97.2826C41.5784 90.6487 30.6365 74.486 30.6365 58.7737V41.4055L56.464 30.8334C56.4664 30.8325 56.4688 30.8315 56.4711 30.8306C57.1108 30.5719 57.8888 30.5719 58.5286 30.8305C58.531 30.8315 58.5334 30.8325 58.5358 30.8334L84.3384 41.3953L84.299 58.7039Z" stroke="#CFCCC5" strokeWidth="61.2731" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <div className="header-info">
                          <h4 className="info-title">Silver</h4>
                          <p className="info-desc">Cours marketing</p>
                        </div>
                      </div>
                      <div className="oc-body">
                        <ul className="body-content">
                          <li className="list-items">23 Conférences</li>
                          <li className="list-items">Accès sur tablette et téléphone</li>
                          <li className="list-items">Cours en direct et enregistreur</li>
                          <li className="list-items">Certificat d'achèvement</li>
                        </ul>
                      </div>
                      <div className="oc-footer">
                        <a href="/acheter" className="footer-button">Acheter</a>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-4">
                    <div className="offers-cards m-auto">
                      <div className="oc-header">
                        <svg className="header-logo" width="115" height="129" viewBox="0 0 115 129" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M84.299 58.7039L84.2989 58.7737C84.2989 74.486 73.3571 90.6487 57.4677 97.2826C41.5784 90.6487 30.6365 74.486 30.6365 58.7737V41.4055L56.464 30.8334C56.4664 30.8325 56.4688 30.8315 56.4711 30.8306C57.1108 30.5719 57.8888 30.5719 58.5286 30.8305C58.531 30.8315 58.5334 30.8325 58.5358 30.8334L84.3384 41.3953L84.299 58.7039Z" stroke="#D9BC6C" strokeWidth="61.2731" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <div className="header-info">
                          <h4 className="info-title">Gold</h4>
                          <p className="info-desc">Cours marketing</p>
                        </div>
                      </div>
                      <div className="oc-body">
                        <ul className="body-content">
                          <li className="list-items">23 Conférences</li>
                          <li className="list-items">Accès sur tablette et téléphone</li>
                          <li className="list-items">Cours en direct et enregistreur</li>
                          <li className="list-items">Certificat d'achèvement</li>
                          <li className="list-items">Accès aux ateliers en ligne après la fin du cours</li>
                        </ul>
                      </div>
                      <div className="oc-footer">
                        <a href="/acheter" className="footer-button">Acheter</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
        </div>
      </div>
    )
  }

export default OffersSection