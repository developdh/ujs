"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.io = void 0;
var express_1 = __importDefault(require("express"));
var http_1 = __importDefault(require("http"));
var socket_io_1 = __importDefault(require("socket.io"));
var cors_1 = __importDefault(require("cors"));
var index_1 = __importDefault(require("./route/index"));
var socket_1 = require("./socket");
var body_parser_1 = __importDefault(require("body-parser"));
var app = express_1["default"]();
var server = http_1["default"].createServer(app);
exports.io = socket_io_1["default"](server);
var corsOption = {
    origin: "*",
    optionsSuccessStatus: 200
};
var port = 2933;
app.use(cors_1["default"](corsOption));
app.use(body_parser_1["default"].json());
app.use(express_1["default"].urlencoded({ extended: true }));
app.use('/', index_1["default"]);
// 에러처리 코드 =========================================================================
app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.send({
        error: {
            code: err.status || 500,
            message: err.message
        }
    });
});
// socket.io 코드 =========================================================================
socket_1.ioStart();
// 서버시작 코드 =========================================================================
server.listen(port, function () {
    console.log("listening on *: " + port);
});
//# sourceMappingURL=server.js.map