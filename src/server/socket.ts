import { io } from './server';
import * as jwt from 'jsonwebtoken';
import { evalSafe } from 'eval-safe';
import { fork } from 'child_process';

interface JwtType {
    origin: string,
    iot?: number;
    exp?: number;
}

let serverList: { [key: string]: Server } = {};

interface Server {
    process?: any;
}

// socket.io 코드 =========================================================================

export function ioStart() {
    io.on('connection', (socket) => {
        console.log('a user connected : ' + socket.id);

        socket.on('spawn_exec', (data) => {
            try {
                const raw_token = data.jwt.split('jwt ')[1] as string;
                const token = jwt.verify(raw_token, 'ggurikitakati') as JwtType;

                const server = serverList[token.origin];

                server.process.send({ type: 'exec', command: data.command });
            } catch (err) {
                socket.emit('evalResult', err);
            }
        })

        socket.on('print', (data) => {
            console.log(data);
        })

        socket.on('spawnNode', (data) => {
            try {
                //jwt 파싱
                const raw_token = data.jwt.split('jwt ')[1] as string;
                const token = jwt.verify(raw_token, 'ggurikitakati') as JwtType;

                // 서버 설정
                const server = {
                    process: fork('js/child')
                };
                serverList[token.origin] = server;

                server.process.on("message", (message: any) => {
                    if (message.type === 'result') {
                        socket.emit('spawn_message', {
                            message: message.result,
                        });
                    }
                })

                socket.emit('spawn_start', { status: 200 });
            } catch (err) {
                socket.emit('spawn_start', { status: 500, err });
            }
        })
    });
}