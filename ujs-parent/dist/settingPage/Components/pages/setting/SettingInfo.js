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
exports.__esModule = true;
var react_1 = __importStar(require("react"));
var SettingInfo = /** @class */ (function (_super) {
    __extends(SettingInfo, _super);
    function SettingInfo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleRemove = function () {
            var _a = _this.props, info = _a.info, onRemove = _a.onRemove;
            onRemove(info.id);
        };
        return _this;
    }
    SettingInfo.prototype.render = function () {
        var style = {
            border: '1px solid black',
            padding: '8px',
            margin: '8px'
        };
        var _a = this.props.info, name = _a.name, url = _a.url;
        return (react_1["default"].createElement("div", { style: style },
            react_1["default"].createElement("div", null,
                react_1["default"].createElement("b", null, name)),
            react_1["default"].createElement("div", null, url),
            react_1["default"].createElement("button", { onClick: this.handleRemove }, "\uC0AD\uC81C")));
    };
    return SettingInfo;
}(react_1.Component));
exports["default"] = SettingInfo;
//# sourceMappingURL=SettingInfo.js.map