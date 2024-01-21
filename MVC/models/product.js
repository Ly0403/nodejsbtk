/* eslint-disable require-jsdoc */
const products = [];

class Product {
  constructor(name, image, description, categoryId) {
    this.id = Math.floor(Math.random()*9999999)+1;
    this.name = name;
    this.image = image;
    this.categoryId = categoryId;
    this.description = description;
  }
  save() {
    products.push(this);
  }

  static getAll() {
    return products;
  }

  static getByID(id) {
    return products.find((v)=>v.id == id);
  }

  static getByCategoryID(id) {
    return products.filter((v)=>v.categoryId == id);
  }

  static update(product) {
    const item = products.findIndex((v)=>v.id == product.id);
    products[item]=product;
  }

  static delete(id) {
    const index = products.findIndex((v)=>v.id === id);
    products.splice(index, 1);
  }
}

module.exports = Product;
