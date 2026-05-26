const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env' });

const uri = process.env.MONGODB_URI;

async function run() {
  if (!uri) {
    console.error("No MONGODB_URI found in .env file.");
    process.exit(1);
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("✅ Database se successfully connect ho gaya hai!");
    const adminDb = client.db('admin');
    const info = await adminDb.command({ ping: 1 });
    console.log("✅ Server Ping Response:", info);
  } catch (error) {
    console.error("❌ Connection failed!", error);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
