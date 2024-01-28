const arr01 = [1, 2, 3, 4, 5, 6];

// ES5
for (let i = 0; i <= arr01.length; i++) {
  console.log(i);
}

// ES6
for (const v of arr01) {
  console.log(v);
}

for ( const e of arr01.entries()) {
  console.log(e); // [0 ,1] [1, 2] ...
}
for ( const k of arr01.keys()) {
  console.log(k); // 0 1 2 ...
}
for ( const v of arr01.values()) {
  console.log(v); // 1 2 3 ...
}
