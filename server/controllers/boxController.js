const uuid = require('uuid')
const path = require('path')
const fs = require('fs')

const {Box,BoxComposition} = require('../models/models')
const ApiError = require('../error/ApiError')

class BoxController{
    async create(req,res,next){
        try {
            let {name,price,composition} = req.body
            const {img} = req.files

            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..','static', fileName))
            const box = await Box.create({name,price,img:fileName})
            if (composition){
                composition = JSON.parse(composition)
                composition.forEach(i =>
                    BoxComposition.create({
                        name:i.name,
                        amount:i.amount,
                        boxId:box.id
                    })
                )
            }
            return res.json(box)
        }catch (e) {
            return res.status(404).json({message:"Помилка додавання "})
        }

    }
    async getAll(req,res){

        const boxes = await Box.findAndCountAll()
        return res.json(boxes)

    }
    async getOne(req,res,next){
        const {id} = req.params
        const box = await  Box.findOne(
            {
                where:{id},
                include:[{model:BoxComposition, as:'composition'}]
            },
        )
        if(!box){
            return res.status(404).json({message:"Боксу не існує"})
        }
        return res.json(box)

    }
    async update(req,res,next){
        const {id} = req.params
        let {name,price,composition,deletedComposition} = req.body
        let imgCheck = req.files

        const findBox = await  Box.findOne(
            {
                where:{id},
                include:[{model:BoxComposition, as:'composition'}]
            }

        )
        if(!findBox){
            next(ApiError.badRequest('Такого бокса не знайдено'))
        }

        if(imgCheck){
            let {img} = imgCheck
            let oldImg = findBox.img
            let fileName = uuid.v4() + ".jpg"
            fs.unlink(path.resolve(__dirname, '..','static', oldImg), (err) =>{if (err) {}})
            img.mv(path.resolve(__dirname, '..','static', fileName))
            findBox.img = fileName

        }
        if(name) findBox.name = name
        if(price) findBox.price = price


        if (deletedComposition){
            deletedComposition = JSON.parse(deletedComposition)
            deletedComposition.forEach(id =>
                BoxComposition.destroy({
                    where:{id}
                })

            )
        }

        if (composition){
            composition = JSON.parse(composition)

           // console.log('compositionffffffffffffffffffffffffff')
            console.log(typeof composition)
            composition.forEach(i =>
                BoxComposition.create({
                    name:i.name,
                    amount:i.amount,
                    boxId:findBox.id
                })
            )
        }

        const box = await  findBox.save()

        return res.json(box)


    }
    async delete (req,res,next){

        const {id} = req.params
        const findBox= await  Box.findOne({where:{id}})
        if(!findBox){
            return res.status(404).json({message:"Боксу> не існує"})
        }

        const deleteCompositions = await BoxComposition.destroy({where:{boxId:id}})




        const deleteBox = await  Box.destroy({where:{id}})
        let oldImg = findBox.img
        fs.unlink(path.resolve(__dirname, '..','static', oldImg), (err) =>{if (err) {}})

        if(!deleteBox) {
            return res.status(404).json({message:"Боксу не існує"})
        }
        return res.json({message:"Видалено"})

    }
}

module.exports = new  BoxController()


/*   update
{
    "name":"123",
    "composition":[{"name":"milka","amount":123,"boxId":5}]
} */