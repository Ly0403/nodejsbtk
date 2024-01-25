/* eslint-disable require-jsdoc */
const {ObjectId} = require('mongodb');
const getDB = require('../config/db');

class Product {
  constructor(name, image, description, categoryIds, userId) {
    this.name = name;
    this.image = image;
    this.description = description;
    this.categoryIds = categoryIds;
    this.userId = userId;
  }

  async save() {
    try {
      await getDB().collection("products").insertOne(this);
    } catch (error) {
      console.log(error);
    }
  }

  static async update(data) {
    try {
      data._id = new ObjectId(data.id);
      delete data.id;
      getDB().collection("products")
          .updateOne({_id: data._id}, {$set: data});
    } catch (error) {
      console.log(error);
    }
  }

  static async findAll(query) {
    try {
      let products = getDB().collection("products").find(query);
      products = await products.toArray();
      return products;
    } catch (error) {
      console.log(error);
    }
  }

  static async findById(id) {
    try {
      const product = await getDB().collection("products")
          .findOne({_id: new ObjectId(id)});
      return product;
    } catch (error) {
      console.log(error);
    }
  }

  static async findByCategoryId(id) {
    try {
      const products = await getDB().collection("products")
          .find({categoryIds: id} ).toArray();
      return products;
    } catch (error) {
      console.log(error);
    }
  }

  static async delete(id) {
    try {
      await getDB().collection("products")
          .deleteOne({_id: new ObjectId(id)});
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Product;
