const Logger=require('./logger');
const logger=new Logger();

logger.on('eventName',(name)=>{
    console.log(name);
});

logger.log('log messsage');