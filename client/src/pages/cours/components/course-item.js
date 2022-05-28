import './course-item.scss'
import {Typography} from "antd";
import React from "react";
import {StarSharp} from "@material-ui/icons";

export const CourseItem = ({image, name, contentCreator}) => {
  return(
    <div className={'course-item'}>
        <img alt={`couse ${name}`} src={image}/>
        <div className={'course-info-container'}>
            <Typography className={'course-name'}>{name}</Typography>
            <Typography className={'course-owner'}>{contentCreator}</Typography>
            <Typography className={'course-quote'}>{"« HR Management » Pour ceux qui souhaitent entrer dans les zones administratives les plus fortes.\n"}</Typography>
            <Typography className={'course-stars'}>
                {[1,2,3,4,5].map(()=> {
                    return <StarSharp style={{color:'#F2AF12'}}/>
                })}
                {'\t'}(113 apprenants)
            </Typography>
            <Typography className={'course-stars'}>
                28 heures au total - 21 leçons - Tous les niveaux
            </Typography>
        </div>
        <Typography className={'price'}>499 TND</Typography>
    </div>
  )
}
