import { Transform } from "stream";

class ChangeText extends Transform {
    constructor(char) {
        super();
        this.replaceChar = char; // Initialize the character to replace alphanumeric characters with
    }

    /**
     * Called whenever there is data available to be transformed.
     * Handles the transformation of the input data.
     */
    _transform(chunk, encoding, callBack) {
        // Convert the chunk to a string and replace all alphanumeric characters with this.replaceChar
        const transformedChunk = chunk.toString().replace(/[a-zA-Z0-9]/g, this.replaceChar);
        this.push(transformedChunk); // Push the transformed chunk to the output
        callBack(); // Signal that the transformation is complete for this chunk
    }

    /**
     * Called when there is no more data to be transformed, just before the stream ends.
     * Allows you to perform any final operations before the stream ends.
     */
    _flush(callBack) {
        this.push('More chunk of data is being passed....'); // Push an additional message to the output
        callBack(); // Signal that the flush operation is complete
    }
}

const transformer = new ChangeText("😜");

// Pipe the standard input through the transformer and then to the standard output
process.stdin.pipe(transformer).pipe(process.stdout);