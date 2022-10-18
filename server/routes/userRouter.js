const Router =  require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/reg', userController.create)
router.post('/login',userController.login)
router.get('/auth',authMiddleware,userController.check)




module.exports = router

/* {
   "email":"second3@gmail.com",
   "password":"123Psd23123"
}*/