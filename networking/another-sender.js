// very simple tcp server
// we can use this to create tcp server
// lowest level of networking in nodejs
import net from 'net';
import Readline from 'readline/promises';

const r2 = Readline.createInterface({
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

async function promptUser2(question, client) {
    const message = await r2.question(question + ' > ');
    client.write(message);
    moveCursor(0,-1);
    clearLine(0);
    promptUser2(question,client);
}

const client2 = net.createConnection({ host: "127.0.0.01", port: 8080 }, async () => {
    client2.on('data', async (data) => {
        console.log('message from client 1 = ',data.toString());
        await promptUser2('Message to client 1', client2);
    });
});
