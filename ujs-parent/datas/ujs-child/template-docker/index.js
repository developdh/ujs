
const { exec } = require("child_process");
const http = require("http");
const { Server } = require("socket.io");



const messageHandlers = new Set();

const $ = {};

let socket;

function onMessage(handler) {
    messageHandlers.add(handler);
}

function offMessage(handler) {
    messageHandlers.delete(handler);
}

function sendMessage(message) {
    socket.emit("message", message);
}

function messageReceived(message) {
    for (const handler of messageHandlers) {
        handler(message);
    }
}


const dependencies = process.argv.slice(2, process.argv.indexOf("/"));
const directories = {
    __workspace: path.resolve(__dirname, "../workspace"),
    ...Object.fromEntries(process.argv.slice(process.argv.indexOf("/") + 1).map(v => v.split(":")))
};


const io = new Server();


io.on("connect", _socket => {
    if(socket) return;
    socket = _socket;
    socket.on("exec", command => {
        eval(command);
    });
    socket.on("message", message => {
        messageReceived(message);
    });
});


const server = http.createServer();

io.listen(server);
server.listen(65432);