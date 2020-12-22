"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_1 = __importStar(require("react"));
var SettingForm_1 = __importDefault(require("./SettingForm"));
var SettingList_1 = __importDefault(require("./SettingList"));
var axios_1 = __importDefault(require("axios"));
var SettingApp = /** @class */ (function (_super) {
    __extends(SettingApp, _super);
    function SettingApp() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.id = 0;
        _this.state = {
            information: [
                {
                    id: 0,
                    name: '',
                    url: ''
                }
            ]
        };
        _this.handleCreate = function (data) {
            var information = _this.state.information;
            _this.setState({
                information: information.concat(__assign({ id: _this.id++ }, data))
            });
        };
        _this.handleRemove = function (id) {
            var information = _this.state.information;
            _this.setState({
                information: information.filter(function (info) { return info.id !== id; })
            });
        };
        return _this;
    }
    SettingApp.prototype.componentDidMount = function () {
        var _this = this;
        axios_1["default"].get('http://localhost:2933/setting').then(function (res) { _this.setState({ information: res.data }); });
    };
    SettingApp.prototype.render = function () {
        var information = this.state.information;
        var buttonStyle = {
            width: "40px",
            hight: "30px"
        };
        return (react_1["default"].createElement("div", null,
            react_1["default"].createElement(SettingForm_1["default"], { onCreate: this.handleCreate }),
            react_1["default"].createElement(SettingList_1["default"], { data: information, onRemove: this.handleRemove }),
            react_1["default"].createElement("button", { style: buttonStyle, onClick: function () {
                    axios_1["default"].post('http://localhost:2933/setting', { setting: JSON.stringify(information) });
                } }, "\uC800\uC7A5")));
    };
    return SettingApp;
}(react_1.Component));
exports["default"] = SettingApp;
//# sourceMappingURL=SettingApp.js.map