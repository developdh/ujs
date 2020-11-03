import express from "express";
import http from "http";
import socketIo from "socket.io";
import { evalSafe } from 'eval-safe';
import cors from 'cors';
import * as jwt from 'jsonwebtoken';
import * as createError from 'http-errors';

import indexRouter from './route/index';

const app = express();
const server = http.createServer(app);
export const io = socketIo(server);

const corsOption: cors.CorsOptions = {
    origin: "*",
    optionsSuccessStatus: 200,
}

const port = 2933;

interface jwtType{
    origin: string,
}

// const serverList: { [key: string]: site } = {};

export function start(){
    app.use(cors(corsOption));

    app.use('/', indexRouter);
    
    server.listen(port, () => {
        console.log(`listening on *: ${port}`);
    });

    io.on('connection', (socket) => {
        console.log('a user connected');
        socket.on('eval', (data) => {
            evalSafe(data, {});
        })
    });

    app.use(function (err:any, req:any, res:any) {
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
}
