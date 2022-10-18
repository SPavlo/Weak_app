import React, {useEffect, useState} from 'react';
import {fetchOneOrder,deleteOrder} from "../http/orderApi";
import {useNavigate, useParams} from "react-router-dom";
import {BOXPAGE_ROUTE, ORDER_ROUTE, POSTCARD_ROUTE} from "../utils";
import CreateOrder from "../components/modals/CreateOrder";
import '../style/pages/OrderPage.css'
const OrderPage = () => {

    const [boxVisible, setBoxVisible] = useState(false)
    const [order,setOrder] = useState([])
    const [postCards,setPostCards] = useState([])
    const [box,setBox] = useState([])
    const {id} = useParams()
    const navigate = useNavigate()



    const removeOrder = () =>{
        try {
            deleteOrder(id).then(data => navigate(ORDER_ROUTE) )
        }catch (e) {
            console.log('Помилка при видалені')}
    }

    const updOrder = () => {
        try {
            setBoxVisible(true)

        }catch (e) {
            console.log('Помилка при оновлені')}
    }

    function toISODate(milliseconds) {
        var date = new Date(milliseconds);
        var y = date.getFullYear()
        var m = date.getMonth() + 1;
        var d = date.getDate();
        m = (m < 10) ? '0' + m : m;
        d = (d < 10) ? '0' + d : d;
        return [d, m, y].join('.');
    }

    useEffect(()=>{
        fetchOneOrder(id).then(data=> {
            setOrder(data)
            setPostCards(data.post_cards)
            setBox(data.boxes)
        })
    },[])

    let date = toISODate(Date.parse(order.createdAt))
    return (
        <div>
        <div className=" container d-flex mt-4 ">
        <div>
            <div className="order-info">
                <div className="orderinfo-item">
                    <div className="orderinfo-item1">
                        ПІБ
                    </div>
                    <div className="orderinfo-item2">
                        {order.client_name}
                    </div>
                </div>
                <div className="orderinfo-item">
                    <div className="orderinfo-item1">
                        МІСТО
                    </div>
                    <div className="orderinfo-item2">
                        {order.city?order.city:'----------'}
                    </div>
                </div>
                <div className="orderinfo-item">
                    <div className="orderinfo-item1">
                        ВІДДІЛЕННЯ НП
                    </div>
                    <div className="orderinfo-item2">
                        {order.department?order.department:'-------- '}
                    </div>
                </div>
                <div className="orderinfo-item">
                    <div className="orderinfo-item1">
                        ТЕЛЕФОН
                    </div>
                    <div className="orderinfo-item2">
                        {order.client_phone?order.client_phone:'-------- '}
                    </div>
                </div>
                <div className="orderinfo-item">
                    <div className="orderinfo-item1">
                        ДАТА
                    </div>
                    <div className="orderinfo-item2">
                        {date}
                    </div>
                </div>
                <div className="orderinfo-item">
                    <div className="orderinfo-item1">
                        ДО
                    </div>
                    <div className="orderinfo-item2">
                        {order.date_to_send?order.date_to_send:'-------- '}
                    </div>
                </div>
                <div className="orderinfo-item">
                    <div className="orderinfo-item1">
                        ЦІНА
                    </div>
                    <div className="orderinfo-item2">
                        {order.price} грн
                    </div>
                </div>
                <div className="orderinfo-item">
                    <div className="orderinfo-item1">
                        КОМЕНТАР ДО ДЕКОРУ
                    </div>
                    <div className="orderinfo-item2">
                        {order.post_card_text?order.post_card_text:'-------- '}
                    </div>
                </div>
                <div className="orderinfo-item">
                    <div className="orderinfo-item1">
                        КОМЕНТАР
                    </div>
                    <div className="orderinfo-item2">
                        {order.comment?order.comment:'-------- '}
                    </div>
                </div>
        </div>

            <div className="order-btns">
                <button
                    className="order-upd"
                    onClick={()=>setBoxVisible(true)}
                >
                    ЗМІНИТИ
                </button>
                <button
                    className="order-del"
                    onClick={()=> removeOrder()}
                >
                    ВИДАЛИТИ
                </button>
            </div>
        </div>
        <div className="content">
            {box.length !==0
                ?<h4>БОКСИ:</h4>:<div></div>}
            <div className="card-list justify-content-start">
                {box.length !==0
                    ?
                    order.boxes.map(box =>
                        <div  className="card-list-item" >
                            <div
                                onClick={() => navigate(BOXPAGE_ROUTE+'/' + box.id)}
                                key={box.id}
                            >
                                <img  width={210} height={210} src={process.env.REACT_APP_API_URL + box.img}/>
                                <div className="text-card">
                                    <div className="name-card">{box.name}</div>
                                    <div className="price-card">{box.order_box.amount} шт.</div>
                                </div>

                            </div>
                        </div>):<h1></h1>}
            </div>
            {postCards.length !== 0? <h4>ДЕКОР:</h4>:<div></div>}
            <div className="card-list justify-content-start" >
                {postCards.length !== 0
                    ?postCards.map(postCard =>
                        <div
                            onClick={()=> navigate(POSTCARD_ROUTE + '/' + postCard.id)}
                            key={postCard.id}
                            className="card-list-item"
                        >
                            <img  src={process.env.REACT_APP_API_URL + postCard.img} width={210} height={210} />
                            <div className="text-card">
                                <div className="name-card">{postCard.name}</div>
                                <div className="price-card">{postCard.order_post_card.amount} шт.</div>
                            </div>
                        </div>)
                    :<h1></h1>}
            </div>
        </div>
        </div>
            <CreateOrder
                show={boxVisible}
                onHide={()=> setBoxVisible(false)}
                curOrder={order}
                isUpd={true}
            />
        </div>
    );
};

export default OrderPage;