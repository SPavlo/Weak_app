const Router =  require('express')
const router = new Router()

const boxRouter = require('./boxRouter')
const postCardRouter = require('./postCardRouter')
const orderRouter = require('./orderRouter')
const cBoxRouter = require('./cBoxRouter')
const userRouter = require('./userRouter')


router.use('/box',boxRouter)
router.use('/cbox',cBoxRouter)
router.use('/postcard',postCardRouter)
router.use('/user',userRouter)
router.use('/order',orderRouter)


module.exports = router