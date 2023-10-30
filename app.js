const name="XXXYYY"


// immediately invoked function expressions (IIFE)
// (function test(){
//     console.log(name)
// })()

// const scopeA=(function testA(){
//     //private
//     const privateA="aaa"
//     // public
//     const log=function(){
//         console.log(privateA)
//     }
//     return {log}
// })()

// Modules

const variableA="test"
//private variable
const variableB="test2"
const log=function(name){
    console.log("log function"+name)
}
// module.exports.logexport=log;
// module.exports={
//     logexport:log,
//     var:variableA
// }
module.exports={
    log,
    variableA
}

// // dirname and filename
// console.log(__filename);
// console.log(__dirname);

// path module
// const path=require('path');
// const file=path.parse(__filename);
// console.log(file);

// url module
const url=require('url');
const website="https://www.btkakademi.gov.tr/portal/course/player/deliver/node-js-ile-web-programlama-14301?query=11&aaa=bbb";
const parsedURL=url.parse(website);
console.log(parsedURL);
