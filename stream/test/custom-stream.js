import { Readable } from 'node:stream';

class MyStream extends Readable {
    #count = 0;
    _read(size) {
        const chunk = ':-)';
        console.log(`Pushing chunk: ${chunk}`);
        this.push(chunk);
        if (++this.#count === 5) {
            this.push(null);
        }
    }
}

const stream = new MyStream({
    highWaterMark: 1,
});

stream.on('readable', () => {
    console.count('>> readable event');
    let chunk;
    while ((chunk = stream.read()) !== null) {
        console.log(`Read chunk: ${chunk.toString()}`); // Process the chunk
    }
});

stream.on('end', () => console.log('>> end event'));
