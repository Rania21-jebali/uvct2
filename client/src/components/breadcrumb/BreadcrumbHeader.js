import React from 'react'
import { Breadcrumb} from 'react-bootstrap';

function BreadcrumbHeader(props) {
  return (
    <Breadcrumb>
    <Breadcrumb.Item  href="/">
    <p className='itemBreadcrumbLink'>{props.item}</p>
    </Breadcrumb.Item>
   { props.test &&
    <Breadcrumb.Item  href={props.link} >
    <span className='itemBreadcrumbLink'>{props.item2}</span>
    </Breadcrumb.Item>
   } 
    <Breadcrumb.Item className='itemBreadcrumb' active>{props.active}</Breadcrumb.Item>
  </Breadcrumb>
  )
}

export default BreadcrumbHeader