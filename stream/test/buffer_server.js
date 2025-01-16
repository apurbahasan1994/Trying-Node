import fs from 'fs';
import http from 'http';

const file = './universe.mp4';
http.createServer((req, res) => {
    fs.readFile(file, (err, data) => {
        if (err) {
            console.log("oops", err);
            res.writeHead(500, { "Content-Type": "text/plain" });
            return res.end("Internal Server Error");
        }
        res.writeHead(200, { "Content-Type": "video/mp4" });
        res.end(data);
    });
}).listen(3000, () => console.log("Buffer Server started on http://localhost:3000"));