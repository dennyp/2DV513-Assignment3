const express = require('express')
const router = express.Router()

const controller = require('../controllers/getHingingsController')

router.get('/group/:id', controller.getHingingsByGroupId)

module.exports = router
