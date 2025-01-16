import {EventEmitter} from 'events';
import readLine from 'readline'; 
import createServer from './server.js';
const rl  = readLine.createInterface({input : process.stdin,output : process.stdout});

const client  = new EventEmitter();

const server = createServer(client);

let command,args;
rl.on('line',(input)=>{
    [command,...args] = input.split(' ');
    client.emit('command',command,args);
})


server.on('response',data=>{
    console.log(data);
})

