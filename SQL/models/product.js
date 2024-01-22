/* eslint-disable require-jsdoc */
const connection = require('../config/db');

class Product {
  constructor(name, image, description, categoryId) {
    this.name = name;
    this.image = image;
    this.categoryId = categoryId;
    this.description = description;
  }
  save() {
    connection.execute("insert into products(name, image, description, categoryId) values (?,?,?,?)",[this.name,this.image,this.description,Number(this.categoryId)] );
  }

  static getAll() {
    return connection.execute('select * from products');
  }

  static getByID(id) {
    return connection.execute('select * from products where id=?',[id]);
  }

  static getByCategoryID(id) {
    return connection.execute('select * from products where categoryId=?',[id] );
  }

  static update(product) {
    return connection.execute('update products set name=?, image=?, description=?, categoryId=? where id=?',[product.name, product.image, product.description, Number(product.categoryId),product.id] );
  }

  static delete(id) {
    return connection.execute('delete from products where id=?', [id]);
  }
}

module.exports = Product;
