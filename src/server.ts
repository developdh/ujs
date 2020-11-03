import express from "express";
import http from "http";
import socketIo from "socket.io";
import { evalSafe } from 'eval-safe';

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const port = 2933;

export function start(){
    app.get('/', (req, res) => {
        evalSafe('print("a");',{print: console.log});
        res.send('Hello World!');
    });

    io.on('connection', (socket) => {
        console.log('a user connected');
        socket.on('eval', (data) => {
            evalSafe(data,{});
        })
    });

    server.listen(port, () => {
        console.log(`listening on *: ${port}`);
    });
}
