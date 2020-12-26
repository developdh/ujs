
const { exec } = require("child_process");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");



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

const dependenciesI = process.argv.indexOf("/");
const dependencies = process.argv.slice(2, dependenciesI);
const portsI = process.argv.indexOf("/", dependenciesI + 1);
const ports = process.argv.slice(dependenciesI + 1, portsI).map(v => parseInt(v));

const realDirectories = Object.fromEntries(process.argv.slice(portsI + 1).map(v => {
    const splitted = v.split(":");
    return [splitted[0], splitted.slice(1).join(":")];
}));
const directories = Object.fromEntries(Object.keys(realDirectories).map(name => 
        name === "__workspace" ?
            [name, "/src/src/app/workspace"]
        :
            [name, `/src/src/app/dirs/${name}`]
    )
);
const rDirs = realDirectories;
const dirs = directories;


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