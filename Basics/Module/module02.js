// const module01 = require('./module01');
const {pubFunc01, publicVar} = require('./module01');

// console.log(module01.publicVar);
// module01.pubFunc01('testData');
// console.log(module01.privateVar);


console.log(publicVar);
pubFunc01('testData');
// console.log(privateVar); // not reachable
