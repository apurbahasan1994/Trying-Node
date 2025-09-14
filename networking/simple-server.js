// very simple tcp server
// we can use this to create tcp server
// lowest level of networking in nodejs
import net from 'net';
const clients = [];
// the socket is a duplex stream
const server = net.createServer((socket) => {
    socket.on('data', (data) => {
        console.log(clients);
        clients.forEach((client) => {
            if (client !== socket) {
                client.write(data);
            }
        });
    });
    socket.on('end', () => {
        console.log('Client disconnected');
    });
});

server.on('connection', (socket) => {
    clients.push(socket);
});

server.listen(8080, () => {
    console.log('Server started');
});
