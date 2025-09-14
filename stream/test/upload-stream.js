import { createServer } from 'http';
import { stat, createReadStream, createWriteStream } from 'fs';
const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "*",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Credentials": "true",
    "Content-Type": "text/html"

}

createServer(async (req, res) => {
    if (req.method === 'POST') {
        req.pipe(res);  
        return;
    }
    res.writeHead(200, headers);
    res.end(`<form enctype="multipart/form-data" method="post" action="/">
        <input type="file" name="upload-file" />
        <input type="submit" value="Upload" />
        </form>`);
}).listen(5000, () => {
    console.log('Server running at http://localhost:5000/');
});