const { MongoClient } = require("mongodb");

uname='user-0'
pword='user-0'
db_name='personal-network-tracker'
cn_name='user-network-0'

uri =
  `mongodb+srv://${uname}:${pword}@cluster0.xpide.mongodb.net/${db_name}?retryWrites=true&w=majority`;

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();

    const database = client.db(db_name);
    const collection = database.collection(cn_name);

    // Get the name and email of each person in the database
    projection = { _id: 0, name: 1, email: 1};
    cursor = await collection.find().project(projection);

    console.log('Name and email of every person:');
    await cursor.forEach(console.dir);

    // Find all the people affiliated with UCLA
    projection = { _id: 0}
    query = { 'organizations.value' : 'UCLA'};
    cursor = await collection.find(query).project(projection);

    console.log('All the info about people affiliated with UCLA:');
    await cursor.forEach(console.dir);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);