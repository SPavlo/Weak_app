import {makeAutoObservable} from "mobx";

export default class PostCardStore{
    constructor() {
        this._postcards = []
        makeAutoObservable(this)
    }

    setPostCards(postCard){
        this._postcards = postCard
    }

    get postCards() {
        return this._postcards
    }

}