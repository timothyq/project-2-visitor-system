import res from "express/lib/response.js";
import { MongoClient } from "mongodb";

function MyMongoDB() {
  const myDB = {};
  const url = process.env.MONGO_URL || "mongodb://localhost:27017";
  const DB_NAME = "visitorSystem";
  const COLLECTION_LOGIN = "users";
  const COLLECTION_VISIT = "visitors";

  // Get all visitors
  myDB.fetchVisitors = async () => {
    const client = new MongoClient(url);

    const db = client.db(DB_NAME);
    const visitCol = db.collection(COLLECTION_VISIT);

    const res = await visitCol.find().toArray();
    console.log("res", res);
    return res;
  };

  // Verify log in for user
  myDB.authenticate = async (user) => {
    const client = new MongoClient(url);

    const db = client.db(DB_NAME);
    const usersCol = db.collection(COLLECTION_LOGIN);
    console.log("searching for", user);
    const res = await usersCol.findOne({ user: user.user });

    // Can't find user in db
    if (res == null || res == undefined) {
      return false;
    }

    console.log("res", res, res.password == user.password);
    if (res.password == user.password) return true;
    return false;
  };

  // add visitor to DB
  myDB.addVisitor = async (visitor) => {
    const client = new MongoClient(url);

    const db = client.db(DB_NAME);
    const visitCol = db.collection(COLLECTION_VISIT);

    res = await visitCol.insertOne(visitor);

    return res;
  };

  //delete visitor from DB by id
  myDB.deleteVisitor = async (id) => {
    const filter = { _id: new ObjectId(id) };

    const client = new MongoClient(url);

    const db = client.db(DB_NAME);
    const visitCol = db.collection(COLLECTION_VISIT);

    res = await visitCol.deleteOne(filter);
    return res;
  };

  return myDB;
}

export default MyMongoDB();
