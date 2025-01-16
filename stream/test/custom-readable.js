import { Readable } from 'stream';

class MyCustomReadable extends Readable {
    constructor() {
        super({ objectMode: false, highWaterMark: 1024 });
        this.index = 0;
    }

    _read() {
        if (this.index > 5) {
            this.push(null);
            return;
        }
        this.push(this.index.toString()+'hello world');
        this.index++;
    }
}

const myCustomReadable = new MyCustomReadable();
myCustomReadable.on('data', (chunk) => {
    console.log(chunk);
});