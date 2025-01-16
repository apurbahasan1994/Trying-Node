// readable stream reads from a sourece and feeds into the pipe of the stream bit by bit.
// The source can be a file, a network socket, or any other source of data.
import {Readable} from 'stream';
import fs from 'fs/promises';
const rivers = [
    "Amazon",
    "Nile",
    "Yangtze",
    "Missisippi",
    "Ganges",
    "Danube",
    "Mekong"
];
//reading data by line by line
class ArrayStream extends Readable{
    constructor(arr){
        super();
        this.arr = arr;
        this.index=0;
    }
    // this is mandatory to implement 
    _read(){
        if(this.index > this.arr.length){
            //  null is used to signal the end of the stream
            this.push(null);
            return;
        }
        // push the data into the stream
        this.push(this.arr[this.index]);
        this.index++;
    }
}

const riverStream = new ArrayStream(rivers);

// reading the data from the stream
riverStream.on('data',(chunk)=>{
    console.log(chunk.toString());
});
// when the stream ends
riverStream.on('end',()=>{
    console.log('Stream ended');
})


process.stdin.on('data',(data)=>{
    console.log(data.toString());
})


const readData = (async () => {
    // create a file
    const fileHandleRead = await fs.open('./test.txt');
    const fileHandleWrite = await fs.open('./test2.txt');

    const streamRead = fileHandleRead.createReadStream({
        highWaterMark: 64 * 1024
    });

    const streamWrite = fileHandleWrite.createWriteStream();


    streamRead.on('data',(chunk)=>{

        // if the backpressure is heavy that pause
        if(!streamWrite.write()){
            streamRead.pause();
        }
    })

    streamWrite.on('drain',()=>{
        // when the write is done resume the read.
        streamRead.resume();
    })
})