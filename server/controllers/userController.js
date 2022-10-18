const {User} = require('../models/models')
const ApiError = require('../error/ApiError')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

class userController {
    async create(req, res,next) {
        try {
            const {email, password} = req.body
            const candidate = await User.findOne({where:{email}})
            if(candidate){
                return next(ApiError.badRequest("Користувач з таким Email уже існує"))
            }
            const hashPassword = await bcrypt.hash(password,5)

            const user = await User.create({email, password:hashPassword})


            const token = jwt.sign(
                {
                    id:user.id,email:user.email,},
                    process.env.SECRET_KEY,
                {expiresIn: '24h'}
                )
            return res.json({token})
        }catch (e){
            next(ApiError.badRequest(e.message))
        }

    }

    async login(req, res,next) {
        const {email, password} = req.body
        const user = await User.findOne({where:{email}})

        if(!user){
            return next(ApiError.badRequest("Користувача з таким Email не існує"))
        }
        let comparePassword = bcrypt.compareSync(password,user.password)
        console.log(user.password)
        if(!comparePassword){
            return next(ApiError.badRequest("Не правильний пароль"))
        }
        const token = jwt.sign(
            {
                id:user.id,email:user.email,
            },
            process.env.SECRET_KEY,
            {expiresIn: '1h'}
        )
        return res.json({token})
    }
    async check(req, res,next) {
        const token = jwt.sign(
            {
                id:req.user.id,email:req.user.email,
            },
            process.env.SECRET_KEY,
            {expiresIn: '1h'}


        )
        return res.json({token})
     }

    }

module.exports = new  userController()