// CRUD - create - read - update - delete
import mongodb from 'mongodb'

const MongoClient = mongodb.MongoClient
const ObjectID = mongodb.ObjectID

const connectionURL = `mongodb://127.0.0.1:27017`
const databaseName = `task-manager`

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
  if(err) {
    return console.log('unable to reach the database, sir...')
  }

  const db = client.db(databaseName)
})









