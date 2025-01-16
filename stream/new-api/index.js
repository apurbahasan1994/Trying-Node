import { pipeline } from 'stream/promises';
import {setTimeout} from 'timers/promises'
async function* myReadable() {
    yield Buffer.from('Who I am');
    await setTimeout(1000);
    yield Buffer.from('Who I am 2');
    yield Buffer.from('Who I am 3');
    yield Buffer.from('Who I am 4');
}

async function* myTransform(stream) {
    for await (const chunk of stream) {
        yield chunk.toString();
    }
}


async function* myWritable(stream) {
    for await (const chunk of stream) {
        console.log(chunk.toString());
    }
}

await pipeline(myReadable, myTransform, myWritable);