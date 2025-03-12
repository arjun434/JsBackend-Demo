require('dotenv')
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/twitter', (req, res) => {
    res.send('This is a node server')
  })
app.get('/football', (req, res) => {
    res.send('<h1>Lionel Messi is my favourite football player.<h1>')
  })
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})