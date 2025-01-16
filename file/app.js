import { readFile, watch, open, unlink, rename, copyFile } from 'fs/promises';
import path, { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const CREATE_FILE = 'create a file';
const DELETE_FILE = 'delete file';
const RENAME_FILE = 'rename file';
const COPY_FILE = 'copy file';
const ADD_TO_FILE = 'add to file';
// Get the __filename equivalent in ESM
const __filename = fileURLToPath(import.meta.url);

// Get the __dirname equivalent in ESM
const __dirname = dirname(__filename);

// Read the file
const data = await readFile(join(__dirname, './index.txt'), 'utf-8');


// watching changes in file
// async iterator
const watcher = watch(__dirname);

// just saving a number in memnory, the file descriptor
// need to close after read.
const commandFileHandler = await open('./index.txt', 'r');

const createAFile = async (filePath) => {
    try {
        const existingfile = await open(filePath, 'r');
        existingfile.close();
        return;
    }
    catch (e) {
        const newFileHandle = await open(filePath, 'w');
        (await newFileHandle).close();
    }
}

const deleteAFile = async (filePath) => {
    try {
        const deleted = await unlink(filePath);
        if (deleted) {
            return true;
        }
        else {
            return false;
        }
    }
    catch (e) {
        return false;
    }
}

async function renameAFile(oldName, newName) {

    try {
        await rename(oldName, newName);
    }
    catch (error) {
        return false;
    }

}

async function copyAFile(sourceFile,destinationfile){
    try{
        await copyFile(sourceFile,destinationfile);
        return true;
    }
    catch(error){
        return false;
    }
}

async function addToFile(filename,content){
    try{
        const fileHandle = await open(filename,'w');
        await fileHandle.write(content);
        fileHandle.close();
    }
    catch(e){
        return false;
    }
}
commandFileHandler.on('change', async () => {
    //get the size of the file
    const size = (await commandFileHandler.stat()).size;
    // allocate our buffer with the size of our file.
    const buff = Buffer.alloc(size);
    //the location at which we want to start filling our buffer.
    const offset = 0;
    //how many bytes we want to read
    const length = buff.byteLength;
    //the position that we want to start reading the file.
    const postion = 0;
    await commandFileHandler.read(buff, offset, length, postion);

    const command = buff.toString('utf-8');
    //create a file <path>
    if (command.includes(CREATE_FILE)) {
        const filePath = command.substring(CREATE_FILE.length + 1);
        createAFile(filePath);
    }

    if (command.includes(DELETE_FILE)) {
        const filePath = command.substring(DELETE_FILE.length + 1);
        deleteAFile(filePath);
    }
    if (command.includes(RENAME_FILE)) {
        const fileNames = command.substring(RENAME_FILE.length + 1);
        const splitNames = fileNames.split(' ');

        renameAFile(splitNames[0], splitNames[1]);
    }
    if (command.includes(COPY_FILE)) {
        const fileNames = command.substring(COPY_FILE.length + 1);
        const splitNames = fileNames.split(' ');

        copyAFile(splitNames[0], splitNames[1]);
    }
    if (command.includes(ADD_TO_FILE)) {
        const fileNameAndContent = command.substring(ADD_TO_FILE.length + 1);
        const splitted = fileNameAndContent.split(' ');
        const [filename,...content] = splitted;

        addToFile(filename, content.join(' '));
    }

})
for await (const change of watcher) {
    if (change.eventType === 'change') {
        commandFileHandler.emit('change');
    }
}