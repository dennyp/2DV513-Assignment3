'use strict'

const conn = require('../connection')

const SELECT_HINGE_PRICE =
  'SELECT * FROM Hinging_PriceList WHERE PriceListId=? AND HingingId=?'
const SELECT_GLASS_PRICE =
  'SELECT * FROM Glass_PriceList WHERE PriceListId=? AND GlassId=?'
const SELECT_MODEL_PRICE =
  'SELECT * FROM Model_PriceList WHERE PriceListId=? AND ModelId=? AND Width=? AND Height=?'

const getPriceController = {}

getPriceController.getHingePrice = async (req, res, next) => {
  try {
    const hingeId = req.params.id
    const priceList = req.params.priceList

    conn.query(
      SELECT_HINGE_PRICE,
      [priceList, hingeId],
      (err, result, fields) => {
        if (err) throw err

        return res.status(200).json(result)
      }
    )
  } catch (err) {
    return res.status(500)
  }
}

getPriceController.getGlassPrice = async (req, res, next) => {
  try {
    const glassId = req.params.id
    const priceList = req.params.priceList

    conn.query(
      SELECT_GLASS_PRICE,
      [priceList, glassId],
      (err, result, fields) => {
        if (err) throw err

        return res.status(200).json(result)
      }
    )
  } catch (err) {
    return res.status(500)
  }
}

getPriceController.getModelPrice = async (req, res, next) => {
  try {
    const modelId = req.params.id
    const priceList = req.params.priceList
    const width = req.params.width
    const height = req.params.height
    console.log(req.params)
    conn.query(
      SELECT_MODEL_PRICE,
      [priceList, modelId, width, height],
      (err, result, fields) => {
        if (err) throw err

        return res.status(200).json(result)
      }
    )
  } catch (err) {
    return res.status(500)
  }
}

module.exports = getPriceController
