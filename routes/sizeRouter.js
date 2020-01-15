const express = require('express')
const router = express.Router()

const controller = require('../controllers/getSizeController')

router.get('/', controller.isValidSize)

module.exports = router
