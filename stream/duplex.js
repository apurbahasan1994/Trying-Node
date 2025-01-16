import { createReadStream, createWriteStream } from 'fs';
import { Duplex, PassThrough } from 'stream';

const readStream = createReadStream('./test.txt');
const writeStream = createWriteStream('./test2.txt');

const report = new PassThrough();

let size = 0;
report.on('data', (chunk) => {
    size += chunk.length;
    console.log('Bytes of data so far = ' + size);
})
// readStream.pipe(report).pipe(writeStream);

class Throttle extends Duplex {

    constructor(ms) {
        super();
        this.delay = ms;
    }

    _write(chunk, encoding, callBack) {
        this.push(chunk);
        setTimeout(() => {
            callBack();
        }, this.delay);
    }
    _read() {

    }

    // clear out the write stream, when there is no more data to be written
    // the read stream is done and we can close the write stream
    _final(){

        // this.push('this is the end');
        // it will notify the read stream that there is no more data to be read
        this.push(null);
    }

}
const throttle = new Throttle(1000);


readStream.pipe(throttle).pipe(report).pipe(writeStream);