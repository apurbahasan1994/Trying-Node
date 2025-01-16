import { Writable } from 'stream';
import { open, write, close } from 'fs';

class CustomWritable extends Writable {
    constructor({ highWaterMark, fileName }) {
        super({ highWaterMark, construct: true });
        this.fileName = fileName;
        this.fd = null;
        this.chunks = [];
        this.chunkSize = 0;
    }

    /**
     * Called just after the constructor.
     * If the callback is not called, no other method will be called.
     * After calling the callback, other methods like _write will be called.
     */
    _construct(callBack) {
        console.log('_construct');
        open(this.fileName, 'w', (err, fd) => {
            console.log(fd);
            if (err) {
                callBack(err);
                return;
            }
            this.fd = fd;
            callBack();
        });
    }

    /**
     * Called whenever data is written to the stream using the write method.
     * Handles the actual writing of data to the underlying resource.
     */
    _write(chunk, encoding, callBack) {
        this.chunks.push(chunk);
        this.chunkSize += chunk.length;
        if (this.chunkSize > this.writableHighWaterMark) {
            write(this.fd, Buffer.concat(this.chunks), (err) => {
                if (err) {
                    callBack(err);
                    return;
                } else {
                    this.chunks = [];
                    this.chunkSize = 0;
                    callBack();
                }
            });
        } else {
            callBack();
        }
    }

    /**
     * Called when the end method is called on the stream.
     * Performs any final operations needed to complete the writing process.
     */
    _final(callBack) {
        write(this.fd, Buffer.concat(this.chunks), (err) => {
            if (err) {
                callBack(err);
                return;
            } else {
                this.chunks = [];
                callBack();
            }
        });
    }

    /**
     * Called when the stream is destroyed.
     * Performs cleanup operations, such as closing the file descriptor.
     */
    _destroy(error, callBack) {
        if (this.fd) {
            close(this.fd, (err) => {
                callBack(err || error);
            });
        } else {
            callBack(error);
        }
    }
}

const customWriter = new CustomWritable({
    highWaterMark: 1800,
    fileName: 'test6.txt'
});

customWriter.write(Buffer.from('Happy new year man!'));
customWriter.end(Buffer.from('This is the end'));