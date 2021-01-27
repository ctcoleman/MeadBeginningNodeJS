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

  // FIND OBJECT FROM DB
  db.collection('users').findOne({ name: 'christopher' }, (err, usr) => {
    if(err) {
      return console.log('unable to fetch that user, sir...')
    }

    console.log(usr)
  })

  // GET ARRAY OF OBJECTS FROM DB
  db.collection('users').find({ age: 27 }).toArray((err, usrs) => {
    if(err) {
      return console.log('unable to find those users, sir...')
    }

    console.log(usrs)
  })

  // GET THE AMOUNT OF OBJECTS FOUND IN THE DB
  db.collection('users').find({ age: 27 }).count((err, count) => {
    if(err) {
      return console.log('unable to find those users, sir...')
    }

    console.log(count)

      // SET OBJECT IN DB TO A NEW VALUE - in this case update the name
  db.collection('users').updateOne({
    _id: new ObjectID('600f816ae24ac140b914dfe0')
  }, {
    $set: {
      name: 'caroline'
    },
    // INCREMENT A NUMBER IN THE DB +/-1 - in this case the age
    $inc: {
      age: 1
    }
  }) .then(result => console.log(result)).catch(err => console.log(err))


  // SET MULTIPLE OBJECTS IN DB TO A NEW VALUE - in this case update the name
  db.collection('tasks').updateMany({
    completed: false
  }, {
    $set: {
      completed: true
    },
  }) .then(result => console.log(result)).catch(err => console.log(err))

// DIFFERENT UPDATE OPERATORS
// $currentDate 	Sets the value of a field to current date, either as a Date or a Timestamp.
// $inc 	Increments the value of the field by the specified amount.
// $min 	Only updates the field if the specified value is less than the existing field value.
// $max 	Only updates the field if the specified value is greater than the existing field value.
// $mul 	Multiplies the value of the field by the specified amount.
// $rename 	Renames a field.
// $set 	Sets the value of a field in a document.
// $setOnInsert 	Sets the value of a field if an update results in an insert of a document. Has no effect on update operations that modify existing documents.
// $unset 	Removes the specified field from a document.


  // DELETE ONE OBJECT FROM THE DATABASE
  db.collection('tasks').deleteOne({ description: 'write personal KB docs' }).then(result => console.log(result)).catch(err => console.log(err))

  // DELETE MULTIPLE OBJECTS FROM THE DATABASE
  db.collection('users').deleteMany({ age: 27 }).then(result => console.log(result)).catch(err => console.log(err))

  // INSERT MANY
  db.collection('users').insertMany([
    {
      name: 'Loralai',
      age: 28
    },
    {
      name: 'Bob',
      age:27
    }
  ], (err, result) => {
    if(err) {
      return console.log('unable to insert those users, sir...')
    }

    return console.log(result.ops)
  })


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

  // CHALLANGE II
  // db.collection('tasks').findOne({ _id: new ObjectID('6010ab4d6c0a5c55fc6b0bc2') }, (err, task) => {
  //   if(err) {
  //     return console.log('unable to find that task in your list, sir...')
  //   }

  //   console.log(task)
  // })

  // db.collection('tasks').find({ completed: false }).toArray((err, tasks) => {
  //   if(err) {
  //     return console.log('unable to find that task in your list, sir...')
  //   }

  //   console.log(tasks)
  // })
})


