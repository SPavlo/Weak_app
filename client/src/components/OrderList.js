import React, {useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Row} from "react-bootstrap";
import OrderItem from "./OrderItem";
import {useNavigate} from "react-router-dom";
import {ORDER_ROUTE} from "../utils";

const OrderList = observer( ({filteredOrders,showFilteredOrders,sort,  sortWithOutFilter}) => {
    const {order} = useContext(Context)
    const navigate = useNavigate()


    return (
        <div className="content" >
            <div className="order-title">
                <span>ПІБ</span>
                <span>МІСТО</span>
                <span>ДАТА</span>
                <span
                    style={{cursor:"pointer"}}
                    onClick={() =>{
                    if(filteredOrders.length !==0){
                        sort()
                    }else{
                        sortWithOutFilter()
                    }

                }}>СТАТУС</span>
                <span>СТАТУС ОПЛАТИ</span>
            </div>
            <div>
                {showFilteredOrders
                    ?filteredOrders.length !==0
                        ? filteredOrders.map(orderCur =>
                            <div

                                key={orderCur.id}
                                onClick={() => navigate(ORDER_ROUTE + '/' + orderCur.id)}
                            >
                                <OrderItem
                                    orderCur={orderCur}
                                />
                            </div>)
                        :<h2 style={{textAlign:"center",marginTop:30}}>Замовлень не знайдено</h2>
                    :order.orders.map(orderCur =>
                        <div

                            key={orderCur.id}
                            onClick={() => navigate(ORDER_ROUTE + '/' + orderCur.id)}
                            style={{cursor:"pointer"}}
                        >
                            <OrderItem
                                orderCur={orderCur}
                            />
                        </div>   )}
            </div>
        </div>

    );
});

export default OrderList;