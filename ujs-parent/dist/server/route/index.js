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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express = __importStar(require("express"));
var http_errors_1 = __importDefault(require("http-errors"));
var jwt = __importStar(require("jsonwebtoken"));
var eval_safe_1 = require("eval-safe");
var fs = __importStar(require("fs"));
var router = express.Router();
var save = { print: console.log };
// test code
router.get('/', function (req, res) {
    eval_safe_1.evalSafe('$.a = 1;', { $: save });
    eval_safe_1.evalSafe('$.print($.a);', { $: save });
    console.log(req.headers.origin);
    res.send({ ok: 1 });
});
// json 생성
router.post('/auth', function (req, res, next) {
    // 헤더에 오리진 없을시 내보냄.
    if (req.headers.origin === undefined)
        return next(http_errors_1["default"](500));
    // json 생성.
    var info = { origin: req.headers.origin, origin64: Buffer.from(req.headers.origin).toString('base64') };
    try {
        var data = jwt.sign(info, 'ggurikitakati');
        res.send(data);
    }
    catch (err) {
        next(err);
    }
});
// json 유효검사
router.get('/auth', function (req, res, next) {
    var body = req.body;
    try {
        jwt.verify(req.headers.authorization.split('jwt ')[1], 'ggurikitakati');
        res.send(true);
    }
    catch (err) {
        res.send(false);
    }
});
router.get('/setting', function (req, res, next) {
    fs.readFile('./src/server/data.json', function (err, data) {
        if (err)
            res.send(err);
        else
            res.send(data);
    });
});
router.post('/setting', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var setting;
    return __generator(this, function (_a) {
        setting = String(req.body.setting);
        fs.writeFile('./src/server/data.json', setting, 'utf-8', function (err) {
            if (err)
                res.send(err);
            else
                res.send(setting);
        });
        return [2 /*return*/];
    });
}); });
exports["default"] = router;
//# sourceMappingURL=index.js.map