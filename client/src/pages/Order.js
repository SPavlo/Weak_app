import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Container, Row} from "react-bootstrap";
import {Context} from "../index";
import SideBar from "../components/SideBar";
import CreateBox from "../components/modals/CreateBox";
import OrderList from "../components/OrderList";
import CreateOrder from "../components/modals/CreateOrder";
import {fetchBoxes} from "../http/boxApi";
import {fetchPostCards} from "../http/postCardApi";
import {fetchOneOrder,fetchOrders} from "../http/orderApi";
import OrderFilter from "../components/OrderFilter";
import styles from "../style/pages/Order.css"

const Order = () => {
    const [boxVisible, setBoxVisible] = useState(false)
    const {order} = useContext(Context)
    const [dateRange,setDateRange] = useState([])

    const [filteredOrders,setFilteredOrders] = useState([])
    const [showFilteredOrders,setShowFilteredOrders] = useState(false)


    const removeFilter = () =>{
        setFilteredOrders([])
    }
    const filterOrder = () => {

        setFilteredOrders([])
        let startDate = Date.parse(dateRange[0])/100000 -100
        let endDate = Date.parse(dateRange[1])/100000 +100

        order.orders.forEach( i =>{
            let checkDate = Date.parse(i.createdAt)/100000
            if(checkDate <= endDate){
                if (checkDate >= startDate)
                    setFilteredOrders((filtered) => {
                    return [
                        ...filtered,
                        i
                    ]
                })
            }
        })
    }
    const sort = () =>{
        let res = [...filteredOrders].sort((a, b) => a['status'] > b['status'] ? -1 : 1)
        setFilteredOrders(res)
    }
    const sortWithOutFilter = () =>{
        let res = [...order.orders].sort((a, b) => a['status'] > b['status'] ? -1 : 1)
        setFilteredOrders(res)
        setShowFilteredOrders(true)


    }
    const addDateRange = (date) =>{
            setDateRange(date)

    }

    useEffect(()=>{
        fetchOrders().then(data => {
            order.setOrders(data.rows)
        })

    },[])
    return (
        <Container>
            <div className="main">
                <div className="sidebar">

                    <div className="sidebar-item" style={{width:250}} >

                        <OrderFilter addDateRange={addDateRange} dateRange={dateRange}/>
                        <div className="d-flex justify-content-between mt-4 mb-2">
                            <button
                                className="use-btn1"
                                onClick={()=>{
                                    setShowFilteredOrders(true)
                                    filterOrder()
                                }}
                            >
                                Застосувати
                            </button>

                            <button
                                className="use-btn2"
                                onClick={()=>{
                                    setShowFilteredOrders(false)
                                    removeFilter()
                                }}
                            >
                                Скинути
                            </button>
                        </div>

                    </div>

                    <button
                        className="btn-add"
                        onClick={()=>setBoxVisible(true)}
                    >
                        ДОДАТИ ЗАМОВЛЕННЯ
                    </button>
                </div>
                <OrderList filteredOrders ={filteredOrders} showFilteredOrders={showFilteredOrders} sort={sort} sortWithOutFilter={sortWithOutFilter} />
            </div>

            <CreateOrder
                show={boxVisible}
                onHide={()=> setBoxVisible(false) }
            />

        </Container>

    );
};

export default Order;