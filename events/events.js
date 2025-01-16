import { EventEmitter } from 'events';
import { readFile } from 'fs';
import { fileURLToPath } from 'url';

class Emitter extends EventEmitter {

}

// captureRejections will capture if we use async in handler and there is an error.
const myEmitter = new Emitter({ captureRejections: true });

// called on when new listener is added
myEmitter.on('newListener', (args) => {
    console.log('new listener added', args);
})

// called on when a listener is removed.
myEmitter.on('removeListener', (args) => {
    console.log('listener removed', args);
})

// handling the event
myEmitter.on('foo', function (...args) {
    console.log(args);
    console.log(this == myEmitter);
});
myEmitter.on('foo', function (...args) {
    console.log(args);
    console.log(this == myEmitter);
});
myEmitter.on('foo', function (...args) {
    console.log(args);
    console.log(this == myEmitter);
});

// firing event
myEmitter.emit('foo', 42);


process.nextTick(() => {
    myEmitter.emit('foo', 42, 45, 47);
});

// we can get the value of an event like this. all the value are passed an array [42,45,47]
//this is one time. only one event
const value = await EventEmitter.once(myEmitter, 'foo');
console.log(value);

myEmitter.on('error', (error) => {
    console.log(error);
})

myEmitter.emit('error', new Error('Went wrong'));

myEmitter.on('async', async () => {
    throw new Error('Kaboom');
})


// all the event names;
console.log(myEmitter.eventNames());
//listener count for a specfic event
console.log(myEmitter.listenerCount('foo'));
myEmitter.emit('async');



class MyLogEmitter extends EventEmitter {

    execute(asyncFunc,...args) {
        console.log(args)

        asyncFunc(...args, (error, data) => {
            if (error) {
                this.emit('error', error);
            }
            else {
                this.emit('data', data.toString('utf-8'));
            }
            this.emit('finish');
            return;
        })

    }

}

const myLogEmitter = new MyLogEmitter();

// const filePath = fileURLToPath('../file/index.txt');
// console.log(filePath);

myLogEmitter.execute(readFile,'./file/index.txt');

myLogEmitter.on('data',(data)=>{
    console.log(data);
})

myLogEmitter.on('error',(data)=>{
    console.log(data);
})