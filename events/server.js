import { EventEmitter } from 'events';

class Server extends EventEmitter {
    constructor(client) {
        super();
        this.client = client;
        this.tasks = {};
        this.taskId = 1;
        this.handleEvents();
    }
    handleEvents() {
        this.client.on('command', (command,args) => {
            switch (command) {
                case 'help':
                    this.help();
                    break;
                case 'add':
                    this.add(args);
                    break;
                case 'delete':
                    this[command](args);
                    break;
                case 'ls':
                    this.ls();
                    break;
                default:
                    this.emit('response', 'Sorry! command not found....')

            }
        })
    }

    help() {
        this.emit('response', `

                    Commands :
                    add todo
                    ls
                    delete :id
                    
                    `)
    }
    add(task){
        this.tasks[this.taskId] = task.join('');
        this.emit('response',`Added task ${this.taskId}`);
        this.taskId++; 
    }

    ls(){
        this.emit('response', this.tasks);
    }

    delete(args){
        args.forEach(a=>{
            delete delete this.tasks[a];
        })
    }
}
const createServer = (client) => new Server(client);
export default createServer;
