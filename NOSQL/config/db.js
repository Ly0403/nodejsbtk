const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const mongodbClient = new MongoClient(process.env.MONGOURL);

const getDB = () => {
  try {
    const db = mongodbClient.db("nodeapp");
    return db;
  } catch (error) {
    console.log(error);
  }
};


module.exports = getDB;
