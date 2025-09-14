import { createServer } from 'http';
import { createReadStream } from 'fs';
import { Readable, Transform } from 'stream';
import { WritableStream } from 'stream/web';
import csvtojson from 'csvtojson';
const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "*",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Credentials": "true"
}

const port = 5000;

function createWritableStream(res) {
    return new WritableStream({
        write(chunk) {
            res.write(chunk);
        },
        close() {
            res.end();
        }
    })
}

function createTransformStream() {
    return new TransformStream({
        transform(chunk, control) {
            const rawData = JSON.parse(Buffer.from(chunk));
            const selectedData = JSON.stringify({
                title: rawData.Title,
                vote: rawData.Votes,
                rating: rawData.Rating
            })

            control.enqueue(selectedData.concat('\n'));
        }
    })
}
function createAbortController(request) {
    const abortController = new AbortController();
    request.once('close', () => {
        abortController.abort();
    });
    return abortController;
}
async function handleRequest(request, response) {
    response.writeHead(200, headers);
    if (request.method === 'OPTIONS') {
        response.writeHead(204, headers);
        response.end();
        return;
    }
    const abortController = createAbortController(request);
    try {
        await Readable.toWeb(createReadStream('./IMDB-Movie-Data.csv'))
            .pipeThrough(Transform.toWeb(csvtojson()))
            .pipeThrough(createTransformStream())
            .pipeTo(createWritableStream(response), {
                signal: abortController.signal
            })
    }
    catch (error) {
        if (error.name === 'AbortError') {
            console.log('Stream ended');
        }
        else {
            response.statusCode = 500;
            response.end('Internal server error');
        }
    }
}

createServer(handleRequest).listen(port, () => {

})