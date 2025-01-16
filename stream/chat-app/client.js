import net from 'net';
import { Writable } from 'stream';

function log(message){
    process.stdout.write(`\r${message}`);
}
const myWritable = new Writable({
    write(chunk, enc, callBack) {

        const data = JSON.parse(chunk);
        const {id,message} = data;
        if(message){
            log(`id = ${id} says ${message}`);
        }
        else{
            log(`My id = ${id}\n`);
        }
        callBack(null, chunk);
    }
})
process.stdin.pipe(net.connect(3000)).pipe(myWritable);

