"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_1 = __importDefault(require("react"));
var react_router_dom_1 = require("react-router-dom");
require("./Menu.css");
var Menu = function () {
    var activeStyle = {
        color: '#49c0ec',
        fontSize: '20px'
    };
    var nav = {
        backgroundColor: '#181F29'
    };
    var ul = {
        listStyle: 'none',
        paddingLeft: '16px',
        display: 'flex',
        alignItems: 'center',
        margin: '0px'
    };
    var li = {
        paddingLeft: '10px',
        color: '#49c0ec',
        fontSize: '15px'
    };
    var link = {
        textDecoration: 'none'
    };
    var logo = {
        color: '#705DED',
        fontSize: '30px'
    };
    return (react_1["default"].createElement("nav", { style: nav },
        react_1["default"].createElement("ul", { style: ul },
            react_1["default"].createElement("li", null,
                react_1["default"].createElement("span", { id: "logo", style: logo }, "UJS")),
            react_1["default"].createElement("li", { style: li },
                react_1["default"].createElement(react_router_dom_1.NavLink, { exact: true, to: "/", activeStyle: activeStyle, style: link }, "Main")),
            react_1["default"].createElement("li", { style: li },
                react_1["default"].createElement(react_router_dom_1.NavLink, { to: "/setting", activeStyle: activeStyle, style: link }, "setting")),
            react_1["default"].createElement("li", { style: li },
                react_1["default"].createElement(react_router_dom_1.NavLink, { to: "/about", activeStyle: activeStyle, style: link }, "about"))),
        react_1["default"].createElement("hr", null)));
};
exports["default"] = Menu;
//# sourceMappingURL=Menu.js.map