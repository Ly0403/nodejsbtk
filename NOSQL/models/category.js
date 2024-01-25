const {ObjectId} = require("mongodb");
const getDB = require("../config/db");

class Category {
  constructor(name, description) {
    this.name = name;
    this.description = description;
  }

  async save() {
    getDB().collection("categories").insertOne(this);
  }

  static async findAll() {
    const categories = await getDB()
        .collection("categories").find({}).toArray();
    return categories;
  }

  static async delete(id) {
    await getDB().collection("categories").deleteOne({_id: new ObjectId(id)});
  }
}

module.exports = Category;
