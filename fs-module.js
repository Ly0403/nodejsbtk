const fs = require("fs");

// fs.readFile("index.html",'utf-8', (err, res) => {
//   err ? console.log(err) : console.log(res);
// });

// fs.readdir('./',(err,res)=>{
//     err?console.log(err):console.log(res);
// });

// fs.writeFile('test.txt','Test text..',(err)=>{
//     err?console.log(err):console.log('File was created');
// });

// fs.appendFile('test2.txt','\nTest text..',(err)=>{
//     err?console.log(err):console.log('File was created');
// });

// fs.unlink('test2.txt',(err)=>{
//     err?console.log(err):console.log('File was deleted');
// });

fs.rename('test2.txt.','test2.txt',(err)=>{
    err?console.log(err):console.log('File was renamed');
});