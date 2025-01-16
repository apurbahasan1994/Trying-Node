import fs from 'fs';

const file = './universe.mp4';
const fileStream = fs.createReadStream(file);

fileStream.on('data', (chunk) => {
    console.log(chunk.length);
});

fileStream.on('end', () => {
    console.log('Stream ended');
});  

fileStream.pause();

process.stdin.on('data', (chunk) => {
    if(chunk.toString().trim() === 'end'){
        fileStream.resume();
    }
    fileStream.read();
})