import fs from 'fs/promises';

async function writeMany() {
    const fileHandle = await fs.open('./test4.txt', 'w');
    const writeStream = fileHandle.createWriteStream();

    let i = 0;

    const write = () => {
        for (; i < 100000; i++) {
            const buffer = Buffer.from(` ${i} `);
            if (i === 100000 - 1) {
                writeStream.end(buffer); // Signal the end of writing
                return;
            }
            if (!writeStream.write(buffer)) {
                break; // Pause if the buffer is full
            }
        }
    };

    write();

    writeStream.on('drain', () => {
        write();
    });

    writeStream.on('finish', async () => {
        console.log('File writing completed.');
        await fileHandle.close(); // Close the file handle
        console.log('File handle closed.');
    });

    writeStream.on('error', async (err) => {
        console.error('Error during writing:', err);
        await fileHandle.close(); // Close the file handle even on error
    });
}

async function readMany() {
    const fileHandleRead = await fs.open('./test4.txt', 'r');
    const fileHandleWrite = await fs.open('./test5.txt', 'w');

    const streamRead = fileHandleRead.createReadStream({
        highWaterMark: 64 * 1024, // 64 KB buffer size
    });
    const streamWrite = fileHandleWrite.createWriteStream();

    streamRead.on('data', (chunk) => {
        const numbers = chunk.toString('utf-8').split(' ');
        numbers.forEach((n) => {
            const num = Number(n.trim());
            if (num % 2 === 0) {
                if (!streamWrite.write(` ${num} `)) {
                    streamRead.pause(); // Pause if backpressure occurs
                }
            }
        });
    });

    streamWrite.on('drain', () => {
        streamRead.resume();
    });

    streamRead.on('end', async () => {
        console.log('Reading completed.');
        streamWrite.end(); // End writable stream
    });

    streamWrite.on('finish', async () => {
        console.log('Writing completed.');
        await fileHandleRead.close(); // Close readable file handle
        await fileHandleWrite.close(); // Close writable file handle
        console.log('File handles closed.');
    });

    streamRead.on('error', async (err) => {
        console.error('Error during reading:', err);
        await fileHandleRead.close(); // Close file handle on error
    });

    streamWrite.on('error', async (err) => {
        console.error('Error during writing:', err);
        await fileHandleWrite.close(); // Close file handle on error
    });
}

// Uncomment to write the file first
// writeMany();

// Then read and process the file
readMany();
