'use strict'

const conn = require('../connection')

const SELECT_ALL_MODELS = 'SELECT * FROM Model'

const getSizeController = {}

getSizeController.isValidSize = async (req, res, next) => {
  try {
    conn.query(SELECT_ALL_MODELS, (err, result, fields) => {
      if (err) throw err

      return res.status(200).json(result)
    })
  } catch (err) {
    return res.status(500)
  }
}

module.exports = getSizeController
