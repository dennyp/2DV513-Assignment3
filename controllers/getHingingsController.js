'use strict'

const conn = require('../connection')

const SELECT_HINGINGS_FROM_GROUP =
  'SELECT Hinging.HingingId, Name, Description, Type FROM Hinging JOIN Hinging_HingingGroup ON Hinging.HingingId = Hinging_HingingGroup.HingingId WHERE Hinging_HingingGroup.HingingGroupId=?'

const getHingingsController = {}

getHingingsController.getHingingsByGroupId = async (req, res, next) => {
  try {
    const hingingGroupId = req.params.id
    conn.query(
      SELECT_HINGINGS_FROM_GROUP,
      hingingGroupId,
      (err, result, fields) => {
        if (err) throw err

        return res.status(200).json(result)
      }
    )
  } catch (err) {
    return res.status(500)
  }
}

module.exports = getHingingsController
