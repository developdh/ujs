"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_1 = __importDefault(require("react"));
var react_router_dom_1 = require("react-router-dom");
var App_1 = __importDefault(require("../App/App"));
var Root = function () { return (react_1["default"].createElement(react_router_dom_1.HashRouter, null,
    react_1["default"].createElement(App_1["default"], null))); };
exports["default"] = Root;
//# sourceMappingURL=Root.js.map