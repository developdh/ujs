import { io } from './server';
import * as jwt from 'jsonwebtoken';
import { evalSafe } from 'eval-safe';
import { fork, ChildProcess, exec as normalExec } from 'child_process';
import { ncp as _ncp } from 'ncp';
import * as fs from 'fs';
import * as util from 'util';
import { DockerProcess } from './docker';

const exec = util.promisify(normalExec);
const ncp = util.promisify(_ncp);
const readFile = util.promisify(fs.readFile);

interface JwtType {
    origin: string,
    origin64: string,
    iot?: number;
    exp?: number;
}

let serverList: { [origin: string]: Server } = {};
let socketList: { [soketId: string]: string } = {};

interface Server {
    process?: ChildProcess | DockerProcess;
    timeoutId?: any;
}

const JwtSecretKey = 'ggurikitakati'

// socket.io 코드 =========================================================================

export function ioStart() {
    io.on('connection', (socket) => {
        console.log('a user connected : ' + socket.id);
        // ** for testing! don't delete! ** =========================================================================
        socket.on('print', (data) => {
            console.log(data);
        })
        // 노드 생성 =========================================================================
        socket.on('spawnNode', async (data) => {
            try {
                //jwt 파싱
                const raw_token = data.jwt.split('jwt ')[1] as string;
                const token = jwt.verify(raw_token, JwtSecretKey) as JwtType;

                const childDir = `./datas/ujs-child/${token.origin64}`;
                const workspacePath = childDir + '/workspace';
                const dockerMode = !!data.docker;
                const dockerModePermissions = {
                    ports: data.ports,
                    directories: data.directories
                };


                // 에러 처리
                if (serverList[token.origin] !== undefined) {
                    socket.emit('spawn_start', { status: 500, err: 'current running' });
                    return;
                }

                // 디렉토리 복사
                try {
                    fs.statSync(childDir);
                } catch (err) {
                    if (err.code === 'ENOENT') {
                        if(!dockerMode)
                            await ncp(`./datas/ujs-child/template`, childDir);
                        
                        fs.promises.mkdir(workspacePath, { recursive:true });
                    }
                }

                // 모듈 다운로드
                if(!dockerMode) {
                    for (let i in data.dependencies) {
                        if (data.dependencies[i] === null) {
                            await exec(`npm install ${i}`, { cwd: childDir });
                        } else {
                            await exec(`npm install ${i}@${data.dependencies[i]}`, { cwd: childDir });
                        }
                    }
                }

                // 서버 설정
                const server: Server = {
                    process: (
                        dockerMode ?
                            await new DockerProcess(workspacePath, dockerModePermissions, data.dependencies).start()
                        :
                            fork(childDir + '/js/child', [], { silent: true })
                    )
                };

                serverList[token.origin] = server;  // 서버 객체에 저장
                socketList[socket.id] = token.origin;

                // 타임아웃 설정
                if (data.alive === false) {
                    server.timeoutId = setTimeout(() => {
                        server.process.kill();
                    }, 1000 * 60 * 60);
                }

                // 프로세스와 소통 설정
                server.process.on('message', (message: any) => {
                    socket.emit('spawn_message', {
                        message: message,
                    });
                });

                // 프로세스 종료시
                server.process.on('exit', (message: any) => {
                    if (server.timeoutId)
                        clearTimeout(server.timeoutId);

                    // 종료 id 보냄
                    socket.emit('spawn_close', {
                        status: server.process.exitCode,
                    });
                });
                
                server.process.stdout.on("data", data => {
                    socket.emit("spawn_stdout", {
                        data: Array.from(data)
                    });
                });

                server.process.stderr.on("data", data => {
                    socket.emit("spawn_stderr", {
                        data: Array.from(data)
                    });
                });

                // 프로세스 오류시
                server.process.on('error', (err: any) => {
                    socket.emit('spawn_error', {
                        err
                    });
                })

                socket.emit('spawn_start', { status: 200 });
            } catch (err) {
                console.log("오류났어요ㅠㅠ", err);
                socket.emit('spawn_start', { status: 500, err });
            }
        })
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
        // 프로세스에 메세지 전송 =========================================================================
        socket.on('spawn_message', (data) => {
            try{
                //jwt 파싱
                const raw_token = data.jwt.split('jwt ')[1] as string;
                const token = jwt.verify(raw_token, JwtSecretKey) as JwtType;

                const server = serverList[token.origin];
    
                server.process.send({ type: 'message', data: data.message });
            } catch (err) {
                socket.emit('spawn_error', {
                    err
                });
            }
        })

        // 연결 끊겻을때 =========================================================================
        socket.on('disconnect', () => {
            try {
                // 객체 찾기
                const origin = socketList[socket.id];
                const server = serverList[origin];
                // 요류 방지
                if (origin === undefined || server === undefined)
                    return;
                // 프로세스 죽이기
                if (server.process.exitCode === null)
                    server.process.kill();
                // 타임아웃 클리어
                if (server.timeoutId !== undefined)
                    clearTimeout(server.timeoutId);
                // 객체 삭제
                delete socketList[socket.id];
                delete serverList[origin];
            } catch (err) {
                console.log(err);
            }
        })
    });
}


