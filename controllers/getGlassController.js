'use strict'

const conn = require('../connection')

const SELECT_GLASS_FROM_GROUP =
  'SELECT Glass.GlassId, Name, Description, Weight FROM Glass JOIN Glass_GlassGroup ON Glass.GlassId = Glass_GlassGroup.GlassId WHERE Glass_GlassGroup.GlassGroupId=?'

const getGlassController = {}

getGlassController.getGlassByGroupId = async (req, res, next) => {
  try {
    const glassGroupId = req.params.id
    conn.query(SELECT_GLASS_FROM_GROUP, glassGroupId, (err, result, fields) => {
      if (err) throw err

      return res.status(200).json(result)
    })
  } catch (err) {
    return res.status(500)
  }
}

module.exports = getGlassController
