//const { MongoClient } = require("mongodb");
const {createError, errorTransform} = require("./error.js")
const mongo = require("mongodb");
const bcrypt = require('bcrypt');
const saltRounds = 10; // complexity of hash
const maxRetries = 3; // number of attempts to register a user

class Database {
  #db_name='personal-network-tracker'
  #admin_username='admin'
  #admin_password='admin'
  #users_cn_name ='user-credentials'

  // parameters: username and plaintext password
  // returns userObject if username and password are valid
  // throws an error if database query fails, or username or password is invalid
  async queryUserObject(username, password) {
    const client = this.#createClient(this.#admin_username, this.#admin_password);
    try {
      const collection = await this.#getCollection(client, this.#users_cn_name)

      var query = { 'username' : username };
      var userObject = await collection.findOne(query);

      if (userObject != null && // found matching username
          bcrypt.compareSync(password, userObject.password)) { // correct password
            userObject.password = null // omit hashed password from returned userObject
            return userObject;
      } else {
        throw createError(401, null, "Authentication Error")
      }
    }
    catch (err) {
      throw errorTransform(err, 500, "Authentication Error")
    }
    finally {
      await client.close();
    }
  } // queryUserObject

  // parameters: ObjectId of a user
  // returns matching userObject (without password) on success
  // throws an error on failure
  async queryUserObjectWithID(id) {
    const client = this.#createClient(this.#admin_username, this.#admin_password);
    try {
      const collection = await this.#getCollection(client, this.#users_cn_name)

      var query = { '_id' : mongo.ObjectID(id) };
      var userObject = await collection.findOne(query);

      if (userObject == null) {
        throw createError(401, "Invalid _id", null)
      } else {
        delete userObject.password
        return userObject;
      }
    }
    catch (err) {
      throw errorTransform(err, 500, "Failed getting user object with _id")
      //"Database.queryUserObjectWithID: database query failed"
    }
    finally {
      await client.close();
    }
  } //queryUserObjectWithID

  // parameter: network_name (the name of the user's personal collection)
  // returns networkObject on success, throws error on failure
  async queryNetworkObject(network_name) {
    const client = this.#createClient(this.#admin_username, this.#admin_password);
    try {
      const collection = await this.#getCollection(client, network_name)

      // construct network object
      var networkObject = {'contacts':null, 'groups':null}

      // get contacts
      var query = { 'type':'contact' }
      var projection = { 'type': 0 }
      var cursor = await collection.find(query).project(projection)
      networkObject.contacts = await cursor.toArray()

      // get groups
      query = {'type':'group'}
      cursor = await collection.find(query).project(projection)
      networkObject.groups = await cursor.toArray()

      return networkObject
    }
    catch (err) {
      throw errorTransform(err, 401, "Failed getting network object")
    }
    finally {
      await client.close();
    }
  } // queryNetworkObject

  // inserts contactObject into database on success
  // throws an error on failure
  async queryAddContact(network_name, contactObject) {
    const client = this.#createClient(this.#admin_username, this.#admin_password)
    try {
      const collection = await this.#getCollection(client, network_name)

      // insert contactObject
      delete contactObject._id
      contactObject.type = 'contact'
      await collection.insertOne(contactObject)
    }
    catch (err) {
      throw errorTransform(err, 401, "Failed adding contact")
    }
    finally {
      await client.close()
    }
  } // queryAddContact

  // parameters: 
  // - userObject without _id or collection, and with plaintext password
  // - [optional] retries, number of attempts
  // throws an error on failure
  async queryRegisterUser(userObject, retries) {
    const client = this.#createClient(this.#admin_username, this.#admin_password);
    try {
      await client.connect()
      const database = client.db(this.#db_name)
      const users_collection = database.collection(this.#users_cn_name)

      // create a collection
      var num = randomNDigitString(5)
      var personal_network = `user-network-${num}`
      await database.createCollection(personal_network)
      userObject.collection = personal_network

      // hash the user's password
      userObject.password = bcrypt.hashSync(userObject.password, saltRounds)

      // insert the userObject into the database
      delete userObject._id
      await users_collection.insertOne(userObject)
      return userObject
    }
    catch (err) {
      //console.log("Database.queryRegisterUser failed")
      //console.log(err)
      if (err.message.search("Collection already exists") != -1) {
        if (!retries) {
          retries = 0
        }
        if (retries < maxRetries) {
          // try again with a different random number
          this.queryRegisterUser(userObject, retries+1)
        } else {
          throw errorTransform(err, 401, "Failed registering user")
        }
      } else {
        throw errorTransform(err, 401, "Failed registering user")
      }
    }
    finally {
      client.close()
    }
  } // queryRegisterUser

  // private helper methods
  // create a mongoDB client with the user's access rights
  #createClient(db_username, db_password) {
    var uri =
    `mongodb+srv://${db_username}:${db_password}@cluster0.xpide.mongodb.net/${this.#db_name}?retryWrites=true&w=majority`;
    return new mongo.MongoClient(uri);
  }

  async #getCollection(client, cn_name) {
    try {
      await client.connect();
      const database = client.db(this.#db_name);
      return database.collection(cn_name);
    }
    catch (err) {
      throw errorTransform(err, null, "Database.#getCollection failed")
    }
  }
}

// another helper method
function randomNDigitString(n) {
  var i 
  var output = ""
  for (i=0; i < n; i++) {
    var newDigit = Math.floor(Math.random() * 10)
    output = output.concat(newDigit.toString())
  }
  return output
}

var db = new Database();
module.exports = db;

// for debugging
function errorHandler(err) {
  console.log('Caught an error!')
}

async function test() {
  // // test queryUserObject
  // var username = 'Summer'
  // var password = 'password'
  // var wrongpassword = 'wrongpassword'
  // // queryUserObject failure
  // await db.queryUserObject(username, wrongpassword).catch(errorHandler)
  // // queryUserObject success
  // var userObject = await db.queryUserObject(username, password)
  // console.log(`User info for ${username}:`);
  // console.log(userObject);

  // // test queryUserObjectWithId
  // var userId = userObject._id
  // // queryUserObjectWithId failure
  // await db.queryUserObjectWithID(0).catch(errorHandler)
  // // queryUserObjectWithId success
  // var newUserObject = await db.queryUserObjectWithID(userId)
  // console.log("An identical userObject")
  // console.log(newUserObject)

  // // test queryNetworkObject
  // if (userObject != null) {
  //   var db_username = userObject.db_username
  //   var db_password = userObject.db_password
  //   var collection = userObject.collection
  //   // queryNetworkObject failure
  //   await db.queryNetworkObject(db_username, wrongpassword, collection).catch(errorHandler)
  //   // queryNetworkObject success
  //   var networkObject = await db.queryNetworkObject(db_username, db_password, collection)
  //   if (networkObject != null) {
  //     console.log(`${username}'s network:`)
  //     console.log(networkObject)

  //     // test queryAddContact
  //     var newContact = {
  //       '_id'   : null,
  //       'first' : 'Saumya',
  //       'last'  : 'Dedhia'
  //     }
  //     // queryAddContact failure
  //     await db.queryAddContact(db_username, wrongpassword, collection, newContact).catch(errorHandler)
  //     // queryAddContact success
  //     await db.queryAddContact(db_username, db_password, collection, newContact)
  //     networkObject = await db.queryNetworkObject(db_username, db_password, collection)
  //     console.log("Updated network:")
  //     console.log(networkObject)
  //   }
  // }
  
  // // test queryRegisterUser
  // var newUser = {
  //   'first'    : 'Erynn',
  //   'last'     : 'Phan',
  //   'username' : 'Erynn',
  //   'password' : 'password1',
  // }

  // await db.queryRegisterUser(newUser)
}

// test()
