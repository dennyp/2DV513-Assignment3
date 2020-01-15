const express = require('express')
const router = express.Router()

const controller = require('../controllers/getPriceController')

router.get('/hinging/:id/:priceList', controller.getHingePrice)
router.get('/glass/:id/:priceList', controller.getGlassPrice)
router.get('/model/:id/:priceList/:width/:height', controller.getModelPrice)

module.exports = router
