//const { MongoClient } = require("mongodb");
const mongo = require("mongodb");
const bcrypt = require('bcrypt');

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
        throw Error('Authentication Error');
      }
    } 
    catch (err) {
      console.log("Database.queryUserObject failed")
      console.log(err)
      throw err
    }
    finally {
      await client.close();
    }
  } // queryUserObject
  
  async queryUserObjectWithID(id) {
    const client = this.#createClient(this.#admin_username, this.#admin_password);
    try {
      const collection = await this.#getCollection(client, this.#users_cn_name)

      var query = { '_id' : mongo.ObjectID(id) };
      var userObject = await collection.findOne(query);

      return userObject;
    } 
    catch (exception) {
      console.log("Database.queryUserObjectWithID: database query failed")
      console.log(exception)
      return null;
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
      console.log("Database.queryNetworkObject failed")
      console.log(err)
      throw err
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
      console.log("Database.queryAddContact failed")
      console.log(err)
      throw err
    }
    finally {
      await client.close()
    }
  } // queryAddContact

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
      console.log("Database.#getCollection failed")
      throw err
    }
  }
}

var db = new Database();
module.exports = db; 

// for debugging
function errorHandler(err) {
  console.log('Caught an error!')
}

async function test() {
  // test queryUserObject
  var username = 'Summer'
  var password = 'password'
  var wrongpassword = 'wrongpassword'
  // queryUserObject failure
  await db.queryUserObject(username, wrongpassword).catch(errorHandler)
  // queryUserObject success
  var userObject = await db.queryUserObject(username, password)
  console.log(`User info for ${username}:`);
  console.log(userObject);

  // test queryNetworkObject
  if (userObject != null) {
    var collection = userObject.collection
    // queryNetworkObject failure
    await db.queryNetworkObject(collection).catch(errorHandler)
    // queryNetworkObject success
    var networkObject = await db.queryNetworkObject(collection)
    if (networkObject != null) {
      console.log(`${username}'s network:`)
      console.log(networkObject)
    
      // test queryAddContact
      var newContact = {
        '_id'   : null,
        'first' : 'Saumya',
        'last'  : 'Dedhia'
      }
      // queryAddContact failure
      await db.queryAddContact(collection, newContact).catch(errorHandler)
      // queryAddContact success
      await db.queryAddContact(collection, newContact)
      networkObject = await db.queryNetworkObject(collection)
      console.log("Updated network:")
      console.log(networkObject)
    }
  }
}

// test()
