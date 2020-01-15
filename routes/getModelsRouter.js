const express = require('express')
const router = express.Router()

const controller = require('../controllers/getModelController')

router.get('/', controller.index)
router.get('/count', controller.countModels)

module.exports = router
