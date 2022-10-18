import React, {useContext, useEffect, useState} from 'react';
import {Badge, ListGroup, Button} from "react-bootstrap";
import {Context} from "../index";

const OrderItem = ({orderCur}) => {
    let statusColor = ''
    if(orderCur.status ==='Не зібрано')  statusColor = '#ffd0d0'
    if(orderCur.status ==='Зібрано')  statusColor = '#f8f10c55'
    if(orderCur.status ==='Відправлено')  statusColor = '#7df00a44'

    return (
        <div   className="order" style={{backgroundColor:statusColor}} >
            <div className="order-item" >{orderCur.client_name?orderCur.client_name.toUpperCase():'-----------'}</div>
            <div className="order-item">{orderCur.city?orderCur.city.toUpperCase():"-----------"}</div>
            <div className="order-item">ДО: {orderCur.date_to_send?orderCur.date_to_send.toUpperCase():'-----------'}</div>
            <div className="order-item">{orderCur.status !=='null'?orderCur.status.toUpperCase():'-----------'}</div>
            <div className="order-item">{orderCur.payment_status !=='null'?orderCur.payment_status.toUpperCase():'-----------'}</div>
        </div>
    );
};

export default OrderItem;