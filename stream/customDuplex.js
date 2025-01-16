import { Duplex } from 'stream'
class CustomDuplex extends Duplex {

    constructor({ writableHighWaterMark, readableHighWaterMark, readableFile, writableFile }) {
        super({writableHighWaterMark,readableHighWaterMark})
        this.readableFile = readableFile;
        this.writableFile = writableFile;
        this.readfd = null;
        this.writefd = null;
    }

    _construct(callBack) {
            open(this.readableFile, 'r', (err, fd) => {
                if (err) {
                    callBack(err);
                    return;
                }
                else {
                    this.readfd = fd;
                    callBack();
                }
            })
        }

}