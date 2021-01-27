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

  db.collection('users').findOne({ _id: new ObjectID('6010a91c6d02dd54d93128fa') }, (err, usr) => {
    if(err) {
      return console.log('unable to fetch that user, sir...')
    }

    console.log(usr)
  })

  db.collection('users').find({ age: 27 }).toArray((err, usrs) => {
    if(err) {
      return console.log('unable to find those users, sir...')
    }

    console.log(usrs)
  })

  db.collection('tasks').findOne({ _id: new ObjectID('6010ab4d6c0a5c55fc6b0bc2') }, (err, task) => {
    if(err) {
      return console.log('unable to find that task in your list, sir...')
    }

    console.log(task)
  })

  db.collection('tasks').find({ completed: false }).toArray((err, tasks) => {
    if(err) {
      return console.log('unable to find that task in your list, sir...')
    }

    console.log(tasks)
  })
})









