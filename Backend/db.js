const { MongoClient } = require("mongodb");

class Database {
  #db_name='personal-network-tracker'
  #admin_username='admin'
  #admin_password='admin'
  #users_cn_name ='user-credentials'
  #active_sessions= new Map(); /* key = session id, value = {db_username, db_password} */

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

      // console.log(`All the user info for ${username}:`);
      // console.log(userObject);
      return userObject;
    } finally {
      await client.close();
    }
  }
  
  // parameters: session id corresponding to a logged in client, and the collection they want to access
  // returns: an iterator over all their contacts
  async queryNetworkObject(session, network_name) {
    var stored_session = this.#active_sessions.get(session)
    var db_username = stored_session.db_username
    var db_password = stored_session.db_password
    var cn_name = network_name || stored_session.collection
    var uri =
    `mongodb+srv://${db_username}:${db_password}@cluster0.xpide.mongodb.net/${this.#db_name}?retryWrites=true&w=majority`;
    const client = new MongoClient(uri);
    try {
      await client.connect()

      const database = client.db(this.#db_name)
      const collection = database.collection(cn_name)

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

      console.log(networkObject)
    } finally {
      await client.close();
    }
  }

  // stores some fields of userObject in active_sessions map
  // use this before queryNetworkObject
  init_session(session, userObject) {
    this.#active_sessions.set(session, 
      {db_username: userObject.db_username,
       db_password: userObject.db_password,
       collection:  userObject.collection})
  }
  end_session(session) {
    this.#active_sessions.delete(session)
  }
}

var db = new Database();
module.exports = db; 

// for debugging
// async function test() {
//   var username = 'Summer'
//   var password = 'password'
//   var userObject = await db.queryUserObject(username, password).catch(console.dir)
//   let session = 0 // replace with session token?
//   db.init_session(session, userObject)
//   await db.queryNetworkObject(session).catch(console.dir)
//   db.end_session(session)
// }

// test()
