import {$authhost, $host} from "./index";


export const createOrder = async (order) => {
    let res = false
    try {
         await $host.post('api/order',order)
        res = true
        return res
    }catch (e) {
        res = false
        alert( e.response.data.message)
        return res
    }


}
export const fetchOrders = async () => {
    const {data} = await $host.get('api/order')
    return data

}
export const fetchOneOrder = async (id) => {
    const {data} = await $host.get('api/order/'+ id)
    return data

}
export const deleteOrder = async (id) => {
    const {data} = await $host.delete('api/order/'+ id)
    return data

}
export const updateOrder = async (id,order) => {
    const {data} = await $host.put('api/order/'+ id,order)
    return data

}