/* eslint-disable require-jsdoc */
const connection = require('../config/db');

class Category {
  constructor(name) {
    this.name = name;
  }
  save() {
    return connection.execute('insert into categories (name) values (?)',[this.name]);
  }

  static getAll() {
    return connection.execute('select * from categories');
  }

  static getByID(id) {
    return connection.execute('select * from categories where id=?',[id] )
  }

  static update(category) {
    return connection.execute('update categories set name=? where id=?',[category.name, category.id] );
  }

  static delete(id) {
    return connection.execute('delete from categories where id=?',[id] )
  }
}

module.exports = Category;
