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
var sanitize_html_1 = __importDefault(require("sanitize-html"));
var SettingForm = /** @class */ (function (_super) {
    __extends(SettingForm, _super);
    function SettingForm() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            name: '',
            url: ''
        };
        _this.handleChange = function (e) {
            var _a;
            _this.setState((_a = {},
                _a[e.target.name] = e.target.value,
                _a));
        };
        _this.handleSubmit = function (e) {
            e.preventDefault();
            _this.props.onCreate(_this.state);
            _this.setState({
                name: '',
                url: ''
            });
        };
        return _this;
    }
    SettingForm.prototype.render = function () {
        var defaultOptions = {
            allowedTags: ['b', 'i', 'em', 'strong', 'a'],
            allowedAttributes: {
                'a': ['href']
            }
        };
        var sanitize = function (dirty, options) { return ({
            __html: sanitize_html_1["default"](dirty, __assign(__assign({}, defaultOptions), options))
        }); };
        return (react_1["default"].createElement("form", { onSubmit: this.handleSubmit },
            react_1["default"].createElement("input", { placeholder: "\uC774\uB984", value: sanitize_html_1["default"](this.state.name), onChange: this.handleChange, name: "name" }),
            react_1["default"].createElement("input", { placeholder: "URL", value: sanitize_html_1["default"](this.state.url), onChange: this.handleChange, name: "url" }),
            react_1["default"].createElement("button", { type: "submit" }, "\uB4F1\uB85D")));
    };
    return SettingForm;
}(react_1.Component));
exports["default"] = SettingForm;
//# sourceMappingURL=SettingForm.js.map