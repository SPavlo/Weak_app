import {makeAutoObservable} from "mobx";

export default class OrderStore{
    constructor() {

        this._status = [
            {id:1,title:'Не зібрано'},
            {id:2,title:'Зібрано'},
            {id:3,title:'Відправлено'}
        ]
        this._paymentStatus = [
            {id:1,title:'Не оплачено'},
            {id:2,title:'Передоплата'},
            {id:3,title:'Оплачено без доставки'},
            {id:4,title:'Оплачено з доставкою'}
        ]
        this._orders = []
        this._filteredOrders = []
        makeAutoObservable(this)
    }

    setOrders(order){
        this._orders = order
    }

    get orders() {
        return this._orders
    }

    setFilteredOrders(order){
        this._filteredOrders = order
    }

    get filteredoOders() {
        return this._filteredOrders
    }

    setStatus(status){
        this._status = status
    }

    get status() {
        return this._status
    }


    setPaymentStatus(paymentStatus){
        this._paymentStatus = paymentStatus
    }

    get paymentStatus() {
        return this._paymentStatus
    }
}