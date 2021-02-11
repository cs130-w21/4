const { MongoClient } = require("mongodb");

class Database {
  #db_name='personal-network-tracker'
  #admin_username='admin'
  #admin_password='admin'
  #users_cn_name ='user-credentials'
  #active_sessions= new Map(); /* key = session id, value = {db_username, db_password} */

  // parameters: app username and (hashed) password
  // returns: matching userObject, or null
  async checkLogin(username, password) {
    var uri =
    `mongodb+srv://${this.#admin_username}:${this.#admin_password}@cluster0.xpide.mongodb.net/${this.#db_name}?retryWrites=true&w=majority`;
    const client = new MongoClient(uri);
    try {
      await client.connect();

      const database = client.db(this.#db_name);
      const collection = database.collection(this.#users_cn_name);

      var query = { 'username' : username, 'password' : password };
      var userObject = await collection.findOne(query);

      console.log(`All the user info for ${username}:`);
      console.log(userObject);
      return userObject;
    } finally {
      await client.close();
    }
  }
  
  // parameters: session id corresponding to a logged in client, and the collection they want to access
  // returns: an iterator over all their contacts
  async getNetwork(session, cn_name) {
    var stored_session = this.#active_sessions.get(session)
    var db_username = stored_session.db_username
    var db_password = stored_session.db_password
    var uri =
    `mongodb+srv://${db_username}:${db_password}@cluster0.xpide.mongodb.net/${this.#db_name}?retryWrites=true&w=majority`;
    const client = new MongoClient(uri);
    try {
      await client.connect();

      const database = client.db(this.#db_name);
      const collection = database.collection(cn_name);

      var cursor = await collection.find();

      console.log(`All the contacts in the collection ${cn_name}:`);
      await cursor.forEach(console.dir);
      return cursor
    } finally {
      await client.close();
    }
  }

  init_session(session, db_uname, db_pword) {
    this.#active_sessions.set(session, { db_username: db_uname, db_password : db_pword })
  }
  end_session(session) {
    this.#active_sessions.delete(session)
  }
}

var db = new Database();
module.exports = db; 

// for debugging

// async function run() {
//   var username = 'Summer'
//   var password = 'password'
//   var userInfo = await db.checkLogin(username, password).catch(console.dir)
//   var db_username = userInfo.db_username
//   var db_password = userInfo.db_password
//   var collection = userInfo.collection
//   console.log(`db_username: ${db_username}, db_password: ${db_password}, collection: ${collection}`)
//   let session = 0 // replace with session token?
//   db.init_session(session, db_username, db_password)
//   await db.getNetwork(session, collection).catch(console.dir)
//   db.end_session(session)
// }

// run()
