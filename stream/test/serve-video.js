import { createServer } from 'http';
import { stat, createReadStream } from 'fs';
import { promisify } from 'util';
const fileInfo = promisify(stat);
const fileName = './universe.mp4';
const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "*",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Credentials": "true",
    "Content-Type": "video/mp4"

}

createServer(async (req, res) => {
    const { size } = await fileInfo(fileName);
    // range request
    const range = req.headers.range;
    if (range) {
        let [start, end] = range.replace(/bytes=/, '').split('-');
        start = parseInt(start, 10);
        end = end ? parseInt(end, 10) : size - 1;
        res.writeHead(206, {
            ...headers,
            'Content-Range': `bytes ${start}-${end}/${size}`,
            'Content-Length': end - start + 1
        });
        createReadStream(fileName, { start, end }).pipe(res);
        return;
    }
    res.writeHead(200, headers);
    createReadStream(fileName).pipe(res);
}).listen(5000, () => {
    console.log('Server running at http://localhost:5000/');
});