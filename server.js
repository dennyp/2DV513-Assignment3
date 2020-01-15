'use strict'

const express = require('express')
const PORT = process.env.PORT || 5000

const app = express()
app.use(express.json())

app.use('/api/getModels', require('./routes/getModelsRouter'))
app.use('/api/getGlass', require('./routes/getGlassRouter'))
app.use('/api/getHingings', require('./routes/getHingingsRouter'))
app.use('/api/getPrice', require('./routes/getPriceRouter'))
app.use('/api/validateDimensions', require('./routes/sizeRouter'))

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`)
})
