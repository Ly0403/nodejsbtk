/* eslint-disable prefer-spread */
/* eslint-disable prefer-rest-params */
// SPREAD
// ES5 Sum

const nums = [1, 2, 3];

function sum(a, b, c) {
  console.log( a + b + c);
}

sum.apply(null, nums);

// ES6
sum(...nums);


const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
console.log([...arr1, ...arr2]);

// REST

// ES5
function sum02() {
  const args = Array.prototype.slice.call(arguments); // convert object to array
  const result = args.reduce((a, b) => a + b, 0);
  console.log(result);
}

sum02(1, 2, 3, 4);

// ES6
function sum03(...args) {
  const result = args.reduce((a, b) => a + b, 0);
  console.log(result);
}

sum03(1, 2, 3, 4);
