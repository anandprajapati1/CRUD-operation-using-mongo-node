var MongoClient = require('mongodb').MongoClient
var ObjectId = require('mongodb').ObjectID

// Connection URL
var url = 'mongodb://10.203.62.34:27170/Angular2Start'

exports.getHeroes = function (req, res) {
  // Use connect method to connect to the server
  MongoClient.connect(url, function (err, db) {
    // write message to console if condition fails
    assert(err == null)
    // console.log('Connected successfully to server')

    // Get the Heroes collection
    var collection = db.collection('Heroes')
    // Find some Heroes
    collection.find().toArray(function (err, items) {
      if (!items || !items.length) {
        console.log('No records Found')
        customCallback('No records Found', res)
        return
      }
      //   assert(err == null)
      console.log('Found the ' + items.length + ' records')
      customCallback(items, res)
    })
    db.close()
  })
}

// get Hero by id
exports.getHeroDetail = function (req, res) {
  MongoClient.connect(url, function (err, db) {
    // console.log('Connected successfully')

    var collection = db.collection('Heroes')
    collection.find({_id: ObjectId(req.params.id)}).toArray(function (err, items) {
      if (!items || !items.length) {
        console.log('No records Found')
        customCallback('No records Found', res)
        return
      }

      console.log('Found ' + items.length + ' record with _id:' + req.param('id'))
      customCallback(items[0], res)
    })
    db.close()
  })
}

exports.insertHeroes = function (req, res) {
  // Use connect method to connect to the server
  MongoClient.connect()
  MongoClient.connect(url, function (err, db) {
    // var heroData = JSON.parse(req.body)
    var heroData = req.body
    // write message to console if condition fails
    // console.log('Connected successfully to server')
    if (heroData.length <= 0) {
      console.log('No record to insert')
      customCallback('No record to insert', res)
      return
    }

    // Get the Heroes collection
    var collection = db.collection('Heroes')

    // insert Heroes
    collection.insertMany(heroData, function (err, result) {
      assert.equal(heroData.length, result.result.n)
      assert.equal(heroData.length, result.ops.length)
      console.log('Inserted ' + heroData.length + ' Heroes')
      customCallback(result.ops, res)
    })
    db.close()
  })
}

exports.searchHeroes = function (req, res) {
  // Use connect method to connect to the server
  MongoClient.connect(url, function (err, db) {
    // write message to console if condition fails
    assert(err == null)
    // console.log('Connected successfully to server')

    // Get the Heroes collection
    var collection = db.collection('Heroes')
    var reg = new RegExp(['^.*', req.params.name, '.*$'].join(''), 'i')
    // Find some Heroes
    collection.find({name: reg}).toArray(function (err, items) {
      if (!items || !items.length) {
        console.log('No records Found matching with "' + req.params.name + '"')
        customCallback(items, res)
        return
      }
      //   assert(err == null)
      console.log('Found the ' + items.length + ' records')
      customCallback(items, res)
    })
    db.close()
  })
}

exports.updateHero = function (req, res) {
  MongoClient.connect(url, function (err, db) {
    // write message to console
    // assert(err, null)
    // console.log('Connected successfully')
    var d = req.body

    var collection = db.collection('Heroes')
    collection.findOneAndUpdate({_id: ObjectId(d._id)}, {
      $set: {name: d.name}
    }, function (err, result) {
      console.log('Updated one record')
      customCallback('Updated one record', res)
    })
    db.close()
  })
}

exports.removeHero = function (req, res) {
  MongoClient.connect(url, function (err, db) {
    // console.log('Connected successfully')

    var collection = db.collection('Heroes')
    collection.remove({_id: ObjectId(req.body._id)}, function (err, result) {
      console.log('Removed one record with _id = "' + req.body._id + '"')
      customCallback('Removed one record', res)
    })
    db.close()
  })
}

var successCallback = function (data, response) {
  // send json data in response
  response.send(data)
}
var customCallback = function (msg, response) {
  // send json data in response
  response.send(msg)
}
