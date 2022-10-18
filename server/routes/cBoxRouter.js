const Router =  require('express')
const router = new Router()
const cBoxController = require('../controllers/cBoxController')


router.post('/',cBoxController.create)
router.get('/',cBoxController.getAll)
router.get('/:id',cBoxController.getOne)
router.put('/:id',cBoxController.update)
router.delete('/:id',cBoxController.delete)

module.exports = router