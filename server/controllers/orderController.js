const {OrderAdd, Order} = require('../models/models')
const ApiError = require('../error/ApiError')
const {OrderPostCard} = require("../models/models");
const {OrderBox,Box,PostCard} = require("../models/models");


class OrderController{
    async create(req,res){
        try {
            let {
                date,
                status,
                payment_status,
                client_name,
                client_phone,
                date_to_send,
                comment,
                box_amount,
                city,
                department,
                post_card_text,
                price,
                orderBoxes,
                orderPostCards,
                orderAdd

            } = req.body


            const order = await Order.create({date,status,payment_status,client_name,client_phone,date_to_send,comment,box_amount,city,department,post_card_text,price})
            if(orderBoxes) {
                orderBoxes = JSON.parse(orderBoxes)
                orderBoxes.forEach(orderBox => {
                    OrderBox.create({
                        boxId: orderBox.id,
                        orderId: order.id,
                        amount: orderBox.amount
                    })
                })
            }
            if(orderPostCards) {
                orderPostCards = JSON.parse(orderPostCards)
                orderPostCards.forEach( orderPostCard =>{
                    OrderPostCard.create({
                        postCardId:orderPostCard.id,
                        orderId:order.id,
                        amount:orderPostCard.amount
                    })
                })
            }

            if (orderAdd){
                orderAdd = JSON.parse(orderAdd)
                orderAdd.forEach(i =>
                    OrderAdd.create({
                        name:i.name,
                        amount:i.amount,
                        price:i.price,
                        orderId:order.id
                    })

                )

            }
            return res.json(order)
        }catch (e) {
            return res.status(404).json({message:"Помилка додавання "})
        }

    }
    async getAll(req,res){
        let {limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        const orders = await Order.findAndCountAll({limit,offset,include:[Box,PostCard]})
        return res.json(orders)
    }
    async getOne(req,res){
        const {id} = req.params
        const order = await  Order.findOne(
            {
                where:{id},
                include:[{model:OrderAdd, as:'orderAdd'},Box,PostCard]
            },
        )
        if(!order){
            return res.status(404).json({message:"Замовлення не існує"})
        }
        return res.json(order)
    }

    async update(req, res, next) {

        const {id} = req.params
        let {
            date,
            status,
            payment_status,
            client_name,
            client_phone,
            date_to_send,
            comment,
            box_amount,
            city,
            department,
            post_card_text,
            price,
            orderBoxes,
            orderPostCards,
            orderAdd

        } = req.body
        const findOrder = await Order.findOne(
            {
                where: {id},
                include: [{model: OrderAdd, as: 'orderAdd'}, Box, PostCard]
            },
        )
        if (!findOrder) {
            next(ApiError.badRequest('Такого бокса не знайдено'))
        }

        if (orderBoxes.length !== 2){
            console.log(typeof orderBoxes)
            console.log('orderBox is not null')
            const findBoxes = await OrderBox.findAll({where:{orderId:id}})
            findBoxes.forEach(box =>box.destroy())
        }
        if(orderPostCards.length !== 2){
            const findPostCards = await OrderPostCard.findAll({where:{orderId:id}})
            findPostCards.forEach(postCard =>postCard.destroy())
        }




        if (orderBoxes) {
            orderBoxes = JSON.parse(orderBoxes)
            orderBoxes.forEach(orderBox => {
                OrderBox.create({
                    boxId: orderBox.id,
                    orderId: findOrder.id,
                    amount: orderBox.amount
                })
            })
        }
        if (orderPostCards) {
            orderPostCards = JSON.parse(orderPostCards)
            orderPostCards.forEach(orderPostCard => {
                OrderPostCard.create({
                    postCardId: orderPostCard.id,
                    orderId: findOrder.id,
                    amount: orderPostCard.amount
                })
            })
        }
        if (date) findOrder.date = date
        if (status !== "null") findOrder.status = status
        if (payment_status !== "null") findOrder.payment_status = payment_status
        if (client_name) findOrder.client_name = client_name
        if (client_phone) findOrder.client_phone = client_phone
        if (date_to_send) findOrder.date_to_send = date_to_send
        if (comment) findOrder.comment = comment
        if (box_amount) findOrder.price = box_amount
        if (city) findOrder.price = city
        if (department) findOrder.department = department
        if (post_card_text) findOrder.post_card_text = post_card_text
        if (price.length !==0 && price !== 'undefined'){
            findOrder.price = price
        }



        const order = await findOrder.save()

        return res.json(order)


    }
    async delete (req,res,next){

        const {id} = req.params
        const findOrder= await  Order.findOne({where:{id}})
        if(!findOrder){
            return res.status(404).json({message:"Замовлення не існує"})
        }
        const findBoxes = await OrderBox.findAll({where:{orderId:id}})
        findBoxes.forEach((box) =>{
            box.destroy()
        })
        const findPostCards = await OrderPostCard.findAll({where:{orderId:id}})
        findPostCards.forEach((postCard) =>{
            postCard.destroy()
        })
        const deleteOrder = await  Order.destroy({where:{id}})

        if(!deleteOrder) {
            return res.status(404).json({message:"Замовлення не існує"})
        }
        return res.json({message:"Видалено"})

    }
}

module.exports = new  OrderController()



/* {
   "date":123123213,
   "status":"відправлено",
   "payment_status":"оплачено",
   "client_name":"Маша",
   "client_phone":"380934783112",
   "date_to_send":1123123123,
   "comment":"2 мілки замітьс 3",
   "box_amount":3,
   "city":"Червоноград",
   "department":"3",
   "post_card_text":"Моєму пупсику",
   "price":600
}*/