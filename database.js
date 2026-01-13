
const { MongoClient } = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = "mongodb+srv://sudhanshu:vbYxHnxOH9HC87zY@sudhanshu.wgfeze9.mongodb.net/";
const client = new MongoClient(url);

// Database Name
const dbName = 'Hellowrold';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('user');
  console.log("DB Name:", dbName);


//   const findResult = await collection.find({}).toArray();
//   console.log('Found documents =>', findResult);
const data = {
    "firstName":"hello",
    "lastName":"world"
}

    const insertResult = await collection.insertMany([data]);
    console.log('Inserted documents =>', insertResult);

  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());