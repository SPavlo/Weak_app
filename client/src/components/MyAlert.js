import React, {useState} from 'react';
import {Alert} from "react-bootstrap";

const MyAlert = ({show, setShow}) => {

    if (show) {
        setTimeout(()=>{
            setShow(false)
        },3000)
        return (
            <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                <Alert.Heading>Помилка!</Alert.Heading>
                <p>
                    Елемент уже доданий до замовлення. Виберіть будь ласка інший)
                </p>

            </Alert>
        )

    }
    return (
        <div></div>
    )

};

export default MyAlert;