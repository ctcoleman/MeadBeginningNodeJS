// CRUD - create - read - update - delete
import mongodb from 'mongodb'

const MongoClient = mongodb.MongoClient
const ObjectID = mongodb.ObjectID

// mongodb objectid:
// a 4-byte timestamp value, representing the ObjectId’s creation, measured in seconds since the Unix epoch
// a 5-byte random value
// a 3-byte incrementing counter, initialized to a random value


const connectionURL = `mongodb://127.0.0.1:27017`
const databaseName = `task-manager`

const id = new ObjectID()
console.log(id.id)
console.log(id.getTimestamp())

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
  if(err) {
    return console.log('unable to reach the database, sir...')
  }

  const db = client.db(databaseName)

  // INSERT ONE
  db.collection('users').insertOne({
    _id: id,
    name: 'snickerz',
    age: 32
  }, (error, result) => {
    if(err) {
      return console.log('unable to insert this user, sir...')
    }

    console.log(result.ops)
  })

  // INSERT MANY
  // db.collection('users').insertMany([
  //   {
  //     name: 'Loralai',
  //     age: 28
  //   },
  //   {
  //     name: 'Bob',
  //     age:27
  //   }
  // ], (err, result) => {
  //   if(err) {
  //     return console.log('unable to insert those users, sir...')
  //   }

  //   return console.log(result.ops)
  // })


  // // CHALLANGE
  // db.collection('tasks').insertMany([
  //   {
  //     description: 'write personal KB docs',
  //     completed: false
  //   },
  //   {
  //     description: 'create layout for KB docs webpage static pages',
  //     completed: false
  //   },
  //   {
  //     description: 'pick my nose',
  //     completed: true
  //   }
  // ], (err, result) => {
  //   if(err) {
  //     return console.log('i wasn\'t able to add those tasks to the list, sir...')
  //   }

  //   return console.log(result.ops)
  // })
})









