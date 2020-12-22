"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.ioStart = void 0;
var server_1 = require("./server");
var jwt = __importStar(require("jsonwebtoken"));
var child_process_1 = require("child_process");
var ncp_1 = require("ncp");
var fs = __importStar(require("fs"));
var util = __importStar(require("util"));
var exec = util.promisify(child_process_1.exec);
var ncp = util.promisify(ncp_1.ncp);
var readFile = util.promisify(fs.readFile);
var serverList = {};
var socketList = {};
var JwtSecretKey = 'ggurikitakati';
// socket.io 코드 =========================================================================
function ioStart() {
    var _this = this;
    server_1.io.on('connection', function (socket) {
        console.log('a user connected : ' + socket.id);
        // 코드 실행 =========================================================================
        socket.on('spawn_exec', function (data) {
            try {
                // jwt 해독
                var raw_token = data.jwt.split('jwt ')[1];
                var token = jwt.verify(raw_token, JwtSecretKey);
                // 서버 객체 가져옴
                var server = serverList[token.origin];
                // 명령어 실행
                server.process.send({ type: 'exec', command: data.command });
            }
            catch (err) {
                // 오류 처리
                socket.emit('evalResult', err);
            }
        });
        // ** for testing! don't delete! ** =========================================================================
        socket.on('print', function (data) {
            console.log(data);
        });
        // 노드 생성 =========================================================================
        socket.on('spawnNode', function (data) { return __awaiter(_this, void 0, void 0, function () {
            var raw_token, token, childDir, err_1, _a, _b, _i, i, server_2, err_2;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 12, , 13]);
                        raw_token = data.jwt.split('jwt ')[1];
                        token = jwt.verify(raw_token, JwtSecretKey);
                        childDir = "../ujs-child/" + token.origin64;
                        // 에러 처리
                        if (serverList[token.origin] !== undefined) {
                            socket.emit('spawn_start', { status: 500, err: 'current running' });
                            return [2 /*return*/];
                        }
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 2, , 5]);
                        fs.statSync(childDir);
                        return [3 /*break*/, 5];
                    case 2:
                        err_1 = _c.sent();
                        if (!(err_1.code === 'ENOENT')) return [3 /*break*/, 4];
                        return [4 /*yield*/, ncp("../ujs-child/template", childDir)];
                    case 3:
                        _c.sent();
                        _c.label = 4;
                    case 4: return [3 /*break*/, 5];
                    case 5:
                        _a = [];
                        for (_b in data.dependencies)
                            _a.push(_b);
                        _i = 0;
                        _c.label = 6;
                    case 6:
                        if (!(_i < _a.length)) return [3 /*break*/, 11];
                        i = _a[_i];
                        if (!(data.dependencies[i] === null)) return [3 /*break*/, 8];
                        return [4 /*yield*/, exec("npm install " + i, { cwd: childDir })];
                    case 7:
                        _c.sent();
                        return [3 /*break*/, 10];
                    case 8: return [4 /*yield*/, exec("npm install " + i + "@" + data.dependencies[i], { cwd: childDir })];
                    case 9:
                        _c.sent();
                        _c.label = 10;
                    case 10:
                        _i++;
                        return [3 /*break*/, 6];
                    case 11:
                        server_2 = {
                            process: child_process_1.fork(childDir + '/js/child')
                        };
                        serverList[token.origin] = server_2; // 서버 객체에 저장
                        socketList[socket.id] = token.origin;
                        // 타임아웃 설정
                        if (data.alive === false) {
                            server_2.timeoutId = setTimeout(function () {
                                server_2.process.kill();
                            }, 1000 * 60 * 60);
                        }
                        // 프로세스와 소통 설정
                        server_2.process.on("message", function (message) {
                            socket.emit('spawn_message', {
                                message: message
                            });
                        });
                        // 프로세스 종료시
                        server_2.process.on("exit", function (message) {
                            if (server_2.timeoutId)
                                clearTimeout(server_2.timeoutId);
                            // 종료 id 보냄
                            socket.emit('spawn_close', {
                                status: server_2.process.exitCode
                            });
                        });
                        socket.emit('spawn_start', { status: 200 });
                        return [3 /*break*/, 13];
                    case 12:
                        err_2 = _c.sent();
                        socket.emit('spawn_start', { status: 500, err: err_2 });
                        return [3 /*break*/, 13];
                    case 13: return [2 /*return*/];
                }
            });
        }); });
        // 프로세스에 메세지 전송 =========================================================================
        socket.on('spawn_message', function () {
        });
        // 연결 끊겻을때 =========================================================================
        socket.on('disconnect', function () {
            try {
                // 객체 찾기
                var origin_1 = socketList[socket.id];
                var server = serverList[origin_1];
                // 요류 방지
                if (origin_1 === undefined || server === undefined)
                    return;
                // 프로세스 죽이기
                if (server.process.exitCode === null)
                    server.process.kill();
                // 타임아웃 클리어
                if (server.timeoutId !== undefined)
                    clearTimeout(server.timeoutId);
                // 객체 삭제
                delete socketList[socket.id];
                delete serverList[origin_1];
            }
            catch (err) {
                console.log(err);
            }
        });
    });
}
exports.ioStart = ioStart;
//# sourceMappingURL=socket.js.map