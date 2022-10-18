const Router =  require('express')
const router = new Router()
const postCardController = require('../controllers/postCardController')

router.post('/',postCardController.create)
router.get('/',postCardController.getAll)
router.get('/:id',postCardController.getOne)
router.put('/:id',postCardController.update)
router.delete('/:id',postCardController.delete)


module.exports = router