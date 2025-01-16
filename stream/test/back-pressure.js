
/**
 * reading from one file and writing to another using streams.
 * It also handles the backpressure mechanism by pausing the 
 * read stream when the write stream's
 * buffer is full and resuming it when the buffer is drained.
 */
import fs from 'fs';

const read_file = './universe.mp4';
const write_file = './copy.mp4';

const fileReadStream = fs.createReadStream(read_file);
const fileWriteStream = fs.createWriteStream(write_file);

fileReadStream.on('data', (chunk) => {
    if (fileWriteStream.write(chunk) === false) {
        fileReadStream.pause();
    }
});

fileWriteStream.on('drain', () => {
    fileReadStream.resume();
});

fileReadStream.on('end', () => {
    fileWriteStream.end();
});

fileReadStream.on('error', (err) => {
    console.error('Error reading file:', err);
    fileWriteStream.end();
});

fileWriteStream.on('error', (err) => {
    console.error('Error writing file:', err);
    fileReadStream.destroy();
});