import fs from 'fs';

const read_file = './universe.mp4';
const write_file = './copy.mp4';

const fileReadStream = fs.createReadStream(read_file);
const fileWriteStream = fs.createWriteStream(write_file);
// do neet to handle backpressure
fileReadStream.pipe(fileWriteStream).on('error', (err) => { console.error('Error:', err); });
