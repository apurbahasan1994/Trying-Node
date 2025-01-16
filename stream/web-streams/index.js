import { ReadableStream, WritableStream, TransformStream} from 'stream/web';
import { setInterval } from 'timers/promises';
const redable = new ReadableStream({

    async start(controller) {
        let counter = 0;
        for await (const i of setInterval(300)) {
            controller.enqueue(`Message # ${counter}`);
            counter++;
        }
    }


});

const writable = new  WritableStream({
    write(chunk){
        console.log(chunk);
    }
})

// redable.pipeTo(writable);

// transforming web streams 

const transform = new TransformStream({
    transform(chunk,controller){
        controller.enqueue(chunk.toString()+' Hello')
    }
})

redable.pipeThrough(transform).pipeTo(writable);