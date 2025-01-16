import fs from 'fs';
import http from 'http';

const file = './universe.mp4';
http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "video/mp4" });
    const stream = fs.createReadStream(file);
    stream.pipe(res).on('error', console.error);
}).listen(3000, () => console.log("Stream Server started on http://localhost:3000"));