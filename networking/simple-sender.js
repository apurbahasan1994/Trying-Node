// very simple tcp server
// we can use this to create tcp server
// lowest level of networking in nodejs
import net from 'net';
import Readline from 'readline/promises';

const rl = Readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const clearLine = (dir) => {
    return new Promise((resolve, reject) => {
        process.stdout.clearLine(dir, () => {
            resolve();
        });
    });
}

const moveCursor = (dx, dy) => {
    return new Promise((resolve, reject) => {
        process.stdout.moveCursor(dx, dy, () => {
            resolve();
        });
    });
}
const client1 = net.createConnection({ host: "127.0.0.01", port: 8080 }, async () => {
    client1.on('data', (data) => {
        moveCursor(0, -1);
        clearLine(0);
        console.log('message from client 2 = ', data.toString());
        promptUser('Message to client 2', client1);
    });
    await promptUser('Message to client 2', client1);
});

async function promptUser(question, client) {
    moveCursor(0, -1);
    clearLine(0);
    const message = await rl.question(question + ' > ');
    client.write(message);
}
