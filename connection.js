const mysql = require('mysql')

const connection = mysql.createConnection(
  'mysql://b0151069aaa848:e035ad4e@eu-cdbr-west-02.cleardb.net/heroku_97e07038506d34f?reconnect=true'
)

connection.connect(err => {
  err ? console.log(err) : console.log('Connected successfully...')
})

module.exports = connection
