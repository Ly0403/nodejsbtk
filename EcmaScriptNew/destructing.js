const arr01 = [1, 2, 3, 4, 5, 6, 7, 8];

const [a, b, ...rest] = arr01;
console.log(a, b, rest); // 1 2 [3, 4, 5, 6, 7, 8]

const obj01 = {
  c: 1,
  d: 2,
  e: 3,
  f: 4,
};

const {c, d, ...rest2} = obj01;
console.log(c, d, rest2); // 1 2 {e:3, f:4}

// ES5
const a1 = arr01[0];
const a2 = arr01[1];
const a3 = arr01[2];

console.log(a1, a2, a3);

// ES6
const [a4, a5, a6] = arr01;
console.log(a4, a5, a6);

// ES5
const o1 = obj01.c;
const o2 = obj01.d;
const o3 = obj01.e;
const o4 = obj01.f;
console.log(o1, o2, o3, o4);

// ES6
const {c: o5, d: o6, e: o7, f: o8} = obj01;
console.log(o5, o6, o7, o8);


const obj03 = {
  z: 1,
  y: 2,
};

const {z, y, x} = obj03;
console.log(z, y, x); // 1 2 undefined

const obj04 = {
  k: 1,
  l: 2,
};

const {k, l, m = 3} = obj04;
console.log(k, l, m); // 1 2 3
