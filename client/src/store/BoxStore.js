import {makeAutoObservable} from "mobx";

export default class BoxStore{
    constructor() {
        this._types = [
            {id:1, name: "Бокси"},
            {id:2, name: "Декор"}
        ]

        this._boxes = []
        this._selectedType = {}
        makeAutoObservable(this)
    }





    setBoxes(box){
        this._boxes = box
    }

    setTypes(types){
        this._types = types
    }

    setSelectedType(type){
        this._selectedType = type
    }


    get types() {
        return this._types
    }

    get boxes() {
        return this._boxes
    }
    get selectedType(){
        return this._selectedType
    }
}