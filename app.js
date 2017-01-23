var dbLayer = require('./dataLayer')
var express = require('express')
var app = express()
var CORS = require('cors')
assert = require('assert')

// Body parsers for handling POST request data
var bodyParser = require('body-parser')
app.use(bodyParser.json()) // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })) // support encoded bodies
app.use(new CORS())

// Define routes
app.get('/getHeroes', dbLayer.getHeroes)
app.get('/getHeroDetail/:id', dbLayer.getHeroDetail)
app.get('/searchHeroes/:name', dbLayer.searchHeroes)
app.post('/insertHeroes', dbLayer.insertHeroes)
app.post('/updateHero', dbLayer.updateHero)
app.post('/removeHero', dbLayer.removeHero)

// Start server at port 3000
var server = app.listen(3000, function () {
  console.log('listening to port 3000...')
})
