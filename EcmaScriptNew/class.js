/* eslint-disable no-var */
// ES5

// constructor function
var Animal = function(name, year) {
  this.name = name;
  this.year = year;
};

Animal.prototype.calcAge = function() {
  return 2023 - this.year;
};

console.log(new Animal('aa', 1900).calcAge()); // 123

// ES6

class AnimalES6 {
  constructor(name, year) {
    this.name = name;
    this.year = year;
  }

  calcAge() {
    console.log(2018-this.year);
  }
}

new AnimalES6('bb', 2000).calcAge(); // 18
