import React from 'react'
import { motion } from 'framer-motion'
import './BestCategories.scss'

function BestCategories(){

    const backgroundMotion = {
      rest: {
        height:'0',
        transition: {
          duration: 0.4,
          type: "tween",
          ease: "easeIn"
        }
      },
      hover: {
        height:'100%',
        transition: {
          duration: 0.4,
          type: "tween",
          ease: "easeOut"
        }
      }
    };

    const textMotion = {
      rest: {
        color: "#ffffff",
        transition: {
          duration: 0.4,
          type: "tween",
          ease: "easeIn"
        }
      },
      hover: {
        color: "#000000",
        transition: {
          duration: 0.4,
          type: "tween",
          ease: "easeOut"
        }
      }
    };

    function CategoryCard({title,desc,link})
    {
      return(
        <motion.li variants={textMotion} initial="rest" whileHover="hover" animate="rest" className="category-item">
          <motion.span variants={backgroundMotion} className="lc-overlay"></motion.span>
          <div className="lc-header">
            <h3 className="category-title">{title}</h3>
          </div>
          <div className="lc-body">
            <p className="category-desc">{desc}</p>
          </div>
          <div className="lc-footer">
            <a href="/" className="category-button">Voir plus</a>
          </div>
        </motion.li>
      )
    }

    return(
      <div className="home-sections background-img">
        <img className="bg-img" src="./images/austin-distel.jpg" alt="" />
        <span className="bg-overlay"></span>
        <div className="container">
          <div className="row mb-3">
            <div className="col-md-12">
              <div className="section-header">
                <h3 className="section-title mb-2">Meilleures catégories</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="section-body">
                <div className="categories-wrapper">
                  <ul className="list-categories">
                    <CategoryCard title="Développement personnel" desc="Fixer des objectifs afin de réaliser et de maximiser votre potentiel." />
                    <CategoryCard title="Business" desc="Idées, initiatives et des activités qui contribuent à améliorer une entreprise." />
                    <CategoryCard title="MARKETING" desc="Promouvoir et vendre des produits ou des services, y compris des études de marché et de la publicité." />
                    <CategoryCard title="COMMUNICATION" desc="Une variété d'aspects sont importants tels que l'écoute, la parole, l'observation et l'empathie." />
                    <CategoryCard title="MODE DE VIE" desc="Les habitudes, les coutumes et les croyances d'une personne ou d'un groupe de personnes en particulier." />
                    <CategoryCard title="DESIGN" desc="Créer des concepts visuels, à l'aide d'un logiciel informatique ou à la main, pour communiquer des idées." />
                    <CategoryCard title="DÉVELOPPEMENT" desc="Processus de création d'un ensemble d'instructions indiquant à un ordinateur comment effectuer une tâche." />
                    <CategoryCard title="INFORMATIQUE ET LOGICIELS" desc="Ensemble d'instructions, de données ou de programmes permettant d'exécuter des tâches spécifiques." />
                    <CategoryCard title="PHOTOGRAPHIE" desc="La photographie est une façon de faire une image à l'aide d'un appareil photo." />
                    <CategoryCard title="MUSIQUE" desc="Un arrangement de sons ayant une mélodie, un rythme et généralement une harmonie de musique classique." />
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

export default BestCategories