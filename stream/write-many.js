import { open, writeSync } from "fs";
import { open as openWihtPromise } from 'fs/promises';


// (async () => {
//     open("test.txt", 'w', (err, fd) => {
//         for (let i = 0; i < 100000; i++) {
//             const buff = Buffer.from(`${i}`, "utf-8");
//             writeSync(fd, buff);
//         }
//     })
// })();

const writeManyWithCallBack = () => open("test.txt", 'w', (err, fd) => {
    for (let i = 0; i < 100000; i++) {
        const buff = Buffer.from(`${i}`, "utf-8");
        writeSync(fd, buff);
    }
});

// writeManyWithCallBack();


// we can create stream using the fileHandle

const writeManyWithSream = async () => {

    // creating a fileHandling object
    const fileHandle = await openWihtPromise("test.txt", 'w');

    // create a writeable stream 
    const stream = fileHandle.createWriteStream();

    // writing to file using the stream
    //but this will take a lot of memory
    for (let i = 0; i < 100000; i++) {
        const buff = Buffer.from(`${i}\n`, "utf-8");
        stream.write(buff);
    }
    fileHandle.close();
}

// await writeManyWithSream()


// solving the memory issue
const solveManyWithSream = async () => {

    // creating a fileHandling object
    const fileHandle = await openWihtPromise("test.txt", 'w');

    // create a writeable stream 
    const stream = fileHandle.createWriteStream();

    //The size of the writable value, inter buffer value
    console.log(stream.writableHighWaterMark);
    // How much is available to fill
    console.log(stream.writableLength);

    stream.on('drain', (s) => {
        writeMany();
    })

    let i = 0;
    const writeMany = () => {
        while (i < 1000000) {
            const buff = Buffer.from(`${i}\n`, "utf-8");
            if (i === (1000000 - 1)) {
                // this is our last write
                stream.end(buff);
                return;
            }
            i++;
            if (!stream.write(buff)) {
                break;
            }
        }

    }
    writeMany();

    stream.on('finish', () => {
        console.log('Finisehd');
        fileHandle.close();
    })
}

solveManyWithSream();