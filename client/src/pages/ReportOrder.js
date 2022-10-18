import React, {useContext, useEffect, useState} from 'react';
import { Container} from "react-bootstrap";
import {DateRangePicker} from "rsuite";
import {Context} from "../index";
import {fetchOrders} from "../http/orderApi";
import BoxTopList from "../components/BoxTopList";
import '../style/pages/ReportOrder.css'
import PostCardTopList from "../components/PostCardTopList";


const ReportOrder = () => {

    const {order} = useContext(Context)

    const [show,setShow] = useState(false)
    const [dateRangeShow,setDateRangeShow] = useState(true)
    const [dateRange,setDateRange] = useState([])
    const [price,setPrice] = useState(0)
    const [boxAmount, setBoxAmount] = useState(0)
    const [orderAmount, setOrderAmount] = useState(0)
    const [postCardAmount, setPostCardAmount] = useState(0)
    const [box,setBox] = useState([])
    const [postCard,setPostCard] = useState([])


    const createTopPostCard = () =>{
        let postCardIds = []
        let resPostCard = []
        order.filteredoOders.forEach( order => {
            order.post_cards.forEach(postCard =>{
                if(postCardIds.includes(postCard.id)){
                    resPostCard = resPostCard.map(i => i.postCard.id === postCard.id?{...i,amount:i.amount+1}:i)
                }else {
                    postCardIds.push(postCard.id)
                    resPostCard.push({postCard:postCard, amount:1})
                }
            })
        })
        resPostCard.sort((a, b) => a.amount > b.amount? -1 : 1)
        setPostCard(resPostCard)
    }
    const createTopBox = () =>{
        let boxIds = []
        let resBox = []
        order.filteredoOders.forEach( order => {
            order.boxes.forEach(box =>{
                if(boxIds.includes(box.id)){
                    resBox = resBox.map(i => i.box.id === box.id?{...i,amount:i.amount+box.order_box.amount}:i)
                }else {
                    boxIds.push(box.id)
                    resBox.push({box:box, amount:box.order_box.amount})
                }
            })
        })
        resBox.sort((a, b) => a.amount > b.amount? -1 : 1)
        setBox(resBox)
    }


    const filterOrder = () => {
        let startDate = Date.parse(dateRange[0])/100000 -100
        let endDate = Date.parse(dateRange[1])/100000 + 100

        order.orders.forEach( i =>{
            let checkDate = Date.parse(i.createdAt)/100000
            if(checkDate <= endDate){
                if (checkDate >= startDate)
                    order.setFilteredOrders([...order.filteredoOders,i])
            }
        })

    }

    const calcOrderAmount = () =>{
        let res = 0
        order.filteredoOders.forEach( order => res+=1)
        setOrderAmount(res)
        return res
    }

    const calcBoxAmount = () =>{
        let res = 0
        order.filteredoOders.forEach( order => res+= order.boxes.length)
        setBoxAmount(res)
        return res
    }
    const calcPostCardAmount = () =>{
        let res = 0
        order.filteredoOders.forEach( order => res+= order.post_cards.length)
        setPostCardAmount(res)
        return res
    }
    const calcPrice = () =>{
        let res = 0
        order.filteredoOders.forEach( order => res+=order.price)
        setPrice(res)
        return res
    }

    const  showOrders =  () =>{
        order.setFilteredOrders([])
        filterOrder()
        calcOrderAmount()
        calcPrice()
        calcBoxAmount()
        calcPostCardAmount()
        createTopBox()
        createTopPostCard()
        setShow(true)
        setDateRangeShow(false)


    }

    useEffect(()=>{
        fetchOrders().then(data => {
            order.setOrders(data.rows)
        })

    },[])
    return (
       <Container>

                   {dateRangeShow
                       ?<div className="daterange-box">
                           <h2>Звіт</h2>
                           <div className="daterange-plot">

                           <DateRangePicker
                               size="lg"
                               appearance="subtle"
                               placeholder="Оберіть період"
                               style={{ width: 200, backgroundColor:"white", borderRadius:5 }}
                               value={dateRange}
                               onChange={(e) => {
                                   setDateRange(e)
                               }}
                           />
                           <button
                               onClick={()=> showOrders()}
                           >
                               Показати
                           </button>

                       </div>
                       </div>:<div></div>
                   }

           {show
               ?orderAmount > 0?
               <div className="container d-flex">
                   <div className="top-box">

                           <h4>Топ боксів:</h4>
                           <BoxTopList boxes={box} />
                           <h4>Топ декорів:</h4>
                           <PostCardTopList postCards={postCard}/>
                   </div>
                    <div>
                        <div className="order-info p-3 "
                        style={{marginTop:105}}>
                            <div className="orderinfo-item">
                                <div className="orderinfo-item1">
                                    ЗАРОБЛЕНО
                                </div>
                                <div className="orderinfo-item2">
                                    {price} грн
                                </div>
                            </div>
                            <div className="orderinfo-item">
                                <div className="orderinfo-item1">
                                    БОКСІВ
                                </div>
                                <div className="orderinfo-item2">
                                    {boxAmount} шт.
                                </div>
                            </div>
                            <div className="orderinfo-item">
                                <div className="orderinfo-item1">
                                    ДЕКОРІВ
                                </div>
                                <div className="orderinfo-item2">
                                    {postCardAmount} шт.
                                </div>
                            </div>
                            <div className="orderinfo-item">
                                <div className="orderinfo-item1">
                                    ЗАМОВЛЕНЬ
                                </div>
                                <div className="orderinfo-item2">
                                    {orderAmount} шт.
                                </div>
                            </div>
                        </div>
                        <div>
                            <button
                                className="btn-add w-100"
                                onClick={()=>{
                                setShow(false)
                                setDateRangeShow(true)
                            }}>
                                ЗМІНИТИ ПЕРІОД
                            </button>
                        </div>
                    </div>



               </div>
                   :<div><div className="daterange-box">
                       <h2>За даний період замовлення відсутні</h2>
                       <div className="daterange-plot">
                           <button
                               className="btn-add "
                               onClick={()=>{
                                   setShow(false)
                                   setDateRangeShow(true)
                               }}>
                               ЗМІНИТИ ПЕРІОД
                           </button>

                       </div>
                   </div></div>
                   :<div></div>}
       </Container>
    );
};

export default ReportOrder;