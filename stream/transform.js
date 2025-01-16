import { Transform } from "stream";

class ChangeText extends Transform{
    constructor(char){
        super();
        this.replaceChar = char;
    }

    _transform(chunk,encoding,callBack){
        const transformedChunk = chunk.toString().replace(/[a-zA-Z0-9]/g, this.replaceChar);
        this.push(transformedChunk);
        callBack();
    }

    _flush(callBack){
        this.push('More chunk of data is being passed....')
        callBack();
    }

}

const transformrer = new ChangeText("😜");

process.stdin.pipe(transformrer).pipe(process.stdout);