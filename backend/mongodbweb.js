import { createServer } from "node:http";
import { MongoClient } from "mongodb";

const url = "mongodb://localhost:27017";
const dbName = "mydb";
const client = new MongoClient(url);

(async () => {
  try {
    await client.connect();
    console.log("Connected correctly to server");
  } catch (err) {
    console.error("Error connecting to MongoDB", err);
  }
})();

const server = createServer(async (req, res) => {
  const db = client.db(dbName);
  const users = db.collection("users");
  const userList = await users.find({}).toArray();

  res.statusCode = 200;

  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(userList));
});

const host = "localhost";
const port = 3000;
server.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}/`);
});
