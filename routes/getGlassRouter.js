const express = require('express')
const router = express.Router()

const controller = require('../controllers/getGlassController')

router.get('/group/:id', controller.getGlassByGroupId)

module.exports = router
