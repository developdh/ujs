import express from "express";
import http from "http";
import socketIo from "socket.io";

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const port = 2933;

export function start(){
    app.get('/', (req, res) => {
        res.send('Hello World!');
    });

    io.on('connection', (socket) => {
        console.log('a user connected');
    })

    server.listen(port, () => {
        console.log(`listening on *: ${port}`);
    })
}
