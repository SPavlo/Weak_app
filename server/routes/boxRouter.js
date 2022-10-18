const Router =  require('express')
const router = new Router()
const boxController = require('../controllers/boxController')

router.post('/', boxController.create)
router.get('/',boxController.getAll)
router.get('/:id',boxController.getOne)
router.put('/:id',boxController.update)
router.delete('/:id',boxController.delete)



module.exports = router