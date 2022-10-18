import {$authhost,$host} from "./index";
import jwtDecode from "jwt-decode";


export const createBox = async (box) => {
        let res = false
        try {
            await $authhost.post('api/box',box)
            res = true
            return res
        }catch (e) {
            res = false
            alert( e.response.data.message)
            return res
        }




}
export const fetchBoxes = async () => {
    const {data} = await $host.get('api/box')
    return data

}
export const fetchOneBox = async (id) => {
    const {data} = await $host.get('api/box/'+ id)
    return data

}
export const deleteBox = async (id) => {
    const {data} = await $host.delete('api/box/'+ id)
    return data

}
export const updateBox = async (id,box) => {
    const {data} = await $host.put('api/box/'+ id,box)
    return data

}