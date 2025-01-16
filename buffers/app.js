import { Buffer } from 'buffer';


// creating a container 4*8 = 32 bits
const memoryContainer = Buffer.alloc(4);

memoryContainer[0] = 0xFa;
for (let a of memoryContainer) {
    console.log(a);
}

console.log(memoryContainer[0]);


// 0100 1000 0110 1001 0010 0001

const newB = Buffer.alloc(3)
newB[0] = 0x48;
newB[1] = 0x69;
newB[2] = 0x21;


const newB2 = Buffer.from([0x48,0x69,0x21]);

// creating buffer from string
const stringBuffer = Buffer.from('MyString','utf-8');
// create hex buffer 
const hexBuffer = Buffer.from('486921','hex');

console.log(newB);
console.log(newB.toString('utf8'));
console.log(newB2.toString('utf8'));
console.log(stringBuffer);
console.log(hexBuffer);