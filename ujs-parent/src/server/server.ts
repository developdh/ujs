import express from "express";
import http from "http";
import socketIo from "socket.io";
import cors from 'cors';
import indexRouter from './route/index';
import { ioStart as socketStart } from './socket';
import bodyParser from 'body-parser';

const app = express();
const server = http.createServer(app);
export const io = socketIo(server);

const corsOption: cors.CorsOptions = {
    origin: "*",
    optionsSuccessStatus: 200,
}

const port = 2933;

export function start() {
    app.use(cors(corsOption));
    app.use(bodyParser.json());
    app.use(express.urlencoded({ extended: true }));
    app.use('/', indexRouter);

    // 에러처리 코드 =========================================================================
    app.use(function (err: any, req: any, res: any, next: any) {
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        res.status(err.status || 500);
        res.send({
            error: {
                code: err.status || 500,
                message: err.message,
            }
        })
    });

    // socket.io 코드 =========================================================================
    socketStart();

    // 서버시작 코드 =========================================================================
    server.listen(port, () => {
        console.log(`listening on *: ${port}`);
    });
}

// start();