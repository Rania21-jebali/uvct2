import {Button, Card, Typography} from "antd";
import React from "react"
import {ShoppingCart} from "@material-ui/icons";
import './event-card.scss'
import '../../all-events/all-events.scss'
import {Link} from "react-router-dom";

export const EventCard = ({id, image, date, eventType, name, contentCreator}) => {
 return (
     <React.Fragment key={id}>
        <Card className={`event-card`}
              hoverable
              cover={<img height={224} style={{objectFit: "cover"}} alt="example" src={image} />}
              bordered={false}
        >
            <Typography className={'event-date-type-text'}>{date} - {eventType}{'\n'}</Typography>
            <Typography className={'title'}>{name}</Typography>
            <Typography className={'content-creator'}>{contentCreator}</Typography>
            <div className={'card-footer'}>
                <Link to={'/event/'+id}>
                    <Button className={'event-details-info'}>Plus d'information</Button>
                </Link>
                <Button icon={<ShoppingCart/>} className={'price-details-info'}/>
            </div>
        </Card>
    </React.Fragment>
 )
}
