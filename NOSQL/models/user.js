const getDb =require("../config/db");
const Product = require("./product");

class User {
  constructor(name, email, cart, orders, id) {
    this.name = name;
    this.email = email;
    this.cart = cart ?? {};
    this.cart.items = cart.items ?? [];
    this.orders = orders ?? [];
    this._id = id;
  }

  async getCart() {
    const user = await getDb().collection("users").findOne({_id: this._id});
    if (user.cart.items.length === 0) return user.cart;
    const products = [];
    for (const v of this.cart.items) {
      const product = await Product.findById(v.productId);
      product.quantity = v.quantity;
      products.push(product);
    }
    user.cart.items= products;
    return user.cart;
  }

  async deleteCart(id) {
    const user = await getDb().collection("users").findOne({_id: this._id});
    const currentItems = user.cart.items;
    const delIndex = currentItems.findIndex((v)=> v.productId === id );
    currentItems.splice(delIndex, 1);
    await getDb().collection("users")
        .updateOne({_id: this._id}, {$set: {cart: {items: currentItems}}});
  }

  async addCart(productId) {
    let isExists = false;
    this.cart.items.map((v) => {
      if (v.productId === productId) {
        v.quantity +=1;
        isExists = true;
        return v;
      }
      return v;
    });
    if (!isExists) this.cart.items.push({productId: productId, quantity: 1});
    await getDb().collection("users")
        .updateOne({_id: this._id}
            , {$set: {cart: {items: this.cart.items}}} );
  }

  async getOrders() {
    const user = await getDb().collection("users").findOne({_id: this._id});
    return user.orders;
  }

  async createOrder() {
    const user = await getDb().collection("users").findOne({_id: this._id});
    const products = [];
    for (const v of this.cart.items) {
      const product = await Product.findById(v.productId);
      product.quantity = v.quantity;
      products.push(product);
    }
    user.orders.push({
      products,
    });
    await getDb().collection("users").updateOne({_id: this._id}, {$set: {
      cart: {items: []},
      orders: user.orders,
    }});
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
