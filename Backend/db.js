const { MongoClient } = require("mongodb");

class Database {
  #db_name='personal-network-tracker'
  #admin_username='admin'
  #admin_password='admin'
  #users_cn_name ='user-credentials'

  // parameters: app username and (plaintext) password
  // returns: matching userObject, or null
  async queryUserObject(username, password) {
    var uri =
    `mongodb+srv://${this.#admin_username}:${this.#admin_password}@cluster0.xpide.mongodb.net/${this.#db_name}?retryWrites=true&w=majority`;
    const client = new MongoClient(uri);
    try {
      await client.connect();

      const database = client.db(this.#db_name);
      const collection = database.collection(this.#users_cn_name);

      var query = { 'username' : username, 'password' : password };
      var userObject = await collection.findOne(query);

      return userObject;
    } finally {
      await client.close();
    }
  }
  
  // parameters: 
  //   db_username: the client's mongoDB username
  //   cb_password: the client's mongoDB password
  //   network_name: the collection they want to access
  // returns: a networkObject
  async queryNetworkObject(db_username, db_password, network_name) {
    var uri =
    `mongodb+srv://${db_username}:${db_password}@cluster0.xpide.mongodb.net/${this.#db_name}?retryWrites=true&w=majority`;
    const client = new MongoClient(uri);
    try {
      await client.connect()

      const database = client.db(this.#db_name)
      const collection = database.collection(network_name)

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
    } finally {
      await client.close();
    }
  }
}

var db = new Database();
module.exports = db; 

//// for debugging
// async function test() {
//   var username = 'Summer'
//   var password = 'password'
//   var userObject = await db.queryUserObject(username, password).catch(console.dir)
//   console.log(`User info for ${username}:`);
//   console.log(userObject);

//   var db_username = userObject.db_username
//   var db_password = userObject.db_password
//   var collection = userObject.collection
//   var networkObject = await db.queryNetworkObject(db_username, db_password, collection).catch(console.dir)
//   console.log(`${username}'s network:`)
//   console.log(networkObject)
// }

// test()
