import net from 'net';
import { randomUUID } from 'node:crypto';
import { Writable } from 'stream';
const clients = new Map();
const server = net.createServer((socket) => {
    socket.pipe(broadCastViaStream(socket));
});
const boradcastToClient = (senderSocketId,data) =>{
    [...clients.values()].filter((socket)=> socket.id !== senderSocketId)
    .forEach((socket)=>socket.write(data));
}
const broadCastViaStream = (socket) => {
    return new Writable({
        write(chunk, enc, callBack) {
            const data = JSON.stringify({
                message: chunk.toString(),
                id: socket.id.slice(0, 5)
            })
            boradcastToClient(socket.id,data);
            callBack(null, chunk);
        }
    })
}
server.listen(3000, () => {
    console.log('Server is listing port 30000');
});

server.on('connection', (socket) => {
    socket.id = randomUUID();
    clients.set(socket.id, socket);

    socket.write(JSON.stringify({
        id: socket.id.slice(0, 5)
    }))

    server.on('close', () => {
        clients.delete(socket.id);
    })
})

