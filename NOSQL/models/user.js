const {ObjectId} = require("mongodb");
const getDb =require("../config/db");
const Product = require("./product");

class User {
  constructor(name, email, cart, id) {
    this.name = name;
    this.email = email;
    this.cart = cart ?? {};
    this.cart.items = cart.items ?? [];
    this.id = id;
  }

  async getCart() {
    const user = await getDb().collection("users").findOne({_id: this.id});
    const productIds =
        user.cart.items.map((item)=>new ObjectId(item.productId));
    const products =
        await Product.findAll({_id: {$in: productIds}} );
    return products;
  }

  async deleteCart(id) {
    const user = await getDb().collection("users").findOne({_id: this.id});
    const currentItems = user.cart.items;
    const delIndex = currentItems.findIndex((v)=> v.productId === id );
    currentItems.splice(delIndex, 1);
    await getDb().collection("users")
        .updateOne({id: this.id}, {$set: {cart: {items: currentItems}}});
  }

  async addCart(productId) {
    let isExists = false;
    this.cart.items.map((v) => {
      if (v.productId == productId) {
        v.quantity +=1;
        isExists = true;
        return v;
      }
      return v;
    });
    if (!isExists) this.cart.items.push({productId: productId, quantity: 1});
    await getDb().collection("users")
        .updateOne({_id: this.id}
            , {$set: {cart: {items: this.cart.items}}} );
  }

  async save() {
    try {
      const user = await getDb().collection("users").insertOne(this);
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  static async findByName(name) {
    try {
      const user = await getDb().collection("users").findOne({name: name});
      return user;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = User;
