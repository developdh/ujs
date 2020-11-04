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
    timeoutId?: any;
}

// socket.io 코드 =========================================================================

export function ioStart() {
    io.on('connection', (socket) => {
        console.log('a user connected : ' + socket.id);

        socket.on('spawn_exec', (data) => {
            try {
                // jwt 해독
                const raw_token = data.jwt.split('jwt ')[1] as string;
                const token = jwt.verify(raw_token, 'ggurikitakati') as JwtType;
                // 서버 객체 가져옴
                const server = serverList[token.origin];
                // 명령어 실행
                server.process.send({ type: 'exec', command: data.command });
            } catch (err) {
                // 오류 처리
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
                const server: Server = {
                    process: fork('js/child')
                };

                serverList[token.origin] = server;  // 서버 객체에 저장

                // 타임아웃 설정
                if (data.alive === false) {
                    server.timeoutId = setTimeout(() => {
                        server.process.kill(1);
                    }, 1000 * 60 * 60);
                }

                // 프로세스와 소통 설정
                server.process.on("message", (message: any) => {
                    if (message.type === 'result') {
                        socket.emit('spawn_message', {
                            message: message.result,
                        });
                    }
                });

                // 프로세스 종료시
                server.process.on("exit", (message: any) => {
                    if (data.alive === false) {
                        if (server.timeoutId)
                            clearTimeout(server.timeoutId);
                    }
                });

                socket.emit('spawn_start', { status: 200 });
            } catch (err) {
                socket.emit('spawn_start', { status: 500, err });
            }
        })
    });
}