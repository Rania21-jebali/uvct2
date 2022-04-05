import React, { useState } from 'react'
import { Alert } from 'react-bootstrap';
import './Nofification.css'

export const ShowErrMsg = (msg) => {
    const [show, setShow] = useState(true);

    return (
        <Alert variant="danger" onClose={() => setShow(false)} dismissible>
        {msg}
      </Alert> 
    )
}

export const ShowSuccessMsg = (msg) => {
    const [show, setShow] = useState(true);

    return (
        <Alert variant="success" onClose={() => setShow(false)} dismissible>
        {msg}
      </Alert> 
    )
}