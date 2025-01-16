import { Readable } from 'stream';
import { open, read, close } from 'fs';
class CustomRead extends Readable {

    constructor({ hightWaterMarkValue, fileName }) {
        super({ highWaterMark: hightWaterMarkValue });
        this.fileName = fileName;
        this.fd = null;
    }

    _construct(callBack) {
        open(this.fileName, 'r', (err, fd) => {
            if (err) {
                callBack(err);
                return;
            }
            else {
                this.fd = fd;
                callBack();
            }
        })
    }

    _read(size) {
        const buff = Buffer.alloc(size);
        read(this.fd, buff, 0, size, null, (err, bytesRead) => {
            if (err) {
                this.destroy(err);
                return;
            }
            else {
                this.push(bytesRead > 0 ? buff.subarray(0, bytesRead) : null);
            }
        })
    }

    _destroy(error, callback) {
        console.log('ds')
        if (error) {
            close(this.fd, (err) => {
                console.log('here')
                callback(error || err);
            });
            return;
        }
        callback(error);

    }
}

const customReader = new CustomRead({ hightWaterMarkValue: 1200, fileName: 'test6.txt' });

customReader.on('data', (data) => {
    console.log(data);
})

customReader.on('end', () => {
    console.log('enede');
})