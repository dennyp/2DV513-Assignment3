'use strict'

const conn = require('../connection')

const SELECT_ALL_MODELS = 'SELECT * FROM Model'
const COUNT_NUMBER_OF_MODELS = 'SELECT * FROM number_of_models'

const getModelsController = {}

getModelsController.index = async (req, res, next) => {
  try {
    conn.query(SELECT_ALL_MODELS, (err, result, fields) => {
      if (err) throw err

      return res.status(200).json(result)
    })
  } catch (err) {
    return res.status(500)
  }
}

getModelsController.countModels = (req, res, next) => {
  try {
    conn.query(COUNT_NUMBER_OF_MODELS, (err, result) => {
      if (err) throw err

      return res.status(200).json(result)
    })
  } catch (err) {
    console.log(err)
  }
}

module.exports = getModelsController
