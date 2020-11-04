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
    iot?: number;
    exp?: number;
}

interface evalData{
    jwt: string;
    command: string;
}

let serverList: { [key: string]: any } = {};
let save:any = {}

export function start(){

    app.use(cors(corsOption));

    app.use('/', indexRouter);

    // socket.io 코드 =========================================================================
    io.on('connection', (socket) => {
        console.log('a user connected : ' + socket.id);
        
        socket.on('eval', async (data) => {
            try{
                const raw_token = data.jwt.split('jwt ')[1] as string;
                const token = jwt.verify(raw_token, 'ggurikitakati');
                socket.emit('evalResult', {
                    result : evalSafe(data.command, {save:save}),
                });
            }catch(err){
                socket.emit('evalResult', err);
            }
        })
    });

    // 에러처리 코드 =========================================================================
    app.use(function (err:any, req:any, res:any, next:any) {
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

    // 서버시작 코드 =========================================================================
    server.listen(port, () => {
        console.log(`listening on *: ${port}`);
    });
}

