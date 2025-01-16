import {createServer} from 'http';
import {createReadStream} from 'fs';

const fileName = './test.txt';
createServer((req,res)=>{
    console.log('yes')
    res.writeHead(200,{
        'Content-Type' : 'text/plain'
    });
    createReadStream(fileName).pipe(res);

}).listen(3000,()=>{

})