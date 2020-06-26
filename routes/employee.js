const express  = require('express')
const router  = express.Router()

const ExployeeController  = require('../controller/EmployeeController')
const upload              = require('../middleware/upload')


router.get('/', ExployeeController.index)
router.post('/show', ExployeeController.show)
router.post('/store', upload.array('avatar[]'), ExployeeController.store)
router.post('/update', ExployeeController.update)
router.post('/delete', ExployeeController.destroy)

module.exports = router