module.exports = (app, connection) => {
  app.get('/', (req, res) => {
    connection.query('SELECT * FROM model', (err, data) => {
      err ? res.send(err) : res.json({ models: data })
    })
  })
}
