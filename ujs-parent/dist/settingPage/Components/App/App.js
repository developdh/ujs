"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_1 = __importDefault(require("react"));
var react_router_dom_1 = require("react-router-dom");
var DashboardPage_1 = __importDefault(require("../pages/DashboardPage"));
var About_1 = __importDefault(require("../pages/About"));
var Menu_1 = __importDefault(require("../component/Menu"));
var SettingApp_1 = __importDefault(require("../pages/setting/SettingApp"));
var App = function () {
    var cssColor = {
        color: "white"
    };
    return (react_1["default"].createElement("body", { style: cssColor },
        react_1["default"].createElement(react_router_dom_1.HashRouter, null,
            react_1["default"].createElement(react_router_dom_1.Route, { path: "/", component: Menu_1["default"] }),
            react_1["default"].createElement(react_router_dom_1.Route, { exact: true, path: "/", component: DashboardPage_1["default"] }),
            react_1["default"].createElement(react_router_dom_1.Route, { exact: true, path: "/setting", component: SettingApp_1["default"] }),
            react_1["default"].createElement(react_router_dom_1.Route, { exact: true, path: "/about", component: About_1["default"] }))));
};
exports["default"] = App;
//# sourceMappingURL=App.js.map