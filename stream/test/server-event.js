import http from 'http';

const server = http.createServer((req, res) => {
    let bod = '';

    req.setEncoding('utf8');

    req.on('data', (chunk) => {
        bod += chunk;
    });

    req.on('end', () => {
        try {

            const data = JSON.parse(bod);
            res.write(bod);
            res.end();

        }
        catch (err) {
            res.statusCode = 400;
            res.end(`error: ${err.message}`);
            return;
        }
    });
});

server.listen(3000);


