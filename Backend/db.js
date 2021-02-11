const { MongoClient } = require("mongodb");

class Database {
  #db_name='personal-network-tracker'
  #admin_username='admin'
  #admin_password='admin'
  #users_cn_name ='user-credentials'

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
    } finally {
      await client.close();
    }
  }
  
  async getNetwork(db_username, db_password, cn_name) {
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
    } finally {
      await client.close();
    }
  }
}

var db = new Database();
module.exports = db; 

// var uname='user-0';
// var pword='user-0';
// var cn_name='user-network-0';
// db.getNetwork(uname, pword, cn_name).catch(console.dir);

// var username = 'Summer';
// var password = 'password';
// db.checkLogin(username, password).catch(console.dir);