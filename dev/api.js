var express = require('express')
var app = express()

app.get('/blockchain', (req, res) => {
  res.send('hi')
})

app.post('/transaction', (req, res) => {})
app.get('/mine', (req, res) => {})

app.listen(3000, () => {
  console.log('running')
})
