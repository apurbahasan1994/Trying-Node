import { Writable } from 'stream';

const myStream = new Writable();

const myError = new Error('My error');
myStream.destroy(myError);

myStream.on('error', (err) => {
    console.log('Got error:', err);
});