import {$authhost,$host} from "./index";
import jwtDecode from "jwt-decode";


export const createPostCard = async (postCard) => {
    let res = false
    try {
        await $host.post('api/postcard',postCard)
        res = true
        return res
    }catch (e) {
        res = false
        alert( e.response.data.message)
        return res
    }

}
export const fetchPostCards = async () => {
    const {data} = await $host.get('api/postcard')
    return data

}
export const fetchOnePostCard = async (id) => {
    const {data} = await $host.get('api/postcard/'+ id)
    return data

}
export const deletePostCard = async (id) => {
    const {data} = await $host.delete('api/postcard/'+ id)
    return data

}
export const updatePostCard = async (id,postCard) => {
    const {data} = await $host.put('api/postcard/'+ id,postCard)
    return data

}