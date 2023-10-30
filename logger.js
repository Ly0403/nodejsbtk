const EventEmitter = require("events");

class Logger extends EventEmitter{
   log=(logMsg)=>{
    console.log(logMsg);
    this.emit('eventName','test');
   }
}

module.exports=Logger;