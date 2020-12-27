import { io } from './server';
import * as jwt from 'jsonwebtoken';
import { fork, ChildProcess, exec as normalExec } from 'child_process';
import { ncp as _ncp } from 'ncp';
import * as fs from 'fs';
import * as util from 'util';
import { DockerProcess, isDockerInstalled, Permissions } from './docker';
import isChildImageBuilt from './docker/isChildImageBuilt';
import buildChildImage from './docker/buildChildImage';
import { ipcMain } from 'electron';
import { mainWindow as win } from '../index'
import { dialog } from 'electron';
import findSetting from './setting/findSetting';
import pushSetting from './setting/pushSetting';
import { Info } from './setting/getSettings';
import { url } from 'inspector';
import path from 'path';
import openExplorer from "open-file-explorer";

const exec = util.promisify(normalExec);
const ncp = util.promisify(_ncp);
const readFile = util.promisify(fs.readFile);
const sleep = util.promisify(setTimeout);
// const ipc_on = util.promisify(ipcMain.on);
const ipc_once = (key) => {
    return new Promise((resolve, reject) => {
        ipcMain.once(key, (event, arg) => {
            resolve(arg);
        });
    });
}

 

interface JwtType {
    origin: string,
    origin64: string,
    iot?: number;
    exp?: number;
}

let options = {
    type: 'question',
    buttons: ['Yes', 'No'],
    defaultId: 1,
    title: 'ujs',
    message: '목 돌리니깐 뽁뽁이소리남; / 강성우',
    detail: '임나연 사랑해~~~!! / 김동희',
    //checkboxLabel: 'Remember my answer',
    //checkboxChecked: true,
  };

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
        socket.on('spawnNode', async (data : (Info & {jwt:string, alive:boolean})) => {
            try {
                //jwt 파싱
                const raw_token = data.jwt.split('jwt ')[1] as string;
                const token = jwt.verify(raw_token, JwtSecretKey) as JwtType;

                const childDir = `./datas/ujs-child/${token.origin64}`;
                const workspacePath = childDir + '/workspace';

                const setting = await findSetting(token.origin);

                if(setting
                    && JSON.stringify(setting.directories) === JSON.stringify(data.directories ?? {})
                    && JSON.stringify(setting.dependencies) === JSON.stringify(data.dependencies ?? {})
                    && JSON.stringify(setting.ports) === JSON.stringify(data.ports ?? [])
                    && setting.docker === !!data.docker
                    && setting.openExplorerPerm === !!data.openExplorerPerm
                    ) { // 이미 설정(권한)이 있다.
                    options.message = `${token.origin} 에서 당신의 시스템에서 ujs코드를 실행하려고 합니다. 실행하겠습니까?`;
                    options.detail = ``;
    
                    win.webContents.send('dialog-request', {data, token});
                    let res = await dialog.showMessageBox(options);
                    if(res.response == 1){
                        socket.emit('spawn_start', { status: 403, err:'denined' });
                        return;
                    }
                    // 덮어씌운다.
                    Object.assign(data, setting);

                } else { // 설정(권한) 이제 받아야 한다. | 새 권한을 요청한다
                    const dockerMode = !!data.docker;
                    const openExplorerPerm = !!data.openExplorerPerm;

                    options.message = `${token.origin} 에서 다음과 같은 권한으로 당신의 시스템에서 ujs코드를 실행하려고 합니다. 실행하겠습니까?`;
                    options.detail = (
                        `모드 : ${dockerMode ? "도커" : "노드"}\n\n`
                        + (
                            "폴더들 :::\n"
                            + Object.values(data.directories ?? {})
                                .join("\n")
                            + "\n\n"
                        )
                        + (
                            dockerMode ?
                                ""
                            :
                                "모듈들 :::\n"
                                + Object.entries(data.dependencies ?? {})
                                    .map(([name, version]) => `${name}@${version ?? "*"}`)
                                    .join("\n")
                                + "\n\n"
                        )
                        + (
                            dockerMode ?
                                "포트들 :::\n"
                                + (data.ports ?? [])
                                    .join("\n")
                                + "\n\n"
                            :
                                ""
                        )
                        + (
                            openExplorerPerm ?
                                "추가 권한 :::\n"
                                + "파일 탐색기 열기 권한"
                                + ""
                            :
                                ""
                        )
                    );

                    // 앱이 요청하는 모든 것들을 다 물어본다
    
                    win.webContents.send('dialog-request', {data, token});
                    let res = await dialog.showMessageBox(options);
                    if(res.response == 1){
                        socket.emit('spawn_start', { status: 403, err:'denined' });
                        return;
                    }
                    
                    // 권한 허용됨 리스트에 추가
                    const newSetting : (Info & {id:number}) = {
                        id: 1,
                        name: token.origin,
                        url: token.origin,
                        docker: dockerMode,
                        directories: data.directories ?? {},
                        dependencies: data.dependencies ?? {},
                        ports: data.ports ?? [],
                        openExplorerPerm: openExplorerPerm
                    };
                    pushSetting(newSetting);
                    
                }

                // 팝업이 뜬 사이에 연결이 끊어졌다면 종료
                if(!socket.connected)return;

                const dockerMode = !!data.docker;
                const openExplorerPerm = !!data.openExplorerPerm;


                const dockerModePermissions : Permissions = {
                    ports: data.ports,
                    directories: data.directories,
                    openExplorerPerm: openExplorerPerm
                };

                // 도커모드인데 도커가 없다면, not found!
                if(dockerMode && !(await isDockerInstalled())) {
                    socket.emit('spawn_start', { status: 400, err:'not found' });
                    return;
                }
                
                // 도커 이미지가 빌드 된적 없다면, 빌드!
                if(dockerMode && !(await isChildImageBuilt())){
                    await buildChildImage()
                }
                
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
                            fork(childDir + '/js/child',
                                [...Object.keys(data.dependencies ?? {}),
                                    "/",
                                    `__workspace:${path.resolve(workspacePath)}`,
                                    ...Object.entries(data.directories ?? {}).map(([name, path]) => `${name}:${path}`),
                                    "/",
                                    openExplorerPerm ? "1" : "0"
                                ],
                            { silent: true })
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

                
                // 사용 가능한 디렉토리 실제 주소들
                const okPaths = [path.resolve(workspacePath), ...Object.values(data.directories ?? {}).map(v => path.resolve(v))];

                
                // 프로세스와 소통 설정
                server.process.on('message', (message: any) => {
                    if(message.type === 'message') { // 메시지
                        socket.emit('spawn_message', {
                            message: message.message,
                        });
                    } else if(message.type === 'openExplorer') { // 탐색기 열기
                        if(openExplorerPerm) {
                            if(okPaths.some(v => !path.relative(v, message.path).includes('..'))) {
                                openExplorer(message.path, err => {});
                            } else {
                                server.process.send({
                                    type: 'error',
                                    error: `You do not have permission to open explorer in ${message.path}`
                                });
                            }
                        } else {
                            server.process.send({
                                type: 'error',
                                error: 'You do not have permission to open explorer'
                            });
                        }
                    }
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
                        data: data.toString()
                    });
                });

                server.process.stderr.on("data", data => {
                    socket.emit("spawn_stderr", {
                        data: data.toString()
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


export async function killAll() {
    for(const server of Object.values(serverList)) {
        if(server.process instanceof DockerProcess) {
            server.process.kill();
        }
    }
}