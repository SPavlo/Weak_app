const {PostCard} = require('../models/models')
const ApiError = require('../error/ApiError')
const fs = require('fs')
const uuid = require('uuid')
const path = require('path')



class PostCardController{
    async create(req,res){
        try {
            const {name,price} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..','static', fileName))
            const postCard = await PostCard.create({name,price,img:fileName})
            return res.json(postCard)
        }catch (e) {
            return res.status(404).json({message:"Помилка додавання "})
        }

    }
    async getAll(req,res){

        let {limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        const postCards = await PostCard.findAndCountAll({limit,offset})
        return res.json(postCards)
    }
    async getOne(req,res,next){
        const {id} = req.params
        const postCard = await  PostCard.findOne({where:{id}})
        if(!postCard){
            return res.status(404).json({message:"Відкритки не існує"})
        }

        return res.json(postCard)
    }
    async update(req,res,next){
        const {id} = req.params
        let {name,price} = req.body
        let imgCheck = req.files


        const findPostCard = await  PostCard.findOne({where:{id}})
        if(!findPostCard){
            return res.status(404).json({message:"Відкритки не існує"})
        }
        if(imgCheck){
            let {img} = imgCheck
            let oldImg = findPostCard.img
            let fileName = uuid.v4() + ".jpg"
            fs.unlink(path.resolve(__dirname, '..','static', oldImg), (err) =>{if (err) {}})
            img.mv(path.resolve(__dirname, '..','static', fileName))
            findPostCard.img = fileName

        }
        if(name) findPostCard.name = name
        if(price) findPostCard.price = price

        const updatePostCard = await findPostCard.save()
        if(!updatePostCard){
            next(ApiError.badRequest("Не  змінино"))
        }
        return res.json(updatePostCard)



    }
    async delete(req,res, next){
        const {id} = req.params
        const findPostCard = await  PostCard.findOne({where:{id}})
        if(!findPostCard){
            return res.status(404).json({message:"Відкритки не існує"})
        }


        const deletePostCard = await  PostCard.destroy({where:{id}})
        let oldImg = findPostCard.img
        fs.unlink(path.resolve(__dirname, '..','static', oldImg), (err) =>{if (err) {}})

        if(!deletePostCard) {
            return res.status(404).json({message:"Відкритки не існує"})
        }
        return res.json({message:"Видалено"})

    }
}

module.exports = new  PostCardController()

//5950b88c-1d47-4836-9fcc-e0709c26f4da