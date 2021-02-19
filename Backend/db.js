const { MongoClient } = require("mongodb");
const bcrypt = require('bcrypt');

class Database {
  #db_name='personal-network-tracker'
  #admin_username='admin'
  #admin_password='admin'
  #users_cn_name ='user-credentials'

  // parameters: app username and plaintext password
  // returns: userObject on success, null on failure
  async queryUserObject(username, password) {
    const client = this.#createClient(this.#admin_username, this.#admin_password);
    try {
      const collection = await this.#getCollection(client, this.#users_cn_name)

      var query = { 'username' : username };
      var userObject = await collection.findOne(query);

      if (userObject != null) { // found matching username
        if (!bcrypt.compareSync(password, userObject.password)) { // incorrect password
          userObject = null
        } else {
          delete userObject.password // omit from returned userObject
        }
      }
      return userObject;
    } 
    catch (exception) {
      console.log("Database.queryUserObject: database query failed")
      console.log(exception)
      return null;
    }
    finally {
      await client.close();
    }
  } // queryUserObject
  
  // parameters: 
  //   db_username: the client's mongoDB username
  //   cb_password: the client's mongoDB password
  //   network_name: the collection they want to access
  // returns: networkObject on success, null on failure
  async queryNetworkObject(db_username, db_password, network_name) {
    const client = this.#createClient(db_username, db_password);
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
    catch (exception) {
      console.log("Database.queryNetworkObject: database query failed")
      console.log(exception)
      return null
    }
    finally {
      await client.close();
    }
  } // queryNetworkObject

  // // returns: true for success, false for failure
  // async queryAddContact(db_username, db_password, contactObject) {
    
  // } // queryAddContact

  // create a mongoDB client with the user's access rights
  #createClient(db_username, db_password) {
    var uri =
    `mongodb+srv://${db_username}:${db_password}@cluster0.xpide.mongodb.net/${this.#db_name}?retryWrites=true&w=majority`;
    return new MongoClient(uri);
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
// async function test() {
//   var username = 'Summer'
//   var password = 'password'
//   var userObject = await db.queryUserObject(username, password).catch(console.dir)
//   console.log(`User info for ${username}:`);
//   console.log(userObject);

//   if (userObject != null) {
//     var db_username = userObject.db_username
//     var db_password = userObject.db_password
//     var collection = userObject.collection
//     var networkObject = await db.queryNetworkObject(db_username, db_password, collection).catch(console.dir)
//     if (networkObject != null) {
//       console.log(`${username}'s network:`)
//       console.log(networkObject)
//     }
//   }
// }

// test()
