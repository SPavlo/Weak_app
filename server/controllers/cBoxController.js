const {CBox} = require('../models/models')
const ApiError = require('../error/ApiError')
const fs = require('fs')

const uuid = require('uuid')
const path = require('path')

class CBoxController{
    async create(req,res){
        const {name,price} = req.body
        const {img} = req.files
        let fileName = uuid.v4() + ".jpg"
        img.mv(path.resolve(__dirname, '..','static', fileName))
        const cBox = await CBox.create({name,price,img:fileName})
        return res.json(cBox)
    }
    async getAll(req,res){
        let {limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        const cBoxes = await CBox.findAndCountAll({limit,offset})
        return res.json(cBoxes)
    }

    async getOne(req,res){
        const {id} = req.params
        const cbox = await  CBox.findOne({where:{id}})
        if(!cbox){
            return res.status(404).json({message:"Коробки не існує"})
        }
        return res.json(cbox)
    }
    async update(req,res,next){
        const {id} = req.params
        let {name,price} = req.body
        let imgCheck = req.files
        const findCBox = await  CBox.findOne({where:{id}})
        if(!findCBox){
            return res.status(404).json({message:"Коробки не існує"})
        }
        if(imgCheck){
            let {img} = imgCheck
            let oldImg = findCBox.img
            let fileName = uuid.v4() + ".jpg"
            fs.unlink(path.resolve(__dirname, '..','static', oldImg), (err) =>{if (err) {}})
            img.mv(path.resolve(__dirname, '..','static', fileName))
            findCBox.img = fileName

        }
        if(name) findCBox.name = name
        if(price) findCBox.price = price

        const updateCBox = await findCBox.save()
        if(!updateCBox){
            next(ApiError.badRequest("Не  змінино"))
        }
        return res.json(updateCBox)



    }
    async delete(req,res, next){
        const {id} = req.params
        const findCBox = await  CBox.findOne({where:{id}})
        try {
            if(!findCBox) {
                return res.status(404).json({message:"Коробки не існує"})
            }

            const deleteCBox = await  CBox.destroy({where:{id}})
            let oldImg = findCBox.img
            fs.unlink(path.resolve(__dirname, '..','static', oldImg), (err) =>{if (err) {}})

            if(!deleteCBox) {
                return res.status(404).json({message:"Коробки не існує"})
            }

        }catch (e) {
            next(ApiError.badRequest(e))
        }

        return res.json({message:"Видалено"})
    }
}

module.exports = new  CBoxController()


