
import { spawn, exec, execSync } from "child_process";
import { promisify } from "util";
import { childImageName } from "./consts";
import { io, Socket } from "socket.io-client";
import { EventEmitter } from "events";
import getPort from "get-port";
import Permissions from "./Permissions";
import path from "path";


interface Dependencies {
    [name: string]: string
}


interface DockerProcess extends EventEmitter {
    on(event : "message", callback : (message : any) => void): this;
    emit(event : "message", message : any): boolean;
    on(event : "error", callback : (error : any) => void): this;
    emit(event : "error", error : any): boolean;
    on(event : "exit", callback : (code : any) => void): this;
    emit(event : "exit", code : any): boolean;
}

class DockerProcess extends EventEmitter {
    workspacePath: string;
    process: import("child_process").ChildProcessWithoutNullStreams;
    permissions: Permissions;
    containerId: string;
    socket: Socket;
    stdout: import("stream").Readable;
    port: number;
    exitCode: any;
    dependencies: Dependencies;

    constructor(workspacePath : string, permissions : Permissions, dependencies : Dependencies) {
        super();
        this.workspacePath = path.resolve(workspacePath);
        this.permissions = permissions;
        this.dependencies = dependencies;
    }

    async start() {
        this.port = await getPort();

        // 모듈 설치 / 실행 / 컨테이너 id 얻기
        const runResult = (
            await promisify(exec)(`docker run -d -p ${this.port}:65432 ${
                this.permissions.ports.map(port => 
                    `-p ${port}:${port}`
                ).join(" ")
            } ${
              `-v "${this.workspacePath}":/src/src/app/workspace`  
            } ${
                Object.entries(this.permissions.directories).map(([name, path]) => 
                    `-v "${path}":"/src/src/app/dirs/${name}"`
                ).join(" ")
            } ${childImageName} /bin/bash -c "npm i ${
                Object.entries(this.dependencies).map(([name, version]) => 
                    `${name}@${version ?? "*"}`
                ).join(" ")
            } && node index"`)
        );
        if(runResult.stderr) {
            this.error(runResult.stderr);
            return;
        }
        this.containerId = runResult.stdout.trim();

        // stdout을 받아오기 위한 프로세스
        this.process = exec(`docker attach ${this.containerId}`);
        this.stdout = this.process.stdout;

        // EXIT 이벤트
        this.process.on("exit", (code : any) => {
            this.exit(code);
        });

        // 컨테이너의 socket.io 서버에 연결
        this.socket = io(`http://127.0.0.1:${this.port}`);
        this.socket
            .on("message", (message : string) => {
                this.emit("message", message);
            }); 
        
        return this;
    }
    async stop(){
        await promisify(exec)(`docker container stop ${this.containerId} && docker container rm ${this.containerId}`);
    }
    async kill() {
        await promisify(exec)(`docker container kill ${this.containerId} && docker container rm ${this.containerId}`);
    }
    message(message : any) {
        this.socket.emit("message", message);
    }
    exec(command : string) {
        this.socket.emit("exec", command);
    }
    send({ type, command, data } : { type:string, command?:string, data?:any }) {
        if(type === "exec")
            this.exec(command);
        else if(type === "message")
            this.message(data);
    }

    error(error : string) {
        this.emit("error", error);
    }
    exit(code : any) {
        this.exitCode = code;
        this.emit("exit", code);
    }
}

export default DockerProcess;