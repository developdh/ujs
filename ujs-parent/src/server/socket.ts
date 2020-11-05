import { io } from './server';
import * as jwt from 'jsonwebtoken';
import { evalSafe } from 'eval-safe';
import { fork, ChildProcess } from 'child_process';
import setting from './data.json';

interface JwtType {
    origin: string,
    iot?: number;
    exp?: number;
}

let serverList: { [origin: string]: Server } = {};
let socketList: { [soketId: string]: string } = {};

interface Server {
    process?: ChildProcess;
    timeoutId?: any;
}

const JwtSecretKey = 'ggurikitakati'

// socket.io 코드 =========================================================================

export function ioStart() {
    io.on('connection', (socket) => {
        console.log('a user connected : ' + socket.id);
        // 코드 실행 =========================================================================
        socket.on('spawn_exec', (data) => {
            try {
                // jwt 해독
                const raw_token = data.jwt.split('jwt ')[1] as string;
                const token = jwt.verify(raw_token, JwtSecretKey) as JwtType;
                // 서버 객체 가져옴
                const server = serverList[token.origin];
                // 명령어 실행
                server.process.send({ type: 'exec', command: data.command });
            } catch (err) {
                // 오류 처리
                socket.emit('evalResult', err);
            }
        })
        // ** for testing! don't delete! ** =========================================================================
        socket.on('print', (data) => {
            console.log(data);
        })
        // 노드 생성 =========================================================================
        socket.on('spawnNode', (data) => {
            try {
                //jwt 파싱
                const raw_token = data.jwt.split('jwt ')[1] as string;
                const token = jwt.verify(raw_token, JwtSecretKey) as JwtType;
                console.log(__dirname);
                // 서버 설정
                const server: Server = {
                    // process: fork('../ujs-child/js/child'),     // nodemon 코드
                    process: fork('../ujs-child/js/child'),     // electron 코드
                };

                serverList[token.origin] = server;  // 서버 객체에 저장
                socketList[socket.id] = token.origin;

                // 타임아웃 설정
                if (data.alive === false) {
                    server.timeoutId = setTimeout(() => {
                        server.process.kill(1);
                    }, 1000 * 60 * 60);
                }

                // 프로세스와 소통 설정
                server.process.on("message", (message: any) => {
                    socket.emit('spawn_message', {
                        message: message.result,
                    });
                });

                // 프로세스 종료시
                server.process.on("exit", (message: any) => {
                    if (server.timeoutId)
                        clearTimeout(server.timeoutId);
                    
                    // 종료 id 보냄
                    socket.emit('spawn_close', {
                        status: server.process.exitCode,
                    });
                });

                socket.emit('spawn_start', { status: 200 });
            } catch (err) {
                socket.emit('spawn_start', { status: 500, err });
            }
        })
        // 연결 끊겻을때 =========================================================================
        socket.on('disconnect', () => {
            // 객체 찾기
            const origin = socketList[socket.id];
            const server = serverList[origin];
            // 요류 방지
            if(origin === undefined || server === undefined)
                return;
            // 프로세스 죽이기
            if(server.process.exitCode === null)
                server.process.kill(1);
            // 타임아웃 클리어
            if (server.timeoutId !== undefined)
                clearTimeout(server.timeoutId);
            // 객체 삭제
            delete socketList[socket.id];
            delete serverList[origin];
        })
    });
}