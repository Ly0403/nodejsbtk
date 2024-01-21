/* eslint-disable require-jsdoc */
const categories = [];

class Category {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
  save() {
    categories.push(this);
  }

  static getAll() {
    return categories;
  }

  static getByID(id) {
    return categories.find((v)=>v.id == id);
  }

  static update(category) {
    const item = categories.findIndex((v)=>v.id == category.id);
    categories[item]=category;
  }

  static delete(id) {
    const index = categories.findIndex((v)=>v.id === id);
    categories.splice(index, 1);
  }
}

module.exports = Category;
