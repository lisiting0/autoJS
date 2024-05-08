"ui";
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 6305:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "AbortError": () => (/* reexport */ AbortError),
  "DefaultHttpClient": () => (/* reexport */ DefaultHttpClient),
  "HttpClient": () => (/* reexport */ HttpClient),
  "HttpError": () => (/* reexport */ HttpError),
  "HttpResponse": () => (/* reexport */ HttpResponse),
  "HttpTransportType": () => (/* reexport */ HttpTransportType),
  "HubConnection": () => (/* reexport */ HubConnection),
  "HubConnectionBuilder": () => (/* reexport */ HubConnectionBuilder),
  "HubConnectionState": () => (/* reexport */ HubConnectionState),
  "JsonHubProtocol": () => (/* reexport */ JsonHubProtocol),
  "LogLevel": () => (/* reexport */ LogLevel),
  "MessageType": () => (/* reexport */ MessageType),
  "NullLogger": () => (/* reexport */ NullLogger),
  "Subject": () => (/* reexport */ Subject),
  "TimeoutError": () => (/* reexport */ TimeoutError),
  "TransferFormat": () => (/* reexport */ TransferFormat),
  "VERSION": () => (/* reexport */ VERSION)
});

;// CONCATENATED MODULE: ./node_modules/app-base-v9/node_modules/@microsoft/signalr/dist/esm/Errors.js
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/** Error thrown when an HTTP request fails. */
var HttpError = /** @class */ (function (_super) {
    __extends(HttpError, _super);
    /** Constructs a new instance of {@link @microsoft/signalr.HttpError}.
     *
     * @param {string} errorMessage A descriptive error message.
     * @param {number} statusCode The HTTP status code represented by this error.
     */
    function HttpError(errorMessage, statusCode) {
        var _newTarget = this.constructor;
        var _this = this;
        var trueProto = _newTarget.prototype;
        _this = _super.call(this, errorMessage) || this;
        _this.statusCode = statusCode;
        // Workaround issue in Typescript compiler
        // https://github.com/Microsoft/TypeScript/issues/13965#issuecomment-278570200
        _this.__proto__ = trueProto;
        return _this;
    }
    return HttpError;
}(Error));

/** Error thrown when a timeout elapses. */
var TimeoutError = /** @class */ (function (_super) {
    __extends(TimeoutError, _super);
    /** Constructs a new instance of {@link @microsoft/signalr.TimeoutError}.
     *
     * @param {string} errorMessage A descriptive error message.
     */
    function TimeoutError(errorMessage) {
        var _newTarget = this.constructor;
        if (errorMessage === void 0) { errorMessage = "A timeout occurred."; }
        var _this = this;
        var trueProto = _newTarget.prototype;
        _this = _super.call(this, errorMessage) || this;
        // Workaround issue in Typescript compiler
        // https://github.com/Microsoft/TypeScript/issues/13965#issuecomment-278570200
        _this.__proto__ = trueProto;
        return _this;
    }
    return TimeoutError;
}(Error));

/** Error thrown when an action is aborted. */
var AbortError = /** @class */ (function (_super) {
    __extends(AbortError, _super);
    /** Constructs a new instance of {@link AbortError}.
     *
     * @param {string} errorMessage A descriptive error message.
     */
    function AbortError(errorMessage) {
        var _newTarget = this.constructor;
        if (errorMessage === void 0) { errorMessage = "An abort occurred."; }
        var _this = this;
        var trueProto = _newTarget.prototype;
        _this = _super.call(this, errorMessage) || this;
        // Workaround issue in Typescript compiler
        // https://github.com/Microsoft/TypeScript/issues/13965#issuecomment-278570200
        _this.__proto__ = trueProto;
        return _this;
    }
    return AbortError;
}(Error));

//# sourceMappingURL=Errors.js.map
;// CONCATENATED MODULE: ./node_modules/app-base-v9/node_modules/@microsoft/signalr/dist/esm/HttpClient.js
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
var __assign = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
/** Represents an HTTP response. */
var HttpResponse = /** @class */ (function () {
    function HttpResponse(statusCode, statusText, content) {
        this.statusCode = statusCode;
        this.statusText = statusText;
        this.content = content;
    }
    return HttpResponse;
}());

/** Abstraction over an HTTP client.
 *
 * This class provides an abstraction over an HTTP client so that a different implementation can be provided on different platforms.
 */
var HttpClient = /** @class */ (function () {
    function HttpClient() {
    }
    HttpClient.prototype.get = function (url, options) {
        return this.send(__assign({}, options, { method: "GET", url: url }));
    };
    HttpClient.prototype.post = function (url, options) {
        return this.send(__assign({}, options, { method: "POST", url: url }));
    };
    HttpClient.prototype.delete = function (url, options) {
        return this.send(__assign({}, options, { method: "DELETE", url: url }));
    };
    /** Gets all cookies that apply to the specified URL.
     *
     * @param url The URL that the cookies are valid for.
     * @returns {string} A string containing all the key-value cookie pairs for the specified URL.
     */
    // @ts-ignore
    HttpClient.prototype.getCookieString = function (url) {
        return "";
    };
    return HttpClient;
}());

//# sourceMappingURL=HttpClient.js.map
;// CONCATENATED MODULE: ./node_modules/app-base-v9/node_modules/@microsoft/signalr/dist/esm/ILogger.js
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// These values are designed to match the ASP.NET Log Levels since that's the pattern we're emulating here.
/** Indicates the severity of a log message.
 *
 * Log Levels are ordered in increasing severity. So `Debug` is more severe than `Trace`, etc.
 */
var LogLevel;
(function (LogLevel) {
    /** Log level for very low severity diagnostic messages. */
    LogLevel[LogLevel["Trace"] = 0] = "Trace";
    /** Log level for low severity diagnostic messages. */
    LogLevel[LogLevel["Debug"] = 1] = "Debug";
    /** Log level for informational diagnostic messages. */
    LogLevel[LogLevel["Information"] = 2] = "Information";
    /** Log level for diagnostic messages that indicate a non-fatal problem. */
    LogLevel[LogLevel["Warning"] = 3] = "Warning";
    /** Log level for diagnostic messages that indicate a failure in the current operation. */
    LogLevel[LogLevel["Error"] = 4] = "Error";
    /** Log level for diagnostic messages that indicate a failure that will terminate the entire application. */
    LogLevel[LogLevel["Critical"] = 5] = "Critical";
    /** The highest possible log level. Used when configuring logging to indicate that no log messages should be emitted. */
    LogLevel[LogLevel["None"] = 6] = "None";
})(LogLevel || (LogLevel = {}));
//# sourceMappingURL=ILogger.js.map
;// CONCATENATED MODULE: ./node_modules/app-base-v9/node_modules/@microsoft/signalr/dist/esm/Loggers.js
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
/** A logger that does nothing when log messages are sent to it. */
var NullLogger = /** @class */ (function () {
    function NullLogger() {
    }
    /** @inheritDoc */
    // tslint:disable-next-line
    NullLogger.prototype.log = function (_logLevel, _message) {
    };
    /** The singleton instance of the {@link @microsoft/signalr.NullLogger}. */
    NullLogger.instance = new NullLogger();
    return NullLogger;
}());

//# sourceMappingURL=Loggers.js.map
;// CONCATENATED MODULE: ./node_modules/app-base-v9/node_modules/@microsoft/signalr/dist/esm/Utils.js
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
var Utils_assign = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
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


// Version token that will be replaced by the prepack command
/** The version of the SignalR client. */
var VERSION = "5.0.17";
/** @private */
var Arg = /** @class */ (function () {
    function Arg() {
    }
    Arg.isRequired = function (val, name) {
        if (val === null || val === undefined) {
            throw new Error("The '" + name + "' argument is required.");
        }
    };
    Arg.isNotEmpty = function (val, name) {
        if (!val || val.match(/^\s*$/)) {
            throw new Error("The '" + name + "' argument should not be empty.");
        }
    };
    Arg.isIn = function (val, values, name) {
        // TypeScript enums have keys for **both** the name and the value of each enum member on the type itself.
        if (!(val in values)) {
            throw new Error("Unknown " + name + " value: " + val + ".");
        }
    };
    return Arg;
}());

/** @private */
var Platform = /** @class */ (function () {
    function Platform() {
    }
    Object.defineProperty(Platform, "isBrowser", {
        get: function () {
            return typeof window === "object";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Platform, "isWebWorker", {
        get: function () {
            return typeof self === "object" && "importScripts" in self;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Platform, "isNode", {
        get: function () {
            return !this.isBrowser && !this.isWebWorker;
        },
        enumerable: true,
        configurable: true
    });
    return Platform;
}());

/** @private */
function getDataDetail(data, includeContent) {
    var detail = "";
    if (isArrayBuffer(data)) {
        detail = "Binary data of length " + data.byteLength;
        if (includeContent) {
            detail += ". Content: '" + formatArrayBuffer(data) + "'";
        }
    }
    else if (typeof data === "string") {
        detail = "String data of length " + data.length;
        if (includeContent) {
            detail += ". Content: '" + data + "'";
        }
    }
    return detail;
}
/** @private */
function formatArrayBuffer(data) {
    var view = new Uint8Array(data);
    // Uint8Array.map only supports returning another Uint8Array?
    var str = "";
    view.forEach(function (num) {
        var pad = num < 16 ? "0" : "";
        str += "0x" + pad + num.toString(16) + " ";
    });
    // Trim of trailing space.
    return str.substr(0, str.length - 1);
}
// Also in signalr-protocol-msgpack/Utils.ts
/** @private */
function isArrayBuffer(val) {
    return val && typeof ArrayBuffer !== "undefined" &&
        (val instanceof ArrayBuffer ||
            // Sometimes we get an ArrayBuffer that doesn't satisfy instanceof
            (val.constructor && val.constructor.name === "ArrayBuffer"));
}
/** @private */
function sendMessage(logger, transportName, httpClient, url, accessTokenFactory, content, logMessageContent, withCredentials, defaultHeaders) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, headers, token, _b, name, value, responseType, response;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    headers = {};
                    if (!accessTokenFactory) return [3 /*break*/, 2];
                    return [4 /*yield*/, accessTokenFactory()];
                case 1:
                    token = _c.sent();
                    if (token) {
                        headers = (_a = {},
                            _a["Authorization"] = "Bearer " + token,
                            _a);
                    }
                    _c.label = 2;
                case 2:
                    _b = getUserAgentHeader(), name = _b[0], value = _b[1];
                    headers[name] = value;
                    logger.log(LogLevel.Trace, "(" + transportName + " transport) sending data. " + getDataDetail(content, logMessageContent) + ".");
                    responseType = isArrayBuffer(content) ? "arraybuffer" : "text";
                    return [4 /*yield*/, httpClient.post(url, {
                            content: content,
                            headers: Utils_assign({}, headers, defaultHeaders),
                            responseType: responseType,
                            withCredentials: withCredentials,
                        })];
                case 3:
                    response = _c.sent();
                    logger.log(LogLevel.Trace, "(" + transportName + " transport) request complete. Response status: " + response.statusCode + ".");
                    return [2 /*return*/];
            }
        });
    });
}
/** @private */
function createLogger(logger) {
    if (logger === undefined) {
        return new ConsoleLogger(LogLevel.Information);
    }
    if (logger === null) {
        return NullLogger.instance;
    }
    if (logger.log) {
        return logger;
    }
    return new ConsoleLogger(logger);
}
/** @private */
var SubjectSubscription = /** @class */ (function () {
    function SubjectSubscription(subject, observer) {
        this.subject = subject;
        this.observer = observer;
    }
    SubjectSubscription.prototype.dispose = function () {
        var index = this.subject.observers.indexOf(this.observer);
        if (index > -1) {
            this.subject.observers.splice(index, 1);
        }
        if (this.subject.observers.length === 0 && this.subject.cancelCallback) {
            this.subject.cancelCallback().catch(function (_) { });
        }
    };
    return SubjectSubscription;
}());

/** @private */
var ConsoleLogger = /** @class */ (function () {
    function ConsoleLogger(minimumLogLevel) {
        this.minimumLogLevel = minimumLogLevel;
        this.outputConsole = console;
    }
    ConsoleLogger.prototype.log = function (logLevel, message) {
        if (logLevel >= this.minimumLogLevel) {
            switch (logLevel) {
                case LogLevel.Critical:
                case LogLevel.Error:
                    this.outputConsole.error("[" + new Date().toISOString() + "] " + LogLevel[logLevel] + ": " + message);
                    break;
                case LogLevel.Warning:
                    this.outputConsole.warn("[" + new Date().toISOString() + "] " + LogLevel[logLevel] + ": " + message);
                    break;
                case LogLevel.Information:
                    this.outputConsole.info("[" + new Date().toISOString() + "] " + LogLevel[logLevel] + ": " + message);
                    break;
                default:
                    // console.debug only goes to attached debuggers in Node, so we use console.log for Trace and Debug
                    this.outputConsole.log("[" + new Date().toISOString() + "] " + LogLevel[logLevel] + ": " + message);
                    break;
            }
        }
    };
    return ConsoleLogger;
}());

/** @private */
function getUserAgentHeader() {
    var userAgentHeaderName = "X-SignalR-User-Agent";
    if (Platform.isNode) {
        userAgentHeaderName = "User-Agent";
    }
    return [userAgentHeaderName, constructUserAgent(VERSION, getOsName(), getRuntime(), getRuntimeVersion())];
}
/** @private */
function constructUserAgent(version, os, runtime, runtimeVersion) {
    // Microsoft SignalR/[Version] ([Detailed Version]; [Operating System]; [Runtime]; [Runtime Version])
    var userAgent = "Microsoft SignalR/";
    var majorAndMinor = version.split(".");
    userAgent += majorAndMinor[0] + "." + majorAndMinor[1];
    userAgent += " (" + version + "; ";
    if (os && os !== "") {
        userAgent += os + "; ";
    }
    else {
        userAgent += "Unknown OS; ";
    }
    userAgent += "" + runtime;
    if (runtimeVersion) {
        userAgent += "; " + runtimeVersion;
    }
    else {
        userAgent += "; Unknown Runtime Version";
    }
    userAgent += ")";
    return userAgent;
}
function getOsName() {
    if (Platform.isNode) {
        switch (process.platform) {
            case "win32":
                return "Windows NT";
            case "darwin":
                return "macOS";
            case "linux":
                return "Linux";
            default:
                return process.platform;
        }
    }
    else {
        return "";
    }
}
function getRuntimeVersion() {
    if (Platform.isNode) {
        return process.versions.node;
    }
    return undefined;
}
function getRuntime() {
    if (Platform.isNode) {
        return "NodeJS";
    }
    else {
        return "Browser";
    }
}
//# sourceMappingURL=Utils.js.map
;// CONCATENATED MODULE: ./node_modules/app-base-v9/node_modules/@microsoft/signalr/dist/esm/FetchHttpClient.js
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
var FetchHttpClient_extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var FetchHttpClient_assign = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var FetchHttpClient_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var FetchHttpClient_generator = (undefined && undefined.__generator) || function (thisArg, body) {
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




var FetchHttpClient = /** @class */ (function (_super) {
    FetchHttpClient_extends(FetchHttpClient, _super);
    function FetchHttpClient(logger) {
        var _this = _super.call(this) || this;
        _this.logger = logger;
        if (typeof fetch === "undefined") {
            // In order to ignore the dynamic require in webpack builds we need to do this magic
            // @ts-ignore: TS doesn't know about these names
            var requireFunc =  true ? require : 0;
            // Cookies aren't automatically handled in Node so we need to add a CookieJar to preserve cookies across requests
            _this.jar = new (requireFunc("tough-cookie")).CookieJar();
            _this.fetchType = requireFunc("node-fetch");
            // node-fetch doesn't have a nice API for getting and setting cookies
            // fetch-cookie will wrap a fetch implementation with a default CookieJar or a provided one
            _this.fetchType = requireFunc("fetch-cookie")(_this.fetchType, _this.jar);
            // Node needs EventListener methods on AbortController which our custom polyfill doesn't provide
            _this.abortControllerType = requireFunc("abort-controller");
        }
        else {
            _this.fetchType = fetch.bind(self);
            _this.abortControllerType = AbortController;
        }
        return _this;
    }
    /** @inheritDoc */
    FetchHttpClient.prototype.send = function (request) {
        return FetchHttpClient_awaiter(this, void 0, void 0, function () {
            var abortController, error, timeoutId, msTimeout, response, e_1, content, payload;
            var _this = this;
            return FetchHttpClient_generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Check that abort was not signaled before calling send
                        if (request.abortSignal && request.abortSignal.aborted) {
                            throw new AbortError();
                        }
                        if (!request.method) {
                            throw new Error("No method defined.");
                        }
                        if (!request.url) {
                            throw new Error("No url defined.");
                        }
                        abortController = new this.abortControllerType();
                        // Hook our abortSignal into the abort controller
                        if (request.abortSignal) {
                            request.abortSignal.onabort = function () {
                                abortController.abort();
                                error = new AbortError();
                            };
                        }
                        timeoutId = null;
                        if (request.timeout) {
                            msTimeout = request.timeout;
                            timeoutId = setTimeout(function () {
                                abortController.abort();
                                _this.logger.log(LogLevel.Warning, "Timeout from HTTP request.");
                                error = new TimeoutError();
                            }, msTimeout);
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        return [4 /*yield*/, this.fetchType(request.url, {
                                body: request.content,
                                cache: "no-cache",
                                credentials: request.withCredentials === true ? "include" : "same-origin",
                                headers: FetchHttpClient_assign({ "Content-Type": "text/plain;charset=UTF-8", "X-Requested-With": "XMLHttpRequest" }, request.headers),
                                method: request.method,
                                mode: "cors",
                                redirect: "manual",
                                signal: abortController.signal,
                            })];
                    case 2:
                        response = _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        e_1 = _a.sent();
                        if (error) {
                            throw error;
                        }
                        this.logger.log(LogLevel.Warning, "Error from HTTP request. " + e_1 + ".");
                        throw e_1;
                    case 4:
                        if (timeoutId) {
                            clearTimeout(timeoutId);
                        }
                        if (request.abortSignal) {
                            request.abortSignal.onabort = null;
                        }
                        return [7 /*endfinally*/];
                    case 5:
                        if (!response.ok) {
                            throw new HttpError(response.statusText, response.status);
                        }
                        content = deserializeContent(response, request.responseType);
                        return [4 /*yield*/, content];
                    case 6:
                        payload = _a.sent();
                        return [2 /*return*/, new HttpResponse(response.status, response.statusText, payload)];
                }
            });
        });
    };
    FetchHttpClient.prototype.getCookieString = function (url) {
        var cookies = "";
        if (Platform.isNode && this.jar) {
            // @ts-ignore: unused variable
            this.jar.getCookies(url, function (e, c) { return cookies = c.join("; "); });
        }
        return cookies;
    };
    return FetchHttpClient;
}(HttpClient));

function deserializeContent(response, responseType) {
    var content;
    switch (responseType) {
        case "arraybuffer":
            content = response.arrayBuffer();
            break;
        case "text":
            content = response.text();
            break;
        case "blob":
        case "document":
        case "json":
            throw new Error(responseType + " is not supported.");
        default:
            content = response.text();
            break;
    }
    return content;
}
//# sourceMappingURL=FetchHttpClient.js.map
;// CONCATENATED MODULE: ./node_modules/app-base-v9/node_modules/@microsoft/signalr/dist/esm/XhrHttpClient.js
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
var XhrHttpClient_extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var XhrHttpClient = /** @class */ (function (_super) {
    XhrHttpClient_extends(XhrHttpClient, _super);
    function XhrHttpClient(logger) {
        var _this = _super.call(this) || this;
        _this.logger = logger;
        return _this;
    }
    /** @inheritDoc */
    XhrHttpClient.prototype.send = function (request) {
        var _this = this;
        // Check that abort was not signaled before calling send
        if (request.abortSignal && request.abortSignal.aborted) {
            return Promise.reject(new AbortError());
        }
        if (!request.method) {
            return Promise.reject(new Error("No method defined."));
        }
        if (!request.url) {
            return Promise.reject(new Error("No url defined."));
        }
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open(request.method, request.url, true);
            xhr.withCredentials = request.withCredentials === undefined ? true : request.withCredentials;
            xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
            // Explicitly setting the Content-Type header for React Native on Android platform.
            xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
            var headers = request.headers;
            if (headers) {
                Object.keys(headers)
                    .forEach(function (header) {
                    xhr.setRequestHeader(header, headers[header]);
                });
            }
            if (request.responseType) {
                xhr.responseType = request.responseType;
            }
            if (request.abortSignal) {
                request.abortSignal.onabort = function () {
                    xhr.abort();
                    reject(new AbortError());
                };
            }
            if (request.timeout) {
                xhr.timeout = request.timeout;
            }
            xhr.onload = function () {
                if (request.abortSignal) {
                    request.abortSignal.onabort = null;
                }
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(new HttpResponse(xhr.status, xhr.statusText, xhr.response || xhr.responseText));
                }
                else {
                    reject(new HttpError(xhr.statusText, xhr.status));
                }
            };
            xhr.onerror = function () {
                _this.logger.log(LogLevel.Warning, "Error from HTTP request. " + xhr.status + ": " + xhr.statusText + ".");
                reject(new HttpError(xhr.statusText, xhr.status));
            };
            xhr.ontimeout = function () {
                _this.logger.log(LogLevel.Warning, "Timeout from HTTP request.");
                reject(new TimeoutError());
            };
            xhr.send(request.content || "");
        });
    };
    return XhrHttpClient;
}(HttpClient));

//# sourceMappingURL=XhrHttpClient.js.map
;// CONCATENATED MODULE: ./node_modules/app-base-v9/node_modules/@microsoft/signalr/dist/esm/DefaultHttpClient.js
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
var DefaultHttpClient_extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();





/** Default implementation of {@link @microsoft/signalr.HttpClient}. */
var DefaultHttpClient = /** @class */ (function (_super) {
    DefaultHttpClient_extends(DefaultHttpClient, _super);
    /** Creates a new instance of the {@link @microsoft/signalr.DefaultHttpClient}, using the provided {@link @microsoft/signalr.ILogger} to log messages. */
    function DefaultHttpClient(logger) {
        var _this = _super.call(this) || this;
        if (typeof fetch !== "undefined" || Platform.isNode) {
            _this.httpClient = new FetchHttpClient(logger);
        }
        else if (typeof XMLHttpRequest !== "undefined") {
            _this.httpClient = new XhrHttpClient(logger);
        }
        else {
            throw new Error("No usable HttpClient found.");
        }
        return _this;
    }
    /** @inheritDoc */
    DefaultHttpClient.prototype.send = function (request) {
        // Check that abort was not signaled before calling send
        if (request.abortSignal && request.abortSignal.aborted) {
            return Promise.reject(new AbortError());
        }
        if (!request.method) {
            return Promise.reject(new Error("No method defined."));
        }
        if (!request.url) {
            return Promise.reject(new Error("No url defined."));
        }
        return this.httpClient.send(request);
    };
    DefaultHttpClient.prototype.getCookieString = function (url) {
        return this.httpClient.getCookieString(url);
    };
    return DefaultHttpClient;
}(HttpClient));

//# sourceMappingURL=DefaultHttpClient.js.map
;// CONCATENATED MODULE: ./node_modules/app-base-v9/node_modules/@microsoft/signalr/dist/esm/TextMessageFormat.js
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Not exported from index
/** @private */
var TextMessageFormat = /** @class */ (function () {
    function TextMessageFormat() {
    }
    TextMessageFormat.write = function (output) {
        return "" + output + TextMessageFormat.RecordSeparator;
    };
    TextMessageFormat.parse = function (input) {
        if (input[input.length - 1] !== TextMessageFormat.RecordSeparator) {
            throw new Error("Message is incomplete.");
        }
        var messages = input.split(TextMessageFormat.RecordSeparator);
        messages.pop();
        return messages;
    };
    TextMessageFormat.RecordSeparatorCode = 0x1e;
    TextMessageFormat.RecordSeparator = String.fromCharCode(TextMessageFormat.RecordSeparatorCode);
    return TextMessageFormat;
}());

//# sourceMappingURL=TextMessageFormat.js.map
;// CONCATENATED MODULE: ./node_modules/app-base-v9/node_modules/@microsoft/signalr/dist/esm/HandshakeProtocol.js
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.


/** @private */
var HandshakeProtocol = /** @class */ (function () {
    function HandshakeProtocol() {
    }
    // Handshake request is always JSON
    HandshakeProtocol.prototype.writeHandshakeRequest = function (handshakeRequest) {
        return TextMessageFormat.write(JSON.stringify(handshakeRequest));
    };
    HandshakeProtocol.prototype.parseHandshakeResponse = function (data) {
        var responseMessage;
        var messageData;
        var remainingData;
        if (isArrayBuffer(data) || (typeof Buffer !== "undefined" && data instanceof Buffer)) {
            // Format is binary but still need to read JSON text from handshake response
            var binaryData = new Uint8Array(data);
            var separatorIndex = binaryData.indexOf(TextMessageFormat.RecordSeparatorCode);
            if (separatorIndex === -1) {
                throw new Error("Message is incomplete.");
            }
            // content before separator is handshake response
            // optional content after is additional messages
            var responseLength = separatorIndex + 1;
            messageData = String.fromCharCode.apply(null, binaryData.slice(0, responseLength));
            remainingData = (binaryData.byteLength > responseLength) ? binaryData.slice(responseLength).buffer : null;
        }
        else {
            var textData = data;
            var separatorIndex = textData.indexOf(TextMessageFormat.RecordSeparator);
            if (separatorIndex === -1) {
                throw new Error("Message is incomplete.");
            }
            // content before separator is handshake response
            // optional content after is additional messages
            var responseLength = separatorIndex + 1;
            messageData = textData.substring(0, responseLength);
            remainingData = (textData.length > responseLength) ? textData.substring(responseLength) : null;
        }
        // At this point we should have just the single handshake message
        var messages = TextMessageFormat.parse(messageData);
        var response = JSON.parse(messages[0]);
        if (response.type) {
            throw new Error("Expected a handshake response from the server.");
        }
        responseMessage = response;
        // multiple messages could have arrived with handshake
        // return additional data to be parsed as usual, or null if all parsed
        return [remainingData, responseMessage];
    };
    return HandshakeProtocol;
}());

//# sourceMappingURL=HandshakeProtocol.js.map
;// CONCATENATED MODULE: ./node_modules/app-base-v9/node_modules/@microsoft/signalr/dist/esm/IHubProtocol.js
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
/** Defines the type of a Hub Message. */
var MessageType;
(function (MessageType) {
    /** Indicates the message is an Invocation message and implements the {@link @microsoft/signalr.InvocationMessage} interface. */
    MessageType[MessageType["Invocation"] = 1] = "Invocation";
    /** Indicates the message is a StreamItem message and implements the {@link @microsoft/signalr.StreamItemMessage} interface. */
    MessageType[MessageType["StreamItem"] = 2] = "StreamItem";
    /** Indicates the message is a Completion message and implements the {@link @microsoft/signalr.CompletionMessage} interface. */
    MessageType[MessageType["Completion"] = 3] = "Completion";
    /** Indicates the message is a Stream Invocation message and implements the {@link @microsoft/signalr.StreamInvocationMessage} interface. */
    MessageType[MessageType["StreamInvocation"] = 4] = "StreamInvocation";
    /** Indicates the message is a Cancel Invocation message and implements the {@link @microsoft/signalr.CancelInvocationMessage} interface. */
    MessageType[MessageType["CancelInvocation"] = 5] = "CancelInvocation";
    /** Indicates the message is a Ping message and implements the {@link @microsoft/signalr.PingMessage} interface. */
    MessageType[MessageType["Ping"] = 6] = "Ping";
    /** Indicates the message is a Close message and implements the {@link @microsoft/signalr.CloseMessage} interface. */
    MessageType[MessageType["Close"] = 7] = "Close";
})(MessageType || (MessageType = {}));
//# sourceMappingURL=IHubProtocol.js.map
;// CONCATENATED MODULE: ./node_modules/app-base-v9/node_modules/@microsoft/signalr/dist/esm/Subject.js
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.

/** Stream implementation to stream items to the server. */
var Subject = /** @class */ (function () {
    function Subject() {
        this.observers = [];
    }
    Subject.prototype.next = function (item) {
        for (var _i = 0, _a = this.observers; _i < _a.length; _i++) {
            var observer = _a[_i];
            observer.next(item);
        }
    };
    Subject.prototype.error = function (err) {
        for (var _i = 0, _a = this.observers; _i < _a.length; _i++) {
            var observer = _a[_i];
            if (observer.error) {
                observer.error(err);
            }
        }
    };
    Subject.prototype.complete = function () {
        for (var _i = 0, _a = this.observers; _i < _a.length; _i++) {
            var observer = _a[_i];
            if (observer.complete) {
                observer.complete();
            }
        }
    };
    Subject.prototype.subscribe = function (observer) {
        this.observers.push(observer);
        return new SubjectSubscription(this, observer);
    };
    return Subject;
}());

//# sourceMappingURL=Subject.js.map
;// CONCATENATED MODULE: ./node_modules/app-base-v9/node_modules/@microsoft/signalr/dist/esm/HubConnection.js
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
var HubConnection_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var HubConnection_generator = (undefined && undefined.__generator) || function (thisArg, body) {
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





var DEFAULT_TIMEOUT_IN_MS = 30 * 1000;
var DEFAULT_PING_INTERVAL_IN_MS = 15 * 1000;
/** Describes the current state of the {@link HubConnection} to the server. */
var HubConnectionState;
(function (HubConnectionState) {
    /** The hub connection is disconnected. */
    HubConnectionState["Disconnected"] = "Disconnected";
    /** The hub connection is connecting. */
    HubConnectionState["Connecting"] = "Connecting";
    /** The hub connection is connected. */
    HubConnectionState["Connected"] = "Connected";
    /** The hub connection is disconnecting. */
    HubConnectionState["Disconnecting"] = "Disconnecting";
    /** The hub connection is reconnecting. */
    HubConnectionState["Reconnecting"] = "Reconnecting";
})(HubConnectionState || (HubConnectionState = {}));
/** Represents a connection to a SignalR Hub. */
var HubConnection = /** @class */ (function () {
    function HubConnection(connection, logger, protocol, reconnectPolicy) {
        var _this = this;
        this.nextKeepAlive = 0;
        Arg.isRequired(connection, "connection");
        Arg.isRequired(logger, "logger");
        Arg.isRequired(protocol, "protocol");
        this.serverTimeoutInMilliseconds = DEFAULT_TIMEOUT_IN_MS;
        this.keepAliveIntervalInMilliseconds = DEFAULT_PING_INTERVAL_IN_MS;
        this.logger = logger;
        this.protocol = protocol;
        this.connection = connection;
        this.reconnectPolicy = reconnectPolicy;
        this.handshakeProtocol = new HandshakeProtocol();
        this.connection.onreceive = function (data) { return _this.processIncomingData(data); };
        this.connection.onclose = function (error) { return _this.connectionClosed(error); };
        this.callbacks = {};
        this.methods = {};
        this.closedCallbacks = [];
        this.reconnectingCallbacks = [];
        this.reconnectedCallbacks = [];
        this.invocationId = 0;
        this.receivedHandshakeResponse = false;
        this.connectionState = HubConnectionState.Disconnected;
        this.connectionStarted = false;
        this.cachedPingMessage = this.protocol.writeMessage({ type: MessageType.Ping });
    }
    /** @internal */
    // Using a public static factory method means we can have a private constructor and an _internal_
    // create method that can be used by HubConnectionBuilder. An "internal" constructor would just
    // be stripped away and the '.d.ts' file would have no constructor, which is interpreted as a
    // public parameter-less constructor.
    HubConnection.create = function (connection, logger, protocol, reconnectPolicy) {
        return new HubConnection(connection, logger, protocol, reconnectPolicy);
    };
    Object.defineProperty(HubConnection.prototype, "state", {
        /** Indicates the state of the {@link HubConnection} to the server. */
        get: function () {
            return this.connectionState;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HubConnection.prototype, "connectionId", {
        /** Represents the connection id of the {@link HubConnection} on the server. The connection id will be null when the connection is either
         *  in the disconnected state or if the negotiation step was skipped.
         */
        get: function () {
            return this.connection ? (this.connection.connectionId || null) : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HubConnection.prototype, "baseUrl", {
        /** Indicates the url of the {@link HubConnection} to the server. */
        get: function () {
            return this.connection.baseUrl || "";
        },
        /**
         * Sets a new url for the HubConnection. Note that the url can only be changed when the connection is in either the Disconnected or
         * Reconnecting states.
         * @param {string} url The url to connect to.
         */
        set: function (url) {
            if (this.connectionState !== HubConnectionState.Disconnected && this.connectionState !== HubConnectionState.Reconnecting) {
                throw new Error("The HubConnection must be in the Disconnected or Reconnecting state to change the url.");
            }
            if (!url) {
                throw new Error("The HubConnection url must be a valid url.");
            }
            this.connection.baseUrl = url;
        },
        enumerable: true,
        configurable: true
    });
    /** Starts the connection.
     *
     * @returns {Promise<void>} A Promise that resolves when the connection has been successfully established, or rejects with an error.
     */
    HubConnection.prototype.start = function () {
        this.startPromise = this.startWithStateTransitions();
        return this.startPromise;
    };
    HubConnection.prototype.startWithStateTransitions = function () {
        return HubConnection_awaiter(this, void 0, void 0, function () {
            var e_1;
            return HubConnection_generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.connectionState !== HubConnectionState.Disconnected) {
                            return [2 /*return*/, Promise.reject(new Error("Cannot start a HubConnection that is not in the 'Disconnected' state."))];
                        }
                        this.connectionState = HubConnectionState.Connecting;
                        this.logger.log(LogLevel.Debug, "Starting HubConnection.");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.startInternal()];
                    case 2:
                        _a.sent();
                        this.connectionState = HubConnectionState.Connected;
                        this.connectionStarted = true;
                        this.logger.log(LogLevel.Debug, "HubConnection connected successfully.");
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        this.connectionState = HubConnectionState.Disconnected;
                        this.logger.log(LogLevel.Debug, "HubConnection failed to start successfully because of error '" + e_1 + "'.");
                        return [2 /*return*/, Promise.reject(e_1)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    HubConnection.prototype.startInternal = function () {
        return HubConnection_awaiter(this, void 0, void 0, function () {
            var handshakePromise, handshakeRequest, e_2;
            var _this = this;
            return HubConnection_generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.stopDuringStartError = undefined;
                        this.receivedHandshakeResponse = false;
                        handshakePromise = new Promise(function (resolve, reject) {
                            _this.handshakeResolver = resolve;
                            _this.handshakeRejecter = reject;
                        });
                        return [4 /*yield*/, this.connection.start(this.protocol.transferFormat)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 5, , 7]);
                        handshakeRequest = {
                            protocol: this.protocol.name,
                            version: this.protocol.version,
                        };
                        this.logger.log(LogLevel.Debug, "Sending handshake request.");
                        return [4 /*yield*/, this.sendMessage(this.handshakeProtocol.writeHandshakeRequest(handshakeRequest))];
                    case 3:
                        _a.sent();
                        this.logger.log(LogLevel.Information, "Using HubProtocol '" + this.protocol.name + "'.");
                        // defensively cleanup timeout in case we receive a message from the server before we finish start
                        this.cleanupTimeout();
                        this.resetTimeoutPeriod();
                        this.resetKeepAliveInterval();
                        return [4 /*yield*/, handshakePromise];
                    case 4:
                        _a.sent();
                        // It's important to check the stopDuringStartError instead of just relying on the handshakePromise
                        // being rejected on close, because this continuation can run after both the handshake completed successfully
                        // and the connection was closed.
                        if (this.stopDuringStartError) {
                            // It's important to throw instead of returning a rejected promise, because we don't want to allow any state
                            // transitions to occur between now and the calling code observing the exceptions. Returning a rejected promise
                            // will cause the calling continuation to get scheduled to run later.
                            throw this.stopDuringStartError;
                        }
                        return [3 /*break*/, 7];
                    case 5:
                        e_2 = _a.sent();
                        this.logger.log(LogLevel.Debug, "Hub handshake failed with error '" + e_2 + "' during start(). Stopping HubConnection.");
                        this.cleanupTimeout();
                        this.cleanupPingTimer();
                        // HttpConnection.stop() should not complete until after the onclose callback is invoked.
                        // This will transition the HubConnection to the disconnected state before HttpConnection.stop() completes.
                        return [4 /*yield*/, this.connection.stop(e_2)];
                    case 6:
                        // HttpConnection.stop() should not complete until after the onclose callback is invoked.
                        // This will transition the HubConnection to the disconnected state before HttpConnection.stop() completes.
                        _a.sent();
                        throw e_2;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    /** Stops the connection.
     *
     * @returns {Promise<void>} A Promise that resolves when the connection has been successfully terminated, or rejects with an error.
     */
    HubConnection.prototype.stop = function () {
        return HubConnection_awaiter(this, void 0, void 0, function () {
            var startPromise, e_3;
            return HubConnection_generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        startPromise = this.startPromise;
                        this.stopPromise = this.stopInternal();
                        return [4 /*yield*/, this.stopPromise];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        // Awaiting undefined continues immediately
                        return [4 /*yield*/, startPromise];
                    case 3:
                        // Awaiting undefined continues immediately
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        e_3 = _a.sent();
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    HubConnection.prototype.stopInternal = function (error) {
        if (this.connectionState === HubConnectionState.Disconnected) {
            this.logger.log(LogLevel.Debug, "Call to HubConnection.stop(" + error + ") ignored because it is already in the disconnected state.");
            return Promise.resolve();
        }
        if (this.connectionState === HubConnectionState.Disconnecting) {
            this.logger.log(LogLevel.Debug, "Call to HttpConnection.stop(" + error + ") ignored because the connection is already in the disconnecting state.");
            return this.stopPromise;
        }
        this.connectionState = HubConnectionState.Disconnecting;
        this.logger.log(LogLevel.Debug, "Stopping HubConnection.");
        if (this.reconnectDelayHandle) {
            // We're in a reconnect delay which means the underlying connection is currently already stopped.
            // Just clear the handle to stop the reconnect loop (which no one is waiting on thankfully) and
            // fire the onclose callbacks.
            this.logger.log(LogLevel.Debug, "Connection stopped during reconnect delay. Done reconnecting.");
            clearTimeout(this.reconnectDelayHandle);
            this.reconnectDelayHandle = undefined;
            this.completeClose();
            return Promise.resolve();
        }
        this.cleanupTimeout();
        this.cleanupPingTimer();
        this.stopDuringStartError = error || new Error("The connection was stopped before the hub handshake could complete.");
        // HttpConnection.stop() should not complete until after either HttpConnection.start() fails
        // or the onclose callback is invoked. The onclose callback will transition the HubConnection
        // to the disconnected state if need be before HttpConnection.stop() completes.
        return this.connection.stop(error);
    };
    /** Invokes a streaming hub method on the server using the specified name and arguments.
     *
     * @typeparam T The type of the items returned by the server.
     * @param {string} methodName The name of the server method to invoke.
     * @param {any[]} args The arguments used to invoke the server method.
     * @returns {IStreamResult<T>} An object that yields results from the server as they are received.
     */
    HubConnection.prototype.stream = function (methodName) {
        var _this = this;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var _a = this.replaceStreamingParams(args), streams = _a[0], streamIds = _a[1];
        var invocationDescriptor = this.createStreamInvocation(methodName, args, streamIds);
        var promiseQueue;
        var subject = new Subject();
        subject.cancelCallback = function () {
            var cancelInvocation = _this.createCancelInvocation(invocationDescriptor.invocationId);
            delete _this.callbacks[invocationDescriptor.invocationId];
            return promiseQueue.then(function () {
                return _this.sendWithProtocol(cancelInvocation);
            });
        };
        this.callbacks[invocationDescriptor.invocationId] = function (invocationEvent, error) {
            if (error) {
                subject.error(error);
                return;
            }
            else if (invocationEvent) {
                // invocationEvent will not be null when an error is not passed to the callback
                if (invocationEvent.type === MessageType.Completion) {
                    if (invocationEvent.error) {
                        subject.error(new Error(invocationEvent.error));
                    }
                    else {
                        subject.complete();
                    }
                }
                else {
                    subject.next((invocationEvent.item));
                }
            }
        };
        promiseQueue = this.sendWithProtocol(invocationDescriptor)
            .catch(function (e) {
            subject.error(e);
            delete _this.callbacks[invocationDescriptor.invocationId];
        });
        this.launchStreams(streams, promiseQueue);
        return subject;
    };
    HubConnection.prototype.sendMessage = function (message) {
        this.resetKeepAliveInterval();
        return this.connection.send(message);
    };
    /**
     * Sends a js object to the server.
     * @param message The js object to serialize and send.
     */
    HubConnection.prototype.sendWithProtocol = function (message) {
        return this.sendMessage(this.protocol.writeMessage(message));
    };
    /** Invokes a hub method on the server using the specified name and arguments. Does not wait for a response from the receiver.
     *
     * The Promise returned by this method resolves when the client has sent the invocation to the server. The server may still
     * be processing the invocation.
     *
     * @param {string} methodName The name of the server method to invoke.
     * @param {any[]} args The arguments used to invoke the server method.
     * @returns {Promise<void>} A Promise that resolves when the invocation has been successfully sent, or rejects with an error.
     */
    HubConnection.prototype.send = function (methodName) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var _a = this.replaceStreamingParams(args), streams = _a[0], streamIds = _a[1];
        var sendPromise = this.sendWithProtocol(this.createInvocation(methodName, args, true, streamIds));
        this.launchStreams(streams, sendPromise);
        return sendPromise;
    };
    /** Invokes a hub method on the server using the specified name and arguments.
     *
     * The Promise returned by this method resolves when the server indicates it has finished invoking the method. When the promise
     * resolves, the server has finished invoking the method. If the server method returns a result, it is produced as the result of
     * resolving the Promise.
     *
     * @typeparam T The expected return type.
     * @param {string} methodName The name of the server method to invoke.
     * @param {any[]} args The arguments used to invoke the server method.
     * @returns {Promise<T>} A Promise that resolves with the result of the server method (if any), or rejects with an error.
     */
    HubConnection.prototype.invoke = function (methodName) {
        var _this = this;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var _a = this.replaceStreamingParams(args), streams = _a[0], streamIds = _a[1];
        var invocationDescriptor = this.createInvocation(methodName, args, false, streamIds);
        var p = new Promise(function (resolve, reject) {
            // invocationId will always have a value for a non-blocking invocation
            _this.callbacks[invocationDescriptor.invocationId] = function (invocationEvent, error) {
                if (error) {
                    reject(error);
                    return;
                }
                else if (invocationEvent) {
                    // invocationEvent will not be null when an error is not passed to the callback
                    if (invocationEvent.type === MessageType.Completion) {
                        if (invocationEvent.error) {
                            reject(new Error(invocationEvent.error));
                        }
                        else {
                            resolve(invocationEvent.result);
                        }
                    }
                    else {
                        reject(new Error("Unexpected message type: " + invocationEvent.type));
                    }
                }
            };
            var promiseQueue = _this.sendWithProtocol(invocationDescriptor)
                .catch(function (e) {
                reject(e);
                // invocationId will always have a value for a non-blocking invocation
                delete _this.callbacks[invocationDescriptor.invocationId];
            });
            _this.launchStreams(streams, promiseQueue);
        });
        return p;
    };
    /** Registers a handler that will be invoked when the hub method with the specified method name is invoked.
     *
     * @param {string} methodName The name of the hub method to define.
     * @param {Function} newMethod The handler that will be raised when the hub method is invoked.
     */
    HubConnection.prototype.on = function (methodName, newMethod) {
        if (!methodName || !newMethod) {
            return;
        }
        methodName = methodName.toLowerCase();
        if (!this.methods[methodName]) {
            this.methods[methodName] = [];
        }
        // Preventing adding the same handler multiple times.
        if (this.methods[methodName].indexOf(newMethod) !== -1) {
            return;
        }
        this.methods[methodName].push(newMethod);
    };
    HubConnection.prototype.off = function (methodName, method) {
        if (!methodName) {
            return;
        }
        methodName = methodName.toLowerCase();
        var handlers = this.methods[methodName];
        if (!handlers) {
            return;
        }
        if (method) {
            var removeIdx = handlers.indexOf(method);
            if (removeIdx !== -1) {
                handlers.splice(removeIdx, 1);
                if (handlers.length === 0) {
                    delete this.methods[methodName];
                }
            }
        }
        else {
            delete this.methods[methodName];
        }
    };
    /** Registers a handler that will be invoked when the connection is closed.
     *
     * @param {Function} callback The handler that will be invoked when the connection is closed. Optionally receives a single argument containing the error that caused the connection to close (if any).
     */
    HubConnection.prototype.onclose = function (callback) {
        if (callback) {
            this.closedCallbacks.push(callback);
        }
    };
    /** Registers a handler that will be invoked when the connection starts reconnecting.
     *
     * @param {Function} callback The handler that will be invoked when the connection starts reconnecting. Optionally receives a single argument containing the error that caused the connection to start reconnecting (if any).
     */
    HubConnection.prototype.onreconnecting = function (callback) {
        if (callback) {
            this.reconnectingCallbacks.push(callback);
        }
    };
    /** Registers a handler that will be invoked when the connection successfully reconnects.
     *
     * @param {Function} callback The handler that will be invoked when the connection successfully reconnects.
     */
    HubConnection.prototype.onreconnected = function (callback) {
        if (callback) {
            this.reconnectedCallbacks.push(callback);
        }
    };
    HubConnection.prototype.processIncomingData = function (data) {
        this.cleanupTimeout();
        if (!this.receivedHandshakeResponse) {
            data = this.processHandshakeResponse(data);
            this.receivedHandshakeResponse = true;
        }
        // Data may have all been read when processing handshake response
        if (data) {
            // Parse the messages
            var messages = this.protocol.parseMessages(data, this.logger);
            for (var _i = 0, messages_1 = messages; _i < messages_1.length; _i++) {
                var message = messages_1[_i];
                switch (message.type) {
                    case MessageType.Invocation:
                        this.invokeClientMethod(message);
                        break;
                    case MessageType.StreamItem:
                    case MessageType.Completion:
                        var callback = this.callbacks[message.invocationId];
                        if (callback) {
                            if (message.type === MessageType.Completion) {
                                delete this.callbacks[message.invocationId];
                            }
                            callback(message);
                        }
                        break;
                    case MessageType.Ping:
                        // Don't care about pings
                        break;
                    case MessageType.Close:
                        this.logger.log(LogLevel.Information, "Close message received from server.");
                        var error = message.error ? new Error("Server returned an error on close: " + message.error) : undefined;
                        if (message.allowReconnect === true) {
                            // It feels wrong not to await connection.stop() here, but processIncomingData is called as part of an onreceive callback which is not async,
                            // this is already the behavior for serverTimeout(), and HttpConnection.Stop() should catch and log all possible exceptions.
                            // tslint:disable-next-line:no-floating-promises
                            this.connection.stop(error);
                        }
                        else {
                            // We cannot await stopInternal() here, but subsequent calls to stop() will await this if stopInternal() is still ongoing.
                            this.stopPromise = this.stopInternal(error);
                        }
                        break;
                    default:
                        this.logger.log(LogLevel.Warning, "Invalid message type: " + message.type + ".");
                        break;
                }
            }
        }
        this.resetTimeoutPeriod();
    };
    HubConnection.prototype.processHandshakeResponse = function (data) {
        var _a;
        var responseMessage;
        var remainingData;
        try {
            _a = this.handshakeProtocol.parseHandshakeResponse(data), remainingData = _a[0], responseMessage = _a[1];
        }
        catch (e) {
            var message = "Error parsing handshake response: " + e;
            this.logger.log(LogLevel.Error, message);
            var error = new Error(message);
            this.handshakeRejecter(error);
            throw error;
        }
        if (responseMessage.error) {
            var message = "Server returned handshake error: " + responseMessage.error;
            this.logger.log(LogLevel.Error, message);
            var error = new Error(message);
            this.handshakeRejecter(error);
            throw error;
        }
        else {
            this.logger.log(LogLevel.Debug, "Server handshake complete.");
        }
        this.handshakeResolver();
        return remainingData;
    };
    HubConnection.prototype.resetKeepAliveInterval = function () {
        if (this.connection.features.inherentKeepAlive) {
            return;
        }
        // Set the time we want the next keep alive to be sent
        // Timer will be setup on next message receive
        this.nextKeepAlive = new Date().getTime() + this.keepAliveIntervalInMilliseconds;
        this.cleanupPingTimer();
    };
    HubConnection.prototype.resetTimeoutPeriod = function () {
        var _this = this;
        if (!this.connection.features || !this.connection.features.inherentKeepAlive) {
            // Set the timeout timer
            this.timeoutHandle = setTimeout(function () { return _this.serverTimeout(); }, this.serverTimeoutInMilliseconds);
            // Set keepAlive timer if there isn't one
            if (this.pingServerHandle === undefined) {
                var nextPing = this.nextKeepAlive - new Date().getTime();
                if (nextPing < 0) {
                    nextPing = 0;
                }
                // The timer needs to be set from a networking callback to avoid Chrome timer throttling from causing timers to run once a minute
                this.pingServerHandle = setTimeout(function () { return HubConnection_awaiter(_this, void 0, void 0, function () {
                    var _a;
                    return HubConnection_generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                if (!(this.connectionState === HubConnectionState.Connected)) return [3 /*break*/, 4];
                                _b.label = 1;
                            case 1:
                                _b.trys.push([1, 3, , 4]);
                                return [4 /*yield*/, this.sendMessage(this.cachedPingMessage)];
                            case 2:
                                _b.sent();
                                return [3 /*break*/, 4];
                            case 3:
                                _a = _b.sent();
                                // We don't care about the error. It should be seen elsewhere in the client.
                                // The connection is probably in a bad or closed state now, cleanup the timer so it stops triggering
                                this.cleanupPingTimer();
                                return [3 /*break*/, 4];
                            case 4: return [2 /*return*/];
                        }
                    });
                }); }, nextPing);
            }
        }
    };
    HubConnection.prototype.serverTimeout = function () {
        // The server hasn't talked to us in a while. It doesn't like us anymore ... :(
        // Terminate the connection, but we don't need to wait on the promise. This could trigger reconnecting.
        // tslint:disable-next-line:no-floating-promises
        this.connection.stop(new Error("Server timeout elapsed without receiving a message from the server."));
    };
    HubConnection.prototype.invokeClientMethod = function (invocationMessage) {
        var _this = this;
        var methods = this.methods[invocationMessage.target.toLowerCase()];
        if (methods) {
            try {
                methods.forEach(function (m) { return m.apply(_this, invocationMessage.arguments); });
            }
            catch (e) {
                this.logger.log(LogLevel.Error, "A callback for the method " + invocationMessage.target.toLowerCase() + " threw error '" + e + "'.");
            }
            if (invocationMessage.invocationId) {
                // This is not supported in v1. So we return an error to avoid blocking the server waiting for the response.
                var message = "Server requested a response, which is not supported in this version of the client.";
                this.logger.log(LogLevel.Error, message);
                // We don't want to wait on the stop itself.
                this.stopPromise = this.stopInternal(new Error(message));
            }
        }
        else {
            this.logger.log(LogLevel.Warning, "No client method with the name '" + invocationMessage.target + "' found.");
        }
    };
    HubConnection.prototype.connectionClosed = function (error) {
        this.logger.log(LogLevel.Debug, "HubConnection.connectionClosed(" + error + ") called while in state " + this.connectionState + ".");
        // Triggering this.handshakeRejecter is insufficient because it could already be resolved without the continuation having run yet.
        this.stopDuringStartError = this.stopDuringStartError || error || new Error("The underlying connection was closed before the hub handshake could complete.");
        // If the handshake is in progress, start will be waiting for the handshake promise, so we complete it.
        // If it has already completed, this should just noop.
        if (this.handshakeResolver) {
            this.handshakeResolver();
        }
        this.cancelCallbacksWithError(error || new Error("Invocation canceled due to the underlying connection being closed."));
        this.cleanupTimeout();
        this.cleanupPingTimer();
        if (this.connectionState === HubConnectionState.Disconnecting) {
            this.completeClose(error);
        }
        else if (this.connectionState === HubConnectionState.Connected && this.reconnectPolicy) {
            // tslint:disable-next-line:no-floating-promises
            this.reconnect(error);
        }
        else if (this.connectionState === HubConnectionState.Connected) {
            this.completeClose(error);
        }
        // If none of the above if conditions were true were called the HubConnection must be in either:
        // 1. The Connecting state in which case the handshakeResolver will complete it and stopDuringStartError will fail it.
        // 2. The Reconnecting state in which case the handshakeResolver will complete it and stopDuringStartError will fail the current reconnect attempt
        //    and potentially continue the reconnect() loop.
        // 3. The Disconnected state in which case we're already done.
    };
    HubConnection.prototype.completeClose = function (error) {
        var _this = this;
        if (this.connectionStarted) {
            this.connectionState = HubConnectionState.Disconnected;
            this.connectionStarted = false;
            try {
                this.closedCallbacks.forEach(function (c) { return c.apply(_this, [error]); });
            }
            catch (e) {
                this.logger.log(LogLevel.Error, "An onclose callback called with error '" + error + "' threw error '" + e + "'.");
            }
        }
    };
    HubConnection.prototype.reconnect = function (error) {
        return HubConnection_awaiter(this, void 0, void 0, function () {
            var reconnectStartTime, previousReconnectAttempts, retryError, nextRetryDelay, e_4;
            var _this = this;
            return HubConnection_generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        reconnectStartTime = Date.now();
                        previousReconnectAttempts = 0;
                        retryError = error !== undefined ? error : new Error("Attempting to reconnect due to a unknown error.");
                        nextRetryDelay = this.getNextRetryDelay(previousReconnectAttempts++, 0, retryError);
                        if (nextRetryDelay === null) {
                            this.logger.log(LogLevel.Debug, "Connection not reconnecting because the IRetryPolicy returned null on the first reconnect attempt.");
                            this.completeClose(error);
                            return [2 /*return*/];
                        }
                        this.connectionState = HubConnectionState.Reconnecting;
                        if (error) {
                            this.logger.log(LogLevel.Information, "Connection reconnecting because of error '" + error + "'.");
                        }
                        else {
                            this.logger.log(LogLevel.Information, "Connection reconnecting.");
                        }
                        if (this.onreconnecting) {
                            try {
                                this.reconnectingCallbacks.forEach(function (c) { return c.apply(_this, [error]); });
                            }
                            catch (e) {
                                this.logger.log(LogLevel.Error, "An onreconnecting callback called with error '" + error + "' threw error '" + e + "'.");
                            }
                            // Exit early if an onreconnecting callback called connection.stop().
                            if (this.connectionState !== HubConnectionState.Reconnecting) {
                                this.logger.log(LogLevel.Debug, "Connection left the reconnecting state in onreconnecting callback. Done reconnecting.");
                                return [2 /*return*/];
                            }
                        }
                        _a.label = 1;
                    case 1:
                        if (!(nextRetryDelay !== null)) return [3 /*break*/, 7];
                        this.logger.log(LogLevel.Information, "Reconnect attempt number " + previousReconnectAttempts + " will start in " + nextRetryDelay + " ms.");
                        return [4 /*yield*/, new Promise(function (resolve) {
                                _this.reconnectDelayHandle = setTimeout(resolve, nextRetryDelay);
                            })];
                    case 2:
                        _a.sent();
                        this.reconnectDelayHandle = undefined;
                        if (this.connectionState !== HubConnectionState.Reconnecting) {
                            this.logger.log(LogLevel.Debug, "Connection left the reconnecting state during reconnect delay. Done reconnecting.");
                            return [2 /*return*/];
                        }
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, this.startInternal()];
                    case 4:
                        _a.sent();
                        this.connectionState = HubConnectionState.Connected;
                        this.logger.log(LogLevel.Information, "HubConnection reconnected successfully.");
                        if (this.onreconnected) {
                            try {
                                this.reconnectedCallbacks.forEach(function (c) { return c.apply(_this, [_this.connection.connectionId]); });
                            }
                            catch (e) {
                                this.logger.log(LogLevel.Error, "An onreconnected callback called with connectionId '" + this.connection.connectionId + "; threw error '" + e + "'.");
                            }
                        }
                        return [2 /*return*/];
                    case 5:
                        e_4 = _a.sent();
                        this.logger.log(LogLevel.Information, "Reconnect attempt failed because of error '" + e_4 + "'.");
                        if (this.connectionState !== HubConnectionState.Reconnecting) {
                            this.logger.log(LogLevel.Debug, "Connection moved to the '" + this.connectionState + "' from the reconnecting state during reconnect attempt. Done reconnecting.");
                            // The TypeScript compiler thinks that connectionState must be Connected here. The TypeScript compiler is wrong.
                            if (this.connectionState === HubConnectionState.Disconnecting) {
                                this.completeClose();
                            }
                            return [2 /*return*/];
                        }
                        retryError = e_4 instanceof Error ? e_4 : new Error(e_4.toString());
                        nextRetryDelay = this.getNextRetryDelay(previousReconnectAttempts++, Date.now() - reconnectStartTime, retryError);
                        return [3 /*break*/, 6];
                    case 6: return [3 /*break*/, 1];
                    case 7:
                        this.logger.log(LogLevel.Information, "Reconnect retries have been exhausted after " + (Date.now() - reconnectStartTime) + " ms and " + previousReconnectAttempts + " failed attempts. Connection disconnecting.");
                        this.completeClose();
                        return [2 /*return*/];
                }
            });
        });
    };
    HubConnection.prototype.getNextRetryDelay = function (previousRetryCount, elapsedMilliseconds, retryReason) {
        try {
            return this.reconnectPolicy.nextRetryDelayInMilliseconds({
                elapsedMilliseconds: elapsedMilliseconds,
                previousRetryCount: previousRetryCount,
                retryReason: retryReason,
            });
        }
        catch (e) {
            this.logger.log(LogLevel.Error, "IRetryPolicy.nextRetryDelayInMilliseconds(" + previousRetryCount + ", " + elapsedMilliseconds + ") threw error '" + e + "'.");
            return null;
        }
    };
    HubConnection.prototype.cancelCallbacksWithError = function (error) {
        var callbacks = this.callbacks;
        this.callbacks = {};
        Object.keys(callbacks)
            .forEach(function (key) {
            var callback = callbacks[key];
            callback(null, error);
        });
    };
    HubConnection.prototype.cleanupPingTimer = function () {
        if (this.pingServerHandle) {
            clearTimeout(this.pingServerHandle);
            this.pingServerHandle = undefined;
        }
    };
    HubConnection.prototype.cleanupTimeout = function () {
        if (this.timeoutHandle) {
            clearTimeout(this.timeoutHandle);
        }
    };
    HubConnection.prototype.createInvocation = function (methodName, args, nonblocking, streamIds) {
        if (nonblocking) {
            if (streamIds.length !== 0) {
                return {
                    arguments: args,
                    streamIds: streamIds,
                    target: methodName,
                    type: MessageType.Invocation,
                };
            }
            else {
                return {
                    arguments: args,
                    target: methodName,
                    type: MessageType.Invocation,
                };
            }
        }
        else {
            var invocationId = this.invocationId;
            this.invocationId++;
            if (streamIds.length !== 0) {
                return {
                    arguments: args,
                    invocationId: invocationId.toString(),
                    streamIds: streamIds,
                    target: methodName,
                    type: MessageType.Invocation,
                };
            }
            else {
                return {
                    arguments: args,
                    invocationId: invocationId.toString(),
                    target: methodName,
                    type: MessageType.Invocation,
                };
            }
        }
    };
    HubConnection.prototype.launchStreams = function (streams, promiseQueue) {
        var _this = this;
        if (streams.length === 0) {
            return;
        }
        // Synchronize stream data so they arrive in-order on the server
        if (!promiseQueue) {
            promiseQueue = Promise.resolve();
        }
        var _loop_1 = function (streamId) {
            streams[streamId].subscribe({
                complete: function () {
                    promiseQueue = promiseQueue.then(function () { return _this.sendWithProtocol(_this.createCompletionMessage(streamId)); });
                },
                error: function (err) {
                    var message;
                    if (err instanceof Error) {
                        message = err.message;
                    }
                    else if (err && err.toString) {
                        message = err.toString();
                    }
                    else {
                        message = "Unknown error";
                    }
                    promiseQueue = promiseQueue.then(function () { return _this.sendWithProtocol(_this.createCompletionMessage(streamId, message)); });
                },
                next: function (item) {
                    promiseQueue = promiseQueue.then(function () { return _this.sendWithProtocol(_this.createStreamItemMessage(streamId, item)); });
                },
            });
        };
        // We want to iterate over the keys, since the keys are the stream ids
        // tslint:disable-next-line:forin
        for (var streamId in streams) {
            _loop_1(streamId);
        }
    };
    HubConnection.prototype.replaceStreamingParams = function (args) {
        var streams = [];
        var streamIds = [];
        for (var i = 0; i < args.length; i++) {
            var argument = args[i];
            if (this.isObservable(argument)) {
                var streamId = this.invocationId;
                this.invocationId++;
                // Store the stream for later use
                streams[streamId] = argument;
                streamIds.push(streamId.toString());
                // remove stream from args
                args.splice(i, 1);
            }
        }
        return [streams, streamIds];
    };
    HubConnection.prototype.isObservable = function (arg) {
        // This allows other stream implementations to just work (like rxjs)
        return arg && arg.subscribe && typeof arg.subscribe === "function";
    };
    HubConnection.prototype.createStreamInvocation = function (methodName, args, streamIds) {
        var invocationId = this.invocationId;
        this.invocationId++;
        if (streamIds.length !== 0) {
            return {
                arguments: args,
                invocationId: invocationId.toString(),
                streamIds: streamIds,
                target: methodName,
                type: MessageType.StreamInvocation,
            };
        }
        else {
            return {
                arguments: args,
                invocationId: invocationId.toString(),
                target: methodName,
                type: MessageType.StreamInvocation,
            };
        }
    };
    HubConnection.prototype.createCancelInvocation = function (id) {
        return {
            invocationId: id,
            type: MessageType.CancelInvocation,
        };
    };
    HubConnection.prototype.createStreamItemMessage = function (id, item) {
        return {
            invocationId: id,
            item: item,
            type: MessageType.StreamItem,
        };
    };
    HubConnection.prototype.createCompletionMessage = function (id, error, result) {
        if (error) {
            return {
                error: error,
                invocationId: id,
                type: MessageType.Completion,
            };
        }
        return {
            invocationId: id,
            result: result,
            type: MessageType.Completion,
        };
    };
    return HubConnection;
}());

//# sourceMappingURL=HubConnection.js.map
;// CONCATENATED MODULE: ./node_modules/app-base-v9/node_modules/@microsoft/signalr/dist/esm/DefaultReconnectPolicy.js
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// 0, 2, 10, 30 second delays before reconnect attempts.
var DEFAULT_RETRY_DELAYS_IN_MILLISECONDS = [0, 2000, 10000, 30000, null];
/** @private */
var DefaultReconnectPolicy = /** @class */ (function () {
    function DefaultReconnectPolicy(retryDelays) {
        this.retryDelays = retryDelays !== undefined ? retryDelays.concat([null]) : DEFAULT_RETRY_DELAYS_IN_MILLISECONDS;
    }
    DefaultReconnectPolicy.prototype.nextRetryDelayInMilliseconds = function (retryContext) {
        return this.retryDelays[retryContext.previousRetryCount];
    };
    return DefaultReconnectPolicy;
}());

//# sourceMappingURL=DefaultReconnectPolicy.js.map
;// CONCATENATED MODULE: ./node_modules/app-base-v9/node_modules/@microsoft/signalr/dist/esm/ITransport.js
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// This will be treated as a bit flag in the future, so we keep it using power-of-two values.
/** Specifies a specific HTTP transport type. */
var HttpTransportType;
(function (HttpTransportType) {
    /** Specifies no transport preference. */
    HttpTransportType[HttpTransportType["None"] = 0] = "None";
    /** Specifies the WebSockets transport. */
    HttpTransportType[HttpTransportType["WebSockets"] = 1] = "WebSockets";
    /** Specifies the Server-Sent Events transport. */
    HttpTransportType[HttpTransportType["ServerSentEvents"] = 2] = "ServerSentEvents";
    /** Specifies the Long Polling transport. */
    HttpTransportType[HttpTransportType["LongPolling"] = 4] = "LongPolling";
})(HttpTransportType || (HttpTransportType = {}));
/** Specifies the transfer format for a connection. */
var TransferFormat;
(function (TransferFormat) {
    /** Specifies that only text data will be transmitted over the connection. */
    TransferFormat[TransferFormat["Text"] = 1] = "Text";
    /** Specifies that binary data will be transmitted over the connection. */
    TransferFormat[TransferFormat["Binary"] = 2] = "Binary";
})(TransferFormat || (TransferFormat = {}));
//# sourceMappingURL=ITransport.js.map
;// CONCATENATED MODULE: ./node_modules/app-base-v9/node_modules/@microsoft/signalr/dist/esm/AbortController.js
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Rough polyfill of https://developer.mozilla.org/en-US/docs/Web/API/AbortController
// We don't actually ever use the API being polyfilled, we always use the polyfill because
// it's a very new API right now.
// Not exported from index.
/** @private */
var AbortController_AbortController = /** @class */ (function () {
    function AbortController() {
        this.isAborted = false;
        this.onabort = null;
    }
    AbortController.prototype.abort = function () {
        if (!this.isAborted) {
            this.isAborted = true;
            if (this.onabort) {
                this.onabort();
            }
        }
    };
    Object.defineProperty(AbortController.prototype, "signal", {
        get: function () {
            return this;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbortController.prototype, "aborted", {
        get: function () {
            return this.isAborted;
        },
        enumerable: true,
        configurable: true
    });
    return AbortController;
}());

//# sourceMappingURL=AbortController.js.map
;// CONCATENATED MODULE: ./node_modules/app-base-v9/node_modules/@microsoft/signalr/dist/esm/LongPollingTransport.js
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
var LongPollingTransport_assign = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var LongPollingTransport_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var LongPollingTransport_generator = (undefined && undefined.__generator) || function (thisArg, body) {
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





// Not exported from 'index', this type is internal.
/** @private */
var LongPollingTransport = /** @class */ (function () {
    function LongPollingTransport(httpClient, accessTokenFactory, logger, logMessageContent, withCredentials, headers) {
        this.httpClient = httpClient;
        this.accessTokenFactory = accessTokenFactory;
        this.logger = logger;
        this.pollAbort = new AbortController_AbortController();
        this.logMessageContent = logMessageContent;
        this.withCredentials = withCredentials;
        this.headers = headers;
        this.running = false;
        this.onreceive = null;
        this.onclose = null;
    }
    Object.defineProperty(LongPollingTransport.prototype, "pollAborted", {
        // This is an internal type, not exported from 'index' so this is really just internal.
        get: function () {
            return this.pollAbort.aborted;
        },
        enumerable: true,
        configurable: true
    });
    LongPollingTransport.prototype.connect = function (url, transferFormat) {
        return LongPollingTransport_awaiter(this, void 0, void 0, function () {
            var _a, _b, name, value, headers, pollOptions, token, pollUrl, response;
            return LongPollingTransport_generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        Arg.isRequired(url, "url");
                        Arg.isRequired(transferFormat, "transferFormat");
                        Arg.isIn(transferFormat, TransferFormat, "transferFormat");
                        this.url = url;
                        this.logger.log(LogLevel.Trace, "(LongPolling transport) Connecting.");
                        // Allow binary format on Node and Browsers that support binary content (indicated by the presence of responseType property)
                        if (transferFormat === TransferFormat.Binary &&
                            (typeof XMLHttpRequest !== "undefined" && typeof new XMLHttpRequest().responseType !== "string")) {
                            throw new Error("Binary protocols over XmlHttpRequest not implementing advanced features are not supported.");
                        }
                        _b = getUserAgentHeader(), name = _b[0], value = _b[1];
                        headers = LongPollingTransport_assign((_a = {}, _a[name] = value, _a), this.headers);
                        pollOptions = {
                            abortSignal: this.pollAbort.signal,
                            headers: headers,
                            timeout: 100000,
                            withCredentials: this.withCredentials,
                        };
                        if (transferFormat === TransferFormat.Binary) {
                            pollOptions.responseType = "arraybuffer";
                        }
                        return [4 /*yield*/, this.getAccessToken()];
                    case 1:
                        token = _c.sent();
                        this.updateHeaderToken(pollOptions, token);
                        pollUrl = url + "&_=" + Date.now();
                        this.logger.log(LogLevel.Trace, "(LongPolling transport) polling: " + pollUrl + ".");
                        return [4 /*yield*/, this.httpClient.get(pollUrl, pollOptions)];
                    case 2:
                        response = _c.sent();
                        if (response.statusCode !== 200) {
                            this.logger.log(LogLevel.Error, "(LongPolling transport) Unexpected response code: " + response.statusCode + ".");
                            // Mark running as false so that the poll immediately ends and runs the close logic
                            this.closeError = new HttpError(response.statusText || "", response.statusCode);
                            this.running = false;
                        }
                        else {
                            this.running = true;
                        }
                        this.receiving = this.poll(this.url, pollOptions);
                        return [2 /*return*/];
                }
            });
        });
    };
    LongPollingTransport.prototype.getAccessToken = function () {
        return LongPollingTransport_awaiter(this, void 0, void 0, function () {
            return LongPollingTransport_generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.accessTokenFactory) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.accessTokenFactory()];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2: return [2 /*return*/, null];
                }
            });
        });
    };
    LongPollingTransport.prototype.updateHeaderToken = function (request, token) {
        if (!request.headers) {
            request.headers = {};
        }
        if (token) {
            // tslint:disable-next-line:no-string-literal
            request.headers["Authorization"] = "Bearer " + token;
            return;
        }
        // tslint:disable-next-line:no-string-literal
        if (request.headers["Authorization"]) {
            // tslint:disable-next-line:no-string-literal
            delete request.headers["Authorization"];
        }
    };
    LongPollingTransport.prototype.poll = function (url, pollOptions) {
        return LongPollingTransport_awaiter(this, void 0, void 0, function () {
            var token, pollUrl, response, e_1;
            return LongPollingTransport_generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, , 8, 9]);
                        _a.label = 1;
                    case 1:
                        if (!this.running) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.getAccessToken()];
                    case 2:
                        token = _a.sent();
                        this.updateHeaderToken(pollOptions, token);
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        pollUrl = url + "&_=" + Date.now();
                        this.logger.log(LogLevel.Trace, "(LongPolling transport) polling: " + pollUrl + ".");
                        return [4 /*yield*/, this.httpClient.get(pollUrl, pollOptions)];
                    case 4:
                        response = _a.sent();
                        if (response.statusCode === 204) {
                            this.logger.log(LogLevel.Information, "(LongPolling transport) Poll terminated by server.");
                            this.running = false;
                        }
                        else if (response.statusCode !== 200) {
                            this.logger.log(LogLevel.Error, "(LongPolling transport) Unexpected response code: " + response.statusCode + ".");
                            // Unexpected status code
                            this.closeError = new HttpError(response.statusText || "", response.statusCode);
                            this.running = false;
                        }
                        else {
                            // Process the response
                            if (response.content) {
                                this.logger.log(LogLevel.Trace, "(LongPolling transport) data received. " + getDataDetail(response.content, this.logMessageContent) + ".");
                                if (this.onreceive) {
                                    this.onreceive(response.content);
                                }
                            }
                            else {
                                // This is another way timeout manifest.
                                this.logger.log(LogLevel.Trace, "(LongPolling transport) Poll timed out, reissuing.");
                            }
                        }
                        return [3 /*break*/, 6];
                    case 5:
                        e_1 = _a.sent();
                        if (!this.running) {
                            // Log but disregard errors that occur after stopping
                            this.logger.log(LogLevel.Trace, "(LongPolling transport) Poll errored after shutdown: " + e_1.message);
                        }
                        else {
                            if (e_1 instanceof TimeoutError) {
                                // Ignore timeouts and reissue the poll.
                                this.logger.log(LogLevel.Trace, "(LongPolling transport) Poll timed out, reissuing.");
                            }
                            else {
                                // Close the connection with the error as the result.
                                this.closeError = e_1;
                                this.running = false;
                            }
                        }
                        return [3 /*break*/, 6];
                    case 6: return [3 /*break*/, 1];
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        this.logger.log(LogLevel.Trace, "(LongPolling transport) Polling complete.");
                        // We will reach here with pollAborted==false when the server returned a response causing the transport to stop.
                        // If pollAborted==true then client initiated the stop and the stop method will raise the close event after DELETE is sent.
                        if (!this.pollAborted) {
                            this.raiseOnClose();
                        }
                        return [7 /*endfinally*/];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    LongPollingTransport.prototype.send = function (data) {
        return LongPollingTransport_awaiter(this, void 0, void 0, function () {
            return LongPollingTransport_generator(this, function (_a) {
                if (!this.running) {
                    return [2 /*return*/, Promise.reject(new Error("Cannot send until the transport is connected"))];
                }
                return [2 /*return*/, sendMessage(this.logger, "LongPolling", this.httpClient, this.url, this.accessTokenFactory, data, this.logMessageContent, this.withCredentials, this.headers)];
            });
        });
    };
    LongPollingTransport.prototype.stop = function () {
        return LongPollingTransport_awaiter(this, void 0, void 0, function () {
            var headers, _a, name_1, value, deleteOptions, token;
            return LongPollingTransport_generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.logger.log(LogLevel.Trace, "(LongPolling transport) Stopping polling.");
                        // Tell receiving loop to stop, abort any current request, and then wait for it to finish
                        this.running = false;
                        this.pollAbort.abort();
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, , 5, 6]);
                        return [4 /*yield*/, this.receiving];
                    case 2:
                        _b.sent();
                        // Send DELETE to clean up long polling on the server
                        this.logger.log(LogLevel.Trace, "(LongPolling transport) sending DELETE request to " + this.url + ".");
                        headers = {};
                        _a = getUserAgentHeader(), name_1 = _a[0], value = _a[1];
                        headers[name_1] = value;
                        deleteOptions = {
                            headers: LongPollingTransport_assign({}, headers, this.headers),
                            withCredentials: this.withCredentials,
                        };
                        return [4 /*yield*/, this.getAccessToken()];
                    case 3:
                        token = _b.sent();
                        this.updateHeaderToken(deleteOptions, token);
                        return [4 /*yield*/, this.httpClient.delete(this.url, deleteOptions)];
                    case 4:
                        _b.sent();
                        this.logger.log(LogLevel.Trace, "(LongPolling transport) DELETE request sent.");
                        return [3 /*break*/, 6];
                    case 5:
                        this.logger.log(LogLevel.Trace, "(LongPolling transport) Stop finished.");
                        // Raise close event here instead of in polling
                        // It needs to happen after the DELETE request is sent
                        this.raiseOnClose();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    LongPollingTransport.prototype.raiseOnClose = function () {
        if (this.onclose) {
            var logMessage = "(LongPolling transport) Firing onclose event.";
            if (this.closeError) {
                logMessage += " Error: " + this.closeError;
            }
            this.logger.log(LogLevel.Trace, logMessage);
            this.onclose(this.closeError);
        }
    };
    return LongPollingTransport;
}());

//# sourceMappingURL=LongPollingTransport.js.map
;// CONCATENATED MODULE: ./node_modules/app-base-v9/node_modules/@microsoft/signalr/dist/esm/ServerSentEventsTransport.js
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
var ServerSentEventsTransport_assign = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var ServerSentEventsTransport_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var ServerSentEventsTransport_generator = (undefined && undefined.__generator) || function (thisArg, body) {
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



/** @private */
var ServerSentEventsTransport = /** @class */ (function () {
    function ServerSentEventsTransport(httpClient, accessTokenFactory, logger, logMessageContent, eventSourceConstructor, withCredentials, headers) {
        this.httpClient = httpClient;
        this.accessTokenFactory = accessTokenFactory;
        this.logger = logger;
        this.logMessageContent = logMessageContent;
        this.withCredentials = withCredentials;
        this.eventSourceConstructor = eventSourceConstructor;
        this.headers = headers;
        this.onreceive = null;
        this.onclose = null;
    }
    ServerSentEventsTransport.prototype.connect = function (url, transferFormat) {
        return ServerSentEventsTransport_awaiter(this, void 0, void 0, function () {
            var token;
            var _this = this;
            return ServerSentEventsTransport_generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Arg.isRequired(url, "url");
                        Arg.isRequired(transferFormat, "transferFormat");
                        Arg.isIn(transferFormat, TransferFormat, "transferFormat");
                        this.logger.log(LogLevel.Trace, "(SSE transport) Connecting.");
                        // set url before accessTokenFactory because this.url is only for send and we set the auth header instead of the query string for send
                        this.url = url;
                        if (!this.accessTokenFactory) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.accessTokenFactory()];
                    case 1:
                        token = _a.sent();
                        if (token) {
                            url += (url.indexOf("?") < 0 ? "?" : "&") + ("access_token=" + encodeURIComponent(token));
                        }
                        _a.label = 2;
                    case 2: return [2 /*return*/, new Promise(function (resolve, reject) {
                            var opened = false;
                            if (transferFormat !== TransferFormat.Text) {
                                reject(new Error("The Server-Sent Events transport only supports the 'Text' transfer format"));
                                return;
                            }
                            var eventSource;
                            if (Platform.isBrowser || Platform.isWebWorker) {
                                eventSource = new _this.eventSourceConstructor(url, { withCredentials: _this.withCredentials });
                            }
                            else {
                                // Non-browser passes cookies via the dictionary
                                var cookies = _this.httpClient.getCookieString(url);
                                var headers = {};
                                headers.Cookie = cookies;
                                var _a = getUserAgentHeader(), name_1 = _a[0], value = _a[1];
                                headers[name_1] = value;
                                eventSource = new _this.eventSourceConstructor(url, { withCredentials: _this.withCredentials, headers: ServerSentEventsTransport_assign({}, headers, _this.headers) });
                            }
                            try {
                                eventSource.onmessage = function (e) {
                                    if (_this.onreceive) {
                                        try {
                                            _this.logger.log(LogLevel.Trace, "(SSE transport) data received. " + getDataDetail(e.data, _this.logMessageContent) + ".");
                                            _this.onreceive(e.data);
                                        }
                                        catch (error) {
                                            _this.close(error);
                                            return;
                                        }
                                    }
                                };
                                eventSource.onerror = function (e) {
                                    var error = new Error(e.data || "Error occurred");
                                    if (opened) {
                                        _this.close(error);
                                    }
                                    else {
                                        reject(error);
                                    }
                                };
                                eventSource.onopen = function () {
                                    _this.logger.log(LogLevel.Information, "SSE connected to " + _this.url);
                                    _this.eventSource = eventSource;
                                    opened = true;
                                    resolve();
                                };
                            }
                            catch (e) {
                                reject(e);
                                return;
                            }
                        })];
                }
            });
        });
    };
    ServerSentEventsTransport.prototype.send = function (data) {
        return ServerSentEventsTransport_awaiter(this, void 0, void 0, function () {
            return ServerSentEventsTransport_generator(this, function (_a) {
                if (!this.eventSource) {
                    return [2 /*return*/, Promise.reject(new Error("Cannot send until the transport is connected"))];
                }
                return [2 /*return*/, sendMessage(this.logger, "SSE", this.httpClient, this.url, this.accessTokenFactory, data, this.logMessageContent, this.withCredentials, this.headers)];
            });
        });
    };
    ServerSentEventsTransport.prototype.stop = function () {
        this.close();
        return Promise.resolve();
    };
    ServerSentEventsTransport.prototype.close = function (e) {
        if (this.eventSource) {
            this.eventSource.close();
            this.eventSource = undefined;
            if (this.onclose) {
                this.onclose(e);
            }
        }
    };
    return ServerSentEventsTransport;
}());

//# sourceMappingURL=ServerSentEventsTransport.js.map
;// CONCATENATED MODULE: ./node_modules/app-base-v9/node_modules/@microsoft/signalr/dist/esm/WebSocketTransport.js
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
var WebSocketTransport_assign = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var WebSocketTransport_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var WebSocketTransport_generator = (undefined && undefined.__generator) || function (thisArg, body) {
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



/** @private */
var WebSocketTransport = /** @class */ (function () {
    function WebSocketTransport(httpClient, accessTokenFactory, logger, logMessageContent, webSocketConstructor, headers) {
        this.logger = logger;
        this.accessTokenFactory = accessTokenFactory;
        this.logMessageContent = logMessageContent;
        this.webSocketConstructor = webSocketConstructor;
        this.httpClient = httpClient;
        this.onreceive = null;
        this.onclose = null;
        this.headers = headers;
    }
    WebSocketTransport.prototype.connect = function (url, transferFormat) {
        return WebSocketTransport_awaiter(this, void 0, void 0, function () {
            var token;
            var _this = this;
            return WebSocketTransport_generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Arg.isRequired(url, "url");
                        Arg.isRequired(transferFormat, "transferFormat");
                        Arg.isIn(transferFormat, TransferFormat, "transferFormat");
                        this.logger.log(LogLevel.Trace, "(WebSockets transport) Connecting.");
                        if (!this.accessTokenFactory) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.accessTokenFactory()];
                    case 1:
                        token = _a.sent();
                        if (token) {
                            url += (url.indexOf("?") < 0 ? "?" : "&") + ("access_token=" + encodeURIComponent(token));
                        }
                        _a.label = 2;
                    case 2: return [2 /*return*/, new Promise(function (resolve, reject) {
                            url = url.replace(/^http/, "ws");
                            var webSocket;
                            var cookies = _this.httpClient.getCookieString(url);
                            var opened = false;
                            if (Platform.isNode) {
                                var headers = {};
                                var _a = getUserAgentHeader(), name_1 = _a[0], value = _a[1];
                                headers[name_1] = value;
                                if (cookies) {
                                    headers["Cookie"] = "" + cookies;
                                }
                                // Only pass headers when in non-browser environments
                                webSocket = new _this.webSocketConstructor(url, undefined, {
                                    headers: WebSocketTransport_assign({}, headers, _this.headers),
                                });
                            }
                            if (!webSocket) {
                                // Chrome is not happy with passing 'undefined' as protocol
                                webSocket = new _this.webSocketConstructor(url);
                            }
                            if (transferFormat === TransferFormat.Binary) {
                                webSocket.binaryType = "arraybuffer";
                            }
                            // tslint:disable-next-line:variable-name
                            webSocket.onopen = function (_event) {
                                _this.logger.log(LogLevel.Information, "WebSocket connected to " + url + ".");
                                _this.webSocket = webSocket;
                                opened = true;
                                resolve();
                            };
                            webSocket.onerror = function (event) {
                                var error = null;
                                // ErrorEvent is a browser only type we need to check if the type exists before using it
                                if (typeof ErrorEvent !== "undefined" && event instanceof ErrorEvent) {
                                    error = event.error;
                                }
                                else {
                                    error = new Error("There was an error with the transport.");
                                }
                                reject(error);
                            };
                            webSocket.onmessage = function (message) {
                                _this.logger.log(LogLevel.Trace, "(WebSockets transport) data received. " + getDataDetail(message.data, _this.logMessageContent) + ".");
                                if (_this.onreceive) {
                                    try {
                                        _this.onreceive(message.data);
                                    }
                                    catch (error) {
                                        _this.close(error);
                                        return;
                                    }
                                }
                            };
                            webSocket.onclose = function (event) {
                                // Don't call close handler if connection was never established
                                // We'll reject the connect call instead
                                if (opened) {
                                    _this.close(event);
                                }
                                else {
                                    var error = null;
                                    // ErrorEvent is a browser only type we need to check if the type exists before using it
                                    if (typeof ErrorEvent !== "undefined" && event instanceof ErrorEvent) {
                                        error = event.error;
                                    }
                                    else {
                                        error = new Error("There was an error with the transport.");
                                    }
                                    reject(error);
                                }
                            };
                        })];
                }
            });
        });
    };
    WebSocketTransport.prototype.send = function (data) {
        if (this.webSocket && this.webSocket.readyState === this.webSocketConstructor.OPEN) {
            this.logger.log(LogLevel.Trace, "(WebSockets transport) sending data. " + getDataDetail(data, this.logMessageContent) + ".");
            this.webSocket.send(data);
            return Promise.resolve();
        }
        return Promise.reject("WebSocket is not in the OPEN state");
    };
    WebSocketTransport.prototype.stop = function () {
        if (this.webSocket) {
            // Manually invoke onclose callback inline so we know the HttpConnection was closed properly before returning
            // This also solves an issue where websocket.onclose could take 18+ seconds to trigger during network disconnects
            this.close(undefined);
        }
        return Promise.resolve();
    };
    WebSocketTransport.prototype.close = function (event) {
        // webSocket will be null if the transport did not start successfully
        if (this.webSocket) {
            // Clear websocket handlers because we are considering the socket closed now
            this.webSocket.onclose = function () { };
            this.webSocket.onmessage = function () { };
            this.webSocket.onerror = function () { };
            this.webSocket.close();
            this.webSocket = undefined;
        }
        this.logger.log(LogLevel.Trace, "(WebSockets transport) socket closed.");
        if (this.onclose) {
            if (this.isCloseEvent(event) && (event.wasClean === false || event.code !== 1000)) {
                this.onclose(new Error("WebSocket closed with status code: " + event.code + " (" + event.reason + ")."));
            }
            else if (event instanceof Error) {
                this.onclose(event);
            }
            else {
                this.onclose();
            }
        }
    };
    WebSocketTransport.prototype.isCloseEvent = function (event) {
        return event && typeof event.wasClean === "boolean" && typeof event.code === "number";
    };
    return WebSocketTransport;
}());

//# sourceMappingURL=WebSocketTransport.js.map
;// CONCATENATED MODULE: ./node_modules/app-base-v9/node_modules/@microsoft/signalr/dist/esm/HttpConnection.js
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
var HttpConnection_assign = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var HttpConnection_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var HttpConnection_generator = (undefined && undefined.__generator) || function (thisArg, body) {
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







var MAX_REDIRECTS = 100;
/** @private */
var HttpConnection = /** @class */ (function () {
    function HttpConnection(url, options) {
        if (options === void 0) { options = {}; }
        this.stopPromiseResolver = function () { };
        this.features = {};
        this.negotiateVersion = 1;
        Arg.isRequired(url, "url");
        this.logger = createLogger(options.logger);
        this.baseUrl = this.resolveUrl(url);
        options = options || {};
        options.logMessageContent = options.logMessageContent === undefined ? false : options.logMessageContent;
        if (typeof options.withCredentials === "boolean" || options.withCredentials === undefined) {
            options.withCredentials = options.withCredentials === undefined ? true : options.withCredentials;
        }
        else {
            throw new Error("withCredentials option was not a 'boolean' or 'undefined' value");
        }
        var webSocketModule = null;
        var eventSourceModule = null;
        if (Platform.isNode && "function" !== "undefined") {
            // In order to ignore the dynamic require in webpack builds we need to do this magic
            // @ts-ignore: TS doesn't know about these names
            var requireFunc =  true ? require : 0;
            webSocketModule = requireFunc("ws");
            eventSourceModule = requireFunc("eventsource");
        }
        if (!Platform.isNode && typeof WebSocket !== "undefined" && !options.WebSocket) {
            options.WebSocket = WebSocket;
        }
        else if (Platform.isNode && !options.WebSocket) {
            if (webSocketModule) {
                options.WebSocket = webSocketModule;
            }
        }
        if (!Platform.isNode && typeof EventSource !== "undefined" && !options.EventSource) {
            options.EventSource = EventSource;
        }
        else if (Platform.isNode && !options.EventSource) {
            if (typeof eventSourceModule !== "undefined") {
                options.EventSource = eventSourceModule;
            }
        }
        this.httpClient = options.httpClient || new DefaultHttpClient(this.logger);
        this.connectionState = "Disconnected" /* Disconnected */;
        this.connectionStarted = false;
        this.options = options;
        this.onreceive = null;
        this.onclose = null;
    }
    HttpConnection.prototype.start = function (transferFormat) {
        return HttpConnection_awaiter(this, void 0, void 0, function () {
            var message, message;
            return HttpConnection_generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        transferFormat = transferFormat || TransferFormat.Binary;
                        Arg.isIn(transferFormat, TransferFormat, "transferFormat");
                        this.logger.log(LogLevel.Debug, "Starting connection with transfer format '" + TransferFormat[transferFormat] + "'.");
                        if (this.connectionState !== "Disconnected" /* Disconnected */) {
                            return [2 /*return*/, Promise.reject(new Error("Cannot start an HttpConnection that is not in the 'Disconnected' state."))];
                        }
                        this.connectionState = "Connecting" /* Connecting */;
                        this.startInternalPromise = this.startInternal(transferFormat);
                        return [4 /*yield*/, this.startInternalPromise];
                    case 1:
                        _a.sent();
                        if (!(this.connectionState === "Disconnecting" /* Disconnecting */)) return [3 /*break*/, 3];
                        message = "Failed to start the HttpConnection before stop() was called.";
                        this.logger.log(LogLevel.Error, message);
                        // We cannot await stopPromise inside startInternal since stopInternal awaits the startInternalPromise.
                        return [4 /*yield*/, this.stopPromise];
                    case 2:
                        // We cannot await stopPromise inside startInternal since stopInternal awaits the startInternalPromise.
                        _a.sent();
                        return [2 /*return*/, Promise.reject(new Error(message))];
                    case 3:
                        if (this.connectionState !== "Connected" /* Connected */) {
                            message = "HttpConnection.startInternal completed gracefully but didn't enter the connection into the connected state!";
                            this.logger.log(LogLevel.Error, message);
                            return [2 /*return*/, Promise.reject(new Error(message))];
                        }
                        _a.label = 4;
                    case 4:
                        this.connectionStarted = true;
                        return [2 /*return*/];
                }
            });
        });
    };
    HttpConnection.prototype.send = function (data) {
        if (this.connectionState !== "Connected" /* Connected */) {
            return Promise.reject(new Error("Cannot send data if the connection is not in the 'Connected' State."));
        }
        if (!this.sendQueue) {
            this.sendQueue = new TransportSendQueue(this.transport);
        }
        // Transport will not be null if state is connected
        return this.sendQueue.send(data);
    };
    HttpConnection.prototype.stop = function (error) {
        return HttpConnection_awaiter(this, void 0, void 0, function () {
            var _this = this;
            return HttpConnection_generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.connectionState === "Disconnected" /* Disconnected */) {
                            this.logger.log(LogLevel.Debug, "Call to HttpConnection.stop(" + error + ") ignored because the connection is already in the disconnected state.");
                            return [2 /*return*/, Promise.resolve()];
                        }
                        if (this.connectionState === "Disconnecting" /* Disconnecting */) {
                            this.logger.log(LogLevel.Debug, "Call to HttpConnection.stop(" + error + ") ignored because the connection is already in the disconnecting state.");
                            return [2 /*return*/, this.stopPromise];
                        }
                        this.connectionState = "Disconnecting" /* Disconnecting */;
                        this.stopPromise = new Promise(function (resolve) {
                            // Don't complete stop() until stopConnection() completes.
                            _this.stopPromiseResolver = resolve;
                        });
                        // stopInternal should never throw so just observe it.
                        return [4 /*yield*/, this.stopInternal(error)];
                    case 1:
                        // stopInternal should never throw so just observe it.
                        _a.sent();
                        return [4 /*yield*/, this.stopPromise];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    HttpConnection.prototype.stopInternal = function (error) {
        return HttpConnection_awaiter(this, void 0, void 0, function () {
            var e_1, e_2;
            return HttpConnection_generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Set error as soon as possible otherwise there is a race between
                        // the transport closing and providing an error and the error from a close message
                        // We would prefer the close message error.
                        this.stopError = error;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.startInternalPromise];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        return [3 /*break*/, 4];
                    case 4:
                        if (!this.transport) return [3 /*break*/, 9];
                        _a.label = 5;
                    case 5:
                        _a.trys.push([5, 7, , 8]);
                        return [4 /*yield*/, this.transport.stop()];
                    case 6:
                        _a.sent();
                        return [3 /*break*/, 8];
                    case 7:
                        e_2 = _a.sent();
                        this.logger.log(LogLevel.Error, "HttpConnection.transport.stop() threw error '" + e_2 + "'.");
                        this.stopConnection();
                        return [3 /*break*/, 8];
                    case 8:
                        this.transport = undefined;
                        return [3 /*break*/, 10];
                    case 9:
                        this.logger.log(LogLevel.Debug, "HttpConnection.transport is undefined in HttpConnection.stop() because start() failed.");
                        _a.label = 10;
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    HttpConnection.prototype.startInternal = function (transferFormat) {
        return HttpConnection_awaiter(this, void 0, void 0, function () {
            var url, negotiateResponse, redirects, _loop_1, this_1, e_3;
            return HttpConnection_generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = this.baseUrl;
                        this.accessTokenFactory = this.options.accessTokenFactory;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 12, , 13]);
                        if (!this.options.skipNegotiation) return [3 /*break*/, 5];
                        if (!(this.options.transport === HttpTransportType.WebSockets)) return [3 /*break*/, 3];
                        // No need to add a connection ID in this case
                        this.transport = this.constructTransport(HttpTransportType.WebSockets);
                        // We should just call connect directly in this case.
                        // No fallback or negotiate in this case.
                        return [4 /*yield*/, this.startTransport(url, transferFormat)];
                    case 2:
                        // We should just call connect directly in this case.
                        // No fallback or negotiate in this case.
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3: throw new Error("Negotiation can only be skipped when using the WebSocket transport directly.");
                    case 4: return [3 /*break*/, 11];
                    case 5:
                        negotiateResponse = null;
                        redirects = 0;
                        _loop_1 = function () {
                            var accessToken_1;
                            return HttpConnection_generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this_1.getNegotiationResponse(url)];
                                    case 1:
                                        negotiateResponse = _a.sent();
                                        // the user tries to stop the connection when it is being started
                                        if (this_1.connectionState === "Disconnecting" /* Disconnecting */ || this_1.connectionState === "Disconnected" /* Disconnected */) {
                                            throw new Error("The connection was stopped during negotiation.");
                                        }
                                        if (negotiateResponse.error) {
                                            throw new Error(negotiateResponse.error);
                                        }
                                        if (negotiateResponse.ProtocolVersion) {
                                            throw new Error("Detected a connection attempt to an ASP.NET SignalR Server. This client only supports connecting to an ASP.NET Core SignalR Server. See https://aka.ms/signalr-core-differences for details.");
                                        }
                                        if (negotiateResponse.url) {
                                            url = negotiateResponse.url;
                                        }
                                        if (negotiateResponse.accessToken) {
                                            accessToken_1 = negotiateResponse.accessToken;
                                            this_1.accessTokenFactory = function () { return accessToken_1; };
                                        }
                                        redirects++;
                                        return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        _a.label = 6;
                    case 6: return [5 /*yield**/, _loop_1()];
                    case 7:
                        _a.sent();
                        _a.label = 8;
                    case 8:
                        if (negotiateResponse.url && redirects < MAX_REDIRECTS) return [3 /*break*/, 6];
                        _a.label = 9;
                    case 9:
                        if (redirects === MAX_REDIRECTS && negotiateResponse.url) {
                            throw new Error("Negotiate redirection limit exceeded.");
                        }
                        return [4 /*yield*/, this.createTransport(url, this.options.transport, negotiateResponse, transferFormat)];
                    case 10:
                        _a.sent();
                        _a.label = 11;
                    case 11:
                        if (this.transport instanceof LongPollingTransport) {
                            this.features.inherentKeepAlive = true;
                        }
                        if (this.connectionState === "Connecting" /* Connecting */) {
                            // Ensure the connection transitions to the connected state prior to completing this.startInternalPromise.
                            // start() will handle the case when stop was called and startInternal exits still in the disconnecting state.
                            this.logger.log(LogLevel.Debug, "The HttpConnection connected successfully.");
                            this.connectionState = "Connected" /* Connected */;
                        }
                        return [3 /*break*/, 13];
                    case 12:
                        e_3 = _a.sent();
                        this.logger.log(LogLevel.Error, "Failed to start the connection: " + e_3);
                        this.connectionState = "Disconnected" /* Disconnected */;
                        this.transport = undefined;
                        // if start fails, any active calls to stop assume that start will complete the stop promise
                        this.stopPromiseResolver();
                        return [2 /*return*/, Promise.reject(e_3)];
                    case 13: return [2 /*return*/];
                }
            });
        });
    };
    HttpConnection.prototype.getNegotiationResponse = function (url) {
        return HttpConnection_awaiter(this, void 0, void 0, function () {
            var headers, token, _a, name, value, negotiateUrl, response, negotiateResponse, e_4;
            return HttpConnection_generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        headers = {};
                        if (!this.accessTokenFactory) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.accessTokenFactory()];
                    case 1:
                        token = _b.sent();
                        if (token) {
                            headers["Authorization"] = "Bearer " + token;
                        }
                        _b.label = 2;
                    case 2:
                        _a = getUserAgentHeader(), name = _a[0], value = _a[1];
                        headers[name] = value;
                        negotiateUrl = this.resolveNegotiateUrl(url);
                        this.logger.log(LogLevel.Debug, "Sending negotiation request: " + negotiateUrl + ".");
                        _b.label = 3;
                    case 3:
                        _b.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, this.httpClient.post(negotiateUrl, {
                                content: "",
                                headers: HttpConnection_assign({}, headers, this.options.headers),
                                withCredentials: this.options.withCredentials,
                            })];
                    case 4:
                        response = _b.sent();
                        if (response.statusCode !== 200) {
                            return [2 /*return*/, Promise.reject(new Error("Unexpected status code returned from negotiate '" + response.statusCode + "'"))];
                        }
                        negotiateResponse = JSON.parse(response.content);
                        if (!negotiateResponse.negotiateVersion || negotiateResponse.negotiateVersion < 1) {
                            // Negotiate version 0 doesn't use connectionToken
                            // So we set it equal to connectionId so all our logic can use connectionToken without being aware of the negotiate version
                            negotiateResponse.connectionToken = negotiateResponse.connectionId;
                        }
                        return [2 /*return*/, negotiateResponse];
                    case 5:
                        e_4 = _b.sent();
                        this.logger.log(LogLevel.Error, "Failed to complete negotiation with the server: " + e_4);
                        return [2 /*return*/, Promise.reject(e_4)];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    HttpConnection.prototype.createConnectUrl = function (url, connectionToken) {
        if (!connectionToken) {
            return url;
        }
        return url + (url.indexOf("?") === -1 ? "?" : "&") + ("id=" + connectionToken);
    };
    HttpConnection.prototype.createTransport = function (url, requestedTransport, negotiateResponse, requestedTransferFormat) {
        return HttpConnection_awaiter(this, void 0, void 0, function () {
            var connectUrl, transportExceptions, transports, negotiate, _i, transports_1, endpoint, transportOrError, ex_1, ex_2, message;
            return HttpConnection_generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        connectUrl = this.createConnectUrl(url, negotiateResponse.connectionToken);
                        if (!this.isITransport(requestedTransport)) return [3 /*break*/, 2];
                        this.logger.log(LogLevel.Debug, "Connection was provided an instance of ITransport, using that directly.");
                        this.transport = requestedTransport;
                        return [4 /*yield*/, this.startTransport(connectUrl, requestedTransferFormat)];
                    case 1:
                        _a.sent();
                        this.connectionId = negotiateResponse.connectionId;
                        return [2 /*return*/];
                    case 2:
                        transportExceptions = [];
                        transports = negotiateResponse.availableTransports || [];
                        negotiate = negotiateResponse;
                        _i = 0, transports_1 = transports;
                        _a.label = 3;
                    case 3:
                        if (!(_i < transports_1.length)) return [3 /*break*/, 13];
                        endpoint = transports_1[_i];
                        transportOrError = this.resolveTransportOrError(endpoint, requestedTransport, requestedTransferFormat);
                        if (!(transportOrError instanceof Error)) return [3 /*break*/, 4];
                        // Store the error and continue, we don't want to cause a re-negotiate in these cases
                        transportExceptions.push(endpoint.transport + " failed: " + transportOrError);
                        return [3 /*break*/, 12];
                    case 4:
                        if (!this.isITransport(transportOrError)) return [3 /*break*/, 12];
                        this.transport = transportOrError;
                        if (!!negotiate) return [3 /*break*/, 9];
                        _a.label = 5;
                    case 5:
                        _a.trys.push([5, 7, , 8]);
                        return [4 /*yield*/, this.getNegotiationResponse(url)];
                    case 6:
                        negotiate = _a.sent();
                        return [3 /*break*/, 8];
                    case 7:
                        ex_1 = _a.sent();
                        return [2 /*return*/, Promise.reject(ex_1)];
                    case 8:
                        connectUrl = this.createConnectUrl(url, negotiate.connectionToken);
                        _a.label = 9;
                    case 9:
                        _a.trys.push([9, 11, , 12]);
                        return [4 /*yield*/, this.startTransport(connectUrl, requestedTransferFormat)];
                    case 10:
                        _a.sent();
                        this.connectionId = negotiate.connectionId;
                        return [2 /*return*/];
                    case 11:
                        ex_2 = _a.sent();
                        this.logger.log(LogLevel.Error, "Failed to start the transport '" + endpoint.transport + "': " + ex_2);
                        negotiate = undefined;
                        transportExceptions.push(endpoint.transport + " failed: " + ex_2);
                        if (this.connectionState !== "Connecting" /* Connecting */) {
                            message = "Failed to select transport before stop() was called.";
                            this.logger.log(LogLevel.Debug, message);
                            return [2 /*return*/, Promise.reject(new Error(message))];
                        }
                        return [3 /*break*/, 12];
                    case 12:
                        _i++;
                        return [3 /*break*/, 3];
                    case 13:
                        if (transportExceptions.length > 0) {
                            return [2 /*return*/, Promise.reject(new Error("Unable to connect to the server with any of the available transports. " + transportExceptions.join(" ")))];
                        }
                        return [2 /*return*/, Promise.reject(new Error("None of the transports supported by the client are supported by the server."))];
                }
            });
        });
    };
    HttpConnection.prototype.constructTransport = function (transport) {
        switch (transport) {
            case HttpTransportType.WebSockets:
                if (!this.options.WebSocket) {
                    throw new Error("'WebSocket' is not supported in your environment.");
                }
                return new WebSocketTransport(this.httpClient, this.accessTokenFactory, this.logger, this.options.logMessageContent || false, this.options.WebSocket, this.options.headers || {});
            case HttpTransportType.ServerSentEvents:
                if (!this.options.EventSource) {
                    throw new Error("'EventSource' is not supported in your environment.");
                }
                return new ServerSentEventsTransport(this.httpClient, this.accessTokenFactory, this.logger, this.options.logMessageContent || false, this.options.EventSource, this.options.withCredentials, this.options.headers || {});
            case HttpTransportType.LongPolling:
                return new LongPollingTransport(this.httpClient, this.accessTokenFactory, this.logger, this.options.logMessageContent || false, this.options.withCredentials, this.options.headers || {});
            default:
                throw new Error("Unknown transport: " + transport + ".");
        }
    };
    HttpConnection.prototype.startTransport = function (url, transferFormat) {
        var _this = this;
        this.transport.onreceive = this.onreceive;
        this.transport.onclose = function (e) { return _this.stopConnection(e); };
        return this.transport.connect(url, transferFormat);
    };
    HttpConnection.prototype.resolveTransportOrError = function (endpoint, requestedTransport, requestedTransferFormat) {
        var transport = HttpTransportType[endpoint.transport];
        if (transport === null || transport === undefined) {
            this.logger.log(LogLevel.Debug, "Skipping transport '" + endpoint.transport + "' because it is not supported by this client.");
            return new Error("Skipping transport '" + endpoint.transport + "' because it is not supported by this client.");
        }
        else {
            if (transportMatches(requestedTransport, transport)) {
                var transferFormats = endpoint.transferFormats.map(function (s) { return TransferFormat[s]; });
                if (transferFormats.indexOf(requestedTransferFormat) >= 0) {
                    if ((transport === HttpTransportType.WebSockets && !this.options.WebSocket) ||
                        (transport === HttpTransportType.ServerSentEvents && !this.options.EventSource)) {
                        this.logger.log(LogLevel.Debug, "Skipping transport '" + HttpTransportType[transport] + "' because it is not supported in your environment.'");
                        return new Error("'" + HttpTransportType[transport] + "' is not supported in your environment.");
                    }
                    else {
                        this.logger.log(LogLevel.Debug, "Selecting transport '" + HttpTransportType[transport] + "'.");
                        try {
                            return this.constructTransport(transport);
                        }
                        catch (ex) {
                            return ex;
                        }
                    }
                }
                else {
                    this.logger.log(LogLevel.Debug, "Skipping transport '" + HttpTransportType[transport] + "' because it does not support the requested transfer format '" + TransferFormat[requestedTransferFormat] + "'.");
                    return new Error("'" + HttpTransportType[transport] + "' does not support " + TransferFormat[requestedTransferFormat] + ".");
                }
            }
            else {
                this.logger.log(LogLevel.Debug, "Skipping transport '" + HttpTransportType[transport] + "' because it was disabled by the client.");
                return new Error("'" + HttpTransportType[transport] + "' is disabled by the client.");
            }
        }
    };
    HttpConnection.prototype.isITransport = function (transport) {
        return transport && typeof (transport) === "object" && "connect" in transport;
    };
    HttpConnection.prototype.stopConnection = function (error) {
        var _this = this;
        this.logger.log(LogLevel.Debug, "HttpConnection.stopConnection(" + error + ") called while in state " + this.connectionState + ".");
        this.transport = undefined;
        // If we have a stopError, it takes precedence over the error from the transport
        error = this.stopError || error;
        this.stopError = undefined;
        if (this.connectionState === "Disconnected" /* Disconnected */) {
            this.logger.log(LogLevel.Debug, "Call to HttpConnection.stopConnection(" + error + ") was ignored because the connection is already in the disconnected state.");
            return;
        }
        if (this.connectionState === "Connecting" /* Connecting */) {
            this.logger.log(LogLevel.Warning, "Call to HttpConnection.stopConnection(" + error + ") was ignored because the connection is still in the connecting state.");
            throw new Error("HttpConnection.stopConnection(" + error + ") was called while the connection is still in the connecting state.");
        }
        if (this.connectionState === "Disconnecting" /* Disconnecting */) {
            // A call to stop() induced this call to stopConnection and needs to be completed.
            // Any stop() awaiters will be scheduled to continue after the onclose callback fires.
            this.stopPromiseResolver();
        }
        if (error) {
            this.logger.log(LogLevel.Error, "Connection disconnected with error '" + error + "'.");
        }
        else {
            this.logger.log(LogLevel.Information, "Connection disconnected.");
        }
        if (this.sendQueue) {
            this.sendQueue.stop().catch(function (e) {
                _this.logger.log(LogLevel.Error, "TransportSendQueue.stop() threw error '" + e + "'.");
            });
            this.sendQueue = undefined;
        }
        this.connectionId = undefined;
        this.connectionState = "Disconnected" /* Disconnected */;
        if (this.connectionStarted) {
            this.connectionStarted = false;
            try {
                if (this.onclose) {
                    this.onclose(error);
                }
            }
            catch (e) {
                this.logger.log(LogLevel.Error, "HttpConnection.onclose(" + error + ") threw error '" + e + "'.");
            }
        }
    };
    HttpConnection.prototype.resolveUrl = function (url) {
        // startsWith is not supported in IE
        if (url.lastIndexOf("https://", 0) === 0 || url.lastIndexOf("http://", 0) === 0) {
            return url;
        }
        if (!Platform.isBrowser || !window.document) {
            throw new Error("Cannot resolve '" + url + "'.");
        }
        // Setting the url to the href propery of an anchor tag handles normalization
        // for us. There are 3 main cases.
        // 1. Relative path normalization e.g "b" -> "http://localhost:5000/a/b"
        // 2. Absolute path normalization e.g "/a/b" -> "http://localhost:5000/a/b"
        // 3. Networkpath reference normalization e.g "//localhost:5000/a/b" -> "http://localhost:5000/a/b"
        var aTag = window.document.createElement("a");
        aTag.href = url;
        this.logger.log(LogLevel.Information, "Normalizing '" + url + "' to '" + aTag.href + "'.");
        return aTag.href;
    };
    HttpConnection.prototype.resolveNegotiateUrl = function (url) {
        var index = url.indexOf("?");
        var negotiateUrl = url.substring(0, index === -1 ? url.length : index);
        if (negotiateUrl[negotiateUrl.length - 1] !== "/") {
            negotiateUrl += "/";
        }
        negotiateUrl += "negotiate";
        negotiateUrl += index === -1 ? "" : url.substring(index);
        if (negotiateUrl.indexOf("negotiateVersion") === -1) {
            negotiateUrl += index === -1 ? "?" : "&";
            negotiateUrl += "negotiateVersion=" + this.negotiateVersion;
        }
        return negotiateUrl;
    };
    return HttpConnection;
}());

function transportMatches(requestedTransport, actualTransport) {
    return !requestedTransport || ((actualTransport & requestedTransport) !== 0);
}
/** @private */
var TransportSendQueue = /** @class */ (function () {
    function TransportSendQueue(transport) {
        this.transport = transport;
        this.buffer = [];
        this.executing = true;
        this.sendBufferedData = new PromiseSource();
        this.transportResult = new PromiseSource();
        this.sendLoopPromise = this.sendLoop();
    }
    TransportSendQueue.prototype.send = function (data) {
        this.bufferData(data);
        if (!this.transportResult) {
            this.transportResult = new PromiseSource();
        }
        return this.transportResult.promise;
    };
    TransportSendQueue.prototype.stop = function () {
        this.executing = false;
        this.sendBufferedData.resolve();
        return this.sendLoopPromise;
    };
    TransportSendQueue.prototype.bufferData = function (data) {
        if (this.buffer.length && typeof (this.buffer[0]) !== typeof (data)) {
            throw new Error("Expected data to be of type " + typeof (this.buffer) + " but was of type " + typeof (data));
        }
        this.buffer.push(data);
        this.sendBufferedData.resolve();
    };
    TransportSendQueue.prototype.sendLoop = function () {
        return HttpConnection_awaiter(this, void 0, void 0, function () {
            var transportResult, data, error_1;
            return HttpConnection_generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (false) {}
                        return [4 /*yield*/, this.sendBufferedData.promise];
                    case 1:
                        _a.sent();
                        if (!this.executing) {
                            if (this.transportResult) {
                                this.transportResult.reject("Connection stopped.");
                            }
                            return [3 /*break*/, 6];
                        }
                        this.sendBufferedData = new PromiseSource();
                        transportResult = this.transportResult;
                        this.transportResult = undefined;
                        data = typeof (this.buffer[0]) === "string" ?
                            this.buffer.join("") :
                            TransportSendQueue.concatBuffers(this.buffer);
                        this.buffer.length = 0;
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.transport.send(data)];
                    case 3:
                        _a.sent();
                        transportResult.resolve();
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _a.sent();
                        transportResult.reject(error_1);
                        return [3 /*break*/, 5];
                    case 5: return [3 /*break*/, 0];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    TransportSendQueue.concatBuffers = function (arrayBuffers) {
        var totalLength = arrayBuffers.map(function (b) { return b.byteLength; }).reduce(function (a, b) { return a + b; });
        var result = new Uint8Array(totalLength);
        var offset = 0;
        for (var _i = 0, arrayBuffers_1 = arrayBuffers; _i < arrayBuffers_1.length; _i++) {
            var item = arrayBuffers_1[_i];
            result.set(new Uint8Array(item), offset);
            offset += item.byteLength;
        }
        return result.buffer;
    };
    return TransportSendQueue;
}());

var PromiseSource = /** @class */ (function () {
    function PromiseSource() {
        var _this = this;
        this.promise = new Promise(function (resolve, reject) {
            var _a;
            return _a = [resolve, reject], _this.resolver = _a[0], _this.rejecter = _a[1], _a;
        });
    }
    PromiseSource.prototype.resolve = function () {
        this.resolver();
    };
    PromiseSource.prototype.reject = function (reason) {
        this.rejecter(reason);
    };
    return PromiseSource;
}());
//# sourceMappingURL=HttpConnection.js.map
;// CONCATENATED MODULE: ./node_modules/app-base-v9/node_modules/@microsoft/signalr/dist/esm/JsonHubProtocol.js
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.





var JSON_HUB_PROTOCOL_NAME = "json";
/** Implements the JSON Hub Protocol. */
var JsonHubProtocol = /** @class */ (function () {
    function JsonHubProtocol() {
        /** @inheritDoc */
        this.name = JSON_HUB_PROTOCOL_NAME;
        /** @inheritDoc */
        this.version = 1;
        /** @inheritDoc */
        this.transferFormat = TransferFormat.Text;
    }
    /** Creates an array of {@link @microsoft/signalr.HubMessage} objects from the specified serialized representation.
     *
     * @param {string} input A string containing the serialized representation.
     * @param {ILogger} logger A logger that will be used to log messages that occur during parsing.
     */
    JsonHubProtocol.prototype.parseMessages = function (input, logger) {
        // The interface does allow "ArrayBuffer" to be passed in, but this implementation does not. So let's throw a useful error.
        if (typeof input !== "string") {
            throw new Error("Invalid input for JSON hub protocol. Expected a string.");
        }
        if (!input) {
            return [];
        }
        if (logger === null) {
            logger = NullLogger.instance;
        }
        // Parse the messages
        var messages = TextMessageFormat.parse(input);
        var hubMessages = [];
        for (var _i = 0, messages_1 = messages; _i < messages_1.length; _i++) {
            var message = messages_1[_i];
            var parsedMessage = JSON.parse(message);
            if (typeof parsedMessage.type !== "number") {
                throw new Error("Invalid payload.");
            }
            switch (parsedMessage.type) {
                case MessageType.Invocation:
                    this.isInvocationMessage(parsedMessage);
                    break;
                case MessageType.StreamItem:
                    this.isStreamItemMessage(parsedMessage);
                    break;
                case MessageType.Completion:
                    this.isCompletionMessage(parsedMessage);
                    break;
                case MessageType.Ping:
                    // Single value, no need to validate
                    break;
                case MessageType.Close:
                    // All optional values, no need to validate
                    break;
                default:
                    // Future protocol changes can add message types, old clients can ignore them
                    logger.log(LogLevel.Information, "Unknown message type '" + parsedMessage.type + "' ignored.");
                    continue;
            }
            hubMessages.push(parsedMessage);
        }
        return hubMessages;
    };
    /** Writes the specified {@link @microsoft/signalr.HubMessage} to a string and returns it.
     *
     * @param {HubMessage} message The message to write.
     * @returns {string} A string containing the serialized representation of the message.
     */
    JsonHubProtocol.prototype.writeMessage = function (message) {
        return TextMessageFormat.write(JSON.stringify(message));
    };
    JsonHubProtocol.prototype.isInvocationMessage = function (message) {
        this.assertNotEmptyString(message.target, "Invalid payload for Invocation message.");
        if (message.invocationId !== undefined) {
            this.assertNotEmptyString(message.invocationId, "Invalid payload for Invocation message.");
        }
    };
    JsonHubProtocol.prototype.isStreamItemMessage = function (message) {
        this.assertNotEmptyString(message.invocationId, "Invalid payload for StreamItem message.");
        if (message.item === undefined) {
            throw new Error("Invalid payload for StreamItem message.");
        }
    };
    JsonHubProtocol.prototype.isCompletionMessage = function (message) {
        if (message.result && message.error) {
            throw new Error("Invalid payload for Completion message.");
        }
        if (!message.result && message.error) {
            this.assertNotEmptyString(message.error, "Invalid payload for Completion message.");
        }
        this.assertNotEmptyString(message.invocationId, "Invalid payload for Completion message.");
    };
    JsonHubProtocol.prototype.assertNotEmptyString = function (value, errorMessage) {
        if (typeof value !== "string" || value === "") {
            throw new Error(errorMessage);
        }
    };
    return JsonHubProtocol;
}());

//# sourceMappingURL=JsonHubProtocol.js.map
;// CONCATENATED MODULE: ./node_modules/app-base-v9/node_modules/@microsoft/signalr/dist/esm/HubConnectionBuilder.js
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
var HubConnectionBuilder_assign = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};







// tslint:disable:object-literal-sort-keys
var LogLevelNameMapping = {
    trace: LogLevel.Trace,
    debug: LogLevel.Debug,
    info: LogLevel.Information,
    information: LogLevel.Information,
    warn: LogLevel.Warning,
    warning: LogLevel.Warning,
    error: LogLevel.Error,
    critical: LogLevel.Critical,
    none: LogLevel.None,
};
function parseLogLevel(name) {
    // Case-insensitive matching via lower-casing
    // Yes, I know case-folding is a complicated problem in Unicode, but we only support
    // the ASCII strings defined in LogLevelNameMapping anyway, so it's fine -anurse.
    var mapping = LogLevelNameMapping[name.toLowerCase()];
    if (typeof mapping !== "undefined") {
        return mapping;
    }
    else {
        throw new Error("Unknown log level: " + name);
    }
}
/** A builder for configuring {@link @microsoft/signalr.HubConnection} instances. */
var HubConnectionBuilder = /** @class */ (function () {
    function HubConnectionBuilder() {
    }
    HubConnectionBuilder.prototype.configureLogging = function (logging) {
        Arg.isRequired(logging, "logging");
        if (isLogger(logging)) {
            this.logger = logging;
        }
        else if (typeof logging === "string") {
            var logLevel = parseLogLevel(logging);
            this.logger = new ConsoleLogger(logLevel);
        }
        else {
            this.logger = new ConsoleLogger(logging);
        }
        return this;
    };
    HubConnectionBuilder.prototype.withUrl = function (url, transportTypeOrOptions) {
        Arg.isRequired(url, "url");
        Arg.isNotEmpty(url, "url");
        this.url = url;
        // Flow-typing knows where it's at. Since HttpTransportType is a number and IHttpConnectionOptions is guaranteed
        // to be an object, we know (as does TypeScript) this comparison is all we need to figure out which overload was called.
        if (typeof transportTypeOrOptions === "object") {
            this.httpConnectionOptions = HubConnectionBuilder_assign({}, this.httpConnectionOptions, transportTypeOrOptions);
        }
        else {
            this.httpConnectionOptions = HubConnectionBuilder_assign({}, this.httpConnectionOptions, { transport: transportTypeOrOptions });
        }
        return this;
    };
    /** Configures the {@link @microsoft/signalr.HubConnection} to use the specified Hub Protocol.
     *
     * @param {IHubProtocol} protocol The {@link @microsoft/signalr.IHubProtocol} implementation to use.
     */
    HubConnectionBuilder.prototype.withHubProtocol = function (protocol) {
        Arg.isRequired(protocol, "protocol");
        this.protocol = protocol;
        return this;
    };
    HubConnectionBuilder.prototype.withAutomaticReconnect = function (retryDelaysOrReconnectPolicy) {
        if (this.reconnectPolicy) {
            throw new Error("A reconnectPolicy has already been set.");
        }
        if (!retryDelaysOrReconnectPolicy) {
            this.reconnectPolicy = new DefaultReconnectPolicy();
        }
        else if (Array.isArray(retryDelaysOrReconnectPolicy)) {
            this.reconnectPolicy = new DefaultReconnectPolicy(retryDelaysOrReconnectPolicy);
        }
        else {
            this.reconnectPolicy = retryDelaysOrReconnectPolicy;
        }
        return this;
    };
    /** Creates a {@link @microsoft/signalr.HubConnection} from the configuration options specified in this builder.
     *
     * @returns {HubConnection} The configured {@link @microsoft/signalr.HubConnection}.
     */
    HubConnectionBuilder.prototype.build = function () {
        // If httpConnectionOptions has a logger, use it. Otherwise, override it with the one
        // provided to configureLogger
        var httpConnectionOptions = this.httpConnectionOptions || {};
        // If it's 'null', the user **explicitly** asked for null, don't mess with it.
        if (httpConnectionOptions.logger === undefined) {
            // If our logger is undefined or null, that's OK, the HttpConnection constructor will handle it.
            httpConnectionOptions.logger = this.logger;
        }
        // Now create the connection
        if (!this.url) {
            throw new Error("The 'HubConnectionBuilder.withUrl' method must be called before building the connection.");
        }
        var connection = new HttpConnection(this.url, httpConnectionOptions);
        return HubConnection.create(connection, this.logger || NullLogger.instance, this.protocol || new JsonHubProtocol(), this.reconnectPolicy);
    };
    return HubConnectionBuilder;
}());

function isLogger(logger) {
    return logger.log !== undefined;
}
//# sourceMappingURL=HubConnectionBuilder.js.map
;// CONCATENATED MODULE: ./node_modules/app-base-v9/node_modules/@microsoft/signalr/dist/esm/index.js
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.












//# sourceMappingURL=index.js.map

/***/ }),

/***/ 8773:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

const {
	V4MAPPED,
	ADDRCONFIG,
	ALL,
	promises: {
		Resolver: AsyncResolver
	},
	lookup: dnsLookup
} = __webpack_require__(9523);
const {promisify} = __webpack_require__(3837);
const os = __webpack_require__(2037);

const kCacheableLookupCreateConnection = Symbol('cacheableLookupCreateConnection');
const kCacheableLookupInstance = Symbol('cacheableLookupInstance');
const kExpires = Symbol('expires');

const supportsALL = typeof ALL === 'number';

const verifyAgent = agent => {
	if (!(agent && typeof agent.createConnection === 'function')) {
		throw new Error('Expected an Agent instance as the first argument');
	}
};

const map4to6 = entries => {
	for (const entry of entries) {
		if (entry.family === 6) {
			continue;
		}

		entry.address = `::ffff:${entry.address}`;
		entry.family = 6;
	}
};

const getIfaceInfo = () => {
	let has4 = false;
	let has6 = false;

	for (const device of Object.values(os.networkInterfaces())) {
		for (const iface of device) {
			if (iface.internal) {
				continue;
			}

			if (iface.family === 'IPv6') {
				has6 = true;
			} else {
				has4 = true;
			}

			if (has4 && has6) {
				return {has4, has6};
			}
		}
	}

	return {has4, has6};
};

const isIterable = map => {
	return Symbol.iterator in map;
};

const ignoreNoResultErrors = dnsPromise => {
	return dnsPromise.catch(error => {
		if (
			error.code === 'ENODATA' ||
			error.code === 'ENOTFOUND' ||
			error.code === 'ENOENT' // Windows: name exists, but not this record type
		) {
			return [];
		}

		throw error;
	});
};

const ttl = {ttl: true};
const all = {all: true};
const all4 = {all: true, family: 4};
const all6 = {all: true, family: 6};

class CacheableLookup {
	constructor({
		cache = new Map(),
		maxTtl = Infinity,
		fallbackDuration = 3600,
		errorTtl = 0.15,
		resolver = new AsyncResolver(),
		lookup = dnsLookup
	} = {}) {
		this.maxTtl = maxTtl;
		this.errorTtl = errorTtl;

		this._cache = cache;
		this._resolver = resolver;
		this._dnsLookup = lookup && promisify(lookup);

		if (this._resolver instanceof AsyncResolver) {
			this._resolve4 = this._resolver.resolve4.bind(this._resolver);
			this._resolve6 = this._resolver.resolve6.bind(this._resolver);
		} else {
			this._resolve4 = promisify(this._resolver.resolve4.bind(this._resolver));
			this._resolve6 = promisify(this._resolver.resolve6.bind(this._resolver));
		}

		this._iface = getIfaceInfo();

		this._pending = {};
		this._nextRemovalTime = false;
		this._hostnamesToFallback = new Set();

		this.fallbackDuration = fallbackDuration;

		if (fallbackDuration > 0) {
			const interval = setInterval(() => {
				this._hostnamesToFallback.clear();
			}, fallbackDuration * 1000);

			/* istanbul ignore next: There is no `interval.unref()` when running inside an Electron renderer */
			if (interval.unref) {
				interval.unref();
			}

			this._fallbackInterval = interval;
		}

		this.lookup = this.lookup.bind(this);
		this.lookupAsync = this.lookupAsync.bind(this);
	}

	set servers(servers) {
		this.clear();

		this._resolver.setServers(servers);
	}

	get servers() {
		return this._resolver.getServers();
	}

	lookup(hostname, options, callback) {
		if (typeof options === 'function') {
			callback = options;
			options = {};
		} else if (typeof options === 'number') {
			options = {
				family: options
			};
		}

		if (!callback) {
			throw new Error('Callback must be a function.');
		}

		// eslint-disable-next-line promise/prefer-await-to-then
		this.lookupAsync(hostname, options).then(result => {
			if (options.all) {
				callback(null, result);
			} else {
				callback(null, result.address, result.family, result.expires, result.ttl, result.source);
			}
		}, callback);
	}

	async lookupAsync(hostname, options = {}) {
		if (typeof options === 'number') {
			options = {
				family: options
			};
		}

		let cached = await this.query(hostname);

		if (options.family === 6) {
			const filtered = cached.filter(entry => entry.family === 6);

			if (options.hints & V4MAPPED) {
				if ((supportsALL && options.hints & ALL) || filtered.length === 0) {
					map4to6(cached);
				} else {
					cached = filtered;
				}
			} else {
				cached = filtered;
			}
		} else if (options.family === 4) {
			cached = cached.filter(entry => entry.family === 4);
		}

		if (options.hints & ADDRCONFIG) {
			const {_iface} = this;
			cached = cached.filter(entry => entry.family === 6 ? _iface.has6 : _iface.has4);
		}

		if (cached.length === 0) {
			const error = new Error(`cacheableLookup ENOTFOUND ${hostname}`);
			error.code = 'ENOTFOUND';
			error.hostname = hostname;

			throw error;
		}

		if (options.all) {
			return cached;
		}

		return cached[0];
	}

	async query(hostname) {
		let source = 'cache';
		let cached = await this._cache.get(hostname);

		if (!cached) {
			const pending = this._pending[hostname];

			if (pending) {
				cached = await pending;
			} else {
				source = 'query';
				const newPromise = this.queryAndCache(hostname);
				this._pending[hostname] = newPromise;

				try {
					cached = await newPromise;
				} finally {
					delete this._pending[hostname];
				}
			}
		}

		cached = cached.map(entry => {
			return {...entry, source};
		});

		return cached;
	}

	async _resolve(hostname) {
		// ANY is unsafe as it doesn't trigger new queries in the underlying server.
		const [A, AAAA] = await Promise.all([
			ignoreNoResultErrors(this._resolve4(hostname, ttl)),
			ignoreNoResultErrors(this._resolve6(hostname, ttl))
		]);

		let aTtl = 0;
		let aaaaTtl = 0;
		let cacheTtl = 0;

		const now = Date.now();

		for (const entry of A) {
			entry.family = 4;
			entry.expires = now + (entry.ttl * 1000);

			aTtl = Math.max(aTtl, entry.ttl);
		}

		for (const entry of AAAA) {
			entry.family = 6;
			entry.expires = now + (entry.ttl * 1000);

			aaaaTtl = Math.max(aaaaTtl, entry.ttl);
		}

		if (A.length > 0) {
			if (AAAA.length > 0) {
				cacheTtl = Math.min(aTtl, aaaaTtl);
			} else {
				cacheTtl = aTtl;
			}
		} else {
			cacheTtl = aaaaTtl;
		}

		return {
			entries: [
				...A,
				...AAAA
			],
			cacheTtl
		};
	}

	async _lookup(hostname) {
		try {
			const [A, AAAA] = await Promise.all([
				// Passing {all: true} doesn't return all IPv4 and IPv6 entries.
				// See https://github.com/szmarczak/cacheable-lookup/issues/42
				ignoreNoResultErrors(this._dnsLookup(hostname, all4)),
				ignoreNoResultErrors(this._dnsLookup(hostname, all6))
			]);

			return {
				entries: [
					...A,
					...AAAA
				],
				cacheTtl: 0
			};
		} catch {
			return {
				entries: [],
				cacheTtl: 0
			};
		}
	}

	async _set(hostname, data, cacheTtl) {
		if (this.maxTtl > 0 && cacheTtl > 0) {
			cacheTtl = Math.min(cacheTtl, this.maxTtl) * 1000;
			data[kExpires] = Date.now() + cacheTtl;

			try {
				await this._cache.set(hostname, data, cacheTtl);
			} catch (error) {
				this.lookupAsync = async () => {
					const cacheError = new Error('Cache Error. Please recreate the CacheableLookup instance.');
					cacheError.cause = error;

					throw cacheError;
				};
			}

			if (isIterable(this._cache)) {
				this._tick(cacheTtl);
			}
		}
	}

	async queryAndCache(hostname) {
		if (this._hostnamesToFallback.has(hostname)) {
			return this._dnsLookup(hostname, all);
		}

		let query = await this._resolve(hostname);

		if (query.entries.length === 0 && this._dnsLookup) {
			query = await this._lookup(hostname);

			if (query.entries.length !== 0 && this.fallbackDuration > 0) {
				// Use `dns.lookup(...)` for that particular hostname
				this._hostnamesToFallback.add(hostname);
			}
		}

		const cacheTtl = query.entries.length === 0 ? this.errorTtl : query.cacheTtl;
		await this._set(hostname, query.entries, cacheTtl);

		return query.entries;
	}

	_tick(ms) {
		const nextRemovalTime = this._nextRemovalTime;

		if (!nextRemovalTime || ms < nextRemovalTime) {
			clearTimeout(this._removalTimeout);

			this._nextRemovalTime = ms;

			this._removalTimeout = setTimeout(() => {
				this._nextRemovalTime = false;

				let nextExpiry = Infinity;

				const now = Date.now();

				for (const [hostname, entries] of this._cache) {
					const expires = entries[kExpires];

					if (now >= expires) {
						this._cache.delete(hostname);
					} else if (expires < nextExpiry) {
						nextExpiry = expires;
					}
				}

				if (nextExpiry !== Infinity) {
					this._tick(nextExpiry - now);
				}
			}, ms);

			/* istanbul ignore next: There is no `timeout.unref()` when running inside an Electron renderer */
			if (this._removalTimeout.unref) {
				this._removalTimeout.unref();
			}
		}
	}

	install(agent) {
		verifyAgent(agent);

		if (kCacheableLookupCreateConnection in agent) {
			throw new Error('CacheableLookup has been already installed');
		}

		agent[kCacheableLookupCreateConnection] = agent.createConnection;
		agent[kCacheableLookupInstance] = this;

		agent.createConnection = (options, callback) => {
			if (!('lookup' in options)) {
				options.lookup = this.lookup;
			}

			return agent[kCacheableLookupCreateConnection](options, callback);
		};
	}

	uninstall(agent) {
		verifyAgent(agent);

		if (agent[kCacheableLookupCreateConnection]) {
			if (agent[kCacheableLookupInstance] !== this) {
				throw new Error('The agent is not owned by this CacheableLookup instance');
			}

			agent.createConnection = agent[kCacheableLookupCreateConnection];

			delete agent[kCacheableLookupCreateConnection];
			delete agent[kCacheableLookupInstance];
		}
	}

	updateInterfaceInfo() {
		const {_iface} = this;

		this._iface = getIfaceInfo();

		if ((_iface.has4 && !this._iface.has4) || (_iface.has6 && !this._iface.has6)) {
			this._cache.clear();
		}
	}

	clear(hostname) {
		if (hostname) {
			this._cache.delete(hostname);
			return;
		}

		this._cache.clear();
	}
}

module.exports = CacheableLookup;
module.exports["default"] = CacheableLookup;


/***/ }),

/***/ 997:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

const {PassThrough: PassThroughStream} = __webpack_require__(2781);

module.exports = options => {
	options = {...options};

	const {array} = options;
	let {encoding} = options;
	const isBuffer = encoding === 'buffer';
	let objectMode = false;

	if (array) {
		objectMode = !(encoding || isBuffer);
	} else {
		encoding = encoding || 'utf8';
	}

	if (isBuffer) {
		encoding = null;
	}

	const stream = new PassThroughStream({objectMode});

	if (encoding) {
		stream.setEncoding(encoding);
	}

	let length = 0;
	const chunks = [];

	stream.on('data', chunk => {
		chunks.push(chunk);

		if (objectMode) {
			length = chunks.length;
		} else {
			length += chunk.length;
		}
	});

	stream.getBufferedValue = () => {
		if (array) {
			return chunks;
		}

		return isBuffer ? Buffer.concat(chunks, length) : chunks.join('');
	};

	stream.getBufferedLength = () => length;

	return stream;
};


/***/ }),

/***/ 4684:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

const {constants: BufferConstants} = __webpack_require__(4300);
const pump = __webpack_require__(2539);
const bufferStream = __webpack_require__(997);

class MaxBufferError extends Error {
	constructor() {
		super('maxBuffer exceeded');
		this.name = 'MaxBufferError';
	}
}

async function getStream(inputStream, options) {
	if (!inputStream) {
		return Promise.reject(new Error('Expected a stream'));
	}

	options = {
		maxBuffer: Infinity,
		...options
	};

	const {maxBuffer} = options;

	let stream;
	await new Promise((resolve, reject) => {
		const rejectPromise = error => {
			// Don't retrieve an oversized buffer.
			if (error && stream.getBufferedLength() <= BufferConstants.MAX_LENGTH) {
				error.bufferedData = stream.getBufferedValue();
			}

			reject(error);
		};

		stream = pump(inputStream, bufferStream(options), error => {
			if (error) {
				rejectPromise(error);
				return;
			}

			resolve();
		});

		stream.on('data', () => {
			if (stream.getBufferedLength() > maxBuffer) {
				rejectPromise(new MaxBufferError());
			}
		});
	});

	return stream.getBufferedValue();
}

module.exports = getStream;
// TODO: Remove this for the next major release
module.exports["default"] = getStream;
module.exports.buffer = (stream, options) => getStream(stream, {...options, encoding: 'buffer'});
module.exports.array = (stream, options) => getStream(stream, {...options, array: true});
module.exports.MaxBufferError = MaxBufferError;


/***/ }),

/***/ 3086:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const EventEmitter = __webpack_require__(2361);
const urlLib = __webpack_require__(7310);
const normalizeUrl = __webpack_require__(9636);
const getStream = __webpack_require__(4684);
const CachePolicy = __webpack_require__(8037);
const Response = __webpack_require__(6064);
const lowercaseKeys = __webpack_require__(7519);
const cloneResponse = __webpack_require__(5432);
const Keyv = __webpack_require__(5773);

class CacheableRequest {
	constructor(request, cacheAdapter) {
		if (typeof request !== 'function') {
			throw new TypeError('Parameter `request` must be a function');
		}

		this.cache = new Keyv({
			uri: typeof cacheAdapter === 'string' && cacheAdapter,
			store: typeof cacheAdapter !== 'string' && cacheAdapter,
			namespace: 'cacheable-request'
		});

		return this.createCacheableRequest(request);
	}

	createCacheableRequest(request) {
		return (opts, cb) => {
			let url;
			if (typeof opts === 'string') {
				url = normalizeUrlObject(urlLib.parse(opts));
				opts = {};
			} else if (opts instanceof urlLib.URL) {
				url = normalizeUrlObject(urlLib.parse(opts.toString()));
				opts = {};
			} else {
				const [pathname, ...searchParts] = (opts.path || '').split('?');
				const search = searchParts.length > 0 ?
					`?${searchParts.join('?')}` :
					'';
				url = normalizeUrlObject({ ...opts, pathname, search });
			}

			opts = {
				headers: {},
				method: 'GET',
				cache: true,
				strictTtl: false,
				automaticFailover: false,
				...opts,
				...urlObjectToRequestOptions(url)
			};
			opts.headers = lowercaseKeys(opts.headers);

			const ee = new EventEmitter();
			const normalizedUrlString = normalizeUrl(
				urlLib.format(url),
				{
					stripWWW: false,
					removeTrailingSlash: false,
					stripAuthentication: false
				}
			);
			const key = `${opts.method}:${normalizedUrlString}`;
			let revalidate = false;
			let madeRequest = false;

			const makeRequest = opts => {
				madeRequest = true;
				let requestErrored = false;
				let requestErrorCallback;

				const requestErrorPromise = new Promise(resolve => {
					requestErrorCallback = () => {
						if (!requestErrored) {
							requestErrored = true;
							resolve();
						}
					};
				});

				const handler = response => {
					if (revalidate && !opts.forceRefresh) {
						response.status = response.statusCode;
						const revalidatedPolicy = CachePolicy.fromObject(revalidate.cachePolicy).revalidatedPolicy(opts, response);
						if (!revalidatedPolicy.modified) {
							const headers = revalidatedPolicy.policy.responseHeaders();
							response = new Response(revalidate.statusCode, headers, revalidate.body, revalidate.url);
							response.cachePolicy = revalidatedPolicy.policy;
							response.fromCache = true;
						}
					}

					if (!response.fromCache) {
						response.cachePolicy = new CachePolicy(opts, response, opts);
						response.fromCache = false;
					}

					let clonedResponse;
					if (opts.cache && response.cachePolicy.storable()) {
						clonedResponse = cloneResponse(response);

						(async () => {
							try {
								const bodyPromise = getStream.buffer(response);

								await Promise.race([
									requestErrorPromise,
									new Promise(resolve => response.once('end', resolve))
								]);

								if (requestErrored) {
									return;
								}

								const body = await bodyPromise;

								const value = {
									cachePolicy: response.cachePolicy.toObject(),
									url: response.url,
									statusCode: response.fromCache ? revalidate.statusCode : response.statusCode,
									body
								};

								let ttl = opts.strictTtl ? response.cachePolicy.timeToLive() : undefined;
								if (opts.maxTtl) {
									ttl = ttl ? Math.min(ttl, opts.maxTtl) : opts.maxTtl;
								}

								await this.cache.set(key, value, ttl);
							} catch (error) {
								ee.emit('error', new CacheableRequest.CacheError(error));
							}
						})();
					} else if (opts.cache && revalidate) {
						(async () => {
							try {
								await this.cache.delete(key);
							} catch (error) {
								ee.emit('error', new CacheableRequest.CacheError(error));
							}
						})();
					}

					ee.emit('response', clonedResponse || response);
					if (typeof cb === 'function') {
						cb(clonedResponse || response);
					}
				};

				try {
					const req = request(opts, handler);
					req.once('error', requestErrorCallback);
					req.once('abort', requestErrorCallback);
					ee.emit('request', req);
				} catch (error) {
					ee.emit('error', new CacheableRequest.RequestError(error));
				}
			};

			(async () => {
				const get = async opts => {
					await Promise.resolve();

					const cacheEntry = opts.cache ? await this.cache.get(key) : undefined;
					if (typeof cacheEntry === 'undefined') {
						return makeRequest(opts);
					}

					const policy = CachePolicy.fromObject(cacheEntry.cachePolicy);
					if (policy.satisfiesWithoutRevalidation(opts) && !opts.forceRefresh) {
						const headers = policy.responseHeaders();
						const response = new Response(cacheEntry.statusCode, headers, cacheEntry.body, cacheEntry.url);
						response.cachePolicy = policy;
						response.fromCache = true;

						ee.emit('response', response);
						if (typeof cb === 'function') {
							cb(response);
						}
					} else {
						revalidate = cacheEntry;
						opts.headers = policy.revalidationHeaders(opts);
						makeRequest(opts);
					}
				};

				const errorHandler = error => ee.emit('error', new CacheableRequest.CacheError(error));
				this.cache.once('error', errorHandler);
				ee.on('response', () => this.cache.removeListener('error', errorHandler));

				try {
					await get(opts);
				} catch (error) {
					if (opts.automaticFailover && !madeRequest) {
						makeRequest(opts);
					}

					ee.emit('error', new CacheableRequest.CacheError(error));
				}
			})();

			return ee;
		};
	}
}

function urlObjectToRequestOptions(url) {
	const options = { ...url };
	options.path = `${url.pathname || '/'}${url.search || ''}`;
	delete options.pathname;
	delete options.search;
	return options;
}

function normalizeUrlObject(url) {
	// If url was parsed by url.parse or new URL:
	// - hostname will be set
	// - host will be hostname[:port]
	// - port will be set if it was explicit in the parsed string
	// Otherwise, url was from request options:
	// - hostname or host may be set
	// - host shall not have port encoded
	return {
		protocol: url.protocol,
		auth: url.auth,
		hostname: url.hostname || url.host || 'localhost',
		port: url.port,
		pathname: url.pathname,
		search: url.search
	};
}

CacheableRequest.RequestError = class extends Error {
	constructor(error) {
		super(error.message);
		this.name = 'RequestError';
		Object.assign(this, error);
	}
};

CacheableRequest.CacheError = class extends Error {
	constructor(error) {
		super(error.message);
		this.name = 'CacheError';
		Object.assign(this, error);
	}
};

module.exports = CacheableRequest;


/***/ }),

/***/ 2990:
/***/ ((module) => {

"use strict";


// We define these manually to ensure they're always copied
// even if they would move up the prototype chain
// https://nodejs.org/api/http.html#http_class_http_incomingmessage
const knownProps = [
	'destroy',
	'setTimeout',
	'socket',
	'headers',
	'trailers',
	'rawHeaders',
	'statusCode',
	'httpVersion',
	'httpVersionMinor',
	'httpVersionMajor',
	'rawTrailers',
	'statusMessage'
];

module.exports = (fromStream, toStream) => {
	const fromProps = new Set(Object.keys(fromStream).concat(knownProps));

	for (const prop of fromProps) {
		// Don't overwrite existing properties
		if (prop in toStream) {
			continue;
		}

		toStream[prop] = typeof fromStream[prop] === 'function' ? fromStream[prop].bind(fromStream) : fromStream[prop];
	}
};


/***/ }),

/***/ 5432:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const PassThrough = (__webpack_require__(2781).PassThrough);
const mimicResponse = __webpack_require__(2990);

const cloneResponse = response => {
	if (!(response && response.pipe)) {
		throw new TypeError('Parameter `response` must be a response stream.');
	}

	const clone = new PassThrough();
	mimicResponse(response, clone);

	return response.pipe(clone);
};

module.exports = cloneResponse;


/***/ }),

/***/ 3736:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const { promisify } = __webpack_require__(3837)
const JSONB = __webpack_require__(7620)
const zlib = __webpack_require__(9796)

const mergeOptions = __webpack_require__(6995)

const compress = promisify(zlib.brotliCompress)

const decompress = promisify(zlib.brotliDecompress)

const identity = val => val

const createCompress = ({
  enable = true,
  serialize = JSONB.stringify,
  deserialize = JSONB.parse,
  compressOptions,
  decompressOptions
} = {}) => {
  if (!enable) {
    return { serialize, deserialize, decompress: identity, compress: identity }
  }

  return {
    serialize,
    deserialize,
    compress: async (data, options = {}) => {
      if (data === undefined) return data
      const serializedData = serialize(data)
      return compress(serializedData, mergeOptions(compressOptions, options))
    },
    decompress: async (data, options = {}) => {
      if (data === undefined) return data
      return deserialize(
        await decompress(data, mergeOptions(decompressOptions, options))
      )
    }
  }
}

module.exports = createCompress
module.exports.stringify = JSONB.stringify
module.exports.parse = JSONB.parse


/***/ }),

/***/ 6995:
/***/ ((module) => {

"use strict";


module.exports = (defaultOptions = {}, options = {}) => {
  const params = {
    ...(defaultOptions.params || {}),
    ...(options.params || {})
  }

  return {
    ...defaultOptions,
    ...options,
    ...(Object.keys(params).length
      ? {
          params
        }
      : {})
  }
}


/***/ }),

/***/ 6941:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

const {Transform, PassThrough} = __webpack_require__(2781);
const zlib = __webpack_require__(9796);
const mimicResponse = __webpack_require__(9496);

module.exports = response => {
	const contentEncoding = (response.headers['content-encoding'] || '').toLowerCase();

	if (!['gzip', 'deflate', 'br'].includes(contentEncoding)) {
		return response;
	}

	// TODO: Remove this when targeting Node.js 12.
	const isBrotli = contentEncoding === 'br';
	if (isBrotli && typeof zlib.createBrotliDecompress !== 'function') {
		response.destroy(new Error('Brotli is not supported on Node.js < 12'));
		return response;
	}

	let isEmpty = true;

	const checker = new Transform({
		transform(data, _encoding, callback) {
			isEmpty = false;

			callback(null, data);
		},

		flush(callback) {
			callback();
		}
	});

	const finalStream = new PassThrough({
		autoDestroy: false,
		destroy(error, callback) {
			response.destroy();

			callback(error);
		}
	});

	const decompressStream = isBrotli ? zlib.createBrotliDecompress() : zlib.createUnzip();

	decompressStream.once('error', error => {
		if (isEmpty && !response.readable) {
			finalStream.end();
			return;
		}

		finalStream.destroy(error);
	});

	mimicResponse(response, finalStream);
	response.pipe(checker).pipe(decompressStream).pipe(finalStream);

	return finalStream;
};


/***/ }),

/***/ 8695:
/***/ ((module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
function isTLSSocket(socket) {
    return socket.encrypted;
}
const deferToConnect = (socket, fn) => {
    let listeners;
    if (typeof fn === 'function') {
        const connect = fn;
        listeners = { connect };
    }
    else {
        listeners = fn;
    }
    const hasConnectListener = typeof listeners.connect === 'function';
    const hasSecureConnectListener = typeof listeners.secureConnect === 'function';
    const hasCloseListener = typeof listeners.close === 'function';
    const onConnect = () => {
        if (hasConnectListener) {
            listeners.connect();
        }
        if (isTLSSocket(socket) && hasSecureConnectListener) {
            if (socket.authorized) {
                listeners.secureConnect();
            }
            else if (!socket.authorizationError) {
                socket.once('secureConnect', listeners.secureConnect);
            }
        }
        if (hasCloseListener) {
            socket.once('close', listeners.close);
        }
    };
    if (socket.writable && !socket.connecting) {
        onConnect();
    }
    else if (socket.connecting) {
        socket.once('connect', onConnect);
    }
    else if (socket.destroyed && hasCloseListener) {
        listeners.close(socket._hadError);
    }
};
exports["default"] = deferToConnect;
// For CommonJS default export support
module.exports = deferToConnect;
module.exports["default"] = deferToConnect;


/***/ }),

/***/ 221:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var once = __webpack_require__(8576);

var noop = function() {};

var isRequest = function(stream) {
	return stream.setHeader && typeof stream.abort === 'function';
};

var isChildProcess = function(stream) {
	return stream.stdio && Array.isArray(stream.stdio) && stream.stdio.length === 3
};

var eos = function(stream, opts, callback) {
	if (typeof opts === 'function') return eos(stream, null, opts);
	if (!opts) opts = {};

	callback = once(callback || noop);

	var ws = stream._writableState;
	var rs = stream._readableState;
	var readable = opts.readable || (opts.readable !== false && stream.readable);
	var writable = opts.writable || (opts.writable !== false && stream.writable);
	var cancelled = false;

	var onlegacyfinish = function() {
		if (!stream.writable) onfinish();
	};

	var onfinish = function() {
		writable = false;
		if (!readable) callback.call(stream);
	};

	var onend = function() {
		readable = false;
		if (!writable) callback.call(stream);
	};

	var onexit = function(exitCode) {
		callback.call(stream, exitCode ? new Error('exited with error code: ' + exitCode) : null);
	};

	var onerror = function(err) {
		callback.call(stream, err);
	};

	var onclose = function() {
		process.nextTick(onclosenexttick);
	};

	var onclosenexttick = function() {
		if (cancelled) return;
		if (readable && !(rs && (rs.ended && !rs.destroyed))) return callback.call(stream, new Error('premature close'));
		if (writable && !(ws && (ws.ended && !ws.destroyed))) return callback.call(stream, new Error('premature close'));
	};

	var onrequest = function() {
		stream.req.on('finish', onfinish);
	};

	if (isRequest(stream)) {
		stream.on('complete', onfinish);
		stream.on('abort', onclose);
		if (stream.req) onrequest();
		else stream.on('request', onrequest);
	} else if (writable && !ws) { // legacy streams
		stream.on('end', onlegacyfinish);
		stream.on('close', onlegacyfinish);
	}

	if (isChildProcess(stream)) stream.on('exit', onexit);

	stream.on('end', onend);
	stream.on('finish', onfinish);
	if (opts.error !== false) stream.on('error', onerror);
	stream.on('close', onclose);

	return function() {
		cancelled = true;
		stream.removeListener('complete', onfinish);
		stream.removeListener('abort', onclose);
		stream.removeListener('request', onrequest);
		if (stream.req) stream.req.removeListener('finish', onfinish);
		stream.removeListener('end', onlegacyfinish);
		stream.removeListener('close', onlegacyfinish);
		stream.removeListener('finish', onfinish);
		stream.removeListener('exit', onexit);
		stream.removeListener('end', onend);
		stream.removeListener('error', onerror);
		stream.removeListener('close', onclose);
	};
};

module.exports = eos;


/***/ }),

/***/ 2447:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

const {PassThrough: PassThroughStream} = __webpack_require__(2781);

module.exports = options => {
	options = {...options};

	const {array} = options;
	let {encoding} = options;
	const isBuffer = encoding === 'buffer';
	let objectMode = false;

	if (array) {
		objectMode = !(encoding || isBuffer);
	} else {
		encoding = encoding || 'utf8';
	}

	if (isBuffer) {
		encoding = null;
	}

	const stream = new PassThroughStream({objectMode});

	if (encoding) {
		stream.setEncoding(encoding);
	}

	let length = 0;
	const chunks = [];

	stream.on('data', chunk => {
		chunks.push(chunk);

		if (objectMode) {
			length = chunks.length;
		} else {
			length += chunk.length;
		}
	});

	stream.getBufferedValue = () => {
		if (array) {
			return chunks;
		}

		return isBuffer ? Buffer.concat(chunks, length) : chunks.join('');
	};

	stream.getBufferedLength = () => length;

	return stream;
};


/***/ }),

/***/ 8633:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

const {constants: BufferConstants} = __webpack_require__(4300);
const stream = __webpack_require__(2781);
const {promisify} = __webpack_require__(3837);
const bufferStream = __webpack_require__(2447);

const streamPipelinePromisified = promisify(stream.pipeline);

class MaxBufferError extends Error {
	constructor() {
		super('maxBuffer exceeded');
		this.name = 'MaxBufferError';
	}
}

async function getStream(inputStream, options) {
	if (!inputStream) {
		throw new Error('Expected a stream');
	}

	options = {
		maxBuffer: Infinity,
		...options
	};

	const {maxBuffer} = options;
	const stream = bufferStream(options);

	await new Promise((resolve, reject) => {
		const rejectPromise = error => {
			// Don't retrieve an oversized buffer.
			if (error && stream.getBufferedLength() <= BufferConstants.MAX_LENGTH) {
				error.bufferedData = stream.getBufferedValue();
			}

			reject(error);
		};

		(async () => {
			try {
				await streamPipelinePromisified(inputStream, stream);
				resolve();
			} catch (error) {
				rejectPromise(error);
			}
		})();

		stream.on('data', () => {
			if (stream.getBufferedLength() > maxBuffer) {
				rejectPromise(new MaxBufferError());
			}
		});
	});

	return stream.getBufferedValue();
}

module.exports = getStream;
module.exports.buffer = (stream, options) => getStream(stream, {...options, encoding: 'buffer'});
module.exports.array = (stream, options) => getStream(stream, {...options, array: true});
module.exports.MaxBufferError = MaxBufferError;


/***/ }),

/***/ 8037:
/***/ ((module) => {

"use strict";

// rfc7231 6.1
const statusCodeCacheableByDefault = new Set([
    200,
    203,
    204,
    206,
    300,
    301,
    404,
    405,
    410,
    414,
    501,
]);

// This implementation does not understand partial responses (206)
const understoodStatuses = new Set([
    200,
    203,
    204,
    300,
    301,
    302,
    303,
    307,
    308,
    404,
    405,
    410,
    414,
    501,
]);

const errorStatusCodes = new Set([
    500,
    502,
    503, 
    504,
]);

const hopByHopHeaders = {
    date: true, // included, because we add Age update Date
    connection: true,
    'keep-alive': true,
    'proxy-authenticate': true,
    'proxy-authorization': true,
    te: true,
    trailer: true,
    'transfer-encoding': true,
    upgrade: true,
};

const excludedFromRevalidationUpdate = {
    // Since the old body is reused, it doesn't make sense to change properties of the body
    'content-length': true,
    'content-encoding': true,
    'transfer-encoding': true,
    'content-range': true,
};

function toNumberOrZero(s) {
    const n = parseInt(s, 10);
    return isFinite(n) ? n : 0;
}

// RFC 5861
function isErrorResponse(response) {
    // consider undefined response as faulty
    if(!response) {
        return true
    }
    return errorStatusCodes.has(response.status);
}

function parseCacheControl(header) {
    const cc = {};
    if (!header) return cc;

    // TODO: When there is more than one value present for a given directive (e.g., two Expires header fields, multiple Cache-Control: max-age directives),
    // the directive's value is considered invalid. Caches are encouraged to consider responses that have invalid freshness information to be stale
    const parts = header.trim().split(/\s*,\s*/); // TODO: lame parsing
    for (const part of parts) {
        const [k, v] = part.split(/\s*=\s*/, 2);
        cc[k] = v === undefined ? true : v.replace(/^"|"$/g, ''); // TODO: lame unquoting
    }

    return cc;
}

function formatCacheControl(cc) {
    let parts = [];
    for (const k in cc) {
        const v = cc[k];
        parts.push(v === true ? k : k + '=' + v);
    }
    if (!parts.length) {
        return undefined;
    }
    return parts.join(', ');
}

module.exports = class CachePolicy {
    constructor(
        req,
        res,
        {
            shared,
            cacheHeuristic,
            immutableMinTimeToLive,
            ignoreCargoCult,
            _fromObject,
        } = {}
    ) {
        if (_fromObject) {
            this._fromObject(_fromObject);
            return;
        }

        if (!res || !res.headers) {
            throw Error('Response headers missing');
        }
        this._assertRequestHasHeaders(req);

        this._responseTime = this.now();
        this._isShared = shared !== false;
        this._cacheHeuristic =
            undefined !== cacheHeuristic ? cacheHeuristic : 0.1; // 10% matches IE
        this._immutableMinTtl =
            undefined !== immutableMinTimeToLive
                ? immutableMinTimeToLive
                : 24 * 3600 * 1000;

        this._status = 'status' in res ? res.status : 200;
        this._resHeaders = res.headers;
        this._rescc = parseCacheControl(res.headers['cache-control']);
        this._method = 'method' in req ? req.method : 'GET';
        this._url = req.url;
        this._host = req.headers.host;
        this._noAuthorization = !req.headers.authorization;
        this._reqHeaders = res.headers.vary ? req.headers : null; // Don't keep all request headers if they won't be used
        this._reqcc = parseCacheControl(req.headers['cache-control']);

        // Assume that if someone uses legacy, non-standard uncecessary options they don't understand caching,
        // so there's no point stricly adhering to the blindly copy&pasted directives.
        if (
            ignoreCargoCult &&
            'pre-check' in this._rescc &&
            'post-check' in this._rescc
        ) {
            delete this._rescc['pre-check'];
            delete this._rescc['post-check'];
            delete this._rescc['no-cache'];
            delete this._rescc['no-store'];
            delete this._rescc['must-revalidate'];
            this._resHeaders = Object.assign({}, this._resHeaders, {
                'cache-control': formatCacheControl(this._rescc),
            });
            delete this._resHeaders.expires;
            delete this._resHeaders.pragma;
        }

        // When the Cache-Control header field is not present in a request, caches MUST consider the no-cache request pragma-directive
        // as having the same effect as if "Cache-Control: no-cache" were present (see Section 5.2.1).
        if (
            res.headers['cache-control'] == null &&
            /no-cache/.test(res.headers.pragma)
        ) {
            this._rescc['no-cache'] = true;
        }
    }

    now() {
        return Date.now();
    }

    storable() {
        // The "no-store" request directive indicates that a cache MUST NOT store any part of either this request or any response to it.
        return !!(
            !this._reqcc['no-store'] &&
            // A cache MUST NOT store a response to any request, unless:
            // The request method is understood by the cache and defined as being cacheable, and
            ('GET' === this._method ||
                'HEAD' === this._method ||
                ('POST' === this._method && this._hasExplicitExpiration())) &&
            // the response status code is understood by the cache, and
            understoodStatuses.has(this._status) &&
            // the "no-store" cache directive does not appear in request or response header fields, and
            !this._rescc['no-store'] &&
            // the "private" response directive does not appear in the response, if the cache is shared, and
            (!this._isShared || !this._rescc.private) &&
            // the Authorization header field does not appear in the request, if the cache is shared,
            (!this._isShared ||
                this._noAuthorization ||
                this._allowsStoringAuthenticated()) &&
            // the response either:
            // contains an Expires header field, or
            (this._resHeaders.expires ||
                // contains a max-age response directive, or
                // contains a s-maxage response directive and the cache is shared, or
                // contains a public response directive.
                this._rescc['max-age'] ||
                (this._isShared && this._rescc['s-maxage']) ||
                this._rescc.public ||
                // has a status code that is defined as cacheable by default
                statusCodeCacheableByDefault.has(this._status))
        );
    }

    _hasExplicitExpiration() {
        // 4.2.1 Calculating Freshness Lifetime
        return (
            (this._isShared && this._rescc['s-maxage']) ||
            this._rescc['max-age'] ||
            this._resHeaders.expires
        );
    }

    _assertRequestHasHeaders(req) {
        if (!req || !req.headers) {
            throw Error('Request headers missing');
        }
    }

    satisfiesWithoutRevalidation(req) {
        this._assertRequestHasHeaders(req);

        // When presented with a request, a cache MUST NOT reuse a stored response, unless:
        // the presented request does not contain the no-cache pragma (Section 5.4), nor the no-cache cache directive,
        // unless the stored response is successfully validated (Section 4.3), and
        const requestCC = parseCacheControl(req.headers['cache-control']);
        if (requestCC['no-cache'] || /no-cache/.test(req.headers.pragma)) {
            return false;
        }

        if (requestCC['max-age'] && this.age() > requestCC['max-age']) {
            return false;
        }

        if (
            requestCC['min-fresh'] &&
            this.timeToLive() < 1000 * requestCC['min-fresh']
        ) {
            return false;
        }

        // the stored response is either:
        // fresh, or allowed to be served stale
        if (this.stale()) {
            const allowsStale =
                requestCC['max-stale'] &&
                !this._rescc['must-revalidate'] &&
                (true === requestCC['max-stale'] ||
                    requestCC['max-stale'] > this.age() - this.maxAge());
            if (!allowsStale) {
                return false;
            }
        }

        return this._requestMatches(req, false);
    }

    _requestMatches(req, allowHeadMethod) {
        // The presented effective request URI and that of the stored response match, and
        return (
            (!this._url || this._url === req.url) &&
            this._host === req.headers.host &&
            // the request method associated with the stored response allows it to be used for the presented request, and
            (!req.method ||
                this._method === req.method ||
                (allowHeadMethod && 'HEAD' === req.method)) &&
            // selecting header fields nominated by the stored response (if any) match those presented, and
            this._varyMatches(req)
        );
    }

    _allowsStoringAuthenticated() {
        //  following Cache-Control response directives (Section 5.2.2) have such an effect: must-revalidate, public, and s-maxage.
        return (
            this._rescc['must-revalidate'] ||
            this._rescc.public ||
            this._rescc['s-maxage']
        );
    }

    _varyMatches(req) {
        if (!this._resHeaders.vary) {
            return true;
        }

        // A Vary header field-value of "*" always fails to match
        if (this._resHeaders.vary === '*') {
            return false;
        }

        const fields = this._resHeaders.vary
            .trim()
            .toLowerCase()
            .split(/\s*,\s*/);
        for (const name of fields) {
            if (req.headers[name] !== this._reqHeaders[name]) return false;
        }
        return true;
    }

    _copyWithoutHopByHopHeaders(inHeaders) {
        const headers = {};
        for (const name in inHeaders) {
            if (hopByHopHeaders[name]) continue;
            headers[name] = inHeaders[name];
        }
        // 9.1.  Connection
        if (inHeaders.connection) {
            const tokens = inHeaders.connection.trim().split(/\s*,\s*/);
            for (const name of tokens) {
                delete headers[name];
            }
        }
        if (headers.warning) {
            const warnings = headers.warning.split(/,/).filter(warning => {
                return !/^\s*1[0-9][0-9]/.test(warning);
            });
            if (!warnings.length) {
                delete headers.warning;
            } else {
                headers.warning = warnings.join(',').trim();
            }
        }
        return headers;
    }

    responseHeaders() {
        const headers = this._copyWithoutHopByHopHeaders(this._resHeaders);
        const age = this.age();

        // A cache SHOULD generate 113 warning if it heuristically chose a freshness
        // lifetime greater than 24 hours and the response's age is greater than 24 hours.
        if (
            age > 3600 * 24 &&
            !this._hasExplicitExpiration() &&
            this.maxAge() > 3600 * 24
        ) {
            headers.warning =
                (headers.warning ? `${headers.warning}, ` : '') +
                '113 - "rfc7234 5.5.4"';
        }
        headers.age = `${Math.round(age)}`;
        headers.date = new Date(this.now()).toUTCString();
        return headers;
    }

    /**
     * Value of the Date response header or current time if Date was invalid
     * @return timestamp
     */
    date() {
        const serverDate = Date.parse(this._resHeaders.date);
        if (isFinite(serverDate)) {
            return serverDate;
        }
        return this._responseTime;
    }

    /**
     * Value of the Age header, in seconds, updated for the current time.
     * May be fractional.
     *
     * @return Number
     */
    age() {
        let age = this._ageValue();

        const residentTime = (this.now() - this._responseTime) / 1000;
        return age + residentTime;
    }

    _ageValue() {
        return toNumberOrZero(this._resHeaders.age);
    }

    /**
     * Value of applicable max-age (or heuristic equivalent) in seconds. This counts since response's `Date`.
     *
     * For an up-to-date value, see `timeToLive()`.
     *
     * @return Number
     */
    maxAge() {
        if (!this.storable() || this._rescc['no-cache']) {
            return 0;
        }

        // Shared responses with cookies are cacheable according to the RFC, but IMHO it'd be unwise to do so by default
        // so this implementation requires explicit opt-in via public header
        if (
            this._isShared &&
            (this._resHeaders['set-cookie'] &&
                !this._rescc.public &&
                !this._rescc.immutable)
        ) {
            return 0;
        }

        if (this._resHeaders.vary === '*') {
            return 0;
        }

        if (this._isShared) {
            if (this._rescc['proxy-revalidate']) {
                return 0;
            }
            // if a response includes the s-maxage directive, a shared cache recipient MUST ignore the Expires field.
            if (this._rescc['s-maxage']) {
                return toNumberOrZero(this._rescc['s-maxage']);
            }
        }

        // If a response includes a Cache-Control field with the max-age directive, a recipient MUST ignore the Expires field.
        if (this._rescc['max-age']) {
            return toNumberOrZero(this._rescc['max-age']);
        }

        const defaultMinTtl = this._rescc.immutable ? this._immutableMinTtl : 0;

        const serverDate = this.date();
        if (this._resHeaders.expires) {
            const expires = Date.parse(this._resHeaders.expires);
            // A cache recipient MUST interpret invalid date formats, especially the value "0", as representing a time in the past (i.e., "already expired").
            if (Number.isNaN(expires) || expires < serverDate) {
                return 0;
            }
            return Math.max(defaultMinTtl, (expires - serverDate) / 1000);
        }

        if (this._resHeaders['last-modified']) {
            const lastModified = Date.parse(this._resHeaders['last-modified']);
            if (isFinite(lastModified) && serverDate > lastModified) {
                return Math.max(
                    defaultMinTtl,
                    ((serverDate - lastModified) / 1000) * this._cacheHeuristic
                );
            }
        }

        return defaultMinTtl;
    }

    timeToLive() {
        const age = this.maxAge() - this.age();
        const staleIfErrorAge = age + toNumberOrZero(this._rescc['stale-if-error']);
        const staleWhileRevalidateAge = age + toNumberOrZero(this._rescc['stale-while-revalidate']);
        return Math.max(0, age, staleIfErrorAge, staleWhileRevalidateAge) * 1000;
    }

    stale() {
        return this.maxAge() <= this.age();
    }

    _useStaleIfError() {
        return this.maxAge() + toNumberOrZero(this._rescc['stale-if-error']) > this.age();
    }

    useStaleWhileRevalidate() {
        return this.maxAge() + toNumberOrZero(this._rescc['stale-while-revalidate']) > this.age();
    }

    static fromObject(obj) {
        return new this(undefined, undefined, { _fromObject: obj });
    }

    _fromObject(obj) {
        if (this._responseTime) throw Error('Reinitialized');
        if (!obj || obj.v !== 1) throw Error('Invalid serialization');

        this._responseTime = obj.t;
        this._isShared = obj.sh;
        this._cacheHeuristic = obj.ch;
        this._immutableMinTtl =
            obj.imm !== undefined ? obj.imm : 24 * 3600 * 1000;
        this._status = obj.st;
        this._resHeaders = obj.resh;
        this._rescc = obj.rescc;
        this._method = obj.m;
        this._url = obj.u;
        this._host = obj.h;
        this._noAuthorization = obj.a;
        this._reqHeaders = obj.reqh;
        this._reqcc = obj.reqcc;
    }

    toObject() {
        return {
            v: 1,
            t: this._responseTime,
            sh: this._isShared,
            ch: this._cacheHeuristic,
            imm: this._immutableMinTtl,
            st: this._status,
            resh: this._resHeaders,
            rescc: this._rescc,
            m: this._method,
            u: this._url,
            h: this._host,
            a: this._noAuthorization,
            reqh: this._reqHeaders,
            reqcc: this._reqcc,
        };
    }

    /**
     * Headers for sending to the origin server to revalidate stale response.
     * Allows server to return 304 to allow reuse of the previous response.
     *
     * Hop by hop headers are always stripped.
     * Revalidation headers may be added or removed, depending on request.
     */
    revalidationHeaders(incomingReq) {
        this._assertRequestHasHeaders(incomingReq);
        const headers = this._copyWithoutHopByHopHeaders(incomingReq.headers);

        // This implementation does not understand range requests
        delete headers['if-range'];

        if (!this._requestMatches(incomingReq, true) || !this.storable()) {
            // revalidation allowed via HEAD
            // not for the same resource, or wasn't allowed to be cached anyway
            delete headers['if-none-match'];
            delete headers['if-modified-since'];
            return headers;
        }

        /* MUST send that entity-tag in any cache validation request (using If-Match or If-None-Match) if an entity-tag has been provided by the origin server. */
        if (this._resHeaders.etag) {
            headers['if-none-match'] = headers['if-none-match']
                ? `${headers['if-none-match']}, ${this._resHeaders.etag}`
                : this._resHeaders.etag;
        }

        // Clients MAY issue simple (non-subrange) GET requests with either weak validators or strong validators. Clients MUST NOT use weak validators in other forms of request.
        const forbidsWeakValidators =
            headers['accept-ranges'] ||
            headers['if-match'] ||
            headers['if-unmodified-since'] ||
            (this._method && this._method != 'GET');

        /* SHOULD send the Last-Modified value in non-subrange cache validation requests (using If-Modified-Since) if only a Last-Modified value has been provided by the origin server.
        Note: This implementation does not understand partial responses (206) */
        if (forbidsWeakValidators) {
            delete headers['if-modified-since'];

            if (headers['if-none-match']) {
                const etags = headers['if-none-match']
                    .split(/,/)
                    .filter(etag => {
                        return !/^\s*W\//.test(etag);
                    });
                if (!etags.length) {
                    delete headers['if-none-match'];
                } else {
                    headers['if-none-match'] = etags.join(',').trim();
                }
            }
        } else if (
            this._resHeaders['last-modified'] &&
            !headers['if-modified-since']
        ) {
            headers['if-modified-since'] = this._resHeaders['last-modified'];
        }

        return headers;
    }

    /**
     * Creates new CachePolicy with information combined from the previews response,
     * and the new revalidation response.
     *
     * Returns {policy, modified} where modified is a boolean indicating
     * whether the response body has been modified, and old cached body can't be used.
     *
     * @return {Object} {policy: CachePolicy, modified: Boolean}
     */
    revalidatedPolicy(request, response) {
        this._assertRequestHasHeaders(request);
        if(this._useStaleIfError() && isErrorResponse(response)) {  // I consider the revalidation request unsuccessful
          return {
            modified: false,
            matches: false,
            policy: this,
          };
        }
        if (!response || !response.headers) {
            throw Error('Response headers missing');
        }

        // These aren't going to be supported exactly, since one CachePolicy object
        // doesn't know about all the other cached objects.
        let matches = false;
        if (response.status !== undefined && response.status != 304) {
            matches = false;
        } else if (
            response.headers.etag &&
            !/^\s*W\//.test(response.headers.etag)
        ) {
            // "All of the stored responses with the same strong validator are selected.
            // If none of the stored responses contain the same strong validator,
            // then the cache MUST NOT use the new response to update any stored responses."
            matches =
                this._resHeaders.etag &&
                this._resHeaders.etag.replace(/^\s*W\//, '') ===
                    response.headers.etag;
        } else if (this._resHeaders.etag && response.headers.etag) {
            // "If the new response contains a weak validator and that validator corresponds
            // to one of the cache's stored responses,
            // then the most recent of those matching stored responses is selected for update."
            matches =
                this._resHeaders.etag.replace(/^\s*W\//, '') ===
                response.headers.etag.replace(/^\s*W\//, '');
        } else if (this._resHeaders['last-modified']) {
            matches =
                this._resHeaders['last-modified'] ===
                response.headers['last-modified'];
        } else {
            // If the new response does not include any form of validator (such as in the case where
            // a client generates an If-Modified-Since request from a source other than the Last-Modified
            // response header field), and there is only one stored response, and that stored response also
            // lacks a validator, then that stored response is selected for update.
            if (
                !this._resHeaders.etag &&
                !this._resHeaders['last-modified'] &&
                !response.headers.etag &&
                !response.headers['last-modified']
            ) {
                matches = true;
            }
        }

        if (!matches) {
            return {
                policy: new this.constructor(request, response),
                // Client receiving 304 without body, even if it's invalid/mismatched has no option
                // but to reuse a cached body. We don't have a good way to tell clients to do
                // error recovery in such case.
                modified: response.status != 304,
                matches: false,
            };
        }

        // use other header fields provided in the 304 (Not Modified) response to replace all instances
        // of the corresponding header fields in the stored response.
        const headers = {};
        for (const k in this._resHeaders) {
            headers[k] =
                k in response.headers && !excludedFromRevalidationUpdate[k]
                    ? response.headers[k]
                    : this._resHeaders[k];
        }

        const newResponse = Object.assign({}, response, {
            status: this._status,
            method: this._method,
            headers,
        });
        return {
            policy: new this.constructor(request, newResponse, {
                shared: this._isShared,
                cacheHeuristic: this._cacheHeuristic,
                immutableMinTimeToLive: this._immutableMinTtl,
            }),
            modified: false,
            matches: true,
        };
    }
};


/***/ }),

/***/ 5277:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

// See https://github.com/facebook/jest/issues/2549
// eslint-disable-next-line node/prefer-global/url
const {URL} = __webpack_require__(7310);
const EventEmitter = __webpack_require__(2361);
const tls = __webpack_require__(4404);
const http2 = __webpack_require__(5158);
const QuickLRU = __webpack_require__(1629);
const delayAsyncDestroy = __webpack_require__(7354);

const kCurrentStreamCount = Symbol('currentStreamCount');
const kRequest = Symbol('request');
const kOriginSet = Symbol('cachedOriginSet');
const kGracefullyClosing = Symbol('gracefullyClosing');
const kLength = Symbol('length');

const nameKeys = [
	// Not an Agent option actually
	'createConnection',

	// `http2.connect()` options
	'maxDeflateDynamicTableSize',
	'maxSettings',
	'maxSessionMemory',
	'maxHeaderListPairs',
	'maxOutstandingPings',
	'maxReservedRemoteStreams',
	'maxSendHeaderBlockLength',
	'paddingStrategy',
	'peerMaxConcurrentStreams',
	'settings',

	// `tls.connect()` source options
	'family',
	'localAddress',
	'rejectUnauthorized',

	// `tls.connect()` secure context options
	'pskCallback',
	'minDHSize',

	// `tls.connect()` destination options
	// - `servername` is automatically validated, skip it
	// - `host` and `port` just describe the destination server,
	'path',
	'socket',

	// `tls.createSecureContext()` options
	'ca',
	'cert',
	'sigalgs',
	'ciphers',
	'clientCertEngine',
	'crl',
	'dhparam',
	'ecdhCurve',
	'honorCipherOrder',
	'key',
	'privateKeyEngine',
	'privateKeyIdentifier',
	'maxVersion',
	'minVersion',
	'pfx',
	'secureOptions',
	'secureProtocol',
	'sessionIdContext',
	'ticketKeys'
];

const getSortedIndex = (array, value, compare) => {
	let low = 0;
	let high = array.length;

	while (low < high) {
		const mid = (low + high) >>> 1;

		if (compare(array[mid], value)) {
			low = mid + 1;
		} else {
			high = mid;
		}
	}

	return low;
};

const compareSessions = (a, b) => a.remoteSettings.maxConcurrentStreams > b.remoteSettings.maxConcurrentStreams;

// See https://tools.ietf.org/html/rfc8336
const closeCoveredSessions = (where, session) => {
	// Clients SHOULD NOT emit new requests on any connection whose Origin
	// Set is a proper subset of another connection's Origin Set, and they
	// SHOULD close it once all outstanding requests are satisfied.
	for (let index = 0; index < where.length; index++) {
		const coveredSession = where[index];

		if (
			// Unfortunately `.every()` returns true for an empty array
			coveredSession[kOriginSet].length > 0

			// The set is a proper subset when its length is less than the other set.
			&& coveredSession[kOriginSet].length < session[kOriginSet].length

			// And the other set includes all elements of the subset.
			&& coveredSession[kOriginSet].every(origin => session[kOriginSet].includes(origin))

			// Makes sure that the session can handle all requests from the covered session.
			&& (coveredSession[kCurrentStreamCount] + session[kCurrentStreamCount]) <= session.remoteSettings.maxConcurrentStreams
		) {
			// This allows pending requests to finish and prevents making new requests.
			gracefullyClose(coveredSession);
		}
	}
};

// This is basically inverted `closeCoveredSessions(...)`.
const closeSessionIfCovered = (where, coveredSession) => {
	for (let index = 0; index < where.length; index++) {
		const session = where[index];

		if (
			coveredSession[kOriginSet].length > 0
			&& coveredSession[kOriginSet].length < session[kOriginSet].length
			&& coveredSession[kOriginSet].every(origin => session[kOriginSet].includes(origin))
			&& (coveredSession[kCurrentStreamCount] + session[kCurrentStreamCount]) <= session.remoteSettings.maxConcurrentStreams
		) {
			gracefullyClose(coveredSession);

			return true;
		}
	}

	return false;
};

const gracefullyClose = session => {
	session[kGracefullyClosing] = true;

	if (session[kCurrentStreamCount] === 0) {
		session.close();
	}
};

class Agent extends EventEmitter {
	constructor({timeout = 0, maxSessions = Number.POSITIVE_INFINITY, maxEmptySessions = 10, maxCachedTlsSessions = 100} = {}) {
		super();

		// SESSIONS[NORMALIZED_OPTIONS] = [];
		this.sessions = {};

		// The queue for creating new sessions. It looks like this:
		// QUEUE[NORMALIZED_OPTIONS][NORMALIZED_ORIGIN] = ENTRY_FUNCTION
		//
		// It's faster when there are many origins. If there's only one, then QUEUE[`${options}:${origin}`] is faster.
		// I guess object creation / deletion is causing the slowdown.
		//
		// The entry function has `listeners`, `completed` and `destroyed` properties.
		// `listeners` is an array of objects containing `resolve` and `reject` functions.
		// `completed` is a boolean. It's set to true after ENTRY_FUNCTION is executed.
		// `destroyed` is a boolean. If it's set to true, the session will be destroyed if hasn't connected yet.
		this.queue = {};

		// Each session will use this timeout value.
		this.timeout = timeout;

		// Max sessions in total
		this.maxSessions = maxSessions;

		// Max empty sessions in total
		this.maxEmptySessions = maxEmptySessions;

		this._emptySessionCount = 0;
		this._sessionCount = 0;

		// We don't support push streams by default.
		this.settings = {
			enablePush: false,
			initialWindowSize: 1024 * 1024 * 32 // 32MB, see https://github.com/nodejs/node/issues/38426
		};

		// Reusing TLS sessions increases performance.
		this.tlsSessionCache = new QuickLRU({maxSize: maxCachedTlsSessions});
	}

	get protocol() {
		return 'https:';
	}

	normalizeOptions(options) {
		let normalized = '';

		for (let index = 0; index < nameKeys.length; index++) {
			const key = nameKeys[index];

			normalized += ':';

			if (options && options[key] !== undefined) {
				normalized += options[key];
			}
		}

		return normalized;
	}

	_processQueue() {
		if (this._sessionCount >= this.maxSessions) {
			this.closeEmptySessions(this.maxSessions - this._sessionCount + 1);
			return;
		}

		// eslint-disable-next-line guard-for-in
		for (const normalizedOptions in this.queue) {
			// eslint-disable-next-line guard-for-in
			for (const normalizedOrigin in this.queue[normalizedOptions]) {
				const item = this.queue[normalizedOptions][normalizedOrigin];

				// The entry function can be run only once.
				if (!item.completed) {
					item.completed = true;

					item();
				}
			}
		}
	}

	_isBetterSession(thisStreamCount, thatStreamCount) {
		return thisStreamCount > thatStreamCount;
	}

	_accept(session, listeners, normalizedOrigin, options) {
		let index = 0;

		while (index < listeners.length && session[kCurrentStreamCount] < session.remoteSettings.maxConcurrentStreams) {
			// We assume `resolve(...)` calls `request(...)` *directly*,
			// otherwise the session will get overloaded.
			listeners[index].resolve(session);

			index++;
		}

		listeners.splice(0, index);

		if (listeners.length > 0) {
			this.getSession(normalizedOrigin, options, listeners);
			listeners.length = 0;
		}
	}

	getSession(origin, options, listeners) {
		return new Promise((resolve, reject) => {
			if (Array.isArray(listeners) && listeners.length > 0) {
				listeners = [...listeners];

				// Resolve the current promise ASAP, we're just moving the listeners.
				// They will be executed at a different time.
				resolve();
			} else {
				listeners = [{resolve, reject}];
			}

			try {
				// Parse origin
				if (typeof origin === 'string') {
					origin = new URL(origin);
				} else if (!(origin instanceof URL)) {
					throw new TypeError('The `origin` argument needs to be a string or an URL object');
				}

				if (options) {
					// Validate servername
					const {servername} = options;
					const {hostname} = origin;
					if (servername && hostname !== servername) {
						throw new Error(`Origin ${hostname} differs from servername ${servername}`);
					}
				}
			} catch (error) {
				for (let index = 0; index < listeners.length; index++) {
					listeners[index].reject(error);
				}

				return;
			}

			const normalizedOptions = this.normalizeOptions(options);
			const normalizedOrigin = origin.origin;

			if (normalizedOptions in this.sessions) {
				const sessions = this.sessions[normalizedOptions];

				let maxConcurrentStreams = -1;
				let currentStreamsCount = -1;
				let optimalSession;

				// We could just do this.sessions[normalizedOptions].find(...) but that isn't optimal.
				// Additionally, we are looking for session which has biggest current pending streams count.
				//
				// |------------| |------------| |------------| |------------|
				// | Session: A | | Session: B | | Session: C | | Session: D |
				// | Pending: 5 |-| Pending: 8 |-| Pending: 9 |-| Pending: 4 |
				// | Max:    10 | | Max:    10 | | Max:     9 | | Max:     5 |
				// |------------| |------------| |------------| |------------|
				//                     ^
				//                     |
				//     pick this one  --
				//
				for (let index = 0; index < sessions.length; index++) {
					const session = sessions[index];

					const sessionMaxConcurrentStreams = session.remoteSettings.maxConcurrentStreams;

					if (sessionMaxConcurrentStreams < maxConcurrentStreams) {
						break;
					}

					if (!session[kOriginSet].includes(normalizedOrigin)) {
						continue;
					}

					const sessionCurrentStreamsCount = session[kCurrentStreamCount];

					if (
						sessionCurrentStreamsCount >= sessionMaxConcurrentStreams
						|| session[kGracefullyClosing]
						// Unfortunately the `close` event isn't called immediately,
						// so `session.destroyed` is `true`, but `session.closed` is `false`.
						|| session.destroyed
					) {
						continue;
					}

					// We only need set this once.
					if (!optimalSession) {
						maxConcurrentStreams = sessionMaxConcurrentStreams;
					}

					// Either get the session which has biggest current stream count or the lowest.
					if (this._isBetterSession(sessionCurrentStreamsCount, currentStreamsCount)) {
						optimalSession = session;
						currentStreamsCount = sessionCurrentStreamsCount;
					}
				}

				if (optimalSession) {
					this._accept(optimalSession, listeners, normalizedOrigin, options);
					return;
				}
			}

			if (normalizedOptions in this.queue) {
				if (normalizedOrigin in this.queue[normalizedOptions]) {
					// There's already an item in the queue, just attach ourselves to it.
					this.queue[normalizedOptions][normalizedOrigin].listeners.push(...listeners);
					return;
				}
			} else {
				this.queue[normalizedOptions] = {
					[kLength]: 0
				};
			}

			// The entry must be removed from the queue IMMEDIATELY when:
			// 1. the session connects successfully,
			// 2. an error occurs.
			const removeFromQueue = () => {
				// Our entry can be replaced. We cannot remove the new one.
				if (normalizedOptions in this.queue && this.queue[normalizedOptions][normalizedOrigin] === entry) {
					delete this.queue[normalizedOptions][normalizedOrigin];

					if (--this.queue[normalizedOptions][kLength] === 0) {
						delete this.queue[normalizedOptions];
					}
				}
			};

			// The main logic is here
			const entry = async () => {
				this._sessionCount++;

				const name = `${normalizedOrigin}:${normalizedOptions}`;
				let receivedSettings = false;
				let socket;

				try {
					const computedOptions = {...options};

					if (computedOptions.settings === undefined) {
						computedOptions.settings = this.settings;
					}

					if (computedOptions.session === undefined) {
						computedOptions.session = this.tlsSessionCache.get(name);
					}

					const createConnection = computedOptions.createConnection || this.createConnection;

					// A hacky workaround to enable async `createConnection`
					socket = await createConnection.call(this, origin, computedOptions);
					computedOptions.createConnection = () => socket;

					const session = http2.connect(origin, computedOptions);
					session[kCurrentStreamCount] = 0;
					session[kGracefullyClosing] = false;

					// Node.js return https://false:443 instead of https://1.1.1.1:443
					const getOriginSet = () => {
						const {socket} = session;

						let originSet;
						if (socket.servername === false) {
							socket.servername = socket.remoteAddress;
							originSet = session.originSet;
							socket.servername = false;
						} else {
							originSet = session.originSet;
						}

						return originSet;
					};

					const isFree = () => session[kCurrentStreamCount] < session.remoteSettings.maxConcurrentStreams;

					session.socket.once('session', tlsSession => {
						this.tlsSessionCache.set(name, tlsSession);
					});

					session.once('error', error => {
						// Listeners are empty when the session successfully connected.
						for (let index = 0; index < listeners.length; index++) {
							listeners[index].reject(error);
						}

						// The connection got broken, purge the cache.
						this.tlsSessionCache.delete(name);
					});

					session.setTimeout(this.timeout, () => {
						// Terminates all streams owned by this session.
						session.destroy();
					});

					session.once('close', () => {
						this._sessionCount--;

						if (receivedSettings) {
							// Assumes session `close` is emitted after request `close`
							this._emptySessionCount--;

							// This cannot be moved to the stream logic,
							// because there may be a session that hadn't made a single request.
							const where = this.sessions[normalizedOptions];

							if (where.length === 1) {
								delete this.sessions[normalizedOptions];
							} else {
								where.splice(where.indexOf(session), 1);
							}
						} else {
							// Broken connection
							removeFromQueue();

							const error = new Error('Session closed without receiving a SETTINGS frame');
							error.code = 'HTTP2WRAPPER_NOSETTINGS';

							for (let index = 0; index < listeners.length; index++) {
								listeners[index].reject(error);
							}
						}

						// There may be another session awaiting.
						this._processQueue();
					});

					// Iterates over the queue and processes listeners.
					const processListeners = () => {
						const queue = this.queue[normalizedOptions];
						if (!queue) {
							return;
						}

						const originSet = session[kOriginSet];

						for (let index = 0; index < originSet.length; index++) {
							const origin = originSet[index];

							if (origin in queue) {
								const {listeners, completed} = queue[origin];

								let index = 0;

								// Prevents session overloading.
								while (index < listeners.length && isFree()) {
									// We assume `resolve(...)` calls `request(...)` *directly*,
									// otherwise the session will get overloaded.
									listeners[index].resolve(session);

									index++;
								}

								queue[origin].listeners.splice(0, index);

								if (queue[origin].listeners.length === 0 && !completed) {
									delete queue[origin];

									if (--queue[kLength] === 0) {
										delete this.queue[normalizedOptions];
										break;
									}
								}

								// We're no longer free, no point in continuing.
								if (!isFree()) {
									break;
								}
							}
						}
					};

					// The Origin Set cannot shrink. No need to check if it suddenly became covered by another one.
					session.on('origin', () => {
						session[kOriginSet] = getOriginSet() || [];
						session[kGracefullyClosing] = false;
						closeSessionIfCovered(this.sessions[normalizedOptions], session);

						if (session[kGracefullyClosing] || !isFree()) {
							return;
						}

						processListeners();

						if (!isFree()) {
							return;
						}

						// Close covered sessions (if possible).
						closeCoveredSessions(this.sessions[normalizedOptions], session);
					});

					session.once('remoteSettings', () => {
						// The Agent could have been destroyed already.
						if (entry.destroyed) {
							const error = new Error('Agent has been destroyed');

							for (let index = 0; index < listeners.length; index++) {
								listeners[index].reject(error);
							}

							session.destroy();
							return;
						}

						// See https://github.com/nodejs/node/issues/38426
						if (session.setLocalWindowSize) {
							session.setLocalWindowSize(1024 * 1024 * 4); // 4 MB
						}

						session[kOriginSet] = getOriginSet() || [];

						if (session.socket.encrypted) {
							const mainOrigin = session[kOriginSet][0];
							if (mainOrigin !== normalizedOrigin) {
								const error = new Error(`Requested origin ${normalizedOrigin} does not match server ${mainOrigin}`);

								for (let index = 0; index < listeners.length; index++) {
									listeners[index].reject(error);
								}

								session.destroy();
								return;
							}
						}

						removeFromQueue();

						{
							const where = this.sessions;

							if (normalizedOptions in where) {
								const sessions = where[normalizedOptions];
								sessions.splice(getSortedIndex(sessions, session, compareSessions), 0, session);
							} else {
								where[normalizedOptions] = [session];
							}
						}

						receivedSettings = true;
						this._emptySessionCount++;

						this.emit('session', session);
						this._accept(session, listeners, normalizedOrigin, options);

						if (session[kCurrentStreamCount] === 0 && this._emptySessionCount > this.maxEmptySessions) {
							this.closeEmptySessions(this._emptySessionCount - this.maxEmptySessions);
						}

						// `session.remoteSettings.maxConcurrentStreams` might get increased
						session.on('remoteSettings', () => {
							if (!isFree()) {
								return;
							}

							processListeners();

							if (!isFree()) {
								return;
							}

							// In case the Origin Set changes
							closeCoveredSessions(this.sessions[normalizedOptions], session);
						});
					});

					// Shim `session.request()` in order to catch all streams
					session[kRequest] = session.request;
					session.request = (headers, streamOptions) => {
						if (session[kGracefullyClosing]) {
							throw new Error('The session is gracefully closing. No new streams are allowed.');
						}

						const stream = session[kRequest](headers, streamOptions);

						// The process won't exit until the session is closed or all requests are gone.
						session.ref();

						if (session[kCurrentStreamCount]++ === 0) {
							this._emptySessionCount--;
						}

						stream.once('close', () => {
							if (--session[kCurrentStreamCount] === 0) {
								this._emptySessionCount++;
								session.unref();

								if (this._emptySessionCount > this.maxEmptySessions || session[kGracefullyClosing]) {
									session.close();
									return;
								}
							}

							if (session.destroyed || session.closed) {
								return;
							}

							if (isFree() && !closeSessionIfCovered(this.sessions[normalizedOptions], session)) {
								closeCoveredSessions(this.sessions[normalizedOptions], session);
								processListeners();

								if (session[kCurrentStreamCount] === 0) {
									this._processQueue();
								}
							}
						});

						return stream;
					};
				} catch (error) {
					removeFromQueue();
					this._sessionCount--;

					for (let index = 0; index < listeners.length; index++) {
						listeners[index].reject(error);
					}
				}
			};

			entry.listeners = listeners;
			entry.completed = false;
			entry.destroyed = false;

			this.queue[normalizedOptions][normalizedOrigin] = entry;
			this.queue[normalizedOptions][kLength]++;
			this._processQueue();
		});
	}

	request(origin, options, headers, streamOptions) {
		return new Promise((resolve, reject) => {
			this.getSession(origin, options, [{
				reject,
				resolve: session => {
					try {
						const stream = session.request(headers, streamOptions);

						// Do not throw before `request(...)` has been awaited
						delayAsyncDestroy(stream);

						resolve(stream);
					} catch (error) {
						reject(error);
					}
				}
			}]);
		});
	}

	async createConnection(origin, options) {
		return Agent.connect(origin, options);
	}

	static connect(origin, options) {
		options.ALPNProtocols = ['h2'];

		const port = origin.port || 443;
		const host = origin.hostname;

		if (typeof options.servername === 'undefined') {
			options.servername = host;
		}

		const socket = tls.connect(port, host, options);

		if (options.socket) {
			socket._peername = {
				family: undefined,
				address: undefined,
				port
			};
		}

		return socket;
	}

	closeEmptySessions(maxCount = Number.POSITIVE_INFINITY) {
		let closedCount = 0;

		const {sessions} = this;

		// eslint-disable-next-line guard-for-in
		for (const key in sessions) {
			const thisSessions = sessions[key];

			for (let index = 0; index < thisSessions.length; index++) {
				const session = thisSessions[index];

				if (session[kCurrentStreamCount] === 0) {
					closedCount++;
					session.close();

					if (closedCount >= maxCount) {
						return closedCount;
					}
				}
			}
		}

		return closedCount;
	}

	destroy(reason) {
		const {sessions, queue} = this;

		// eslint-disable-next-line guard-for-in
		for (const key in sessions) {
			const thisSessions = sessions[key];

			for (let index = 0; index < thisSessions.length; index++) {
				thisSessions[index].destroy(reason);
			}
		}

		// eslint-disable-next-line guard-for-in
		for (const normalizedOptions in queue) {
			const entries = queue[normalizedOptions];

			// eslint-disable-next-line guard-for-in
			for (const normalizedOrigin in entries) {
				entries[normalizedOrigin].destroyed = true;
			}
		}

		// New requests should NOT attach to destroyed sessions
		this.queue = {};
		this.tlsSessionCache.clear();
	}

	get emptySessionCount() {
		return this._emptySessionCount;
	}

	get pendingSessionCount() {
		return this._sessionCount - this._emptySessionCount;
	}

	get sessionCount() {
		return this._sessionCount;
	}
}

Agent.kCurrentStreamCount = kCurrentStreamCount;
Agent.kGracefullyClosing = kGracefullyClosing;

module.exports = {
	Agent,
	globalAgent: new Agent()
};


/***/ }),

/***/ 3714:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

// See https://github.com/facebook/jest/issues/2549
// eslint-disable-next-line node/prefer-global/url
const {URL, urlToHttpOptions} = __webpack_require__(7310);
const http = __webpack_require__(3685);
const https = __webpack_require__(5687);
const resolveALPN = __webpack_require__(3711);
const QuickLRU = __webpack_require__(1629);
const {Agent, globalAgent} = __webpack_require__(5277);
const Http2ClientRequest = __webpack_require__(9762);
const calculateServerName = __webpack_require__(8849);
const delayAsyncDestroy = __webpack_require__(7354);

const cache = new QuickLRU({maxSize: 100});
const queue = new Map();

const installSocket = (agent, socket, options) => {
	socket._httpMessage = {shouldKeepAlive: true};

	const onFree = () => {
		agent.emit('free', socket, options);
	};

	socket.on('free', onFree);

	const onClose = () => {
		agent.removeSocket(socket, options);
	};

	socket.on('close', onClose);

	const onTimeout = () => {
		const {freeSockets} = agent;

		for (const sockets of Object.values(freeSockets)) {
			if (sockets.includes(socket)) {
				socket.destroy();
				return;
			}
		}
	};

	socket.on('timeout', onTimeout);

	const onRemove = () => {
		agent.removeSocket(socket, options);
		socket.off('close', onClose);
		socket.off('free', onFree);
		socket.off('timeout', onTimeout);
		socket.off('agentRemove', onRemove);
	};

	socket.on('agentRemove', onRemove);

	agent.emit('free', socket, options);
};

const createResolveProtocol = (cache, queue = new Map(), connect = undefined) => {
	return async options => {
		const name = `${options.host}:${options.port}:${options.ALPNProtocols.sort()}`;

		if (!cache.has(name)) {
			if (queue.has(name)) {
				const result = await queue.get(name);
				return {alpnProtocol: result.alpnProtocol};
			}

			const {path} = options;
			options.path = options.socketPath;

			const resultPromise = resolveALPN(options, connect);
			queue.set(name, resultPromise);

			try {
				const result = await resultPromise;

				cache.set(name, result.alpnProtocol);
				queue.delete(name);

				options.path = path;

				return result;
			} catch (error) {
				queue.delete(name);

				options.path = path;

				throw error;
			}
		}

		return {alpnProtocol: cache.get(name)};
	};
};

const defaultResolveProtocol = createResolveProtocol(cache, queue);

module.exports = async (input, options, callback) => {
	if (typeof input === 'string') {
		input = urlToHttpOptions(new URL(input));
	} else if (input instanceof URL) {
		input = urlToHttpOptions(input);
	} else {
		input = {...input};
	}

	if (typeof options === 'function' || options === undefined) {
		// (options, callback)
		callback = options;
		options = input;
	} else {
		// (input, options, callback)
		options = Object.assign(input, options);
	}

	options.ALPNProtocols = options.ALPNProtocols || ['h2', 'http/1.1'];

	if (!Array.isArray(options.ALPNProtocols) || options.ALPNProtocols.length === 0) {
		throw new Error('The `ALPNProtocols` option must be an Array with at least one entry');
	}

	options.protocol = options.protocol || 'https:';
	const isHttps = options.protocol === 'https:';

	options.host = options.hostname || options.host || 'localhost';
	options.session = options.tlsSession;
	options.servername = options.servername || calculateServerName((options.headers && options.headers.host) || options.host);
	options.port = options.port || (isHttps ? 443 : 80);
	options._defaultAgent = isHttps ? https.globalAgent : http.globalAgent;

	const resolveProtocol = options.resolveProtocol || defaultResolveProtocol;

	// Note: We don't support `h2session` here

	let {agent} = options;
	if (agent !== undefined && agent !== false && agent.constructor.name !== 'Object') {
		throw new Error('The `options.agent` can be only an object `http`, `https` or `http2` properties');
	}

	if (isHttps) {
		options.resolveSocket = true;

		let {socket, alpnProtocol, timeout} = await resolveProtocol(options);

		if (timeout) {
			if (socket) {
				socket.destroy();
			}

			const error = new Error(`Timed out resolving ALPN: ${options.timeout} ms`);
			error.code = 'ETIMEDOUT';
			error.ms = options.timeout;

			throw error;
		}

		// We can't accept custom `createConnection` because the API is different for HTTP/2
		if (socket && options.createConnection) {
			socket.destroy();
			socket = undefined;
		}

		delete options.resolveSocket;

		const isHttp2 = alpnProtocol === 'h2';

		if (agent) {
			agent = isHttp2 ? agent.http2 : agent.https;
			options.agent = agent;
		}

		if (agent === undefined) {
			agent = isHttp2 ? globalAgent : https.globalAgent;
		}

		if (socket) {
			if (agent === false) {
				socket.destroy();
			} else {
				const defaultCreateConnection = (isHttp2 ? Agent : https.Agent).prototype.createConnection;

				if (agent.createConnection === defaultCreateConnection) {
					if (isHttp2) {
						options._reuseSocket = socket;
					} else {
						installSocket(agent, socket, options);
					}
				} else {
					socket.destroy();
				}
			}
		}

		if (isHttp2) {
			return delayAsyncDestroy(new Http2ClientRequest(options, callback));
		}
	} else if (agent) {
		options.agent = agent.http;
	}

	return delayAsyncDestroy(http.request(options, callback));
};

module.exports.protocolCache = cache;
module.exports.resolveProtocol = defaultResolveProtocol;
module.exports.createResolveProtocol = createResolveProtocol;


/***/ }),

/***/ 9762:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

// See https://github.com/facebook/jest/issues/2549
// eslint-disable-next-line node/prefer-global/url
const {URL, urlToHttpOptions} = __webpack_require__(7310);
const http2 = __webpack_require__(5158);
const {Writable} = __webpack_require__(2781);
const {Agent, globalAgent} = __webpack_require__(5277);
const IncomingMessage = __webpack_require__(4382);
const proxyEvents = __webpack_require__(6329);
const {
	ERR_INVALID_ARG_TYPE,
	ERR_INVALID_PROTOCOL,
	ERR_HTTP_HEADERS_SENT
} = __webpack_require__(1854);
const validateHeaderName = __webpack_require__(722);
const validateHeaderValue = __webpack_require__(9741);
const proxySocketHandler = __webpack_require__(4385);

const {
	HTTP2_HEADER_STATUS,
	HTTP2_HEADER_METHOD,
	HTTP2_HEADER_PATH,
	HTTP2_HEADER_AUTHORITY,
	HTTP2_METHOD_CONNECT
} = http2.constants;

const kHeaders = Symbol('headers');
const kOrigin = Symbol('origin');
const kSession = Symbol('session');
const kOptions = Symbol('options');
const kFlushedHeaders = Symbol('flushedHeaders');
const kJobs = Symbol('jobs');
const kPendingAgentPromise = Symbol('pendingAgentPromise');

class ClientRequest extends Writable {
	constructor(input, options, callback) {
		super({
			autoDestroy: false,
			emitClose: false
		});

		if (typeof input === 'string') {
			input = urlToHttpOptions(new URL(input));
		} else if (input instanceof URL) {
			input = urlToHttpOptions(input);
		} else {
			input = {...input};
		}

		if (typeof options === 'function' || options === undefined) {
			// (options, callback)
			callback = options;
			options = input;
		} else {
			// (input, options, callback)
			options = Object.assign(input, options);
		}

		if (options.h2session) {
			this[kSession] = options.h2session;

			if (this[kSession].destroyed) {
				throw new Error('The session has been closed already');
			}

			this.protocol = this[kSession].socket.encrypted ? 'https:' : 'http:';
		} else if (options.agent === false) {
			this.agent = new Agent({maxEmptySessions: 0});
		} else if (typeof options.agent === 'undefined' || options.agent === null) {
			this.agent = globalAgent;
		} else if (typeof options.agent.request === 'function') {
			this.agent = options.agent;
		} else {
			throw new ERR_INVALID_ARG_TYPE('options.agent', ['http2wrapper.Agent-like Object', 'undefined', 'false'], options.agent);
		}

		if (this.agent) {
			this.protocol = this.agent.protocol;
		}

		if (options.protocol && options.protocol !== this.protocol) {
			throw new ERR_INVALID_PROTOCOL(options.protocol, this.protocol);
		}

		if (!options.port) {
			options.port = options.defaultPort || (this.agent && this.agent.defaultPort) || 443;
		}

		options.host = options.hostname || options.host || 'localhost';

		// Unused
		delete options.hostname;

		const {timeout} = options;
		options.timeout = undefined;

		this[kHeaders] = Object.create(null);
		this[kJobs] = [];

		this[kPendingAgentPromise] = undefined;

		this.socket = null;
		this.connection = null;

		this.method = options.method || 'GET';

		if (!(this.method === 'CONNECT' && (options.path === '/' || options.path === undefined))) {
			this.path = options.path;
		}

		this.res = null;
		this.aborted = false;
		this.reusedSocket = false;

		const {headers} = options;
		if (headers) {
			// eslint-disable-next-line guard-for-in
			for (const header in headers) {
				this.setHeader(header, headers[header]);
			}
		}

		if (options.auth && !('authorization' in this[kHeaders])) {
			this[kHeaders].authorization = 'Basic ' + Buffer.from(options.auth).toString('base64');
		}

		options.session = options.tlsSession;
		options.path = options.socketPath;

		this[kOptions] = options;

		// Clients that generate HTTP/2 requests directly SHOULD use the :authority pseudo-header field instead of the Host header field.
		this[kOrigin] = new URL(`${this.protocol}//${options.servername || options.host}:${options.port}`);

		// A socket is being reused
		const reuseSocket = options._reuseSocket;
		if (reuseSocket) {
			options.createConnection = (...args) => {
				if (reuseSocket.destroyed) {
					return this.agent.createConnection(...args);
				}

				return reuseSocket;
			};

			// eslint-disable-next-line promise/prefer-await-to-then
			this.agent.getSession(this[kOrigin], this[kOptions]).catch(() => {});
		}

		if (timeout) {
			this.setTimeout(timeout);
		}

		if (callback) {
			this.once('response', callback);
		}

		this[kFlushedHeaders] = false;
	}

	get method() {
		return this[kHeaders][HTTP2_HEADER_METHOD];
	}

	set method(value) {
		if (value) {
			this[kHeaders][HTTP2_HEADER_METHOD] = value.toUpperCase();
		}
	}

	get path() {
		const header = this.method === 'CONNECT' ? HTTP2_HEADER_AUTHORITY : HTTP2_HEADER_PATH;

		return this[kHeaders][header];
	}

	set path(value) {
		if (value) {
			const header = this.method === 'CONNECT' ? HTTP2_HEADER_AUTHORITY : HTTP2_HEADER_PATH;

			this[kHeaders][header] = value;
		}
	}

	get host() {
		return this[kOrigin].hostname;
	}

	set host(_value) {
		// Do nothing as this is read only.
	}

	get _mustNotHaveABody() {
		return this.method === 'GET' || this.method === 'HEAD' || this.method === 'DELETE';
	}

	_write(chunk, encoding, callback) {
		// https://github.com/nodejs/node/blob/654df09ae0c5e17d1b52a900a545f0664d8c7627/lib/internal/http2/util.js#L148-L156
		if (this._mustNotHaveABody) {
			callback(new Error('The GET, HEAD and DELETE methods must NOT have a body'));
			/* istanbul ignore next: Node.js 12 throws directly */
			return;
		}

		this.flushHeaders();

		const callWrite = () => this._request.write(chunk, encoding, callback);
		if (this._request) {
			callWrite();
		} else {
			this[kJobs].push(callWrite);
		}
	}

	_final(callback) {
		this.flushHeaders();

		const callEnd = () => {
			// For GET, HEAD and DELETE and CONNECT
			if (this._mustNotHaveABody || this.method === 'CONNECT') {
				callback();
				return;
			}

			this._request.end(callback);
		};

		if (this._request) {
			callEnd();
		} else {
			this[kJobs].push(callEnd);
		}
	}

	abort() {
		if (this.res && this.res.complete) {
			return;
		}

		if (!this.aborted) {
			process.nextTick(() => this.emit('abort'));
		}

		this.aborted = true;

		this.destroy();
	}

	async _destroy(error, callback) {
		if (this.res) {
			this.res._dump();
		}

		if (this._request) {
			this._request.destroy();
		} else {
			process.nextTick(() => {
				this.emit('close');
			});
		}

		try {
			await this[kPendingAgentPromise];
		} catch (internalError) {
			if (this.aborted) {
				error = internalError;
			}
		}

		callback(error);
	}

	async flushHeaders() {
		if (this[kFlushedHeaders] || this.destroyed) {
			return;
		}

		this[kFlushedHeaders] = true;

		const isConnectMethod = this.method === HTTP2_METHOD_CONNECT;

		// The real magic is here
		const onStream = stream => {
			this._request = stream;

			if (this.destroyed) {
				stream.destroy();
				return;
			}

			// Forwards `timeout`, `continue`, `close` and `error` events to this instance.
			if (!isConnectMethod) {
				// TODO: Should we proxy `close` here?
				proxyEvents(stream, this, ['timeout', 'continue']);
			}

			stream.once('error', error => {
				this.destroy(error);
			});

			stream.once('aborted', () => {
				const {res} = this;
				if (res) {
					res.aborted = true;
					res.emit('aborted');
					res.destroy();
				} else {
					this.destroy(new Error('The server aborted the HTTP/2 stream'));
				}
			});

			const onResponse = (headers, flags, rawHeaders) => {
				// If we were to emit raw request stream, it would be as fast as the native approach.
				// Note that wrapping the raw stream in a Proxy instance won't improve the performance (already tested it).
				const response = new IncomingMessage(this.socket, stream.readableHighWaterMark);
				this.res = response;

				// Undocumented, but it is used by `cacheable-request`
				response.url = `${this[kOrigin].origin}${this.path}`;

				response.req = this;
				response.statusCode = headers[HTTP2_HEADER_STATUS];
				response.headers = headers;
				response.rawHeaders = rawHeaders;

				response.once('end', () => {
					response.complete = true;

					// Has no effect, just be consistent with the Node.js behavior
					response.socket = null;
					response.connection = null;
				});

				if (isConnectMethod) {
					response.upgrade = true;

					// The HTTP1 API says the socket is detached here,
					// but we can't do that so we pass the original HTTP2 request.
					if (this.emit('connect', response, stream, Buffer.alloc(0))) {
						this.emit('close');
					} else {
						// No listeners attached, destroy the original request.
						stream.destroy();
					}
				} else {
					// Forwards data
					stream.on('data', chunk => {
						if (!response._dumped && !response.push(chunk)) {
							stream.pause();
						}
					});

					stream.once('end', () => {
						if (!this.aborted) {
							response.push(null);
						}
					});

					if (!this.emit('response', response)) {
						// No listeners attached, dump the response.
						response._dump();
					}
				}
			};

			// This event tells we are ready to listen for the data.
			stream.once('response', onResponse);

			// Emits `information` event
			stream.once('headers', headers => this.emit('information', {statusCode: headers[HTTP2_HEADER_STATUS]}));

			stream.once('trailers', (trailers, flags, rawTrailers) => {
				const {res} = this;

				// https://github.com/nodejs/node/issues/41251
				if (res === null) {
					onResponse(trailers, flags, rawTrailers);
					return;
				}

				// Assigns trailers to the response object.
				res.trailers = trailers;
				res.rawTrailers = rawTrailers;
			});

			stream.once('close', () => {
				const {aborted, res} = this;
				if (res) {
					if (aborted) {
						res.aborted = true;
						res.emit('aborted');
						res.destroy();
					}

					const finish = () => {
						res.emit('close');

						this.destroy();
						this.emit('close');
					};

					if (res.readable) {
						res.once('end', finish);
					} else {
						finish();
					}

					return;
				}

				if (!this.destroyed) {
					this.destroy(new Error('The HTTP/2 stream has been early terminated'));
					this.emit('close');
					return;
				}

				this.destroy();
				this.emit('close');
			});

			this.socket = new Proxy(stream, proxySocketHandler);

			for (const job of this[kJobs]) {
				job();
			}

			this.emit('socket', this.socket);
		};

		if (!(HTTP2_HEADER_AUTHORITY in this[kHeaders]) && !isConnectMethod) {
			this[kHeaders][HTTP2_HEADER_AUTHORITY] = this[kOrigin].host;
		}

		// Makes a HTTP2 request
		if (this[kSession]) {
			try {
				onStream(this[kSession].request(this[kHeaders]));
			} catch (error) {
				this.destroy(error);
			}
		} else {
			this.reusedSocket = true;

			try {
				const promise = this.agent.request(this[kOrigin], this[kOptions], this[kHeaders]);
				this[kPendingAgentPromise] = promise;

				onStream(await promise);

				this[kPendingAgentPromise] = false;
			} catch (error) {
				this[kPendingAgentPromise] = false;

				this.destroy(error);
			}
		}
	}

	get connection() {
		return this.socket;
	}

	set connection(value) {
		this.socket = value;
	}

	getHeaderNames() {
		return Object.keys(this[kHeaders]);
	}

	hasHeader(name) {
		if (typeof name !== 'string') {
			throw new ERR_INVALID_ARG_TYPE('name', 'string', name);
		}

		return Boolean(this[kHeaders][name.toLowerCase()]);
	}

	getHeader(name) {
		if (typeof name !== 'string') {
			throw new ERR_INVALID_ARG_TYPE('name', 'string', name);
		}

		return this[kHeaders][name.toLowerCase()];
	}

	get headersSent() {
		return this[kFlushedHeaders];
	}

	removeHeader(name) {
		if (typeof name !== 'string') {
			throw new ERR_INVALID_ARG_TYPE('name', 'string', name);
		}

		if (this.headersSent) {
			throw new ERR_HTTP_HEADERS_SENT('remove');
		}

		delete this[kHeaders][name.toLowerCase()];
	}

	setHeader(name, value) {
		if (this.headersSent) {
			throw new ERR_HTTP_HEADERS_SENT('set');
		}

		validateHeaderName(name);
		validateHeaderValue(name, value);

		const lowercased = name.toLowerCase();

		if (lowercased === 'connection') {
			if (value.toLowerCase() === 'keep-alive') {
				return;
			}

			throw new Error(`Invalid 'connection' header: ${value}`);
		}

		if (lowercased === 'host' && this.method === 'CONNECT') {
			this[kHeaders][HTTP2_HEADER_AUTHORITY] = value;
		} else {
			this[kHeaders][lowercased] = value;
		}
	}

	setNoDelay() {
		// HTTP2 sockets cannot be malformed, do nothing.
	}

	setSocketKeepAlive() {
		// HTTP2 sockets cannot be malformed, do nothing.
	}

	setTimeout(ms, callback) {
		const applyTimeout = () => this._request.setTimeout(ms, callback);

		if (this._request) {
			applyTimeout();
		} else {
			this[kJobs].push(applyTimeout);
		}

		return this;
	}

	get maxHeadersCount() {
		if (!this.destroyed && this._request) {
			return this._request.session.localSettings.maxHeaderListSize;
		}

		return undefined;
	}

	set maxHeadersCount(_value) {
		// Updating HTTP2 settings would affect all requests, do nothing.
	}
}

module.exports = ClientRequest;


/***/ }),

/***/ 4382:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

const {Readable} = __webpack_require__(2781);

class IncomingMessage extends Readable {
	constructor(socket, highWaterMark) {
		super({
			emitClose: false,
			autoDestroy: true,
			highWaterMark
		});

		this.statusCode = null;
		this.statusMessage = '';
		this.httpVersion = '2.0';
		this.httpVersionMajor = 2;
		this.httpVersionMinor = 0;
		this.headers = {};
		this.trailers = {};
		this.req = null;

		this.aborted = false;
		this.complete = false;
		this.upgrade = null;

		this.rawHeaders = [];
		this.rawTrailers = [];

		this.socket = socket;

		this._dumped = false;
	}

	get connection() {
		return this.socket;
	}

	set connection(value) {
		this.socket = value;
	}

	_destroy(error, callback) {
		if (!this.readableEnded) {
			this.aborted = true;
		}

		// See https://github.com/nodejs/node/issues/35303
		callback();

		this.req._request.destroy(error);
	}

	setTimeout(ms, callback) {
		this.req.setTimeout(ms, callback);
		return this;
	}

	_dump() {
		if (!this._dumped) {
			this._dumped = true;

			this.removeAllListeners('data');
			this.resume();
		}
	}

	_read() {
		if (this.req) {
			this.req._request.resume();
		}
	}
}

module.exports = IncomingMessage;


/***/ }),

/***/ 6178:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

const http2 = __webpack_require__(5158);
const {
	Agent,
	globalAgent
} = __webpack_require__(5277);
const ClientRequest = __webpack_require__(9762);
const IncomingMessage = __webpack_require__(4382);
const auto = __webpack_require__(3714);
const {
	HttpOverHttp2,
	HttpsOverHttp2
} = __webpack_require__(4783);
const Http2OverHttp2 = __webpack_require__(1009);
const {
	Http2OverHttp,
	Http2OverHttps
} = __webpack_require__(4592);
const validateHeaderName = __webpack_require__(722);
const validateHeaderValue = __webpack_require__(9741);

const request = (url, options, callback) => new ClientRequest(url, options, callback);

const get = (url, options, callback) => {
	// eslint-disable-next-line unicorn/prevent-abbreviations
	const req = new ClientRequest(url, options, callback);
	req.end();

	return req;
};

module.exports = {
	...http2,
	ClientRequest,
	IncomingMessage,
	Agent,
	globalAgent,
	request,
	get,
	auto,
	proxies: {
		HttpOverHttp2,
		HttpsOverHttp2,
		Http2OverHttp2,
		Http2OverHttp,
		Http2OverHttps
	},
	validateHeaderName,
	validateHeaderValue
};


/***/ }),

/***/ 826:
/***/ ((module) => {

"use strict";


module.exports = self => {
	const {username, password} = self.proxyOptions.url;

	if (username || password) {
		const data = `${username}:${password}`;
		const authorization = `Basic ${Buffer.from(data).toString('base64')}`;

		return {
			'proxy-authorization': authorization,
			authorization
		};
	}

	return {};
};


/***/ }),

/***/ 4783:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

const tls = __webpack_require__(4404);
const http = __webpack_require__(3685);
const https = __webpack_require__(5687);
const JSStreamSocket = __webpack_require__(1682);
const {globalAgent} = __webpack_require__(5277);
const UnexpectedStatusCodeError = __webpack_require__(4526);
const initialize = __webpack_require__(2582);
const getAuthorizationHeaders = __webpack_require__(826);

const createConnection = (self, options, callback) => {
	(async () => {
		try {
			const {proxyOptions} = self;
			const {url, headers, raw} = proxyOptions;

			const stream = await globalAgent.request(url, proxyOptions, {
				...getAuthorizationHeaders(self),
				...headers,
				':method': 'CONNECT',
				':authority': `${options.host}:${options.port}`
			});

			stream.once('error', callback);
			stream.once('response', headers => {
				const statusCode = headers[':status'];

				if (statusCode !== 200) {
					callback(new UnexpectedStatusCodeError(statusCode));
					return;
				}

				const encrypted = self instanceof https.Agent;

				if (raw && encrypted) {
					options.socket = stream;
					const secureStream = tls.connect(options);

					secureStream.once('close', () => {
						stream.destroy();
					});

					callback(null, secureStream);
					return;
				}

				const socket = new JSStreamSocket(stream);
				socket.encrypted = false;
				socket._handle.getpeername = out => {
					out.family = undefined;
					out.address = undefined;
					out.port = undefined;
				};

				callback(null, socket);
			});
		} catch (error) {
			callback(error);
		}
	})();
};

class HttpOverHttp2 extends http.Agent {
	constructor(options) {
		super(options);

		initialize(this, options.proxyOptions);
	}

	createConnection(options, callback) {
		createConnection(this, options, callback);
	}
}

class HttpsOverHttp2 extends https.Agent {
	constructor(options) {
		super(options);

		initialize(this, options.proxyOptions);
	}

	createConnection(options, callback) {
		createConnection(this, options, callback);
	}
}

module.exports = {
	HttpOverHttp2,
	HttpsOverHttp2
};


/***/ }),

/***/ 4592:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

const http = __webpack_require__(3685);
const https = __webpack_require__(5687);
const Http2OverHttpX = __webpack_require__(8642);
const getAuthorizationHeaders = __webpack_require__(826);

const getStream = request => new Promise((resolve, reject) => {
	const onConnect = (response, socket, head) => {
		socket.unshift(head);

		request.off('error', reject);
		resolve([socket, response.statusCode]);
	};

	request.once('error', reject);
	request.once('connect', onConnect);
});

class Http2OverHttp extends Http2OverHttpX {
	async _getProxyStream(authority) {
		const {proxyOptions} = this;
		const {url, headers} = this.proxyOptions;

		const network = url.protocol === 'https:' ? https : http;

		// `new URL('https://localhost/httpbin.org:443')` results in
		// a `/httpbin.org:443` path, which has an invalid leading slash.
		const request = network.request({
			...proxyOptions,
			hostname: url.hostname,
			port: url.port,
			path: authority,
			headers: {
				...getAuthorizationHeaders(this),
				...headers,
				host: authority
			},
			method: 'CONNECT'
		}).end();

		return getStream(request);
	}
}

module.exports = {
	Http2OverHttp,
	Http2OverHttps: Http2OverHttp
};


/***/ }),

/***/ 1009:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

const {globalAgent} = __webpack_require__(5277);
const Http2OverHttpX = __webpack_require__(8642);
const getAuthorizationHeaders = __webpack_require__(826);

const getStatusCode = stream => new Promise((resolve, reject) => {
	stream.once('error', reject);
	stream.once('response', headers => {
		stream.off('error', reject);
		resolve(headers[':status']);
	});
});

class Http2OverHttp2 extends Http2OverHttpX {
	async _getProxyStream(authority) {
		const {proxyOptions} = this;

		const headers = {
			...getAuthorizationHeaders(this),
			...proxyOptions.headers,
			':method': 'CONNECT',
			':authority': authority
		};

		const stream = await globalAgent.request(proxyOptions.url, proxyOptions, headers);
		const statusCode = await getStatusCode(stream);

		return [stream, statusCode];
	}
}

module.exports = Http2OverHttp2;


/***/ }),

/***/ 8642:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

const {Agent} = __webpack_require__(5277);
const JSStreamSocket = __webpack_require__(1682);
const UnexpectedStatusCodeError = __webpack_require__(4526);
const initialize = __webpack_require__(2582);

class Http2OverHttpX extends Agent {
	constructor(options) {
		super(options);

		initialize(this, options.proxyOptions);
	}

	async createConnection(origin, options) {
		const authority = `${origin.hostname}:${origin.port || 443}`;

		const [stream, statusCode] = await this._getProxyStream(authority);
		if (statusCode !== 200) {
			throw new UnexpectedStatusCodeError(statusCode);
		}

		if (this.proxyOptions.raw) {
			options.socket = stream;
		} else {
			const socket = new JSStreamSocket(stream);
			socket.encrypted = false;
			socket._handle.getpeername = out => {
				out.family = undefined;
				out.address = undefined;
				out.port = undefined;
			};

			return socket;
		}

		return super.createConnection(origin, options);
	}
}

module.exports = Http2OverHttpX;


/***/ }),

/***/ 2582:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

// See https://github.com/facebook/jest/issues/2549
// eslint-disable-next-line node/prefer-global/url
const {URL} = __webpack_require__(7310);
const checkType = __webpack_require__(6181);

module.exports = (self, proxyOptions) => {
	checkType('proxyOptions', proxyOptions, ['object']);
	checkType('proxyOptions.headers', proxyOptions.headers, ['object', 'undefined']);
	checkType('proxyOptions.raw', proxyOptions.raw, ['boolean', 'undefined']);
	checkType('proxyOptions.url', proxyOptions.url, [URL, 'string']);

	const url = new URL(proxyOptions.url);

	self.proxyOptions = {
		raw: true,
		...proxyOptions,
		headers: {...proxyOptions.headers},
		url
	};
};


/***/ }),

/***/ 4526:
/***/ ((module) => {

"use strict";


class UnexpectedStatusCodeError extends Error {
	constructor(statusCode) {
		super(`The proxy server rejected the request with status code ${statusCode}`);
		this.statusCode = statusCode;
	}
}

module.exports = UnexpectedStatusCodeError;


/***/ }),

/***/ 8849:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

const {isIP} = __webpack_require__(1808);
const assert = __webpack_require__(9491);

const getHost = host => {
	if (host[0] === '[') {
		const idx = host.indexOf(']');

		assert(idx !== -1);
		return host.slice(1, idx);
	}

	const idx = host.indexOf(':');
	if (idx === -1) {
		return host;
	}

	return host.slice(0, idx);
};

module.exports = host => {
	const servername = getHost(host);

	if (isIP(servername)) {
		return '';
	}

	return servername;
};


/***/ }),

/***/ 6181:
/***/ ((module) => {

"use strict";


const checkType = (name, value, types) => {
	const valid = types.some(type => {
		const typeofType = typeof type;
		if (typeofType === 'string') {
			return typeof value === type;
		}

		return value instanceof type;
	});

	if (!valid) {
		const names = types.map(type => typeof type === 'string' ? type : type.name);

		throw new TypeError(`Expected '${name}' to be a type of ${names.join(' or ')}, got ${typeof value}`);
	}
};

module.exports = checkType;


/***/ }),

/***/ 7354:
/***/ ((module) => {

"use strict";


module.exports = stream => {
	if (stream.listenerCount('error') !== 0) {
		return stream;
	}

	stream.__destroy = stream._destroy;
	stream._destroy = (...args) => {
		const callback = args.pop();

		stream.__destroy(...args, async error => {
			await Promise.resolve();
			callback(error);
		});
	};

	const onError = error => {
		// eslint-disable-next-line promise/prefer-await-to-then
		Promise.resolve().then(() => {
			stream.emit('error', error);
		});
	};

	stream.once('error', onError);

	// eslint-disable-next-line promise/prefer-await-to-then
	Promise.resolve().then(() => {
		stream.off('error', onError);
	});

	return stream;
};


/***/ }),

/***/ 1854:
/***/ ((module) => {

"use strict";

/* istanbul ignore file: https://github.com/nodejs/node/blob/master/lib/internal/errors.js */

const makeError = (Base, key, getMessage) => {
	module.exports[key] = class NodeError extends Base {
		constructor(...args) {
			super(typeof getMessage === 'string' ? getMessage : getMessage(args));
			this.name = `${super.name} [${key}]`;
			this.code = key;
		}
	};
};

makeError(TypeError, 'ERR_INVALID_ARG_TYPE', args => {
	const type = args[0].includes('.') ? 'property' : 'argument';

	let valid = args[1];
	const isManyTypes = Array.isArray(valid);

	if (isManyTypes) {
		valid = `${valid.slice(0, -1).join(', ')} or ${valid.slice(-1)}`;
	}

	return `The "${args[0]}" ${type} must be ${isManyTypes ? 'one of' : 'of'} type ${valid}. Received ${typeof args[2]}`;
});

makeError(TypeError, 'ERR_INVALID_PROTOCOL', args =>
	`Protocol "${args[0]}" not supported. Expected "${args[1]}"`
);

makeError(Error, 'ERR_HTTP_HEADERS_SENT', args =>
	`Cannot ${args[0]} headers after they are sent to the client`
);

makeError(TypeError, 'ERR_INVALID_HTTP_TOKEN', args =>
	`${args[0]} must be a valid HTTP token [${args[1]}]`
);

makeError(TypeError, 'ERR_HTTP_INVALID_HEADER_VALUE', args =>
	`Invalid value "${args[0]} for header "${args[1]}"`
);

makeError(TypeError, 'ERR_INVALID_CHAR', args =>
	`Invalid character in ${args[0]} [${args[1]}]`
);

makeError(
	Error,
	'ERR_HTTP2_NO_SOCKET_MANIPULATION',
	'HTTP/2 sockets should not be directly manipulated (e.g. read and written)'
);


/***/ }),

/***/ 4870:
/***/ ((module) => {

"use strict";


module.exports = header => {
	switch (header) {
		case ':method':
		case ':scheme':
		case ':authority':
		case ':path':
			return true;
		default:
			return false;
	}
};


/***/ }),

/***/ 1682:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

const stream = __webpack_require__(2781);
const tls = __webpack_require__(4404);

// Really awesome hack.
const JSStreamSocket = (new tls.TLSSocket(new stream.PassThrough()))._handle._parentWrap.constructor;

module.exports = JSStreamSocket;


/***/ }),

/***/ 6329:
/***/ ((module) => {

"use strict";


module.exports = (from, to, events) => {
	for (const event of events) {
		from.on(event, (...args) => to.emit(event, ...args));
	}
};


/***/ }),

/***/ 4385:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

const {ERR_HTTP2_NO_SOCKET_MANIPULATION} = __webpack_require__(1854);

/* istanbul ignore file */
/* https://github.com/nodejs/node/blob/6eec858f34a40ffa489c1ec54bb24da72a28c781/lib/internal/http2/compat.js#L195-L272 */

const proxySocketHandler = {
	has(stream, property) {
		// Replaced [kSocket] with .socket
		const reference = stream.session === undefined ? stream : stream.session.socket;
		return (property in stream) || (property in reference);
	},

	get(stream, property) {
		switch (property) {
			case 'on':
			case 'once':
			case 'end':
			case 'emit':
			case 'destroy':
				return stream[property].bind(stream);
			case 'writable':
			case 'destroyed':
				return stream[property];
			case 'readable':
				if (stream.destroyed) {
					return false;
				}

				return stream.readable;
			case 'setTimeout': {
				const {session} = stream;
				if (session !== undefined) {
					return session.setTimeout.bind(session);
				}

				return stream.setTimeout.bind(stream);
			}

			case 'write':
			case 'read':
			case 'pause':
			case 'resume':
				throw new ERR_HTTP2_NO_SOCKET_MANIPULATION();
			default: {
				// Replaced [kSocket] with .socket
				const reference = stream.session === undefined ? stream : stream.session.socket;
				const value = reference[property];

				return typeof value === 'function' ? value.bind(reference) : value;
			}
		}
	},

	getPrototypeOf(stream) {
		if (stream.session !== undefined) {
			// Replaced [kSocket] with .socket
			return Reflect.getPrototypeOf(stream.session.socket);
		}

		return Reflect.getPrototypeOf(stream);
	},

	set(stream, property, value) {
		switch (property) {
			case 'writable':
			case 'readable':
			case 'destroyed':
			case 'on':
			case 'once':
			case 'end':
			case 'emit':
			case 'destroy':
				stream[property] = value;
				return true;
			case 'setTimeout': {
				const {session} = stream;
				if (session === undefined) {
					stream.setTimeout = value;
				} else {
					session.setTimeout = value;
				}

				return true;
			}

			case 'write':
			case 'read':
			case 'pause':
			case 'resume':
				throw new ERR_HTTP2_NO_SOCKET_MANIPULATION();
			default: {
				// Replaced [kSocket] with .socket
				const reference = stream.session === undefined ? stream : stream.session.socket;
				reference[property] = value;
				return true;
			}
		}
	}
};

module.exports = proxySocketHandler;


/***/ }),

/***/ 722:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

const {ERR_INVALID_HTTP_TOKEN} = __webpack_require__(1854);
const isRequestPseudoHeader = __webpack_require__(4870);

const isValidHttpToken = /^[\^`\-\w!#$%&*+.|~]+$/;

module.exports = name => {
	if (typeof name !== 'string' || (!isValidHttpToken.test(name) && !isRequestPseudoHeader(name))) {
		throw new ERR_INVALID_HTTP_TOKEN('Header name', name);
	}
};


/***/ }),

/***/ 9741:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

const {
	ERR_HTTP_INVALID_HEADER_VALUE,
	ERR_INVALID_CHAR
} = __webpack_require__(1854);

const isInvalidHeaderValue = /[^\t\u0020-\u007E\u0080-\u00FF]/;

module.exports = (name, value) => {
	if (typeof value === 'undefined') {
		throw new ERR_HTTP_INVALID_HEADER_VALUE(value, name);
	}

	if (isInvalidHeaderValue.test(value)) {
		throw new ERR_INVALID_CHAR('header content', name);
	}
};


/***/ }),

/***/ 7620:
/***/ ((__unused_webpack_module, exports) => {

//TODO: handle reviver/dehydrate function like normal
//and handle indentation, like normal.
//if anyone needs this... please send pull request.

exports.stringify = function stringify (o) {
  if('undefined' == typeof o) return o

  if(o && Buffer.isBuffer(o))
    return JSON.stringify(':base64:' + o.toString('base64'))

  if(o && o.toJSON)
    o =  o.toJSON()

  if(o && 'object' === typeof o) {
    var s = ''
    var array = Array.isArray(o)
    s = array ? '[' : '{'
    var first = true

    for(var k in o) {
      var ignore = 'function' == typeof o[k] || (!array && 'undefined' === typeof o[k])
      if(Object.hasOwnProperty.call(o, k) && !ignore) {
        if(!first)
          s += ','
        first = false
        if (array) {
          if(o[k] == undefined)
            s += 'null'
          else
            s += stringify(o[k])
        } else if (o[k] !== void(0)) {
          s += stringify(k) + ':' + stringify(o[k])
        }
      }
    }

    s += array ? ']' : '}'

    return s
  } else if ('string' === typeof o) {
    return JSON.stringify(/^:/.test(o) ? ':' + o : o)
  } else if ('undefined' === typeof o) {
    return 'null';
  } else
    return JSON.stringify(o)
}

exports.parse = function (s) {
  return JSON.parse(s, function (key, value) {
    if('string' === typeof value) {
      if(/^:base64:/.test(value))
        return Buffer.from(value.substring(8), 'base64')
      else
        return /^:/.test(value) ? value.substring(1) : value 
    }
    return value
  })
}


/***/ }),

/***/ 5773:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const EventEmitter = __webpack_require__(2361);
const JSONB = __webpack_require__(7620);
const compressBrotli = __webpack_require__(3736);

const loadStore = options => {
	const adapters = {
		redis: '@keyv/redis',
		rediss: '@keyv/redis',
		mongodb: '@keyv/mongo',
		mongo: '@keyv/mongo',
		sqlite: '@keyv/sqlite',
		postgresql: '@keyv/postgres',
		postgres: '@keyv/postgres',
		mysql: '@keyv/mysql',
		etcd: '@keyv/etcd',
		offline: '@keyv/offline',
		tiered: '@keyv/tiered',
	};
	if (options.adapter || options.uri) {
		const adapter = options.adapter || /^[^:+]*/.exec(options.uri)[0];
		return new (__webpack_require__(5961)(adapters[adapter]))(options);
	}

	return new Map();
};

const iterableAdapters = [
	'sqlite',
	'postgres',
	'mysql',
	'mongo',
	'redis',
	'tiered',
];

class Keyv extends EventEmitter {
	constructor(uri, {emitErrors = true, ...options} = {}) {
		super();
		this.opts = {
			namespace: 'keyv',
			serialize: JSONB.stringify,
			deserialize: JSONB.parse,
			...((typeof uri === 'string') ? {uri} : uri),
			...options,
		};

		if (!this.opts.store) {
			const adapterOptions = {...this.opts};
			this.opts.store = loadStore(adapterOptions);
		}

		if (this.opts.compress) {
			const brotli = compressBrotli(this.opts.compress.opts);
			this.opts.serialize = async ({value, expires}) => brotli.serialize({value: await brotli.compress(value), expires});
			this.opts.deserialize = async data => {
				const {value, expires} = brotli.deserialize(data);
				return {value: await brotli.decompress(value), expires};
			};
		}

		if (typeof this.opts.store.on === 'function' && emitErrors) {
			this.opts.store.on('error', error => this.emit('error', error));
		}

		this.opts.store.namespace = this.opts.namespace;

		const generateIterator = iterator => async function * () {
			for await (const [key, raw] of typeof iterator === 'function'
				? iterator(this.opts.store.namespace)
				: iterator) {
				const data = this.opts.deserialize(raw);
				if (this.opts.store.namespace && !key.includes(this.opts.store.namespace)) {
					continue;
				}

				if (typeof data.expires === 'number' && Date.now() > data.expires) {
					this.delete(key);
					continue;
				}

				yield [this._getKeyUnprefix(key), data.value];
			}
		};

		// Attach iterators
		if (typeof this.opts.store[Symbol.iterator] === 'function' && this.opts.store instanceof Map) {
			this.iterator = generateIterator(this.opts.store);
		} else if (typeof this.opts.store.iterator === 'function' && this.opts.store.opts
			&& this._checkIterableAdaptar()) {
			this.iterator = generateIterator(this.opts.store.iterator.bind(this.opts.store));
		}
	}

	_checkIterableAdaptar() {
		return iterableAdapters.includes(this.opts.store.opts.dialect)
			|| iterableAdapters.findIndex(element => this.opts.store.opts.url.includes(element)) >= 0;
	}

	_getKeyPrefix(key) {
		return `${this.opts.namespace}:${key}`;
	}

	_getKeyPrefixArray(keys) {
		return keys.map(key => `${this.opts.namespace}:${key}`);
	}

	_getKeyUnprefix(key) {
		return key
			.split(':')
			.splice(1)
			.join(':');
	}

	get(key, options) {
		const {store} = this.opts;
		const isArray = Array.isArray(key);
		const keyPrefixed = isArray ? this._getKeyPrefixArray(key) : this._getKeyPrefix(key);
		if (isArray && store.getMany === undefined) {
			const promises = [];
			for (const key of keyPrefixed) {
				promises.push(Promise.resolve()
					.then(() => store.get(key))
					.then(data => (typeof data === 'string') ? this.opts.deserialize(data) : data)
					.then(data => {
						if (data === undefined || data === null) {
							return undefined;
						}

						if (typeof data.expires === 'number' && Date.now() > data.expires) {
							return this.delete(key).then(() => undefined);
						}

						return (options && options.raw) ? data : data.value;
					}),
				);
			}

			return Promise.allSettled(promises)
				.then(values => {
					const data = [];
					for (const value of values) {
						data.push(value.value);
					}

					return data;
				});
		}

		return Promise.resolve()
			.then(() => isArray ? store.getMany(keyPrefixed) : store.get(keyPrefixed))
			.then(data => (typeof data === 'string') ? this.opts.deserialize(data) : data)
			.then(data => {
				if (data === undefined || data === null) {
					return undefined;
				}

				if (isArray) {
					const result = [];

					for (let row of data) {
						if ((typeof row === 'string')) {
							row = this.opts.deserialize(row);
						}

						if (row === undefined || row === null) {
							result.push(undefined);
							continue;
						}

						if (typeof row.expires === 'number' && Date.now() > row.expires) {
							this.delete(key).then(() => undefined);
							result.push(undefined);
						} else {
							result.push((options && options.raw) ? row : row.value);
						}
					}

					return result;
				}

				if (typeof data.expires === 'number' && Date.now() > data.expires) {
					return this.delete(key).then(() => undefined);
				}

				return (options && options.raw) ? data : data.value;
			});
	}

	set(key, value, ttl) {
		const keyPrefixed = this._getKeyPrefix(key);
		if (typeof ttl === 'undefined') {
			ttl = this.opts.ttl;
		}

		if (ttl === 0) {
			ttl = undefined;
		}

		const {store} = this.opts;

		return Promise.resolve()
			.then(() => {
				const expires = (typeof ttl === 'number') ? (Date.now() + ttl) : null;
				if (typeof value === 'symbol') {
					this.emit('error', 'symbol cannot be serialized');
				}

				value = {value, expires};
				return this.opts.serialize(value);
			})
			.then(value => store.set(keyPrefixed, value, ttl))
			.then(() => true);
	}

	delete(key) {
		const {store} = this.opts;
		if (Array.isArray(key)) {
			const keyPrefixed = this._getKeyPrefixArray(key);
			if (store.deleteMany === undefined) {
				const promises = [];
				for (const key of keyPrefixed) {
					promises.push(store.delete(key));
				}

				return Promise.allSettled(promises)
					.then(values => values.every(x => x.value === true));
			}

			return Promise.resolve()
				.then(() => store.deleteMany(keyPrefixed));
		}

		const keyPrefixed = this._getKeyPrefix(key);
		return Promise.resolve()
			.then(() => store.delete(keyPrefixed));
	}

	clear() {
		const {store} = this.opts;
		return Promise.resolve()
			.then(() => store.clear());
	}

	has(key) {
		const keyPrefixed = this._getKeyPrefix(key);
		const {store} = this.opts;
		return Promise.resolve()
			.then(async () => {
				if (typeof store.has === 'function') {
					return store.has(keyPrefixed);
				}

				const value = await store.get(keyPrefixed);
				return value !== undefined;
			});
	}

	disconnect() {
		const {store} = this.opts;
		if (typeof store.disconnect === 'function') {
			return store.disconnect();
		}
	}
}

module.exports = Keyv;


/***/ }),

/***/ 5961:
/***/ ((module) => {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = () => ([]);
webpackEmptyContext.resolve = webpackEmptyContext;
webpackEmptyContext.id = 5961;
module.exports = webpackEmptyContext;

/***/ }),

/***/ 7519:
/***/ ((module) => {

"use strict";

module.exports = object => {
	const result = {};

	for (const [key, value] of Object.entries(object)) {
		result[key.toLowerCase()] = value;
	}

	return result;
};


/***/ }),

/***/ 9496:
/***/ ((module) => {

"use strict";


// We define these manually to ensure they're always copied
// even if they would move up the prototype chain
// https://nodejs.org/api/http.html#http_class_http_incomingmessage
const knownProperties = [
	'aborted',
	'complete',
	'headers',
	'httpVersion',
	'httpVersionMinor',
	'httpVersionMajor',
	'method',
	'rawHeaders',
	'rawTrailers',
	'setTimeout',
	'socket',
	'statusCode',
	'statusMessage',
	'trailers',
	'url'
];

module.exports = (fromStream, toStream) => {
	if (toStream._readableState.autoDestroy) {
		throw new Error('The second stream must have the `autoDestroy` option set to `false`');
	}

	const fromProperties = new Set(Object.keys(fromStream).concat(knownProperties));

	const properties = {};

	for (const property of fromProperties) {
		// Don't overwrite existing properties.
		if (property in toStream) {
			continue;
		}

		properties[property] = {
			get() {
				const value = fromStream[property];
				const isFunction = typeof value === 'function';

				return isFunction ? value.bind(fromStream) : value;
			},
			set(value) {
				fromStream[property] = value;
			},
			enumerable: true,
			configurable: false
		};
	}

	Object.defineProperties(toStream, properties);

	fromStream.once('aborted', () => {
		toStream.destroy();

		toStream.emit('aborted');
	});

	fromStream.once('close', () => {
		if (fromStream.complete) {
			if (toStream.readable) {
				toStream.once('end', () => {
					toStream.emit('close');
				});
			} else {
				toStream.emit('close');
			}
		} else {
			toStream.emit('close');
		}
	});

	return toStream;
};


/***/ }),

/***/ 9636:
/***/ ((module) => {

"use strict";


// https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs
const DATA_URL_DEFAULT_MIME_TYPE = 'text/plain';
const DATA_URL_DEFAULT_CHARSET = 'us-ascii';

const testParameter = (name, filters) => {
	return filters.some(filter => filter instanceof RegExp ? filter.test(name) : filter === name);
};

const normalizeDataURL = (urlString, {stripHash}) => {
	const match = /^data:(?<type>[^,]*?),(?<data>[^#]*?)(?:#(?<hash>.*))?$/.exec(urlString);

	if (!match) {
		throw new Error(`Invalid URL: ${urlString}`);
	}

	let {type, data, hash} = match.groups;
	const mediaType = type.split(';');
	hash = stripHash ? '' : hash;

	let isBase64 = false;
	if (mediaType[mediaType.length - 1] === 'base64') {
		mediaType.pop();
		isBase64 = true;
	}

	// Lowercase MIME type
	const mimeType = (mediaType.shift() || '').toLowerCase();
	const attributes = mediaType
		.map(attribute => {
			let [key, value = ''] = attribute.split('=').map(string => string.trim());

			// Lowercase `charset`
			if (key === 'charset') {
				value = value.toLowerCase();

				if (value === DATA_URL_DEFAULT_CHARSET) {
					return '';
				}
			}

			return `${key}${value ? `=${value}` : ''}`;
		})
		.filter(Boolean);

	const normalizedMediaType = [
		...attributes
	];

	if (isBase64) {
		normalizedMediaType.push('base64');
	}

	if (normalizedMediaType.length !== 0 || (mimeType && mimeType !== DATA_URL_DEFAULT_MIME_TYPE)) {
		normalizedMediaType.unshift(mimeType);
	}

	return `data:${normalizedMediaType.join(';')},${isBase64 ? data.trim() : data}${hash ? `#${hash}` : ''}`;
};

const normalizeUrl = (urlString, options) => {
	options = {
		defaultProtocol: 'http:',
		normalizeProtocol: true,
		forceHttp: false,
		forceHttps: false,
		stripAuthentication: true,
		stripHash: false,
		stripTextFragment: true,
		stripWWW: true,
		removeQueryParameters: [/^utm_\w+/i],
		removeTrailingSlash: true,
		removeSingleSlash: true,
		removeDirectoryIndex: false,
		sortQueryParameters: true,
		...options
	};

	urlString = urlString.trim();

	// Data URL
	if (/^data:/i.test(urlString)) {
		return normalizeDataURL(urlString, options);
	}

	if (/^view-source:/i.test(urlString)) {
		throw new Error('`view-source:` is not supported as it is a non-standard protocol');
	}

	const hasRelativeProtocol = urlString.startsWith('//');
	const isRelativeUrl = !hasRelativeProtocol && /^\.*\//.test(urlString);

	// Prepend protocol
	if (!isRelativeUrl) {
		urlString = urlString.replace(/^(?!(?:\w+:)?\/\/)|^\/\//, options.defaultProtocol);
	}

	const urlObj = new URL(urlString);

	if (options.forceHttp && options.forceHttps) {
		throw new Error('The `forceHttp` and `forceHttps` options cannot be used together');
	}

	if (options.forceHttp && urlObj.protocol === 'https:') {
		urlObj.protocol = 'http:';
	}

	if (options.forceHttps && urlObj.protocol === 'http:') {
		urlObj.protocol = 'https:';
	}

	// Remove auth
	if (options.stripAuthentication) {
		urlObj.username = '';
		urlObj.password = '';
	}

	// Remove hash
	if (options.stripHash) {
		urlObj.hash = '';
	} else if (options.stripTextFragment) {
		urlObj.hash = urlObj.hash.replace(/#?:~:text.*?$/i, '');
	}

	// Remove duplicate slashes if not preceded by a protocol
	if (urlObj.pathname) {
		urlObj.pathname = urlObj.pathname.replace(/(?<!\b(?:[a-z][a-z\d+\-.]{1,50}:))\/{2,}/g, '/');
	}

	// Decode URI octets
	if (urlObj.pathname) {
		try {
			urlObj.pathname = decodeURI(urlObj.pathname);
		} catch (_) {}
	}

	// Remove directory index
	if (options.removeDirectoryIndex === true) {
		options.removeDirectoryIndex = [/^index\.[a-z]+$/];
	}

	if (Array.isArray(options.removeDirectoryIndex) && options.removeDirectoryIndex.length > 0) {
		let pathComponents = urlObj.pathname.split('/');
		const lastComponent = pathComponents[pathComponents.length - 1];

		if (testParameter(lastComponent, options.removeDirectoryIndex)) {
			pathComponents = pathComponents.slice(0, pathComponents.length - 1);
			urlObj.pathname = pathComponents.slice(1).join('/') + '/';
		}
	}

	if (urlObj.hostname) {
		// Remove trailing dot
		urlObj.hostname = urlObj.hostname.replace(/\.$/, '');

		// Remove `www.`
		if (options.stripWWW && /^www\.(?!www\.)(?:[a-z\-\d]{1,63})\.(?:[a-z.\-\d]{2,63})$/.test(urlObj.hostname)) {
			// Each label should be max 63 at length (min: 1).
			// Source: https://en.wikipedia.org/wiki/Hostname#Restrictions_on_valid_host_names
			// Each TLD should be up to 63 characters long (min: 2).
			// It is technically possible to have a single character TLD, but none currently exist.
			urlObj.hostname = urlObj.hostname.replace(/^www\./, '');
		}
	}

	// Remove query unwanted parameters
	if (Array.isArray(options.removeQueryParameters)) {
		for (const key of [...urlObj.searchParams.keys()]) {
			if (testParameter(key, options.removeQueryParameters)) {
				urlObj.searchParams.delete(key);
			}
		}
	}

	if (options.removeQueryParameters === true) {
		urlObj.search = '';
	}

	// Sort query parameters
	if (options.sortQueryParameters) {
		urlObj.searchParams.sort();
	}

	if (options.removeTrailingSlash) {
		urlObj.pathname = urlObj.pathname.replace(/\/$/, '');
	}

	const oldUrlString = urlString;

	// Take advantage of many of the Node `url` normalizations
	urlString = urlObj.toString();

	if (!options.removeSingleSlash && urlObj.pathname === '/' && !oldUrlString.endsWith('/') && urlObj.hash === '') {
		urlString = urlString.replace(/\/$/, '');
	}

	// Remove ending `/` unless removeSingleSlash is false
	if ((options.removeTrailingSlash || urlObj.pathname === '/') && urlObj.hash === '' && options.removeSingleSlash) {
		urlString = urlString.replace(/\/$/, '');
	}

	// Restore relative protocol, if applicable
	if (hasRelativeProtocol && !options.normalizeProtocol) {
		urlString = urlString.replace(/^http:\/\//, '//');
	}

	// Remove http/https
	if (options.stripProtocol) {
		urlString = urlString.replace(/^(?:https?:)?\/\//, '');
	}

	return urlString;
};

module.exports = normalizeUrl;


/***/ }),

/***/ 8576:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var wrappy = __webpack_require__(801)
module.exports = wrappy(once)
module.exports.strict = wrappy(onceStrict)

once.proto = once(function () {
  Object.defineProperty(Function.prototype, 'once', {
    value: function () {
      return once(this)
    },
    configurable: true
  })

  Object.defineProperty(Function.prototype, 'onceStrict', {
    value: function () {
      return onceStrict(this)
    },
    configurable: true
  })
})

function once (fn) {
  var f = function () {
    if (f.called) return f.value
    f.called = true
    return f.value = fn.apply(this, arguments)
  }
  f.called = false
  return f
}

function onceStrict (fn) {
  var f = function () {
    if (f.called)
      throw new Error(f.onceError)
    f.called = true
    return f.value = fn.apply(this, arguments)
  }
  var name = fn.name || 'Function wrapped with `once`'
  f.onceError = name + " shouldn't be called more than once"
  f.called = false
  return f
}


/***/ }),

/***/ 2539:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var once = __webpack_require__(8576)
var eos = __webpack_require__(221)
var fs = __webpack_require__(7147) // we only need fs to get the ReadStream and WriteStream prototypes

var noop = function () {}
var ancient = /^v?\.0/.test(process.version)

var isFn = function (fn) {
  return typeof fn === 'function'
}

var isFS = function (stream) {
  if (!ancient) return false // newer node version do not need to care about fs is a special way
  if (!fs) return false // browser
  return (stream instanceof (fs.ReadStream || noop) || stream instanceof (fs.WriteStream || noop)) && isFn(stream.close)
}

var isRequest = function (stream) {
  return stream.setHeader && isFn(stream.abort)
}

var destroyer = function (stream, reading, writing, callback) {
  callback = once(callback)

  var closed = false
  stream.on('close', function () {
    closed = true
  })

  eos(stream, {readable: reading, writable: writing}, function (err) {
    if (err) return callback(err)
    closed = true
    callback()
  })

  var destroyed = false
  return function (err) {
    if (closed) return
    if (destroyed) return
    destroyed = true

    if (isFS(stream)) return stream.close(noop) // use close for fs streams to avoid fd leaks
    if (isRequest(stream)) return stream.abort() // request.destroy just do .end - .abort is what we want

    if (isFn(stream.destroy)) return stream.destroy()

    callback(err || new Error('stream was destroyed'))
  }
}

var call = function (fn) {
  fn()
}

var pipe = function (from, to) {
  return from.pipe(to)
}

var pump = function () {
  var streams = Array.prototype.slice.call(arguments)
  var callback = isFn(streams[streams.length - 1] || noop) && streams.pop() || noop

  if (Array.isArray(streams[0])) streams = streams[0]
  if (streams.length < 2) throw new Error('pump requires two streams per minimum')

  var error
  var destroys = streams.map(function (stream, i) {
    var reading = i < streams.length - 1
    var writing = i > 0
    return destroyer(stream, reading, writing, function (err) {
      if (!error) error = err
      if (err) destroys.forEach(call)
      if (reading) return
      destroys.forEach(call)
      callback(error)
    })
  })

  return streams.reduce(pipe)
}

module.exports = pump


/***/ }),

/***/ 1629:
/***/ ((module) => {

"use strict";


class QuickLRU {
	constructor(options = {}) {
		if (!(options.maxSize && options.maxSize > 0)) {
			throw new TypeError('`maxSize` must be a number greater than 0');
		}

		this.maxSize = options.maxSize;
		this.onEviction = options.onEviction;
		this.cache = new Map();
		this.oldCache = new Map();
		this._size = 0;
	}

	_set(key, value) {
		this.cache.set(key, value);
		this._size++;

		if (this._size >= this.maxSize) {
			this._size = 0;

			if (typeof this.onEviction === 'function') {
				for (const [key, value] of this.oldCache.entries()) {
					this.onEviction(key, value);
				}
			}

			this.oldCache = this.cache;
			this.cache = new Map();
		}
	}

	get(key) {
		if (this.cache.has(key)) {
			return this.cache.get(key);
		}

		if (this.oldCache.has(key)) {
			const value = this.oldCache.get(key);
			this.oldCache.delete(key);
			this._set(key, value);
			return value;
		}
	}

	set(key, value) {
		if (this.cache.has(key)) {
			this.cache.set(key, value);
		} else {
			this._set(key, value);
		}

		return this;
	}

	has(key) {
		return this.cache.has(key) || this.oldCache.has(key);
	}

	peek(key) {
		if (this.cache.has(key)) {
			return this.cache.get(key);
		}

		if (this.oldCache.has(key)) {
			return this.oldCache.get(key);
		}
	}

	delete(key) {
		const deleted = this.cache.delete(key);
		if (deleted) {
			this._size--;
		}

		return this.oldCache.delete(key) || deleted;
	}

	clear() {
		this.cache.clear();
		this.oldCache.clear();
		this._size = 0;
	}

	* keys() {
		for (const [key] of this) {
			yield key;
		}
	}

	* values() {
		for (const [, value] of this) {
			yield value;
		}
	}

	* [Symbol.iterator]() {
		for (const item of this.cache) {
			yield item;
		}

		for (const item of this.oldCache) {
			const [key] = item;
			if (!this.cache.has(key)) {
				yield item;
			}
		}
	}

	get size() {
		let oldCacheSize = 0;
		for (const key of this.oldCache.keys()) {
			if (!this.cache.has(key)) {
				oldCacheSize++;
			}
		}

		return Math.min(this._size + oldCacheSize, this.maxSize);
	}
}

module.exports = QuickLRU;


/***/ }),

/***/ 3711:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

const tls = __webpack_require__(4404);

module.exports = (options = {}, connect = tls.connect) => new Promise((resolve, reject) => {
	let timeout = false;

	let socket;

	const callback = async () => {
		await socketPromise;

		socket.off('timeout', onTimeout);
		socket.off('error', reject);

		if (options.resolveSocket) {
			resolve({alpnProtocol: socket.alpnProtocol, socket, timeout});

			if (timeout) {
				await Promise.resolve();
				socket.emit('timeout');
			}
		} else {
			socket.destroy();
			resolve({alpnProtocol: socket.alpnProtocol, timeout});
		}
	};

	const onTimeout = async () => {
		timeout = true;
		callback();
	};

	const socketPromise = (async () => {
		try {
			socket = await connect(options, callback);

			socket.on('error', reject);
			socket.once('timeout', onTimeout);
		} catch (error) {
			reject(error);
		}
	})();
});


/***/ }),

/***/ 6064:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const Readable = (__webpack_require__(2781).Readable);
const lowercaseKeys = __webpack_require__(7519);

class Response extends Readable {
	constructor(statusCode, headers, body, url) {
		if (typeof statusCode !== 'number') {
			throw new TypeError('Argument `statusCode` should be a number');
		}
		if (typeof headers !== 'object') {
			throw new TypeError('Argument `headers` should be an object');
		}
		if (!(body instanceof Buffer)) {
			throw new TypeError('Argument `body` should be a buffer');
		}
		if (typeof url !== 'string') {
			throw new TypeError('Argument `url` should be a string');
		}

		super();
		this.statusCode = statusCode;
		this.headers = lowercaseKeys(headers);
		this.body = body;
		this.url = url;
	}

	_read() {
		this.push(this.body);
		this.push(null);
	}
}

module.exports = Response;


/***/ }),

/***/ 2600:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getChildByText = exports.findChildByText = exports.getChildById = exports.findChildById = exports.findClickableParent = exports.getById = exports.findAllById = exports.findAllByDescContains = exports.findByDescContains = exports.findAllByTextContains = exports.findByTextContains = exports.findById = exports.defaultTimeout = exports.defaultinterval = void 0;
var accessibility_1 = __webpack_require__(8794);
var lang_1 = __webpack_require__(744);
exports.defaultinterval = 200; // 检查控件是否出现的间隔 单位 毫秒
exports.defaultTimeout = 15000; // 控件出现超时 单位 毫秒
function findById(id, interval, timeout) {
    return __awaiter(this, void 0, void 0, function () {
        var item, i, t, m;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    item = null;
                    i = interval || exports.defaultinterval;
                    t = timeout || exports.defaultTimeout;
                    m = new Date().getTime() + t;
                    console.log("开始查询" + id);
                    _a.label = 1;
                case 1:
                    if (!(item == null && m >= new Date().getTime())) return [3 /*break*/, 5];
                    return [4 /*yield*/, (0, accessibility_1.select)({ id: id }).firstOrNull()];
                case 2:
                    item = _a.sent();
                    if (!!item) return [3 /*break*/, 4];
                    return [4 /*yield*/, (0, lang_1.delay)(i)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [3 /*break*/, 1];
                case 5: return [2 /*return*/, item];
            }
        });
    });
}
exports.findById = findById;
function findByTextContains(text, interval, timeout) {
    return __awaiter(this, void 0, void 0, function () {
        var item, i, t, m;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    item = null;
                    i = interval || exports.defaultinterval;
                    t = timeout || exports.defaultTimeout;
                    m = new Date().getTime() + t;
                    _a.label = 1;
                case 1:
                    if (!(item == null && m >= new Date().getTime())) return [3 /*break*/, 5];
                    return [4 /*yield*/, (0, accessibility_1.select)({ text: new RegExp(text) }).firstOrNull()];
                case 2:
                    item = _a.sent();
                    if (!!item) return [3 /*break*/, 4];
                    return [4 /*yield*/, (0, lang_1.delay)(i)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [3 /*break*/, 1];
                case 5: return [2 /*return*/, item];
            }
        });
    });
}
exports.findByTextContains = findByTextContains;
function findAllByTextContains(text, interval, timeout) {
    return __awaiter(this, void 0, void 0, function () {
        var items, i, t, m;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    items = [];
                    i = interval || exports.defaultinterval;
                    t = timeout || exports.defaultTimeout;
                    m = new Date().getTime() + t;
                    _a.label = 1;
                case 1:
                    if (!(items.length === 0 && m >= new Date().getTime())) return [3 /*break*/, 5];
                    return [4 /*yield*/, (0, accessibility_1.select)({ text: new RegExp(text) }).all()];
                case 2:
                    items = _a.sent();
                    if (!(items.length === 0)) return [3 /*break*/, 4];
                    return [4 /*yield*/, (0, lang_1.delay)(i)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [3 /*break*/, 1];
                case 5: return [2 /*return*/, items];
            }
        });
    });
}
exports.findAllByTextContains = findAllByTextContains;
function findByDescContains(text, interval, timeout) {
    return __awaiter(this, void 0, void 0, function () {
        var item, i, t, m;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    item = null;
                    i = interval || exports.defaultinterval;
                    t = timeout || exports.defaultTimeout;
                    m = new Date().getTime() + t;
                    _a.label = 1;
                case 1:
                    if (!(item == null && m >= new Date().getTime())) return [3 /*break*/, 5];
                    return [4 /*yield*/, (0, accessibility_1.select)({ desc: new RegExp(text) }).firstOrNull()];
                case 2:
                    item = _a.sent();
                    if (!!item) return [3 /*break*/, 4];
                    return [4 /*yield*/, (0, lang_1.delay)(i)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [3 /*break*/, 1];
                case 5: return [2 /*return*/, item];
            }
        });
    });
}
exports.findByDescContains = findByDescContains;
function findAllByDescContains(text, interval, timeout) {
    return __awaiter(this, void 0, void 0, function () {
        var items, i, t, m;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    items = [];
                    i = interval || exports.defaultinterval;
                    t = timeout || exports.defaultTimeout;
                    m = new Date().getTime() + t;
                    _a.label = 1;
                case 1:
                    if (!(items.length === 0 && m >= new Date().getTime())) return [3 /*break*/, 5];
                    return [4 /*yield*/, (0, accessibility_1.select)({ desc: new RegExp(text) }).all()];
                case 2:
                    items = _a.sent();
                    if (!(items.length === 0)) return [3 /*break*/, 4];
                    return [4 /*yield*/, (0, lang_1.delay)(i)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [3 /*break*/, 1];
                case 5: return [2 /*return*/, items];
            }
        });
    });
}
exports.findAllByDescContains = findAllByDescContains;
function findAllById(id, interval, timeout) {
    return __awaiter(this, void 0, void 0, function () {
        var items, i, t, m;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    items = [];
                    i = interval || exports.defaultinterval;
                    t = timeout || exports.defaultTimeout;
                    m = new Date().getTime() + t;
                    _a.label = 1;
                case 1:
                    if (!(items.length === 0 && m >= new Date().getTime())) return [3 /*break*/, 5];
                    return [4 /*yield*/, (0, accessibility_1.select)({ id: id }).all()];
                case 2:
                    items = _a.sent();
                    if (!(items.length === 0)) return [3 /*break*/, 4];
                    return [4 /*yield*/, (0, lang_1.delay)(i)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [3 /*break*/, 1];
                case 5: return [2 /*return*/, items];
            }
        });
    });
}
exports.findAllById = findAllById;
function getById(id, interval, timeout) {
    return __awaiter(this, void 0, void 0, function () {
        var item;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, findById(id, interval, timeout)];
                case 1:
                    item = _a.sent();
                    if (!item) {
                        throw new Error("未找到Id:" + id);
                    }
                    return [2 /*return*/, item];
            }
        });
    });
}
exports.getById = getById;
function findClickableParent(uiObject) {
    if (uiObject.clickable) {
        return uiObject;
    }
    var parent = uiObject.parent;
    while (parent) {
        if (parent.clickable) {
            return parent;
        }
        else {
            parent = parent.parent;
        }
    }
    return undefined;
}
exports.findClickableParent = findClickableParent;
//深度优先遍历
function findChildById(uiObject, id) {
    if (uiObject.id === id) {
        return uiObject;
    }
    for (var _i = 0, _a = uiObject.children; _i < _a.length; _i++) {
        var child = _a[_i];
        var found = findChildById(child, id);
        if (found) {
            return found;
        }
    }
    return null;
}
exports.findChildById = findChildById;
//深度优先遍历
function getChildById(uiObject, id) {
    var child = findChildById(uiObject, id);
    if (!child) {
        throw new Error("未找到子节点Id:" + id);
    }
    return child;
}
exports.getChildById = getChildById;
//深度优先遍历
function findChildByText(uiObject, text) {
    if (uiObject.text === text) {
        return uiObject;
    }
    for (var _i = 0, _a = uiObject.children; _i < _a.length; _i++) {
        var child = _a[_i];
        var found = findChildByText(child, text);
        if (found) {
            return found;
        }
    }
    return null;
}
exports.findChildByText = findChildByText;
//深度优先遍历
function getChildByText(uiObject, id) {
    var child = findChildByText(uiObject, id);
    if (!child) {
        throw new Error("未找到子节点Id:" + id);
    }
    return child;
}
exports.getChildByText = getChildByText;


/***/ }),

/***/ 801:
/***/ ((module) => {

// Returns a wrapper function that returns a wrapped callback
// The wrapper function should do some stuff, and return a
// presumably different callback function.
// This makes sure that own properties are retained, so that
// decorations and such are not lost along the way.
module.exports = wrappy
function wrappy (fn, cb) {
  if (fn && cb) return wrappy(fn)(cb)

  if (typeof fn !== 'function')
    throw new TypeError('need wrapper function')

  Object.keys(fn).forEach(function (k) {
    wrapper[k] = fn[k]
  })

  return wrapper

  function wrapper() {
    var args = new Array(arguments.length)
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i]
    }
    var ret = fn.apply(this, args)
    var cb = args[args.length-1]
    if (typeof ret === 'function' && ret !== cb) {
      Object.keys(cb).forEach(function (k) {
        ret[k] = cb[k]
      })
    }
    return ret
  }
}


/***/ }),

/***/ 5757:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CabinStatusType = exports.getIpv6 = exports.PassengerType = exports.PassengerTypeFlag = exports.NameType = exports.CountryType = exports.IdentityCardType = exports.GenderType = exports.BuyTicketIssueOrderStatusType = exports.CabinClassType = exports.removeTrailingSlash = exports.downloadFile = exports.getCurrentVersion = exports.hotUpdate = exports.hotUpdateScript = exports.SignalRHandler = exports.startListen = exports.onVolumeDown = exports.AppDeviceStatusType = exports.MainActivity = exports.onMainActivityStarted = void 0;
const signalr_1 = __webpack_require__(6305);
const selector = __importStar(__webpack_require__(2600));
const accessibility_1 = __webpack_require__(8794);
const engines_1 = __webpack_require__(8207);
const device_1 = __webpack_require__(4138);
const got_1 = __importDefault(__webpack_require__(1580));
const shell_1 = __webpack_require__(7319);
const ui_1 = __webpack_require__(9272);
const fs_1 = __webpack_require__(7147);
const stream_1 = __importDefault(__webpack_require__(2781));
const util_1 = __webpack_require__(3837);
const app_1 = __webpack_require__(6863);
const pipeline = (0, util_1.promisify)(stream_1.default.pipeline);
var OnMainActivityStarted = [
    (mainActivity) => {
        mainActivity.autoService.on("click", function () {
            // 用户勾选无障碍服务的选项时，跳转到页面让用户去开启
            if (mainActivity.autoService.isChecked() &&
                !accessibility_1.accessibility.enabled) {
                accessibility_1.accessibility.enableService({
                    toast: true,
                });
            }
            else if (!mainActivity.autoService.isChecked() &&
                accessibility_1.accessibility.enabled) {
                accessibility_1.accessibility.service.disableSelf();
            }
        });
    },
];
function onMainActivityStarted(handler) {
    OnMainActivityStarted.push(handler);
}
exports.onMainActivityStarted = onMainActivityStarted;
class MainActivity extends ui_1.Activity {
    constructor() {
        super();
    }
    get initialStatusBar() {
        return { color: "#ffffff", light: true };
    }
    onResume() {
        super.onResume();
        if (accessibility_1.accessibility.enabled) {
            this.autoService.checked = true;
            this.confirm.enable = true;
            this.confirm.setText("启动");
        }
    }
    get layoutXml() {
        return `
<vertical>
    <card w="*" h="40" cardCornerRadius="2dp" cardElevation="1dp" gravity="center_vertical">
        <horizontal>
            <text text="${this.appName} v${this.version}" padding="18 8 8 8" gravity="center_vertical" />
        </horizontal>
    </card>

    <card w="*" h="40" cardCornerRadius="2dp" cardElevation="1dp" gravity="center_vertical">
        <horizontal>
            <text text="设备的Android ID" padding="18 8 8 8" gravity="center_vertical" />
            <text text="${device_1.device.androidId}" padding="18 8 8 8" gravity="center_vertical" />
        </horizontal>
    </card>
    <card w="*" h="40" cardCornerRadius="2dp" cardElevation="1dp" gravity="center_vertical">
        <horizontal>
            <text text="adb权限" padding="18 8 8 8" gravity="center_vertical" />
            <text text="${this.adbPermission ? "已获取" : "未获取"}" padding="18 8 8 8" gravity="center_vertical" />
        </horizontal>
    </card>
    <button id="grantPermission" margin="5" text="获取无障碍权限" bg="#5e7ce0" textColor="white"/>
    <button id="hotUpdate" margin="5" text="热更新" bg="#5e7ce0" textColor="white"/>

    <card w="*" h="40" margin="5" cardCornerRadius="2dp" cardElevation="1dp" gravity="center_vertical">
        <Switch id="autoService" text="无障碍服务" checked="${accessibility_1.accessibility.enabled}" padding="8 8 8 8" textSize="15sp" />
    </card>

    <card w="*" h="40" margin="5" cardCornerRadius="2dp" cardElevation="1dp" gravity="center_vertical">
        <horizontal>
            <text text="服务" padding="18 8 8 8" gravity="center_vertical" />
            <spinner id="spinner" entries="生产地址|测试地址|本地测试" />
        </horizontal>
    </card>

    <button id="confirm" margin="5" text="${accessibility_1.accessibility.enabled ? "启动" : "请先开启无障碍"}" bg="#5e7ce0" textColor="white" visibility="gone" enable="${accessibility_1.accessibility.enabled}"/>
    
    <button id="test" margin="5" text="测试" bg="#5e7ce0" textColor="white"/>

    <globalconsole id="console" w="*" h="300" />
</vertical>
`;
    }
    onContentViewSet(contentView) {
        this.spinner = contentView.findView("spinner");
        this.confirm = contentView.findView("confirm");
        this.grantPermission = contentView.findView("grantPermission");
        this.hotUpdate = contentView.findView("hotUpdate");
        this.autoService = contentView.findView("autoService");
        this.test = contentView.findView("test");
        OnMainActivityStarted.forEach((handler) => handler(this));
    }
}
exports.MainActivity = MainActivity;
var AppDeviceStatusType;
(function (AppDeviceStatusType) {
    AppDeviceStatusType[AppDeviceStatusType["Unknown"] = 0] = "Unknown";
    AppDeviceStatusType[AppDeviceStatusType["Initializing"] = 1] = "Initializing";
    AppDeviceStatusType[AppDeviceStatusType["Ready"] = 2] = "Ready";
    AppDeviceStatusType[AppDeviceStatusType["Processing"] = 3] = "Processing";
})(AppDeviceStatusType = exports.AppDeviceStatusType || (exports.AppDeviceStatusType = {}));
var onVolumeDownEventHandlers = [];
function onVolumeDown(handler) {
    onVolumeDownEventHandlers.push(handler);
}
exports.onVolumeDown = onVolumeDown;
function startListen() {
    // 启用按键监听
    accessibility_1.accessibility.enableKeyEvents();
    // 监听key_event事件，包含所有按键的所有事件
    accessibility_1.accessibility.on("key_down", (keyCode, event) => {
        // 25是音量下
        if (keyCode.toString() === "25") {
            onVolumeDownEventHandlers.forEach((handler) => handler());
        }
    });
}
exports.startListen = startListen;
class SignalRHandler {
    constructor(id, airline, ip) {
        this.onConnectedEventHandlers = [];
        this.account = "";
        this.ip = "";
        this.tags = [];
        this.id = id;
        this.airline = airline;
        this.ip = ip;
    }
    onConnected(eventHandler) {
        this.onConnectedEventHandlers.push(eventHandler);
    }
    start(url) {
        this.hubConnection = new signalr_1.HubConnectionBuilder()
            .withAutomaticReconnect(new RetryPolicy())
            .withUrl(url)
            .build();
        this.hubConnection.start().then(() => {
            this.whenConnected();
        });
        this.hubConnection.onreconnected((id) => {
            this.sendDeviceInfo();
        });
        this.hubConnection.on("GetAppDeviceInfo", () => {
            this.sendDeviceInfo();
        });
    }
    log(message) {
        this.hubConnection
            .send("Log", message)
            .then(() => console.log(`发送日志 ${message}`));
    }
    update(status, account, ip) {
        if (account !== undefined) {
            this.account = account;
        }
        this.status = status;
        this.hubConnection
            .send("Update", {
            airline: this.airline,
            account: this.account,
            id: this.id,
            status: this.status,
            ip: ip !== null && ip !== void 0 ? ip : this.ip,
            tags: this.tags,
        })
            .then(() => console.log(`已更新信息 ${this.account}:${this.status.toString()}`));
    }
    sendDeviceInfo() {
        this.hubConnection
            .send("Update", {
            airline: this.airline,
            account: this.account,
            id: this.id,
            status: this.status,
            ip: this.ip,
        })
            .then(() => console.log(`已更新信息 ${this.account}:${this.status.toString()}`));
    }
    whenConnected() {
        this.onConnectedEventHandlers.forEach((handler) => {
            handler();
        });
    }
}
exports.SignalRHandler = SignalRHandler;
class RetryPolicy {
    nextRetryDelayInMilliseconds(retryContext) {
        if (retryContext.previousRetryCount > 10000) {
            return null;
        }
        return Math.min(30, 2 * retryContext.previousRetryCount);
    }
}
async function hotUpdateScript(id) {
    var _a, _b, _c;
    const args = (0, engines_1.myEngine)().execArgv;
    let url = `${(_a = args === null || args === void 0 ? void 0 : args.host) !== null && _a !== void 0 ? _a : "http://192.168.16.149:33452"}/app/hot-update/js/${(_b = args === null || args === void 0 ? void 0 : args.appName) !== null && _b !== void 0 ? _b : "CZ"}/${(_c = args === null || args === void 0 ? void 0 : args.channel) !== null && _c !== void 0 ? _c : "scripts"}/download`;
    if (args === null || args === void 0 ? void 0 : args.version) {
        url += `/${args.version}`;
    }
    console.log(`热更新地址 ${url}`);
    await downloadFile(url, (0, engines_1.getRunningEngines)()[0].workingDirectory + "/dist/main.node.js");
    const result = await (0, shell_1.exec)(`ls ${(0, engines_1.getRunningEngines)()[0].workingDirectory} -la`);
    console.log(`${JSON.stringify(result)}`);
    (0, engines_1.execScriptFile)("./dist/main.node.js");
    console.log("热更新完成");
    $autojs.cancelKeepRunning(id);
}
exports.hotUpdateScript = hotUpdateScript;
async function hotUpdate(packageName, appName, appVersion, channel, host) {
    channel !== null && channel !== void 0 ? channel : (channel = "default");
    host !== null && host !== void 0 ? host : (host = "http://47.108.202.111:35698");
    host = removeTrailingSlash(host);
    host += "/app/hot-update";
    // 获取目前版本
    console.log(`开始热更新 ${host} ${appName} ${channel}`);
    appVersion !== null && appVersion !== void 0 ? appVersion : (appVersion = await getCurrentVersion(packageName));
    console.log(`当前版本 ${appVersion}`);
    if (!appVersion || appVersion.length === 0) {
        return;
    }
    try {
        // 获取服务器版本
        const { body: newVersion } = await got_1.default.get(`${host}/${appName}/${channel}`);
        console.log(`当前版本 ${appVersion} 最新版本 ${newVersion}`);
        if (!newVersion || newVersion.length === 0) {
            console.log(`不存在最新版本`);
            return;
        }
        if (newVersion !== appVersion) {
            // 如果版本不同则更新
            const fileName = `/storage/emulated/0/Download/${appName}_${channel}_${newVersion}.apk`;
            await downloadFile(`${host}/${appName}/${channel}/download/${newVersion}`, fileName);
            const installApk = (0, app_1.makeIntent)({
                action: "VIEW",
                data: `file://${fileName}`,
                flags: ["activity_new_task", "grant_read_uri_permission"],
            });
            $autojs.androidContext.startActivity(installApk);
            // 关闭程序
            process.exit(-8888);
        }
        else {
            console.log("当前是最新版本");
            return;
        }
    }
    catch (error) {
        console.log(`检查更新失败 ${error}`);
    }
}
exports.hotUpdate = hotUpdate;
async function getCurrentVersion(packageName) {
    const versionRegex = /\d+.\d+.\d+/;
    console.log(`打开应用设置 ${(0, app_1.openAppSettings)(packageName)}`);
    const versionText = await selector.getById("app_manager_details_appversion");
    const regexResult = versionRegex.exec(versionText.text);
    if (regexResult === null) {
        console.log(`获取当前版本失败，正则不匹配 ${versionText.text}}`);
        return "";
    }
    (0, accessibility_1.back)();
    return regexResult[0];
}
exports.getCurrentVersion = getCurrentVersion;
async function downloadFile(url, fileName) {
    return new Promise((resolve, reject) => {
        const downloadStream = got_1.default.stream(url);
        const fileWriterStream = (0, fs_1.createWriteStream)(fileName);
        downloadStream.on("downloadProgress", ({ transferred, total, percent }) => {
            const percentage = Math.round(percent * 100);
            console.error(`progress: ${transferred}/${total} (${percentage}%)`);
        });
        pipeline(downloadStream, fileWriterStream)
            .then(() => {
            console.log(`File downloaded to ${fileName}`);
            resolve();
        })
            .catch((error) => {
            const e = `下载出现异常 ` + error;
            console.error(e);
            reject(new Error(e));
        });
    });
}
exports.downloadFile = downloadFile;
function removeTrailingSlash(str) {
    return str.replace(/\/+$/, "");
}
exports.removeTrailingSlash = removeTrailingSlash;
var CabinClassType;
(function (CabinClassType) {
    CabinClassType[CabinClassType["Unknown"] = -1] = "Unknown";
    CabinClassType[CabinClassType["EconomyClass"] = 0] = "EconomyClass";
    CabinClassType[CabinClassType["PremiumEconomyClass"] = 1] = "PremiumEconomyClass";
    CabinClassType[CabinClassType["BusinessClass"] = 2] = "BusinessClass";
    CabinClassType[CabinClassType["FirstClass"] = 3] = "FirstClass";
})(CabinClassType = exports.CabinClassType || (exports.CabinClassType = {}));
var BuyTicketIssueOrderStatusType;
(function (BuyTicketIssueOrderStatusType) {
    BuyTicketIssueOrderStatusType[BuyTicketIssueOrderStatusType["Unknown"] = 0] = "Unknown";
    BuyTicketIssueOrderStatusType[BuyTicketIssueOrderStatusType["\u5F85\u652F\u4ED8"] = 1] = "\u5F85\u652F\u4ED8";
    BuyTicketIssueOrderStatusType[BuyTicketIssueOrderStatusType["\u5F85\u51FA\u7968"] = 2] = "\u5F85\u51FA\u7968";
    BuyTicketIssueOrderStatusType[BuyTicketIssueOrderStatusType["\u5DF2\u51FA\u7968"] = 3] = "\u5DF2\u51FA\u7968";
    BuyTicketIssueOrderStatusType[BuyTicketIssueOrderStatusType["\u5DF2\u53D6\u7968"] = 4] = "\u5DF2\u53D6\u7968";
    BuyTicketIssueOrderStatusType[BuyTicketIssueOrderStatusType["\u51FA\u7968\u5931\u8D25"] = 5] = "\u51FA\u7968\u5931\u8D25";
})(BuyTicketIssueOrderStatusType = exports.BuyTicketIssueOrderStatusType || (exports.BuyTicketIssueOrderStatusType = {}));
var GenderType;
(function (GenderType) {
    GenderType[GenderType["Male"] = 0] = "Male";
    GenderType[GenderType["Female"] = 1] = "Female";
})(GenderType = exports.GenderType || (exports.GenderType = {}));
var IdentityCardType;
(function (IdentityCardType) {
    /// <summary>
    /// 身份证
    /// </summary>
    IdentityCardType[IdentityCardType["NI"] = 0] = "NI";
    /// <summary>
    /// 护照
    /// </summary>
    IdentityCardType[IdentityCardType["PP"] = 1] = "PP";
    /// <summary>
    /// 军官证
    /// </summary>
    IdentityCardType[IdentityCardType["MI"] = 2] = "MI";
    /// <summary>
    /// 警官证
    /// </summary>
    IdentityCardType[IdentityCardType["JG"] = 3] = "JG";
    /// <summary>
    /// 外国人永久居留身份证
    /// </summary>
    IdentityCardType[IdentityCardType["RP"] = 4] = "RP";
    /// <summary>
    /// 港澳居民来往内地通行证
    /// </summary>
    IdentityCardType[IdentityCardType["HM"] = 5] = "HM";
    /// <summary>
    /// 台湾居民居住证
    /// </summary>
    IdentityCardType[IdentityCardType["TI"] = 6] = "TI";
    /// <summary>
    /// 台湾居民来往大陆通行证
    /// </summary>
    IdentityCardType[IdentityCardType["TW"] = 7] = "TW";
    /// <summary>
    /// 港澳居民居住证
    /// </summary>
    IdentityCardType[IdentityCardType["SX"] = 8] = "SX";
    /// <summary>
    /// 其他
    /// </summary>
    IdentityCardType[IdentityCardType["OT"] = 9] = "OT";
    /// <summary>
    /// 回乡证
    /// </summary>
    IdentityCardType[IdentityCardType["HX"] = 10] = "HX";
    /// <summary>
    /// 电子护照
    /// </summary>
    IdentityCardType[IdentityCardType["IP"] = 11] = "IP";
    /// <summary>
    /// 文职干部证
    /// </summary>
    IdentityCardType[IdentityCardType["AB"] = 12] = "AB";
    /// <summary>
    /// 义务兵证
    /// </summary>
    IdentityCardType[IdentityCardType["AC"] = 13] = "AC";
    /// <summary>
    /// 士官证
    /// </summary>
    IdentityCardType[IdentityCardType["AD"] = 14] = "AD";
    /// <summary>
    /// 文职人员证（军方证件）
    /// </summary>
    IdentityCardType[IdentityCardType["WR"] = 15] = "WR";
    /// <summary>
    /// 职工证（军方证件）
    /// </summary>
    IdentityCardType[IdentityCardType["ZG"] = 16] = "ZG";
    /// <summary>
    /// 武警士兵证
    /// </summary>
    IdentityCardType[IdentityCardType["SB"] = 17] = "SB";
    /// <summary>
    /// 大陆居民往来台湾通行证
    /// </summary>
    IdentityCardType[IdentityCardType["TT"] = 18] = "TT";
    /// <summary>
    /// 海员证
    /// </summary>
    IdentityCardType[IdentityCardType["HY"] = 19] = "HY";
    /// <summary>
    /// 驻华外交人员证
    /// </summary>
    IdentityCardType[IdentityCardType["WJ"] = 20] = "WJ";
    /// <summary>
    /// 户口本（十六周岁以下）
    /// </summary>
    IdentityCardType[IdentityCardType["HR"] = 21] = "HR";
    /// <summary>
    /// 出生医学证明（十六周岁以下）
    /// </summary>
    IdentityCardType[IdentityCardType["BC"] = 22] = "BC";
    /// <summary>
    /// 学生证（十六周岁以下）
    /// </summary>
    IdentityCardType[IdentityCardType["SD"] = 23] = "SD";
    /// <summary>
    /// 户口所在地公安机关出具的身份证明
    /// </summary>
    IdentityCardType[IdentityCardType["IC"] = 24] = "IC";
    /// <summary>
    /// 外国人永久居留证
    /// </summary>
    IdentityCardType[IdentityCardType["YJ"] = 25] = "YJ";
    /// <summary>
    /// 外国人出入境证
    /// </summary>
    IdentityCardType[IdentityCardType["PF"] = 26] = "PF";
})(IdentityCardType = exports.IdentityCardType || (exports.IdentityCardType = {}));
var CountryType;
(function (CountryType) {
    CountryType["CN"] = "\u4E2D\u56FD";
})(CountryType = exports.CountryType || (exports.CountryType = {}));
var NameType;
(function (NameType) {
    NameType[NameType["Chinese"] = 0] = "Chinese";
    NameType[NameType["English"] = 1] = "English";
})(NameType = exports.NameType || (exports.NameType = {}));
var PassengerTypeFlag;
(function (PassengerTypeFlag) {
    PassengerTypeFlag[PassengerTypeFlag["None"] = 0] = "None";
    PassengerTypeFlag[PassengerTypeFlag["Adult"] = 1] = "Adult";
    PassengerTypeFlag[PassengerTypeFlag["Child"] = 2] = "Child";
    PassengerTypeFlag[PassengerTypeFlag["Infant"] = 4] = "Infant";
})(PassengerTypeFlag = exports.PassengerTypeFlag || (exports.PassengerTypeFlag = {}));
var PassengerType;
(function (PassengerType) {
    PassengerType[PassengerType["Adult"] = 0] = "Adult";
    PassengerType[PassengerType["Child"] = 1] = "Child";
    PassengerType[PassengerType["Infant"] = 2] = "Infant";
})(PassengerType = exports.PassengerType || (exports.PassengerType = {}));
async function getIpv6() {
    var _a, _b, _c;
    const output = await (0, shell_1.exec)("ip address show wlan0", { adb: true });
    const ipv6Regex = /inet6\s(?<Ip>(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))).+?temporary/gm;
    const res = ipv6Regex.exec(output.stdout);
    return {
        success: ((_a = res === null || res === void 0 ? void 0 : res.groups) === null || _a === void 0 ? void 0 : _a.Ip) ? true : false,
        rawOutput: JSON.stringify(output),
        ip: (_c = (_b = res === null || res === void 0 ? void 0 : res.groups) === null || _b === void 0 ? void 0 : _b.Ip) !== null && _c !== void 0 ? _c : "",
    };
}
exports.getIpv6 = getIpv6;
var CabinStatusType;
(function (CabinStatusType) {
    CabinStatusType[CabinStatusType["I"] = -8] = "I";
    CabinStatusType[CabinStatusType["E"] = -7] = "E";
    CabinStatusType[CabinStatusType["R"] = -6] = "R";
    CabinStatusType[CabinStatusType["Z"] = -5] = "Z";
    CabinStatusType[CabinStatusType["X"] = -4] = "X";
    CabinStatusType[CabinStatusType["C"] = -3] = "C";
    CabinStatusType[CabinStatusType["S"] = -2] = "S";
    CabinStatusType[CabinStatusType["Q"] = -1] = "Q";
    CabinStatusType[CabinStatusType["L"] = 0] = "L";
    CabinStatusType[CabinStatusType["_1"] = 1] = "_1";
    CabinStatusType[CabinStatusType["_2"] = 2] = "_2";
    CabinStatusType[CabinStatusType["_3"] = 3] = "_3";
    CabinStatusType[CabinStatusType["_4"] = 4] = "_4";
    CabinStatusType[CabinStatusType["_5"] = 5] = "_5";
    CabinStatusType[CabinStatusType["_6"] = 6] = "_6";
    CabinStatusType[CabinStatusType["_7"] = 7] = "_7";
    CabinStatusType[CabinStatusType["_8"] = 8] = "_8";
    CabinStatusType[CabinStatusType["A"] = 9] = "A";
})(CabinStatusType = exports.CabinStatusType || (exports.CabinStatusType = {}));


/***/ }),

/***/ 1046:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var parse = _interopDefault(__webpack_require__(665));
var timezoneSupport = __webpack_require__(6946);
var parseFormat = __webpack_require__(7387);
var lookupConvert = __webpack_require__(645);
var formatDate = _interopDefault(__webpack_require__(6033));

/** @module date-fns */
/**
 * @category Common Helpers
 * @summary Convert the date from the given time zone to the local time.
 *
 * @description
 * Converts the given date from the given time zone to the local time and returns it as a new `Date` object.
 * Getters for local time parts of the input `Date` object (getFullYear, getMonth, ...) will be assumed to
 * return time in the given time zone.
 *
 * The time zone has to be specified as a canonical name from the [IANA time zone list]{@link https://en.wikipedia.org/wiki/List_of_tz_database_time_zones}.
 *
 * @param {Date|String|Number} argument - the value to convert
 * @param {Object} options - the object with options
 * @param {String} options.timeZone - the canonical name of the source time zone
 * @returns {Date} the parsed date in the local time zone
 *
 * @example
 * // Convert the time in the New York time zone to the local time:
 * const date = new Date(2018, 8, 2, 10, 0)
 * const result = convertToLocalTime(date, { timeZone: 'America/New_York' })
 * // Returns { date: Date, zone: { abbreviation: 'EDT', offset: -360 }
 * // The date will be "2018-09-02T16:00:00Z".
 */

function convertToLocalTime(argument, options) {
  var date = parse(argument);
  var timeZone = timezoneSupport.findTimeZone(options.timeZone);

  var _getUTCOffset = timezoneSupport.getUTCOffset(date, timeZone),
      offset = _getUTCOffset.offset;

  offset = date.getTimezoneOffset() - offset;
  return new Date(date.getTime() - offset * 60 * 1000);
}

/** @module date-fns */
/**
 * @category Common Helpers
 * @summary Convert the date from the local time to the given time zone.
 *
 * @description
 * Converts the given date from the local time to the given time zone and returns a new `Date` object, which has its local time set to it.
 * The returned `Date` object should not be used form comparisons or other computations. Only the its getters for the
 * local time parts can be used (getFullYear, getMonth, ...).
 *
 * The time zone has to be specified as a canonical name from the [IANA time zone list]{@link https://en.wikipedia.org/wiki/List_of_tz_database_time_zones}.
 *
 * @param {Date|String|Number} argument - the value to convert
 * @param {Object} options - the object with options
 * @param {String} options.timeZone - the canonical name of the target time zone
 * @returns {Date} the parsed date in the target time zone
 *
 * @example
 * // Convert the current local time to the New York time zone:
 * const result = convertToTimeZone(new Date(), { timeZone: 'America/New_York' })
 * Returns { date: Date, zone: { abbreviation: 'EST', offset: -300 }
 */

function convertToTimeZone(argument, options) {
  var date = parse(argument);
  var timeZone = timezoneSupport.findTimeZone(options.timeZone);

  var _getUTCOffset = timezoneSupport.getUTCOffset(date, timeZone),
      offset = _getUTCOffset.offset;

  offset -= date.getTimezoneOffset();
  return new Date(date.getTime() - offset * 60 * 1000);
}

/** @module date-fns */
/**
 * @category Common Helpers
 * @summary Parse the date string and convert it to the local time.
 *
 * @description
 * Returns the date parsed from the date string using the given format string and converts the parsed date to the local time.
 *
 * The following tokens are recognized in the format string:
 *
 * | Token  | Input example    | Description                       |
 * |--------|------------------|-----------------------------------|
 * | `YY`   | 18               | Two-digit year                    |
 * | `YYYY` | 2018             | Four-digit year                   |
 * | `M`    | 1-12             | Month, beginning at 1             |
 * | `MM`   | 01-12            | Month, 2-digits                   |
 * | `D`    | 1-31             | Day of month                      |
 * | `DD`   | 01-31            | Day of month, 2-digits            |
 * | `H`    | 0-23             | Hours                             |
 * | `HH`   | 00-23            | Hours, 2-digits                   |
 * | `h`    | 1-12             | Hours, 12-hour clock              |
 * | `hh`   | 01-12            | Hours, 12-hour clock, 2-digits    |
 * | `m`    | 0-59             | Minutes                           |
 * | `mm`   | 00-59            | Minutes, 2-digits                 |
 * | `s`    | 0-59             | Seconds                           |
 * | `ss`   | 00-59            | Seconds, 2-digits                 |
 * | `S`    | 0-9              | Hundreds of milliseconds, 1-digit |
 * | `SS`   | 00-99            | Tens of milliseconds, 2-digits    |
 * | `SSS`  | 000-999          | Milliseconds, 3-digits            |
 * | `z`    | EST              | Time zone abbreviation            |
 * | `Z`    | -5:00            | Offset from UTC, 2-digits         |
 * | `ZZ`   | -0500            | Compact offset from UTC, 2-digits |
 * | `A`    | AM PM            | Post or ante meridiem, upper-case |
 * | `a`    | am pm            | Post or ante meridiem, lower-case |
 *
 * To escape characters in the format string, wrap them in square brackets (e.g. `[G]`). Punctuation symbols (-:/.()) do not need to be wrapped.
 *
 * @param {String} dateString - the string to parse
 * @param {String} formatString - the custom format to parse the date from
 * @returns {Date} the parsed date in the local time zone
 *
 * @example
 * // Parse string '11.2.2014 11:30:30' to date in Berlin:
 * const result = parseFromTimeZone('11.2.2014 11:30:30', 'D.M.YYYY H:mm:ss')
 * // Returns Tue Feb 11 2014 10:30:30 UTC
 *
 * @example
 * // Parse string '02/11/2014 11:30:30' to date, New York time:
 * const result = parseFromString('02/11/2014 11:30:30 AM GMT-0500 (EDT)',
 *   'MM/DD/YYYY h:mm:ss.SSS A [GMT]ZZ (z)')
 * // Returns Tue Feb 11 2014 16:30:30 UTC
 */

function parseFromString(dateString, formatString) {
  var time = parseFormat.parseZonedTime(dateString, formatString);
  return lookupConvert.convertTimeToDate(time);
}

/** @module date-fns */
/**
 * @category Common Helpers
 * @summary Parse the date string and convert it from the specified time zone to the local time.
 *
 * @description
 * Returns the date parsed from the date string, optionally using the given format string, and convert the parsed date from the given time zone to the local time.
 *
 * If the format string is omitted, the date string will be parsed by `date-fns/parse`, which supports extended ISO 8601 formats.
 *
 * The following tokens are recognized in the format string:
 *
 * | Token  | Input example    | Description                       |
 * |--------|------------------|-----------------------------------|
 * | `YY`   | 18               | Two-digit year                    |
 * | `YYYY` | 2018             | Four-digit year                   |
 * | `M`    | 1-12             | Month, beginning at 1             |
 * | `MM`   | 01-12            | Month, 2-digits                   |
 * | `D`    | 1-31             | Day of month                      |
 * | `DD`   | 01-31            | Day of month, 2-digits            |
 * | `H`    | 0-23             | Hours                             |
 * | `HH`   | 00-23            | Hours, 2-digits                   |
 * | `h`    | 1-12             | Hours, 12-hour clock              |
 * | `hh`   | 01-12            | Hours, 12-hour clock, 2-digits    |
 * | `m`    | 0-59             | Minutes                           |
 * | `mm`   | 00-59            | Minutes, 2-digits                 |
 * | `s`    | 0-59             | Seconds                           |
 * | `ss`   | 00-59            | Seconds, 2-digits                 |
 * | `S`    | 0-9              | Hundreds of milliseconds, 1-digit |
 * | `SS`   | 00-99            | Tens of milliseconds, 2-digits    |
 * | `SSS`  | 000-999          | Milliseconds, 3-digits            |
 * | `z`    | EST              | Time zone abbreviation            |
 * | `Z`    | -5:00            | Offset from UTC, 2-digits         |
 * | `ZZ`   | -0500            | Compact offset from UTC, 2-digits |
 * | `A`    | AM PM            | Post or ante meridiem, upper-case |
 * | `a`    | am pm            | Post or ante meridiem, lower-case |
 *
 * To escape characters in the format string, wrap them in square brackets (e.g. `[G]`). Punctuation symbols (-:/.()) do not need to be wrapped.
 *
 * The time zone has to be specified as a canonical name from the [IANA time zone list]{@link https://en.wikipedia.org/wiki/List_of_tz_database_time_zones}.
 *
 * @param {String} dateString - the string to parse
 * @param {String} [formatString] - the custom format to parse the date from
 * @param {Object} options - the object with options
 * @param {0 | 1 | 2} [options.additionalDigits=2] - the additional number of digits in the extended year format
 * @param {String} options.timeZone - the canonical name of the source time zone
 * @returns {Date} the parsed date in the local time zone
 *
 * @example
 * // Parse string '2014-02-11 11:30:30 AM' to date, New York time:
 * const result = parseFromTimeZone('2014-02-11 11:30:30',
 *   { timeZone: 'America/New_York' })
 * // Returns Tue Feb 11 2014 16:30:30 UTC
 *
 * @example
 * // Parse string '11.2.2014 11:30:30' to date, Berlin time:
 * const result = parseFromTimeZone('11.2.2014 11:30:30',
 *   'D.M.YYYY H:mm:ss', { timeZone: 'Europe/Berlin' })
 * // Returns Tue Feb 11 2014 10:30:30 UTC
 *
 * @example
 * // Parse string '+02014101', if the additional number of digits
 * // in the extended year format is 1, Madrid time:
 * var result = parseFromTimeZone('+02014101',
 *   { additionalDigits: 1, timeZone: 'Europe/Madrid' })
 * //=> Fri Apr 10 2014 22:00:00 UTC
 */

function parseFromTimeZone(dateString, formatString, options) {
  if (typeof formatString !== 'string') {
    options = formatString;
    formatString = undefined;
  }

  var _options = options,
      timeZone = _options.timeZone;
  timeZone = timezoneSupport.findTimeZone(timeZone);

  if (formatString) {
    var time = parseFormat.parseZonedTime(dateString, formatString);
    var unixTime = timezoneSupport.getUnixTime(time, timeZone);
    return new Date(unixTime);
  }

  var date = parse(dateString, options);

  var _getUTCOffset = timezoneSupport.getUTCOffset(date, timeZone),
      offset = _getUTCOffset.offset;

  offset -= date.getTimezoneOffset();
  return new Date(date.getTime() + offset * 60 * 1000);
}

/** @module date-fns */
/**
 * @category Common Helpers
 * @summary Format the date in the specified time zone.
 *
 * @description
 * Returns the formatted date string in the given format, after converting it to the given time zone.
 *
 * The input date will be converted to the given time zone by default, using its UTC timestamp.
 * If the local time in the input date is already in the given time zone, set `options.convertTimeZone`
 * to `false`. Otherwise the date will be considered in local time and converted.
 *
 * The time zone has to be specified as a canonical name from the [IANA time zone list]{@link https://en.wikipedia.org/wiki/List_of_tz_database_time_zones}.
 *
 * The following tokens are recognized in the format string:
 *
 * | Unit                    | Token | Result examples                  |
 * |-------------------------|-------|----------------------------------|
 * | Month                   | M     | 1, 2, ..., 12                    |
 * |                         | Mo    | 1st, 2nd, ..., 12th              |
 * |                         | MM    | 01, 02, ..., 12                  |
 * |                         | MMM   | Jan, Feb, ..., Dec               |
 * |                         | MMMM  | January, February, ..., December |
 * | Quarter                 | Q     | 1, 2, 3, 4                       |
 * |                         | Qo    | 1st, 2nd, 3rd, 4th               |
 * | Day of month            | D     | 1, 2, ..., 31                    |
 * |                         | Do    | 1st, 2nd, ..., 31st              |
 * |                         | DD    | 01, 02, ..., 31                  |
 * | Day of year             | DDD   | 1, 2, ..., 366                   |
 * |                         | DDDo  | 1st, 2nd, ..., 366th             |
 * |                         | DDDD  | 001, 002, ..., 366               |
 * | Day of week             | d     | 0, 1, ..., 6                     |
 * |                         | do    | 0th, 1st, ..., 6th               |
 * |                         | dd    | Su, Mo, ..., Sa                  |
 * |                         | ddd   | Sun, Mon, ..., Sat               |
 * |                         | dddd  | Sunday, Monday, ..., Saturday    |
 * | Day of ISO week         | E     | 1, 2, ..., 7                     |
 * | ISO week                | W     | 1, 2, ..., 53                    |
 * |                         | Wo    | 1st, 2nd, ..., 53rd              |
 * |                         | WW    | 01, 02, ..., 53                  |
 * | Year                    | YY    | 00, 01, ..., 99                  |
 * |                         | YYYY  | 1900, 1901, ..., 2099            |
 * | ISO week-numbering year | GG    | 00, 01, ..., 99                  |
 * |                         | GGGG  | 1900, 1901, ..., 2099            |
 * | AM/PM                   | A     | AM, PM                           |
 * |                         | a     | am, pm                           |
 * |                         | aa    | a.m., p.m.                       |
 * | Hour                    | H     | 0, 1, ... 23                     |
 * |                         | HH    | 00, 01, ... 23                   |
 * |                         | h     | 1, 2, ..., 12                    |
 * |                         | hh    | 01, 02, ..., 12                  |
 * | Minute                  | m     | 0, 1, ..., 59                    |
 * |                         | mm    | 00, 01, ..., 59                  |
 * | Second                  | s     | 0, 1, ..., 59                    |
 * |                         | ss    | 00, 01, ..., 59                  |
 * | 1/10 of second          | S     | 0, 1, ..., 9                     |
 * | 1/100 of second         | SS    | 00, 01, ..., 99                  |
 * | Millisecond             | SSS   | 000, 001, ..., 999               |
 * | Timezone abbreviation   | z     | CET, CEST, EST, EDT, ...         |
 * | Timezone offset to UTC  | Z     | -01:00, +00:00, ... +12:00       |
 * |                         | ZZ    | -0100, +0000, ..., +1200         |
 * | Seconds timestamp       | X     | 512969520                        |
 * | Milliseconds timestamp  | x     | 512969520900                     |
 *
 * The characters wrapped in square brackets are escaped.
 *
 * The result may vary by locale.
 *
 * @param {Date|String|Number} argument - the original date
 * @param {String} formatString - the string of formatting tokens
 * @param {Object} options - the object with options
 * @param {Object} [options.locale=enLocale] - the locale object
 * @param {String} options.timeZone - the canonical name of the target time zone
 * @param {String} [options.convertTimeZone=true] - if the date should be converted to the given time zone before formatting
 * @returns {String} the formatted date string
 *
 * @example
 * // Represent midnight on 11 February 2014, UTC in middle-endian format, New York time:
 * var result = formatToTimeZone(
 *   new Date(Date.UTC(2014, 1, 11)),
 *   'MM/dd/yyyy h:mm A [GMT]Z (z)',
 *   { timeZone: 'America/New_York' }
 * )
 * // Returns '02/10/2014 7:00 PM GMT-0500 (EST)'
 *
 * @example
 * // Represent noon on 2 July 2014 in Esperanto, Madrid time:
 * var locale = require('date-fns/locale/eo')
 * var result = formatToTimeZone(
 *   new Date(2014, 6, 2, 12),
 *   "HH:mm, do 'de' MMMM yyyy (Zz)",
 *   { locale, timeZone: 'Europe/Madrid', convertTimeZone: false }
 * )
 * // Returns '12:00, 2-a de julio 2014 (+02:00 CEST)'
 */

function formatToTimeZone(argument, formatString, options) {
  var date = parse(argument);
  var timeZone = options.timeZone,
      convertTimeZone = options.convertTimeZone;
  timeZone = timezoneSupport.findTimeZone(timeZone);
  timeZone = timezoneSupport.getUTCOffset(date, timeZone);

  if (convertTimeZone !== false) {
    var offset = timeZone.offset - date.getTimezoneOffset();
    date = new Date(date.getTime() - offset * 60 * 1000);
  }

  formatString = formatTimeZoneTokens(formatString, timeZone);
  return formatDate(date, formatString, options);
}

function padToTwoDigits(number) {
  return number > 9 ? number : "0" + number;
}

function formatTimeZoneOffset(offset, separator) {
  var sign;

  if (offset <= 0) {
    offset = -offset;
    sign = '+';
  } else {
    sign = '-';
  }

  var hours = padToTwoDigits(Math.floor(offset / 60));
  var minutes = padToTwoDigits(offset % 60);
  return sign + hours + separator + minutes;
}

function formatTimeZoneTokens(format, timeZone) {
  return format.replace(/z|ZZ?/g, function (match) {
    switch (match) {
      case 'z':
        return "[" + timeZone.abbreviation + "]";

      case 'Z':
        return formatTimeZoneOffset(timeZone.offset, ':');

      default:
        // 'ZZ'
        return formatTimeZoneOffset(timeZone.offset, '');
    }
  });
}

exports.convertToLocalTime = convertToLocalTime;
exports.convertToTimeZone = convertToTimeZone;
exports.parseFromString = parseFromString;
exports.parseFromTimeZone = parseFromTimeZone;
exports.formatToTimeZone = formatToTimeZone;


/***/ }),

/***/ 8802:
/***/ ((module) => {

var MILLISECONDS_IN_MINUTE = 60000

/**
 * Google Chrome as of 67.0.3396.87 introduced timezones with offset that includes seconds.
 * They usually appear for dates that denote time before the timezones were introduced
 * (e.g. for 'Europe/Prague' timezone the offset is GMT+00:57:44 before 1 October 1891
 * and GMT+01:00:00 after that date)
 *
 * Date#getTimezoneOffset returns the offset in minutes and would return 57 for the example above,
 * which would lead to incorrect calculations.
 *
 * This function returns the timezone offset in milliseconds that takes seconds in account.
 */
module.exports = function getTimezoneOffsetInMilliseconds (dirtyDate) {
  var date = new Date(dirtyDate.getTime())
  var baseTimezoneOffset = date.getTimezoneOffset()
  date.setSeconds(0, 0)
  var millisecondsPartOfTimezoneOffset = date.getTime() % MILLISECONDS_IN_MINUTE

  return baseTimezoneOffset * MILLISECONDS_IN_MINUTE + millisecondsPartOfTimezoneOffset
}


/***/ }),

/***/ 9465:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var startOfDay = __webpack_require__(3627)

var MILLISECONDS_IN_MINUTE = 60000
var MILLISECONDS_IN_DAY = 86400000

/**
 * @category Day Helpers
 * @summary Get the number of calendar days between the given dates.
 *
 * @description
 * Get the number of calendar days between the given dates.
 *
 * @param {Date|String|Number} dateLeft - the later date
 * @param {Date|String|Number} dateRight - the earlier date
 * @returns {Number} the number of calendar days
 *
 * @example
 * // How many calendar days are between
 * // 2 July 2011 23:00:00 and 2 July 2012 00:00:00?
 * var result = differenceInCalendarDays(
 *   new Date(2012, 6, 2, 0, 0),
 *   new Date(2011, 6, 2, 23, 0)
 * )
 * //=> 366
 */
function differenceInCalendarDays (dirtyDateLeft, dirtyDateRight) {
  var startOfDayLeft = startOfDay(dirtyDateLeft)
  var startOfDayRight = startOfDay(dirtyDateRight)

  var timestampLeft = startOfDayLeft.getTime() -
    startOfDayLeft.getTimezoneOffset() * MILLISECONDS_IN_MINUTE
  var timestampRight = startOfDayRight.getTime() -
    startOfDayRight.getTimezoneOffset() * MILLISECONDS_IN_MINUTE

  // Round the number of days to the nearest integer
  // because the number of milliseconds in a day is not constant
  // (e.g. it's different in the day of the daylight saving time clock shift)
  return Math.round((timestampLeft - timestampRight) / MILLISECONDS_IN_DAY)
}

module.exports = differenceInCalendarDays


/***/ }),

/***/ 6033:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getDayOfYear = __webpack_require__(1357)
var getISOWeek = __webpack_require__(2991)
var getISOYear = __webpack_require__(5835)
var parse = __webpack_require__(665)
var isValid = __webpack_require__(8436)
var enLocale = __webpack_require__(1543)

/**
 * @category Common Helpers
 * @summary Format the date.
 *
 * @description
 * Return the formatted date string in the given format.
 *
 * Accepted tokens:
 * | Unit                    | Token | Result examples                  |
 * |-------------------------|-------|----------------------------------|
 * | Month                   | M     | 1, 2, ..., 12                    |
 * |                         | Mo    | 1st, 2nd, ..., 12th              |
 * |                         | MM    | 01, 02, ..., 12                  |
 * |                         | MMM   | Jan, Feb, ..., Dec               |
 * |                         | MMMM  | January, February, ..., December |
 * | Quarter                 | Q     | 1, 2, 3, 4                       |
 * |                         | Qo    | 1st, 2nd, 3rd, 4th               |
 * | Day of month            | D     | 1, 2, ..., 31                    |
 * |                         | Do    | 1st, 2nd, ..., 31st              |
 * |                         | DD    | 01, 02, ..., 31                  |
 * | Day of year             | DDD   | 1, 2, ..., 366                   |
 * |                         | DDDo  | 1st, 2nd, ..., 366th             |
 * |                         | DDDD  | 001, 002, ..., 366               |
 * | Day of week             | d     | 0, 1, ..., 6                     |
 * |                         | do    | 0th, 1st, ..., 6th               |
 * |                         | dd    | Su, Mo, ..., Sa                  |
 * |                         | ddd   | Sun, Mon, ..., Sat               |
 * |                         | dddd  | Sunday, Monday, ..., Saturday    |
 * | Day of ISO week         | E     | 1, 2, ..., 7                     |
 * | ISO week                | W     | 1, 2, ..., 53                    |
 * |                         | Wo    | 1st, 2nd, ..., 53rd              |
 * |                         | WW    | 01, 02, ..., 53                  |
 * | Year                    | YY    | 00, 01, ..., 99                  |
 * |                         | YYYY  | 1900, 1901, ..., 2099            |
 * | ISO week-numbering year | GG    | 00, 01, ..., 99                  |
 * |                         | GGGG  | 1900, 1901, ..., 2099            |
 * | AM/PM                   | A     | AM, PM                           |
 * |                         | a     | am, pm                           |
 * |                         | aa    | a.m., p.m.                       |
 * | Hour                    | H     | 0, 1, ... 23                     |
 * |                         | HH    | 00, 01, ... 23                   |
 * |                         | h     | 1, 2, ..., 12                    |
 * |                         | hh    | 01, 02, ..., 12                  |
 * | Minute                  | m     | 0, 1, ..., 59                    |
 * |                         | mm    | 00, 01, ..., 59                  |
 * | Second                  | s     | 0, 1, ..., 59                    |
 * |                         | ss    | 00, 01, ..., 59                  |
 * | 1/10 of second          | S     | 0, 1, ..., 9                     |
 * | 1/100 of second         | SS    | 00, 01, ..., 99                  |
 * | Millisecond             | SSS   | 000, 001, ..., 999               |
 * | Timezone                | Z     | -01:00, +00:00, ... +12:00       |
 * |                         | ZZ    | -0100, +0000, ..., +1200         |
 * | Seconds timestamp       | X     | 512969520                        |
 * | Milliseconds timestamp  | x     | 512969520900                     |
 *
 * The characters wrapped in square brackets are escaped.
 *
 * The result may vary by locale.
 *
 * @param {Date|String|Number} date - the original date
 * @param {String} [format='YYYY-MM-DDTHH:mm:ss.SSSZ'] - the string of tokens
 * @param {Object} [options] - the object with options
 * @param {Object} [options.locale=enLocale] - the locale object
 * @returns {String} the formatted date string
 *
 * @example
 * // Represent 11 February 2014 in middle-endian format:
 * var result = format(
 *   new Date(2014, 1, 11),
 *   'MM/DD/YYYY'
 * )
 * //=> '02/11/2014'
 *
 * @example
 * // Represent 2 July 2014 in Esperanto:
 * var eoLocale = require('date-fns/locale/eo')
 * var result = format(
 *   new Date(2014, 6, 2),
 *   'Do [de] MMMM YYYY',
 *   {locale: eoLocale}
 * )
 * //=> '2-a de julio 2014'
 */
function format (dirtyDate, dirtyFormatStr, dirtyOptions) {
  var formatStr = dirtyFormatStr ? String(dirtyFormatStr) : 'YYYY-MM-DDTHH:mm:ss.SSSZ'
  var options = dirtyOptions || {}

  var locale = options.locale
  var localeFormatters = enLocale.format.formatters
  var formattingTokensRegExp = enLocale.format.formattingTokensRegExp
  if (locale && locale.format && locale.format.formatters) {
    localeFormatters = locale.format.formatters

    if (locale.format.formattingTokensRegExp) {
      formattingTokensRegExp = locale.format.formattingTokensRegExp
    }
  }

  var date = parse(dirtyDate)

  if (!isValid(date)) {
    return 'Invalid Date'
  }

  var formatFn = buildFormatFn(formatStr, localeFormatters, formattingTokensRegExp)

  return formatFn(date)
}

var formatters = {
  // Month: 1, 2, ..., 12
  'M': function (date) {
    return date.getMonth() + 1
  },

  // Month: 01, 02, ..., 12
  'MM': function (date) {
    return addLeadingZeros(date.getMonth() + 1, 2)
  },

  // Quarter: 1, 2, 3, 4
  'Q': function (date) {
    return Math.ceil((date.getMonth() + 1) / 3)
  },

  // Day of month: 1, 2, ..., 31
  'D': function (date) {
    return date.getDate()
  },

  // Day of month: 01, 02, ..., 31
  'DD': function (date) {
    return addLeadingZeros(date.getDate(), 2)
  },

  // Day of year: 1, 2, ..., 366
  'DDD': function (date) {
    return getDayOfYear(date)
  },

  // Day of year: 001, 002, ..., 366
  'DDDD': function (date) {
    return addLeadingZeros(getDayOfYear(date), 3)
  },

  // Day of week: 0, 1, ..., 6
  'd': function (date) {
    return date.getDay()
  },

  // Day of ISO week: 1, 2, ..., 7
  'E': function (date) {
    return date.getDay() || 7
  },

  // ISO week: 1, 2, ..., 53
  'W': function (date) {
    return getISOWeek(date)
  },

  // ISO week: 01, 02, ..., 53
  'WW': function (date) {
    return addLeadingZeros(getISOWeek(date), 2)
  },

  // Year: 00, 01, ..., 99
  'YY': function (date) {
    return addLeadingZeros(date.getFullYear(), 4).substr(2)
  },

  // Year: 1900, 1901, ..., 2099
  'YYYY': function (date) {
    return addLeadingZeros(date.getFullYear(), 4)
  },

  // ISO week-numbering year: 00, 01, ..., 99
  'GG': function (date) {
    return String(getISOYear(date)).substr(2)
  },

  // ISO week-numbering year: 1900, 1901, ..., 2099
  'GGGG': function (date) {
    return getISOYear(date)
  },

  // Hour: 0, 1, ... 23
  'H': function (date) {
    return date.getHours()
  },

  // Hour: 00, 01, ..., 23
  'HH': function (date) {
    return addLeadingZeros(date.getHours(), 2)
  },

  // Hour: 1, 2, ..., 12
  'h': function (date) {
    var hours = date.getHours()
    if (hours === 0) {
      return 12
    } else if (hours > 12) {
      return hours % 12
    } else {
      return hours
    }
  },

  // Hour: 01, 02, ..., 12
  'hh': function (date) {
    return addLeadingZeros(formatters['h'](date), 2)
  },

  // Minute: 0, 1, ..., 59
  'm': function (date) {
    return date.getMinutes()
  },

  // Minute: 00, 01, ..., 59
  'mm': function (date) {
    return addLeadingZeros(date.getMinutes(), 2)
  },

  // Second: 0, 1, ..., 59
  's': function (date) {
    return date.getSeconds()
  },

  // Second: 00, 01, ..., 59
  'ss': function (date) {
    return addLeadingZeros(date.getSeconds(), 2)
  },

  // 1/10 of second: 0, 1, ..., 9
  'S': function (date) {
    return Math.floor(date.getMilliseconds() / 100)
  },

  // 1/100 of second: 00, 01, ..., 99
  'SS': function (date) {
    return addLeadingZeros(Math.floor(date.getMilliseconds() / 10), 2)
  },

  // Millisecond: 000, 001, ..., 999
  'SSS': function (date) {
    return addLeadingZeros(date.getMilliseconds(), 3)
  },

  // Timezone: -01:00, +00:00, ... +12:00
  'Z': function (date) {
    return formatTimezone(date.getTimezoneOffset(), ':')
  },

  // Timezone: -0100, +0000, ... +1200
  'ZZ': function (date) {
    return formatTimezone(date.getTimezoneOffset())
  },

  // Seconds timestamp: 512969520
  'X': function (date) {
    return Math.floor(date.getTime() / 1000)
  },

  // Milliseconds timestamp: 512969520900
  'x': function (date) {
    return date.getTime()
  }
}

function buildFormatFn (formatStr, localeFormatters, formattingTokensRegExp) {
  var array = formatStr.match(formattingTokensRegExp)
  var length = array.length

  var i
  var formatter
  for (i = 0; i < length; i++) {
    formatter = localeFormatters[array[i]] || formatters[array[i]]
    if (formatter) {
      array[i] = formatter
    } else {
      array[i] = removeFormattingTokens(array[i])
    }
  }

  return function (date) {
    var output = ''
    for (var i = 0; i < length; i++) {
      if (array[i] instanceof Function) {
        output += array[i](date, formatters)
      } else {
        output += array[i]
      }
    }
    return output
  }
}

function removeFormattingTokens (input) {
  if (input.match(/\[[\s\S]/)) {
    return input.replace(/^\[|]$/g, '')
  }
  return input.replace(/\\/g, '')
}

function formatTimezone (offset, delimeter) {
  delimeter = delimeter || ''
  var sign = offset > 0 ? '-' : '+'
  var absOffset = Math.abs(offset)
  var hours = Math.floor(absOffset / 60)
  var minutes = absOffset % 60
  return sign + addLeadingZeros(hours, 2) + delimeter + addLeadingZeros(minutes, 2)
}

function addLeadingZeros (number, targetLength) {
  var output = Math.abs(number).toString()
  while (output.length < targetLength) {
    output = '0' + output
  }
  return output
}

module.exports = format


/***/ }),

/***/ 1357:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var parse = __webpack_require__(665)
var startOfYear = __webpack_require__(7099)
var differenceInCalendarDays = __webpack_require__(9465)

/**
 * @category Day Helpers
 * @summary Get the day of the year of the given date.
 *
 * @description
 * Get the day of the year of the given date.
 *
 * @param {Date|String|Number} date - the given date
 * @returns {Number} the day of year
 *
 * @example
 * // Which day of the year is 2 July 2014?
 * var result = getDayOfYear(new Date(2014, 6, 2))
 * //=> 183
 */
function getDayOfYear (dirtyDate) {
  var date = parse(dirtyDate)
  var diff = differenceInCalendarDays(date, startOfYear(date))
  var dayOfYear = diff + 1
  return dayOfYear
}

module.exports = getDayOfYear


/***/ }),

/***/ 2991:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var parse = __webpack_require__(665)
var startOfISOWeek = __webpack_require__(6671)
var startOfISOYear = __webpack_require__(6676)

var MILLISECONDS_IN_WEEK = 604800000

/**
 * @category ISO Week Helpers
 * @summary Get the ISO week of the given date.
 *
 * @description
 * Get the ISO week of the given date.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param {Date|String|Number} date - the given date
 * @returns {Number} the ISO week
 *
 * @example
 * // Which week of the ISO-week numbering year is 2 January 2005?
 * var result = getISOWeek(new Date(2005, 0, 2))
 * //=> 53
 */
function getISOWeek (dirtyDate) {
  var date = parse(dirtyDate)
  var diff = startOfISOWeek(date).getTime() - startOfISOYear(date).getTime()

  // Round the number of days to the nearest integer
  // because the number of milliseconds in a week is not constant
  // (e.g. it's different in the week of the daylight saving time clock shift)
  return Math.round(diff / MILLISECONDS_IN_WEEK) + 1
}

module.exports = getISOWeek


/***/ }),

/***/ 5835:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var parse = __webpack_require__(665)
var startOfISOWeek = __webpack_require__(6671)

/**
 * @category ISO Week-Numbering Year Helpers
 * @summary Get the ISO week-numbering year of the given date.
 *
 * @description
 * Get the ISO week-numbering year of the given date,
 * which always starts 3 days before the year's first Thursday.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param {Date|String|Number} date - the given date
 * @returns {Number} the ISO week-numbering year
 *
 * @example
 * // Which ISO-week numbering year is 2 January 2005?
 * var result = getISOYear(new Date(2005, 0, 2))
 * //=> 2004
 */
function getISOYear (dirtyDate) {
  var date = parse(dirtyDate)
  var year = date.getFullYear()

  var fourthOfJanuaryOfNextYear = new Date(0)
  fourthOfJanuaryOfNextYear.setFullYear(year + 1, 0, 4)
  fourthOfJanuaryOfNextYear.setHours(0, 0, 0, 0)
  var startOfNextYear = startOfISOWeek(fourthOfJanuaryOfNextYear)

  var fourthOfJanuaryOfThisYear = new Date(0)
  fourthOfJanuaryOfThisYear.setFullYear(year, 0, 4)
  fourthOfJanuaryOfThisYear.setHours(0, 0, 0, 0)
  var startOfThisYear = startOfISOWeek(fourthOfJanuaryOfThisYear)

  if (date.getTime() >= startOfNextYear.getTime()) {
    return year + 1
  } else if (date.getTime() >= startOfThisYear.getTime()) {
    return year
  } else {
    return year - 1
  }
}

module.exports = getISOYear


/***/ }),

/***/ 6798:
/***/ ((module) => {

/**
 * @category Common Helpers
 * @summary Is the given argument an instance of Date?
 *
 * @description
 * Is the given argument an instance of Date?
 *
 * @param {*} argument - the argument to check
 * @returns {Boolean} the given argument is an instance of Date
 *
 * @example
 * // Is 'mayonnaise' a Date?
 * var result = isDate('mayonnaise')
 * //=> false
 */
function isDate (argument) {
  return argument instanceof Date
}

module.exports = isDate


/***/ }),

/***/ 8436:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isDate = __webpack_require__(6798)

/**
 * @category Common Helpers
 * @summary Is the given date valid?
 *
 * @description
 * Returns false if argument is Invalid Date and true otherwise.
 * Invalid Date is a Date, whose time value is NaN.
 *
 * Time value of Date: http://es5.github.io/#x15.9.1.1
 *
 * @param {Date} date - the date to check
 * @returns {Boolean} the date is valid
 * @throws {TypeError} argument must be an instance of Date
 *
 * @example
 * // For the valid date:
 * var result = isValid(new Date(2014, 1, 31))
 * //=> true
 *
 * @example
 * // For the invalid date:
 * var result = isValid(new Date(''))
 * //=> false
 */
function isValid (dirtyDate) {
  if (isDate(dirtyDate)) {
    return !isNaN(dirtyDate)
  } else {
    throw new TypeError(toString.call(dirtyDate) + ' is not an instance of Date')
  }
}

module.exports = isValid


/***/ }),

/***/ 6370:
/***/ ((module) => {

var commonFormatterKeys = [
  'M', 'MM', 'Q', 'D', 'DD', 'DDD', 'DDDD', 'd',
  'E', 'W', 'WW', 'YY', 'YYYY', 'GG', 'GGGG',
  'H', 'HH', 'h', 'hh', 'm', 'mm',
  's', 'ss', 'S', 'SS', 'SSS',
  'Z', 'ZZ', 'X', 'x'
]

function buildFormattingTokensRegExp (formatters) {
  var formatterKeys = []
  for (var key in formatters) {
    if (formatters.hasOwnProperty(key)) {
      formatterKeys.push(key)
    }
  }

  var formattingTokens = commonFormatterKeys
    .concat(formatterKeys)
    .sort()
    .reverse()
  var formattingTokensRegExp = new RegExp(
    '(\\[[^\\[]*\\])|(\\\\)?' + '(' + formattingTokens.join('|') + '|.)', 'g'
  )

  return formattingTokensRegExp
}

module.exports = buildFormattingTokensRegExp


/***/ }),

/***/ 9184:
/***/ ((module) => {

function buildDistanceInWordsLocale () {
  var distanceInWordsLocale = {
    lessThanXSeconds: {
      one: 'less than a second',
      other: 'less than {{count}} seconds'
    },

    xSeconds: {
      one: '1 second',
      other: '{{count}} seconds'
    },

    halfAMinute: 'half a minute',

    lessThanXMinutes: {
      one: 'less than a minute',
      other: 'less than {{count}} minutes'
    },

    xMinutes: {
      one: '1 minute',
      other: '{{count}} minutes'
    },

    aboutXHours: {
      one: 'about 1 hour',
      other: 'about {{count}} hours'
    },

    xHours: {
      one: '1 hour',
      other: '{{count}} hours'
    },

    xDays: {
      one: '1 day',
      other: '{{count}} days'
    },

    aboutXMonths: {
      one: 'about 1 month',
      other: 'about {{count}} months'
    },

    xMonths: {
      one: '1 month',
      other: '{{count}} months'
    },

    aboutXYears: {
      one: 'about 1 year',
      other: 'about {{count}} years'
    },

    xYears: {
      one: '1 year',
      other: '{{count}} years'
    },

    overXYears: {
      one: 'over 1 year',
      other: 'over {{count}} years'
    },

    almostXYears: {
      one: 'almost 1 year',
      other: 'almost {{count}} years'
    }
  }

  function localize (token, count, options) {
    options = options || {}

    var result
    if (typeof distanceInWordsLocale[token] === 'string') {
      result = distanceInWordsLocale[token]
    } else if (count === 1) {
      result = distanceInWordsLocale[token].one
    } else {
      result = distanceInWordsLocale[token].other.replace('{{count}}', count)
    }

    if (options.addSuffix) {
      if (options.comparison > 0) {
        return 'in ' + result
      } else {
        return result + ' ago'
      }
    }

    return result
  }

  return {
    localize: localize
  }
}

module.exports = buildDistanceInWordsLocale


/***/ }),

/***/ 7328:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var buildFormattingTokensRegExp = __webpack_require__(6370)

function buildFormatLocale () {
  // Note: in English, the names of days of the week and months are capitalized.
  // If you are making a new locale based on this one, check if the same is true for the language you're working on.
  // Generally, formatted dates should look like they are in the middle of a sentence,
  // e.g. in Spanish language the weekdays and months should be in the lowercase.
  var months3char = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  var monthsFull = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  var weekdays2char = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
  var weekdays3char = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  var weekdaysFull = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  var meridiemUppercase = ['AM', 'PM']
  var meridiemLowercase = ['am', 'pm']
  var meridiemFull = ['a.m.', 'p.m.']

  var formatters = {
    // Month: Jan, Feb, ..., Dec
    'MMM': function (date) {
      return months3char[date.getMonth()]
    },

    // Month: January, February, ..., December
    'MMMM': function (date) {
      return monthsFull[date.getMonth()]
    },

    // Day of week: Su, Mo, ..., Sa
    'dd': function (date) {
      return weekdays2char[date.getDay()]
    },

    // Day of week: Sun, Mon, ..., Sat
    'ddd': function (date) {
      return weekdays3char[date.getDay()]
    },

    // Day of week: Sunday, Monday, ..., Saturday
    'dddd': function (date) {
      return weekdaysFull[date.getDay()]
    },

    // AM, PM
    'A': function (date) {
      return (date.getHours() / 12) >= 1 ? meridiemUppercase[1] : meridiemUppercase[0]
    },

    // am, pm
    'a': function (date) {
      return (date.getHours() / 12) >= 1 ? meridiemLowercase[1] : meridiemLowercase[0]
    },

    // a.m., p.m.
    'aa': function (date) {
      return (date.getHours() / 12) >= 1 ? meridiemFull[1] : meridiemFull[0]
    }
  }

  // Generate ordinal version of formatters: M -> Mo, D -> Do, etc.
  var ordinalFormatters = ['M', 'D', 'DDD', 'd', 'Q', 'W']
  ordinalFormatters.forEach(function (formatterToken) {
    formatters[formatterToken + 'o'] = function (date, formatters) {
      return ordinal(formatters[formatterToken](date))
    }
  })

  return {
    formatters: formatters,
    formattingTokensRegExp: buildFormattingTokensRegExp(formatters)
  }
}

function ordinal (number) {
  var rem100 = number % 100
  if (rem100 > 20 || rem100 < 10) {
    switch (rem100 % 10) {
      case 1:
        return number + 'st'
      case 2:
        return number + 'nd'
      case 3:
        return number + 'rd'
    }
  }
  return number + 'th'
}

module.exports = buildFormatLocale


/***/ }),

/***/ 1543:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var buildDistanceInWordsLocale = __webpack_require__(9184)
var buildFormatLocale = __webpack_require__(7328)

/**
 * @category Locales
 * @summary English locale.
 */
module.exports = {
  distanceInWords: buildDistanceInWordsLocale(),
  format: buildFormatLocale()
}


/***/ }),

/***/ 665:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getTimezoneOffsetInMilliseconds = __webpack_require__(8802)
var isDate = __webpack_require__(6798)

var MILLISECONDS_IN_HOUR = 3600000
var MILLISECONDS_IN_MINUTE = 60000
var DEFAULT_ADDITIONAL_DIGITS = 2

var parseTokenDateTimeDelimeter = /[T ]/
var parseTokenPlainTime = /:/

// year tokens
var parseTokenYY = /^(\d{2})$/
var parseTokensYYY = [
  /^([+-]\d{2})$/, // 0 additional digits
  /^([+-]\d{3})$/, // 1 additional digit
  /^([+-]\d{4})$/ // 2 additional digits
]

var parseTokenYYYY = /^(\d{4})/
var parseTokensYYYYY = [
  /^([+-]\d{4})/, // 0 additional digits
  /^([+-]\d{5})/, // 1 additional digit
  /^([+-]\d{6})/ // 2 additional digits
]

// date tokens
var parseTokenMM = /^-(\d{2})$/
var parseTokenDDD = /^-?(\d{3})$/
var parseTokenMMDD = /^-?(\d{2})-?(\d{2})$/
var parseTokenWww = /^-?W(\d{2})$/
var parseTokenWwwD = /^-?W(\d{2})-?(\d{1})$/

// time tokens
var parseTokenHH = /^(\d{2}([.,]\d*)?)$/
var parseTokenHHMM = /^(\d{2}):?(\d{2}([.,]\d*)?)$/
var parseTokenHHMMSS = /^(\d{2}):?(\d{2}):?(\d{2}([.,]\d*)?)$/

// timezone tokens
var parseTokenTimezone = /([Z+-].*)$/
var parseTokenTimezoneZ = /^(Z)$/
var parseTokenTimezoneHH = /^([+-])(\d{2})$/
var parseTokenTimezoneHHMM = /^([+-])(\d{2}):?(\d{2})$/

/**
 * @category Common Helpers
 * @summary Convert the given argument to an instance of Date.
 *
 * @description
 * Convert the given argument to an instance of Date.
 *
 * If the argument is an instance of Date, the function returns its clone.
 *
 * If the argument is a number, it is treated as a timestamp.
 *
 * If an argument is a string, the function tries to parse it.
 * Function accepts complete ISO 8601 formats as well as partial implementations.
 * ISO 8601: http://en.wikipedia.org/wiki/ISO_8601
 *
 * If all above fails, the function passes the given argument to Date constructor.
 *
 * @param {Date|String|Number} argument - the value to convert
 * @param {Object} [options] - the object with options
 * @param {0 | 1 | 2} [options.additionalDigits=2] - the additional number of digits in the extended year format
 * @returns {Date} the parsed date in the local time zone
 *
 * @example
 * // Convert string '2014-02-11T11:30:30' to date:
 * var result = parse('2014-02-11T11:30:30')
 * //=> Tue Feb 11 2014 11:30:30
 *
 * @example
 * // Parse string '+02014101',
 * // if the additional number of digits in the extended year format is 1:
 * var result = parse('+02014101', {additionalDigits: 1})
 * //=> Fri Apr 11 2014 00:00:00
 */
function parse (argument, dirtyOptions) {
  if (isDate(argument)) {
    // Prevent the date to lose the milliseconds when passed to new Date() in IE10
    return new Date(argument.getTime())
  } else if (typeof argument !== 'string') {
    return new Date(argument)
  }

  var options = dirtyOptions || {}
  var additionalDigits = options.additionalDigits
  if (additionalDigits == null) {
    additionalDigits = DEFAULT_ADDITIONAL_DIGITS
  } else {
    additionalDigits = Number(additionalDigits)
  }

  var dateStrings = splitDateString(argument)

  var parseYearResult = parseYear(dateStrings.date, additionalDigits)
  var year = parseYearResult.year
  var restDateString = parseYearResult.restDateString

  var date = parseDate(restDateString, year)

  if (date) {
    var timestamp = date.getTime()
    var time = 0
    var offset

    if (dateStrings.time) {
      time = parseTime(dateStrings.time)
    }

    if (dateStrings.timezone) {
      offset = parseTimezone(dateStrings.timezone) * MILLISECONDS_IN_MINUTE
    } else {
      var fullTime = timestamp + time
      var fullTimeDate = new Date(fullTime)

      offset = getTimezoneOffsetInMilliseconds(fullTimeDate)

      // Adjust time when it's coming from DST
      var fullTimeDateNextDay = new Date(fullTime)
      fullTimeDateNextDay.setDate(fullTimeDate.getDate() + 1)
      var offsetDiff =
        getTimezoneOffsetInMilliseconds(fullTimeDateNextDay) -
        getTimezoneOffsetInMilliseconds(fullTimeDate)
      if (offsetDiff > 0) {
        offset += offsetDiff
      }
    }

    return new Date(timestamp + time + offset)
  } else {
    return new Date(argument)
  }
}

function splitDateString (dateString) {
  var dateStrings = {}
  var array = dateString.split(parseTokenDateTimeDelimeter)
  var timeString

  if (parseTokenPlainTime.test(array[0])) {
    dateStrings.date = null
    timeString = array[0]
  } else {
    dateStrings.date = array[0]
    timeString = array[1]
  }

  if (timeString) {
    var token = parseTokenTimezone.exec(timeString)
    if (token) {
      dateStrings.time = timeString.replace(token[1], '')
      dateStrings.timezone = token[1]
    } else {
      dateStrings.time = timeString
    }
  }

  return dateStrings
}

function parseYear (dateString, additionalDigits) {
  var parseTokenYYY = parseTokensYYY[additionalDigits]
  var parseTokenYYYYY = parseTokensYYYYY[additionalDigits]

  var token

  // YYYY or ±YYYYY
  token = parseTokenYYYY.exec(dateString) || parseTokenYYYYY.exec(dateString)
  if (token) {
    var yearString = token[1]
    return {
      year: parseInt(yearString, 10),
      restDateString: dateString.slice(yearString.length)
    }
  }

  // YY or ±YYY
  token = parseTokenYY.exec(dateString) || parseTokenYYY.exec(dateString)
  if (token) {
    var centuryString = token[1]
    return {
      year: parseInt(centuryString, 10) * 100,
      restDateString: dateString.slice(centuryString.length)
    }
  }

  // Invalid ISO-formatted year
  return {
    year: null
  }
}

function parseDate (dateString, year) {
  // Invalid ISO-formatted year
  if (year === null) {
    return null
  }

  var token
  var date
  var month
  var week

  // YYYY
  if (dateString.length === 0) {
    date = new Date(0)
    date.setUTCFullYear(year)
    return date
  }

  // YYYY-MM
  token = parseTokenMM.exec(dateString)
  if (token) {
    date = new Date(0)
    month = parseInt(token[1], 10) - 1
    date.setUTCFullYear(year, month)
    return date
  }

  // YYYY-DDD or YYYYDDD
  token = parseTokenDDD.exec(dateString)
  if (token) {
    date = new Date(0)
    var dayOfYear = parseInt(token[1], 10)
    date.setUTCFullYear(year, 0, dayOfYear)
    return date
  }

  // YYYY-MM-DD or YYYYMMDD
  token = parseTokenMMDD.exec(dateString)
  if (token) {
    date = new Date(0)
    month = parseInt(token[1], 10) - 1
    var day = parseInt(token[2], 10)
    date.setUTCFullYear(year, month, day)
    return date
  }

  // YYYY-Www or YYYYWww
  token = parseTokenWww.exec(dateString)
  if (token) {
    week = parseInt(token[1], 10) - 1
    return dayOfISOYear(year, week)
  }

  // YYYY-Www-D or YYYYWwwD
  token = parseTokenWwwD.exec(dateString)
  if (token) {
    week = parseInt(token[1], 10) - 1
    var dayOfWeek = parseInt(token[2], 10) - 1
    return dayOfISOYear(year, week, dayOfWeek)
  }

  // Invalid ISO-formatted date
  return null
}

function parseTime (timeString) {
  var token
  var hours
  var minutes

  // hh
  token = parseTokenHH.exec(timeString)
  if (token) {
    hours = parseFloat(token[1].replace(',', '.'))
    return (hours % 24) * MILLISECONDS_IN_HOUR
  }

  // hh:mm or hhmm
  token = parseTokenHHMM.exec(timeString)
  if (token) {
    hours = parseInt(token[1], 10)
    minutes = parseFloat(token[2].replace(',', '.'))
    return (hours % 24) * MILLISECONDS_IN_HOUR +
      minutes * MILLISECONDS_IN_MINUTE
  }

  // hh:mm:ss or hhmmss
  token = parseTokenHHMMSS.exec(timeString)
  if (token) {
    hours = parseInt(token[1], 10)
    minutes = parseInt(token[2], 10)
    var seconds = parseFloat(token[3].replace(',', '.'))
    return (hours % 24) * MILLISECONDS_IN_HOUR +
      minutes * MILLISECONDS_IN_MINUTE +
      seconds * 1000
  }

  // Invalid ISO-formatted time
  return null
}

function parseTimezone (timezoneString) {
  var token
  var absoluteOffset

  // Z
  token = parseTokenTimezoneZ.exec(timezoneString)
  if (token) {
    return 0
  }

  // ±hh
  token = parseTokenTimezoneHH.exec(timezoneString)
  if (token) {
    absoluteOffset = parseInt(token[2], 10) * 60
    return (token[1] === '+') ? -absoluteOffset : absoluteOffset
  }

  // ±hh:mm or ±hhmm
  token = parseTokenTimezoneHHMM.exec(timezoneString)
  if (token) {
    absoluteOffset = parseInt(token[2], 10) * 60 + parseInt(token[3], 10)
    return (token[1] === '+') ? -absoluteOffset : absoluteOffset
  }

  return 0
}

function dayOfISOYear (isoYear, week, day) {
  week = week || 0
  day = day || 0
  var date = new Date(0)
  date.setUTCFullYear(isoYear, 0, 4)
  var fourthOfJanuaryDay = date.getUTCDay() || 7
  var diff = week * 7 + day + 1 - fourthOfJanuaryDay
  date.setUTCDate(date.getUTCDate() + diff)
  return date
}

module.exports = parse


/***/ }),

/***/ 3627:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var parse = __webpack_require__(665)

/**
 * @category Day Helpers
 * @summary Return the start of a day for the given date.
 *
 * @description
 * Return the start of a day for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|String|Number} date - the original date
 * @returns {Date} the start of a day
 *
 * @example
 * // The start of a day for 2 September 2014 11:55:00:
 * var result = startOfDay(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 02 2014 00:00:00
 */
function startOfDay (dirtyDate) {
  var date = parse(dirtyDate)
  date.setHours(0, 0, 0, 0)
  return date
}

module.exports = startOfDay


/***/ }),

/***/ 6671:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var startOfWeek = __webpack_require__(1397)

/**
 * @category ISO Week Helpers
 * @summary Return the start of an ISO week for the given date.
 *
 * @description
 * Return the start of an ISO week for the given date.
 * The result will be in the local timezone.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param {Date|String|Number} date - the original date
 * @returns {Date} the start of an ISO week
 *
 * @example
 * // The start of an ISO week for 2 September 2014 11:55:00:
 * var result = startOfISOWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Mon Sep 01 2014 00:00:00
 */
function startOfISOWeek (dirtyDate) {
  return startOfWeek(dirtyDate, {weekStartsOn: 1})
}

module.exports = startOfISOWeek


/***/ }),

/***/ 6676:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getISOYear = __webpack_require__(5835)
var startOfISOWeek = __webpack_require__(6671)

/**
 * @category ISO Week-Numbering Year Helpers
 * @summary Return the start of an ISO week-numbering year for the given date.
 *
 * @description
 * Return the start of an ISO week-numbering year,
 * which always starts 3 days before the year's first Thursday.
 * The result will be in the local timezone.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param {Date|String|Number} date - the original date
 * @returns {Date} the start of an ISO year
 *
 * @example
 * // The start of an ISO week-numbering year for 2 July 2005:
 * var result = startOfISOYear(new Date(2005, 6, 2))
 * //=> Mon Jan 03 2005 00:00:00
 */
function startOfISOYear (dirtyDate) {
  var year = getISOYear(dirtyDate)
  var fourthOfJanuary = new Date(0)
  fourthOfJanuary.setFullYear(year, 0, 4)
  fourthOfJanuary.setHours(0, 0, 0, 0)
  var date = startOfISOWeek(fourthOfJanuary)
  return date
}

module.exports = startOfISOYear


/***/ }),

/***/ 1397:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var parse = __webpack_require__(665)

/**
 * @category Week Helpers
 * @summary Return the start of a week for the given date.
 *
 * @description
 * Return the start of a week for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|String|Number} date - the original date
 * @param {Object} [options] - the object with options
 * @param {Number} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
 * @returns {Date} the start of a week
 *
 * @example
 * // The start of a week for 2 September 2014 11:55:00:
 * var result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Sun Aug 31 2014 00:00:00
 *
 * @example
 * // If the week starts on Monday, the start of the week for 2 September 2014 11:55:00:
 * var result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0), {weekStartsOn: 1})
 * //=> Mon Sep 01 2014 00:00:00
 */
function startOfWeek (dirtyDate, dirtyOptions) {
  var weekStartsOn = dirtyOptions ? (Number(dirtyOptions.weekStartsOn) || 0) : 0

  var date = parse(dirtyDate)
  var day = date.getDay()
  var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn

  date.setDate(date.getDate() - diff)
  date.setHours(0, 0, 0, 0)
  return date
}

module.exports = startOfWeek


/***/ }),

/***/ 7099:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var parse = __webpack_require__(665)

/**
 * @category Year Helpers
 * @summary Return the start of a year for the given date.
 *
 * @description
 * Return the start of a year for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|String|Number} date - the original date
 * @returns {Date} the start of a year
 *
 * @example
 * // The start of a year for 2 September 2014 11:55:00:
 * var result = startOfYear(new Date(2014, 8, 2, 11, 55, 00))
 * //=> Wed Jan 01 2014 00:00:00
 */
function startOfYear (dirtyDate) {
  var cleanDate = parse(dirtyDate)
  var date = new Date(0)
  date.setFullYear(cleanDate.getFullYear(), 0, 1)
  date.setHours(0, 0, 0, 0)
  return date
}

module.exports = startOfYear


/***/ }),

/***/ 6946:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

function charCodeToInt(charCode) {
  if (charCode > 96) {
    return charCode - 87;
  } else if (charCode > 64) {
    return charCode - 29;
  }

  return charCode - 48;
}

function unpackBase60(string) {
  var parts = string.split('.');
  var whole = parts[0];
  var fractional = parts[1] || '';
  var multiplier = 1;
  var start = 0;
  var out = 0;
  var sign = 1; // handle negative numbers

  if (string.charCodeAt(0) === 45) {
    start = 1;
    sign = -1;
  } // handle digits before the decimal


  for (var i = start, length = whole.length; i < length; ++i) {
    var num = charCodeToInt(whole.charCodeAt(i));
    out = 60 * out + num;
  } // handle digits after the decimal
  // istanbul ignore next


  for (var _i = 0, _length = fractional.length; _i < _length; ++_i) {
    var _num = charCodeToInt(fractional.charCodeAt(_i));

    multiplier = multiplier / 60;
    out += _num * multiplier;
  }

  return out * sign;
}

function arrayToInt(array) {
  for (var i = 0, length = array.length; i < length; ++i) {
    array[i] = unpackBase60(array[i]);
  }
}

function intToUntil(array, length) {
  for (var i = 0; i < length; ++i) {
    array[i] = Math.round((array[i - 1] || 0) + array[i] * 60000);
  }

  array[length - 1] = Infinity;
}

function mapIndices(source, indices) {
  var out = [];

  for (var i = 0, length = indices.length; i < length; ++i) {
    out[i] = source[indices[i]];
  }

  return out;
}

function unpack(string) {
  var data = string.split('|');
  var offsets = data[2].split(' ');
  var indices = data[3].split('');
  var untils = data[4].split(' ');
  arrayToInt(offsets);
  arrayToInt(indices);
  arrayToInt(untils);
  intToUntil(untils, indices.length);
  var name = data[0];
  var abbreviations = mapIndices(data[1].split(' '), indices);
  var population = data[5] | 0;
  offsets = mapIndices(offsets, indices);
  return {
    name: name,
    abbreviations: abbreviations,
    offsets: offsets,
    untils: untils,
    population: population
  };
}

var zones;
var names;
var links;
var instances;

function populateTimeZones(_ref) {
  var zoneData = _ref.zones,
      linkData = _ref.links;
  zones = {};
  names = zoneData.map(function (packed) {
    var name = packed.substr(0, packed.indexOf('|'));
    zones[name] = packed;
    return name;
  });
  links = linkData.reduce(function (result, packed) {
    var _packed$split = packed.split('|'),
        name = _packed$split[0],
        alias = _packed$split[1];

    result[alias] = name;
    return result;
  }, {});
  instances = {};
}

function listTimeZones() {
  return names.slice();
}

function findTimeZone(alias) {
  var name = links[alias] || alias;
  var timeZone = instances[name];

  if (!timeZone) {
    var packed = zones[name];

    if (!packed) {
      throw new Error("Unknown time zone \"" + name + "\".");
    }

    timeZone = instances[name] = unpack(packed);
  }

  return timeZone;
}

function getUnixTimeFromUTC(_ref) {
  var year = _ref.year,
      month = _ref.month,
      day = _ref.day,
      hours = _ref.hours,
      minutes = _ref.minutes,
      _ref$seconds = _ref.seconds,
      seconds = _ref$seconds === void 0 ? 0 : _ref$seconds,
      _ref$milliseconds = _ref.milliseconds,
      milliseconds = _ref$milliseconds === void 0 ? 0 : _ref$milliseconds;
  return Date.UTC(year, month - 1, day, hours, minutes, seconds, milliseconds);
}

function getDateFromTime(_ref2) {
  var year = _ref2.year,
      month = _ref2.month,
      day = _ref2.day,
      hours = _ref2.hours,
      minutes = _ref2.minutes,
      _ref2$seconds = _ref2.seconds,
      seconds = _ref2$seconds === void 0 ? 0 : _ref2$seconds,
      _ref2$milliseconds = _ref2.milliseconds,
      milliseconds = _ref2$milliseconds === void 0 ? 0 : _ref2$milliseconds;
  return new Date(year, month - 1, day, hours, minutes, seconds, milliseconds);
}

function getUTCTime(date) {
  var year = date.getUTCFullYear();
  var month = date.getUTCMonth() + 1;
  var day = date.getUTCDate();
  var dayOfWeek = date.getUTCDay();
  var hours = date.getUTCHours();
  var minutes = date.getUTCMinutes();
  var seconds = date.getUTCSeconds() || 0;
  var milliseconds = date.getUTCMilliseconds() || 0;
  return {
    year: year,
    month: month,
    day: day,
    dayOfWeek: dayOfWeek,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
    milliseconds: milliseconds
  };
}

function getLocalTime(date) {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var dayOfWeek = date.getDay();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds() || 0;
  var milliseconds = date.getMilliseconds() || 0;
  return {
    year: year,
    month: month,
    day: day,
    dayOfWeek: dayOfWeek,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
    milliseconds: milliseconds
  };
}

function getDateTime(date, options) {
  var _ref3 = options || {},
      useUTC = _ref3.useUTC;

  var extract;

  if (useUTC === true) {
    extract = getUTCTime;
  } else if (useUTC === false) {
    extract = getLocalTime;
  } else {
    throw new Error('Extract local or UTC date? Set useUTC option.');
  }

  return extract(date);
}

function findTransitionIndex(unixTime, timeZone) {
  var untils = timeZone.untils;

  for (var i = 0, length = untils.length; i < length; ++i) {
    if (unixTime < untils[i]) {
      return i;
    }
  }
}

function getTransition(unixTime, timeZone) {
  var transitionIndex = findTransitionIndex(unixTime, timeZone);
  var abbreviation = timeZone.abbreviations[transitionIndex];
  var offset = timeZone.offsets[transitionIndex];
  return {
    abbreviation: abbreviation,
    offset: offset
  };
}

function attachEpoch(time, unixTime) {
  Object.defineProperty(time, 'epoch', {
    value: unixTime
  });
}

function getUTCOffset(date, timeZone) {
  var unixTime = typeof date === 'number' ? date : date.getTime();

  var _getTransition = getTransition(unixTime, timeZone),
      abbreviation = _getTransition.abbreviation,
      offset = _getTransition.offset;

  return {
    abbreviation: abbreviation,
    offset: offset
  };
}

function getZonedTime(date, timeZone) {
  var gotUnixTime = typeof date === 'number';
  var unixTime = gotUnixTime ? date : date.getTime();

  var _getTransition2 = getTransition(unixTime, timeZone),
      abbreviation = _getTransition2.abbreviation,
      offset = _getTransition2.offset;

  if (gotUnixTime || offset) {
    date = new Date(unixTime - offset * 60000);
  }

  var time = getUTCTime(date);
  time.zone = {
    abbreviation: abbreviation,
    offset: offset
  };
  attachEpoch(time, unixTime);
  return time;
}

function getUnixTime(time, timeZone) {
  var zone = time.zone,
      epoch = time.epoch;

  if (epoch) {
    if (timeZone) {
      throw new Error('Both epoch and other time zone specified. Omit the other one.');
    }

    return epoch;
  }

  var unixTime = getUnixTimeFromUTC(time);

  if (zone) {
    if (timeZone) {
      throw new Error('Both own and other time zones specified. Omit the other one.');
    }
  } else {
    if (!timeZone) {
      throw new Error('Missing other time zone.');
    }

    zone = getTransition(unixTime, timeZone);
  }

  return unixTime + zone.offset * 60000;
}

function setTimeZone(time, timeZone, options) {
  if (time instanceof Date) {
    time = getDateTime(time, options);
  } else {
    var _time = time,
        year = _time.year,
        month = _time.month,
        day = _time.day,
        hours = _time.hours,
        minutes = _time.minutes,
        _time$seconds = _time.seconds,
        seconds = _time$seconds === void 0 ? 0 : _time$seconds,
        _time$milliseconds = _time.milliseconds,
        milliseconds = _time$milliseconds === void 0 ? 0 : _time$milliseconds;
    time = {
      year: year,
      month: month,
      day: day,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
      milliseconds: milliseconds
    };
  }

  var unixTime = getUnixTimeFromUTC(time);
  var utcDate = new Date(unixTime);
  time.dayOfWeek = utcDate.getUTCDay();

  var _getTransition3 = getTransition(unixTime, timeZone),
      abbreviation = _getTransition3.abbreviation,
      offset = _getTransition3.offset;

  time.zone = {
    abbreviation: abbreviation,
    offset: offset
  };
  attachEpoch(time, unixTime + offset * 60000);
  return time;
}

function convertTimeToDate(time) {
  var epoch = time.epoch;

  if (epoch !== undefined) {
    return new Date(epoch);
  }

  var _ref = time.zone || {},
      offset = _ref.offset;

  if (offset === undefined) {
    return getDateFromTime(time);
  }

  var unixTime = getUnixTimeFromUTC(time);
  return new Date(unixTime + offset * 60000);
}

function convertDateToTime(date) {
  var time = getLocalTime(date);
  var match = /\(([^)]+)\)$/.exec(date.toTimeString());
  time.zone = {
    abbreviation: match ? match[1] // istanbul ignore next
    : '???',
    offset: date.getTimezoneOffset()
  };
  attachEpoch(time, date.getTime());
  return time;
}


populateTimeZones(data);

exports.listTimeZones = listTimeZones;
exports.findTimeZone = findTimeZone;
exports.getUTCOffset = getUTCOffset;
exports.getZonedTime = getZonedTime;
exports.getUnixTime = getUnixTime;
exports.setTimeZone = setTimeZone;
exports.convertTimeToDate = convertTimeToDate;
exports.convertDateToTime = convertDateToTime;


/***/ }),

/***/ 645:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

function charCodeToInt(charCode) {
  if (charCode > 96) {
    return charCode - 87;
  } else if (charCode > 64) {
    return charCode - 29;
  }

  return charCode - 48;
}

function unpackBase60(string) {
  var parts = string.split('.');
  var whole = parts[0];
  var fractional = parts[1] || '';
  var multiplier = 1;
  var start = 0;
  var out = 0;
  var sign = 1; // handle negative numbers

  if (string.charCodeAt(0) === 45) {
    start = 1;
    sign = -1;
  } // handle digits before the decimal


  for (var i = start, length = whole.length; i < length; ++i) {
    var num = charCodeToInt(whole.charCodeAt(i));
    out = 60 * out + num;
  } // handle digits after the decimal
  // istanbul ignore next


  for (var _i = 0, _length = fractional.length; _i < _length; ++_i) {
    var _num = charCodeToInt(fractional.charCodeAt(_i));

    multiplier = multiplier / 60;
    out += _num * multiplier;
  }

  return out * sign;
}

function arrayToInt(array) {
  for (var i = 0, length = array.length; i < length; ++i) {
    array[i] = unpackBase60(array[i]);
  }
}

function intToUntil(array, length) {
  for (var i = 0; i < length; ++i) {
    array[i] = Math.round((array[i - 1] || 0) + array[i] * 60000);
  }

  array[length - 1] = Infinity;
}

function mapIndices(source, indices) {
  var out = [];

  for (var i = 0, length = indices.length; i < length; ++i) {
    out[i] = source[indices[i]];
  }

  return out;
}

function unpack(string) {
  var data = string.split('|');
  var offsets = data[2].split(' ');
  var indices = data[3].split('');
  var untils = data[4].split(' ');
  arrayToInt(offsets);
  arrayToInt(indices);
  arrayToInt(untils);
  intToUntil(untils, indices.length);
  var name = data[0];
  var abbreviations = mapIndices(data[1].split(' '), indices);
  var population = data[5] | 0;
  offsets = mapIndices(offsets, indices);
  return {
    name: name,
    abbreviations: abbreviations,
    offsets: offsets,
    untils: untils,
    population: population
  };
}

var zones;
var names;
var links;
var instances;

function populateTimeZones(_ref) {
  var zoneData = _ref.zones,
      linkData = _ref.links;
  zones = {};
  names = zoneData.map(function (packed) {
    var name = packed.substr(0, packed.indexOf('|'));
    zones[name] = packed;
    return name;
  });
  links = linkData.reduce(function (result, packed) {
    var _packed$split = packed.split('|'),
        name = _packed$split[0],
        alias = _packed$split[1];

    result[alias] = name;
    return result;
  }, {});
  instances = {};
}

function listTimeZones() {
  return names.slice();
}

function findTimeZone(alias) {
  var name = links[alias] || alias;
  var timeZone = instances[name];

  if (!timeZone) {
    var packed = zones[name];

    if (!packed) {
      throw new Error("Unknown time zone \"" + name + "\".");
    }

    timeZone = instances[name] = unpack(packed);
  }

  return timeZone;
}

function getUnixTimeFromUTC(_ref) {
  var year = _ref.year,
      month = _ref.month,
      day = _ref.day,
      hours = _ref.hours,
      minutes = _ref.minutes,
      _ref$seconds = _ref.seconds,
      seconds = _ref$seconds === void 0 ? 0 : _ref$seconds,
      _ref$milliseconds = _ref.milliseconds,
      milliseconds = _ref$milliseconds === void 0 ? 0 : _ref$milliseconds;
  return Date.UTC(year, month - 1, day, hours, minutes, seconds, milliseconds);
}

function getDateFromTime(_ref2) {
  var year = _ref2.year,
      month = _ref2.month,
      day = _ref2.day,
      hours = _ref2.hours,
      minutes = _ref2.minutes,
      _ref2$seconds = _ref2.seconds,
      seconds = _ref2$seconds === void 0 ? 0 : _ref2$seconds,
      _ref2$milliseconds = _ref2.milliseconds,
      milliseconds = _ref2$milliseconds === void 0 ? 0 : _ref2$milliseconds;
  return new Date(year, month - 1, day, hours, minutes, seconds, milliseconds);
}

function getUTCTime(date) {
  var year = date.getUTCFullYear();
  var month = date.getUTCMonth() + 1;
  var day = date.getUTCDate();
  var dayOfWeek = date.getUTCDay();
  var hours = date.getUTCHours();
  var minutes = date.getUTCMinutes();
  var seconds = date.getUTCSeconds() || 0;
  var milliseconds = date.getUTCMilliseconds() || 0;
  return {
    year: year,
    month: month,
    day: day,
    dayOfWeek: dayOfWeek,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
    milliseconds: milliseconds
  };
}

function getLocalTime(date) {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var dayOfWeek = date.getDay();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds() || 0;
  var milliseconds = date.getMilliseconds() || 0;
  return {
    year: year,
    month: month,
    day: day,
    dayOfWeek: dayOfWeek,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
    milliseconds: milliseconds
  };
}

function getDateTime(date, options) {
  var _ref3 = options || {},
      useUTC = _ref3.useUTC;

  var extract;

  if (useUTC === true) {
    extract = getUTCTime;
  } else if (useUTC === false) {
    extract = getLocalTime;
  } else {
    throw new Error('Extract local or UTC date? Set useUTC option.');
  }

  return extract(date);
}

function findTransitionIndex(unixTime, timeZone) {
  var untils = timeZone.untils;

  for (var i = 0, length = untils.length; i < length; ++i) {
    if (unixTime < untils[i]) {
      return i;
    }
  }
}

function getTransition(unixTime, timeZone) {
  var transitionIndex = findTransitionIndex(unixTime, timeZone);
  var abbreviation = timeZone.abbreviations[transitionIndex];
  var offset = timeZone.offsets[transitionIndex];
  return {
    abbreviation: abbreviation,
    offset: offset
  };
}

function attachEpoch(time, unixTime) {
  Object.defineProperty(time, 'epoch', {
    value: unixTime
  });
}

function getUTCOffset(date, timeZone) {
  var unixTime = typeof date === 'number' ? date : date.getTime();

  var _getTransition = getTransition(unixTime, timeZone),
      abbreviation = _getTransition.abbreviation,
      offset = _getTransition.offset;

  return {
    abbreviation: abbreviation,
    offset: offset
  };
}

function getZonedTime(date, timeZone) {
  var gotUnixTime = typeof date === 'number';
  var unixTime = gotUnixTime ? date : date.getTime();

  var _getTransition2 = getTransition(unixTime, timeZone),
      abbreviation = _getTransition2.abbreviation,
      offset = _getTransition2.offset;

  if (gotUnixTime || offset) {
    date = new Date(unixTime - offset * 60000);
  }

  var time = getUTCTime(date);
  time.zone = {
    abbreviation: abbreviation,
    offset: offset
  };
  attachEpoch(time, unixTime);
  return time;
}

function getUnixTime(time, timeZone) {
  var zone = time.zone,
      epoch = time.epoch;

  if (epoch) {
    if (timeZone) {
      throw new Error('Both epoch and other time zone specified. Omit the other one.');
    }

    return epoch;
  }

  var unixTime = getUnixTimeFromUTC(time);

  if (zone) {
    if (timeZone) {
      throw new Error('Both own and other time zones specified. Omit the other one.');
    }
  } else {
    if (!timeZone) {
      throw new Error('Missing other time zone.');
    }

    zone = getTransition(unixTime, timeZone);
  }

  return unixTime + zone.offset * 60000;
}

function setTimeZone(time, timeZone, options) {
  if (time instanceof Date) {
    time = getDateTime(time, options);
  } else {
    var _time = time,
        year = _time.year,
        month = _time.month,
        day = _time.day,
        hours = _time.hours,
        minutes = _time.minutes,
        _time$seconds = _time.seconds,
        seconds = _time$seconds === void 0 ? 0 : _time$seconds,
        _time$milliseconds = _time.milliseconds,
        milliseconds = _time$milliseconds === void 0 ? 0 : _time$milliseconds;
    time = {
      year: year,
      month: month,
      day: day,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
      milliseconds: milliseconds
    };
  }

  var unixTime = getUnixTimeFromUTC(time);
  var utcDate = new Date(unixTime);
  time.dayOfWeek = utcDate.getUTCDay();

  var _getTransition3 = getTransition(unixTime, timeZone),
      abbreviation = _getTransition3.abbreviation,
      offset = _getTransition3.offset;

  time.zone = {
    abbreviation: abbreviation,
    offset: offset
  };
  attachEpoch(time, unixTime + offset * 60000);
  return time;
}

function convertTimeToDate(time) {
  var epoch = time.epoch;

  if (epoch !== undefined) {
    return new Date(epoch);
  }

  var _ref = time.zone || {},
      offset = _ref.offset;

  if (offset === undefined) {
    return getDateFromTime(time);
  }

  var unixTime = getUnixTimeFromUTC(time);
  return new Date(unixTime + offset * 60000);
}

function convertDateToTime(date) {
  var time = getLocalTime(date);
  var match = /\(([^)]+)\)$/.exec(date.toTimeString());
  time.zone = {
    abbreviation: match ? match[1] // istanbul ignore next
    : '???',
    offset: date.getTimezoneOffset()
  };
  attachEpoch(time, date.getTime());
  return time;
}

exports.populateTimeZones = populateTimeZones;
exports.listTimeZones = listTimeZones;
exports.findTimeZone = findTimeZone;
exports.getUTCOffset = getUTCOffset;
exports.getZonedTime = getZonedTime;
exports.getUnixTime = getUnixTime;
exports.setTimeZone = setTimeZone;
exports.convertTimeToDate = convertTimeToDate;
exports.convertDateToTime = convertDateToTime;


/***/ }),

/***/ 7387:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

var formattingTokens = /(\[[^[]*\])|([-:/.()\s]+)|(A|a|YYYY|YY?|MM?|DD?|d|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g;

var match1 = /\d/; // 0 - 9

var match2 = /\d\d/; // 00 - 99

var match3 = /\d{3}/; // 000 - 999

var match4 = /\d{4}/; // 0000 - 9999

var match1to2 = /\d\d?/; // 0 - 99

var matchUpperAMPM = /[AP]M/;
var matchLowerAMPM = /[ap]m/;
var matchSigned = /[+-]?\d+/; // -inf - inf

var matchOffset = /[+-]\d\d:?\d\d/; // +00:00 -00:00 +0000 or -0000

var matchAbbreviation = /[A-Z]{3,4}/; // CET

var parseTokenExpressions = {};
var parseTokenFunctions = {};
var parsers = {};

function correctDayPeriod(time) {
  var afternoon = time.afternoon;

  if (afternoon !== undefined) {
    var hours = time.hours;

    if (afternoon) {
      if (hours < 12) {
        time.hours += 12;
      }
    } else {
      if (hours === 12) {
        time.hours = 0;
      }
    }

    delete time.afternoon;
  }
}

function makeParser(format) {
  var array = format.match(formattingTokens);

  if (!array) {
    throw new Error("Invalid format: \"" + format + "\".");
  }

  var length = array.length;

  for (var i = 0; i < length; ++i) {
    var token = array[i];
    var regex = parseTokenExpressions[token];
    var parser = parseTokenFunctions[token];

    if (parser) {
      array[i] = {
        regex: regex,
        parser: parser
      };
    } else {
      array[i] = token.replace(/^\[|\]$/g, '');
    }
  }

  return function (input) {
    var time = {};

    for (var _i = 0, start = 0; _i < length; ++_i) {
      var _token = array[_i];

      if (typeof _token === 'string') {
        if (input.indexOf(_token, start) !== start) {
          var part = input.substr(start, _token.length);
          throw new Error("Expected \"" + _token + "\" at character " + start + ", found \"" + part + "\".");
        }

        start += _token.length;
      } else {
        var _regex = _token.regex,
            _parser = _token.parser;

        var _part = input.substr(start);

        var match = _regex.exec(_part);

        if (!match || match.index !== 0) {
          throw new Error("Matching \"" + _regex + "\" at character " + start + " failed with \"" + _part + "\".");
        }

        var value = match[0];

        _parser.call(time, value);

        start += value.length;
      }
    }

    correctDayPeriod(time);
    return time;
  };
}

function addExpressionToken(token, regex) {
  parseTokenExpressions[token] = regex;
}

function addParseToken(tokens, property) {
  if (typeof tokens === 'string') {
    tokens = [tokens];
  }

  var callback = typeof property === 'string' ? function (input) {
    this[property] = +input;
  } : property;

  for (var _iterator = tokens, _isArray = Array.isArray(_iterator), _i2 = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
    var _ref;

    if (_isArray) {
      if (_i2 >= _iterator.length) break;
      _ref = _iterator[_i2++];
    } else {
      _i2 = _iterator.next();
      if (_i2.done) break;
      _ref = _i2.value;
    }

    var token = _ref;
    parseTokenFunctions[token] = callback;
  }
}

function offsetFromString(string) {
  var parts = string.match(/([+-]|\d\d)/g);
  var minutes = +(parts[1] * 60) + +parts[2];
  return minutes === 0 ? 0 : parts[0] === '+' ? -minutes : minutes;
}

addExpressionToken('A', matchUpperAMPM);
addParseToken(['A'], function (input) {
  this.afternoon = input === 'PM';
});
addExpressionToken('a', matchLowerAMPM);
addParseToken(['a'], function (input) {
  this.afternoon = input === 'pm';
});
addExpressionToken('S', match1);
addExpressionToken('SS', match2);
addExpressionToken('SSS', match3);

var _loop = function _loop(token, factor) {
  addParseToken(token, function (input) {
    this.milliseconds = +input * factor;
  });
};

for (var token = 'S', factor = 100; factor >= 1; token += 'S', factor /= 10) {
  _loop(token, factor);
}

addExpressionToken('s', match1to2);
addExpressionToken('ss', match2);
addParseToken(['s', 'ss'], 'seconds');
addExpressionToken('m', match1to2);
addExpressionToken('mm', match2);
addParseToken(['m', 'mm'], 'minutes');
addExpressionToken('H', match1to2);
addExpressionToken('h', match1to2);
addExpressionToken('HH', match2);
addExpressionToken('hh', match2);
addParseToken(['H', 'HH', 'h', 'hh'], 'hours');
addExpressionToken('d', match1);
addParseToken('d', 'dayOfWeek');
addExpressionToken('D', match1to2);
addExpressionToken('DD', match2);
addParseToken(['D', 'DD'], 'day');
addExpressionToken('M', match1to2);
addExpressionToken('MM', match2);
addParseToken(['M', 'MM'], 'month');
addExpressionToken('Y', matchSigned);
addExpressionToken('YY', match2);
addExpressionToken('YYYY', match4);
addParseToken(['Y', 'YYYY'], 'year');
addParseToken('YY', function (input) {
  input = +input;
  this.year = input + (input > 68 ? 1900 : 2000);
});
addExpressionToken('z', matchAbbreviation);
addParseToken('z', function (input) {
  var zone = this.zone || (this.zone = {});
  zone.abbreviation = input;
});
addExpressionToken('Z', matchOffset);
addExpressionToken('ZZ', matchOffset);
addParseToken(['Z', 'ZZ'], function (input) {
  var zone = this.zone || (this.zone = {});
  zone.offset = offsetFromString(input);
});

function parseZonedTime(input, format) {
  var parser = parsers[format];

  if (!parser) {
    parser = parsers[format] = makeParser(format);
  }

  return parser(input);
}

function padToTwo(number) {
  return number > 9 ? number : '0' + number;
}

function padToThree(number) {
  return number > 99 ? number : number > 9 ? '0' + number : '00' + number;
}

function padToFour(number) {
  return number > 999 ? number : number > 99 ? '0' + number : number > 9 ? '00' + number : '000' + number;
}

var padToN = [undefined, undefined, padToTwo, padToThree, padToFour];

function padWithZeros(number, length) {
  return padToN[length](number);
}

var formatTokenFunctions = {};
var formatters = {};

function makeFormatter(format) {
  var array = format.match(formattingTokens);
  var length = array.length;

  for (var i = 0; i < length; ++i) {
    var token = array[i];
    var formatter = formatTokenFunctions[token];

    if (formatter) {
      array[i] = formatter;
    } else {
      array[i] = token.replace(/^\[|\]$/g, '');
    }
  }

  return function (time) {
    var output = '';

    for (var _iterator = array, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var _token = _ref;
      output += typeof _token === 'function' ? _token.call(time) : _token;
    }

    return output;
  };
}

var addFormatToken = function addFormatToken(token, padded, property) {
  var callback = typeof property === 'string' ? function () {
    return this[property];
  } : property;

  if (token) {
    formatTokenFunctions[token] = callback;
  }

  if (padded) {
    formatTokenFunctions[padded[0]] = function () {
      return padWithZeros(callback.call(this), padded[1]);
    };
  }
};

addFormatToken('A', 0, function () {
  return this.hours < 12 ? 'AM' : 'PM';
});
addFormatToken('a', 0, function () {
  return this.hours < 12 ? 'am' : 'pm';
});
addFormatToken('S', 0, function () {
  return Math.floor(this.milliseconds / 100);
});
addFormatToken(0, ['SS', 2], function () {
  return Math.floor(this.milliseconds / 10);
});
addFormatToken(0, ['SSS', 3], 'milliseconds');
addFormatToken('s', ['ss', 2], 'seconds');
addFormatToken('m', ['mm', 2], 'minutes');
addFormatToken('h', ['hh', 2], function () {
  return this.hours % 12 || 12;
});
addFormatToken('H', ['HH', 2], 'hours');
addFormatToken('d', 0, 'dayOfWeek');
addFormatToken('D', ['DD', 2], 'day');
addFormatToken('M', ['MM', 2], 'month');
addFormatToken(0, ['YY', 2], function () {
  return this.year % 100;
});
addFormatToken('Y', ['YYYY', 4], 'year');
addFormatToken('z', 0, function () {
  return this.zone.abbreviation;
});

function addTimeZoneFormatToken(token, separator) {
  addFormatToken(token, 0, function () {
    var offset = -this.zone.offset;
    var sign = offset < 0 ? '-' : '+';
    offset = Math.abs(offset);
    return sign + padWithZeros(Math.floor(offset / 60), 2) + separator + padWithZeros(offset % 60, 2);
  });
}

addTimeZoneFormatToken('Z', ':');
addTimeZoneFormatToken('ZZ', '');

function formatZonedTime(time, format) {
  var formatter = formatters[format];

  if (!formatter) {
    formatter = formatters[format] = makeFormatter(format);
  }

  return formatter(time);
}

exports.parseZonedTime = parseZonedTime;
exports.formatZonedTime = formatZonedTime;


/***/ }),

/***/ 5998:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getChildByText = exports.findChildByText = exports.getChildById = exports.findChildById = exports.findClickableParent = exports.getById = exports.findAllById = exports.findAllByDescContains = exports.findByDescContains = exports.findAllByTextContains = exports.findByTextContains = exports.findById = exports.defaultTimeout = exports.defaultinterval = void 0;
var accessibility_1 = __webpack_require__(8794);
var lang_1 = __webpack_require__(744);
exports.defaultinterval = 200; // 检查控件是否出现的间隔 单位 毫秒
exports.defaultTimeout = 15000; // 控件出现超时 单位 毫秒
function findById(id, interval, timeout) {
    return __awaiter(this, void 0, void 0, function () {
        var item, i, t, m;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    item = null;
                    i = interval || exports.defaultinterval;
                    t = timeout || exports.defaultTimeout;
                    m = new Date().getTime() + t;
                    console.log("开始查询" + id);
                    _a.label = 1;
                case 1:
                    if (!(item == null && m >= new Date().getTime())) return [3 /*break*/, 5];
                    return [4 /*yield*/, (0, accessibility_1.select)({ id: id }).firstOrNull()];
                case 2:
                    item = _a.sent();
                    if (!!item) return [3 /*break*/, 4];
                    return [4 /*yield*/, (0, lang_1.delay)(i)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [3 /*break*/, 1];
                case 5: return [2 /*return*/, item];
            }
        });
    });
}
exports.findById = findById;
function findByTextContains(text, interval, timeout) {
    return __awaiter(this, void 0, void 0, function () {
        var item, i, t, m;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    item = null;
                    i = interval || exports.defaultinterval;
                    t = timeout || exports.defaultTimeout;
                    m = new Date().getTime() + t;
                    _a.label = 1;
                case 1:
                    if (!(item == null && m >= new Date().getTime())) return [3 /*break*/, 5];
                    return [4 /*yield*/, (0, accessibility_1.select)({ text: new RegExp(text) }).firstOrNull()];
                case 2:
                    item = _a.sent();
                    if (!!item) return [3 /*break*/, 4];
                    return [4 /*yield*/, (0, lang_1.delay)(i)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [3 /*break*/, 1];
                case 5: return [2 /*return*/, item];
            }
        });
    });
}
exports.findByTextContains = findByTextContains;
function findAllByTextContains(text, interval, timeout) {
    return __awaiter(this, void 0, void 0, function () {
        var items, i, t, m;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    items = [];
                    i = interval || exports.defaultinterval;
                    t = timeout || exports.defaultTimeout;
                    m = new Date().getTime() + t;
                    _a.label = 1;
                case 1:
                    if (!(items.length === 0 && m >= new Date().getTime())) return [3 /*break*/, 5];
                    return [4 /*yield*/, (0, accessibility_1.select)({ text: new RegExp(text) }).all()];
                case 2:
                    items = _a.sent();
                    if (!(items.length === 0)) return [3 /*break*/, 4];
                    return [4 /*yield*/, (0, lang_1.delay)(i)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [3 /*break*/, 1];
                case 5: return [2 /*return*/, items];
            }
        });
    });
}
exports.findAllByTextContains = findAllByTextContains;
function findByDescContains(text, interval, timeout) {
    return __awaiter(this, void 0, void 0, function () {
        var item, i, t, m;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    item = null;
                    i = interval || exports.defaultinterval;
                    t = timeout || exports.defaultTimeout;
                    m = new Date().getTime() + t;
                    _a.label = 1;
                case 1:
                    if (!(item == null && m >= new Date().getTime())) return [3 /*break*/, 5];
                    return [4 /*yield*/, (0, accessibility_1.select)({ desc: new RegExp(text) }).firstOrNull()];
                case 2:
                    item = _a.sent();
                    if (!!item) return [3 /*break*/, 4];
                    return [4 /*yield*/, (0, lang_1.delay)(i)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [3 /*break*/, 1];
                case 5: return [2 /*return*/, item];
            }
        });
    });
}
exports.findByDescContains = findByDescContains;
function findAllByDescContains(text, interval, timeout) {
    return __awaiter(this, void 0, void 0, function () {
        var items, i, t, m;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    items = [];
                    i = interval || exports.defaultinterval;
                    t = timeout || exports.defaultTimeout;
                    m = new Date().getTime() + t;
                    _a.label = 1;
                case 1:
                    if (!(items.length === 0 && m >= new Date().getTime())) return [3 /*break*/, 5];
                    return [4 /*yield*/, (0, accessibility_1.select)({ desc: new RegExp(text) }).all()];
                case 2:
                    items = _a.sent();
                    if (!(items.length === 0)) return [3 /*break*/, 4];
                    return [4 /*yield*/, (0, lang_1.delay)(i)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [3 /*break*/, 1];
                case 5: return [2 /*return*/, items];
            }
        });
    });
}
exports.findAllByDescContains = findAllByDescContains;
function findAllById(id, interval, timeout) {
    return __awaiter(this, void 0, void 0, function () {
        var items, i, t, m;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    items = [];
                    i = interval || exports.defaultinterval;
                    t = timeout || exports.defaultTimeout;
                    m = new Date().getTime() + t;
                    _a.label = 1;
                case 1:
                    if (!(items.length === 0 && m >= new Date().getTime())) return [3 /*break*/, 5];
                    return [4 /*yield*/, (0, accessibility_1.select)({ id: id }).all()];
                case 2:
                    items = _a.sent();
                    if (!(items.length === 0)) return [3 /*break*/, 4];
                    return [4 /*yield*/, (0, lang_1.delay)(i)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [3 /*break*/, 1];
                case 5: return [2 /*return*/, items];
            }
        });
    });
}
exports.findAllById = findAllById;
function getById(id, interval, timeout) {
    return __awaiter(this, void 0, void 0, function () {
        var item;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, findById(id, interval, timeout)];
                case 1:
                    item = _a.sent();
                    if (!item) {
                        throw new Error("未找到Id:" + id);
                    }
                    return [2 /*return*/, item];
            }
        });
    });
}
exports.getById = getById;
function findClickableParent(uiObject) {
    if (uiObject.clickable) {
        return uiObject;
    }
    var parent = uiObject.parent;
    while (parent) {
        if (parent.clickable) {
            return parent;
        }
        else {
            parent = parent.parent;
        }
    }
    return undefined;
}
exports.findClickableParent = findClickableParent;
//深度优先遍历
function findChildById(uiObject, id) {
    if (uiObject.id === id) {
        return uiObject;
    }
    for (var _i = 0, _a = uiObject.children; _i < _a.length; _i++) {
        var child = _a[_i];
        var found = findChildById(child, id);
        if (found) {
            return found;
        }
    }
    return null;
}
exports.findChildById = findChildById;
//深度优先遍历
function getChildById(uiObject, id) {
    var child = findChildById(uiObject, id);
    if (!child) {
        throw new Error("未找到子节点Id:" + id);
    }
    return child;
}
exports.getChildById = getChildById;
//深度优先遍历
function findChildByText(uiObject, text) {
    if (uiObject.text === text) {
        return uiObject;
    }
    for (var _i = 0, _a = uiObject.children; _i < _a.length; _i++) {
        var child = _a[_i];
        var found = findChildByText(child, text);
        if (found) {
            return found;
        }
    }
    return null;
}
exports.findChildByText = findChildByText;
//深度优先遍历
function getChildByText(uiObject, id) {
    var child = findChildByText(uiObject, id);
    if (!child) {
        throw new Error("未找到子节点Id:" + id);
    }
    return child;
}
exports.getChildByText = getChildByText;


/***/ }),

/***/ 3221:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CZMainActivity = void 0;
const app_base_v9_1 = __webpack_require__(5757);
const environment_1 = __webpack_require__(5737);
class CZMainActivity extends app_base_v9_1.MainActivity {
    constructor() {
        super(...arguments);
        this.appName = environment_1.environment.appName;
        this.version = environment_1.environment.version;
        this.adbPermission = environment_1.environment.adb;
    }
}
exports.CZMainActivity = CZMainActivity;


/***/ }),

/***/ 863:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CZApp = exports.appId = void 0;
const app_base_v9_1 = __webpack_require__(5757);
const date_fns_timezone_1 = __webpack_require__(1046);
const selector = __importStar(__webpack_require__(5998));
const dtos_1 = __webpack_require__(6876);
const app = __importStar(__webpack_require__(6863));
const environment_1 = __webpack_require__(5737);
const lang_1 = __webpack_require__(744);
const accessibility_1 = __webpack_require__(8794);
const shell_1 = __webpack_require__(7319);
const toast_1 = __webpack_require__(6296);
const ui_object_helper_1 = __webpack_require__(954);
exports.appId = "com.csair.mbp";
const HOME_BTN = "main_home_txt";
const BOOKING_BTN = "include_main_home_view_booking_llyt_querybtn";
const DATE_PATTERN = "YYYY-MM-DD";
const timezoneOptions = {
    timeZone: "Asia/Shanghai",
};
const accounts = [
    "413437822367",
    "615975162381",
    "618316613775",
    "519927547764",
    "018470327296",
    "615932905520",
    "315968988840",
    "312746549939",
    "213924039670",
    "418166035234",
    "113767112915",
    "013729439459",
    "515800231391",
    "318138704076",
    "115015081044",
];
const contacts = [{
        concatName: '赵先生',
        concatPhone: "13622219236",
    },
    {
        concatName: '钱女士',
        concatPhone: "18565201889",
    },
    {
        concatName: '孙先生',
        concatPhone: "18565201802",
    },
    {
        concatName: '李女士',
        concatPhone: "13725366358",
    },
    {
        concatName: '周先生',
        concatPhone: "13434251837",
    },
    {
        concatName: '吴小姐',
        concatPhone: "15917449016",
    },
    {
        concatName: '唐先生',
        concatPhone: "18565201119",
    },
    {
        concatName: '王先生',
        concatPhone: "18565201807",
    },
    {
        concatName: '李先生',
        concatPhone: "18565201882",
    },
    {
        concatName: '廖先生',
        concatPhone: "13622207539",
    },
    {
        concatName: '曾先生',
        concatPhone: "15817030174",
    },
    {
        concatName: '陈女士',
        concatPhone: "13660567305",
    },
    {
        concatName: '黄先生',
        concatPhone: "13711133262",
    },
    {
        concatName: '林先生',
        concatPhone: "13660486937",
    },
    {
        concatName: '徐先生',
        concatPhone: "15989110684",
    },
    {
        concatName: '魏先生',
        concatPhone: "13660264920"
    }
];
let compareDetailStr = "";
let compareDetail = [];
;
const nationCode_1 = __webpack_require__(9700);
const device_1 = __webpack_require__(4138);
class CZApp {
    constructor() {
        this._failedCount = 0;
        this._networkErrorCount = 0;
        this._loginTokenCount = 0;
    }
    async init(handler) {
        handler.update(app_base_v9_1.AppDeviceStatusType.Initializing);
        this._handler = handler;
        console.log(`启动APP: ${app.launch(exports.appId)}`);
        await (0, lang_1.delay)(5000);
        try {
            // 关闭登机牌遮挡
            await this.clickIfIdExists("home_dialog_close_button", 100, 1000);
            await this.backToHome();
            await this.openMine();
            const account = await this.getAccount();
            environment_1.environment.loginAccount = account;
            handler.update(app_base_v9_1.AppDeviceStatusType.Ready, account);
        }
        catch (error) {
            console.error(error);
            const msg = error === null || error === void 0 ? void 0 : error.message;
            handler.update(app_base_v9_1.AppDeviceStatusType.Unknown);
            handler.log(msg);
            await this.backToHome();
        }
    }
    async changeProxy(proxyUrl) {
        // 设置代理
        if (environment_1.environment.adb) {
            const result = await (0, shell_1.exec)(`settings put global http_proxy ${proxyUrl}`, {
                adb: true,
            });
            console.log(result);
            (0, toast_1.showToast)(`设置代理 ${proxyUrl} 结果 ${result.code == 0 ? "成功" : "失败"}`);
            return result.code == 0;
        }
        else {
            (0, toast_1.showToast)("设置代理失败没有adb权限");
            return false;
        }
    }
    async getAccount() {
        var _a, _b;
        const loginBtn = await selector.findByTextContains("登录", 100, 2000);
        if (loginBtn) {
            this.log("当前设备未登录");
            return "";
        }
        (await selector.getById("mine_new_scrollview")).scrollBackward();
        let pearlMember = await selector.findByTextContains("明珠会员", 1000, 20000);
        if (!(pearlMember === null || pearlMember === void 0 ? void 0 : pearlMember.parent)) {
            // throw new Error("找不到 明珠会员");
            // 不抛异常，直接返回空
            return "";
        }
        let cardNo = "";
        let retry = 15;
        while (retry > 0) {
            retry--;
            pearlMember = await selector.findByTextContains("明珠会员", 1000, 20000);
            if (!(pearlMember === null || pearlMember === void 0 ? void 0 : pearlMember.parent)) {
                throw new Error(`找不到 明珠会员 retry:${retry}`);
            }
            cardNo = pearlMember.parent.children[1].text;
            console.log(`等待账号出现 ${cardNo}`);
            if (!cardNo || cardNo === "" || cardNo.trim() === "") {
                await (0, lang_1.delay)(500);
                continue;
            }
            break;
        }
        if (cardNo === "") {
            throw new Error("等待账号出现失败");
        }
        console.log("开始获取账号");
        const localCardNo = this.getLocalCardNo(cardNo);
        if (localCardNo) {
            console.log(`获取到本地账号 ${localCardNo} 原始账号 ${cardNo}`);
            return localCardNo;
        }
        if (cardNo.includes("*")) {
            console.log(`点击展示卡号 ${pearlMember.parent.children[2].click()}`);
            await (0, lang_1.delay)(1000);
        }
        retry = 15;
        while (retry > 0) {
            retry--;
            const temp = await selector.findAllByTextContains("明珠会员");
            if (temp.length === 0) {
                throw new Error(`找不到 明珠会员 retry:${retry}`);
            }
            cardNo = (_b = (_a = temp[temp.length - 1].parent) === null || _a === void 0 ? void 0 : _a.children[1].text) !== null && _b !== void 0 ? _b : "*";
            if (cardNo.includes("*")) {
                await (0, lang_1.delay)(1000);
                continue;
            }
            return cardNo;
        }
        return "";
    }
    getLocalCardNo(cardNo) {
        const last4char = cardNo.slice(cardNo.length - 4);
        return accounts.find((x) => x.endsWith(last4char));
    }
    async login(account) {
        await this.openMine();
        const loginBtn = await selector.getById("mine_new_head", 200, 2000);
        loginBtn.click();
        let memberLoginBtn = await selector.findById("activity_login_type_right_radioButton", 200, 2000);
        if (!memberLoginBtn) {
            const logged = await selector.findByTextContains("会员身份验证", 200, 2000);
            if (logged) {
                await (0, accessibility_1.click)(300, 1560);
                (0, accessibility_1.back)();
                await this.clickIfIdExists("login_verification_dialog_left_btn", 100, 1000);
                const username = await this.getAccount();
                if (username === account.userName) {
                    environment_1.environment.loginAccount = account.userName;
                    return;
                }
                else {
                    await this.logout();
                    await this.login(account);
                    return;
                }
            }
            else {
                const basicInfoText = await selector.findByTextContains("基本信息", 200, 5000);
                if (basicInfoText) {
                    (0, accessibility_1.back)();
                    await (0, lang_1.delay)(2000);
                    const username = await this.getAccount();
                    if (username === account.userName) {
                        environment_1.environment.loginAccount = account.userName;
                        return;
                    }
                    else {
                        await this.logout();
                        await this.login(account);
                        return;
                    }
                }
                else {
                    throw new Error(`登录失败 获取不到登录页面`);
                }
            }
        }
        memberLoginBtn.click();
        await selector.getById("activity_login_llyt_member_layout", 100, 2000);
        await this.clickIfIdExists("activity_login_userid_delete_btn", 100, 1000);
        await this.getAndInputText("activity_login_et_member_account", account.userName);
        await this.getAndInputText("activity_login_et_member_password_id", account.password);
        await this.ensureChecked("activity_login_privacy_policy");
        await this.ensureChecked("activity_login_tbtn_save_account_tip");
        const confirmBtn = await selector.getById("activity_login_btn_login_button");
        confirmBtn.click();
        await this.waitForLoading();
        await this.waitForTip(true, true);
        environment_1.environment.loginAccount = account.userName;
        this._loginTokenCount = 0;
    }
    async ensureChecked(id) {
        let retry = 3;
        while (retry > 0) {
            retry--;
            const checkBox = await selector.getById(id);
            if (checkBox.checkable && !checkBox.checked) {
                checkBox.click();
                await (0, lang_1.delay)(500);
            }
            else {
                return;
            }
        }
    }
    async getAndInputText(id, text, click) {
        const item = await selector.getById(id);
        item.showOnScreen();
        if (click) {
            item.click();
        }
        item.setText(text);
    }
    async logout() {
        await this.openMine();
        const settingBtn = await selector.findById("img_setting", 200, 2000);
        if (settingBtn) {
            settingBtn.click();
        }
        else {
            (await selector.getById("mine_new_setting_img")).click();
        }
        const logoutBtn = await selector.findById("tv_loginLogout", 500, 5000);
        if (!logoutBtn) {
            environment_1.environment.loginAccount = "";
            (0, accessibility_1.back)();
            return;
        }
        logoutBtn.click();
        await this.waitForTip(false, true);
        environment_1.environment.loginAccount = "";
        await this.backToHome();
    }
    async openMine() {
        var _a;
        const mineBtn = await selector.findById("main_mine_txt", 200, 2000);
        if (!mineBtn) {
            throw new Error(`找不到 我 按钮`);
        }
        (_a = selector.findClickableParent(mineBtn)) === null || _a === void 0 ? void 0 : _a.click();
        let retry = 5;
        let item = null;
        while (retry > 0) {
            retry--;
            item = await selector.findById("personal_center_offline_map_view", 100, 400);
            if (item) {
                break;
            }
        }
        if (!item) {
            throw new Error(`跳转 我 页面失败`);
        }
    }
    async waitForTipAndClose(content, clickTargetId, interval, timeout) {
        var _a;
        interval !== null && interval !== void 0 ? interval : (interval = 100);
        timeout !== null && timeout !== void 0 ? timeout : (timeout = 1000);
        const tip = await selector.findByTextContains(content, interval, timeout);
        if (tip) {
            (_a = (await selector.findById(clickTargetId, 100, 1000))) === null || _a === void 0 ? void 0 : _a.click();
        }
    }
    async waitForTip(throwError, clickBtn, clickCancel) {
        var _a, _b;
        clickCancel !== null && clickCancel !== void 0 ? clickCancel : (clickCancel = false);
        let panel = await selector.findById("buttonPanel", 200, 3000);
        if (panel) {
            let messageText = await selector.findById("message", 200, 3000);
            if (!messageText) {
                panel = await selector.findById("buttonPanel", 200, 1000);
                if (!panel) {
                    return undefined;
                }
                else {
                    messageText = await selector.findById("message", 200, 1000);
                    if (!messageText) {
                        return undefined;
                    }
                }
            }
            if (clickBtn) {
                if (clickCancel) {
                    (_a = (await selector.findById("button2", 100, 1000))) === null || _a === void 0 ? void 0 : _a.click();
                }
                (_b = (await selector.findById("button1", 100, 1000))) === null || _b === void 0 ? void 0 : _b.click();
            }
            if (throwError) {
                throw new Error(`出现提示报错 ${messageText.text}`);
            }
            else {
                return messageText.text;
            }
        }
    }
    async waitForResultTip(throwError, clickBtn, clickCancel) {
        var _a, _b;
        clickCancel !== null && clickCancel !== void 0 ? clickCancel : (clickCancel = false);
        let panel = await selector.findById("parentPanel", 200, 3000);
        if (panel) {
            let messageText = await selector.findById("message", 200, 3000);
            if (!messageText) {
                panel = await selector.findById("parentPanel", 200, 1000);
                if (!panel) {
                    return undefined;
                }
                else {
                    messageText = await selector.findById("message", 200, 1000);
                    if (!messageText) {
                        return undefined;
                    }
                }
            }
            if (clickBtn) {
                if (clickCancel) {
                    (_a = (await selector.findById("button2", 100, 1000))) === null || _a === void 0 ? void 0 : _a.click();
                }
                (_b = (await selector.findById("button1", 100, 1000))) === null || _b === void 0 ? void 0 : _b.click();
            }
            if (throwError) {
                throw new Error(`出现提示报错 ${messageText.text}`);
            }
            else {
                return messageText.text;
            }
        }
    }
    async clickIfIdExists(id, interval, timeout) {
        const item = await selector.findById(id, interval, timeout);
        if (item && item.clickable) {
            item.click();
            return true;
        }
        else {
            return false;
        }
    }
    async clickIfDescContains(desc, interval, timeout) {
        const item = await selector.findByDescContains(desc, interval, timeout);
        if (item && item.clickable) {
            item.click();
            return true;
        }
        return false;
    }
    async backToHome() {
        console.log(`当前找不到首页按钮，尝试回到主页 adb权限${environment_1.environment.adb}`);
        let home = await selector.findById(HOME_BTN, 200, 2000);
        if (!home) {
            await this.waitForTip(false, true);
            await this.clickIfIdExists("close", 100, 1000);
            await this.clickIfIdExists("agreement_exit_bt", 100, 1000);
            await this.clickIfIdExists("main_youth_protect_dialog_more_than_14", 100, 1000);
            await this.clickIfIdExists("tv_cancel", 100, 1000);
            await this.clickIfIdExists("home_dialog_close_button", 100, 1000);
            await this.clickIfDescContains("首页", 50, 1000);
            if (!(await this.clickIfIdExists("book_home", 100, 1000)) && !(await this.clickIfIdExists("h5_bt_image", 100, 1000))) {
                while (await this.clickIfDescContains("返回上一页", 100, 1000)) {
                    await (0, lang_1.delay)(1000);
                }
            }
            home = await selector.findById(HOME_BTN, 100, 1000);
            if (home) {
                return home;
            }
            let retry = 5;
            while (retry > 0) {
                retry--;
                (0, accessibility_1.back)();
                await this.waitForTip(false, true);
                await this.clickIfIdExists("book_home", 100, 1000);
                await this.clickIfIdExists("home_dialog_close_button", 100, 1000);
                await this.clickIfDescContains("首页", 50, 1000);
                home = await selector.findById(HOME_BTN, 200, 2000);
                if (home) {
                    return home;
                }
                console.log(`启动APP: ${app.launch(exports.appId)}`);
                await (0, lang_1.delay)(3000);
            }
            throw new Error("打开主页失败 找不到首页按钮");
        }
        else {
            return home;
        }
    }
    // async waitForLoading(
    //     interval?: number,
    //     timeout?: number
    // ): Promise<boolean> {
    //     interval ??= 500;
    //     timeout ??= 60000;
    //     await delay(interval);
    //     let m = new Date().getTime() + timeout;
    //     let root = await accessibility.root();
    //     let retry = 10;
    //     while (!root && retry > 0) {
    //         retry--;
    //         await delay(500);
    //         continue;
    //     }
    //     if (!root) {
    //         return false;
    //     }
    //     let isLoading: UiObject[] = root.children.filter(
    //         (x: UiObject) => x.clickable
    //     );
    //     while (isLoading.length > 0 && m >= new Date().getTime()) {
    //         root = await accessibility.root();
    //         let r = 10;
    //         while (!root && r > 0) {
    //             r--;
    //             await delay(500);
    //             continue;
    //         }
    //         if (!root) {
    //             return false;
    //         }
    //         isLoading = root.children.filter((x: UiObject) => x.clickable);
    //         if (isLoading.length > 0) {
    //             console.log(`等待加载中`);
    //             await delay(interval);
    //         }
    //     }
    //     return isLoading.length > 0;
    // }
    async waitForLoading(interval, timeout) {
        interval !== null && interval !== void 0 ? interval : (interval = 500);
        timeout !== null && timeout !== void 0 ? timeout : (timeout = 60000);
        await (0, lang_1.delay)(interval);
        let m = new Date().getTime() + timeout;
        let root = await accessibility_1.accessibility.root();
        let retry = 10;
        while (!root && retry > 0) {
            retry--;
            await (0, lang_1.delay)(500);
            continue;
        }
        if (!root) {
            return false;
        }
        let isLoading = root.children.filter((x) => x.className == 'content');
        while (isLoading.length > 0 && m >= new Date().getTime()) {
            root = await accessibility_1.accessibility.root();
            let r = 10;
            while (!root && r > 0) {
                r--;
                await (0, lang_1.delay)(500);
                continue;
            }
            if (!root) {
                return false;
            }
            isLoading = root.children.filter((x) => x.className == 'content');
            if (isLoading.length > 0) {
                await (0, lang_1.delay)(interval);
            }
        }
        return isLoading.length > 0;
    }
    async searchFlight(orig, dest, date, backDate) {
        const oriInput = await selector.getById("include_main_home_view_booking_tv_start");
        oriInput.click();
        await this.inputAirport(orig);
        const destInput = await selector.getById("include_main_home_view_booking_tv_back");
        destInput.click();
        await this.inputAirport(dest);
        if (backDate != undefined) {
            await this.selectWFDate(date, backDate);
        }
        else {
            await this.selectDate(date);
        }
        const searchBtn = await selector.getById(BOOKING_BTN);
        searchBtn.click();
    }
    async selectDate(date) {
        let retry = 5;
        while (retry > 0) {
            retry--;
            const dateBtn = await selector.getById("include_main_home_view_booking_tv_month_start");
            const currentDate = await this.getCurrentDate(dateBtn.text, new Date());
            const currentDateText = (0, date_fns_timezone_1.formatToTimeZone)(currentDate, DATE_PATTERN, timezoneOptions);
            const targetDateText = (0, date_fns_timezone_1.formatToTimeZone)(date, DATE_PATTERN, timezoneOptions);
            console.log(`当前日期 ${currentDateText} 目标日期 ${targetDateText}`);
            if (currentDateText === targetDateText) {
                return;
            }
            else {
                if (!dateBtn.parent) {
                    throw new Error(`日期控件父级未找到`);
                }
                dateBtn.parent.click();
                await this.inputDate(date);
                console.log(`已点击目标日期`);
            }
        }
    }
    async selectWFDate(date, backDate) {
        const dateBtn = await selector.getById("include_main_home_view_booking_tv_month_start");
        const backDateBtn = await selector.findById("include_main_home_view_booking_tv_month_back", 50, 500);
        let retry = 1;
        while (retry > 0) {
            retry--;
            const currentDate = await this.getCurrentDate(dateBtn.text, new Date());
            const currentDateText = (0, date_fns_timezone_1.formatToTimeZone)(currentDate, DATE_PATTERN, timezoneOptions);
            const targetDateText = (0, date_fns_timezone_1.formatToTimeZone)(date, DATE_PATTERN, timezoneOptions);
            if (!dateBtn.parent) {
                throw new Error(`日期控件父级未找到`);
            }
            dateBtn.parent.click();
            await this.inputDate(date);
        }
        // 返程时间
        if (backDateBtn) {
            const currentEndDate = await this.getCurrentDate(backDateBtn.text, new Date());
            const currentEndDateText = (0, date_fns_timezone_1.formatToTimeZone)(currentEndDate, DATE_PATTERN, timezoneOptions);
            const targetEndDateText = (0, date_fns_timezone_1.formatToTimeZone)(backDate, DATE_PATTERN, timezoneOptions);
            if (!backDateBtn.parent) {
                throw new Error(`日期控件父级未找到`);
            }
            backDateBtn.parent.click();
            await this.inputDate(backDate);
        }
        await (0, lang_1.delay)(500);
        const confirmBtn = await selector.getById("view_calendar_confirm_bt", 100, 1000);
        confirmBtn.click();
        await (0, lang_1.delay)(500);
    }
    async inputDate(date) {
        const scrollView = await selector.getById("calendar_content_rv");
        scrollView.scrollBackward();
        scrollView.scrollBackward();
        scrollView.scrollBackward();
        scrollView.scrollBackward();
        await (0, lang_1.delay)(1000);
        const targetDateText = (0, date_fns_timezone_1.formatToTimeZone)(date, "YYYY年M月D号", timezoneOptions);
        const targetDateMonthDayText = (0, date_fns_timezone_1.formatToTimeZone)(date, "M月D日", timezoneOptions);
        let retry = 5;
        let outer = false;
        while (retry > 0) {
            retry--;
            outer = false;
            let monthViews = await selector.findAllById("calendar_month_view", 100, 5000);
            for (const monthView of monthViews) {
                for (const day of monthView.children.reverse()) {
                    // if (day.text.includes('年')) {
                    //   if (day.text.includes(targetDateText)) {
                    //     if (day.boundsInScreen.centerY < 0) {
                    //       scrollView.scrollForward();
                    //       await delay(1000);
                    //       outer = true;
                    //       break;
                    //     }
                    //     click(
                    //       day.boundsInScreen.centerX,
                    //       day.boundsInScreen.centerY
                    //     );
                    //     return;
                    //   }
                    // } else {
                    // console.log(`当前页(${day.text}) 目标月日日期 ${targetDateMonthDayText}，是否包含目标月日 ${day.text.includes(targetDateMonthDayText)}`);
                    if (day.text.includes(targetDateMonthDayText)) {
                        console.log(`获取到的当前页面的所有日期 ${day.text} ${day.boundsInScreen.centerY}`);
                        if (day.boundsInScreen.centerY < 0) {
                            scrollView.scrollForward();
                            await (0, lang_1.delay)(1000);
                            outer = true;
                            break;
                        }
                        (0, accessibility_1.click)(day.boundsInScreen.centerX, day.boundsInScreen.centerY);
                        console.log(`已找到目标日期，已点击`);
                        return;
                        // }
                    }
                }
                if (outer) {
                    break;
                }
            }
            if (!outer) {
                scrollView.scrollForward();
                await (0, lang_1.delay)(1000);
            }
        }
        throw new Error(`选择日期失败 ${targetDateText}`);
    }
    async getCurrentDate(dateText, now) {
        const dateNumbers = dateText.match(/\d+/g);
        if ((dateNumbers === null || dateNumbers === void 0 ? void 0 : dateNumbers.length) === 2) {
            const d = new Date(now.getFullYear(), +dateNumbers[0] - 1, +dateNumbers[1]);
            if (d < new Date(now.getFullYear(), now.getMonth(), now.getDate())) {
                d.setFullYear(d.getFullYear() + 1);
            }
            return d;
        }
        else {
            throw new Error(`无法解析日期 ${dateText}`);
        }
    }
    async inputAirport(airport) {
        const inputBtn = await selector.getById("book_activity_city_list_tv_citySearch");
        inputBtn.click();
        const input = await selector.getById("book_activity_city_list_et_citySearch");
        input.setText(airport);
        let cityCode;
        let cityClickBtn;
        let pages = 0;
        while (pages < 5 && !cityClickBtn) {
            pages++;
            let retry = 5;
            let cityCodeList = await selector.findAllById("tv_code3", 500, 5000);
            while (retry > 0 && cityCodeList.length === 0) {
                retry--;
                input.setText("");
                await (0, lang_1.delay)(500);
                input.setText(airport);
                await (0, lang_1.delay)(1000);
                cityCodeList = await selector.findAllById("tv_code3", 500, 5000);
            }
            if (cityCodeList.length === 0) {
                throw new Error(`机场代码 ${airport} 无法查询到出发城市`);
            }
            const targetCityCodeList = cityCodeList.filter((x) => x.text === airport);
            if (targetCityCodeList.length === 0) {
                cityCode = cityCodeList[0];
                cityClickBtn = selector.findClickableParent(cityCodeList[0]);
            }
            else {
                for (const code of targetCityCodeList) {
                    const btn = selector.findClickableParent(code);
                    if (btn) {
                        const title = selector.findChildById(btn, "tv_title");
                        if ((title === null || title === void 0 ? void 0 : title.text) == "机场") {
                            cityCode = code;
                            cityClickBtn = btn;
                            break;
                        }
                        else {
                            console.log(`不是机场跳过 ${title === null || title === void 0 ? void 0 : title.text}`);
                        }
                    }
                }
            }
            if (cityClickBtn) {
                break;
            }
            else {
                const listView = await selector.getById("book_activity_city_list_rcyView_searchCities");
                console.log(`滑动机场选择 ${listView.scrollForward()}`);
                await (0, lang_1.delay)(800);
            }
        }
        if (!cityClickBtn) {
            throw new Error(`机场三字码${airport}选择失败`);
        }
        console.log(`点击城市按钮 ${cityCode === null || cityCode === void 0 ? void 0 : cityCode.text} ${cityClickBtn.click()}`);
    }
    async ensureLogin(accountInfo) {
        var _a;
        if (environment_1.environment.loginAccount === "") {
            await this.login(accountInfo);
        }
        else {
            if (environment_1.environment.loginAccount !== accountInfo.userName) {
                await this.logout();
                await this.login(accountInfo);
            }
        }
        (_a = this._handler) === null || _a === void 0 ? void 0 : _a.update(app_base_v9_1.AppDeviceStatusType.Processing, environment_1.environment.loginAccount);
    }
    async openHome() {
        var _a;
        await this.clickIfIdExists("home_dialog_close_button", 100, 1000);
        let home = await selector.findById(HOME_BTN, 200, 2000);
        if (!home) {
            home = await this.backToHome();
        }
        (_a = selector.findClickableParent(home)) === null || _a === void 0 ? void 0 : _a.click();
        await this.clickIfIdExists("home_dialog_close_button", 100, 1000);
        await selector.getById(BOOKING_BTN);
    }
    log(message) {
        var _a;
        (_a = this._handler) === null || _a === void 0 ? void 0 : _a.log(message);
    }
    /**
     * 爬取直减运价
     * @param input 只接收出发到达，没有航班号
     * @returns
     */
    async QueryDirectDiscount(input) {
        var _a, _b, _c, _d, _e, _f;
        try {
            await this.openHome();
            // 如果要求账号和当前账号不一致 则重新登录
            await this.ensureLogin(input.accountInfo);
            (_a = this._handler) === null || _a === void 0 ? void 0 : _a.update(app_base_v9_1.AppDeviceStatusType.Processing, environment_1.environment.loginAccount);
            await this.openHome();
            const currDate = new Date(input.date);
            const result = {
                success: true,
                discounts: [],
            };
            (await selector.getById("include_main_home_view_booking_rb_singletrip", 100, 1000)).click();
            await this.searchFlight(input.originAirport, input.destinationAirport, currDate);
            if (await this.waitForLoading()) {
                throw new Error("加载航班列表超时");
            }
            await this.waitForTip(false, true);
            await this.clickIfIdExists("close", 200, 2000);
            await this.clickIfIdExists("close_btn", 200, 1000);
            if (await this.waitForLoading()) {
                throw new Error("加载航班列表超时");
            }
            const currDateText = (0, date_fns_timezone_1.formatToTimeZone)(currDate, DATE_PATTERN, timezoneOptions);
            let flights = await selector.findAllById("item_card_view", 100, 1000);
            if (flights.length === 0) {
                const noFlights = await selector.findByTextContains("暂时没有可预订", 100, 1000);
                const sellOut = await selector.findByTextContains("已售罄", 100, 1000);
                if (noFlights || sellOut) {
                    this.log(`该日期没有航班 ${input.originAirport}-${input.destinationAirport} ${currDateText}`);
                }
                else {
                    throw new Error(`该日期的航班查询失败  ${input.originAirport}-${input.destinationAirport} ${currDateText}`);
                }
                return result;
            }
            let flightPanel = await selector.getById("domestic_list_data_rv", 400, 2000);
            let validFlights = [];
            let flightNos = [];
            let lastFlightCount = 0;
            let lowest;
            let lowestFlightNo;
            let retry = 5;
            let cnt = 0;
            while (retry > 0 && validFlights.length === 0) {
                retry--;
                lastFlightCount = flightNos.length;
                for (const flight of flights) {
                    const fullFlightNo = this.getFullFlightNoFromCard(flight);
                    if (!flightNos.find((x) => x === fullFlightNo)) {
                        flightNos.push(fullFlightNo);
                    }
                    else {
                        continue;
                    }
                    const flightStopInfo = this.getStopInfoFromCard(flight);
                    if (flightStopInfo && flightStopInfo.includes("中转")) {
                        continue;
                    }
                    const cut = selector.findChildById(flight, "book_single_list_cut_tv");
                    if (cut) {
                        validFlights.push(flight);
                        const ticketPrice = selector.findChildById(flight, "book_single_list_price_tv");
                        if (lowest) {
                            const lowestTicketPrice = selector.findChildById(lowest, "book_single_list_price_tv");
                            if (Number(ticketPrice === null || ticketPrice === void 0 ? void 0 : ticketPrice.text) <
                                Number(lowestTicketPrice === null || lowestTicketPrice === void 0 ? void 0 : lowestTicketPrice.text)) {
                                lowest = flight;
                                lowestFlightNo = this.getFullFlightNoFromCard(flight);
                            }
                        }
                        else {
                            lowest = flight;
                            lowestFlightNo =
                                this.getFullFlightNoFromCard(flight);
                        }
                    }
                }
                if (lastFlightCount === flightNos.length) {
                    cnt++;
                    if (cnt > 1) {
                        break;
                    }
                }
                flightPanel.scrollForward();
                await (0, lang_1.delay)(1000);
                flightPanel = await selector.getById("domestic_list_data_rv", 400, 2000);
                flights = await selector.findAllById("item_card_view", 100, 1000);
            }
            if (validFlights.length === 0) {
                this.log(`该日期航班都被排除 ${input.originAirport}-${input.destinationAirport} ${currDateText}`);
            }
            else {
                // const flightDiscountLabel = await selector.getById(
                //     "book_single_list_cut_tv",
                //     200,
                //     2000
                // );
                // const card = selector.findClickableParent(flightDiscountLabel);
                // if (!card) {
                //     throw new Error("点击航班出错");
                // }
                // this.log(`找到直减航班`);
                // const fullFlightNo = this.getFullFlightNoFromCard(card);
                // card.click();
                let fullFlightNo = "";
                if (lowest && lowestFlightNo) {
                    let flightFlightNoLabel = await selector.findByTextContains(lowestFlightNo, 100, 1000);
                    // 中转航班可能和目标航班一样，要排除中转航班
                    let transit = (_b = flightFlightNoLabel === null || flightFlightNoLabel === void 0 ? void 0 : flightFlightNoLabel.parent) === null || _b === void 0 ? void 0 : _b.children.find(x => x.id === "book_single_list_flight_no_transit_tv");
                    if (flightFlightNoLabel && !transit) {
                        const card = this.findParent(flightFlightNoLabel, "item_card_view");
                        if (!card) {
                            throw new Error("点击航班出错");
                        }
                        fullFlightNo = this.getFullFlightNoFromCard(card);
                        card.click();
                    }
                    else {
                        let t = 3;
                        while (t > 0) {
                            t--;
                            flightPanel.scrollBackward();
                            await (0, lang_1.delay)(1000);
                            flightPanel = await selector.getById("domestic_list_data_rv", 400, 2000);
                            flightFlightNoLabel =
                                await selector.findByTextContains(lowestFlightNo, 100, 1000);
                            transit = (_c = flightFlightNoLabel === null || flightFlightNoLabel === void 0 ? void 0 : flightFlightNoLabel.parent) === null || _c === void 0 ? void 0 : _c.children.find(x => x.id === "book_single_list_flight_no_transit_tv");
                            if (flightFlightNoLabel && !transit) {
                                const card = this.findParent(flightFlightNoLabel, "item_card_view");
                                if (!card) {
                                    throw new Error("点击航班出错");
                                }
                                fullFlightNo = this.getFullFlightNoFromCard(card);
                                card.click();
                                break;
                            }
                        }
                    }
                }
                if (await this.waitForLoading()) {
                    throw new Error("加载航班详情超时");
                }
                await this.waitForTip(true, true);
                let discountLabel = await selector.findById("cabin_details_order_cut_tv", 200, 2000);
                if (!discountLabel) {
                    await (0, accessibility_1.scrollForward)();
                    discountLabel = await selector.findById("cabin_details_order_cut_tv", 200, 2000);
                }
                if (!discountLabel) {
                    const tabContainer = await selector.getById("cabin_tab_container");
                    const busTab = tabContainer.children.find((x) => selector
                        .getChildById(x, "view_cabin_tab_tv_title")
                        .text.includes("公务"));
                    if (busTab) {
                        console.log(`点击公务舱 ${busTab.desc} ${busTab.click()}`);
                        await (0, lang_1.delay)(700);
                        discountLabel = await selector.findById("cabin_details_order_cut_tv", 200, 2000);
                    }
                }
                const detail = {
                    date: currDateText,
                    destinationAirport: input.destinationAirport,
                    originAirport: input.originAirport,
                    discountAmount: 0,
                    fullFlightNo: fullFlightNo,
                };
                if (!discountLabel) {
                    detail.fullFlightNo = "查询直减成功有航班但获取直减金额失败";
                }
                else {
                    const discountAmountText = discountLabel.text.replace("立减¥", "");
                    const amount = Number(discountAmountText);
                    if (isNaN(amount)) {
                        detail.fullFlightNo = `解析直减金额失败 ${discountAmountText}`;
                        detail.discountAmount = -5;
                    }
                    else {
                        detail.discountAmount = amount;
                    }
                    if (discountLabel.parent) {
                        const cabinText = selector.findChildById(discountLabel.parent, "cabin_details_code_tv");
                        detail.cabin = (_d = cabinText === null || cabinText === void 0 ? void 0 : cabinText.text) !== null && _d !== void 0 ? _d : "找到直减，但舱位解析失败";
                    }
                }
                result.discounts.push(detail);
                (0, accessibility_1.back)();
            }
            return result;
        }
        catch (error) {
            // 判断登录是否失效
            const login = await this.checkLoginStatus();
            console.error(error);
            const msg = error === null || error === void 0 ? void 0 : error.message;
            (_e = this._handler) === null || _e === void 0 ? void 0 : _e.log(msg);
            this._failedCount++;
            if (msg === null || msg === void 0 ? void 0 : msg.includes("网络好像不给力")) {
                this._networkErrorCount++;
            }
            if (this._networkErrorCount > 1) {
                this.stopApp();
                this._networkErrorCount = 0;
            }
            return {
                success: false,
                message: msg,
                detail: JSON.stringify(error),
                discounts: [
                    {
                        fullFlightNo: msg,
                        date: input.date,
                        destinationAirport: input.destinationAirport,
                        originAirport: input.originAirport,
                    },
                ],
            };
        }
        finally {
            await this.changeProxy(":0");
            if (this._failedCount > 2) {
                try {
                    await this.restartApp();
                    this._failedCount = 0;
                }
                catch (error) {
                    const msg = error === null || error === void 0 ? void 0 : error.message;
                    (_f = this._handler) === null || _f === void 0 ? void 0 : _f.log(msg);
                }
            }
            await this.backToHome();
        }
    }
    findParent(uiObject, id) {
        if (!uiObject.parent) {
            return undefined;
        }
        if (uiObject.parent.id === id) {
            return uiObject.parent;
        }
        else {
            return this.findParent(uiObject.parent, id);
        }
    }
    getFullFlightNoFromCard(card) {
        const flightNoText = selector.getChildById(card, "book_single_list_flight_no_tv");
        const fullFlightNo = flightNoText.text.split(" ")[0];
        return fullFlightNo;
    }
    getStopInfoFromCard(card) {
        const stopInfo = selector.findChildById(card, "book_single_list_stop_tv");
        if (!stopInfo) {
            return undefined;
        }
        return stopInfo.text;
    }
    // 爬取价格
    async QueryFlights(input) {
        var _a, _b;
        try {
            await this.openHome();
            // 如果要求账号和当前账号不一致 则重新登录
            await this.ensureLogin(input.accountInfo);
            (_a = this._handler) === null || _a === void 0 ? void 0 : _a.update(app_base_v9_1.AppDeviceStatusType.Processing, environment_1.environment.loginAccount);
            await this.openHome();
            const beginDate = new Date(input.beginDate);
            const endDate = new Date(input.endDate);
            let currDate = beginDate;
            // 开始查询
            await this.searchFlight(input.originAirport, input.destinationAirport, beginDate);
            await this.waitForLoading();
            await this.waitForTip(false, true);
            const flightsResult = [];
            const result = {
                success: true,
                flights: flightsResult,
            };
            while (currDate <= endDate) {
                await this.waitForLoading();
                await this.waitForTip(true, true);
                await this.clickIfIdExists("close", 200, 2000);
                const currDateText = (0, date_fns_timezone_1.formatToTimeZone)(currDate, DATE_PATTERN, timezoneOptions);
                const flights = await selector.findAllById("item_card_view", 500, 2000);
                if (flights.length === 0) {
                    const noFlights = await selector.findByTextContains("暂时没有可预订", 100, 1000);
                    const sellOut = await selector.findByTextContains("已售罄", 100, 1000);
                    if (noFlights || sellOut) {
                        this.log(`该日期没有航班 ${input.originAirport}-${input.destinationAirport} ${currDateText}`);
                        // 下一天
                        // const nextDayBtn = await selector.getById(
                        //     "include_flight_list_date_bar_rll_right"
                        // );
                        // nextDayBtn.click();
                        // currDate.setDate(currDate.getDate() + 1);
                        continue;
                    }
                    else {
                        throw new Error("查询失败 加载航班失败");
                    }
                }
                for (const flight of flights) {
                    const fullFlightNo = this.getFullFlightNoFromCard(flight);
                    const flightStopInfo = this.getStopInfoFromCard(flight);
                    if (flightStopInfo && flightStopInfo.includes("中转")) {
                        console.log(`中转航班 ${fullFlightNo} 跳过`);
                        continue;
                    }
                    const card = selector.getChildById(flight, "item_flight_time_card");
                    const texts = card.children
                        .map((x) => x.text)
                        .filter((x) => x.length > 0);
                    const detail = {
                        date: currDateText,
                        originAirport: input.originAirport,
                        destinationAirport: input.destinationAirport,
                        fullFlightNo: fullFlightNo,
                    };
                    if (texts.length > 4) {
                        detail.originAirportName = texts[2];
                        detail.destinationAirportName = texts[4];
                    }
                    flightsResult.push(detail);
                    break;
                }
                if (currDate > endDate) {
                    break;
                }
                // 下一天
                // const nextDayBtn = await selector.getById(
                //     "include_flight_list_date_bar_rll_right"
                // );
                // nextDayBtn.click();
                // currDate.setDate(currDate.getDate() + 1);
            }
            return result;
        }
        catch (error) {
            console.error(error);
            const msg = error === null || error === void 0 ? void 0 : error.message;
            (_b = this._handler) === null || _b === void 0 ? void 0 : _b.log(msg);
            return {
                success: false,
                message: msg,
                detail: JSON.stringify(error),
            };
        }
    }
    // 删除常旅客
    async deleteFrequentFlyer(max) {
        await this.openMine();
        await this.clickFrequentlyPassengers();
        // 点击中国境内
        await this.clickIfIdExists("book_activity_passenger_list_tv_domestic", 100, 1000);
        await (0, lang_1.delay)(500);
        let passengerListView = await selector.findById("book_activity_passenger_list_rv_passengerList", 500, 5000);
        if (!passengerListView) {
            this.log(`没找到乘机人列表，跳过乘机人删除过程`);
            return 0;
        }
        if (passengerListView.childCount <= 0) {
            return 0;
        }
        // 滑动到最底部，同时记录乘客信息+人数 然后从后往前 保留max个乘客 删除其他乘客 一次最多删除10人
        let nameCards = [];
        let deleteCount = 0;
        let retry = 30;
        while (retry > 0) {
            retry--;
            const countWhenStart = nameCards.length;
            for (const p of passengerListView.children) {
                const cardNoText = selector.findChildById(p, "book_item_my_passenger_tv_certNum");
                const nameText = selector.findChildById(p, "book_item_my_passenger_tv_psgName");
                if (!cardNoText || !nameText) {
                    continue;
                }
                const nameCardNo = nameText.text + cardNoText.text;
                if (!nameCards.find((x) => x === nameCardNo)) {
                    nameCards.push(nameCardNo);
                }
                if (nameCards.length > max) {
                    deleteCount++;
                    const checkBox = selector.getChildById(p, "book_item_my_passenger_cb_check");
                    if (!checkBox.checked) {
                        checkBox.click();
                    }
                }
            }
            if (nameCards.length === countWhenStart) {
                break;
            }
            passengerListView.scrollForward();
            await (0, lang_1.delay)(500);
            passengerListView = await selector.getById("book_activity_passenger_list_rv_passengerList");
        }
        this.log(`获取所有乘客证件号${nameCards.length}个 ${nameCards.join("|")}`);
        if (nameCards.length <= max) {
            this.log(`不需要删除常旅客`);
            (0, accessibility_1.back)();
            return 0;
        }
        else {
            // 点击删除
            const deleteBtn = await selector.getById("book_activity_passenger_list_menu_delete");
            this.log(`点击乘机人批量删除按钮 ${deleteBtn.click()}`);
            if (await this.waitForLoading()) {
                (0, accessibility_1.back)();
                await (0, lang_1.delay)(1000);
                (0, accessibility_1.back)();
                return deleteCount;
            }
            await this.waitForTip(false, true);
            (0, accessibility_1.back)();
            await (0, lang_1.delay)(1000);
            (0, accessibility_1.back)();
            return deleteCount;
        }
    }
    async useCoupon(input) {
        const couponCabinPrices = input.cabinPriceInfos.filter((x) => x.couponCode);
        const couponCount = couponCabinPrices.length;
        if (couponCount > 0) {
            const couponAmount = couponCabinPrices[0].couponAmount;
            const couponBtn = await selector.getById("item_order_segment_flight_detail_lly_coupon");
            couponBtn.click();
            await this.waitForLoading();
            let couponContent = await selector.getById("discount_coupon_content_rv");
            let checkedCount = 0;
            let retry = 5;
            while (retry > 0) {
                retry--;
                for (const layout of couponContent.children.reverse()) {
                    const couponCodeText = selector.findChildById(layout, "discount_coupon_number_tv");
                    if (!couponCodeText) {
                        continue;
                    }
                    const disabled = selector.findChildById(layout, "discount_coupon_bottom_disable_rl");
                    let used = selector.findChildById(layout, "discount_coupon_used_iv");
                    if (used || disabled) {
                        continue;
                    }
                    // 校验金额
                    const couponAmountText = selector.getChildById(layout, "discount_coupon_price_tv");
                    const amount = Number(couponAmountText.text);
                    if (isNaN(amount)) {
                        (0, accessibility_1.back)();
                        await this.waitForTip(false, true, false);
                        throw new Error(`解析优惠券金额失败 ${couponAmountText.text}不是有效的数字`);
                    }
                    if (amount !== couponAmount) {
                        (0, accessibility_1.back)();
                        await this.waitForTip(false, true, false);
                        throw new Error(`优惠券金额不匹配 预期${couponAmount} 实际${amount}`);
                    }
                    await (0, accessibility_1.click)(layout.boundsInScreen.centerX, layout.boundsInScreen.centerY);
                    await (0, lang_1.delay)(700);
                    if (couponCount > 1) {
                        await this.clickIfIdExists("dialog_discount_coupon_confirm_tv", 100, 2000);
                        await (0, lang_1.delay)(1000);
                    }
                    checkedCount++;
                    if (checkedCount == couponCount) {
                        break;
                    }
                }
                if (checkedCount == couponCount) {
                    break;
                }
                // 多人的时候才需要翻页
                if (couponCount > 1) {
                    couponContent.scrollForward();
                    await (0, lang_1.delay)(1000);
                    couponContent = await selector.getById("discount_coupon_content_rv");
                }
            }
            if (checkedCount < couponCount) {
                (0, accessibility_1.back)();
                await this.waitForTip(false, true, false);
                throw new Error(`优惠券数量不足 需要${couponCount}个 实际${checkedCount} 个`);
            }
            else {
                await (0, lang_1.delay)(700);
                if (couponCount > 1) {
                    const confirmBtn = await selector.getById("discount_coupon_confirm_bt");
                    confirmBtn.click();
                }
            }
        }
    }
    async useCouponRoundTrip(input) {
        const couponCabinPrices = input.cabinPriceInfos.filter((x) => x.couponCode);
        const couponCount = couponCabinPrices.length;
        if (couponCount > 0) {
            const couponAmount = couponCabinPrices[0].couponAmount;
            const couponBtn = await selector.getById("item_order_segment_flight_detail_lly_coupon");
            couponBtn.click();
            const couponPriceLabels = await selector.findAllById("discount_coupon_price_rl", 200, 2000);
            let index = 0;
            for (const label of couponPriceLabels) {
                const couponItem = selector.findClickableParent(label);
                if (!couponItem) {
                    throw new Error("选择优惠券失败，找不到可点击优惠券对象");
                }
                const disabled = selector.findChildById(couponItem, "discount_coupon_bottom_disable_rl");
                if (disabled) {
                    continue;
                }
                // 校验金额
                const couponAmountText = selector.getChildById(couponItem, "discount_coupon_price_tv");
                const amount = Number(couponAmountText.text);
                if (isNaN(amount)) {
                    (0, accessibility_1.back)();
                    await this.waitForTip(false, true, false);
                    throw new Error(`解析优惠券金额失败 ${couponAmountText.text} 不是有效的数字`);
                }
                if (amount !== couponAmount) {
                    (0, accessibility_1.back)();
                    await this.waitForTip(false, true, false);
                    throw new Error(`优惠券金额不匹配 预期${couponAmount} 实际${amount} `);
                }
                couponItem.click();
                const confirm = await selector.getById("dialog_discount_coupon_confirm_tv");
                confirm.click();
                index++;
                if (index >= couponCount) {
                    break;
                }
            }
            if (index < couponCount) {
                (0, accessibility_1.back)();
                await this.waitForTip(false, true, false);
                throw new Error(`优惠券数量不足 需要${couponCount}个 实际${index} 个`);
            }
            else {
                await (0, lang_1.delay)(700);
                const confirmBtn = await selector.getById("discount_coupon_confirm_bt");
                confirmBtn.click();
            }
        }
    }
    async stopApp() {
        await (0, lang_1.delay)(2000);
        if (environment_1.environment.adb) {
            this.log(`关闭APP ${await (0, shell_1.exec)(`am force-stop ${exports.appId}`, { adb: true, })} `);
            process.exit(-666);
        }
        else {
            await this.backToHome();
            (0, accessibility_1.back)();
            (0, accessibility_1.back)();
            (0, accessibility_1.back)();
            process.exit(-666);
        }
    }
    async restartApp() {
        if (environment_1.environment.adb) {
            this.log(`关闭APP ${await (0, shell_1.exec)(`am force-stop ${exports.appId}`, { adb: true, })} `);
            await (0, lang_1.delay)(3000);
            this.log(`启动APP ${app.launch(exports.appId)} `);
            return true;
        }
        else {
            (0, toast_1.showToast)("重启APP失败没有adb权限");
            return false;
        }
    }
    async checkLoginStatus() {
        const loginPage = await selector.findById("activity_login_rgp", 100, 1000);
        if (loginPage) {
            environment_1.environment.loginAccount = "";
            (0, accessibility_1.back)();
            return false;
        }
        else {
            const newPearlCard = await selector.findById("pearlCard", 100, 3000);
            if (newPearlCard) {
                environment_1.environment.loginAccount = "";
                (0, accessibility_1.back)();
                return false;
            }
            else {
                const loginBtn = await selector.findById("ll_head_portrait", 100, 1000);
                if (loginBtn) {
                    environment_1.environment.loginAccount = "";
                    (0, accessibility_1.back)();
                    return false;
                }
            }
            return true;
        }
    }
    async confirmOrder() {
        (await selector.getById("activity_order_tv_orderBook")).click();
        await this.waitForLoading();
        // 可能提示乘机人不一致
        await this.waitForTipAndClose("你选择的是", "button1", 100, 1000);
        await this.waitForTipAndClose("请您尽快支付并办理登机牌", "button2", 100, 1000);
        await this.waitForTipAndClose("证件确认", "book_dialog_certificate_type_tv_confirm", 100, 1000);
        await this.waitForTipAndClose("临近起飞航班提示", "button2", 100, 1000);
        const insuranceTip = await selector.findById("book_item_order_insurance_dialog_tv_give_up", 100, 1000);
        if (insuranceTip) {
            console.log(`点击放弃保险 ${insuranceTip.click()} `);
        }
        await this.waitForLoading();
        let agreementBtn = await selector.findById("agreement_confirm_bt", 500, 5000);
        if (agreementBtn) {
            console.log(`点击承诺书 ${agreementBtn.click()} `);
        }
        // 填写订单页面点击了去支付按钮后，会重新回到填写订单页面，出现剩余票数的提示
        await this.waitForTipAndClose("剩余票数紧张", "button1", 400, 2000);
        await this.waitForTipAndClose("临近起飞航班提示", "button2", 100, 1000);
        const yxffPage = await selector.findByTextContains("优选服务", 100, 1000);
        if (yxffPage) {
            this.log(`当前页面是优选服务`);
            let payBtn = await selector.findById("activity_xproduct_click_order", 200, 1000);
            let retry = 10;
            while (retry > 0 && !payBtn) {
                retry--;
                await this.waitForLoading();
                this.log(`未找到支付按钮尝试再次点击 agreement_confirm_bt`);
                let agreementBtn = await selector.findById("agreement_confirm_bt", 500, 5000);
                if (agreementBtn) {
                    console.log(`点击承诺书 ${agreementBtn.click()} `);
                }
                await this.waitForTipAndClose("剩余票数紧张", "button1", 400, 2000);
                if (retry == 1) {
                    (0, accessibility_1.back)();
                    (0, accessibility_1.back)();
                    await (0, lang_1.delay)(1000);
                }
                payBtn = await selector.findById("activity_xproduct_click_order", 200, 1000);
            }
            if (!payBtn) {
                throw new Error("找不到支付按钮");
            }
            this.log(`点击支付按钮后等待1秒 ${payBtn.click()} `);
            await (0, lang_1.delay)(1000);
            await this.waitForLoading();
            await this.waitForTipAndClose("剩余票数紧张", "button1", 200, 2000);
            let msg = await this.waitForResultTip(false, false, false);
            retry = 10;
            while (msg && msg.indexOf("剩余票数紧张") > -1 && retry > 0) {
                retry--;
                await this.waitForLoading();
                await this.waitForTipAndClose("剩余票数紧张", "button1", 400, 2000);
                await (0, lang_1.delay)(1000);
                msg = await this.waitForResultTip(false, false, false);
            }
        }
        let orderNoText = await selector.findById("activity_pay_order_tv_orderNo", 100, 1000);
        if (!orderNoText) {
            this.log(`未找到订单号`);
            const msg = await this.waitForResultTip(false, true, true);
            this.log(`下单出现提示 ${msg} `);
            if ((msg === null || msg === void 0 ? void 0 : msg.includes("不符合活动规则")) || (msg === null || msg === void 0 ? void 0 : msg.includes("系统错误")) || (msg === null || msg === void 0 ? void 0 : msg.includes("大家太热情啦"))
                || (msg === null || msg === void 0 ? void 0 : msg.includes("您的优惠券")) || (msg === null || msg === void 0 ? void 0 : msg.includes("您参与活动的次数已达上限")) || (msg === null || msg === void 0 ? void 0 : msg.includes("网络好像不给力"))
                || (msg === null || msg === void 0 ? void 0 : msg.includes("服务器繁忙")) || (msg === null || msg === void 0 ? void 0 : msg.includes("系统开了一个小差")) || (msg === null || msg === void 0 ? void 0 : msg.includes("20000"))) {
                throw new Error(`下单出现错误 ${msg} `);
            }
            const payPage = await selector.findByTextContains("支付订单", 500, 10000);
            if (!payPage) {
                // 当前
                throw new Error("下单失败，跳转下单成功页面失败");
            }
            orderNoText = await selector.findById("activity_pay_order_tv_orderNo", 500, 5000);
            if (!orderNoText) {
                throw new Error("下单成功但获取订单号失败");
            }
        }
        return orderNoText.text.substring(5);
    }
    async confirmOrderRoundTrip(notIdentityCards) {
        var _a, _b, _c, _d, _e, _f;
        await (0, accessibility_1.click)(865, 2250);
        await (0, lang_1.delay)(2000);
        if (notIdentityCards) {
            await (0, accessibility_1.click)(755, 1580);
            await (0, lang_1.delay)(1000);
        }
        await (0, accessibility_1.click)(282, 2220);
        await (0, lang_1.delay)(1000);
        const toPayBtn = await selector.findByTextContains("去支付", 200, 2000);
        if (!toPayBtn) {
            throw new Error("未找到去支付");
        }
        toPayBtn.click();
        await (0, lang_1.delay)(5000);
        let dialog = await (0, accessibility_1.select)({ className: 'android.app.Dialog' }).firstOrNull();
        if (dialog) {
            const textViewItem = (_c = (_b = (_a = new ui_object_helper_1.UiObjectHelper(dialog)
                .findChild("android.view.View", 0)) === null || _a === void 0 ? void 0 : _a.findChild("android.view.View", 0)) === null || _b === void 0 ? void 0 : _b.findChild("android.view.View", 0)) === null || _c === void 0 ? void 0 : _c.findChild("android.widget.TextView", 0);
            console.log(textViewItem === null || textViewItem === void 0 ? void 0 : textViewItem.item.text);
            let msg = textViewItem === null || textViewItem === void 0 ? void 0 : textViewItem.item.text;
            if (msg && (msg.includes('不符合活动规则') || msg.includes('系统错误') || msg.includes('下单出现错误'))) {
                await (0, accessibility_1.click)(530, 1500);
                throw new Error(msg);
            }
            else {
                // 点击剩余票数紧张
                await (0, accessibility_1.click)(530, 1500);
                await (0, lang_1.delay)(1000);
            }
        }
        let orderNoText = await selector.findById("activity_pay_order_tv_orderNo", 500, 20000);
        if (!orderNoText) {
            dialog = await (0, accessibility_1.select)({ className: 'android.app.Dialog' }).firstOrNull();
            if (dialog) {
                const textViewItem = (_f = (_e = (_d = new ui_object_helper_1.UiObjectHelper(dialog)
                    .findChild("android.view.View", 0)) === null || _d === void 0 ? void 0 : _d.findChild("android.view.View", 0)) === null || _e === void 0 ? void 0 : _e.findChild("android.view.View", 0)) === null || _f === void 0 ? void 0 : _f.findChild("android.widget.TextView", 0);
                console.log(textViewItem === null || textViewItem === void 0 ? void 0 : textViewItem.item.text);
                let msg = textViewItem === null || textViewItem === void 0 ? void 0 : textViewItem.item.text;
                if (msg && (msg.includes('不符合活动规则') || msg.includes('系统错误') || msg.includes('下单出现错误'))) {
                    await (0, accessibility_1.click)(530, 1500);
                    throw new Error(msg);
                }
                else {
                    // 点击剩余票数紧张
                    await (0, accessibility_1.click)(540, 1500);
                    await (0, lang_1.delay)(1000);
                }
            }
            await (0, accessibility_1.click)(350, 1460);
            await (0, lang_1.delay)(1000);
            const payPage = await selector.findByTextContains("支付订单", 500, 10000);
            if (!payPage) {
                // 当前
                throw new Error("下单失败，跳转下单成功页面失败");
            }
            orderNoText = await selector.findById("activity_pay_order_tv_orderNo", 500, 5000);
            if (!orderNoText) {
                throw new Error("下单成功但获取订单号失败");
            }
        }
        return orderNoText.text.substring(5);
    }
    async getTotalPrice() {
        const totalPriceText = await selector.getById("activity_order_tv_totalPrice");
        const totalPrice = Number(totalPriceText.text);
        if (isNaN(totalPrice)) {
            throw new Error(`解析支付总价失败 ${totalPriceText.text} 不是有效的数字`);
        }
        return totalPrice;
    }
    async getTotalPriceRoundTrip() {
        var _a, _b, _c;
        const totalLabel = await selector.findByTextContains("订单总额", 200, 2000);
        console.log(totalLabel);
        const totalText = (_c = (_b = (_a = totalLabel === null || totalLabel === void 0 ? void 0 : totalLabel.parent) === null || _a === void 0 ? void 0 : _a.children.find(x => x.text.includes("¥"))) === null || _b === void 0 ? void 0 : _b.text) === null || _c === void 0 ? void 0 : _c.replace("¥", "");
        const totalPrice = Number(totalText);
        if (isNaN(totalPrice)) {
            throw new Error(`解析支付总价失败 ${totalText} 不是有效的数字`);
        }
        return totalPrice;
    }
    async checkPrices(args, product) {
        const result = [];
        const priceDetailBtn = await selector.getById("activity_order_layout_priceDetail");
        priceDetailBtn.click();
        try {
            const container = await selector.getById("ll_container");
            const priceTexts = this.getPrices(container);
            let childTicketPrice = undefined;
            let childOilFee = undefined;
            const adultDetail = priceTexts.find((x) => x.type === app_base_v9_1.PassengerType.Adult);
            if (!adultDetail) {
                throw new Error("未找到成人价格");
            }
            const adultTicketPrice = Number(adultDetail.ticket);
            if (isNaN(adultTicketPrice)) {
                throw new Error(`解析成人详情结算价失败 ${adultDetail.ticket} 不是有效的数字`);
            }
            if (product.ticketPrice != adultTicketPrice) {
                throw new Error(`成人票面下单前变价${product.ticketPrice} -> ${adultTicketPrice} `);
            }
            const childDetail = priceTexts.find((x) => x.type === app_base_v9_1.PassengerType.Child);
            if (childDetail) {
                childTicketPrice = Number(childDetail.ticket);
                if (isNaN(childTicketPrice)) {
                    throw new Error(`解析儿童详情结算价失败 ${childDetail.ticket} 不是有效的数字`);
                }
                childOilFee = Number(childDetail.tax);
                if (isNaN(childOilFee)) {
                    throw new Error(`解析儿童燃油失败 ${childDetail.tax} 不是有效的数字`);
                }
            }
            const discount = product.ticketPrice - product.settlementPrice;
            const couponCodes = args.cabinPriceInfos.filter((x) => x.couponCode).length;
            for (const cabinPrice of args.cabinPriceInfos) {
                const actualPrice = cabinPrice;
                // 如果总税费，不等与实际总税费,那么基建不变,实际燃油 = 后台给的燃油 - （后台给的总税费 - 实际总税费）
                switch (actualPrice.type) {
                    case app_base_v9_1.PassengerType.Adult:
                        actualPrice.ticketPrice = adultTicketPrice;
                        actualPrice.settlementPrice = adultTicketPrice - (couponCodes > 0 ? actualPrice.couponAmount : discount);
                        actualPrice.cabin = product.cabin;
                        actualPrice.airportTax = Number(adultDetail.tax) !== (cabinPrice.airportTax + cabinPrice.oilFee) ? cabinPrice.airportTax - (cabinPrice.totalTax - Number(adultDetail.tax)) : cabinPrice.airportTax;
                        actualPrice.oilFee = cabinPrice.oilFee;
                        actualPrice.totalTax = actualPrice.airportTax + actualPrice.oilFee;
                        break;
                    case app_base_v9_1.PassengerType.Child:
                        const tp = childTicketPrice !== null && childTicketPrice !== void 0 ? childTicketPrice : actualPrice.ticketPrice;
                        actualPrice.ticketPrice = tp;
                        actualPrice.settlementPrice = tp - (couponCodes > 0 ? actualPrice.couponAmount : discount);
                        actualPrice.cabin = product.cabin;
                        actualPrice.airportTax = 0;
                        actualPrice.oilFee = childOilFee !== null && childOilFee !== void 0 ? childOilFee : 0;
                        actualPrice.totalTax =
                            actualPrice.airportTax + actualPrice.oilFee;
                        break;
                    case app_base_v9_1.PassengerType.Infant:
                        break;
                    default:
                        break;
                }
                result.push(actualPrice);
            }
            return result;
        }
        finally {
            (0, accessibility_1.back)();
        }
    }
    async checkPricesRoundTrip(args, product) {
        const result = [];
        let priceDetailBtn = await selector.findByTextContains("明细", 200, 2000);
        if (!priceDetailBtn) {
            throw new Error("明细不存在");
        }
        priceDetailBtn.click();
        await (0, lang_1.delay)(1200);
        try {
            let root = await selector.getById("root");
            let detailPanel = root.children[0].children[root.children[0].childCount - 1]
                .children[1];
            let retry = 5;
            while (retry > 0 && !root.children[0]) {
                root = await selector.getById("root");
                detailPanel =
                    root.children[0].children[root.children[0].childCount - 1]
                        .children[1];
            }
            this.printNode(detailPanel, "");
            const prices = this.getPriceDetails(detailPanel);
            const adult = prices.find((x) => x.type === app_base_v9_1.PassengerType.Adult);
            if (!adult) {
                throw new Error("找不到成人价格");
            }
            if (product.ticketPrice != adult.ticketPrice) {
                throw new Error(`成人票面下单前变价${product.ticketPrice} -> ${adult.ticketPrice} `);
            }
            let childTicketPrice = undefined;
            let childOilFee = undefined;
            const child = prices.find((x) => x.type === app_base_v9_1.PassengerType.Child);
            if (child) {
                childTicketPrice = child.ticketPrice;
                childOilFee = child.totalTax;
            }
            const discount = product.ticketPrice - product.settlementPrice;
            const couponCodes = args.cabinPriceInfos.filter((x) => x.couponCode).length;
            for (const cabinPrice of args.cabinPriceInfos) {
                const actualPrice = cabinPrice;
                switch (actualPrice.type) {
                    case app_base_v9_1.PassengerType.Adult:
                        actualPrice.ticketPrice = adult.ticketPrice;
                        actualPrice.settlementPrice = adult.ticketPrice - (couponCodes > 0 ? actualPrice.couponAmount : discount);
                        ;
                        actualPrice.cabin = product.cabin;
                        actualPrice.airportTax = cabinPrice.airportTax;
                        actualPrice.oilFee = cabinPrice.oilFee;
                        actualPrice.totalTax =
                            actualPrice.airportTax + actualPrice.oilFee;
                        break;
                    case app_base_v9_1.PassengerType.Child:
                        const tp = childTicketPrice !== null && childTicketPrice !== void 0 ? childTicketPrice : actualPrice.ticketPrice;
                        actualPrice.ticketPrice = tp;
                        actualPrice.settlementPrice = tp - (couponCodes > 0 ? actualPrice.couponAmount : discount);
                        actualPrice.cabin = product.cabin;
                        actualPrice.airportTax = 0;
                        actualPrice.oilFee = childOilFee !== null && childOilFee !== void 0 ? childOilFee : 0;
                        actualPrice.totalTax =
                            actualPrice.airportTax + actualPrice.oilFee;
                        break;
                    case app_base_v9_1.PassengerType.Infant:
                        break;
                    default:
                        break;
                }
                result.push(actualPrice);
            }
            return result;
        }
        finally {
            priceDetailBtn = await selector.findByTextContains("明细", 200, 2000);
            if (!priceDetailBtn) {
                throw new Error("明细不存在");
            }
            priceDetailBtn.click();
            await (0, lang_1.delay)(1200);
        }
    }
    getPriceDetails(detailPanel) {
        const details = [];
        for (const price of detailPanel.children) {
            if (price.childCount == 0) {
                continue;
            }
            const typeText = price.children[0].text;
            const ticketPriceText = price.children[1].children[2].text;
            const taxText = price.children[2].text.replace("税费¥", "");
            const ticketPrice = Number(ticketPriceText);
            if (isNaN(ticketPrice)) {
                throw new Error(`解析详情票面价失败 ${ticketPriceText} 不是有效的数字`);
            }
            const tax = Number(taxText);
            if (isNaN(tax)) {
                throw new Error(`解析详情税费失败 ${taxText} 不是有效的数字`);
            }
            details.push({
                type: typeText.includes("成人")
                    ? app_base_v9_1.PassengerType.Adult
                    : app_base_v9_1.PassengerType.Child,
                ticketPrice: ticketPrice,
                totalTax: tax,
            });
        }
        return details;
    }
    getPrices(container) {
        var _a, _b, _c, _d, _e;
        // 根据文字描述提取价格信息
        const result = [];
        // const regex = /(?<type>.+?)[:：](?<total>[0-9\.]+?)元.+?(?<count>\d)人.+?(?<ticket>[0-9\.]+?)元.+?(?<tax>[0-9\.]+)/;
        const regex = /(?<type>.+?)[, :：]{1,2}(?<total>[0-9\.]+?)元.+?(?<count>\d)人.+?(?<ticket>[0-9\.]+?)元.+?(?<tax>[0-9\.]+)/;
        for (const item of container.children) {
            if (!item.desc) {
                // const cutText = selector.findChildById(
                //     item,
                //     "price_detail_tv_money_order_cut"
                // );
                continue;
            }
            const match = regex.exec(item.desc);
            if (!match || !match.groups) {
                // throw new Error(`解析价格失败 ${item.desc} `);
                continue;
            }
            const detail = {};
            if (((_a = match.groups) === null || _a === void 0 ? void 0 : _a.type) === "成人") {
                detail.type = app_base_v9_1.PassengerType.Adult;
            }
            else {
                detail.type = app_base_v9_1.PassengerType.Child;
            }
            detail.total = (_b = match.groups) === null || _b === void 0 ? void 0 : _b.total;
            detail.ticket = (_c = match.groups) === null || _c === void 0 ? void 0 : _c.ticket;
            detail.count = (_d = match.groups) === null || _d === void 0 ? void 0 : _d.count;
            detail.tax = (_e = match.groups) === null || _e === void 0 ? void 0 : _e.tax;
            result.push(detail);
        }
        return result;
    }
    async inputContactAndCheck(contact) {
        await this.getAndInputText("item_order_synthesize_detail_et_contactsName", contact.name);
        await this.getAndInputText("item_order_synthesize_detail_et_contactsMobile", contact.phone);
        await this.getAndInputText("item_order_synthesize_detail_et_contactsEmail", contact.email);
        const confirmCheckBox = await selector.getById("activity_order_chb_agreement");
        confirmCheckBox.showOnScreen();
        confirmCheckBox.click();
    }
    async inputContactRoundTrip(contact) {
        var _a, _b;
        const contactPhoneText = await selector.findByTextContains("联系电话");
        if (contactPhoneText) {
            const editText = (_a = contactPhoneText.parent) === null || _a === void 0 ? void 0 : _a.children.find((x) => x.className == "android.widget.EditText");
            if (editText) {
                editText.click();
                await (0, lang_1.delay)(500);
                const contactPhoneClose = (_b = contactPhoneText.parent) === null || _b === void 0 ? void 0 : _b.children.filter((x) => x.className == "android.widget.TextView");
                if (contactPhoneClose && contactPhoneClose.length > 0) {
                    contactPhoneClose[1].click();
                    await (0, lang_1.delay)(500);
                }
                editText.setText(contact.phone);
                await (0, lang_1.delay)(500);
                const cjrText = await selector.findByTextContains("乘机人");
                if (cjrText) {
                    await (0, accessibility_1.click)(cjrText.boundsInScreen.centerX, cjrText.boundsInScreen.centerY);
                }
            }
        }
    }
    async inputContactAndCheckRoundTrip(contact) {
        for (let index = 0; index < 4; index++) {
            await (0, accessibility_1.swipe)(500, 1700, 500, 400, 2000);
            await (0, lang_1.delay)(700);
        }
        const x = 78;
        let y = device_1.device.screenHeight - 420;
        for (let index = 0; index < 6; index++) {
            await (0, accessibility_1.click)(x, y);
            console.log(`Y坐标 ${y}`);
            await (0, lang_1.delay)(700);
            y -= 80;
        }
        // for (let index = 0; index < 4; index++) {
        //     await swipe(500, 400, 500, 1700, 2000);
        //     await delay(700);
        // }
    }
    async inputPassenger(args) {
        const passengerAddBtn = await selector.getById("book_order_passenger_add_layout_add_passenger");
        passengerAddBtn.click();
        if (await this.waitForLoading()) {
            throw new Error("加载乘机人列表超时");
        }
        await this.waitForTip(false, true);
        await this.createOrSelectPassenger(args.passengers);
        // 检查已选择乘机人证件
        await this.validatePassengerCardNo(args.passengers);
    }
    async inputPassengerRoundTrip(args) {
        var _a;
        const root = await selector.getById("root");
        const listView = new ui_object_helper_1.UiObjectHelper(root.children[0]).findChild("android.widget.ListView", 0);
        if (listView) {
            const views = listView.item.children.length;
            const passengerAddBtn = (_a = new ui_object_helper_1.UiObjectHelper(root.children[0])
                .findChild("android.widget.ListView", 0)) === null || _a === void 0 ? void 0 : _a.findChild("android.view.View", views - 1);
            if (passengerAddBtn == null) {
                throw new Error("点击添加乘机人失败");
            }
            passengerAddBtn.click();
        }
        if (await this.waitForLoading()) {
            throw new Error("加载乘机人列表超时");
        }
        await this.waitForTip(false, true);
        await this.selectPassengersRoundTrip(args.passengers);
        const nextBtns = await selector.findAllByTextContains("下一步", 200, 2000);
        if (nextBtns.length === 0) {
            this.log(`出现提示点击确定 ${await (0, accessibility_1.click)(715, 1460)} `);
        }
        await (0, lang_1.delay)(1000);
    }
    async validatePassengerCardNo(passengers) {
        let passengerListView = await selector.getById("book_order_passenger_list_rcy_passengers");
        let infCount = 0;
        const selectedCardNos = [];
        for (let index = 0; index < passengerListView.children.length; index++) {
            const p = passengerListView.children[index];
            const checked = selector.getChildById(p, "book_order_passenger_item_cb_select").checked;
            if (!checked) {
                continue;
            }
            const no = selector.getChildById(p, "book_order_passenger_item_tv_psgCertificate");
            selectedCardNos.push(no.text);
            const carrier = selector.findChildById(p, "book_order_passenger_item_layout_carry");
            if (carrier) {
                if (infCount > 0) {
                    throw new Error("一个订单只支持一个婴儿");
                }
                this.log(`婴儿需要选择携带人 点击选择携带人 ${carrier.click()} `);
                const confirm = await selector.getById("dialog_bottom_one_wheel_confrim", 200, 2000);
                this.log(`点击确认携带人 ${confirm.click()} `);
                infCount++;
                passengerListView = await selector.getById("book_order_passenger_list_rcy_passengers");
            }
        }
        for (const p of passengers) {
            if (!selectedCardNos.find((x) => x.includes(p.identityInfo.cardNo))) {
                throw new Error(`校验已选择的乘机人失败 乘机人${this.getFullName(p.name)} 未选中`);
            }
        }
    }
    // 点击常用乘机人
    async clickFrequentlyPassengers() {
        var _a, _b;
        let basicInfo = await selector.findByTextContains("基本信息", 100, 2000);
        if (!basicInfo) {
            return;
        }
        basicInfo.showOnScreen();
        (_a = selector.findClickableParent(basicInfo)) === null || _a === void 0 ? void 0 : _a.click();
        let passengerManager = await selector.findByTextContains("常用乘机人", 200, 2000);
        if (passengerManager) {
            (_b = selector.findClickableParent(passengerManager)) === null || _b === void 0 ? void 0 : _b.click();
        }
        else {
            return;
        }
        await this.waitForLoading();
    }
    /**
     * 往返：常用乘机人页面新增常用乘机人
     * @param passengers 乘机人
     * @returns
     */
    async createPassengersRoundTrip(passengers) {
        var _a;
        await (0, lang_1.delay)(2000);
        await this.clickFrequentlyPassengers();
        // 点击中国境内
        await this.clickIfIdExists("book_activity_passenger_list_tv_domestic", 100, 1000);
        // 检查是否已有，如果有则跳过
        // const existNameCardNos: string[] = [];
        // const targetNameCardNos: string[] = passengers.map(
        //   (x) => this.getFullName(x.name) + x.identityInfo.cardNo
        // );
        const existNames = [];
        const targetNames = passengers.map((x) => this.getFullName(x.name) + '');
        let passengerListView = await selector.findById("book_activity_passenger_list_rv_passengerList", 500, 5000);
        if (!passengerListView) {
            throw new Error("找不到乘机人列表，新增常用乘机人失败");
        }
        // this.log(`目标乘机人信息 ${JSON.stringify(targetNameCardNos)} `);
        this.log(`目标乘机人信息 ${JSON.stringify(targetNames)}`);
        if (passengerListView.children.length > 0) {
            let retry = 30;
            // let lastNameCardNo: string = "";
            let lastName = "";
            while (retry > 0) {
                retry--;
                const lastChild = passengerListView.children.at(-1);
                if (lastChild) {
                    // const lastNameCardNos = await this.getNameAndCardNoRoundTrip(lastChild);
                    // if (lastNameCardNos === lastNameCardNo) {
                    //   break;
                    // }
                    const lastNames = await this.getNameRoundTrip(lastChild);
                    if (lastNames === lastName) {
                        break;
                    }
                }
                for (const p of passengerListView.children) {
                    // const nameCardNo = await this.getNameAndCardNoRoundTrip(p);
                    // for (const item of targetNameCardNos) {
                    //   this.log(
                    //     `是否存在目标乘机人 ${this.isMatch(
                    //       nameCardNo,
                    //       item
                    //     )
                    //     } `
                    //   );
                    //   if (this.isMatch(nameCardNo, item)) {
                    //     this.log(`跳过已存在的乘机人 ${nameCardNo} `);
                    //     if (existNameCardNos.filter(x => x === nameCardNo)?.length === 0) {
                    //       existNameCardNos.push(nameCardNo);
                    //     }
                    //   }
                    // }
                    // lastNameCardNo = nameCardNo;
                    const name = await this.getNameRoundTrip(p);
                    for (const item of targetNames) {
                        this.log(`是否存在目标乘机人 ${this.isMatch(name, item)} `);
                        if (this.isMatch(name, item)) {
                            this.log(`跳过已存在的乘机人 ${name} `);
                            if (((_a = existNames.filter(x => x === name)) === null || _a === void 0 ? void 0 : _a.length) === 0) {
                                existNames.push(name);
                            }
                        }
                    }
                    lastName = name;
                }
                passengerListView.scrollForward();
                await (0, lang_1.delay)(1000);
                passengerListView = await selector.getById("book_activity_passenger_list_rv_passengerList");
            }
        }
        // this.log(`已存在的乘机人有： ${existNameCardNos.join(",")} `);
        // if (targetNameCardNos.length === existNameCardNos.length) {
        //   this.log(
        //     `目标乘机人数${targetNameCardNos.length} 选中乘机人数${existNameCardNos.length} 相等，退出当前页面`
        //   );
        //   back();
        //   return;
        // }
        this.log(`已存在的乘机人有： ${existNames.join(",")} `);
        if (targetNames.length === existNames.length) {
            this.log(`目标乘机人数${targetNames.length} 选中乘机人数${existNames.length} 相等，退出当前页面`);
            (0, accessibility_1.back)();
            return;
        }
        // 新建
        for (const psg of passengers) {
            const namecard = this.getFullName(psg.name) + psg.identityInfo.cardNo;
            if (existNames.length > 0) {
                for (const ex of existNames) {
                    if (this.isMatch(ex, namecard)) {
                        console.log(`跳过已存在的乘机人 ${namecard} `);
                        continue;
                    }
                    else {
                        this.log(`新增乘机人`);
                        await this.addPassengerRoundTrip(psg);
                    }
                }
            }
            else {
                this.log(`新增乘机人`);
                await this.addPassengerRoundTrip(psg);
            }
        }
        await (0, lang_1.delay)(1000);
        (0, accessibility_1.back)();
    }
    // async getNameAndCardNoRoundTrip(item: UiObject): Promise<string> {
    //   const name = selector.getChildById(
    //     item,
    //     "book_item_my_passenger_tv_psgName"
    //   ).text;
    //   const cardNoRaw = selector.getChildById(
    //     item,
    //     "book_item_my_passenger_tv_certNum"
    //   ).text;
    //   const nameCardNo = name + cardNoRaw.split(" ").at(-1);
    //   console.log(
    //     `获取乘机人信息 ${name} ${cardNoRaw} 最终结果 ${nameCardNo} `
    //   );
    //   return nameCardNo;
    // }
    async getNameRoundTrip(item) {
        const name = selector.getChildById(item, "book_item_my_passenger_tv_psgName").text;
        console.log(`获取乘机人信息 ${name}`);
        return name;
    }
    async selectPassengersRoundTrip(passengers) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v;
        const selectedNameCardNos = [];
        const targetNameCardNos = passengers.map((x) => this.getFullName(x.name) + x.identityInfo.cardNo);
        let root = await selector.getById("root");
        let passengerListView = new ui_object_helper_1.UiObjectHelper(root.children[0])
            .findChild("android.view.View", 0);
        if (!passengerListView) {
            throw new Error("找不到乘机人列表，编辑乘机人失败");
        }
        let index = 1;
        for (; index < 8; index++) {
            const element = (_a = passengerListView.item) === null || _a === void 0 ? void 0 : _a.children[index];
            if (!element) {
                break;
            }
            if (element.childCount < 1) {
                continue;
            }
            const nameItem = (_c = (_b = new ui_object_helper_1.UiObjectHelper(element)
                .findChild("android.view.View", 1)) === null || _b === void 0 ? void 0 : _b.findChild("android.view.View", 0)) === null || _c === void 0 ? void 0 : _c.findChild("android.widget.TextView", 0);
            const cardItem = (_e = (_d = new ui_object_helper_1.UiObjectHelper(element)
                .findChild("android.view.View", 1)) === null || _d === void 0 ? void 0 : _d.findChild("android.view.View", 0)) === null || _e === void 0 ? void 0 : _e.findChild("android.widget.TextView", 1);
            if (!nameItem ||
                !cardItem ||
                !nameItem.item.text ||
                !cardItem.item.text) {
                continue;
            }
            const nameCardNo = this.getNameCardNoRoundTrip(nameItem.item.text, cardItem.item.text);
            if (targetNameCardNos.find((x) => this.isMatch(nameCardNo, x))) {
                if (!selectedNameCardNos.find(x => x.includes(nameCardNo))) {
                    await (0, accessibility_1.click)(nameItem.item.boundsInScreen.centerX, nameItem.item.boundsInScreen.centerY);
                    selectedNameCardNos.push(nameCardNo);
                    await (0, lang_1.delay)(700);
                }
            }
        }
        if (targetNameCardNos.length === selectedNameCardNos.length) {
            await this.confirmPassengerRoundTrip();
            return;
        }
        await (0, accessibility_1.swipe)(500, 2150, 500, 300, 3000);
        await (0, lang_1.delay)(1000);
        console.log("翻页");
        root = await selector.getById("root");
        passengerListView = new ui_object_helper_1.UiObjectHelper(root.children[0])
            .findChild("android.view.View", 0);
        if (!passengerListView) {
            throw new Error("找不到乘机人列表，编辑乘机人失败");
        }
        this.log(`获取到列表数 ${passengerListView.item.childCount} `);
        for (; index < 16; index++) {
            const element = (_f = passengerListView.item) === null || _f === void 0 ? void 0 : _f.children[index];
            if (!element) {
                break;
            }
            if (element.childCount < 1) {
                continue;
            }
            const nameItem = (_h = (_g = new ui_object_helper_1.UiObjectHelper(element)
                .findChild("android.view.View", 1)) === null || _g === void 0 ? void 0 : _g.findChild("android.view.View", 0)) === null || _h === void 0 ? void 0 : _h.findChild("android.widget.TextView", 0);
            const cardItem = (_k = (_j = new ui_object_helper_1.UiObjectHelper(element)
                .findChild("android.view.View", 1)) === null || _j === void 0 ? void 0 : _j.findChild("android.view.View", 0)) === null || _k === void 0 ? void 0 : _k.findChild("android.widget.TextView", 1);
            if (!nameItem ||
                !cardItem ||
                !nameItem.item.text ||
                !cardItem.item.text) {
                continue;
            }
            const nameCardNo = this.getNameCardNoRoundTrip(nameItem.item.text, cardItem.item.text);
            if (targetNameCardNos.find((x) => this.isMatch(nameCardNo, x))) {
                if (!selectedNameCardNos.find(x => x.includes(nameCardNo))) {
                    await (0, accessibility_1.click)(nameItem.item.boundsInScreen.centerX, nameItem.item.boundsInScreen.centerY);
                    selectedNameCardNos.push(nameCardNo);
                    await (0, lang_1.delay)(700);
                }
            }
        }
        if (targetNameCardNos.length === selectedNameCardNos.length) {
            await this.confirmPassengerRoundTrip();
            return;
        }
        // 第3次翻页
        await (0, accessibility_1.swipe)(500, 2150, 500, 300, 3000);
        await (0, lang_1.delay)(1000);
        console.log("翻页");
        root = await selector.getById("root");
        passengerListView = new ui_object_helper_1.UiObjectHelper(root.children[0])
            .findChild("android.view.View", 0);
        if (!passengerListView) {
            throw new Error("找不到乘机人列表，编辑乘机人失败");
        }
        for (; index < 24; index++) {
            const element = (_l = passengerListView.item) === null || _l === void 0 ? void 0 : _l.children[index];
            if (!element) {
                break;
            }
            if (element.childCount < 1) {
                continue;
            }
            const nameItem = (_o = (_m = new ui_object_helper_1.UiObjectHelper(element)
                .findChild("android.view.View", 1)) === null || _m === void 0 ? void 0 : _m.findChild("android.view.View", 0)) === null || _o === void 0 ? void 0 : _o.findChild("android.widget.TextView", 0);
            const cardItem = (_q = (_p = new ui_object_helper_1.UiObjectHelper(element)
                .findChild("android.view.View", 1)) === null || _p === void 0 ? void 0 : _p.findChild("android.view.View", 0)) === null || _q === void 0 ? void 0 : _q.findChild("android.widget.TextView", 1);
            if (!nameItem ||
                !cardItem ||
                !nameItem.item.text ||
                !cardItem.item.text) {
                continue;
            }
            const nameCardNo = this.getNameCardNoRoundTrip(nameItem.item.text, cardItem.item.text);
            if (targetNameCardNos.find((x) => this.isMatch(nameCardNo, x))) {
                if (!selectedNameCardNos.find(x => x.includes(nameCardNo))) {
                    await (0, accessibility_1.click)(nameItem.item.boundsInScreen.centerX, nameItem.item.boundsInScreen.centerY);
                    selectedNameCardNos.push(nameCardNo);
                    await (0, lang_1.delay)(700);
                }
            }
        }
        if (targetNameCardNos.length === selectedNameCardNos.length) {
            await this.confirmPassengerRoundTrip();
            return;
        }
        // 第4次翻页
        await (0, accessibility_1.swipe)(500, 2150, 500, 300, 3000);
        await (0, lang_1.delay)(1000);
        root = await selector.getById("root");
        passengerListView = new ui_object_helper_1.UiObjectHelper(root.children[0])
            .findChild("android.view.View", 0);
        if (!passengerListView) {
            throw new Error("找不到乘机人列表，编辑乘机人失败");
        }
        for (; index < 32; index++) {
            const element = (_r = passengerListView.item) === null || _r === void 0 ? void 0 : _r.children[index];
            if (!element) {
                break;
            }
            if (element.childCount < 1) {
                continue;
            }
            const nameItem = (_t = (_s = new ui_object_helper_1.UiObjectHelper(element)
                .findChild("android.view.View", 1)) === null || _s === void 0 ? void 0 : _s.findChild("android.view.View", 0)) === null || _t === void 0 ? void 0 : _t.findChild("android.widget.TextView", 0);
            const cardItem = (_v = (_u = new ui_object_helper_1.UiObjectHelper(element)
                .findChild("android.view.View", 1)) === null || _u === void 0 ? void 0 : _u.findChild("android.view.View", 0)) === null || _v === void 0 ? void 0 : _v.findChild("android.widget.TextView", 1);
            if (!nameItem ||
                !cardItem ||
                !nameItem.item.text ||
                !cardItem.item.text) {
                continue;
            }
            const nameCardNo = this.getNameCardNoRoundTrip(nameItem.item.text, cardItem.item.text);
            if (targetNameCardNos.find((x) => this.isMatch(nameCardNo, x))) {
                if (!selectedNameCardNos.find(x => x.includes(nameCardNo))) {
                    await (0, accessibility_1.click)(nameItem.item.boundsInScreen.centerX, nameItem.item.boundsInScreen.centerY);
                    selectedNameCardNos.push(nameCardNo);
                    await (0, lang_1.delay)(700);
                }
            }
        }
        if (targetNameCardNos.length === selectedNameCardNos.length) {
            await this.confirmPassengerRoundTrip();
            return;
        }
        throw new Error(`乘机人不匹配 目标${targetNameCardNos.join(",")} 实际${selectedNameCardNos.join(",")} `);
    }
    isMatch(encrypted, full) {
        if (encrypted.length != full.length) {
            return false;
        }
        for (let index = 0; index < encrypted.length; index++) {
            const element = encrypted[index];
            const element2 = full[index];
            if (element === "*") {
                continue;
            }
            if (element !== element2) {
                return false;
            }
        }
        return true;
    }
    getNameCardNoRoundTrip(name, card) {
        var _a, _b, _c;
        const textRegex = /(?<name>.+?)\((?<type>[\u4e00-\u9fa5]+)\)/;
        const cardRegex = /(?<cardType>[\u4e00-\u9fa5]+)(?<cardNo>[\dA-Za-z\*]+)/;
        const nameMatch = textRegex.exec(name);
        if (!nameMatch) {
            throw new Error("姓名提取失败");
        }
        const cardMatch = cardRegex.exec(card);
        if (!cardMatch) {
            throw new Error("证件提取失败");
        }
        const nameCard = ((_b = (_a = nameMatch.groups) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : "") + ((_c = cardMatch.groups) === null || _c === void 0 ? void 0 : _c.cardNo);
        return nameCard;
    }
    async createOrSelectPassenger(passengers) {
        // 删除名字不一致证件号一致的乘机人（名字太长用...省略）
        // const delCardNos: string[] = [];
        // const delNameCardNos: PassengerNameCardNo[] = passengers.map((x) => {
        //   return { name: this.getFullName(x.name) || "", cardNo: x.identityInfo.cardNo };
        // });
        // 检查是否已有，如果有则选中
        const selectedNameCardNos = [];
        // 检查是否已有，如果有则选中(2023/12/05)
        // const selectedCardNos: string[] = [];
        // 目标名称和证件号
        const targetNameCardNos = passengers.map((x) => this.getFullName(x.name) + x.identityInfo.cardNo);
        // 目标证件号
        // const targetCardNos: string[] = passengers.map(
        //   (x) => x.identityInfo.cardNo
        // );
        let passengerListView = await selector.findById("book_activity_order_select_passenger_rcy_passengerList", 500, 5000);
        if (!passengerListView) {
            throw new Error("找不到乘机人列表，编辑乘机人失败");
        }
        if (passengerListView.children.length > 0) {
            let retry = 30;
            let lastNameCardNo = "";
            // let lastCardNo: string = "";
            while (retry > 0) {
                retry--;
                const lastChild = passengerListView.children.at(-1);
                if (lastChild) {
                    const lastNameCardNos = await this.getNameCardNo(lastChild);
                    if (lastNameCardNos === lastNameCardNo) {
                        break;
                    }
                    // const lastCardNos = await this.getCardNo(lastChild);
                    // if (lastCardNos === lastCardNo) {
                    //   break;
                    // }
                }
                // for (const p of passengerListView.children) {
                //   const nameCardNo = await this.getExistNameCardNo(p);
                //   const nameCardNoSpilt = nameCardNo.split(":");
                //   const name = nameCardNoSpilt[0];
                //   const cardNo = nameCardNoSpilt[1];
                //   if (name !== delNameCardNos.find((x) => x.name === name)?.name && cardNo === delNameCardNos.find((x) => x.cardNo === cardNo)?.cardNo) {
                //     const checkBox = selector.getChildById(
                //       p,
                //       "book_order_passenger_item_cb_select"
                //     );
                //     if (!checkBox.checked) {
                //       this.log(`选中证件号相同的乘机人 ${cardNo} ${checkBox.click()}`);
                //     }
                //     delCardNos.push(cardNo);
                //   }
                // }
                // if (delCardNos.length > 0) {
                //   this.clickIfIdExists("book_activity_passenger_list_menu_delete", 100, 1000);
                //   await this.waitForTip(false, true);
                //   await delay(1000);
                // }
                for (const p of passengerListView.children) {
                    const nameCardNo = await this.getNameCardNo(p);
                    // const cardNo = await this.getCardNo(p);
                    if (targetNameCardNos.find((x) => x === nameCardNo) &&
                        !selectedNameCardNos.find((x) => x === nameCardNo)) {
                        const checkBox = selector.getChildById(p, "book_order_passenger_item_cb_select");
                        if (!checkBox.checked) {
                            this.log(`选中已存在乘机人 ${nameCardNo} ${checkBox.click()} `);
                        }
                        selectedNameCardNos.push(nameCardNo);
                    }
                    // if (
                    //   targetCardNos.find((x) => x === cardNo) &&
                    //   !selectedCardNos.find((x) => x === cardNo)
                    // ) {
                    //   const checkBox = selector.getChildById(
                    //     p,
                    //     "book_order_passenger_item_cb_select"
                    //   );
                    //   if (!checkBox.checked) {
                    //     this.log(`选中已存在乘机人 ${cardNo} ${checkBox.click()} `);
                    //   }
                    //   selectedCardNos.push(cardNo);
                    // }
                    lastNameCardNo = nameCardNo;
                    // lastCardNo = cardNo;
                }
                passengerListView.scrollForward();
                await (0, lang_1.delay)(1000);
                passengerListView = await selector.getById("book_activity_order_select_passenger_rcy_passengerList");
            }
        }
        if (targetNameCardNos.length === selectedNameCardNos.length) {
            await this.confirmPassenger();
            return;
        }
        // if (targetCardNos.length === selectedCardNos.length) {
        //   await this.confirmPassenger();
        //   return;
        // }
        // 新建
        for (const psg of passengers) {
            const namecard = this.getFullName(psg.name) + psg.identityInfo.cardNo;
            if (selectedNameCardNos.find((x) => x === namecard)) {
                continue;
            }
            await this.addPassenger(psg);
        }
        // for (const psg of passengers) {
        //   const card = psg.identityInfo.cardNo;
        //   if (selectedCardNos.find((x) => x === card)) {
        //     continue;
        //   }
        //   await this.addPassenger(psg);
        // }
        await this.confirmPassenger();
    }
    async confirmPassenger() {
        (await selector.getById("book_activity_order_select_passenger_tv_ensure")).click();
        await (0, lang_1.delay)(1000);
        const confirmTip = await this.waitForTip(false, true);
        if (confirmTip === null || confirmTip === void 0 ? void 0 : confirmTip.includes("请添加一位18岁以上的乘机人")) {
            await (0, lang_1.delay)(500);
            (0, accessibility_1.back)();
            // 不保存 已选择的乘机人 button2
            await this.waitForTipAndClose("已选择的乘机人", "button2");
            throw new Error(confirmTip);
        }
        else {
            // 偶尔无法关闭
            await this.waitForTip(false, true);
        }
    }
    async confirmPassengerRoundTrip() {
        const root = await selector.getById("root");
        let passengerListView = new ui_object_helper_1.UiObjectHelper(root.children[0]).findChild("android.view.View", 0);
        if (!passengerListView) {
            throw new Error("找不到乘机人列表，编辑乘机人失败");
        }
        const btn = passengerListView.item.children[passengerListView.item.childCount - 1].children[0];
        await (0, accessibility_1.click)(btn.boundsInScreen.centerX, btn.boundsInScreen.centerY);
        await (0, lang_1.delay)(800);
        const confirmTip = await this.waitForTip(false, true);
        if (confirmTip === null || confirmTip === void 0 ? void 0 : confirmTip.includes("请添加一位18岁以上的乘机人")) {
            await (0, lang_1.delay)(500);
            (0, accessibility_1.back)();
            // 不保存 已选择的乘机人 button2
            await this.waitForTipAndClose("已选择的乘机人", "button2");
            throw new Error("请添加一位18岁以上的乘机人");
        }
        else {
            console.log(`保存乘机人出现提示 ${confirmTip} `);
        }
    }
    getFullName(name) {
        switch (name.nameType) {
            case app_base_v9_1.NameType.English:
                return `${name.primary}/${name.secondary}`;
            case app_base_v9_1.NameType.Chinese:
                return name.primary;
            default:
                return undefined;
        }
    }
    async addPassenger(psg) {
        const addBtn = await selector.getById("book_activity_order_select_passenger_layout_addPassenger");
        addBtn.click();
        await this.inputPassengerInfo(psg);
    }
    async addPassengerRoundTrip(psg) {
        const addBtn = await selector.getById("book_activity_passenger_list_layout_addPassenger");
        addBtn.click();
        this.log(`点击新增常用乘机人`);
        await this.inputPassengerInfo(psg);
    }
    /**
     * 输入乘机人信息
     * @param psg 乘机人信息
     */
    async inputPassengerInfo(psg) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
        if (psg.identityInfo.cardNo.length === 18 && (psg.identityInfo.cardNo.startsWith('8300') || psg.identityInfo.cardNo.startsWith('8100'))) {
            psg.identityInfo.type = app_base_v9_1.IdentityCardType.SX;
        }
        if (psg.identityInfo.type == app_base_v9_1.IdentityCardType.HX) {
            psg.identityInfo.type = app_base_v9_1.IdentityCardType.HM;
        }
        if (psg.identityInfo.type == app_base_v9_1.IdentityCardType.TI) {
            psg.identityInfo.type = app_base_v9_1.IdentityCardType.TW;
        }
        if (psg.identityInfo.type === app_base_v9_1.IdentityCardType.NI) {
            const name = (_a = this.getFullName(psg.name)) !== null && _a !== void 0 ? _a : "";
            await this.getAndInputText("book_view_domestic_passenger_new_et_name", name);
            await this.getAndInputText("book_view_domestic_passenger_new_et_certificateNumber", psg.identityInfo.cardNo, true);
            await this.getAndInputText("book_view_domestic_passenger_new_et_phoneNumber", psg.phone, true);
            const identityCardType = await selector.findByTextContains("请输入正确的有效证件号", 100, 1000);
            if (identityCardType) {
                throw new Error("请输入正确的有效证件号 " + psg.identityInfo.cardNo);
            }
        }
        else if (psg.identityInfo.type === app_base_v9_1.IdentityCardType.SX) {
            const certTypeBtn = await selector.getById("book_view_domestic_passenger_new_tv_certificateType");
            certTypeBtn.click();
            await (0, lang_1.delay)(300);
            const ppBtn = await selector.findByTextContains("护照");
            if (!ppBtn) {
                throw new Error("未找到 护照");
            }
            ppBtn.click();
            await (0, lang_1.delay)(300);
            const sxBtn = await selector.findByTextContains("港澳台居民居住证");
            if (!sxBtn) {
                throw new Error("未找到 港澳台居民居住证");
            }
            sxBtn.click();
            await (0, lang_1.delay)(1000);
            (await selector.getById("dialog_bottom_wheel_confrim")).click();
            const name = (_b = this.getFullName(psg.name)) !== null && _b !== void 0 ? _b : "";
            await this.getAndInputText("book_view_domestic_passenger_new_et_name", name);
            await this.getAndInputText("book_view_domestic_passenger_new_et_certificateNumber", psg.identityInfo.cardNo);
            await this.inputBirthDay(psg.birthDate);
            await this.getAndInputText("book_view_domestic_passenger_new_et_phoneNumber", psg.phone, true);
        }
        else if (psg.identityInfo.type === app_base_v9_1.IdentityCardType.PP || psg.identityInfo.type === app_base_v9_1.IdentityCardType.RP || psg.identityInfo.type === app_base_v9_1.IdentityCardType.HY || psg.identityInfo.type === app_base_v9_1.IdentityCardType.YJ) {
            await this.getAndInputText("book_view_domestic_passenger_new_et_phoneNumber", psg.phone, true);
            const certTypeBtn = await selector.getById("book_view_domestic_passenger_new_tv_certificateType");
            certTypeBtn.click();
            await (0, lang_1.delay)(700);
            const ppBtn = await selector.findByTextContains("护照");
            if (!ppBtn) {
                throw new Error("未找到 护照");
            }
            ppBtn.click();
            if (psg.identityInfo.type === app_base_v9_1.IdentityCardType.YJ || psg.identityInfo.type === app_base_v9_1.IdentityCardType.HY) {
                await (0, lang_1.delay)(300);
                const sxBtn = await selector.findByTextContains("港澳台居民居住证");
                if (!sxBtn) {
                    throw new Error("未找到 港澳台居民居住证");
                }
                sxBtn.click();
                await (0, lang_1.delay)(300);
                const hmBtn = await selector.findByTextContains("港澳居民来往内地通行证");
                if (!hmBtn) {
                    throw new Error("未找到 港澳居民来往内地通行证");
                }
                hmBtn.click();
                await (0, lang_1.delay)(300);
                const twBtn = await selector.findByTextContains("台湾居民来往大陆通行证");
                if (!twBtn) {
                    throw new Error("未找到 台湾居民来往大陆通行证");
                }
                twBtn.click();
                await (0, lang_1.delay)(300);
                const csyxzmBtn = await selector.findByTextContains("出生医学证明");
                if (!csyxzmBtn) {
                    throw new Error("未找到 出生医学证明");
                }
                csyxzmBtn.click();
                await (0, lang_1.delay)(300);
                const rpBtn1 = await selector.findByTextContains("外国人永久居留证（新版）");
                if (!rpBtn1) {
                    throw new Error("未找到 外国人永久居留证（新版）");
                }
                rpBtn1.click();
                const rpBtn = await selector.findByTextContains("外国人永久居留证");
                if (!rpBtn) {
                    throw new Error("未找到 外国人永久居留证");
                }
                rpBtn.click();
                if (psg.identityInfo.type === app_base_v9_1.IdentityCardType.HY) {
                    await (0, lang_1.delay)(300);
                    // 目标选择海员证   
                    const hyzBtn = await selector.findByTextContains("海员证");
                    if (!hyzBtn) {
                        throw new Error("未找到 海员证");
                    }
                    hyzBtn.click();
                }
            }
            await (0, lang_1.delay)(1000);
            (await selector.getById("dialog_bottom_wheel_confrim")).click();
            await this.commonInput(psg);
            const certIssueCountryBtn = await selector.getById("book_view_domestic_passenger_new_tv_certIssueCountry");
            const countryCodeName = (0, nationCode_1.getNationCodeName)(psg.identityInfo.countryCode);
            if (countryCodeName && !certIssueCountryBtn.text.includes(countryCodeName)) {
                console.log("签发地 " + countryCodeName);
                certIssueCountryBtn.click();
                await (0, lang_1.delay)(1500);
                let tryCount = 20;
                while (tryCount > 0) {
                    tryCount--;
                    // 选择签发地
                    let listView = await (0, accessibility_1.select)({ className: 'android.widget.ListView' }).firstOrNull();
                    console.log('签发地列表 ' + listView);
                    let viewTexts = (_c = listView === null || listView === void 0 ? void 0 : listView.parent) === null || _c === void 0 ? void 0 : _c.children.filter(x => x.className === 'android.view.View');
                    console.log('签发地列表国家数量 ' + viewTexts && (viewTexts === null || viewTexts === void 0 ? void 0 : viewTexts.length));
                    if (viewTexts && (viewTexts === null || viewTexts === void 0 ? void 0 : viewTexts.length) > 0) {
                        for (const viewText of viewTexts) {
                            console.log('获取到的签发地 ' + viewText.text);
                            if (viewText.text.includes(countryCodeName)) {
                                viewText.click();
                                tryCount = 0;
                                break;
                            }
                        }
                        // 滑动
                        await (0, accessibility_1.swipe)(400, 1700, 400, 300, 1000);
                        await (0, lang_1.delay)(1000);
                        listView = await (0, accessibility_1.select)({ className: 'android.widget.ListView' }).firstOrNull();
                        viewTexts = (_d = listView === null || listView === void 0 ? void 0 : listView.parent) === null || _d === void 0 ? void 0 : _d.children.filter(x => x.className === 'android.view.View');
                    }
                }
            }
            if (psg.identityInfo.certificateValidityDate) {
                await this.inputCertificateValidityDate(psg.identityInfo.certificateValidityDate);
            }
            await this.inputBirthDay(psg.birthDate);
            if (psg.gender) {
                if (psg.gender == app_base_v9_1.GenderType.Female) {
                    await this.clickIfIdExists("book_view_domestic_passenger_new_rb_female", 50, 1000);
                }
                else {
                    await this.clickIfIdExists("book_view_domestic_passenger_new_rb_male", 50, 1000);
                }
            }
            const nationalityBtn = await selector.getById("book_view_domestic_passenger_new_tv_nationality");
            const nationCodeName = (0, nationCode_1.getNationCodeName)(psg.identityInfo.nationCode);
            if (nationCodeName && !nationalityBtn.text.includes(nationCodeName)) {
                nationalityBtn.click();
                await (0, lang_1.delay)(1500);
                let tryCount = 20;
                while (tryCount > 0) {
                    tryCount--;
                    // 选择国家
                    let listView = await (0, accessibility_1.select)({ className: 'android.widget.ListView' }).firstOrNull();
                    let viewTexts = (_e = listView === null || listView === void 0 ? void 0 : listView.parent) === null || _e === void 0 ? void 0 : _e.children.filter(x => x.className === 'android.view.View');
                    if (viewTexts && (viewTexts === null || viewTexts === void 0 ? void 0 : viewTexts.length) > 0) {
                        for (const viewText of viewTexts) {
                            console.log('获取到的国家 ' + viewText.text);
                            if (viewText.text.includes(nationCodeName)) {
                                viewText.click();
                                tryCount = 0;
                                break;
                            }
                        }
                        // 滑动
                        await (0, accessibility_1.swipe)(400, 1700, 400, 300, 1000);
                        await (0, lang_1.delay)(1000);
                        listView = await (0, accessibility_1.select)({ className: 'android.widget.ListView' }).firstOrNull();
                        viewTexts = (_f = listView === null || listView === void 0 ? void 0 : listView.parent) === null || _f === void 0 ? void 0 : _f.children.filter(x => x.className === 'android.view.View');
                    }
                }
            }
        }
        else if (psg.identityInfo.type === app_base_v9_1.IdentityCardType.HM) {
            await this.getAndInputText("book_view_domestic_passenger_new_et_phoneNumber", psg.phone, true);
            const certTypeBtn = await selector.getById("book_view_domestic_passenger_new_tv_certificateType");
            certTypeBtn.click();
            await (0, lang_1.delay)(300);
            const ppBtn = await selector.findByTextContains("护照");
            if (!ppBtn) {
                throw new Error("未找到 护照");
            }
            ppBtn.click();
            await (0, lang_1.delay)(300);
            const sxBtn = await selector.findByTextContains("港澳台居民居住证");
            if (!sxBtn) {
                throw new Error("未找到 港澳台居民居住证");
            }
            sxBtn.click();
            await (0, lang_1.delay)(300);
            const hmBtn = await selector.findByTextContains("港澳居民来往内地通行证");
            if (!hmBtn) {
                throw new Error("未找到 港澳居民来往内地通行证");
            }
            hmBtn.click();
            await (0, lang_1.delay)(1000);
            (await selector.getById("dialog_bottom_wheel_confrim")).click();
            const name = (_g = this.getFullName(psg.name)) !== null && _g !== void 0 ? _g : "";
            await this.getAndInputText("book_view_domestic_passenger_new_et_name", name);
            await this.getAndInputText("book_view_domestic_passenger_new_et_certificateNumber", psg.identityInfo.cardNo, true);
            const certIssueCountryBtn = await selector.getById("book_view_domestic_passenger_new_tv_certIssueCountry");
            const countryCodeName = (0, nationCode_1.getNationCodeName)(psg.identityInfo.countryCode);
            if (countryCodeName && !certIssueCountryBtn.text.includes(countryCodeName)) {
                console.log("签发地 " + countryCodeName);
                certIssueCountryBtn.click();
                await (0, lang_1.delay)(1500);
                let tryCount = 20;
                while (tryCount > 0) {
                    tryCount--;
                    let listView = await (0, accessibility_1.select)({ className: 'android.widget.ListView' }).firstOrNull();
                    let viewTexts = (_h = listView === null || listView === void 0 ? void 0 : listView.parent) === null || _h === void 0 ? void 0 : _h.children.filter(x => x.className === 'android.view.View');
                    if (viewTexts && (viewTexts === null || viewTexts === void 0 ? void 0 : viewTexts.length) > 0) {
                        for (const viewText of viewTexts) {
                            console.log('获取到的签发地 ' + viewText.text);
                            if (viewText.text.includes(countryCodeName)) {
                                viewText.click();
                                tryCount = 0;
                                break;
                            }
                        }
                        await (0, accessibility_1.swipe)(400, 1700, 400, 300, 1000);
                        await (0, lang_1.delay)(1000);
                        listView = await (0, accessibility_1.select)({ className: 'android.widget.ListView' }).firstOrNull();
                        viewTexts = (_j = listView === null || listView === void 0 ? void 0 : listView.parent) === null || _j === void 0 ? void 0 : _j.children.filter(x => x.className === 'android.view.View');
                    }
                }
            }
            await this.inputBirthDay(psg.birthDate);
            const nationalityBtn = await selector.getById("book_view_domestic_passenger_new_tv_nationality");
            const nationCodeName = (0, nationCode_1.getNationCodeName)(psg.identityInfo.nationCode);
            if (nationCodeName && !nationalityBtn.text.includes(nationCodeName)) {
                nationalityBtn.click();
                await (0, lang_1.delay)(1500);
                let tryCount = 20;
                while (tryCount > 0) {
                    tryCount--;
                    let listView = await (0, accessibility_1.select)({ className: 'android.widget.ListView' }).firstOrNull();
                    let viewTexts = (_k = listView === null || listView === void 0 ? void 0 : listView.parent) === null || _k === void 0 ? void 0 : _k.children.filter(x => x.className === 'android.view.View');
                    if (viewTexts && (viewTexts === null || viewTexts === void 0 ? void 0 : viewTexts.length) > 0) {
                        for (const viewText of viewTexts) {
                            if (viewText.text.includes(nationCodeName)) {
                                viewText.click();
                                tryCount = 0;
                                break;
                            }
                        }
                        await (0, accessibility_1.swipe)(400, 1700, 400, 300, 1000);
                        await (0, lang_1.delay)(1000);
                        listView = await (0, accessibility_1.select)({ className: 'android.widget.ListView' }).firstOrNull();
                        viewTexts = (_l = listView === null || listView === void 0 ? void 0 : listView.parent) === null || _l === void 0 ? void 0 : _l.children.filter(x => x.className === 'android.view.View');
                    }
                }
            }
        }
        else if (psg.identityInfo.type === app_base_v9_1.IdentityCardType.TW || psg.identityInfo.type === app_base_v9_1.IdentityCardType.HR || psg.identityInfo.type === app_base_v9_1.IdentityCardType.BC) {
            await this.getAndInputText("book_view_domestic_passenger_new_et_phoneNumber", psg.phone, true);
            const certTypeBtn = await selector.getById("book_view_domestic_passenger_new_tv_certificateType");
            certTypeBtn.click();
            await (0, lang_1.delay)(300);
            const ppBtn = await selector.findByTextContains("护照");
            if (!ppBtn) {
                throw new Error("未找到 护照");
            }
            ppBtn.click();
            await (0, lang_1.delay)(300);
            const sxBtn = await selector.findByTextContains("港澳台居民居住证");
            if (!sxBtn) {
                throw new Error("未找到 港澳台居民居住证");
            }
            sxBtn.click();
            await (0, lang_1.delay)(300);
            const hmBtn = await selector.findByTextContains("港澳居民来往内地通行证");
            if (!hmBtn) {
                throw new Error("未找到 港澳居民来往内地通行证");
            }
            hmBtn.click();
            await (0, lang_1.delay)(300);
            const twBtn = await selector.findByTextContains("台湾居民来往大陆通行证");
            if (!twBtn) {
                throw new Error("未找到 台湾居民来往大陆通行证");
            }
            twBtn.click();
            if (psg.identityInfo.type === app_base_v9_1.IdentityCardType.HR) {
                const hkbBtn = await selector.findByTextContains("户口簿");
                if (!hkbBtn) {
                    throw new Error("未找到 户口簿");
                }
                hkbBtn.click();
            }
            else if (psg.identityInfo.type === app_base_v9_1.IdentityCardType.BC) {
                const csyxBtn = await selector.findByTextContains("出生医学证明");
                if (!csyxBtn) {
                    throw new Error("未找到 出生医学证明");
                }
                csyxBtn.click();
            }
            await (0, lang_1.delay)(1000);
            (await selector.getById("dialog_bottom_wheel_confrim")).click();
            const name = (_m = this.getFullName(psg.name)) !== null && _m !== void 0 ? _m : "";
            await this.getAndInputText("book_view_domestic_passenger_new_et_name", name);
            await this.getAndInputText("book_view_domestic_passenger_new_et_certificateNumber", psg.identityInfo.cardNo);
            const certIssueCountryBtn = await selector.getById("book_view_domestic_passenger_new_tv_certIssueCountry");
            const countryCodeName = (0, nationCode_1.getNationCodeName)(psg.identityInfo.countryCode);
            if (countryCodeName && !certIssueCountryBtn.text.includes(countryCodeName)) {
                certIssueCountryBtn.click();
                await (0, lang_1.delay)(1500);
                let tryCount = 20;
                while (tryCount > 0) {
                    tryCount--;
                    let listView = await (0, accessibility_1.select)({ className: 'android.widget.ListView' }).firstOrNull();
                    let viewTexts = (_o = listView === null || listView === void 0 ? void 0 : listView.parent) === null || _o === void 0 ? void 0 : _o.children.filter(x => x.className === 'android.view.View');
                    if (viewTexts && (viewTexts === null || viewTexts === void 0 ? void 0 : viewTexts.length) > 0) {
                        for (const viewText of viewTexts) {
                            if (viewText.text.includes(countryCodeName)) {
                                viewText.click();
                                tryCount = 0;
                                break;
                            }
                        }
                        await (0, accessibility_1.swipe)(400, 1700, 400, 300, 1000);
                        await (0, lang_1.delay)(1000);
                        listView = await (0, accessibility_1.select)({ className: 'android.widget.ListView' }).firstOrNull();
                        viewTexts = (_p = listView === null || listView === void 0 ? void 0 : listView.parent) === null || _p === void 0 ? void 0 : _p.children.filter(x => x.className === 'android.view.View');
                    }
                }
            }
            await this.inputBirthDay(psg.birthDate);
            const nationalityBtn = await selector.getById("book_view_domestic_passenger_new_tv_nationality");
            const nationCodeName = (0, nationCode_1.getNationCodeName)(psg.identityInfo.nationCode);
            if (nationCodeName && !nationalityBtn.text.includes(nationCodeName)) {
                nationalityBtn.click();
                await (0, lang_1.delay)(1500);
                let tryCount = 20;
                while (tryCount > 0) {
                    tryCount--;
                    let listView = await (0, accessibility_1.select)({ className: 'android.widget.ListView' }).firstOrNull();
                    let viewTexts = (_q = listView === null || listView === void 0 ? void 0 : listView.parent) === null || _q === void 0 ? void 0 : _q.children.filter(x => x.className === 'android.view.View');
                    if (viewTexts && (viewTexts === null || viewTexts === void 0 ? void 0 : viewTexts.length) > 0) {
                        for (const viewText of viewTexts) {
                            console.log('获取到的国家 ' + viewText.text);
                            if (viewText.text.includes(nationCodeName)) {
                                viewText.click();
                                tryCount = 0;
                                break;
                            }
                        }
                        await (0, accessibility_1.swipe)(400, 1700, 400, 300, 1000);
                        await (0, lang_1.delay)(1000);
                        listView = await (0, accessibility_1.select)({ className: 'android.widget.ListView' }).firstOrNull();
                        viewTexts = (_r = listView === null || listView === void 0 ? void 0 : listView.parent) === null || _r === void 0 ? void 0 : _r.children.filter(x => x.className === 'android.view.View');
                    }
                }
            }
        }
        else {
            throw new Error("暂不支持除身份证、护照、港澳台居民居住证、港澳居民来往内地通行证、台湾居民来往大陆通行证、户口簿、出生医学证明、外国人永久居留证、海员证以外的证件类型");
        }
        const checkBox = await selector.getById("book_activity_domestic_passenger_new_cb_agreePact");
        if (!checkBox.checked) {
            console.log(`点击同意乘机人信息 ${checkBox.click()}`);
        }
        await (0, lang_1.delay)(500);
        const confirmBtn = await selector.getById("book_activity_domestic_passenger_new_tv_finish");
        this.log(`点击乘机人信息确认 ${confirmBtn.click()}`);
        await this.waitForLoading();
        await this.waitForTip(true, true);
    }
    // 除身份证和港澳台居民居住证外的其他证件类型的公用块
    async commonInput(psg) {
        var _a;
        await this.getAndInputText("book_view_domestic_passenger_new_et_certificateNumber", psg.identityInfo.cardNo, true);
        if (psg.surName && psg.givenName) {
            // 输入姓
            await this.getAndInputText("book_view_domestic_passenger_new_et_surname", psg.surName);
            // 输入名
            await this.getAndInputText("book_view_domestic_passenger_new_et_givenName", psg.givenName);
        }
        else {
            const name = (_a = this.getFullName(psg.name)) !== null && _a !== void 0 ? _a : "";
            const nameSplit = name.split("/");
            if (nameSplit.length == 0) {
                throw new Error("名字格式不符合");
            }
            const textRegex = /^[\u4e00-\u9fa5]+$/;
            const match = textRegex.exec(name);
            if (match) {
                throw new Error(`名字格式不符合 ${name}`);
            }
            await this.getAndInputText("book_view_domestic_passenger_new_et_surname", nameSplit[0]);
            await this.getAndInputText("book_view_domestic_passenger_new_et_givenName", nameSplit[1]);
        }
    }
    async inputBirthDay(birthDate) {
        const birthdayBtn = await selector.getById("book_view_domestic_passenger_new_tv_birthday");
        const currentDate = birthdayBtn.text.includes("必填") ? new Date() : new Date(birthdayBtn.text);
        const targetDate = new Date(birthDate);
        birthdayBtn.click();
        const pickerItem = await selector.getById("pickers");
        const yearDiff = currentDate.getFullYear() - targetDate.getFullYear();
        const monthDiff = currentDate.getMonth() - targetDate.getMonth();
        const dayDiff = currentDate.getDate() - targetDate.getDate();
        await this.pickerScroll(pickerItem.children[2], yearDiff);
        await this.pickerScroll(pickerItem.children[1], monthDiff);
        await this.pickerScroll(pickerItem.children[0], dayDiff);
        (await selector.getById("dialog_bottom_wheel_confrim")).click();
    }
    async inputCertificateValidityDate(birthDate) {
        const certificateBtn = await selector.getById("book_view_domestic_passenger_new_tv_certificateDeadline");
        const currentDate = certificateBtn.text.includes("必填") ? new Date() : new Date(certificateBtn.text);
        const targetDate = new Date(birthDate);
        certificateBtn.click();
        const pickerItem = await selector.getById("pickers");
        const yearDiff = currentDate.getFullYear() - targetDate.getFullYear();
        const monthDiff = currentDate.getMonth() - targetDate.getMonth();
        const dayDiff = currentDate.getDate() - targetDate.getDate();
        await this.pickerScroll(pickerItem.children[2], yearDiff);
        await this.pickerScroll(pickerItem.children[1], monthDiff);
        await this.pickerScroll(pickerItem.children[0], dayDiff);
        (await selector.getById("dialog_bottom_wheel_confrim")).click();
    }
    async pickerScroll(item, diff) {
        if (diff > 0) {
            for (let index = 0; index < diff; index++) {
                item.scrollBackward();
                await (0, lang_1.delay)(300);
            }
        }
        else {
            for (let index = 0; index < Math.abs(diff); index++) {
                item.scrollForward();
                await (0, lang_1.delay)(300);
            }
        }
    }
    async getExistNameCardNo(item) {
        var _a;
        const name = selector.getChildById(item, "book_order_passenger_item_tv_psgName").text;
        const cardNoRaw = selector.getChildById(item, "book_order_passenger_item_tv_psgCertificate").text;
        const nameCardNo = name + ':' + ((_a = cardNoRaw.split("：").at(-1)) === null || _a === void 0 ? void 0 : _a.trim());
        return nameCardNo;
    }
    async getNameCardNo(item) {
        const name = selector.getChildById(item, "book_order_passenger_item_tv_psgName").text;
        const cardNoRaw = selector.getChildById(item, "book_order_passenger_item_tv_psgCertificate").text;
        const nameCardNo = name + cardNoRaw.split("：").at(-1);
        return nameCardNo;
    }
    // 英文名显示不全，只检查证件号
    async getCardNo(item) {
        const cardNoRaw = selector.getChildById(item, "book_order_passenger_item_tv_psgCertificate").text;
        const cardNo = '' + cardNoRaw.split("：").at(-1);
        return cardNo;
    }
    async selectProduct(input) {
        const bestProduct = await this.findTargetProduct(input);
        this.log(`点击选购 ${bestProduct.bookingBtn.click()}`);
        if (bestProduct.bookingBtn.text.includes("订")) {
            const notUpgradeBtn = await selector.findById("dialog_upgrade_cancel_tv", 200, 2000);
            if (notUpgradeBtn) {
                notUpgradeBtn.click();
            }
            const cancelBtn = await selector.findById("order_view_window_cancel_tv", 200, 2000);
            if (cancelBtn) {
                cancelBtn.click();
            }
            await this.waitForTipAndClose("临近起飞航班提示", "button2", 100, 1000);
            // 检查是否登录失效
            await this.waitForTip(true, true);
            return bestProduct;
        }
        const extraProducts = await selector.getById("cabin_details_child_rv");
        const commonBuyPanel = extraProducts.children.find((x) => selector.getChildById(x, "cabin_details_child_name_tv").text.includes("普通预订"));
        if (!commonBuyPanel) {
            throw new Error(`普通购买按钮未找到`);
        }
        const commonBuyBtn = selector.getChildById(commonBuyPanel, "cabin_details_child_price_book_tv");
        commonBuyBtn.click();
        const notUpgradeBtn = await selector.findById("dialog_upgrade_cancel_tv", 200, 2000);
        if (notUpgradeBtn) {
            notUpgradeBtn.click();
            console.log("点击我不升级");
        }
        const cancelBtn = await selector.findById("order_view_window_cancel_tv", 200, 2000);
        if (cancelBtn) {
            cancelBtn.click();
        }
        await this.waitForTipAndClose("临近起飞航班提示", "button2", 100, 1000);
        // 检查是否登录失效
        await this.waitForTip(true, true);
        return bestProduct;
    }
    async findTargetProduct(args) {
        let products = await this.getProducts();
        const productText = products.map((x) => `${x.productName}-${x.ticketPrice}-${x.cabin}-直减${x.ticketPrice - x.settlementPrice}`).join("|");
        // 根据要求的产品 + 价格 + 舱位 筛选
        products = this.filterByProductCodes(products, args.productCodes);
        console.log(`根据产品类型筛选结果 ${products.map((x) => `${x.productName}-${x.ticketPrice}-${x.cabin}-直减${x.ticketPrice - x.settlementPrice}`).join("|")}`);
        products = this.filterByRules(products, args);
        this.log(`根据比价规则筛选最优产品 ${products.map((x) => `${x.productName}-${x.ticketPrice}-${x.cabin}-直减${x.ticketPrice - x.settlementPrice}`).join("|")}`);
        if (products.length === 0) {
            const compareDetailSplit = compareDetailStr.split("||");
            const err = `${compareDetail}, 没有符合条件的产品，查到的产品(${productText}) \n 产品代码：(${args.productCodes}) \n 比价结果：${compareDetailSplit[compareDetailSplit.length - 1]})`;
            throw new Error(err);
        }
        products.sort((firstItem, secondItem) => firstItem.ticketPrice - secondItem.ticketPrice);
        const bestProduct = products[0];
        this.log(`已选择最优产品 ${bestProduct.productName}:${bestProduct.cabin}-(${bestProduct.ticketPrice},${bestProduct.settlementPrice})`);
        return bestProduct;
    }
    // 往返选择价格舱位（往返也有直减，没有产品类型）
    async selectProductPriceCabinRoundTrip(input) {
        var _a, _b, _c;
        await (0, lang_1.delay)(3000);
        const error = await selector.findByTextContains('大家太热情啦', 100, 1000);
        if (error) {
            throw error.text;
        }
        const bestProduct = await this.findTargetProductPriceCabinRoundTrip(input);
        if (bestProduct.bookingBtn.text.includes("预订")) {
            this.log(`点击选购/预订 ${bestProduct.bookingBtn.click()}`);
            const notUpgradeBtn = await selector.findById("dialog_upgrade_cancel_tv", 200, 2000);
            if (notUpgradeBtn) {
                notUpgradeBtn.click();
                console.log("点击我不升级");
            }
            const cancelBtn = await selector.findById("order_view_window_cancel_tv", 200, 2000);
            if (cancelBtn) {
                cancelBtn.click();
                console.log("点击下次再说");
            }
            await this.waitForTip(true, true);
            return bestProduct;
        }
        let root = await selector.getById("root");
        let rootChildren = new ui_object_helper_1.UiObjectHelper(root.children[0]);
        let allCabin = rootChildren.item.children
            .filter((x) => x.className == "android.view.View")
            .at(-1);
        let listView = (_a = allCabin === null || allCabin === void 0 ? void 0 : allCabin.children) === null || _a === void 0 ? void 0 : _a.filter((x) => x.className == "android.widget.ListView").at(-1);
        let retry = 5;
        while (retry > 0 && !listView) {
            retry--;
            root = await selector.getById("root");
            rootChildren = new ui_object_helper_1.UiObjectHelper(root.children[0]);
            allCabin = rootChildren.item.children
                .filter((x) => x.className == "android.view.View")
                .at(-1);
            listView = (_b = allCabin === null || allCabin === void 0 ? void 0 : allCabin.children) === null || _b === void 0 ? void 0 : _b.filter((x) => x.className == "android.widget.ListView").at(-1);
        }
        if (listView != null) {
            for (const item of listView.children) {
                const packupText = item.children[0].children.find((x) => x.className === "android.widget.TextView" && x.text == "普通购买");
                if (packupText) {
                    const bookText = (_c = packupText === null || packupText === void 0 ? void 0 : packupText.parent) === null || _c === void 0 ? void 0 : _c.children.filter((x) => x.className === "android.widget.TextView" && x.text == "预订");
                    if (bookText && bookText.length > 0) {
                        await (0, lang_1.delay)(2000);
                        this.log(`点击预订 ${bookText[0].click()}`);
                        await this.waitForTip(true, true);
                        return bestProduct;
                    }
                }
            }
        }
        const notUpgradeBtn = await selector.findById("dialog_upgrade_cancel_tv", 200, 2000);
        if (notUpgradeBtn) {
            notUpgradeBtn.click();
            console.log("点击我不升级");
        }
        const cancelBtn = await selector.findById("order_view_window_cancel_tv", 200, 2000);
        if (cancelBtn) {
            cancelBtn.click();
            console.log("点击下次再说");
        }
        await this.waitForTip(true, true);
        return bestProduct;
    }
    // 往返查找目标产品价格和舱位
    async findTargetProductPriceCabinRoundTrip(args) {
        await (0, lang_1.delay)(5000);
        let products = await this.getProductPriceCabinsRoundTrip();
        const productText = products.map((x) => `${x.productName}-${x.ticketPrice}-${x.cabin}-直减${x.ticketPrice - x.settlementPrice}`).join("|");
        // 根据要求的产品 + 价格 + 舱位 筛选
        // products = this.filterByProductCodes(products, args.productCodes);
        products = this.filterByRulesRoundTrip(products, args);
        if (products.length === 0) {
            throw new Error(`${compareDetail}, 没有符合条件的产品，查到的产品(${productText}) 产品代码(${args.productCodes}) 规则 ${JSON.stringify(args.createOrderRuleInfo)}`);
        }
        products.sort((firstItem, secondItem) => firstItem.ticketPrice - secondItem.ticketPrice);
        const bestProduct = products[0];
        return bestProduct;
    }
    // 往返的产品价格和舱位
    async getProductPriceCabinsRoundTrip() {
        var _a, _b;
        let result = [];
        let root = await selector.getById("root");
        let allCabin = root.children[0].children.at(-1);
        let allCabinListView = allCabin === null || allCabin === void 0 ? void 0 : allCabin.children.filter((x) => x.className == "android.widget.ListView").at(0);
        let allCabinList = allCabinListView === null || allCabinListView === void 0 ? void 0 : allCabinListView.children;
        let retry = 5;
        while (retry > 0 && (!allCabin || !allCabinListView || !allCabinList)) {
            retry--;
            root = await selector.getById("root");
            allCabin = root.children[0].children.at(-1);
            allCabinListView = allCabin === null || allCabin === void 0 ? void 0 : allCabin.children.filter((x) => x.className == "android.widget.ListView").at(0);
            allCabinList = allCabin === null || allCabin === void 0 ? void 0 : allCabin.children;
        }
        if (allCabinList) {
            for (const element of allCabinList) {
                console.log(element.id);
                await (0, accessibility_1.click)(element.boundsInScreen.centerX, element.boundsInScreen.centerY);
                await (0, lang_1.delay)(1000);
            }
        }
        root = await selector.getById("root");
        allCabin = root.children[0].children.at(-1);
        let listViews = (_a = allCabin === null || allCabin === void 0 ? void 0 : allCabin.children) === null || _a === void 0 ? void 0 : _a.filter((x) => x.className == "android.widget.ListView");
        let tryRetry = 5;
        while (tryRetry > 0 && (listViews && listViews.length <= 1)) {
            tryRetry--;
            await (0, accessibility_1.click)(520, 468);
            await (0, lang_1.delay)(500);
            await (0, accessibility_1.click)(320, 720);
            root = await selector.getById("root");
            allCabin = root.children[0].children.at(-1);
            listViews = (_b = allCabin === null || allCabin === void 0 ? void 0 : allCabin.children) === null || _b === void 0 ? void 0 : _b.filter((x) => x.className == "android.widget.ListView");
        }
        let listView = listViews === null || listViews === void 0 ? void 0 : listViews.at(-1);
        if (listView != null) {
            await (0, accessibility_1.swipe)(400, 1600, 400, 300, 1000);
            await (0, lang_1.delay)(1000);
            for (const item of listView.children) {
                const productInfos = await this.getProductPriceCabinInfoRoundTrip(item.children[0]);
                if (productInfos.length > 0)
                    for (const productInfo of productInfos) {
                        const exists = result.find((x) => x.cabin === productInfo.cabin &&
                            x.productName === productInfo.productName &&
                            x.ticketPrice === productInfo.ticketPrice);
                        if (!exists) {
                            result.push(productInfo);
                        }
                        else {
                            return result;
                        }
                    }
            }
        }
        return result.sort((a, b) => a.ticketPrice - b.ticketPrice);
    }
    printNode(node, level) {
        console.log(`${level}${node.className}:${node.text}`);
        if (node.childCount > 0) {
            for (const child of node.children) {
                this.printNode(child, level + "--");
            }
        }
    }
    // 往返的产品类型价格和舱位信息
    async getProductPriceCabinInfoRoundTrip(item) {
        let productName = "特价经济舱";
        const textViews = item.children.filter((x) => x.className === "android.widget.TextView");
        let expertPro = textViews.filter((x) => x.text.includes("家庭专区") || x.text.includes("长者特惠") || x.text.includes("会员多人特惠") || x.text.includes("新客专享"));
        if (expertPro.length > 0) {
            return [];
        }
        let productNameText = textViews.filter((x) => x.text.includes("往返特惠"));
        if (productNameText.length > 0) {
            productName = productNameText[0].text;
            this.log(`获取到的产品名称 ${productName}`);
        }
        const priceText = textViews.filter((x) => x.text.includes("¥"))[0];
        const ticketPrice = Number(priceText.text.replace("¥", ""));
        if (isNaN(ticketPrice)) {
            throw new Error(`解析票面价失败 ${priceText.text.replace("¥", "")}不是有效的数字`);
        }
        let qcCabin = "";
        let fcCabin = "";
        const wfcabinText = textViews.filter((x) => x.text.includes("+"));
        if (wfcabinText.length > 0) {
            // 往返舱位一样
            const cabinText = wfcabinText[0].text.split("+");
            qcCabin = cabinText[0];
            fcCabin = cabinText[0];
        }
        else {
            const cabinText = textViews.filter((x) => x.text.includes("舱"));
            qcCabin = cabinText[0].text;
            fcCabin = cabinText[1].text;
        }
        let directDiscount = 0;
        const directDiscountText = textViews.filter((x) => x.text.includes("立减"));
        if (directDiscountText.length > 0) {
            directDiscount = Number(directDiscountText[0].text.substring(3));
            if (isNaN(directDiscount)) {
                directDiscount = 0;
            }
        }
        const bookingBtnTexts = textViews.filter((x) => x.text.includes("预订"));
        let bookingBtn;
        if (bookingBtnTexts.length > 0) {
            bookingBtn = bookingBtnTexts[0];
        }
        else {
            const xgBtnTexts = textViews.filter((x) => x.text.includes("选购"));
            xgBtnTexts[0].click();
            await (0, lang_1.delay)(500);
            bookingBtn = xgBtnTexts[0];
        }
        return [
            {
                productName: productName,
                cabin: qcCabin.replace("舱", "").trim() +
                    "|" +
                    fcCabin.replace("舱", "").trim(),
                cabinClass: app_base_v9_1.CabinClassType.EconomyClass,
                ticketPrice: ticketPrice,
                settlementPrice: ticketPrice - directDiscount,
                bookingBtn: bookingBtn,
            },
        ];
    }
    filterByProductCodes(products, productCodes) {
        productCodes = productCodes === null || productCodes === void 0 ? void 0 : productCodes.trim();
        if (productCodes && productCodes.length > 0) {
            const productCodeList = productCodes.split("|");
            return products.filter((x) => productCodeList.find((y) => y.includes(x.productName)));
        }
        else {
            return products;
        }
    }
    filterByRules(products, args) {
        var _a, _b, _c;
        const adultPassenger = args.passengers.find((x) => x.type === app_base_v9_1.PassengerType.Adult);
        if (!adultPassenger) {
            throw new Error(`不支持没有成人下单`);
        }
        const adultPrice = args.cabinPriceInfos.find((x) => x.identityCardNo === adultPassenger.identityInfo.cardNo);
        if (!adultPrice) {
            throw new Error(`未找到成人价格 ${this.getFullName(adultPassenger.name)}`);
        }
        let result = [];
        const compareDetail = [];
        for (const product of products) {
            console.log('根据产品要求+价格+舱位获取到的票面价 ' + product.ticketPrice);
            const ticket = product.ticketPrice - adultPrice.ticketPrice;
            if (((_a = args.createOrderRuleInfo) === null || _a === void 0 ? void 0 : _a.ticketPriceFloatRange) &&
                (args.createOrderRuleInfo.ticketPriceFloatRange.lowerLimit > ticket || ticket > args.createOrderRuleInfo.ticketPriceFloatRange.upperLimit)) {
                compareDetail.push(`APP票面-OTA票面 ${product.ticketPrice}-${adultPrice.ticketPrice}=${ticket}，不符合票面价要求${args.createOrderRuleInfo.ticketPriceFloatRange.lowerLimit}~${args.createOrderRuleInfo.ticketPriceFloatRange.upperLimit}`);
                continue;
            }
            let settlement = 0;
            if (args.cabinPriceInfos.filter(x => x.couponCode).length > 0) {
                settlement = product.ticketPrice - adultPrice.couponAmount - adultPrice.settlementPrice;
            }
            else {
                settlement = product.settlementPrice - adultPrice.settlementPrice;
            }
            if (((_b = args.createOrderRuleInfo) === null || _b === void 0 ? void 0 : _b.settlementPriceFloatRange) &&
                (args.createOrderRuleInfo.settlementPriceFloatRange.lowerLimit > settlement
                    || settlement > args.createOrderRuleInfo.settlementPriceFloatRange.upperLimit)) {
                compareDetail.push(`APP结算-OTA结算=${settlement}，不符合结算价要求${args.createOrderRuleInfo.settlementPriceFloatRange.lowerLimit}~${args.createOrderRuleInfo.settlementPriceFloatRange.upperLimit}`);
                continue;
            }
            const sell = product.ticketPrice - adultPrice.settlementPrice;
            if (((_c = args.createOrderRuleInfo) === null || _c === void 0 ? void 0 : _c.sellPriceFloatRange) &&
                (args.createOrderRuleInfo.sellPriceFloatRange.lowerLimit > sell
                    || sell > args.createOrderRuleInfo.sellPriceFloatRange.upperLimit)) {
                compareDetail.push(`APP票面-OTA结算=${sell}，不符合销售范围${args.createOrderRuleInfo.sellPriceFloatRange.lowerLimit}~${args.createOrderRuleInfo.sellPriceFloatRange.upperLimit}`);
                continue;
            }
            if (args.createOrderRuleInfo.fixCabin) {
                if (adultPrice.cabin[0] !== product.cabin[0]) {
                    compareDetail.push(`要求固定舱位${adultPrice.cabin[0]}，实际舱位${product.cabin[0]}不符合`);
                    continue;
                }
            }
            else {
                if (args.createOrderRuleInfo.allowedCabins &&
                    args.createOrderRuleInfo.allowedCabins != "*") {
                    const allowedCabins = args.createOrderRuleInfo.allowedCabins.split("|");
                    if (!allowedCabins.find((x) => x[0] === product.cabin[0])) {
                        compareDetail.push(`实际舱位不符合 ${product.cabin[0]}，不在允许的舱位范围中 ${args.createOrderRuleInfo.allowedCabins}`);
                        continue;
                    }
                }
            }
            result.push(product);
        }
        compareDetailStr = compareDetail.join("||");
        return result;
    }
    // 往返校验规则
    filterByRulesRoundTrip(products, args) {
        var _a, _b, _c;
        // 成人
        const adultPassenger = args.passengers.find((x) => x.type === app_base_v9_1.PassengerType.Adult);
        if (!adultPassenger) {
            throw new Error(`不支持没有成人下单`);
        }
        const adultPriceInfo = args.cabinPriceInfos.filter((x) => x.identityCardNo === adultPassenger.identityInfo.cardNo);
        if (!adultPriceInfo) {
            throw new Error(`未找到成人价格 ${this.getFullName(adultPassenger.name)}`);
        }
        const adultPrice = adultPriceInfo.reduce((sum, cabinPriceInfo) => sum + cabinPriceInfo.ticketPrice, 0);
        const adultCouponAmount = adultPriceInfo.reduce((sum, cabinPriceInfo) => sum + cabinPriceInfo.couponAmount, 0);
        const adultSettlementPrice = adultPriceInfo.reduce((sum, cabinPriceInfo) => sum + cabinPriceInfo.settlementPrice, 0);
        let result = [];
        for (const product of products) {
            const ticket = product.ticketPrice - adultPrice;
            const qcCabin = product.cabin.split("|").at(0);
            const fcCabin = product.cabin.split("|").at(-1);
            if (args.createOrderRuleInfo.fixCabin) {
                if (args.cabinPriceInfos[0].cabin !== qcCabin || args.cabinPriceInfos[1].cabin != fcCabin) {
                    compareDetail.push(`舱位不符，目标去程舱位${args.cabinPriceInfos[0].cabin}，实际去程舱位${qcCabin}不符合，目标返程舱位${args.cabinPriceInfos[1].cabin}，实际返程舱位${fcCabin}不符合`);
                    continue;
                }
            }
            else {
                if (args.createOrderRuleInfo.allowedCabins && args.createOrderRuleInfo.allowedCabins != "*") {
                    const allowedCabins = args.createOrderRuleInfo.allowedCabins.split("|");
                    if (!allowedCabins.find((x) => x[0] === qcCabin) || !allowedCabins.find((x) => x[0] === fcCabin)) {
                        compareDetail.push(`实际舱位不符合去程舱位${qcCabin}，返程舱位${fcCabin} 不在允许的舱位范围中 ${args.createOrderRuleInfo.allowedCabins}`);
                        continue;
                    }
                }
            }
            if (((_a = args.createOrderRuleInfo) === null || _a === void 0 ? void 0 : _a.ticketPriceFloatRange) && (args.createOrderRuleInfo.ticketPriceFloatRange.lowerLimit > ticket || ticket > args.createOrderRuleInfo.ticketPriceFloatRange.upperLimit)) {
                compareDetail.push(`APP票面-OTA票面 ${product.ticketPrice}-${adultPrice}=${ticket}，不符合票面价要求${args.createOrderRuleInfo.ticketPriceFloatRange.lowerLimit}~${args.createOrderRuleInfo.ticketPriceFloatRange.upperLimit}`);
                continue;
            }
            const settlement = product.settlementPrice - adultCouponAmount - adultSettlementPrice;
            if (((_b = args.createOrderRuleInfo) === null || _b === void 0 ? void 0 : _b.settlementPriceFloatRange)
                && (args.createOrderRuleInfo.settlementPriceFloatRange.lowerLimit > settlement || settlement > args.createOrderRuleInfo.settlementPriceFloatRange.upperLimit)) {
                compareDetail.push(`APP结算-OTA结算=${settlement}，不符合结算价要求${args.createOrderRuleInfo.settlementPriceFloatRange.lowerLimit}~${args.createOrderRuleInfo.settlementPriceFloatRange.upperLimit}`);
                continue;
            }
            const sell = product.ticketPrice - adultSettlementPrice;
            if (((_c = args.createOrderRuleInfo) === null || _c === void 0 ? void 0 : _c.sellPriceFloatRange) && (args.createOrderRuleInfo.sellPriceFloatRange.lowerLimit > sell || sell > args.createOrderRuleInfo.sellPriceFloatRange.upperLimit)) {
                compareDetail.push(`APP票面-OTA结算=${sell}，不符合销售范围${args.createOrderRuleInfo.sellPriceFloatRange.lowerLimit}~${args.createOrderRuleInfo.sellPriceFloatRange.upperLimit}`);
                continue;
            }
            result.push(product);
        }
        return result;
    }
    async getProducts() {
        let result = [];
        const tabContainer = await selector.findById("cabin_tab_container", 50, 500);
        if (tabContainer) {
            const echoTab = tabContainer.children.find((x) => { var _a; return ((_a = selector.findChildById(x, "view_cabin_tab_tv_title")) === null || _a === void 0 ? void 0 : _a.text) === "经济舱"; });
            if (echoTab) {
                console.log(`点击经济舱 ${echoTab.desc} ${echoTab.click()}`);
                await (0, lang_1.delay)(700);
            }
        }
        const productListView = await selector.findById("domestic_full_cabin_rv_flight_cabin", 100, 3000);
        if (!productListView) {
            throw new Error(`找不到产品列表`);
        }
        let retry = 5;
        while (retry > 0) {
            retry--;
            const items = productListView.children;
            // 根据文字提示判断首乘专享、长者特惠
            const detailTipText = await selector.findById("cabin_details_tips_content_iv", 50, 1000);
            if (detailTipText) {
                if (detailTipText.text.includes("首次")) {
                    const tagMore = await selector.findById("cabin_details_fc_tag_more", 100, 1000);
                    if (tagMore) {
                        await (0, accessibility_1.click)(tagMore.boundsInScreen.centerX +
                            tagMore.boundsInScreen.width / 4, tagMore.boundsInScreen.centerY);
                        await (0, lang_1.delay)(1000);
                    }
                }
            }
            for (const item of items) {
                const productInfos = await this.getProductInfo(item);
                for (const productInfo of productInfos.reverse()) {
                    const exists = result.find((x) => x.cabin === productInfo.cabin &&
                        x.productName === productInfo.productName &&
                        x.ticketPrice === productInfo.ticketPrice);
                    if (!exists) {
                        result.push(productInfo);
                    }
                    else {
                        return result;
                    }
                }
            }
            productListView.scrollDown();
            await (0, lang_1.delay)(1000);
        }
        return result;
    }
    async getProductInfo(item) {
        let productName;
        let specialProduct = false;
        let productNameText = selector.findChildById(item, "cabin_details_name_tv");
        if (productNameText) {
            productName = productNameText.text;
        }
        else {
            productNameText = selector.findChildById(item, "cabin_details_fc_title_1");
            if (productNameText) {
                productName = productNameText.text;
            }
            else {
                productNameText = selector.getChildById(item, "cabin_details_tips_content_iv");
                if (!productNameText) {
                    throw new Error("获取产品类型失败");
                }
                else {
                    const detailTipText = selector.findChildById(item, "cabin_details_tips_content_iv");
                    if (detailTipText) {
                        if (detailTipText.text.includes("长者旅客") || detailTipText.text.includes("长者旅行产品")) {
                            productName = "长者特惠";
                        }
                        else if (detailTipText.text.includes("额外400里程")) {
                            productName = "额外400里程";
                        }
                        else {
                            productName = "会员多人特惠";
                        }
                    }
                }
                specialProduct = true;
            }
        }
        const priceText = selector.getChildById(item, "cabin_details_price_tv");
        const cabinText = selector.getChildById(item, "cabin_details_code_tv");
        const directDiscountText = selector.findChildById(item, "cabin_details_order_cut_tv");
        const bookingBtn = selector.getChildById(item, "cabin_details_price_book_tv");
        const ticketPrice = Number(priceText.text.replace("起", ""));
        if (isNaN(ticketPrice)) {
            throw new Error(`解析票面价失败 ${priceText.text.replace("起", "")}不是有效的数字`);
        }
        let directDiscount;
        if (directDiscountText) {
            directDiscount = Number(directDiscountText.text.substring(3));
            if (isNaN(directDiscount)) {
                console.log(`解析直减金额失败 ${directDiscountText.text.substring(3)}不是有效的数字`);
                directDiscount = 0;
            }
        }
        else {
            directDiscount = 0;
        }
        return [
            {
                productName: productName,
                cabin: cabinText.text.replace("舱", "").trim(),
                cabinClass: app_base_v9_1.CabinClassType.EconomyClass,
                ticketPrice: ticketPrice,
                settlementPrice: ticketPrice - directDiscount,
                bookingBtn: bookingBtn,
                specialProduct: specialProduct,
            },
        ];
    }
    async flightDateTimeMatch() {
        var _a, _b, _c, _d;
        const detailPanel = await selector.getById("domestic_full_cabin_flight_detail", 100, 3000);
        const flightDetailPanel = detailPanel.children.filter((x) => x.desc)[0];
        const flightDetailText = flightDetailPanel.desc;
        // const flightDetailRegex = /.+?(?<flight_no>[A-Z]{2}[A-Z\d]{4}[A-Z]?).+?(?<date>\d{4}-\d{2}-\d{2}).+?(?<dep_time>\d+点((\d+分)|(整))).+?(?<arr_time>\d+点((\d+分)|(整)))/;
        const flightNoRegex = /航班号：?(?<flight_no>[A-Z]{2}\d{3,4}[A-Z]{0,1})/;
        const dateRegex = /出发时间\s*\|\s*(?<date>\d{4}-\d{2}-\d{2})\s*\|.*?(?<dep_time>\d+点整|\d+点\d+分)，到达时间.*?(?<arr_time>\d+点整|\d+点\d+分)/;
        // 从描述中提取信息进行校验
        // const match = flightDetailRegex.exec(flightDetailText);
        const flightNoMatch = flightNoRegex.exec(flightDetailText);
        const dateMatch = dateRegex.exec(flightDetailText);
        if (!flightNoMatch || !dateMatch) {
            throw new Error(`解析航班信息失败 ${flightDetailText}`);
        }
        let matchRes = {
            groups: {
                flight_no: ((_a = flightNoMatch === null || flightNoMatch === void 0 ? void 0 : flightNoMatch.groups) === null || _a === void 0 ? void 0 : _a.flight_no) || '',
                date: ((_b = dateMatch === null || dateMatch === void 0 ? void 0 : dateMatch.groups) === null || _b === void 0 ? void 0 : _b.date) || '',
                dep_time: ((_c = dateMatch === null || dateMatch === void 0 ? void 0 : dateMatch.groups) === null || _c === void 0 ? void 0 : _c.dep_time) || '',
                arr_time: ((_d = dateMatch === null || dateMatch === void 0 ? void 0 : dateMatch.groups) === null || _d === void 0 ? void 0 : _d.arr_time) || '',
            }
        };
        return matchRes;
    }
    async validateFlightInfo(departureDateTime, arrivalDateTime, fullFlightNo) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        const detailPanel = await selector.getById("domestic_full_cabin_flight_detail", 100, 3000);
        const flightDetailPanel = detailPanel.children.filter((x) => x.desc)[0];
        const flightDetailText = flightDetailPanel.desc;
        // const flightDetailRegex = /航班号：(?<flight_no>[A-Z]{2}\d{3,4}[A-Z]?).+?(?<date>\d{4}-\d{2}-\d{2}).+?(?<dep_time>\d+点((\d+分)|(整))).+?(?<arr_time>\d+点((\d+分)|(整)))/;
        const flightNoRegex = /航班号：?(?<flight_no>[A-Z]{2}\d{3,4}[A-Z]{0,1})/;
        const dateRegex = /出发时间\s*\|\s*(?<date>\d{4}-\d{2}-\d{2})\s*\|.*?(?<dep_time>\d+点整|\d+点\d+分)，到达时间.*?(?<arr_time>\d+点整|\d+点\d+分)/;
        // 从描述中提取信息进行校验
        // const match = flightDetailRegex.exec(flightDetailText);
        const flightNoMatch = flightNoRegex.exec(flightDetailText);
        const dateMatch = dateRegex.exec(flightDetailText);
        if (!flightNoMatch || !dateMatch) {
            throw new Error(`解析航班信息失败 ${flightDetailText}`);
        }
        if (((_a = flightNoMatch.groups) === null || _a === void 0 ? void 0 : _a.flight_no) !== fullFlightNo) {
            throw new Error(`校验航班信息 航班号不匹配 预期${fullFlightNo} 实际${(_b = flightNoMatch.groups) === null || _b === void 0 ? void 0 : _b.flight_no}`);
        }
        const depDateTime = new Date(departureDateTime);
        const arrDateTime = new Date(arrivalDateTime);
        const depDateExp = (0, date_fns_timezone_1.formatToTimeZone)(depDateTime, DATE_PATTERN, timezoneOptions);
        const depTimeExp = (0, date_fns_timezone_1.formatToTimeZone)(depDateTime, "H点m分", timezoneOptions);
        const arrTimeExp = (0, date_fns_timezone_1.formatToTimeZone)(arrDateTime, "H点m分", timezoneOptions);
        if (depDateExp !== ((_c = dateMatch.groups) === null || _c === void 0 ? void 0 : _c.date)) {
            throw new Error(`校验航班信息 出发日期不匹配 预期${depDateExp} 实际${(_d = dateMatch.groups) === null || _d === void 0 ? void 0 : _d.date}`);
        }
        const depTime = (_e = dateMatch.groups) === null || _e === void 0 ? void 0 : _e.dep_time.replace("整", "0分");
        if (depTimeExp !== depTime) {
            throw new Error(`校验航班信息 出发时间不匹配 预期${depTimeExp} 实际${(_f = dateMatch.groups) === null || _f === void 0 ? void 0 : _f.dep_time}`);
        }
        const arrTime = (_g = dateMatch.groups) === null || _g === void 0 ? void 0 : _g.arr_time.replace("整", "0分");
        if (arrTimeExp !== arrTime) {
            throw new Error(`校验航班信息 到达时间不匹配 预期${arrTimeExp} 实际${(_h = dateMatch.groups) === null || _h === void 0 ? void 0 : _h.arr_time}`);
        }
    }
    // 校验往返航班信息
    async validateFlightInfoRoundTrip(flights) {
        var _a, _b;
        const root = await selector.getById("root");
        // 获取去程航班信息
        let detailPanel = (_a = new ui_object_helper_1.UiObjectHelper(root.children[0])
            .findChild("android.view.View", 0)) === null || _a === void 0 ? void 0 : _a.findChild("android.view.View", 0);
        if (detailPanel) {
            let qcFlightNo = "";
            let qcDate = "";
            let qcDepartureTime = false;
            let qcDepartureDateTime = "";
            let qcArrivalDateTime = "";
            for (const qcView of detailPanel.item.children) {
                if (qcView.className === "android.widget.TextView") {
                    if (!qcView.text) {
                        continue;
                    }
                    if (qcView.text.includes("CZ")) {
                        qcFlightNo = qcView.text;
                    }
                    if (qcView.text.includes("-")) {
                        qcDate = qcView.text;
                    }
                }
                if (qcView.className === "android.view.View") {
                    for (const timeView of qcView.children) {
                        if (timeView.className === "android.widget.TextView") {
                            if (!timeView.text) {
                                continue;
                            }
                            if (!qcDepartureTime && !qcDepartureDateTime && timeView.text.includes(":")) {
                                qcDepartureTime = true;
                                qcDepartureDateTime = timeView.text.trim();
                                continue;
                            }
                            if (qcDepartureTime && qcDepartureDateTime && !qcArrivalDateTime && timeView.text.includes(":")) {
                                qcArrivalDateTime = timeView.text.trim();
                                return;
                            }
                        }
                    }
                }
                if (qcArrivalDateTime) {
                    return;
                }
            }
            if (qcFlightNo !== flights[0].fullFlightNo) {
                throw new Error(`校验航班信息 去程航班号不匹配 预期${qcFlightNo} 实际${flights[0].fullFlightNo}`);
            }
            const depDateTime = new Date(flights[0].departureDateTime);
            const arrDateTime = new Date(flights[0].arrivalDateTime);
            const depDateExp = (0, date_fns_timezone_1.formatToTimeZone)(depDateTime, DATE_PATTERN, timezoneOptions);
            const depTimeExp = (0, date_fns_timezone_1.formatToTimeZone)(depDateTime, "HH:mm", timezoneOptions);
            const arrTimeExp = (0, date_fns_timezone_1.formatToTimeZone)(arrDateTime, "HH:mm", timezoneOptions);
            if (depDateExp !== qcDate) {
                throw new Error(`校验去程航班信息，出发日期不匹配 预期${depDateExp} 实际${qcDate}`);
            }
            if (depTimeExp !== qcDepartureDateTime) {
                throw new Error(`校验去程航班信息出发时间不匹配 预期${depTimeExp} 实际${qcDepartureDateTime}`);
            }
            if (arrTimeExp !== qcArrivalDateTime) {
                throw new Error(`校验去程航班信息到达时间不匹配 预期${arrTimeExp} 实际${qcArrivalDateTime}`);
            }
        }
        // 获取返程航班信息
        const fcDetailPanel = (_b = new ui_object_helper_1.UiObjectHelper(root.children[0])
            .findChild("android.view.View", 0)) === null || _b === void 0 ? void 0 : _b.findChild("android.view.View", 1);
        if (fcDetailPanel) {
            let fcFlightNo = "";
            let fcDate = "";
            let fcDepartureTime = false;
            let fcDepartureDateTime = "";
            let fcArrivalDateTime = "";
            for (const fcView of fcDetailPanel.item.children) {
                if (fcView.className === "android.widget.TextView") {
                    if (!fcView.text) {
                        continue;
                    }
                    if (fcView.text.includes("CZ")) {
                        fcFlightNo = fcView.text;
                    }
                    if (fcView.text.includes("-")) {
                        fcDate = fcView.text;
                    }
                }
                if (fcView.className === "android.view.View") {
                    for (const timeView of fcView.children) {
                        if (timeView.className === "android.widget.TextView") {
                            if (!timeView.text) {
                                continue;
                            }
                            if (!fcDepartureTime && !fcDepartureDateTime && timeView.text.includes(":")) {
                                fcDepartureTime = true;
                                fcDepartureDateTime = timeView.text.trim();
                                continue;
                            }
                            if (fcDepartureTime && !fcArrivalDateTime && timeView.text.includes(":")) {
                                fcArrivalDateTime = timeView.text.trim();
                                return;
                            }
                        }
                        if (fcArrivalDateTime) {
                            return;
                        }
                    }
                }
            }
            if (fcFlightNo !== flights[1].fullFlightNo) {
                throw new Error(`校验返程航班信息，返程航班号不匹配，预期${fcFlightNo}，实际${flights[1].fullFlightNo}`);
            }
            const fcDepDateTime = new Date(flights[1].departureDateTime);
            const fcArrDateTime = new Date(flights[1].arrivalDateTime);
            const fcDepDateExp = (0, date_fns_timezone_1.formatToTimeZone)(fcDepDateTime, DATE_PATTERN, timezoneOptions);
            if (fcDepDateExp !== fcDate) {
                throw new Error(`校验返程航班信息出发日期不匹配，预期${fcDepDateExp}，实际${fcDate}`);
            }
            // 目标起飞时间格式化
            const fcDepTimeExp = (0, date_fns_timezone_1.formatToTimeZone)(fcDepDateTime, "HH:mm", timezoneOptions);
            // 目标到达时间格式化
            const fcArrTimeExp = (0, date_fns_timezone_1.formatToTimeZone)(fcArrDateTime, "HH:mm", timezoneOptions);
            if (fcDepTimeExp !== fcDepartureDateTime) {
                throw new Error(`校验返程航班信息出发时间不匹配，预期${fcDepTimeExp}，实际${fcDepartureDateTime}`);
            }
            if (fcArrTimeExp !== fcArrivalDateTime) {
                throw new Error(`校验返程航班信息到达时间不匹配，预期${fcArrTimeExp}，实际${fcArrivalDateTime}`);
            }
        }
    }
    async findTargetFlight(flight) {
        let flights = await selector.findAllById("item_card_view", 100, 1000);
        if (flights.length === 0) {
            if (await selector.findByTextContains("暂时没有可预订", 100, 1000)) {
                throw new Error("当天没有航班");
            }
            else {
                throw new Error("加载航班列表失败");
            }
        }
        let flightPanel = await selector.getById("domestic_list_data_rv", 400, 2000);
        let flightNos = [];
        let lastFlightCount = 0;
        let retry = 5;
        let cnt = 0;
        while (retry > 0) {
            retry--;
            lastFlightCount = flightNos.length;
            for (const flightCard of flights) {
                const fullFlightNo = this.getFullFlightNoFromCard(flightCard);
                if (!flightNos.find((x) => x === fullFlightNo)) {
                    flightNos.push(fullFlightNo);
                }
                else {
                    continue;
                }
                if (fullFlightNo === flight.fullFlightNo) {
                    const sellOut = selector.findChildById(flightCard, "book_single_list_sell_out_tv");
                    if (sellOut) {
                        throw new Error(`${fullFlightNo}航班${sellOut.text}`);
                    }
                    return flightCard;
                }
            }
            if (lastFlightCount === flightNos.length) {
                cnt++;
                if (cnt > 1) {
                    break;
                }
            }
            flightPanel.scrollForward();
            await (0, lang_1.delay)(1000);
            flightPanel = await selector.getById("domestic_list_data_rv", 400, 2000);
            flights = await selector.findAllById("item_card_view", 100, 1000);
        }
        return undefined;
    }
    // 去程航班
    async findTargetQCFlight(fullFlightNo) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        if (await selector.findByTextContains("暂时没有可预订", 100, 1000)) {
            throw new Error("当天没有航班");
        }
        else if (await selector.findByTextContains("大家太热情啦", 100, 1000)) {
            throw new Error("大家太热情啦，请稍后再试。");
        }
        let root = await selector.getById("root");
        let viewCount = root.children[0].children.filter(x => x.className === "android.view.View");
        while (!viewCount) {
            root = await selector.getById("root");
            viewCount = root.children[0].children.filter(x => x.className === "android.view.View");
        }
        // 去程模块 
        let leftFlights = (_d = (_c = (_b = (_a = new ui_object_helper_1.UiObjectHelper(root.children[0])) === null || _a === void 0 ? void 0 : _a.findChild("android.view.View", viewCount.length - 2)) === null || _b === void 0 ? void 0 : _b.findChild("android.view.View", 0)) === null || _c === void 0 ? void 0 : _c.findChild("android.view.View", 1)) === null || _d === void 0 ? void 0 : _d.findChild("android.widget.ListView", 0);
        let retry = 5;
        while (retry > 0 && !leftFlights) {
            retry--;
            root = await selector.getById("root");
            leftFlights = (_h = (_g = (_f = (_e = new ui_object_helper_1.UiObjectHelper(root.children[0])) === null || _e === void 0 ? void 0 : _e.findChild("android.view.View", viewCount.length - 2)) === null || _f === void 0 ? void 0 : _f.findChild("android.view.View", 0)) === null || _g === void 0 ? void 0 : _g.findChild("android.view.View", 1)) === null || _h === void 0 ? void 0 : _h.findChild("android.widget.ListView", 0);
        }
        let leftFlightNos = [];
        let leftLastFlightNo = "";
        let leftRetry = 5;
        while (leftRetry > 0) {
            leftRetry--;
            if (leftFlights) {
                const lastChild = leftFlights.item.children.at(-1);
                if (lastChild) {
                    const lastFlightNo = lastChild.children.filter((x) => x.className === "android.widget.TextView" &&
                        x.text.includes("CZ"));
                    if (lastFlightNo.length > 0) {
                        if (leftLastFlightNo === lastFlightNo[0].text.trim()) {
                            break;
                        }
                    }
                }
                for (const flightCard of leftFlights.item.children) {
                    const fullFlightNos = flightCard.children.filter((x) => x.className === "android.widget.TextView" &&
                        x.text.includes("CZ"));
                    if (fullFlightNos.length > 0) {
                        const qcFullFlightNo = fullFlightNos[0].text.trim();
                        this.log(`找到去程的航班号 ${qcFullFlightNo}`);
                        if (!leftFlightNos.find((x) => x === qcFullFlightNo)) {
                            leftFlightNos.push(qcFullFlightNo);
                        }
                        leftLastFlightNo = qcFullFlightNo;
                        if (qcFullFlightNo === fullFlightNo) {
                            return flightCard;
                        }
                    }
                }
            }
            await (0, accessibility_1.swipe)(400, 1750, 400, 400, 2000);
            await (0, lang_1.delay)(1000);
            root = await selector.getById("root");
            leftFlights = (_m = (_l = (_k = (_j = new ui_object_helper_1.UiObjectHelper(root.children[0])) === null || _j === void 0 ? void 0 : _j.findChild("android.view.View", viewCount.length - 2)) === null || _k === void 0 ? void 0 : _k.findChild("android.view.View", 0)) === null || _l === void 0 ? void 0 : _l.findChild("android.view.View", 1)) === null || _m === void 0 ? void 0 : _m.findChild("android.widget.ListView", 0);
        }
        return undefined;
    }
    // 返程航班
    async findTargetFCFlight(fullFlightNo) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        await (0, lang_1.delay)(3000);
        if (await this.waitForLoading()) {
            throw new Error("加载航班详情超时");
        }
        if (await selector.findByTextContains("暂时没有可预订", 100, 1000)) {
            throw new Error("当天没有航班");
        }
        else if (await selector.findByTextContains("大家太热情啦", 100, 1000)) {
            throw new Error("大家太热情啦，请稍后再试。");
        }
        let root = await selector.getById("root");
        let viewCount = root.children[0].children.filter(x => x.className === "android.view.View");
        while (!viewCount) {
            root = await selector.getById("root");
            viewCount = root.children[0].children.filter(x => x.className === "android.view.View");
        }
        let rightFlights = (_c = (_b = (_a = new ui_object_helper_1.UiObjectHelper(root.children[0])
            .findChild("android.view.View", viewCount.length - 2)) === null || _a === void 0 ? void 0 : _a.findChild("android.view.View", 1)) === null || _b === void 0 ? void 0 : _b.findChild("android.view.View", 1)) === null || _c === void 0 ? void 0 : _c.findChild("android.widget.ListView", 0);
        let retry = 5;
        while (retry > 0 && !rightFlights) {
            retry--;
            root = await selector.getById("root");
            rightFlights = (_f = (_e = (_d = new ui_object_helper_1.UiObjectHelper(root.children[0])
                .findChild("android.view.View", viewCount.length - 2)) === null || _d === void 0 ? void 0 : _d.findChild("android.view.View", 1)) === null || _e === void 0 ? void 0 : _e.findChild("android.view.View", 1)) === null || _f === void 0 ? void 0 : _f.findChild("android.widget.ListView", 0);
        }
        let rightFlightNos = [];
        let rightLastFlightNo = "";
        let rightRetry = 5;
        while (rightRetry > 0) {
            rightRetry--;
            if (rightFlights) {
                const lastChild = rightFlights.item.children.at(-1);
                if (lastChild) {
                    const lastFlightNo = lastChild.children.filter((x) => x.className === "android.widget.TextView" &&
                        x.text.includes("CZ"));
                    if (lastFlightNo.length > 0) {
                        if (rightLastFlightNo === lastFlightNo[0].text.trim()) {
                            break;
                        }
                    }
                }
                for (const flightCard of rightFlights === null || rightFlights === void 0 ? void 0 : rightFlights.item.children) {
                    const fullFlightNos = flightCard.children.filter((x) => x.className === "android.widget.TextView" &&
                        x.text.includes("CZ"));
                    if (fullFlightNos.length > 0) {
                        const fcFullFlightNo = fullFlightNos[0].text.trim();
                        if (!rightFlightNos.find((x) => x === fcFullFlightNo)) {
                            rightFlightNos.push(fcFullFlightNo);
                        }
                        rightLastFlightNo = fcFullFlightNo;
                        if (fcFullFlightNo === fullFlightNo) {
                            return flightCard;
                        }
                    }
                }
            }
            await (0, accessibility_1.swipe)(800, 1750, 800, 400, 2000);
            await (0, lang_1.delay)(1000);
            root = await selector.getById("root");
            rightFlights = (_j = (_h = (_g = new ui_object_helper_1.UiObjectHelper(root.children[0])
                .findChild("android.view.View", viewCount.length - 2)) === null || _g === void 0 ? void 0 : _g.findChild("android.view.View", 1)) === null || _h === void 0 ? void 0 : _h.findChild("android.view.View", 1)) === null || _j === void 0 ? void 0 : _j.findChild("android.widget.ListView", 0);
            await (0, lang_1.delay)(1000);
        }
        return undefined;
    }
    // 下单
    async CreateOrder(input) {
        var _a, _b, _c;
        try {
            const otheridentityType = input.passengers.filter(p => p.identityInfo.type == app_base_v9_1.IdentityCardType.OT).length;
            if (otheridentityType > 0) {
                throw new Error("南航下单不支持证件类型是其他，请转人工");
            }
            const allPassengersType1 = input.passengers.every(passenger => passenger.type === app_base_v9_1.PassengerType.Child);
            const singlePassengerType1 = input.passengers.length === 1 && input.passengers[0].type === app_base_v9_1.PassengerType.Child;
            if (allPassengersType1 || singlePassengerType1) {
                throw new Error("南航下单不支持单个儿童，请转人工");
            }
            const host = input.proxyHost === undefined ? "" : input.proxyHost;
            const proxyUrl = `${host !== null && host !== void 0 ? host : ""}:${input.proxyPort}`;
            await this.changeProxy(proxyUrl);
            await this.openHome();
            const useLoggedAccount = environment_1.environment.loginAccount === input.createOrderAccountInfo.userName;
            if (this._loginTokenCount > 10) {
                await this.logout();
            }
            await this.ensureLogin(input.createOrderAccountInfo);
            (_a = this._handler) === null || _a === void 0 ? void 0 : _a.update(app_base_v9_1.AppDeviceStatusType.Processing, environment_1.environment.loginAccount);
            const flight = input.flights[0];
            await this.deleteFrequentFlyer(30);
            if (input.flights.length > 1) {
                await this.createPassengersRoundTrip(input.passengers);
            }
            await this.openHome();
            var ppPassenger = input.passengers.filter(p => p.identityInfo.type == app_base_v9_1.IdentityCardType.PP);
            if (ppPassenger.length > 0) {
                ppPassenger.forEach(element => {
                    if (element.identityInfo.certificateValidityDate && new Date(element.identityInfo.certificateValidityDate).getFullYear() > Number(2101)) {
                        throw element.surName + '/' + element.givenName + '乘机人证件有效期' + element.identityInfo.certificateValidityDate + '不在APP证件有效期范围内';
                    }
                });
            }
            const beginDate = new Date(flight.departureDateTime);
            const currDateText = (0, date_fns_timezone_1.formatToTimeZone)(beginDate, DATE_PATTERN, timezoneOptions);
            if (input.flights.length <= 1) {
                (await selector.getById("include_main_home_view_booking_rb_singletrip", 100, 1000)).click();
            }
            else {
                (await selector.getById("include_main_home_view_booking_rb_backtrip", 100, 1000)).click();
            }
            await (0, lang_1.delay)(500);
            const backDate = input.flights.length > 1 ? new Date(input.flights[1].departureDateTime) : undefined;
            await this.searchFlight(flight.originAirport, flight.destinationAirport, beginDate, backDate);
            if (await this.waitForLoading(100, 2000)) {
                throw new Error("加载航班列表超时");
            }
            await this.waitForTip(false, true);
            let bestProduct;
            if (input.flights.length <= 1) {
                await this.clickIfIdExists("close", 200, 2000);
                await this.clickIfIdExists("close_btn", 200, 1000);
                if (await this.waitForLoading(100, 2000)) {
                    throw new Error("加载航班列表超时");
                }
                // 单程
                const targetFlight = await this.findTargetFlight(flight);
                if (!targetFlight) {
                    throw new Error(`该日期${currDateText}未找到航班${flight.fullFlightNo}`);
                }
                this.log(`点击目标航班 ${targetFlight.click()}`);
                if (await this.waitForLoading(100, 2000)) {
                    throw new Error("加载航班详情超时");
                }
                await this.waitForTip(true, true);
                let retry = 5;
                while (retry > 0) {
                    retry--;
                    const cabinTab = await selector.findById("domestic_full_cabin_tabs", 200, 2000);
                    if (cabinTab) {
                        break;
                    }
                    if (await this.waitForLoading(100, 2000)) {
                        throw new Error("加载航班详情超时");
                    }
                    await this.waitForTip(true, true);
                }
                await this.validateFlightInfo(flight.departureDateTime, flight.arrivalDateTime, flight.fullFlightNo);
                bestProduct = await this.selectProduct(input);
            }
            else {
                await (0, lang_1.delay)(1000);
                await (0, accessibility_1.click)(350, 150);
                await (0, lang_1.delay)(500);
                await (0, accessibility_1.click)(350, 150);
                const targetQCFlights = await this.findTargetQCFlight(flight.fullFlightNo);
                if (!targetQCFlights) {
                    throw new Error(`该日期${currDateText}未找到去程航班${flight.fullFlightNo}`);
                }
                this.log(`点击目标去程的航班号 ${targetQCFlights.click()}`);
                const targetFCFlights = await this.findTargetFCFlight(input.flights[1].fullFlightNo);
                if (!targetFCFlights) {
                    throw new Error(`该日期${currDateText}未找到返程航班${input.flights[1].fullFlightNo}`);
                }
                this.log(`点击目标返程的航班号 ${targetFCFlights.click()}`);
                const nextBtn = await selector.findByTextContains("下一步", 100, 3000);
                if (nextBtn) {
                    this.log(`点击下一步 ${nextBtn.click()}`);
                }
                if (await this.waitForLoading(100, 2000)) {
                    throw new Error("加载航班详情超时");
                }
                await this.waitForTip(true, true);
                await this.validateFlightInfoRoundTrip(input.flights);
                bestProduct = await this.selectProductPriceCabinRoundTrip(input);
            }
            await (0, lang_1.delay)(700);
            let actualPrices;
            let totalPrice;
            let orderNo;
            if (input.flights.length <= 1) {
                await this.inputPassenger(input);
                await this.inputContactAndCheck(input.contactInfo);
                await this.useCoupon(input);
                actualPrices = await this.checkPrices(input, bestProduct);
                totalPrice = await this.getTotalPrice();
                orderNo = await this.confirmOrder();
            }
            else {
                await this.inputContactRoundTrip(input.contactInfo);
                await this.inputPassengerRoundTrip(input);
                totalPrice = await this.getTotalPriceRoundTrip();
                actualPrices = await this.checkPricesRoundTrip(input, bestProduct);
                await this.inputContactAndCheckRoundTrip(input.contactInfo);
                const notIdentityCards = input.passengers.filter(x => x.identityInfo.type !== app_base_v9_1.IdentityCardType.NI).length > 0;
                orderNo = await this.confirmOrderRoundTrip(notIdentityCards);
            }
            if (useLoggedAccount) {
                this._loginTokenCount++;
            }
            this._failedCount = 0;
            this._networkErrorCount = 0;
            return {
                success: true,
                orderNo: orderNo,
                prices: actualPrices,
                totalPrice: totalPrice,
                message: "下单成功",
            };
        }
        catch (error) {
            const login = await this.checkLoginStatus();
            console.error(error);
            const msg = error === null || error === void 0 ? void 0 : error.message;
            (_b = this._handler) === null || _b === void 0 ? void 0 : _b.log(msg);
            this._failedCount++;
            if (msg === null || msg === void 0 ? void 0 : msg.includes("网络好像不给力")) {
                this._networkErrorCount++;
            }
            if (this._networkErrorCount > 1) {
                this.stopApp();
                this._networkErrorCount = 0;
            }
            return {
                success: false,
                message: !login ? "登录已失效," + msg : msg,
                detail: JSON.stringify(error),
            };
        }
        finally {
            await this.changeProxy(":0");
            if (this._failedCount > 2) {
                try {
                    await this.restartApp();
                    this._failedCount = 0;
                }
                catch (error) {
                    const msg = error === null || error === void 0 ? void 0 : error.message;
                    console.log(msg);
                    (_c = this._handler) === null || _c === void 0 ? void 0 : _c.log(msg);
                }
            }
            await this.backToHome();
        }
    }
    async openOrderPage() {
        let menuBar = await selector.findById("rv_personal_center_menu", 200, 2000);
        let myOrderBtn;
        if (!menuBar) {
            menuBar = await selector.getById("mine_order_rv");
            const myOrderText = selector.getChildByText(menuBar, "机票订单");
            myOrderBtn = selector.findClickableParent(myOrderText);
        }
        else {
            const myOrderText = selector.getChildByText(menuBar, "我的订单");
            myOrderBtn = selector.findClickableParent(myOrderText);
        }
        if (!myOrderBtn) {
            throw new Error("找不到我的订单按钮");
        }
        myOrderBtn.click();
        await selector.getById("root");
    }
    async selectPayOrder(orderNo) {
        await (0, lang_1.delay)(700);
        let loading = await (0, accessibility_1.select)({ id: "csair_loading" }).firstOrNull();
        let retry = 10;
        while (loading != null && retry > 0) {
            retry--;
            await (0, lang_1.delay)(1000);
            loading = await (0, accessibility_1.select)({ id: "csair_loading" }).firstOrNull();
        }
        if (loading != null) {
            throw new Error("加载全部订单列表超时");
        }
        (await selector.getById("m-tabs-0-1")).click();
        await (0, lang_1.delay)(700);
        loading = await (0, accessibility_1.select)({ id: "csair_loading" }).firstOrNull();
        retry = 10;
        while (loading != null && retry > 0) {
            retry--;
            await (0, lang_1.delay)(1000);
            loading = await (0, accessibility_1.select)({ id: "csair_loading" }).firstOrNull();
        }
        if (loading != null) {
            throw new Error("加载待付款订单列表超时");
        }
        const orderListViewText = await selector.findByTextContains("下拉可刷新列表", 200, 2000);
        if (!orderListViewText || !orderListViewText.parent) {
            throw new Error("找不到 下拉可刷新列表 文字");
        }
        const orderListView = orderListViewText.parent;
        if (orderListView.children.filter((x) => x.className === "android.view.View").length === 0) {
            await (0, accessibility_1.swipe)(400, 800, 400, 1000, 1000);
            await (0, lang_1.delay)(2000);
            loading = await (0, accessibility_1.select)({ id: "csair_loading" }).firstOrNull();
            retry = 10;
            while (loading != null && retry > 0) {
                retry--;
                await (0, lang_1.delay)(1000);
                loading = await (0, accessibility_1.select)({ id: "csair_loading" }).firstOrNull();
            }
            if (loading != null) {
                throw new Error("加载待付款订单列表超时");
            }
        }
        retry = 5;
        while (retry > 0) {
            retry--;
            const orderNoText = await selector.findByTextContains(orderNo, 100, 1000);
            if (orderNoText) {
                const btn = selector.findClickableParent(orderNoText);
                if (!btn) {
                    throw new Error("点击订单详情失败");
                }
                btn.click();
                return;
            }
            orderListView.scrollForward();
            await (0, lang_1.delay)(700);
        }
        throw new Error(`找不到待支付订单 ${orderNo} 订单可能已取消`);
    }
    async Pay(input) {
        var _a, _b, _c;
        try {
            const host = input.proxyHost === undefined ? "" : input.proxyHost;
            const proxyUrl = `${host !== null && host !== void 0 ? host : ""}:${input.proxyPort}`;
            await this.changeProxy(proxyUrl);
            await this.openHome();
            const useLoggedAccount = environment_1.environment.loginAccount ===
                input.createOrderAccountInfo.userName;
            // 如果要求账号和当前账号不一致 则重新登录
            if (this._loginTokenCount > 10) {
                await this.logout();
            }
            await this.ensureLogin(input.createOrderAccountInfo);
            (_a = this._handler) === null || _a === void 0 ? void 0 : _a.update(app_base_v9_1.AppDeviceStatusType.Processing, environment_1.environment.loginAccount);
            await this.openMine();
            await this.openOrderPage();
            await this.selectPayOrder(input.buyTicketOrderIdInfo.buyOrderNo.trim());
            await (0, lang_1.delay)(700);
            await this.checkOrderNo(input.buyTicketOrderIdInfo.buyOrderNo);
            const total = await this.getPayTotalPrice();
            if (total > input.totalAmount) {
                throw new Error(`实际支付金额${total}大于预期金额${input.totalAmount}`);
            }
            else {
                this.log(`实际支付金额${total} 预期金额${input.totalAmount}`);
            }
            this.log(`点击支付订单按钮${(await selector.getById("pay_order_btn")).click()}`);
            await (0, lang_1.delay)(700);
            if (await this.waitForLoading()) {
                throw new Error("进入支付页面超时");
            }
            let timestamp = "";
            let sn = "";
            switch (input.payType) {
                case dtos_1.CZPayMethodType.CreditCard:
                    throw new Error(`不支持的支付方式 ${input.payType}`);
                case dtos_1.CZPayMethodType.Wallet:
                    ({ timestamp, sn } = await this.payWithWallet(input.paymentPassword, total));
                    break;
                default:
                    throw new Error(`不支持的支付方式 ${input.payType}`);
            }
            if (useLoggedAccount) {
                this._loginTokenCount++;
            }
            this._failedCount = 0;
            this._networkErrorCount = 0;
            return {
                success: true,
                totalAmount: total,
                message: "下单成功",
                paymentSerialNo: sn,
                timestamp: timestamp,
            };
        }
        catch (error) {
            const login = await this.checkLoginStatus();
            console.error(error);
            const msg = error === null || error === void 0 ? void 0 : error.message;
            (_b = this._handler) === null || _b === void 0 ? void 0 : _b.log(msg);
            this._failedCount++;
            if (msg === null || msg === void 0 ? void 0 : msg.includes("网络好像不给力")) {
                this._networkErrorCount++;
            }
            if (this._networkErrorCount > 1) {
                this.stopApp();
                this._networkErrorCount = 0;
            }
            return {
                success: false,
                message: !login ? "登录已失效," + msg : msg,
                detail: JSON.stringify(error),
            };
        }
        finally {
            await this.changeProxy(":0");
            if (this._failedCount > 2) {
                try {
                    await this.restartApp();
                    this._failedCount = 0;
                }
                catch (error) {
                    const msg = error === null || error === void 0 ? void 0 : error.message;
                    console.log(msg);
                    (_c = this._handler) === null || _c === void 0 ? void 0 : _c.log(msg);
                }
            }
            await this.backToHome();
        }
    }
    async checkOrderNo(buyOrderNo) {
        const orderNoText = await selector.getById("order_id_tv");
        if (!orderNoText.text.includes(buyOrderNo)) {
            throw new Error(`订单详情校验订单号不通过，实际 ${orderNoText.text}，预期 ${buyOrderNo}`);
        }
        else {
            this.log(`校验订单号通过 ${orderNoText.text} ${buyOrderNo}`);
        }
    }
    async payWithWallet(password, total) {
        const walletPayTextView = await selector.findByTextContains("南航账户");
        if (!walletPayTextView) {
            throw new Error("南航账户字符未找到");
        }
        const amountText = walletPayTextView.text
            .replace("南航账户(¥", "")
            .replace(")", "");
        this.log(`账户余额 ${amountText}`);
        const amount = Number(amountText);
        if (!isNaN(amount) && amount < total) {
            throw new Error(`南航账户余额不足实际${amount} 订单金额${total}`);
        }
        const parent = selector.findClickableParent(walletPayTextView);
        if (!parent) {
            throw new Error("南航账户支付按钮未找到");
        }
        parent.click();
        await (0, lang_1.delay)(700);
        const passwordInput = await selector.getById("balance_payment_password_et");
        passwordInput.setText(password);
        const ts = new Date();
        this.log(`点击立即支付按钮${(await selector.getById("credit_card_pay_bt")).click()}`);
        if (await this.waitForLoading()) {
            throw new Error("等待支付完成超时");
        }
        await this.waitForTip(true, true);
        this.log("检查错误提示完成，开始查找支付成功文字");
        let successText = await selector.findByTextContains("支付成功", 200, 2000);
        if (successText) {
            this.log(`支付成功`);
        }
        else {
            const memberText = await selector.findByTextContains("我要入会", 200, 2000);
            if (memberText) {
                (0, accessibility_1.back)();
                successText = await selector.findByTextContains("支付成功", 200, 2000);
                if (successText) {
                    this.log(`支付成功`);
                }
                else {
                    throw new Error("点击支付成功，但跳转支付完成页面失败，请人工检查实际是否成功");
                }
            }
            else {
                const dialogUpgrade = await selector.findById("dialog_upgrade", 200, 2000);
                if (dialogUpgrade) {
                    const content = await selector.findById("invite_meeting__content_tv");
                    if (content) {
                        this.log(content.text);
                    }
                    await this.clickIfIdExists("invite_meeting__cancel_tv", 200, 1000);
                    this.log("点击放弃福利");
                }
                else {
                    throw new Error("点击支付成功，但跳转支付完成页面失败，请人工检查实际是否成功");
                }
            }
        }
        return { timestamp: ts.getTime().toString(), sn: "" };
    }
    async getPayTotalPrice() {
        const text = (await selector.getById("order_price")).text;
        if (!text) {
            throw new Error("获取支付总金额失败");
        }
        const amountText = text.slice(1);
        const amount = Number(amountText);
        if (isNaN(amount)) {
            throw new Error(`解析支付总金额失败 ${text.slice(1)}`);
        }
        else {
            return amount;
        }
    }
    /**
     * 获取航班的价格和舱位信息
     * @returns
     */
    async getFlightPrices(fullFlightNo) {
        var _a, _b, _c, _d;
        let isSharedFlight = false;
        let isSharedFlightText = await selector.findById("book_share_label", 100, 1000);
        if (isSharedFlightText) {
            isSharedFlight = true;
        }
        let actualCarrierFullFlightNo = "";
        let actualCarrierFullFlightNoText = await selector.findById("book_share_real_flight_no", 100, 1000);
        if (actualCarrierFullFlightNoText) {
            actualCarrierFullFlightNo = actualCarrierFullFlightNoText.text
                .replace(")", "")
                .trim();
        }
        const match = this.flightDateTimeMatch();
        let flight = {
            fullFlightNo: fullFlightNo,
            isSharedFlight: isSharedFlight,
            actualCarrierFullFlightNo: actualCarrierFullFlightNo,
            aircraftModel: "",
            airportTax: null,
            oilFee: null,
            cabins: [],
            departureDate: (_a = (await match).groups) === null || _a === void 0 ? void 0 : _a.date,
            arrivalDate: (_b = (await match).groups) === null || _b === void 0 ? void 0 : _b.date,
            departureTime: (_c = (await match).groups) === null || _c === void 0 ? void 0 : _c.dep_time.replace("整", "00").replace("点", ":").replace("分", ""),
            arrivalTime: (_d = (await match).groups) === null || _d === void 0 ? void 0 : _d.arr_time.replace("整", "00").replace("点", ":").replace("分", ""),
        };
        const productListView = await selector.findById("domestic_full_cabin_rv_flight_cabin", 100, 3000);
        if (!productListView) {
            throw new Error(`找不到产品列表`);
        }
        let retry = 5;
        while (retry > 0) {
            retry--;
            const items = productListView.children;
            // 根据文字提示判断首乘专享、长者特惠
            const detailTipText = await selector.findById("cabin_details_tips_content_iv", 100, 1000);
            if (detailTipText) {
                if (detailTipText.text.includes("首次")) {
                    this.log(`找到首次乘坐南航航班旅客专享优惠`);
                    const tagMore = await selector.findById("cabin_details_fc_tag_more", 200, 1000);
                    if (tagMore) {
                        await (0, accessibility_1.click)(tagMore.boundsInScreen.centerX +
                            tagMore.boundsInScreen.width / 4, tagMore.boundsInScreen.centerY);
                        this.log(`点击会员多人特惠或长者特惠`);
                        await (0, lang_1.delay)(1000);
                    }
                }
            }
            let allExists = false;
            for (const item of items) {
                const cabinPriceInfo = await this.getCabinPriceInfo(item);
                this.log(`获取到的舱位价格信息：${JSON.stringify(cabinPriceInfo)}`);
                const exists = flight.cabins.find((x) => flight.cabins[0].cabin === cabinPriceInfo.cabin &&
                    flight.cabins[0].productName ===
                        cabinPriceInfo.productName &&
                    flight.cabins[0].ticketPrice ===
                        cabinPriceInfo.ticketPrice);
                if (!exists) {
                    flight.cabins.push(cabinPriceInfo);
                }
                else {
                    allExists = true;
                }
            }
            if (allExists) {
                break;
            }
            productListView.scrollDown();
            await (0, lang_1.delay)(1000);
        }
        return flight;
    }
    async getCabinPriceInfo(item) {
        let productName;
        let productNameText = selector.findChildById(item, "cabin_details_name_tv");
        if (productNameText) {
            productName = productNameText.text;
        }
        else {
            productNameText = selector.findChildById(item, "cabin_details_fc_title_1");
            if (productNameText) {
                productName = productNameText.text;
            }
            else {
                productNameText = selector.getChildById(item, "cabin_details_fc_tag_more");
                if (!productNameText) {
                    throw new Error("获取产品类型失败");
                }
                else {
                    // 根据文字提示判断首乘专享、长者特惠
                    const detailTipText = selector.findChildById(item, "cabin_details_tips_content_iv");
                    if (detailTipText) {
                        if (detailTipText.text.includes("长者旅客")) {
                            productName = "长者特惠";
                        }
                        else {
                            productName = "会员多人特惠";
                        }
                    }
                }
            }
        }
        const priceText = selector.getChildById(item, "cabin_details_price_tv");
        this.log(`获取到的价格${priceText.text}`);
        const cabinText = selector.getChildById(item, "cabin_details_code_tv");
        const directDiscountText = selector.findChildById(item, "cabin_details_order_cut_tv");
        this.log(`找到产品 ${productName}:${priceText.text}|${cabinText.text}|${directDiscountText === null || directDiscountText === void 0 ? void 0 : directDiscountText.text}`);
        const ticketPrice = Number(priceText.text.replace("起", ""));
        if (isNaN(ticketPrice)) {
            throw new Error(`解析票面价失败 ${priceText.text.replace("起", "")}不是有效的数字`);
        }
        let directDiscount;
        if (directDiscountText) {
            directDiscount = Number(directDiscountText.text.substring(3));
            if (isNaN(directDiscount)) {
                console.log(`解析直减金额失败 ${directDiscountText.text.substring(3)}不是有效的数字`);
                directDiscount = 0;
            }
        }
        else {
            directDiscount = 0;
        }
        // 剩余张数
        let votes = 9;
        const votesText = selector.findChildById(item, "cabin_details_remaining_tickets_count");
        if (votesText) {
            console.log(`解析剩余票数 ${votesText.text.substring(1, 2)}`);
            votes = Number(votesText.text.substring(1, 2));
        }
        return {
            cabin: cabinText.text.replace("舱", "").trim(),
            cabinClass: app_base_v9_1.CabinClassType.EconomyClass,
            productName: productName,
            status: votes,
            currency: "CNY",
            passengerType: app_base_v9_1.PassengerType.Adult,
            ticketPrice: ticketPrice,
            settlementPrice: ticketPrice - directDiscount,
        };
    }
    /**
     * 爬取运价(R舱)
     * @param input
     * @returns
     */
    async QueryFlightPrices(input) {
        var _a, _b, _c;
        try {
            await this.openHome();
            // 如果要求账号和当前账号不一致 则重新登录
            await this.ensureLogin(input.accountInfo);
            (_a = this._handler) === null || _a === void 0 ? void 0 : _a.update(app_base_v9_1.AppDeviceStatusType.Processing, environment_1.environment.loginAccount);
            await this.openHome();
            const currDate = new Date(input.date);
            let result = {
                success: true,
                prices: [],
            };
            // 单程
            (await selector.getById("include_main_home_view_booking_rb_singletrip", 100, 1000)).click();
            // 开始查询
            await this.searchFlight(input.originAirport, input.destinationAirport, currDate);
            if (await this.waitForLoading()) {
                throw new Error("加载航班列表超时");
            }
            await this.waitForTip(false, true);
            await this.clickIfIdExists("close", 200, 2000);
            await this.clickIfIdExists("close_btn", 200, 1000);
            if (await this.waitForLoading()) {
                throw new Error("加载航班列表超时");
            }
            const currDateText = (0, date_fns_timezone_1.formatToTimeZone)(currDate, DATE_PATTERN, timezoneOptions);
            const flightPanel = await selector.getById("domestic_list_data_rv", 400, 2000);
            // 获取所有航班
            let flights = await selector.findAllById("item_card_view", 100, 1000);
            if (flights.length === 0) {
                const noFlights = await selector.findByTextContains("暂时没有可预订", 100, 1000);
                const sellOut = await selector.findByTextContains("已售罄", 100, 1000);
                if (noFlights || sellOut) {
                    this.log(`该日期没有航班 ${input.originAirport}-${input.destinationAirport} ${currDateText}`);
                }
                else {
                    this.log(`该日期查询失败 ${input.originAirport}-${input.destinationAirport} ${currDateText}`);
                    throw new Error(`该日期的航班查询失败  ${input.originAirport}-${input.destinationAirport} ${currDateText}`);
                }
                return result;
            }
            let flightNos = [];
            let lastFlightCount = 0;
            let retry = 3;
            let cnt = 0;
            while (retry > 0) {
                retry--;
                lastFlightCount = flightNos.length;
                for (const flight of flights) {
                    const fullFlightNo = this.getFullFlightNoFromCard(flight);
                    const flightStopInfo = this.getStopInfoFromCard(flight);
                    if (flightStopInfo && flightStopInfo.includes("中转")) {
                        console.log(`中转航班 ${fullFlightNo} 跳过`);
                        continue;
                    }
                    // 售罄
                    const sellOut = selector.findChildById(flight, "book_single_list_sell_out_tv");
                    if (sellOut) {
                        console.log(`售罄航班 ${fullFlightNo} 跳过`);
                        continue;
                    }
                    if (!flightNos.find((x) => x === fullFlightNo)) {
                        flightNos.push(fullFlightNo);
                        // 存在目标航班号
                        if (input.fullFlightNo != null &&
                            input.fullFlightNo != undefined) {
                            if (input.fullFlightNo === fullFlightNo) {
                                flight.click();
                                await (0, lang_1.delay)(700);
                                const prices = await this.getFlightPrices(fullFlightNo);
                                result.prices.push(prices);
                                return result;
                            }
                        }
                        else {
                            flight.click();
                            await (0, lang_1.delay)(700);
                            this.log(`点击${fullFlightNo}航班`);
                            const price = await this.getFlightPrices(fullFlightNo);
                            result.prices.push(price);
                            await this.clickIfDescContains("返回上一页", 100, 1000);
                            await (0, lang_1.delay)(1000);
                        }
                    }
                    else {
                        continue;
                    }
                }
                if (lastFlightCount === flightNos.length) {
                    cnt++;
                    if (cnt > 1) {
                        // 两次都相同退出
                        break;
                    }
                }
                flightPanel.scrollForward();
                await (0, lang_1.delay)(1000);
                flights = await selector.findAllById("item_card_view", 100, 1000);
                console.log(`翻页后查询航班`);
            }
            return result;
        }
        catch (error) {
            // 判断登录是否失效
            const login = await this.checkLoginStatus();
            console.error(error);
            const msg = error === null || error === void 0 ? void 0 : error.message;
            (_b = this._handler) === null || _b === void 0 ? void 0 : _b.log(msg);
            this._failedCount++;
            if (msg === null || msg === void 0 ? void 0 : msg.includes("网络好像不给力")) {
                this._networkErrorCount++;
            }
            if (this._networkErrorCount > 1) {
                this.stopApp();
                this._networkErrorCount = 0;
            }
            return {
                success: false,
                message: !login ? "登录已失效," + msg : msg,
                detail: JSON.stringify(error),
            };
        }
        finally {
            await this.changeProxy(":0");
            if (this._failedCount > 2) {
                try {
                    await this.restartApp();
                    this._failedCount = 0;
                }
                catch (error) {
                    const msg = error === null || error === void 0 ? void 0 : error.message;
                    console.log(msg);
                    (_c = this._handler) === null || _c === void 0 ? void 0 : _c.log(msg);
                }
            }
            await this.backToHome();
        }
    }
    /**
     * 改签--进入'所有订单'页面
     */
    async OpenMyOrderPage() {
        var _a;
        let myOrderBtn = await selector.findById("mine_order_all_tv", 100, 2000);
        if (!myOrderBtn) {
            myOrderBtn = await selector.findByTextContains("全部订单", 100, 2000);
            if (!myOrderBtn) {
                throw new Error("找不到我的订单按钮");
            }
        }
        (_a = myOrderBtn.parent) === null || _a === void 0 ? void 0 : _a.click();
        this.log("进入我的订单页面");
    }
    /**
     * 改签--选择改签订单
     * @param orderNo 订单号
     */
    async SelectChangeOrder(orderNo) {
        // 点击搜索按钮
        const searchBtn = await selector.findByTextContains("订单查询", 100, 3000);
        if (searchBtn) {
            searchBtn.click();
            await (0, lang_1.delay)(700);
            this.log('点击订单查询');
        }
        // 订单号查询
        const orderNoTabBtn = await selector.findByTextContains("订单号查询", 100, 2000);
        if (orderNoTabBtn) {
            orderNoTabBtn.click();
            await (0, lang_1.delay)(700);
            this.log('订单号查询');
        }
        const orderNoInput = await selector.findByTextContains("输入机票订单号", 100, 2000);
        if (orderNoInput) {
            orderNoInput.children[0].click();
            this.log('输入机票订单号');
            orderNoInput.children[0].setText(orderNo);
        }
        const confirmBtn = await selector.findByTextContains("确定", 100, 1000);
        if (confirmBtn) {
            confirmBtn.click();
            this.log('点击确定');
            await (0, lang_1.delay)(700);
        }
    }
    /**
     * 改签--'机票退改'操作
     * @param passengersCount 乘机人数量
     */
    async ChangeOrderDetail(passengersCount) {
        var _a;
        this.log("等待详情加载");
        let ticketChangeClick = await selector.findByTextContains("机票退改", 100, 1000);
        let count = passengersCount + 1;
        while (count > 0) {
            count--;
            await (0, accessibility_1.swipe)(400, 1000, 400, 400, 1000);
            await (0, lang_1.delay)(500);
        }
        ticketChangeClick = await selector.findByTextContains("机票退改", 100, 1000);
        if (ticketChangeClick) {
            this.log(`点击--机票退改`);
            (_a = ticketChangeClick.parent) === null || _a === void 0 ? void 0 : _a.click();
            await (0, lang_1.delay)(1000);
        }
        else {
            throw new Error(`错误：未找到机票退改操作`);
        }
        await this.waitForChangeError();
    }
    /**
     * 改签--'变更'操作
     */
    async ClickTicketChange() {
        var _a;
        let ticketChangeClick = await selector.findByTextContains("变更", 100, 1000);
        if (!ticketChangeClick) {
            await this.waitForChangeLoading();
            ticketChangeClick = await selector.findByTextContains("变更", 100, 1000);
        }
        (_a = ticketChangeClick === null || ticketChangeClick === void 0 ? void 0 : ticketChangeClick.parent) === null || _a === void 0 ? void 0 : _a.click();
        await (0, lang_1.delay)(700);
        await this.waitForChangeError();
    }
    /**
     * 改签--选择乘客
     */
    async SelectChangePassengers() {
        var _a, _b, _c, _d;
        var passengers = [];
        var selectPassenger = await selector.findByTextContains("请选择乘机人", 100, 1000);
        if (!(selectPassenger === null || selectPassenger === void 0 ? void 0 : selectPassenger.parent)) {
            throw new Error("错误：选择乘机人异常");
        }
        else {
            // 多人的情况下先翻页，确保都能选中
            await (0, accessibility_1.swipe)(400, 1000, 400, 400, 1000);
            await (0, lang_1.delay)(500);
            for (var i = 0; i < ((_a = selectPassenger === null || selectPassenger === void 0 ? void 0 : selectPassenger.parent) === null || _a === void 0 ? void 0 : _a.childCount); i++) {
                if (i < 3) {
                    continue;
                }
                var child = (_b = selectPassenger === null || selectPassenger === void 0 ? void 0 : selectPassenger.parent) === null || _b === void 0 ? void 0 : _b.children[i];
                if (child.className.includes("android.view.View")) {
                    passengers.push(child);
                }
            }
            passengers.pop();
            passengers.pop();
            // 多乘客时处理
            if (passengers.length > 1) {
                for (let index = 0; index < passengers.length; index++) {
                    const element = passengers[index];
                    element.children[0].click();
                    await (0, lang_1.delay)(700);
                    await this.waitForChangeLoading();
                }
            }
            var selectDate = await selector.findByTextContains("选择日期", 100, 1000);
            // 选择日期
            selectDate === null || selectDate === void 0 ? void 0 : selectDate.click();
            await this.waitForChangeLoading();
            // 温馨提示--继续
            (_c = (await selector.findByTextContains("继", 100, 2000))) === null || _c === void 0 ? void 0 : _c.click();
            var selectZeroPessager = await selector.findByTextContains("勾选乘机人", 50, 2000);
            // 没选择任何乘客时的处理
            if (selectZeroPessager) {
                var selectZeroPessagerConfirm = await selector.findByTextContains("确", 100, 2000);
                selectZeroPessagerConfirm === null || selectZeroPessagerConfirm === void 0 ? void 0 : selectZeroPessagerConfirm.click();
                await (0, lang_1.delay)(800);
                await this.SelectChangePassengers();
            }
            // 不管什么提示都关闭
            let tip = await selector.findByTextContains('温馨提示', 100, 2000);
            if (tip) {
                (_d = (await selector.findByTextContains("确", 100, 1000))) === null || _d === void 0 ? void 0 : _d.click();
            }
        }
    }
    /**
     * 改签--加载中
     * @param interval 时间
     * @param timeout 失效时间
     * @returns
     */
    async waitForChangeLoading(interval, timeout) {
        interval !== null && interval !== void 0 ? interval : (interval = 500);
        timeout !== null && timeout !== void 0 ? timeout : (timeout = 10000);
        await (0, lang_1.delay)(interval);
        let m = new Date().getTime() + timeout;
        let isLoading = await selector.findByTextContains("加载中", 50, 1500);
        while (isLoading && m >= new Date().getTime()) {
            isLoading = await selector.findByTextContains("加载中", 50, 1500);
            if (isLoading) {
                await (0, lang_1.delay)(interval);
            }
        }
        return isLoading === null ? true : false;
    }
    /**
     * 改签--处理中
     * @param interval 时间
     * @param timeout 失效时间
     * @returns
     */
    async waitForChangeHandle(interval, timeout) {
        interval !== null && interval !== void 0 ? interval : (interval = 500);
        timeout !== null && timeout !== void 0 ? timeout : (timeout = 10000);
        await (0, lang_1.delay)(interval);
        let m = new Date().getTime() + timeout;
        let isHandling = await selector.findByTextContains("正在为您处理", 50, 1500);
        while (isHandling && m >= new Date().getTime()) {
            isHandling = await selector.findByTextContains("正在为您处理", 50, 1500);
            if (isHandling) {
                await (0, lang_1.delay)(interval);
            }
        }
        return isHandling === null ? true : false;
    }
    /**
     * 改签--异常捕获
     */
    async waitForChangeError() {
        var _a, _b, _c;
        const tip = await selector.findByTextContains('当前您没有可办理退改的机票', 100, 2000);
        const tip1 = await selector.findByTextContains('该单的变更申请正在处理中', 100, 2000);
        if (tip != null || tip1 != null) {
            const wxTip = await selector.findByTextContains('温馨提示', 100, 1000);
            let tipParent = wxTip === null || wxTip === void 0 ? void 0 : wxTip.parent;
            while (!tipParent) {
                tipParent = wxTip === null || wxTip === void 0 ? void 0 : wxTip.parent;
            }
            let tipPChildren = tipParent.children;
            while (tipPChildren.length < 1) {
                tipPChildren = tipParent.children;
            }
            (_a = (await selector.findByTextContains("确", 100, 1000))) === null || _a === void 0 ? void 0 : _a.click();
            if (tip1) {
                throw new Error('下单可能成功：' + ((_b = wxTip === null || wxTip === void 0 ? void 0 : wxTip.parent) === null || _b === void 0 ? void 0 : _b.children.filter(x => x.className === "android.view.View")[0].children[0].text));
            }
            else if (tip) {
                throw new Error('错误：' + ((_c = wxTip === null || wxTip === void 0 ? void 0 : wxTip.parent) === null || _c === void 0 ? void 0 : _c.children.filter(x => x.className === "android.view.View")[0].children[0].text));
            }
        }
    }
    // 改签--改签日期
    async SelectChangeDate(oldFlightDepartureDate, newFlightInfo) {
        var _a;
        await this.waitForChangeLoading();
        const oldDepartureDate = new Date(oldFlightDepartureDate);
        const departureDate = new Date(newFlightInfo.departureDateTime);
        const departureDateFormat = (0, date_fns_timezone_1.formatToTimeZone)(departureDate, "YYYY-MM-DD", timezoneOptions);
        const targetYearMonth = departureDateFormat.substring(0, 7);
        const targetDay = departureDateFormat.substring(8, 10);
        let selectDate = false;
        let tempIndex = 0;
        const date1 = new Date(oldDepartureDate);
        const date2 = new Date(targetYearMonth);
        console.log(date1 < date2);
        console.log(date1 > date2);
        if (date1 < date2) {
            await (0, accessibility_1.swipe)(400, 1830, 400, 620, 700);
            await (0, lang_1.delay)(700);
        }
        else if (date1 > date2) {
            await (0, accessibility_1.swipe)(400, 620, 400, 1830, 700);
            await (0, lang_1.delay)(700);
        }
        let root = await selector.getById("root", 50, 2000);
        let dayContainer = (_a = new ui_object_helper_1.UiObjectHelper(root.children[0])
            .findChild("android.view.View", 1)) === null || _a === void 0 ? void 0 : _a.findChild("android.view.View", 1);
        const days = dayContainer === null || dayContainer === void 0 ? void 0 : dayContainer.item.children;
        if (!days) {
            throw new Error('错误：日期列表查询失败');
        }
        for (let index = 0; index < days.length; index++) {
            const element = days[index];
            if (element.childCount === 0) {
            }
            if (element.childCount === 0 && element.text === targetYearMonth) {
                tempIndex = index;
                break;
            }
        }
        for (let dayIndex = 0; dayIndex < days.length; dayIndex++) {
            if (selectDate) {
                break;
            }
            const element = days[dayIndex];
            if (dayIndex > tempIndex && element.childCount > 0) {
                for (let childIndex = 0; childIndex < element.children.length; childIndex++) {
                    const dayEle = element.children[childIndex];
                    if (dayEle.text && dayEle.text !== undefined && parseInt(dayEle.text) === parseInt(targetDay)) {
                        await (0, accessibility_1.click)(dayEle.boundsInScreen.centerX, dayEle.boundsInScreen.centerY);
                        await (0, lang_1.delay)(700);
                        selectDate = true;
                        break;
                    }
                }
            }
        }
        if (!selectDate) {
            throw new Error('错误：改签日期选择无效');
        }
    }
    /**
     * 改签--改签航班
     */
    async SelectChangeFlight(oldFlightDepartureDate, newFlightInfo) {
        var _a, _b, _c;
        await this.waitForChangeLoading();
        // 不管什么提示都关闭
        let tip = await selector.findByTextContains('网络异常', 100, 2000);
        if (!tip) {
            tip = await selector.findByTextContains('温馨提示', 100, 2000);
            if (tip) {
                let tipParent = tip.parent;
                while (!tipParent) {
                    tipParent = tip.parent;
                }
                let tipPChildren = tipParent.children;
                while (tipPChildren.length < 1) {
                    tipPChildren = tipParent.children;
                }
                (_a = (await selector.findByTextContains("确", 100, 1000))) === null || _a === void 0 ? void 0 : _a.click();
                throw new Error('错误：' + ((_b = tip.parent) === null || _b === void 0 ? void 0 : _b.children.filter(x => x.className === "android.view.View")[0].children[0].text));
            }
        }
        else {
            (_c = (await selector.findByTextContains("确", 100, 2000))) === null || _c === void 0 ? void 0 : _c.click();
            await (0, lang_1.delay)(800);
            // 重新选择日期
            const departureDate = new Date(newFlightInfo.departureDateTime);
            const departureDateFormat = (0, date_fns_timezone_1.formatToTimeZone)(departureDate, "YYYY-MM-DD", timezoneOptions);
            const currDate = await selector.findByTextContains(departureDateFormat, 100, 1000);
            if (currDate) {
                currDate.click();
                this.SelectChangeDate(oldFlightDepartureDate, newFlightInfo);
            }
        }
        await (0, accessibility_1.swipe)(500, 1650, 500, 980, 800);
        await (0, lang_1.delay)(800);
        await (0, accessibility_1.swipe)(500, 980, 500, 1650, 800);
        await (0, lang_1.delay)(800);
        let fullFlightNos = await selector.findAllByTextContains('CZ', 100, 2000);
        if (fullFlightNos.length === 0) {
            await (0, accessibility_1.click)(560, 705);
            await (0, lang_1.delay)(800);
            await (0, accessibility_1.swipe)(500, 1650, 500, 980, 800);
            await (0, lang_1.delay)(800);
            await (0, accessibility_1.swipe)(500, 980, 500, 1650, 800);
            await (0, lang_1.delay)(800);
            fullFlightNos = await selector.findAllByTextContains('CZ', 100, 2000);
            if (fullFlightNos.length === 0) {
                const more = await selector.findByTextContains('更多选择', 100, 2000);
                console.log(more);
                more === null || more === void 0 ? void 0 : more.click();
                await (0, accessibility_1.swipe)(500, 1650, 500, 980, 800);
                await (0, lang_1.delay)(800);
                await (0, accessibility_1.swipe)(500, 980, 500, 1650, 800);
                await (0, lang_1.delay)(800);
            }
            await (0, accessibility_1.click)(560, 705);
            await (0, lang_1.delay)(800);
        }
        fullFlightNos = await selector.findAllByTextContains('CZ');
        let booking = false;
        for (let flightIndex = 0; flightIndex < fullFlightNos.length; flightIndex++) {
            const changeFlightNoText = fullFlightNos[flightIndex].text.match(/CZ\d+/g);
            if (changeFlightNoText && changeFlightNoText[0] === newFlightInfo.fullFlightNo) {
                booking = true;
                console.log(`选择航班${fullFlightNos[flightIndex].boundsInScreen.centerX + 350}, ${fullFlightNos[flightIndex].boundsInScreen.centerY - 100}`);
                await (0, accessibility_1.click)(fullFlightNos[flightIndex].boundsInScreen.centerX + 350, fullFlightNos[flightIndex].boundsInScreen.centerY - 100);
                await (0, lang_1.delay)(1000);
                await (0, accessibility_1.swipe)(500, 1650, 500, 980, 500);
                await (0, lang_1.delay)(500);
                break;
            }
            if (flightIndex !== 0 && flightIndex % 3 === 0) {
                // await swipe(500, 1650, 500, 980, 800);
                await (0, accessibility_1.swipe)(500, 2070, 500, 600, 800);
                await (0, lang_1.delay)(800);
                fullFlightNos = await selector.findAllByTextContains('CZ', 100, 2000);
            }
        }
        if (!booking) {
            throw new Error(`错误：${newFlightInfo.fullFlightNo} 该航班不存在`);
        }
        // 点击第一个选择按钮
        const selectBtns = await selector.findAllByTextContains("选择", 50, 1000);
        if (selectBtns.length === 1) {
            throw new Error(`找不到 选择按钮`);
        }
        await (0, accessibility_1.click)(selectBtns[1].boundsInScreen.centerX - 200, selectBtns[1].boundsInScreen.centerY);
        await (0, lang_1.delay)(1000);
        await this.waitForChangeLoading();
    }
    /**
     * 改签--创建改签订单
     * @returns input
     */
    async CreateChangeOrder(input) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        try {
            await this.openHome();
            this.log(`当前已登录账号 ${environment_1.environment.loginAccount} 下单账号 ${input.accountInfo.userName} 账号使用计数 ${this._loginTokenCount}`);
            if (this._loginTokenCount > 10) {
                this.log(`当前账号 ${environment_1.environment.loginAccount} 下单次数超过10次 需要注销`);
                await this.logout();
            }
            await this.ensureLogin(input.accountInfo);
            (_a = this._handler) === null || _a === void 0 ? void 0 : _a.update(app_base_v9_1.AppDeviceStatusType.Processing, environment_1.environment.loginAccount);
            await this.openMine();
            await this.OpenMyOrderPage();
            await this.SelectChangeOrder(input.buyOrderNo.trim());
            await this.ChangeOrderDetail(input.buyOrderPassengerInfos.length);
            await this.ClickTicketChange();
            await this.waitForChangeLoading();
            let oldFlightInfo = await selector.findByTextContains('南方航空 CZ', 100, 2000);
            if (!oldFlightInfo) {
                oldFlightInfo = await selector.findByTextContains('南方航空 CZ', 100, 2000);
                if (!oldFlightInfo) {
                    throw new Error('改签详情获取失败，无法选择乘机人');
                }
            }
            const oldFlightDepartureDate = oldFlightInfo === null || oldFlightInfo === void 0 ? void 0 : oldFlightInfo.text.substring(0, 7);
            await this.SelectChangePassengers();
            if (oldFlightDepartureDate) {
                await this.SelectChangeDate(oldFlightDepartureDate, input.newFlightInfos[0]);
                await this.SelectChangeFlight(oldFlightDepartureDate, input.newFlightInfos[0]);
            }
            await this.waitForChangeError();
            await (0, accessibility_1.swipe)(555, 2200, 555, 490, 800);
            await (0, lang_1.delay)(700);
            if (input.buyOrderPassengerInfos.length > 5) {
                await (0, accessibility_1.swipe)(555, 1950, 555, 1125, 800);
                await (0, lang_1.delay)(700);
            }
            const totalChangeFeeBtn = await selector.findByTextContains('变更费用', 100, 1000);
            if (totalChangeFeeBtn) {
                totalChangeFeeBtn.click();
                await (0, lang_1.delay)(500);
            }
            else {
                throw new Error(`错误：变更费用详情获取失败`);
            }
            const totalChangeFeeText = (_b = totalChangeFeeBtn === null || totalChangeFeeBtn === void 0 ? void 0 : totalChangeFeeBtn.parent) === null || _b === void 0 ? void 0 : _b.children[((_c = totalChangeFeeBtn === null || totalChangeFeeBtn === void 0 ? void 0 : totalChangeFeeBtn.parent) === null || _c === void 0 ? void 0 : _c.children.length) - 1].text.match(/\d+(\.\d+)?/);
            let totalChangeFee = 0;
            if (totalChangeFeeText) {
                totalChangeFee = Number(totalChangeFeeText[0]);
            }
            let prices = [];
            let adultCount = 0;
            let adultCabinChangeFee = 0;
            let adultReissueFee = 0;
            let childCount = 0;
            let childCabinChangeFee = 0;
            let childReissueFee = 0;
            let infantCount = 0;
            let infantCabinChangeFee = 0;
            let infantReissueFee = 0;
            if (totalChangeFee <= 0) {
                input.buyOrderPassengerInfos.forEach(passEle => {
                    prices.push({
                        passengerType: passEle.type,
                        cabinChangeFee: 0,
                        reissueFee: 0
                    });
                });
            }
            else {
                const adultText = await selector.findByTextContains('成人 × ');
                if (adultText) {
                    adultCount = parseInt(adultText === null || adultText === void 0 ? void 0 : adultText.text.split('×')[1].trim());
                }
                const cabinPriceeDetail = await selector.findAllByTextContains('票价差额');
                const reissueFeeDetail = await selector.findAllByTextContains('变更手续费');
                if (cabinPriceeDetail[0]) {
                    const adultCabinChangeFeeText = cabinPriceeDetail[0].text.match(/\d+\.\d+/);
                    if (adultCabinChangeFeeText) {
                        adultCabinChangeFee = Number(adultCabinChangeFeeText[0]);
                    }
                }
                if (reissueFeeDetail[1]) {
                    const adultReissueFeeText = reissueFeeDetail[1].text.match(/\d+\.\d+/);
                    if (adultReissueFeeText) {
                        adultReissueFee = Number(adultReissueFeeText[0]);
                    }
                }
                for (let index = 0; index < adultCount; index++) {
                    prices.push({
                        passengerType: 0,
                        cabinChangeFee: adultCabinChangeFee,
                        reissueFee: adultReissueFee
                    });
                }
                const childText = await selector.findByTextContains('儿童 × ');
                if (childText) {
                    childCount = parseInt(childText === null || childText === void 0 ? void 0 : childText.text.split('×')[1].trim());
                }
                if (cabinPriceeDetail[1]) {
                    const childCabinChangeFeeText = cabinPriceeDetail[1].text.match(/\d+\.\d+/);
                    if (childCabinChangeFeeText) {
                        childCabinChangeFee = Number(childCabinChangeFeeText[0]);
                    }
                }
                if (reissueFeeDetail[2]) {
                    const childReissueFeeText = reissueFeeDetail[2].text.match(/\d+\.\d+/);
                    if (childReissueFeeText) {
                        childReissueFee = Number(childReissueFeeText[0]);
                    }
                }
                for (let index = 0; index < childCount; index++) {
                    prices.push({
                        passengerType: 1,
                        cabinChangeFee: childCabinChangeFee,
                        reissueFee: childReissueFee
                    });
                }
                const infantText = await selector.findByTextContains('婴儿 × ');
                if (infantText) {
                    infantCount = parseInt(infantText === null || infantText === void 0 ? void 0 : infantText.text.split('× ')[1].trim());
                }
                if (cabinPriceeDetail[2]) {
                    const infantCabinChangeFeeText = cabinPriceeDetail[2].text.match(/\d+\.\d+/);
                    if (infantCabinChangeFeeText) {
                        infantCabinChangeFee = Number(infantCabinChangeFeeText[0]);
                    }
                }
                if (reissueFeeDetail[3]) {
                    const adultReissueFeeText = reissueFeeDetail[3].text.match(/\d+\.\d+/);
                    if (adultReissueFeeText) {
                        adultReissueFee = Number(adultReissueFeeText[0]);
                    }
                }
                for (let index = 0; index < infantCount; index++) {
                    prices.push({
                        passengerType: 1,
                        cabinChangeFee: infantCabinChangeFee,
                        reissueFee: infantReissueFee
                    });
                }
            }
            await (0, accessibility_1.swipe)(500, 2150, 500, 300, 800);
            await (0, lang_1.delay)(700);
            const contactInfo = contacts[Math.floor(Math.random() * contacts.length)];
            await this.getAndInputText("contact", contactInfo.concatName);
            await this.getAndInputText("contactPhone", contactInfo.concatPhone);
            const radio = await selector.findById('radio1', 100, 1000);
            if (radio) {
                await this.ensureChecked("radio1");
                await (0, accessibility_1.swipe)(500, 2150, 500, 300, 800);
                await (0, lang_1.delay)(700);
            }
            await this.ensureChecked("reading");
            const submitChange = await selector.findByTextContains("提交变更");
            if (submitChange) {
                this.log(`提交变更 ${submitChange.click()}`);
            }
            await this.waitForLoading();
            await this.waitForChangeHandle();
            await (0, lang_1.delay)(18000);
            let tip = await selector.findByTextContains('网络异常', 100, 1000);
            if (!tip) {
                tip = await selector.findByTextContains('温馨提示', 100, 2000);
                if (tip) {
                    let tipParent = tip.parent;
                    while (!tipParent) {
                        tipParent = tip.parent;
                    }
                    let tipPChildren = tipParent.children;
                    while (tipPChildren.length < 1) {
                        tipPChildren = tipParent.children;
                    }
                    (_d = (await selector.findByTextContains("确", 100, 1000))) === null || _d === void 0 ? void 0 : _d.click();
                    throw new Error('错误：' + ((_e = tip.parent) === null || _e === void 0 ? void 0 : _e.children.filter(x => x.className === "android.view.View")[0].children[0].text));
                }
            }
            else {
                (_f = (await selector.findByTextContains("确", 100, 1000))) === null || _f === void 0 ? void 0 : _f.click();
            }
            let orderNoText = await selector.findByTextContains("订单编号");
            if (!orderNoText) {
                orderNoText = await selector.findByTextContains("订单编号");
                if (!orderNoText) {
                    throw new Error("下单可能成功，但未获取到改签单号");
                }
            }
            const changeOrderNo = orderNoText.text.substring(5);
            this.log(JSON.stringify({ orderNo: changeOrderNo, samllPnr: '', bigPnr: '', paymentAmount: totalChangeFee, currency: 'CNY', prices: prices }));
            return {
                orderNo: changeOrderNo,
                samllPnr: '',
                bigPnr: '',
                paymentAmount: totalChangeFee,
                currency: 'CNY',
                prices: prices
            };
        }
        catch (error) {
            await this.checkLoginStatus();
            console.error(error);
            const msg = error === null || error === void 0 ? void 0 : error.message;
            (_g = this._handler) === null || _g === void 0 ? void 0 : _g.log(msg);
            this._failedCount++;
            if ((msg === null || msg === void 0 ? void 0 : msg.includes("网络好像不给力")) || (msg === null || msg === void 0 ? void 0 : msg.includes("网络异常"))) {
                this._networkErrorCount++;
            }
            if (this._networkErrorCount > 1) {
                this.stopApp();
                this._networkErrorCount = 0;
            }
            return {
                orderNo: msg,
                samllPnr: '',
                bigPnr: '',
                paymentAmount: 0,
                currency: 'CNY',
                prices: []
            };
        }
        finally {
            await this.changeProxy(":0");
            if (this._failedCount > 2) {
                try {
                    await this.restartApp();
                    this._failedCount = 0;
                }
                catch (error) {
                    const msg = error === null || error === void 0 ? void 0 : error.message;
                    console.log(msg);
                    (_h = this._handler) === null || _h === void 0 ? void 0 : _h.log(msg);
                }
            }
            await this.backToHome();
        }
    }
}
exports.CZApp = CZApp;


/***/ }),

/***/ 6876:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CZPayMethodType = void 0;
var CZPayMethodType;
(function (CZPayMethodType) {
    CZPayMethodType[CZPayMethodType["Wallet"] = 0] = "Wallet";
    CZPayMethodType[CZPayMethodType["CreditCard"] = 1] = "CreditCard";
})(CZPayMethodType = exports.CZPayMethodType || (exports.CZPayMethodType = {}));


/***/ }),

/***/ 5737:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.environment = void 0;
exports.environment = {
    production: false,
    packageName: "com.yuxiang.autojs.cz.app.v9",
    appName: "CZ",
    channel: "v5",
    adb: false,
    version: "5.7.1",
    loginAccount: "",
};


/***/ }),

/***/ 7787:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

"ui";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
const ui = __importStar(__webpack_require__(9272));
const rhino = __importStar(__webpack_require__(8216));
const app = __importStar(__webpack_require__(6863));
const settings = __importStar(__webpack_require__(1241));
const signalr_1 = __webpack_require__(258);
const shell_1 = __webpack_require__(7319);
const device_1 = __webpack_require__(4138);
const environment_1 = __webpack_require__(5737);
const app_base_v9_1 = __webpack_require__(5757);
const activity_1 = __webpack_require__(3221);
const cz_app_1 = __webpack_require__(863);
const engines_1 = __webpack_require__(8207);
async function grant() {
    console.log(await (0, shell_1.exec)(`pm grant ${environment_1.environment.packageName} android.permission.WRITE_SECURE_SETTINGS`, { adb: true }));
    console.log("授予权限成功");
}
async function init() {
    process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";
    rhino.install();
    settings.stableMode.value = false; // 稳定模式
    settings.foregroundService.value = true; // 前台服务
    const id = $autojs.keepRunning();
    (0, app_base_v9_1.onVolumeDown)(() => {
        ;
        $autojs.cancelKeepRunning(id);
        process.exitCode = -9000;
    });
    const result = await (0, shell_1.checkAccess)("adb");
    environment_1.environment.adb = result;
    console.log(`adb权限 ${result}`);
    return id;
}
async function tryGetIp(handler) {
    if (environment_1.environment.adb) {
        try {
            const result = await (0, app_base_v9_1.getIpv6)();
            if (result.success) {
                console.log(`获取Ipv6 ${result.ip}`);
                handler === null || handler === void 0 ? void 0 : handler.log(`获取Ipv6 ${result.ip}`);
                return result.ip;
            }
            else {
                console.log(`获取Ipv6失败 ${result.rawOutput}`);
                handler === null || handler === void 0 ? void 0 : handler.log(`获取Ipv6失败 ${result.rawOutput}`);
                return "";
            }
        }
        catch (error) {
            console.log(error);
            handler === null || handler === void 0 ? void 0 : handler.log(`获取Ipv6失败 ${JSON.stringify(error)}`);
            return "";
        }
    }
    else {
        console.log(`获取Ipv6失败 未开启adb`);
        handler === null || handler === void 0 ? void 0 : handler.log(`获取Ipv6失败 未开启adb`);
        return "";
    }
}
async function main() {
    const runningId = await init();
    const czapp = new cz_app_1.CZApp();
    await czapp.changeProxy(":0");
    const ip = await tryGetIp();
    const handler = new signalr_1.CZSignalRHandler(device_1.device.androidId, "CZ", ip, (input) => {
        tryGetIp(handler).then((ip) => {
            handler.setIp(ip);
        });
        return czapp.QueryFlights(input);
    }, (input) => {
        tryGetIp(handler).then((ip) => {
            handler.setIp(ip);
        });
        return czapp.QueryDirectDiscount(input);
    }, (input) => {
        tryGetIp(handler).then((ip) => {
            handler.setIp(ip);
        });
        return czapp.CreateOrder(input);
    }, (input) => {
        tryGetIp(handler).then((ip) => {
            handler.setIp(ip);
        });
        return czapp.Pay(input);
    }, (input) => {
        tryGetIp(handler).then((ip) => {
            handler.setIp(ip);
        });
        return czapp.QueryFlightPrices(input);
    }, (input) => {
        tryGetIp(handler).then((ip) => {
            handler.setIp(ip);
        });
        return czapp.CreateChangeOrder(input);
    });
    handler.onConnected(() => {
        console.log("服务器已连接");
        czapp.init(handler);
    });
    (0, app_base_v9_1.onMainActivityStarted)((mainActivity) => {
        mainActivity.confirm.on("click", () => {
            (0, app_base_v9_1.startListen)();
            const selected = mainActivity.spinner.getSelectedItem();
            const url = selected === "生产地址" ? "https://apphub.yxho.com/signalr-hubs/cz" : selected === "测试地址" ? "https://apphub.dev-remote.yxho.com/signalr-hubs/cz" : "http://192.168.50.115:5000/signalr-hubs/cz";
            console.log(`selected:${selected} ${url}`);
            handler.start(url);
        });
        mainActivity.grantPermission.on("click", () => {
            grant();
        });
        mainActivity.test.on("click", () => {
            test();
        });
        mainActivity.hotUpdate.on("click", () => {
            (0, engines_1.execScriptFile)("./dist/updater.node.js", {
                arguments: {
                    appName: "CZ",
                    channel: "scripts",
                    // host: '47.108.202.111:38615',
                    // version: ''
                },
            });
            console.log("开始更新,主线程退出");
            ;
            $autojs.cancelKeepRunning(runningId);
        });
        // exec("ls").then((result: ExecutionResult) => {
        //     console.log(result);
        // });
        mainActivity.confirm.setVisibility.invoke(mainActivity.confirm, [0], "ui");
    });
    ui.activityLifecycle.on("all_activities_destroyed", () => {
        process.exit();
    });
    console.log("初始化完成...");
    ui.setMainActivity(activity_1.CZMainActivity);
    console.log("页面加载中...");
}
async function installNpmPackage() {
    const result = await (0, shell_1.exec)("npm install --only=prod");
    if (result.code != 0) {
        console.error(result);
    }
    else {
        console.log(result);
    }
}
async function test() {
    try {
        // execScriptFile("./dist/updater.node.js");
        // console.log("开始更新,主线程退出");
        // const id = $autojs.keepRunning();
        // $autojs.TAOcelKeepRunning(id);
        // installNpmPackage
        console.log(`启动APP: ${app.launch(cz_app_1.appId)}`);
        const czapp = new cz_app_1.CZApp();
        // 创建出票单
        // const result = await czapp.CreateOrder(testCreateOrderArgs as CZCreateOrderArgsDto);
        // 创建改签单
        const result = await czapp.CreateChangeOrder({
            "orderId": "3a10e0d6-d86a-f6b0-3b95-7c2ae25ca0c0",
            "buyOrderId": "3a10e10a-3e43-7ee1-8522-9864b5f77d02",
            "accountInfo": {
                "userName": "318138704076",
                "password": "855321"
            },
            "buyOrderNo": "GO2404203324787",
            "flightInfos": [
                {
                    "flightIndex": 1,
                    "originAirport": "TAO",
                    "destinationAirport": "CGQ",
                    "fullFlightNo": "CZ6140",
                    "departureDateTime": "2024-04-28T14:00:00Z",
                    "arrivalDateTime": "2024-04-28T15:50:00Z"
                }
            ],
            "newFlightInfos": [
                {
                    "flightIndex": 1,
                    "originAirport": "TAO",
                    "destinationAirport": "CGQ",
                    "fullFlightNo": "CZ6140",
                    "departureDateTime": "2024-04-28T14:00:00Z",
                    "arrivalDateTime": "2024-04-28T15:50:00Z"
                }
            ],
            "buyOrderPassengerInfos": [
                {
                    "cabin": "T",
                    "changeFee": 0,
                    "cabinUpgradeFee": 0,
                    "name": {
                        "nameType": 0,
                        "primary": "孟祥艳"
                    },
                    "birthDate": "1970-10-30",
                    "identityInfo": {
                        "type": 0,
                        "cardNo": "513401197010300828"
                    },
                    "phone": "18962159537",
                    "type": 0,
                    "ticketNo": "784-2524873591"
                }
            ],
            "requestId": "0fd90d37-b1e9-4492-8140-0be4d6737ab0"
        });
        // const querys = [
        //     {
        //         "date": "2023-04-17",
        //         "originAirport": "TAO",
        //         "destinationAirport": "TAN",
        //         "fullFlightNo": "",
        //         "accountInfo": {
        //             "userName": "618316613775",
        //             "password": "465398"
        //         }
        //     },
        //     {
        //         "date": "2023-04-17",
        //         "originAirport": "TAO",
        //         "destinationAirport": "SHA",
        //         "fullFlightNo": "",
        //         "accountInfo": {
        //             "userName": "618316613775",
        //             "password": "465398"
        //         }
        //     },
        //     {
        //         "date": "2023-04-17",
        //         "originAirport": "TAO",
        //         "destinationAirport": "SHE",
        //         "fullFlightNo": "",
        //         "accountInfo": {
        //             "userName": "618316613775",
        //             "password": "465398"
        //         }
        //     },
        //     {
        //         "date": "2023-04-17",
        //         "originAirport": "TAO",
        //         "destinationAirport": "SHA",
        //         "fullFlightNo": "",
        //         "accountInfo": {
        //             "userName": "618316613775",
        //             "password": "465398"
        //         }
        //     }
        // ] as CZQueryFlightPricesDto[];
        // let result = [];
        // for (const q of querys) {
        //     const r = await czapp.QueryDirectDiscount(q);
        //     result.push(r);
        //     console.log(`返回结果：${r}`);
        // }
        // const result = await czapp.QueryFlightPrices({
        //   date: "2024-02-25T01:00:00Z",
        //   originAirport: "TAO",
        //   destinationAirport: "TFU",
        //   fullFlightNo: "CZ6941",
        //   accountInfo: {
        //     userName: "415920801544",
        //     password: "802925",
        //   }
        // } as CZQueryFlightPricesDto);
        // console.log(JSON.stringify(result));
    }
    catch (error) {
        console.log(error);
        console.error(error);
        const msg = error === null || error === void 0 ? void 0 : error.message;
        console.log(msg);
    }
}
main();


/***/ }),

/***/ 9700:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getNationCodeName = void 0;
function getNationCodeName(code) {
    switch (code) {
        case "HK":
            return "中国香港";
        case "TW":
            return "中国台湾";
        case "CN":
            return "中国";
        case "MO":
            return "中国澳门";
        case "CF":
            return "中非共和国";
        case "CL":
            return "智利";
        case "GI":
            return "直布罗陀";
        case "TD":
            return "乍得";
        case "ZM":
            return "赞比亚";
        case "VN":
            return "越南";
        case "JO":
            return "约旦";
        case "VG":
            return "维尔京群岛（英属）"; // 文档：英属维尔京群岛 
        case "GB":
            return "英国";
        case "ID":
            return "印度尼西亚";
        case "IN":
            return "印度";
        case "IT":
            return "意大利";
        case "IL":
            return "以色列";
        case "IR":
            return "伊朗";
        case "IQ":
            return "伊拉克";
        case "YE":
            return "也门共和国"; // 文档：也门共和国也称也门    
        case "AM":
            return "亚美尼亚";
        case "JM":
            return "牙买加";
        case "SY":
            return "叙利亚";
        case "HU":
            return "匈牙利";
        case "NZ":
            return "新西兰";
        case "NC":
            return "新喀里多尼亚群岛";
        case "SG":
            return "新加坡";
        case "GR":
            return "希腊";
        case "ES":
            return "西班牙";
        case "UZ":
            return "乌兹别克斯坦";
        case "UY":
            return "乌拉圭";
        case "UA":
            return "乌克兰";
        case "UG":
            return "乌干达";
        case "BN":
            return "文莱达鲁萨兰国";
        case "VE":
            return "委内瑞拉";
        case "GT":
            return "危地马拉";
        case "VU":
            return "瓦努阿图";
        case "WF":
            return "瓦利斯和富图纳群岛";
        case "TK":
            return "托克劳";
        case "TM":
            return "土库曼斯坦";
        case "TR":
            return "土耳其";
        case "TV":
            return "图瓦卢";
        case "TN":
            return "突尼斯";
        case "TT":
            return "特立尼达和多巴哥";
        case "TC":
            return "特克斯和凯科斯群岛";
        case "TO":
            return "汤加";
        case "TZ":
            return "坦桑尼亚";
        case "TH":
            return "泰国";
        case "TJ":
            return "塔吉克斯坦";
        case "SO":
            return "索马里";
        case "SB":
            return "所罗门群岛";
        case "SR":
            return "苏里南";
        case "SD":
            return "苏丹";
        case "SZ":
            return "斯威士兰";
        // case "SJ":
        //     return "斯瓦尔巴岛和扬马延岛(挪)";
        case "SI":
            return "斯洛文尼亚";
        case "SK":
            return "斯洛伐克共和国";
        case "LK":
            return "斯里兰卡";
        case "VC":
            return "圣文森特和格林纳丁斯";
        case "SM":
            return "圣马力诺";
        case "LC":
            return "圣卢西亚";
        case "KN":
            return "圣基茨和尼维斯";
        // case "SH":
        //     return "圣赫勒拿(英)";
        case "ST":
            return "圣多美和普林西比";
        case "CX":
            return "圣诞岛(澳)";
        case "SA":
            return "沙特阿拉伯";
        case "SC":
            return "塞舌尔";
        case "CY":
            return "塞浦路斯";
        case "SN":
            return "塞内加尔";
        case "SL":
            return "塞拉利昂";
        case "CS":
            return "塞尔维亚";
        case "WS":
            return "萨摩亚群岛"; // 文档：萨摩亚
        case "SV":
            return "萨尔瓦多";
        case "CH":
            return "瑞士";
        case "SE":
            return "瑞典";
        case "JP":
            return "日本";
        case "PM":
            return "圣皮埃尔和密克隆";
        case "PT":
            return "葡萄牙";
        case "PW":
            return "帕劳";
        case "NF":
            return "诺福克岛";
        case "NO":
            return "挪威";
        case "NU":
            return "纽埃";
        case "NG":
            return "尼日利亚";
        case "NE":
            return "尼日尔";
        case "NP":
            return "尼泊尔";
        case "NI":
            return "尼加拉瓜";
        case "NR":
            return "瑙鲁";
        case "ZA":
            return "南非";
        case "NA":
            return "纳米比亚";
        case "MX":
            return "墨西哥";
        case "MZ":
            return "莫桑比克";
        case "MC":
            return "摩纳哥";
        case "MA":
            return "摩洛哥";
        case "MD":
            return "摩尔多瓦";
        case "MM":
            return "缅甸";
        case "FM":
            return "密克罗尼西亚联邦";
        case "PE":
            return "秘鲁";
        case "BD":
            return "孟加拉国";
        case "MS":
            return "蒙特赛拉特岛"; // 文档：蒙特塞拉特，南航：蒙特赛拉特岛
        case "MN":
            return "蒙古";
        case "VI":
            return "维尔京群岛（美属）"; // 文档：美属维尔京群岛
        case "AS":
            return "美属萨摩亚";
        case "UM":
            return "美国本土外小岛屿(美)";
        case "US":
            return "美国";
        case "MR":
            return "毛利塔尼亚"; // 文档：毛里塔尼亚，南航：毛利塔尼亚
        case "MU":
            return "毛里求斯"; // 毛里求斯又叫毛里求斯共和国
        case "YT":
            return "马约特岛"; // 文档：马约特，南航：马约特岛
        case "MQ":
            return "马提尼克";
        case "MH":
            return "马绍尔群岛";
        case "MK":
            return "马其顿";
        case "ML":
            return "马里";
        case "MY":
            return "马来西亚";
        case "MW":
            return "马拉维";
        case "MT":
            return "马耳他";
        case "MV":
            return "马尔代夫";
        case "MG":
            return "马达加斯加";
        case "RO":
            return "罗马尼亚";
        case "RW":
            return "卢旺达";
        case "LU":
            return "卢森堡";
        case "RE":
            return "留尼旺岛"; // 文档：留尼汪
        case "LI":
            return "列支敦士登";
        case "LY":
            return "利比亚";
        case "LR":
            return "利比里亚";
        case "LT":
            return "立陶宛";
        case "LB":
            return "黎巴嫩";
        case "LA":
            return "老挝";
        case "LS":
            return "莱索托";
        case "LV":
            return "拉脱维亚";
        case "CK":
            return "库克群岛";
        case "KE":
            return "肯尼亚";
        case "HR":
            return "克罗地亚";
        case "KW":
            return "科威特";
        case "CI":
            return "科特迪瓦";
        case "KM":
            return "科摩罗";
        case "CC":
            return "科科斯群岛(澳)";
        case "KY":
            return "开曼群岛(英)";
        case "QA":
            return "卡塔尔";
        case "CM":
            return "喀麦隆";
        case "ZW":
            return "津巴布韦";
        case "CZ":
            return "捷克共和国";
        case "KH":
            return "柬埔寨";
        case "GA":
            return "加蓬";
        case "GH":
            return "加纳";
        case "CA":
            return "加拿大";
        case "GW":
            return "几内亚比绍";
        case "GN":
            return "几内亚";
        case "KG":
            return "吉尔吉斯斯坦"; // 吉尔吉斯斯坦也叫吉尔吉斯共和国
        case "DJ":
            return "吉布提";
        case "KI":
            return "基里巴斯";
        case "HN":
            return "洪都拉斯";
        case "HM":
            return "赫德岛和麦克唐纳岛(澳)";
        case "AN":
            return "荷属安的列斯(荷)";
        case "NL":
            return "荷兰";
        case "KR":
            return "韩国";
        case "GB":
            return "海峡群岛(英)";
        case "HT":
            return "海地";
        case "KZ":
            return "哈萨克斯坦";
        case "GY":
            return "圭亚那";
        case "GU":
            return "关岛（马里亚纳群岛）"; // 文档：关岛
        case "GP":
            return "瓜德罗普岛(法)";
        case "CU":
            return "古巴共和国";
        case "GE":
            return "格鲁吉亚";
        case "GL":
            return "格陵兰(丹)";
        case "GD":
            return "格林纳达";
        case "CR":
            return "哥斯达里加"; // 文档：哥斯达黎加
        case "CO":
            return "哥伦比亚";
        case "CD":
            return "刚果(金沙萨)";
        case "CG":
            return "刚果（布）";
        case "GM":
            return "冈比亚";
        case "FK":
            return "福克兰群岛";
        case "CV":
            return "佛得角";
        case "FI":
            return "芬兰";
        case "FJ":
            return "斐济";
        case "PH":
            return "菲律宾";
        case "VA":
            return "梵蒂冈";
        case "GF":
            return "法属圭亚那";
        case "PF":
            return "法属波利尼西亚";
        case "FO":
            return "法罗群岛";
        case "FR":
            return "法国";
        case "ER":
            return "厄立特里亚";
        case "EC":
            return "厄瓜多尔";
        case "RU":
            return "俄罗斯联邦";
        case "DM":
            return "多米尼克";
        case "DO":
            return "多米尼加共和国";
        case "TG":
            return "多哥";
        case "TL":
            return "东帝汶";
        case "DE":
            return "德国";
        case "DK":
            return "丹麦";
        case "GQ":
            return "赤道几内亚";
        case "KP":
            return "朝鲜民主主义共和国"; // 朝鲜
        case "BV":
            return "布韦岛";
        case "BI":
            return "布隆迪";
        case "BF":
            return "布基纳法索";
        case "BT":
            return "不丹";
        case "BW":
            return "博茨瓦纳";
        case "BZ":
            return "伯里兹";
        case "BO":
            return "玻利维亚";
        case "BA":
            return "波斯尼亚和黑塞哥维那";
        case "PL":
            return "波兰";
        case "PR":
            return "波多黎各";
        case "IS":
            return "冰岛";
        case "BE":
            return "比利时";
        case "BJ":
            return "贝宁";
        case "MP":
            return "北马里亚纳群岛"; // 文档：北马里亚纳
        case "BG":
            return "保加利亚";
        case "BM":
            return "百慕大群岛";
        case "BY":
            return "白俄罗斯";
        case "BR":
            return "巴西";
        case "PA":
            return "巴拿马";
        case "BH":
            return "巴林";
        case "PS":
            return "巴勒斯坦被占地区";
        case "PY":
            return "巴拉圭";
        case "PK":
            return "巴基斯坦";
        case "BS":
            return "巴哈马";
        case "PG":
            return "巴布亚新几内亚";
        case "BB":
            return "巴巴多斯";
        case "AU":
            return "澳大利亚";
        case "AT":
            return "奥地利";
        case "AG":
            return "安提瓜和巴布达";
        case "AI":
            return "安圭拉";
        case "AO":
            return "安哥拉";
        case "AD":
            return "安道尔";
        case "EE":
            return "爱沙尼亚";
        case "IE":
            return "爱尔兰";
        case "ET":
            return "埃塞俄比亚";
        case "EG":
            return "埃及";
        case "AZ":
            return "阿塞拜疆共和国";
        case "OM":
            return "阿曼";
        case "AW":
            return "阿鲁巴(荷)";
        case "AE":
            return "阿拉伯联合酋长国";
        case "AR":
            return "阿根廷";
        case "AF":
            return "阿富汗";
        case "DZ":
            return "阿尔及利亚";
        case "AL":
            return "阿尔巴尼亚";
        case "ZR":
            return "扎伊尔";
    }
}
exports.getNationCodeName = getNationCodeName;


/***/ }),

/***/ 258:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CZSignalRHandler = void 0;
const app_base_v9_1 = __webpack_require__(5757);
const environment_1 = __webpack_require__(5737);
class CZSignalRHandler extends app_base_v9_1.SignalRHandler {
    /**
     *
     */
    constructor(id, airline, ip, handler1, handler2, handler3, handler4, handler5, handler6) {
        super(id, airline, ip);
        this.onQueryFlightsEventHandler = handler1;
        this.onQueryDirectDiscountEventHandler = handler2;
        this.onCreateOrderEventHandler = handler3;
        this.onPayEventHandler = handler4;
        this.onQueryFlightPricesEventHandler = handler5;
        this.onCreateChangeOrderEventHandler = handler6;
        this.tags = [
            "CreateOrder",
            "Pay",
            "QueryDirectDiscount",
            "QueryFlightPrices",
        ];
    }
    setIp(ip) {
        this.ip = ip;
    }
    start(url) {
        super.start(url);
        // Deprecated 已废弃 使用QueryDirectDiscount即可
        // this.hubConnection.on("QueryFlights", (input: CZQueryFlightsDto) => {
        //     this.update(
        //         AppDeviceStatusType.Processing,
        //         environment.loginAccount
        //     );
        //     this.onQueryFlightsEventHandler(input).then((result) => {
        //         this.update(
        //             AppDeviceStatusType.Ready,
        //             environment.loginAccount
        //         );
        //         this.hubConnection
        //             .send("OnQueryFlights", result)
        //             .then(() =>
        //                 console.log(`已返回请求结果 ${JSON.stringify(result)}`)
        //             );
        //     });
        // });
        this.hubConnection.on("QueryDirectDiscount", (input) => {
            this.update(app_base_v9_1.AppDeviceStatusType.Processing, environment_1.environment.loginAccount, this.ip);
            this.onQueryDirectDiscountEventHandler(input).then((result) => {
                this.update(app_base_v9_1.AppDeviceStatusType.Ready, environment_1.environment.loginAccount, this.ip);
                this.hubConnection
                    .send("OnQueryDirectDiscount", result)
                    .then(() => console.log(`已返回请求结果 ${JSON.stringify(result)}`));
            });
        });
        this.hubConnection.on("CreateOrder", (input) => {
            this.update(app_base_v9_1.AppDeviceStatusType.Processing, environment_1.environment.loginAccount, this.ip);
            this.onCreateOrderEventHandler(input).then((result) => {
                this.update(app_base_v9_1.AppDeviceStatusType.Ready, environment_1.environment.loginAccount, this.ip);
                this.hubConnection
                    .send("OnCreateOrder", result)
                    .then(() => console.log(`已返回创单结果 ${JSON.stringify(result)}`));
            });
        });
        this.hubConnection.on("CreateChangeOrder", (input) => {
            this.update(app_base_v9_1.AppDeviceStatusType.Processing, environment_1.environment.loginAccount, this.ip);
            this.onCreateChangeOrderEventHandler(input).then((result) => {
                this.update(app_base_v9_1.AppDeviceStatusType.Ready, environment_1.environment.loginAccount, this.ip);
                this.hubConnection
                    .send("OnCreateChangeOrder", result)
                    .then(() => console.log(`已返回创单结果 ${JSON.stringify(result)}`));
            });
        });
        this.hubConnection.on("Pay", (input) => {
            this.update(app_base_v9_1.AppDeviceStatusType.Processing, environment_1.environment.loginAccount, this.ip);
            this.onPayEventHandler(input).then((result) => {
                this.update(app_base_v9_1.AppDeviceStatusType.Ready, environment_1.environment.loginAccount, this.ip);
                this.hubConnection
                    .send("OnPay", result)
                    .then(() => console.log(`已返回支付结果 ${JSON.stringify(result)}`));
            });
        });
        this.hubConnection.on("QueryFlightPrices", (input) => {
            this.update(app_base_v9_1.AppDeviceStatusType.Processing, environment_1.environment.loginAccount, this.ip);
            this.onQueryFlightPricesEventHandler(input).then((result) => {
                this.update(app_base_v9_1.AppDeviceStatusType.Ready, environment_1.environment.loginAccount, this.ip);
                this.hubConnection
                    .send("OnQueryFlightPrices", result)
                    .then(() => console.log(`已返回查询结果 ${JSON.stringify(result)}`));
            });
        });
    }
    getNewProxy() {
        return this.hubConnection.invoke("GetProxy");
    }
}
exports.CZSignalRHandler = CZSignalRHandler;


/***/ }),

/***/ 954:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UiObjectHelper = void 0;
class UiObjectHelper {
    constructor(_obj) {
        this._obj = _obj;
    }
    findChild(className, index) {
        const items = this._obj.children.filter((x) => x.className == className);
        if (items.length <= index) {
            return null;
        }
        return new UiObjectHelper(items[index]);
    }
    get item() {
        return this._obj;
    }
    click() {
        return this._obj.click();
    }
}
exports.UiObjectHelper = UiObjectHelper;


/***/ }),

/***/ 8794:
/***/ ((module) => {

"use strict";
module.exports = require("accessibility");

/***/ }),

/***/ 6863:
/***/ ((module) => {

"use strict";
module.exports = require("app");

/***/ }),

/***/ 4138:
/***/ ((module) => {

"use strict";
module.exports = require("device");

/***/ }),

/***/ 8207:
/***/ ((module) => {

"use strict";
module.exports = require("engines");

/***/ }),

/***/ 744:
/***/ ((module) => {

"use strict";
module.exports = require("lang");

/***/ }),

/***/ 8216:
/***/ ((module) => {

"use strict";
module.exports = require("rhino");

/***/ }),

/***/ 1241:
/***/ ((module) => {

"use strict";
module.exports = require("settings");

/***/ }),

/***/ 7319:
/***/ ((module) => {

"use strict";
module.exports = require("shell");

/***/ }),

/***/ 6296:
/***/ ((module) => {

"use strict";
module.exports = require("toast");

/***/ }),

/***/ 9272:
/***/ ((module) => {

"use strict";
module.exports = require("ui");

/***/ }),

/***/ 9491:
/***/ ((module) => {

"use strict";
module.exports = require("assert");

/***/ }),

/***/ 4300:
/***/ ((module) => {

"use strict";
module.exports = require("buffer");

/***/ }),

/***/ 9523:
/***/ ((module) => {

"use strict";
module.exports = require("dns");

/***/ }),

/***/ 2361:
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ 7147:
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ 3685:
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ 5158:
/***/ ((module) => {

"use strict";
module.exports = require("http2");

/***/ }),

/***/ 5687:
/***/ ((module) => {

"use strict";
module.exports = require("https");

/***/ }),

/***/ 1808:
/***/ ((module) => {

"use strict";
module.exports = require("net");

/***/ }),

/***/ 2037:
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ }),

/***/ 2781:
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ 4404:
/***/ ((module) => {

"use strict";
module.exports = require("tls");

/***/ }),

/***/ 7310:
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ }),

/***/ 3837:
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ }),

/***/ 9796:
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ }),

/***/ 1580:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "AbortError": () => (/* reexport */ AbortError),
  "CacheError": () => (/* reexport */ CacheError),
  "CancelError": () => (/* reexport */ types_CancelError),
  "HTTPError": () => (/* reexport */ HTTPError),
  "MaxRedirectsError": () => (/* reexport */ MaxRedirectsError),
  "Options": () => (/* reexport */ Options),
  "ParseError": () => (/* reexport */ ParseError),
  "ReadError": () => (/* reexport */ ReadError),
  "RequestError": () => (/* reexport */ RequestError),
  "RetryError": () => (/* reexport */ RetryError),
  "TimeoutError": () => (/* reexport */ TimeoutError),
  "UploadError": () => (/* reexport */ UploadError),
  "calculateRetryDelay": () => (/* reexport */ calculate_retry_delay),
  "create": () => (/* reexport */ source_create),
  "default": () => (/* binding */ got_dist_source),
  "got": () => (/* binding */ got),
  "isResponseOk": () => (/* reexport */ isResponseOk),
  "parseBody": () => (/* reexport */ parseBody),
  "parseLinkHeader": () => (/* reexport */ parseLinkHeader)
});

;// CONCATENATED MODULE: ./node_modules/app-base-v9/node_modules/@sindresorhus/is/dist/index.js
const typedArrayTypeNames = [
    'Int8Array',
    'Uint8Array',
    'Uint8ClampedArray',
    'Int16Array',
    'Uint16Array',
    'Int32Array',
    'Uint32Array',
    'Float32Array',
    'Float64Array',
    'BigInt64Array',
    'BigUint64Array',
];
function isTypedArrayName(name) {
    return typedArrayTypeNames.includes(name);
}
const objectTypeNames = [
    'Function',
    'Generator',
    'AsyncGenerator',
    'GeneratorFunction',
    'AsyncGeneratorFunction',
    'AsyncFunction',
    'Observable',
    'Array',
    'Buffer',
    'Blob',
    'Object',
    'RegExp',
    'Date',
    'Error',
    'Map',
    'Set',
    'WeakMap',
    'WeakSet',
    'WeakRef',
    'ArrayBuffer',
    'SharedArrayBuffer',
    'DataView',
    'Promise',
    'URL',
    'FormData',
    'URLSearchParams',
    'HTMLElement',
    'NaN',
    ...typedArrayTypeNames,
];
function isObjectTypeName(name) {
    return objectTypeNames.includes(name);
}
const primitiveTypeNames = [
    'null',
    'undefined',
    'string',
    'number',
    'bigint',
    'boolean',
    'symbol',
];
function isPrimitiveTypeName(name) {
    return primitiveTypeNames.includes(name);
}
// eslint-disable-next-line @typescript-eslint/ban-types
function isOfType(type) {
    return (value) => typeof value === type;
}
const { toString: dist_toString } = Object.prototype;
const getObjectType = (value) => {
    const objectTypeName = dist_toString.call(value).slice(8, -1);
    if (/HTML\w+Element/.test(objectTypeName) && is.domElement(value)) {
        return 'HTMLElement';
    }
    if (isObjectTypeName(objectTypeName)) {
        return objectTypeName;
    }
    return undefined;
};
const isObjectOfType = (type) => (value) => getObjectType(value) === type;
function is(value) {
    if (value === null) {
        return 'null';
    }
    switch (typeof value) {
        case 'undefined':
            return 'undefined';
        case 'string':
            return 'string';
        case 'number':
            return Number.isNaN(value) ? 'NaN' : 'number';
        case 'boolean':
            return 'boolean';
        case 'function':
            return 'Function';
        case 'bigint':
            return 'bigint';
        case 'symbol':
            return 'symbol';
        default:
    }
    if (is.observable(value)) {
        return 'Observable';
    }
    if (is.array(value)) {
        return 'Array';
    }
    if (is.buffer(value)) {
        return 'Buffer';
    }
    const tagType = getObjectType(value);
    if (tagType) {
        return tagType;
    }
    if (value instanceof String || value instanceof Boolean || value instanceof Number) {
        throw new TypeError('Please don\'t use object wrappers for primitive types');
    }
    return 'Object';
}
is.undefined = isOfType('undefined');
is.string = isOfType('string');
const isNumberType = isOfType('number');
is.number = (value) => isNumberType(value) && !is.nan(value);
is.bigint = isOfType('bigint');
// eslint-disable-next-line @typescript-eslint/ban-types
is.function_ = isOfType('function');
// eslint-disable-next-line @typescript-eslint/ban-types
is.null_ = (value) => value === null;
is.class_ = (value) => is.function_(value) && value.toString().startsWith('class ');
is.boolean = (value) => value === true || value === false;
is.symbol = isOfType('symbol');
is.numericString = (value) => is.string(value) && !is.emptyStringOrWhitespace(value) && !Number.isNaN(Number(value));
is.array = (value, assertion) => {
    if (!Array.isArray(value)) {
        return false;
    }
    if (!is.function_(assertion)) {
        return true;
    }
    return value.every(element => assertion(element));
};
// eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
is.buffer = (value) => value?.constructor?.isBuffer?.(value) ?? false;
is.blob = (value) => isObjectOfType('Blob')(value);
is.nullOrUndefined = (value) => is.null_(value) || is.undefined(value); // eslint-disable-line @typescript-eslint/ban-types
is.object = (value) => !is.null_(value) && (typeof value === 'object' || is.function_(value)); // eslint-disable-line @typescript-eslint/ban-types
is.iterable = (value) => is.function_(value?.[Symbol.iterator]);
is.asyncIterable = (value) => is.function_(value?.[Symbol.asyncIterator]);
is.generator = (value) => is.iterable(value) && is.function_(value?.next) && is.function_(value?.throw);
is.asyncGenerator = (value) => is.asyncIterable(value) && is.function_(value.next) && is.function_(value.throw);
is.nativePromise = (value) => isObjectOfType('Promise')(value);
const hasPromiseApi = (value) => is.function_(value?.then)
    && is.function_(value?.catch);
is.promise = (value) => is.nativePromise(value) || hasPromiseApi(value);
is.generatorFunction = isObjectOfType('GeneratorFunction');
is.asyncGeneratorFunction = (value) => getObjectType(value) === 'AsyncGeneratorFunction';
is.asyncFunction = (value) => getObjectType(value) === 'AsyncFunction';
// eslint-disable-next-line no-prototype-builtins, @typescript-eslint/ban-types
is.boundFunction = (value) => is.function_(value) && !value.hasOwnProperty('prototype');
is.regExp = isObjectOfType('RegExp');
is.date = isObjectOfType('Date');
is.error = isObjectOfType('Error');
is.map = (value) => isObjectOfType('Map')(value);
is.set = (value) => isObjectOfType('Set')(value);
is.weakMap = (value) => isObjectOfType('WeakMap')(value); // eslint-disable-line @typescript-eslint/ban-types
is.weakSet = (value) => isObjectOfType('WeakSet')(value); // eslint-disable-line @typescript-eslint/ban-types
is.weakRef = (value) => isObjectOfType('WeakRef')(value); // eslint-disable-line @typescript-eslint/ban-types
is.int8Array = isObjectOfType('Int8Array');
is.uint8Array = isObjectOfType('Uint8Array');
is.uint8ClampedArray = isObjectOfType('Uint8ClampedArray');
is.int16Array = isObjectOfType('Int16Array');
is.uint16Array = isObjectOfType('Uint16Array');
is.int32Array = isObjectOfType('Int32Array');
is.uint32Array = isObjectOfType('Uint32Array');
is.float32Array = isObjectOfType('Float32Array');
is.float64Array = isObjectOfType('Float64Array');
is.bigInt64Array = isObjectOfType('BigInt64Array');
is.bigUint64Array = isObjectOfType('BigUint64Array');
is.arrayBuffer = isObjectOfType('ArrayBuffer');
is.sharedArrayBuffer = isObjectOfType('SharedArrayBuffer');
is.dataView = isObjectOfType('DataView');
is.enumCase = (value, targetEnum) => Object.values(targetEnum).includes(value);
is.directInstanceOf = (instance, class_) => Object.getPrototypeOf(instance) === class_.prototype;
is.urlInstance = (value) => isObjectOfType('URL')(value);
is.urlString = (value) => {
    if (!is.string(value)) {
        return false;
    }
    try {
        new URL(value); // eslint-disable-line no-new
        return true;
    }
    catch {
        return false;
    }
};
// Example: `is.truthy = (value: unknown): value is (not false | not 0 | not '' | not undefined | not null) => Boolean(value);`
is.truthy = (value) => Boolean(value); // eslint-disable-line unicorn/prefer-native-coercion-functions
// Example: `is.falsy = (value: unknown): value is (not true | 0 | '' | undefined | null) => Boolean(value);`
is.falsy = (value) => !value;
is.nan = (value) => Number.isNaN(value);
is.primitive = (value) => is.null_(value) || isPrimitiveTypeName(typeof value);
is.integer = (value) => Number.isInteger(value);
is.safeInteger = (value) => Number.isSafeInteger(value);
is.plainObject = (value) => {
    // From: https://github.com/sindresorhus/is-plain-obj/blob/main/index.js
    if (typeof value !== 'object' || value === null) {
        return false;
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const prototype = Object.getPrototypeOf(value);
    return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(Symbol.toStringTag in value) && !(Symbol.iterator in value);
};
is.typedArray = (value) => isTypedArrayName(getObjectType(value));
const isValidLength = (value) => is.safeInteger(value) && value >= 0;
is.arrayLike = (value) => !is.nullOrUndefined(value) && !is.function_(value) && isValidLength(value.length);
is.inRange = (value, range) => {
    if (is.number(range)) {
        return value >= Math.min(0, range) && value <= Math.max(range, 0);
    }
    if (is.array(range) && range.length === 2) {
        return value >= Math.min(...range) && value <= Math.max(...range);
    }
    throw new TypeError(`Invalid range: ${JSON.stringify(range)}`);
};
// eslint-disable-next-line @typescript-eslint/naming-convention
const NODE_TYPE_ELEMENT = 1;
// eslint-disable-next-line @typescript-eslint/naming-convention
const DOM_PROPERTIES_TO_CHECK = [
    'innerHTML',
    'ownerDocument',
    'style',
    'attributes',
    'nodeValue',
];
is.domElement = (value) => is.object(value)
    && value.nodeType === NODE_TYPE_ELEMENT
    && is.string(value.nodeName)
    && !is.plainObject(value)
    && DOM_PROPERTIES_TO_CHECK.every(property => property in value);
is.observable = (value) => {
    if (!value) {
        return false;
    }
    // eslint-disable-next-line no-use-extend-native/no-use-extend-native, @typescript-eslint/no-unsafe-call
    if (value === value[Symbol.observable]?.()) {
        return true;
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    if (value === value['@@observable']?.()) {
        return true;
    }
    return false;
};
is.nodeStream = (value) => is.object(value) && is.function_(value.pipe) && !is.observable(value);
is.infinite = (value) => value === Number.POSITIVE_INFINITY || value === Number.NEGATIVE_INFINITY;
const isAbsoluteMod2 = (remainder) => (value) => is.integer(value) && Math.abs(value % 2) === remainder;
is.evenInteger = isAbsoluteMod2(0);
is.oddInteger = isAbsoluteMod2(1);
is.emptyArray = (value) => is.array(value) && value.length === 0;
is.nonEmptyArray = (value) => is.array(value) && value.length > 0;
is.emptyString = (value) => is.string(value) && value.length === 0;
const isWhiteSpaceString = (value) => is.string(value) && !/\S/.test(value);
is.emptyStringOrWhitespace = (value) => is.emptyString(value) || isWhiteSpaceString(value);
// TODO: Use `not ''` when the `not` operator is available.
is.nonEmptyString = (value) => is.string(value) && value.length > 0;
// TODO: Use `not ''` when the `not` operator is available.
is.nonEmptyStringAndNotWhitespace = (value) => is.string(value) && !is.emptyStringOrWhitespace(value);
// eslint-disable-next-line unicorn/no-array-callback-reference
is.emptyObject = (value) => is.object(value) && !is.map(value) && !is.set(value) && Object.keys(value).length === 0;
// TODO: Use `not` operator here to remove `Map` and `Set` from type guard:
// - https://github.com/Microsoft/TypeScript/pull/29317
// eslint-disable-next-line unicorn/no-array-callback-reference
is.nonEmptyObject = (value) => is.object(value) && !is.map(value) && !is.set(value) && Object.keys(value).length > 0;
is.emptySet = (value) => is.set(value) && value.size === 0;
is.nonEmptySet = (value) => is.set(value) && value.size > 0;
// eslint-disable-next-line unicorn/no-array-callback-reference
is.emptyMap = (value) => is.map(value) && value.size === 0;
// eslint-disable-next-line unicorn/no-array-callback-reference
is.nonEmptyMap = (value) => is.map(value) && value.size > 0;
// `PropertyKey` is any value that can be used as an object key (string, number, or symbol)
is.propertyKey = (value) => is.any([is.string, is.number, is.symbol], value);
is.formData = (value) => isObjectOfType('FormData')(value);
is.urlSearchParams = (value) => isObjectOfType('URLSearchParams')(value);
const predicateOnArray = (method, predicate, values) => {
    if (!is.function_(predicate)) {
        throw new TypeError(`Invalid predicate: ${JSON.stringify(predicate)}`);
    }
    if (values.length === 0) {
        throw new TypeError('Invalid number of values');
    }
    return method.call(values, predicate);
};
is.any = (predicate, ...values) => {
    const predicates = is.array(predicate) ? predicate : [predicate];
    return predicates.some(singlePredicate => predicateOnArray(Array.prototype.some, singlePredicate, values));
};
is.all = (predicate, ...values) => predicateOnArray(Array.prototype.every, predicate, values);
const assertType = (condition, description, value, options = {}) => {
    if (!condition) {
        const { multipleValues } = options;
        const valuesMessage = multipleValues
            ? `received values of types ${[
                ...new Set(value.map(singleValue => `\`${is(singleValue)}\``)),
            ].join(', ')}`
            : `received value of type \`${is(value)}\``;
        throw new TypeError(`Expected value which is \`${description}\`, ${valuesMessage}.`);
    }
};
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
const assert = {
    // Unknowns.
    undefined: (value) => assertType(is.undefined(value), 'undefined', value),
    string: (value) => assertType(is.string(value), 'string', value),
    number: (value) => assertType(is.number(value), 'number', value),
    bigint: (value) => assertType(is.bigint(value), 'bigint', value),
    // eslint-disable-next-line @typescript-eslint/ban-types
    function_: (value) => assertType(is.function_(value), 'Function', value),
    null_: (value) => assertType(is.null_(value), 'null', value),
    class_: (value) => assertType(is.class_(value), "Class" /* AssertionTypeDescription.class_ */, value),
    boolean: (value) => assertType(is.boolean(value), 'boolean', value),
    symbol: (value) => assertType(is.symbol(value), 'symbol', value),
    numericString: (value) => assertType(is.numericString(value), "string with a number" /* AssertionTypeDescription.numericString */, value),
    array: (value, assertion) => {
        const assert = assertType;
        assert(is.array(value), 'Array', value);
        if (assertion) {
            // eslint-disable-next-line unicorn/no-array-for-each, unicorn/no-array-callback-reference
            value.forEach(assertion);
        }
    },
    buffer: (value) => assertType(is.buffer(value), 'Buffer', value),
    blob: (value) => assertType(is.blob(value), 'Blob', value),
    nullOrUndefined: (value) => assertType(is.nullOrUndefined(value), "null or undefined" /* AssertionTypeDescription.nullOrUndefined */, value),
    object: (value) => assertType(is.object(value), 'Object', value),
    iterable: (value) => assertType(is.iterable(value), "Iterable" /* AssertionTypeDescription.iterable */, value),
    asyncIterable: (value) => assertType(is.asyncIterable(value), "AsyncIterable" /* AssertionTypeDescription.asyncIterable */, value),
    generator: (value) => assertType(is.generator(value), 'Generator', value),
    asyncGenerator: (value) => assertType(is.asyncGenerator(value), 'AsyncGenerator', value),
    nativePromise: (value) => assertType(is.nativePromise(value), "native Promise" /* AssertionTypeDescription.nativePromise */, value),
    promise: (value) => assertType(is.promise(value), 'Promise', value),
    generatorFunction: (value) => assertType(is.generatorFunction(value), 'GeneratorFunction', value),
    asyncGeneratorFunction: (value) => assertType(is.asyncGeneratorFunction(value), 'AsyncGeneratorFunction', value),
    // eslint-disable-next-line @typescript-eslint/ban-types
    asyncFunction: (value) => assertType(is.asyncFunction(value), 'AsyncFunction', value),
    // eslint-disable-next-line @typescript-eslint/ban-types
    boundFunction: (value) => assertType(is.boundFunction(value), 'Function', value),
    regExp: (value) => assertType(is.regExp(value), 'RegExp', value),
    date: (value) => assertType(is.date(value), 'Date', value),
    error: (value) => assertType(is.error(value), 'Error', value),
    map: (value) => assertType(is.map(value), 'Map', value),
    set: (value) => assertType(is.set(value), 'Set', value),
    weakMap: (value) => assertType(is.weakMap(value), 'WeakMap', value),
    weakSet: (value) => assertType(is.weakSet(value), 'WeakSet', value),
    weakRef: (value) => assertType(is.weakRef(value), 'WeakRef', value),
    int8Array: (value) => assertType(is.int8Array(value), 'Int8Array', value),
    uint8Array: (value) => assertType(is.uint8Array(value), 'Uint8Array', value),
    uint8ClampedArray: (value) => assertType(is.uint8ClampedArray(value), 'Uint8ClampedArray', value),
    int16Array: (value) => assertType(is.int16Array(value), 'Int16Array', value),
    uint16Array: (value) => assertType(is.uint16Array(value), 'Uint16Array', value),
    int32Array: (value) => assertType(is.int32Array(value), 'Int32Array', value),
    uint32Array: (value) => assertType(is.uint32Array(value), 'Uint32Array', value),
    float32Array: (value) => assertType(is.float32Array(value), 'Float32Array', value),
    float64Array: (value) => assertType(is.float64Array(value), 'Float64Array', value),
    bigInt64Array: (value) => assertType(is.bigInt64Array(value), 'BigInt64Array', value),
    bigUint64Array: (value) => assertType(is.bigUint64Array(value), 'BigUint64Array', value),
    arrayBuffer: (value) => assertType(is.arrayBuffer(value), 'ArrayBuffer', value),
    sharedArrayBuffer: (value) => assertType(is.sharedArrayBuffer(value), 'SharedArrayBuffer', value),
    dataView: (value) => assertType(is.dataView(value), 'DataView', value),
    enumCase: (value, targetEnum) => assertType(is.enumCase(value, targetEnum), 'EnumCase', value),
    urlInstance: (value) => assertType(is.urlInstance(value), 'URL', value),
    urlString: (value) => assertType(is.urlString(value), "string with a URL" /* AssertionTypeDescription.urlString */, value),
    truthy: (value) => assertType(is.truthy(value), "truthy" /* AssertionTypeDescription.truthy */, value),
    falsy: (value) => assertType(is.falsy(value), "falsy" /* AssertionTypeDescription.falsy */, value),
    nan: (value) => assertType(is.nan(value), "NaN" /* AssertionTypeDescription.nan */, value),
    primitive: (value) => assertType(is.primitive(value), "primitive" /* AssertionTypeDescription.primitive */, value),
    integer: (value) => assertType(is.integer(value), "integer" /* AssertionTypeDescription.integer */, value),
    safeInteger: (value) => assertType(is.safeInteger(value), "integer" /* AssertionTypeDescription.safeInteger */, value),
    plainObject: (value) => assertType(is.plainObject(value), "plain object" /* AssertionTypeDescription.plainObject */, value),
    typedArray: (value) => assertType(is.typedArray(value), "TypedArray" /* AssertionTypeDescription.typedArray */, value),
    arrayLike: (value) => assertType(is.arrayLike(value), "array-like" /* AssertionTypeDescription.arrayLike */, value),
    domElement: (value) => assertType(is.domElement(value), "HTMLElement" /* AssertionTypeDescription.domElement */, value),
    observable: (value) => assertType(is.observable(value), 'Observable', value),
    nodeStream: (value) => assertType(is.nodeStream(value), "Node.js Stream" /* AssertionTypeDescription.nodeStream */, value),
    infinite: (value) => assertType(is.infinite(value), "infinite number" /* AssertionTypeDescription.infinite */, value),
    emptyArray: (value) => assertType(is.emptyArray(value), "empty array" /* AssertionTypeDescription.emptyArray */, value),
    nonEmptyArray: (value) => assertType(is.nonEmptyArray(value), "non-empty array" /* AssertionTypeDescription.nonEmptyArray */, value),
    emptyString: (value) => assertType(is.emptyString(value), "empty string" /* AssertionTypeDescription.emptyString */, value),
    emptyStringOrWhitespace: (value) => assertType(is.emptyStringOrWhitespace(value), "empty string or whitespace" /* AssertionTypeDescription.emptyStringOrWhitespace */, value),
    nonEmptyString: (value) => assertType(is.nonEmptyString(value), "non-empty string" /* AssertionTypeDescription.nonEmptyString */, value),
    nonEmptyStringAndNotWhitespace: (value) => assertType(is.nonEmptyStringAndNotWhitespace(value), "non-empty string and not whitespace" /* AssertionTypeDescription.nonEmptyStringAndNotWhitespace */, value),
    emptyObject: (value) => assertType(is.emptyObject(value), "empty object" /* AssertionTypeDescription.emptyObject */, value),
    nonEmptyObject: (value) => assertType(is.nonEmptyObject(value), "non-empty object" /* AssertionTypeDescription.nonEmptyObject */, value),
    emptySet: (value) => assertType(is.emptySet(value), "empty set" /* AssertionTypeDescription.emptySet */, value),
    nonEmptySet: (value) => assertType(is.nonEmptySet(value), "non-empty set" /* AssertionTypeDescription.nonEmptySet */, value),
    emptyMap: (value) => assertType(is.emptyMap(value), "empty map" /* AssertionTypeDescription.emptyMap */, value),
    nonEmptyMap: (value) => assertType(is.nonEmptyMap(value), "non-empty map" /* AssertionTypeDescription.nonEmptyMap */, value),
    propertyKey: (value) => assertType(is.propertyKey(value), 'PropertyKey', value),
    formData: (value) => assertType(is.formData(value), 'FormData', value),
    urlSearchParams: (value) => assertType(is.urlSearchParams(value), 'URLSearchParams', value),
    // Numbers.
    evenInteger: (value) => assertType(is.evenInteger(value), "even integer" /* AssertionTypeDescription.evenInteger */, value),
    oddInteger: (value) => assertType(is.oddInteger(value), "odd integer" /* AssertionTypeDescription.oddInteger */, value),
    // Two arguments.
    directInstanceOf: (instance, class_) => assertType(is.directInstanceOf(instance, class_), "T" /* AssertionTypeDescription.directInstanceOf */, instance),
    inRange: (value, range) => assertType(is.inRange(value, range), "in range" /* AssertionTypeDescription.inRange */, value),
    // Variadic functions.
    any: (predicate, ...values) => assertType(is.any(predicate, ...values), "predicate returns truthy for any value" /* AssertionTypeDescription.any */, values, { multipleValues: true }),
    all: (predicate, ...values) => assertType(is.all(predicate, ...values), "predicate returns truthy for all values" /* AssertionTypeDescription.all */, values, { multipleValues: true }),
};
/* eslint-enable @typescript-eslint/no-confusing-void-expression */
// Some few keywords are reserved, but we'll populate them for Node.js users
// See https://github.com/Microsoft/TypeScript/issues/2536
Object.defineProperties(is, {
    class: {
        value: is.class_,
    },
    function: {
        value: is.function_,
    },
    null: {
        value: is.null_,
    },
});
Object.defineProperties(assert, {
    class: {
        value: assert.class_,
    },
    function: {
        value: assert.function_,
    },
    null: {
        value: assert.null_,
    },
});
/* harmony default export */ const dist = (is);

;// CONCATENATED MODULE: external "node:events"
const external_node_events_namespaceObject = require("node:events");
;// CONCATENATED MODULE: ./node_modules/app-base-v9/node_modules/p-cancelable/index.js
class CancelError extends Error {
	constructor(reason) {
		super(reason || 'Promise was canceled');
		this.name = 'CancelError';
	}

	get isCanceled() {
		return true;
	}
}

// TODO: Use private class fields when ESLint 8 is out.

class PCancelable {
	static fn(userFunction) {
		return (...arguments_) => {
			return new PCancelable((resolve, reject, onCancel) => {
				arguments_.push(onCancel);
				// eslint-disable-next-line promise/prefer-await-to-then
				userFunction(...arguments_).then(resolve, reject);
			});
		};
	}

	constructor(executor) {
		this._cancelHandlers = [];
		this._isPending = true;
		this._isCanceled = false;
		this._rejectOnCancel = true;

		this._promise = new Promise((resolve, reject) => {
			this._reject = reject;

			const onResolve = value => {
				if (!this._isCanceled || !onCancel.shouldReject) {
					this._isPending = false;
					resolve(value);
				}
			};

			const onReject = error => {
				this._isPending = false;
				reject(error);
			};

			const onCancel = handler => {
				if (!this._isPending) {
					throw new Error('The `onCancel` handler was attached after the promise settled.');
				}

				this._cancelHandlers.push(handler);
			};

			Object.defineProperties(onCancel, {
				shouldReject: {
					get: () => this._rejectOnCancel,
					set: boolean => {
						this._rejectOnCancel = boolean;
					}
				}
			});

			executor(onResolve, onReject, onCancel);
		});
	}

	then(onFulfilled, onRejected) {
		// eslint-disable-next-line promise/prefer-await-to-then
		return this._promise.then(onFulfilled, onRejected);
	}

	catch(onRejected) {
		// eslint-disable-next-line promise/prefer-await-to-then
		return this._promise.catch(onRejected);
	}

	finally(onFinally) {
		// eslint-disable-next-line promise/prefer-await-to-then
		return this._promise.finally(onFinally);
	}

	cancel(reason) {
		if (!this._isPending || this._isCanceled) {
			return;
		}

		this._isCanceled = true;

		if (this._cancelHandlers.length > 0) {
			try {
				for (const handler of this._cancelHandlers) {
					handler();
				}
			} catch (error) {
				this._reject(error);
				return;
			}
		}

		if (this._rejectOnCancel) {
			this._reject(new CancelError(reason));
		}
	}

	get isCanceled() {
		return this._isCanceled;
	}
}

Object.setPrototypeOf(PCancelable.prototype, Promise.prototype);

;// CONCATENATED MODULE: ./node_modules/app-base-v9/node_modules/got/dist/source/core/errors.js

// A hacky check to prevent circular references.
function isRequest(x) {
    return dist.object(x) && '_onResponse' in x;
}
/**
An error to be thrown when a request fails.
Contains a `code` property with error class code, like `ECONNREFUSED`.
*/
class RequestError extends Error {
    constructor(message, error, self) {
        super(message);
        Object.defineProperty(this, "input", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "code", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "stack", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "response", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "request", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "timings", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Error.captureStackTrace(this, this.constructor);
        this.name = 'RequestError';
        this.code = error.code ?? 'ERR_GOT_REQUEST_ERROR';
        this.input = error.input;
        if (isRequest(self)) {
            Object.defineProperty(this, 'request', {
                enumerable: false,
                value: self,
            });
            Object.defineProperty(this, 'response', {
                enumerable: false,
                value: self.response,
            });
            this.options = self.options;
        }
        else {
            this.options = self;
        }
        this.timings = this.request?.timings;
        // Recover the original stacktrace
        if (dist.string(error.stack) && dist.string(this.stack)) {
            const indexOfMessage = this.stack.indexOf(this.message) + this.message.length;
            const thisStackTrace = this.stack.slice(indexOfMessage).split('\n').reverse();
            const errorStackTrace = error.stack.slice(error.stack.indexOf(error.message) + error.message.length).split('\n').reverse();
            // Remove duplicated traces
            while (errorStackTrace.length > 0 && errorStackTrace[0] === thisStackTrace[0]) {
                thisStackTrace.shift();
            }
            this.stack = `${this.stack.slice(0, indexOfMessage)}${thisStackTrace.reverse().join('\n')}${errorStackTrace.reverse().join('\n')}`;
        }
    }
}
/**
An error to be thrown when the server redirects you more than ten times.
Includes a `response` property.
*/
class MaxRedirectsError extends RequestError {
    constructor(request) {
        super(`Redirected ${request.options.maxRedirects} times. Aborting.`, {}, request);
        this.name = 'MaxRedirectsError';
        this.code = 'ERR_TOO_MANY_REDIRECTS';
    }
}
/**
An error to be thrown when the server response code is not 2xx nor 3xx if `options.followRedirect` is `true`, but always except for 304.
Includes a `response` property.
*/
// eslint-disable-next-line @typescript-eslint/naming-convention
class HTTPError extends RequestError {
    constructor(response) {
        super(`Response code ${response.statusCode} (${response.statusMessage})`, {}, response.request);
        this.name = 'HTTPError';
        this.code = 'ERR_NON_2XX_3XX_RESPONSE';
    }
}
/**
An error to be thrown when a cache method fails.
For example, if the database goes down or there's a filesystem error.
*/
class CacheError extends RequestError {
    constructor(error, request) {
        super(error.message, error, request);
        this.name = 'CacheError';
        this.code = this.code === 'ERR_GOT_REQUEST_ERROR' ? 'ERR_CACHE_ACCESS' : this.code;
    }
}
/**
An error to be thrown when the request body is a stream and an error occurs while reading from that stream.
*/
class UploadError extends RequestError {
    constructor(error, request) {
        super(error.message, error, request);
        this.name = 'UploadError';
        this.code = this.code === 'ERR_GOT_REQUEST_ERROR' ? 'ERR_UPLOAD' : this.code;
    }
}
/**
An error to be thrown when the request is aborted due to a timeout.
Includes an `event` and `timings` property.
*/
class TimeoutError extends RequestError {
    constructor(error, timings, request) {
        super(error.message, error, request);
        Object.defineProperty(this, "timings", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "event", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.name = 'TimeoutError';
        this.event = error.event;
        this.timings = timings;
    }
}
/**
An error to be thrown when reading from response stream fails.
*/
class ReadError extends RequestError {
    constructor(error, request) {
        super(error.message, error, request);
        this.name = 'ReadError';
        this.code = this.code === 'ERR_GOT_REQUEST_ERROR' ? 'ERR_READING_RESPONSE_STREAM' : this.code;
    }
}
/**
An error which always triggers a new retry when thrown.
*/
class RetryError extends RequestError {
    constructor(request) {
        super('Retrying', {}, request);
        this.name = 'RetryError';
        this.code = 'ERR_RETRYING';
    }
}
/**
An error to be thrown when the request is aborted by AbortController.
*/
class AbortError extends RequestError {
    constructor(request) {
        super('This operation was aborted.', {}, request);
        this.code = 'ERR_ABORTED';
        this.name = 'AbortError';
    }
}

;// CONCATENATED MODULE: external "node:process"
const external_node_process_namespaceObject = require("node:process");
;// CONCATENATED MODULE: external "node:buffer"
const external_node_buffer_namespaceObject = require("node:buffer");
;// CONCATENATED MODULE: external "node:stream"
const external_node_stream_namespaceObject = require("node:stream");
;// CONCATENATED MODULE: external "node:url"
const external_node_url_namespaceObject = require("node:url");
;// CONCATENATED MODULE: external "node:http"
const external_node_http_namespaceObject = require("node:http");
// EXTERNAL MODULE: external "events"
var external_events_ = __webpack_require__(2361);
// EXTERNAL MODULE: external "util"
var external_util_ = __webpack_require__(3837);
// EXTERNAL MODULE: ./node_modules/app-base-v9/node_modules/defer-to-connect/dist/source/index.js
var source = __webpack_require__(8695);
;// CONCATENATED MODULE: ./node_modules/app-base-v9/node_modules/@szmarczak/http-timer/dist/source/index.js



const timer = (request) => {
    if (request.timings) {
        return request.timings;
    }
    const timings = {
        start: Date.now(),
        socket: undefined,
        lookup: undefined,
        connect: undefined,
        secureConnect: undefined,
        upload: undefined,
        response: undefined,
        end: undefined,
        error: undefined,
        abort: undefined,
        phases: {
            wait: undefined,
            dns: undefined,
            tcp: undefined,
            tls: undefined,
            request: undefined,
            firstByte: undefined,
            download: undefined,
            total: undefined,
        },
    };
    request.timings = timings;
    const handleError = (origin) => {
        origin.once(external_events_.errorMonitor, () => {
            timings.error = Date.now();
            timings.phases.total = timings.error - timings.start;
        });
    };
    handleError(request);
    const onAbort = () => {
        timings.abort = Date.now();
        timings.phases.total = timings.abort - timings.start;
    };
    request.prependOnceListener('abort', onAbort);
    const onSocket = (socket) => {
        timings.socket = Date.now();
        timings.phases.wait = timings.socket - timings.start;
        if (external_util_.types.isProxy(socket)) {
            return;
        }
        const lookupListener = () => {
            timings.lookup = Date.now();
            timings.phases.dns = timings.lookup - timings.socket;
        };
        socket.prependOnceListener('lookup', lookupListener);
        source(socket, {
            connect: () => {
                timings.connect = Date.now();
                if (timings.lookup === undefined) {
                    socket.removeListener('lookup', lookupListener);
                    timings.lookup = timings.connect;
                    timings.phases.dns = timings.lookup - timings.socket;
                }
                timings.phases.tcp = timings.connect - timings.lookup;
            },
            secureConnect: () => {
                timings.secureConnect = Date.now();
                timings.phases.tls = timings.secureConnect - timings.connect;
            },
        });
    };
    if (request.socket) {
        onSocket(request.socket);
    }
    else {
        request.prependOnceListener('socket', onSocket);
    }
    const onUpload = () => {
        timings.upload = Date.now();
        timings.phases.request = timings.upload - (timings.secureConnect ?? timings.connect);
    };
    if (request.writableFinished) {
        onUpload();
    }
    else {
        request.prependOnceListener('finish', onUpload);
    }
    request.prependOnceListener('response', (response) => {
        timings.response = Date.now();
        timings.phases.firstByte = timings.response - timings.upload;
        response.timings = timings;
        handleError(response);
        response.prependOnceListener('end', () => {
            request.off('abort', onAbort);
            response.off('aborted', onAbort);
            if (timings.phases.total) {
                // Aborted or errored
                return;
            }
            timings.end = Date.now();
            timings.phases.download = timings.end - timings.response;
            timings.phases.total = timings.end - timings.start;
        });
        response.prependOnceListener('aborted', onAbort);
    });
    return timings;
};
/* harmony default export */ const dist_source = (timer);

// EXTERNAL MODULE: ./node_modules/app-base-v9/node_modules/cacheable-request/src/index.js
var src = __webpack_require__(3086);
// EXTERNAL MODULE: ./node_modules/app-base-v9/node_modules/decompress-response/index.js
var decompress_response = __webpack_require__(6941);
// EXTERNAL MODULE: ./node_modules/app-base-v9/node_modules/get-stream/index.js
var get_stream = __webpack_require__(8633);
;// CONCATENATED MODULE: ./node_modules/app-base-v9/node_modules/form-data-encoder/lib/util/isFunction.js
const isFunction = (value) => (typeof value === "function");

;// CONCATENATED MODULE: ./node_modules/app-base-v9/node_modules/form-data-encoder/lib/util/isFormData.js

const isFormData = (value) => Boolean(value
    && isFunction(value.constructor)
    && value[Symbol.toStringTag] === "FormData"
    && isFunction(value.append)
    && isFunction(value.getAll)
    && isFunction(value.entries)
    && isFunction(value[Symbol.iterator]));

;// CONCATENATED MODULE: ./node_modules/app-base-v9/node_modules/form-data-encoder/lib/util/createBoundary.js
const alphabet = "abcdefghijklmnopqrstuvwxyz0123456789";
function createBoundary() {
    let size = 16;
    let res = "";
    while (size--) {
        res += alphabet[(Math.random() * alphabet.length) << 0];
    }
    return res;
}

;// CONCATENATED MODULE: ./node_modules/app-base-v9/node_modules/form-data-encoder/lib/util/normalizeValue.js
const normalizeValue = (value) => String(value)
    .replace(/\r|\n/g, (match, i, str) => {
    if ((match === "\r" && str[i + 1] !== "\n")
        || (match === "\n" && str[i - 1] !== "\r")) {
        return "\r\n";
    }
    return match;
});

;// CONCATENATED MODULE: ./node_modules/app-base-v9/node_modules/form-data-encoder/lib/util/isPlainObject.js
const getType = (value) => (Object.prototype.toString.call(value).slice(8, -1).toLowerCase());
function isPlainObject(value) {
    if (getType(value) !== "object") {
        return false;
    }
    const pp = Object.getPrototypeOf(value);
    if (pp === null || pp === undefined) {
        return true;
    }
    const Ctor = pp.constructor && pp.constructor.toString();
    return Ctor === Object.toString();
}

;// CONCATENATED MODULE: ./node_modules/app-base-v9/node_modules/form-data-encoder/lib/util/proxyHeaders.js
function getProperty(target, prop) {
    if (typeof prop !== "string") {
        return target[prop];
    }
    for (const [name, value] of Object.entries(target)) {
        if (prop.toLowerCase() === name.toLowerCase()) {
            return value;
        }
    }
    return undefined;
}
const proxyHeaders = (object) => new Proxy(object, {
    get: (target, prop) => getProperty(target, prop),
    has: (target, prop) => getProperty(target, prop) !== undefined
});

;// CONCATENATED MODULE: ./node_modules/app-base-v9/node_modules/form-data-encoder/lib/util/escapeName.js
const escapeName = (name) => String(name)
    .replace(/\r/g, "%0D")
    .replace(/\n/g, "%0A")
    .replace(/"/g, "%22");

;// CONCATENATED MODULE: ./node_modules/app-base-v9/node_modules/form-data-encoder/lib/util/isFile.js

const isFile = (value) => Boolean(value
    && typeof value === "object"
    && isFunction(value.constructor)
    && value[Symbol.toStringTag] === "File"
    && isFunction(value.stream)
    && value.name != null);
const isFileLike = (/* unused pure expression or super */ null && (isFile));

;// CONCATENATED MODULE: ./node_modules/app-base-v9/node_modules/form-data-encoder/lib/FormDataEncoder.js
var __classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _FormDataEncoder_instances, _FormDataEncoder_CRLF, _FormDataEncoder_CRLF_BYTES, _FormDataEncoder_CRLF_BYTES_LENGTH, _FormDataEncoder_DASHES, _FormDataEncoder_encoder, _FormDataEncoder_footer, _FormDataEncoder_form, _FormDataEncoder_options, _FormDataEncoder_getFieldHeader, _FormDataEncoder_getContentLength;







const defaultOptions = {
    enableAdditionalHeaders: false
};
const readonlyProp = { writable: false, configurable: false };
class FormDataEncoder {
    constructor(form, boundaryOrOptions, options) {
        _FormDataEncoder_instances.add(this);
        _FormDataEncoder_CRLF.set(this, "\r\n");
        _FormDataEncoder_CRLF_BYTES.set(this, void 0);
        _FormDataEncoder_CRLF_BYTES_LENGTH.set(this, void 0);
        _FormDataEncoder_DASHES.set(this, "-".repeat(2));
        _FormDataEncoder_encoder.set(this, new TextEncoder());
        _FormDataEncoder_footer.set(this, void 0);
        _FormDataEncoder_form.set(this, void 0);
        _FormDataEncoder_options.set(this, void 0);
        if (!isFormData(form)) {
            throw new TypeError("Expected first argument to be a FormData instance.");
        }
        let boundary;
        if (isPlainObject(boundaryOrOptions)) {
            options = boundaryOrOptions;
        }
        else {
            boundary = boundaryOrOptions;
        }
        if (!boundary) {
            boundary = createBoundary();
        }
        if (typeof boundary !== "string") {
            throw new TypeError("Expected boundary argument to be a string.");
        }
        if (options && !isPlainObject(options)) {
            throw new TypeError("Expected options argument to be an object.");
        }
        __classPrivateFieldSet(this, _FormDataEncoder_form, Array.from(form.entries()), "f");
        __classPrivateFieldSet(this, _FormDataEncoder_options, { ...defaultOptions, ...options }, "f");
        __classPrivateFieldSet(this, _FormDataEncoder_CRLF_BYTES, __classPrivateFieldGet(this, _FormDataEncoder_encoder, "f").encode(__classPrivateFieldGet(this, _FormDataEncoder_CRLF, "f")), "f");
        __classPrivateFieldSet(this, _FormDataEncoder_CRLF_BYTES_LENGTH, __classPrivateFieldGet(this, _FormDataEncoder_CRLF_BYTES, "f").byteLength, "f");
        this.boundary = `form-data-boundary-${boundary}`;
        this.contentType = `multipart/form-data; boundary=${this.boundary}`;
        __classPrivateFieldSet(this, _FormDataEncoder_footer, __classPrivateFieldGet(this, _FormDataEncoder_encoder, "f").encode(`${__classPrivateFieldGet(this, _FormDataEncoder_DASHES, "f")}${this.boundary}${__classPrivateFieldGet(this, _FormDataEncoder_DASHES, "f")}${__classPrivateFieldGet(this, _FormDataEncoder_CRLF, "f").repeat(2)}`), "f");
        const headers = {
            "Content-Type": this.contentType
        };
        const contentLength = __classPrivateFieldGet(this, _FormDataEncoder_instances, "m", _FormDataEncoder_getContentLength).call(this);
        if (contentLength) {
            this.contentLength = contentLength;
            headers["Content-Length"] = contentLength;
        }
        this.headers = proxyHeaders(Object.freeze(headers));
        Object.defineProperties(this, {
            boundary: readonlyProp,
            contentType: readonlyProp,
            contentLength: readonlyProp,
            headers: readonlyProp
        });
    }
    getContentLength() {
        return this.contentLength == null ? undefined : Number(this.contentLength);
    }
    *values() {
        for (const [name, raw] of __classPrivateFieldGet(this, _FormDataEncoder_form, "f")) {
            const value = isFile(raw) ? raw : __classPrivateFieldGet(this, _FormDataEncoder_encoder, "f").encode(normalizeValue(raw));
            yield __classPrivateFieldGet(this, _FormDataEncoder_instances, "m", _FormDataEncoder_getFieldHeader).call(this, name, value);
            yield value;
            yield __classPrivateFieldGet(this, _FormDataEncoder_CRLF_BYTES, "f");
        }
        yield __classPrivateFieldGet(this, _FormDataEncoder_footer, "f");
    }
    async *encode() {
        for (const part of this.values()) {
            if (isFile(part)) {
                yield* part.stream();
            }
            else {
                yield part;
            }
        }
    }
    [(_FormDataEncoder_CRLF = new WeakMap(), _FormDataEncoder_CRLF_BYTES = new WeakMap(), _FormDataEncoder_CRLF_BYTES_LENGTH = new WeakMap(), _FormDataEncoder_DASHES = new WeakMap(), _FormDataEncoder_encoder = new WeakMap(), _FormDataEncoder_footer = new WeakMap(), _FormDataEncoder_form = new WeakMap(), _FormDataEncoder_options = new WeakMap(), _FormDataEncoder_instances = new WeakSet(), _FormDataEncoder_getFieldHeader = function _FormDataEncoder_getFieldHeader(name, value) {
        let header = "";
        header += `${__classPrivateFieldGet(this, _FormDataEncoder_DASHES, "f")}${this.boundary}${__classPrivateFieldGet(this, _FormDataEncoder_CRLF, "f")}`;
        header += `Content-Disposition: form-data; name="${escapeName(name)}"`;
        if (isFile(value)) {
            header += `; filename="${escapeName(value.name)}"${__classPrivateFieldGet(this, _FormDataEncoder_CRLF, "f")}`;
            header += `Content-Type: ${value.type || "application/octet-stream"}`;
        }
        const size = isFile(value) ? value.size : value.byteLength;
        if (__classPrivateFieldGet(this, _FormDataEncoder_options, "f").enableAdditionalHeaders === true
            && size != null
            && !isNaN(size)) {
            header += `${__classPrivateFieldGet(this, _FormDataEncoder_CRLF, "f")}Content-Length: ${isFile(value) ? value.size : value.byteLength}`;
        }
        return __classPrivateFieldGet(this, _FormDataEncoder_encoder, "f").encode(`${header}${__classPrivateFieldGet(this, _FormDataEncoder_CRLF, "f").repeat(2)}`);
    }, _FormDataEncoder_getContentLength = function _FormDataEncoder_getContentLength() {
        let length = 0;
        for (const [name, raw] of __classPrivateFieldGet(this, _FormDataEncoder_form, "f")) {
            const value = isFile(raw) ? raw : __classPrivateFieldGet(this, _FormDataEncoder_encoder, "f").encode(normalizeValue(raw));
            const size = isFile(value) ? value.size : value.byteLength;
            if (size == null || isNaN(size)) {
                return undefined;
            }
            length += __classPrivateFieldGet(this, _FormDataEncoder_instances, "m", _FormDataEncoder_getFieldHeader).call(this, name, value).byteLength;
            length += size;
            length += __classPrivateFieldGet(this, _FormDataEncoder_CRLF_BYTES_LENGTH, "f");
        }
        return String(length + __classPrivateFieldGet(this, _FormDataEncoder_footer, "f").byteLength);
    }, Symbol.iterator)]() {
        return this.values();
    }
    [Symbol.asyncIterator]() {
        return this.encode();
    }
}

;// CONCATENATED MODULE: external "node:util"
const external_node_util_namespaceObject = require("node:util");
;// CONCATENATED MODULE: ./node_modules/app-base-v9/node_modules/got/dist/source/core/utils/is-form-data.js

function is_form_data_isFormData(body) {
    return dist.nodeStream(body) && dist.function_(body.getBoundary);
}

;// CONCATENATED MODULE: ./node_modules/app-base-v9/node_modules/got/dist/source/core/utils/get-body-size.js




async function getBodySize(body, headers) {
    if (headers && 'content-length' in headers) {
        return Number(headers['content-length']);
    }
    if (!body) {
        return 0;
    }
    if (dist.string(body)) {
        return external_node_buffer_namespaceObject.Buffer.byteLength(body);
    }
    if (dist.buffer(body)) {
        return body.length;
    }
    if (is_form_data_isFormData(body)) {
        return (0,external_node_util_namespaceObject.promisify)(body.getLength.bind(body))();
    }
    return undefined;
}

;// CONCATENATED MODULE: ./node_modules/app-base-v9/node_modules/got/dist/source/core/utils/proxy-events.js
function proxyEvents(from, to, events) {
    const eventFunctions = {};
    for (const event of events) {
        const eventFunction = (...args) => {
            to.emit(event, ...args);
        };
        eventFunctions[event] = eventFunction;
        from.on(event, eventFunction);
    }
    return () => {
        for (const [event, eventFunction] of Object.entries(eventFunctions)) {
            from.off(event, eventFunction);
        }
    };
}

;// CONCATENATED MODULE: external "node:net"
const external_node_net_namespaceObject = require("node:net");
;// CONCATENATED MODULE: ./node_modules/app-base-v9/node_modules/got/dist/source/core/utils/unhandle.js
// When attaching listeners, it's very easy to forget about them.
// Especially if you do error handling and set timeouts.
// So instead of checking if it's proper to throw an error on every timeout ever,
// use this simple tool which will remove all listeners you have attached.
function unhandle() {
    const handlers = [];
    return {
        once(origin, event, fn) {
            origin.once(event, fn);
            handlers.push({ origin, event, fn });
        },
        unhandleAll() {
            for (const handler of handlers) {
                const { origin, event, fn } = handler;
                origin.removeListener(event, fn);
            }
            handlers.length = 0;
        },
    };
}

;// CONCATENATED MODULE: ./node_modules/app-base-v9/node_modules/got/dist/source/core/timed-out.js


const reentry = Symbol('reentry');
const noop = () => { };
class timed_out_TimeoutError extends Error {
    constructor(threshold, event) {
        super(`Timeout awaiting '${event}' for ${threshold}ms`);
        Object.defineProperty(this, "event", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: event
        });
        Object.defineProperty(this, "code", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.name = 'TimeoutError';
        this.code = 'ETIMEDOUT';
    }
}
function timedOut(request, delays, options) {
    if (reentry in request) {
        return noop;
    }
    request[reentry] = true;
    const cancelers = [];
    const { once, unhandleAll } = unhandle();
    const addTimeout = (delay, callback, event) => {
        const timeout = setTimeout(callback, delay, delay, event);
        timeout.unref?.();
        const cancel = () => {
            clearTimeout(timeout);
        };
        cancelers.push(cancel);
        return cancel;
    };
    const { host, hostname } = options;
    const timeoutHandler = (delay, event) => {
        request.destroy(new timed_out_TimeoutError(delay, event));
    };
    const cancelTimeouts = () => {
        for (const cancel of cancelers) {
            cancel();
        }
        unhandleAll();
    };
    request.once('error', error => {
        cancelTimeouts();
        // Save original behavior
        /* istanbul ignore next */
        if (request.listenerCount('error') === 0) {
            throw error;
        }
    });
    if (typeof delays.request !== 'undefined') {
        const cancelTimeout = addTimeout(delays.request, timeoutHandler, 'request');
        once(request, 'response', (response) => {
            once(response, 'end', cancelTimeout);
        });
    }
    if (typeof delays.socket !== 'undefined') {
        const { socket } = delays;
        const socketTimeoutHandler = () => {
            timeoutHandler(socket, 'socket');
        };
        request.setTimeout(socket, socketTimeoutHandler);
        // `request.setTimeout(0)` causes a memory leak.
        // We can just remove the listener and forget about the timer - it's unreffed.
        // See https://github.com/sindresorhus/got/issues/690
        cancelers.push(() => {
            request.removeListener('timeout', socketTimeoutHandler);
        });
    }
    const hasLookup = typeof delays.lookup !== 'undefined';
    const hasConnect = typeof delays.connect !== 'undefined';
    const hasSecureConnect = typeof delays.secureConnect !== 'undefined';
    const hasSend = typeof delays.send !== 'undefined';
    if (hasLookup || hasConnect || hasSecureConnect || hasSend) {
        once(request, 'socket', (socket) => {
            const { socketPath } = request;
            /* istanbul ignore next: hard to test */
            if (socket.connecting) {
                const hasPath = Boolean(socketPath ?? external_node_net_namespaceObject.isIP(hostname ?? host ?? '') !== 0);
                if (hasLookup && !hasPath && typeof socket.address().address === 'undefined') {
                    const cancelTimeout = addTimeout(delays.lookup, timeoutHandler, 'lookup');
                    once(socket, 'lookup', cancelTimeout);
                }
                if (hasConnect) {
                    const timeConnect = () => addTimeout(delays.connect, timeoutHandler, 'connect');
                    if (hasPath) {
                        once(socket, 'connect', timeConnect());
                    }
                    else {
                        once(socket, 'lookup', (error) => {
                            if (error === null) {
                                once(socket, 'connect', timeConnect());
                            }
                        });
                    }
                }
                if (hasSecureConnect && options.protocol === 'https:') {
                    once(socket, 'connect', () => {
                        const cancelTimeout = addTimeout(delays.secureConnect, timeoutHandler, 'secureConnect');
                        once(socket, 'secureConnect', cancelTimeout);
                    });
                }
            }
            if (hasSend) {
                const timeRequest = () => addTimeout(delays.send, timeoutHandler, 'send');
                /* istanbul ignore next: hard to test */
                if (socket.connecting) {
                    once(socket, 'connect', () => {
                        once(request, 'upload-complete', timeRequest());
                    });
                }
                else {
                    once(request, 'upload-complete', timeRequest());
                }
            }
        });
    }
    if (typeof delays.response !== 'undefined') {
        once(request, 'upload-complete', () => {
            const cancelTimeout = addTimeout(delays.response, timeoutHandler, 'response');
            once(request, 'response', cancelTimeout);
        });
    }
    if (typeof delays.read !== 'undefined') {
        once(request, 'response', (response) => {
            const cancelTimeout = addTimeout(delays.read, timeoutHandler, 'read');
            once(response, 'end', cancelTimeout);
        });
    }
    return cancelTimeouts;
}

;// CONCATENATED MODULE: ./node_modules/app-base-v9/node_modules/got/dist/source/core/utils/url-to-options.js

function urlToOptions(url) {
    // Cast to URL
    url = url;
    const options = {
        protocol: url.protocol,
        hostname: dist.string(url.hostname) && url.hostname.startsWith('[') ? url.hostname.slice(1, -1) : url.hostname,
        host: url.host,
        hash: url.hash,
        search: url.search,
        pathname: url.pathname,
        href: url.href,
        path: `${url.pathname || ''}${url.search || ''}`,
    };
    if (dist.string(url.port) && url.port.length > 0) {
        options.port = Number(url.port);
    }
    if (url.username || url.password) {
        options.auth = `${url.username || ''}:${url.password || ''}`;
    }
    return options;
}

;// CONCATENATED MODULE: ./node_modules/app-base-v9/node_modules/got/dist/source/core/utils/weakable-map.js
class WeakableMap {
    constructor() {
        Object.defineProperty(this, "weakMap", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "map", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.weakMap = new WeakMap();
        this.map = new Map();
    }
    set(key, value) {
        if (typeof key === 'object') {
            this.weakMap.set(key, value);
        }
        else {
            this.map.set(key, value);
        }
    }
    get(key) {
        if (typeof key === 'object') {
            return this.weakMap.get(key);
        }
        return this.map.get(key);
    }
    has(key) {
        if (typeof key === 'object') {
            return this.weakMap.has(key);
        }
        return this.map.has(key);
    }
}

;// CONCATENATED MODULE: ./node_modules/app-base-v9/node_modules/got/dist/source/core/calculate-retry-delay.js
const calculateRetryDelay = ({ attemptCount, retryOptions, error, retryAfter, computedValue, }) => {
    if (error.name === 'RetryError') {
        return 1;
    }
    if (attemptCount > retryOptions.limit) {
        return 0;
    }
    const hasMethod = retryOptions.methods.includes(error.options.method);
    const hasErrorCode = retryOptions.errorCodes.includes(error.code);
    const hasStatusCode = error.response && retryOptions.statusCodes.includes(error.response.statusCode);
    if (!hasMethod || (!hasErrorCode && !hasStatusCode)) {
        return 0;
    }
    if (error.response) {
        if (retryAfter) {
            // In this case `computedValue` is `options.request.timeout`
            if (retryAfter > computedValue) {
                return 0;
            }
            return retryAfter;
        }
        if (error.response.statusCode === 413) {
            return 0;
        }
    }
    const noise = Math.random() * retryOptions.noise;
    return Math.min(((2 ** (attemptCount - 1)) * 1000), retryOptions.backoffLimit) + noise;
};
/* harmony default export */ const calculate_retry_delay = (calculateRetryDelay);

;// CONCATENATED MODULE: external "node:tls"
const external_node_tls_namespaceObject = require("node:tls");
;// CONCATENATED MODULE: external "node:https"
const external_node_https_namespaceObject = require("node:https");
;// CONCATENATED MODULE: ./node_modules/app-base-v9/node_modules/got/node_modules/lowercase-keys/index.js
function lowercaseKeys(object) {
	return Object.fromEntries(Object.entries(object).map(([key, value]) => [key.toLowerCase(), value]));
}

// EXTERNAL MODULE: ./node_modules/app-base-v9/node_modules/cacheable-lookup/source/index.js
var cacheable_lookup_source = __webpack_require__(8773);
// EXTERNAL MODULE: ./node_modules/app-base-v9/node_modules/http2-wrapper/source/index.js
var http2_wrapper_source = __webpack_require__(6178);
;// CONCATENATED MODULE: ./node_modules/app-base-v9/node_modules/got/dist/source/core/parse-link-header.js
function parseLinkHeader(link) {
    const parsed = [];
    const items = link.split(',');
    for (const item of items) {
        // https://tools.ietf.org/html/rfc5988#section-5
        const [rawUriReference, ...rawLinkParameters] = item.split(';');
        const trimmedUriReference = rawUriReference.trim();
        // eslint-disable-next-line @typescript-eslint/prefer-string-starts-ends-with
        if (trimmedUriReference[0] !== '<' || trimmedUriReference[trimmedUriReference.length - 1] !== '>') {
            throw new Error(`Invalid format of the Link header reference: ${trimmedUriReference}`);
        }
        const reference = trimmedUriReference.slice(1, -1);
        const parameters = {};
        if (rawLinkParameters.length === 0) {
            throw new Error(`Unexpected end of Link header parameters: ${rawLinkParameters.join(';')}`);
        }
        for (const rawParameter of rawLinkParameters) {
            const trimmedRawParameter = rawParameter.trim();
            const center = trimmedRawParameter.indexOf('=');
            if (center === -1) {
                throw new Error(`Failed to parse Link header: ${link}`);
            }
            const name = trimmedRawParameter.slice(0, center).trim();
            const value = trimmedRawParameter.slice(center + 1).trim();
            parameters[name] = value;
        }
        parsed.push({
            reference,
            parameters,
        });
    }
    return parsed;
}

;// CONCATENATED MODULE: ./node_modules/app-base-v9/node_modules/got/dist/source/core/options.js




// DO NOT use destructuring for `https.request` and `http.request` as it's not compatible with `nock`.








const [major, minor] = external_node_process_namespaceObject.versions.node.split('.').map(Number);
function validateSearchParameters(searchParameters) {
    // eslint-disable-next-line guard-for-in
    for (const key in searchParameters) {
        const value = searchParameters[key];
        assert.any([dist.string, dist.number, dist.boolean, dist.null_, dist.undefined], value);
    }
}
const globalCache = new Map();
let globalDnsCache;
const getGlobalDnsCache = () => {
    if (globalDnsCache) {
        return globalDnsCache;
    }
    globalDnsCache = new cacheable_lookup_source();
    return globalDnsCache;
};
const defaultInternals = {
    request: undefined,
    agent: {
        http: undefined,
        https: undefined,
        http2: undefined,
    },
    h2session: undefined,
    decompress: true,
    timeout: {
        connect: undefined,
        lookup: undefined,
        read: undefined,
        request: undefined,
        response: undefined,
        secureConnect: undefined,
        send: undefined,
        socket: undefined,
    },
    prefixUrl: '',
    body: undefined,
    form: undefined,
    json: undefined,
    cookieJar: undefined,
    ignoreInvalidCookies: false,
    searchParams: undefined,
    dnsLookup: undefined,
    dnsCache: undefined,
    context: {},
    hooks: {
        init: [],
        beforeRequest: [],
        beforeError: [],
        beforeRedirect: [],
        beforeRetry: [],
        afterResponse: [],
    },
    followRedirect: true,
    maxRedirects: 10,
    cache: undefined,
    throwHttpErrors: true,
    username: '',
    password: '',
    http2: false,
    allowGetBody: false,
    headers: {
        'user-agent': 'got (https://github.com/sindresorhus/got)',
    },
    methodRewriting: false,
    dnsLookupIpVersion: undefined,
    parseJson: JSON.parse,
    stringifyJson: JSON.stringify,
    retry: {
        limit: 2,
        methods: [
            'GET',
            'PUT',
            'HEAD',
            'DELETE',
            'OPTIONS',
            'TRACE',
        ],
        statusCodes: [
            408,
            413,
            429,
            500,
            502,
            503,
            504,
            521,
            522,
            524,
        ],
        errorCodes: [
            'ETIMEDOUT',
            'ECONNRESET',
            'EADDRINUSE',
            'ECONNREFUSED',
            'EPIPE',
            'ENOTFOUND',
            'ENETUNREACH',
            'EAI_AGAIN',
        ],
        maxRetryAfter: undefined,
        calculateDelay: ({ computedValue }) => computedValue,
        backoffLimit: Number.POSITIVE_INFINITY,
        noise: 100,
    },
    localAddress: undefined,
    method: 'GET',
    createConnection: undefined,
    cacheOptions: {
        shared: undefined,
        cacheHeuristic: undefined,
        immutableMinTimeToLive: undefined,
        ignoreCargoCult: undefined,
    },
    https: {
        alpnProtocols: undefined,
        rejectUnauthorized: undefined,
        checkServerIdentity: undefined,
        certificateAuthority: undefined,
        key: undefined,
        certificate: undefined,
        passphrase: undefined,
        pfx: undefined,
        ciphers: undefined,
        honorCipherOrder: undefined,
        minVersion: undefined,
        maxVersion: undefined,
        signatureAlgorithms: undefined,
        tlsSessionLifetime: undefined,
        dhparam: undefined,
        ecdhCurve: undefined,
        certificateRevocationLists: undefined,
    },
    encoding: undefined,
    resolveBodyOnly: false,
    isStream: false,
    responseType: 'text',
    url: undefined,
    pagination: {
        transform(response) {
            if (response.request.options.responseType === 'json') {
                return response.body;
            }
            return JSON.parse(response.body);
        },
        paginate({ response }) {
            const rawLinkHeader = response.headers.link;
            if (typeof rawLinkHeader !== 'string' || rawLinkHeader.trim() === '') {
                return false;
            }
            const parsed = parseLinkHeader(rawLinkHeader);
            const next = parsed.find(entry => entry.parameters.rel === 'next' || entry.parameters.rel === '"next"');
            if (next) {
                return {
                    url: new external_node_url_namespaceObject.URL(next.reference, response.url),
                };
            }
            return false;
        },
        filter: () => true,
        shouldContinue: () => true,
        countLimit: Number.POSITIVE_INFINITY,
        backoff: 0,
        requestLimit: 10000,
        stackAllItems: false,
    },
    setHost: true,
    maxHeaderSize: undefined,
    signal: undefined,
    enableUnixSockets: true,
};
const cloneInternals = (internals) => {
    const { hooks, retry } = internals;
    const result = {
        ...internals,
        context: { ...internals.context },
        cacheOptions: { ...internals.cacheOptions },
        https: { ...internals.https },
        agent: { ...internals.agent },
        headers: { ...internals.headers },
        retry: {
            ...retry,
            errorCodes: [...retry.errorCodes],
            methods: [...retry.methods],
            statusCodes: [...retry.statusCodes],
        },
        timeout: { ...internals.timeout },
        hooks: {
            init: [...hooks.init],
            beforeRequest: [...hooks.beforeRequest],
            beforeError: [...hooks.beforeError],
            beforeRedirect: [...hooks.beforeRedirect],
            beforeRetry: [...hooks.beforeRetry],
            afterResponse: [...hooks.afterResponse],
        },
        searchParams: internals.searchParams ? new external_node_url_namespaceObject.URLSearchParams(internals.searchParams) : undefined,
        pagination: { ...internals.pagination },
    };
    if (result.url !== undefined) {
        result.prefixUrl = '';
    }
    return result;
};
const cloneRaw = (raw) => {
    const { hooks, retry } = raw;
    const result = { ...raw };
    if (dist.object(raw.context)) {
        result.context = { ...raw.context };
    }
    if (dist.object(raw.cacheOptions)) {
        result.cacheOptions = { ...raw.cacheOptions };
    }
    if (dist.object(raw.https)) {
        result.https = { ...raw.https };
    }
    if (dist.object(raw.cacheOptions)) {
        result.cacheOptions = { ...result.cacheOptions };
    }
    if (dist.object(raw.agent)) {
        result.agent = { ...raw.agent };
    }
    if (dist.object(raw.headers)) {
        result.headers = { ...raw.headers };
    }
    if (dist.object(retry)) {
        result.retry = { ...retry };
        if (dist.array(retry.errorCodes)) {
            result.retry.errorCodes = [...retry.errorCodes];
        }
        if (dist.array(retry.methods)) {
            result.retry.methods = [...retry.methods];
        }
        if (dist.array(retry.statusCodes)) {
            result.retry.statusCodes = [...retry.statusCodes];
        }
    }
    if (dist.object(raw.timeout)) {
        result.timeout = { ...raw.timeout };
    }
    if (dist.object(hooks)) {
        result.hooks = {
            ...hooks,
        };
        if (dist.array(hooks.init)) {
            result.hooks.init = [...hooks.init];
        }
        if (dist.array(hooks.beforeRequest)) {
            result.hooks.beforeRequest = [...hooks.beforeRequest];
        }
        if (dist.array(hooks.beforeError)) {
            result.hooks.beforeError = [...hooks.beforeError];
        }
        if (dist.array(hooks.beforeRedirect)) {
            result.hooks.beforeRedirect = [...hooks.beforeRedirect];
        }
        if (dist.array(hooks.beforeRetry)) {
            result.hooks.beforeRetry = [...hooks.beforeRetry];
        }
        if (dist.array(hooks.afterResponse)) {
            result.hooks.afterResponse = [...hooks.afterResponse];
        }
    }
    // TODO: raw.searchParams
    if (dist.object(raw.pagination)) {
        result.pagination = { ...raw.pagination };
    }
    return result;
};
const getHttp2TimeoutOption = (internals) => {
    const delays = [internals.timeout.socket, internals.timeout.connect, internals.timeout.lookup, internals.timeout.request, internals.timeout.secureConnect].filter(delay => typeof delay === 'number');
    if (delays.length > 0) {
        return Math.min(...delays);
    }
    return undefined;
};
const init = (options, withOptions, self) => {
    const initHooks = options.hooks?.init;
    if (initHooks) {
        for (const hook of initHooks) {
            hook(withOptions, self);
        }
    }
};
class Options {
    constructor(input, options, defaults) {
        Object.defineProperty(this, "_unixOptions", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_internals", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_merging", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_init", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        assert.any([dist.string, dist.urlInstance, dist.object, dist.undefined], input);
        assert.any([dist.object, dist.undefined], options);
        assert.any([dist.object, dist.undefined], defaults);
        if (input instanceof Options || options instanceof Options) {
            throw new TypeError('The defaults must be passed as the third argument');
        }
        this._internals = cloneInternals(defaults?._internals ?? defaults ?? defaultInternals);
        this._init = [...(defaults?._init ?? [])];
        this._merging = false;
        this._unixOptions = undefined;
        // This rule allows `finally` to be considered more important.
        // Meaning no matter the error thrown in the `try` block,
        // if `finally` throws then the `finally` error will be thrown.
        //
        // Yes, we want this. If we set `url` first, then the `url.searchParams`
        // would get merged. Instead we set the `searchParams` first, then
        // `url.searchParams` is overwritten as expected.
        //
        /* eslint-disable no-unsafe-finally */
        try {
            if (dist.plainObject(input)) {
                try {
                    this.merge(input);
                    this.merge(options);
                }
                finally {
                    this.url = input.url;
                }
            }
            else {
                try {
                    this.merge(options);
                }
                finally {
                    if (options?.url !== undefined) {
                        if (input === undefined) {
                            this.url = options.url;
                        }
                        else {
                            throw new TypeError('The `url` option is mutually exclusive with the `input` argument');
                        }
                    }
                    else if (input !== undefined) {
                        this.url = input;
                    }
                }
            }
        }
        catch (error) {
            error.options = this;
            throw error;
        }
        /* eslint-enable no-unsafe-finally */
    }
    merge(options) {
        if (!options) {
            return;
        }
        if (options instanceof Options) {
            for (const init of options._init) {
                this.merge(init);
            }
            return;
        }
        options = cloneRaw(options);
        init(this, options, this);
        init(options, options, this);
        this._merging = true;
        // Always merge `isStream` first
        if ('isStream' in options) {
            this.isStream = options.isStream;
        }
        try {
            let push = false;
            for (const key in options) {
                // `got.extend()` options
                if (key === 'mutableDefaults' || key === 'handlers') {
                    continue;
                }
                // Never merge `url`
                if (key === 'url') {
                    continue;
                }
                if (!(key in this)) {
                    throw new Error(`Unexpected option: ${key}`);
                }
                // @ts-expect-error Type 'unknown' is not assignable to type 'never'.
                this[key] = options[key];
                push = true;
            }
            if (push) {
                this._init.push(options);
            }
        }
        finally {
            this._merging = false;
        }
    }
    /**
    Custom request function.
    The main purpose of this is to [support HTTP2 using a wrapper](https://github.com/szmarczak/http2-wrapper).

    @default http.request | https.request
    */
    get request() {
        return this._internals.request;
    }
    set request(value) {
        assert.any([dist.function_, dist.undefined], value);
        this._internals.request = value;
    }
    /**
    An object representing `http`, `https` and `http2` keys for [`http.Agent`](https://nodejs.org/api/http.html#http_class_http_agent), [`https.Agent`](https://nodejs.org/api/https.html#https_class_https_agent) and [`http2wrapper.Agent`](https://github.com/szmarczak/http2-wrapper#new-http2agentoptions) instance.
    This is necessary because a request to one protocol might redirect to another.
    In such a scenario, Got will switch over to the right protocol agent for you.

    If a key is not present, it will default to a global agent.

    @example
    ```
    import got from 'got';
    import HttpAgent from 'agentkeepalive';

    const {HttpsAgent} = HttpAgent;

    await got('https://sindresorhus.com', {
        agent: {
            http: new HttpAgent(),
            https: new HttpsAgent()
        }
    });
    ```
    */
    get agent() {
        return this._internals.agent;
    }
    set agent(value) {
        assert.plainObject(value);
        // eslint-disable-next-line guard-for-in
        for (const key in value) {
            if (!(key in this._internals.agent)) {
                throw new TypeError(`Unexpected agent option: ${key}`);
            }
            assert.any([dist.object, dist.undefined], value[key]);
        }
        if (this._merging) {
            Object.assign(this._internals.agent, value);
        }
        else {
            this._internals.agent = { ...value };
        }
    }
    get h2session() {
        return this._internals.h2session;
    }
    set h2session(value) {
        this._internals.h2session = value;
    }
    /**
    Decompress the response automatically.

    This will set the `accept-encoding` header to `gzip, deflate, br` unless you set it yourself.

    If this is disabled, a compressed response is returned as a `Buffer`.
    This may be useful if you want to handle decompression yourself or stream the raw compressed data.

    @default true
    */
    get decompress() {
        return this._internals.decompress;
    }
    set decompress(value) {
        assert.boolean(value);
        this._internals.decompress = value;
    }
    /**
    Milliseconds to wait for the server to end the response before aborting the request with `got.TimeoutError` error (a.k.a. `request` property).
    By default, there's no timeout.

    This also accepts an `object` with the following fields to constrain the duration of each phase of the request lifecycle:

    - `lookup` starts when a socket is assigned and ends when the hostname has been resolved.
        Does not apply when using a Unix domain socket.
    - `connect` starts when `lookup` completes (or when the socket is assigned if lookup does not apply to the request) and ends when the socket is connected.
    - `secureConnect` starts when `connect` completes and ends when the handshaking process completes (HTTPS only).
    - `socket` starts when the socket is connected. See [request.setTimeout](https://nodejs.org/api/http.html#http_request_settimeout_timeout_callback).
    - `response` starts when the request has been written to the socket and ends when the response headers are received.
    - `send` starts when the socket is connected and ends with the request has been written to the socket.
    - `request` starts when the request is initiated and ends when the response's end event fires.
    */
    get timeout() {
        // We always return `Delays` here.
        // It has to be `Delays | number`, otherwise TypeScript will error because the getter and the setter have incompatible types.
        return this._internals.timeout;
    }
    set timeout(value) {
        assert.plainObject(value);
        // eslint-disable-next-line guard-for-in
        for (const key in value) {
            if (!(key in this._internals.timeout)) {
                throw new Error(`Unexpected timeout option: ${key}`);
            }
            assert.any([dist.number, dist.undefined], value[key]);
        }
        if (this._merging) {
            Object.assign(this._internals.timeout, value);
        }
        else {
            this._internals.timeout = { ...value };
        }
    }
    /**
    When specified, `prefixUrl` will be prepended to `url`.
    The prefix can be any valid URL, either relative or absolute.
    A trailing slash `/` is optional - one will be added automatically.

    __Note__: `prefixUrl` will be ignored if the `url` argument is a URL instance.

    __Note__: Leading slashes in `input` are disallowed when using this option to enforce consistency and avoid confusion.
    For example, when the prefix URL is `https://example.com/foo` and the input is `/bar`, there's ambiguity whether the resulting URL would become `https://example.com/foo/bar` or `https://example.com/bar`.
    The latter is used by browsers.

    __Tip__: Useful when used with `got.extend()` to create niche-specific Got instances.

    __Tip__: You can change `prefixUrl` using hooks as long as the URL still includes the `prefixUrl`.
    If the URL doesn't include it anymore, it will throw.

    @example
    ```
    import got from 'got';

    await got('unicorn', {prefixUrl: 'https://cats.com'});
    //=> 'https://cats.com/unicorn'

    const instance = got.extend({
        prefixUrl: 'https://google.com'
    });

    await instance('unicorn', {
        hooks: {
            beforeRequest: [
                options => {
                    options.prefixUrl = 'https://cats.com';
                }
            ]
        }
    });
    //=> 'https://cats.com/unicorn'
    ```
    */
    get prefixUrl() {
        // We always return `string` here.
        // It has to be `string | URL`, otherwise TypeScript will error because the getter and the setter have incompatible types.
        return this._internals.prefixUrl;
    }
    set prefixUrl(value) {
        assert.any([dist.string, dist.urlInstance], value);
        if (value === '') {
            this._internals.prefixUrl = '';
            return;
        }
        value = value.toString();
        if (!value.endsWith('/')) {
            value += '/';
        }
        if (this._internals.prefixUrl && this._internals.url) {
            const { href } = this._internals.url;
            this._internals.url.href = value + href.slice(this._internals.prefixUrl.length);
        }
        this._internals.prefixUrl = value;
    }
    /**
    __Note #1__: The `body` option cannot be used with the `json` or `form` option.

    __Note #2__: If you provide this option, `got.stream()` will be read-only.

    __Note #3__: If you provide a payload with the `GET` or `HEAD` method, it will throw a `TypeError` unless the method is `GET` and the `allowGetBody` option is set to `true`.

    __Note #4__: This option is not enumerable and will not be merged with the instance defaults.

    The `content-length` header will be automatically set if `body` is a `string` / `Buffer` / [`FormData`](https://developer.mozilla.org/en-US/docs/Web/API/FormData) / [`form-data` instance](https://github.com/form-data/form-data), and `content-length` and `transfer-encoding` are not manually set in `options.headers`.

    Since Got 12, the `content-length` is not automatically set when `body` is a `fs.createReadStream`.
    */
    get body() {
        return this._internals.body;
    }
    set body(value) {
        assert.any([dist.string, dist.buffer, dist.nodeStream, dist.generator, dist.asyncGenerator, isFormData, dist.undefined], value);
        if (dist.nodeStream(value)) {
            assert.truthy(value.readable);
        }
        if (value !== undefined) {
            assert.undefined(this._internals.form);
            assert.undefined(this._internals.json);
        }
        this._internals.body = value;
    }
    /**
    The form body is converted to a query string using [`(new URLSearchParams(object)).toString()`](https://nodejs.org/api/url.html#url_constructor_new_urlsearchparams_obj).

    If the `Content-Type` header is not present, it will be set to `application/x-www-form-urlencoded`.

    __Note #1__: If you provide this option, `got.stream()` will be read-only.

    __Note #2__: This option is not enumerable and will not be merged with the instance defaults.
    */
    get form() {
        return this._internals.form;
    }
    set form(value) {
        assert.any([dist.plainObject, dist.undefined], value);
        if (value !== undefined) {
            assert.undefined(this._internals.body);
            assert.undefined(this._internals.json);
        }
        this._internals.form = value;
    }
    /**
    JSON body. If the `Content-Type` header is not set, it will be set to `application/json`.

    __Note #1__: If you provide this option, `got.stream()` will be read-only.

    __Note #2__: This option is not enumerable and will not be merged with the instance defaults.
    */
    get json() {
        return this._internals.json;
    }
    set json(value) {
        if (value !== undefined) {
            assert.undefined(this._internals.body);
            assert.undefined(this._internals.form);
        }
        this._internals.json = value;
    }
    /**
    The URL to request, as a string, a [`https.request` options object](https://nodejs.org/api/https.html#https_https_request_options_callback), or a [WHATWG `URL`](https://nodejs.org/api/url.html#url_class_url).

    Properties from `options` will override properties in the parsed `url`.

    If no protocol is specified, it will throw a `TypeError`.

    __Note__: The query string is **not** parsed as search params.

    @example
    ```
    await got('https://example.com/?query=a b'); //=> https://example.com/?query=a%20b
    await got('https://example.com/', {searchParams: {query: 'a b'}}); //=> https://example.com/?query=a+b

    // The query string is overridden by `searchParams`
    await got('https://example.com/?query=a b', {searchParams: {query: 'a b'}}); //=> https://example.com/?query=a+b
    ```
    */
    get url() {
        return this._internals.url;
    }
    set url(value) {
        assert.any([dist.string, dist.urlInstance, dist.undefined], value);
        if (value === undefined) {
            this._internals.url = undefined;
            return;
        }
        if (dist.string(value) && value.startsWith('/')) {
            throw new Error('`url` must not start with a slash');
        }
        const urlString = `${this.prefixUrl}${value.toString()}`;
        const url = new external_node_url_namespaceObject.URL(urlString);
        this._internals.url = url;
        decodeURI(urlString);
        if (url.protocol === 'unix:') {
            url.href = `http://unix${url.pathname}${url.search}`;
        }
        if (url.protocol !== 'http:' && url.protocol !== 'https:') {
            const error = new Error(`Unsupported protocol: ${url.protocol}`);
            error.code = 'ERR_UNSUPPORTED_PROTOCOL';
            throw error;
        }
        if (this._internals.username) {
            url.username = this._internals.username;
            this._internals.username = '';
        }
        if (this._internals.password) {
            url.password = this._internals.password;
            this._internals.password = '';
        }
        if (this._internals.searchParams) {
            url.search = this._internals.searchParams.toString();
            this._internals.searchParams = undefined;
        }
        if (url.hostname === 'unix') {
            if (!this._internals.enableUnixSockets) {
                throw new Error('Using UNIX domain sockets but option `enableUnixSockets` is not enabled');
            }
            const matches = /(?<socketPath>.+?):(?<path>.+)/.exec(`${url.pathname}${url.search}`);
            if (matches?.groups) {
                const { socketPath, path } = matches.groups;
                this._unixOptions = {
                    socketPath,
                    path,
                    host: '',
                };
            }
            else {
                this._unixOptions = undefined;
            }
            return;
        }
        this._unixOptions = undefined;
    }
    /**
    Cookie support. You don't have to care about parsing or how to store them.

    __Note__: If you provide this option, `options.headers.cookie` will be overridden.
    */
    get cookieJar() {
        return this._internals.cookieJar;
    }
    set cookieJar(value) {
        assert.any([dist.object, dist.undefined], value);
        if (value === undefined) {
            this._internals.cookieJar = undefined;
            return;
        }
        let { setCookie, getCookieString } = value;
        assert.function_(setCookie);
        assert.function_(getCookieString);
        /* istanbul ignore next: Horrible `tough-cookie` v3 check */
        if (setCookie.length === 4 && getCookieString.length === 0) {
            setCookie = (0,external_node_util_namespaceObject.promisify)(setCookie.bind(value));
            getCookieString = (0,external_node_util_namespaceObject.promisify)(getCookieString.bind(value));
            this._internals.cookieJar = {
                setCookie,
                getCookieString: getCookieString,
            };
        }
        else {
            this._internals.cookieJar = value;
        }
    }
    /**
    You can abort the `request` using [`AbortController`](https://developer.mozilla.org/en-US/docs/Web/API/AbortController).

    *Requires Node.js 16 or later.*

    @example
    ```
    import got from 'got';

    const abortController = new AbortController();

    const request = got('https://httpbin.org/anything', {
        signal: abortController.signal
    });

    setTimeout(() => {
        abortController.abort();
    }, 100);
    ```
    */
    // TODO: Replace `any` with `AbortSignal` when targeting Node 16.
    get signal() {
        return this._internals.signal;
    }
    // TODO: Replace `any` with `AbortSignal` when targeting Node 16.
    set signal(value) {
        assert.object(value);
        this._internals.signal = value;
    }
    /**
    Ignore invalid cookies instead of throwing an error.
    Only useful when the `cookieJar` option has been set. Not recommended.

    @default false
    */
    get ignoreInvalidCookies() {
        return this._internals.ignoreInvalidCookies;
    }
    set ignoreInvalidCookies(value) {
        assert.boolean(value);
        this._internals.ignoreInvalidCookies = value;
    }
    /**
    Query string that will be added to the request URL.
    This will override the query string in `url`.

    If you need to pass in an array, you can do it using a `URLSearchParams` instance.

    @example
    ```
    import got from 'got';

    const searchParams = new URLSearchParams([['key', 'a'], ['key', 'b']]);

    await got('https://example.com', {searchParams});

    console.log(searchParams.toString());
    //=> 'key=a&key=b'
    ```
    */
    get searchParams() {
        if (this._internals.url) {
            return this._internals.url.searchParams;
        }
        if (this._internals.searchParams === undefined) {
            this._internals.searchParams = new external_node_url_namespaceObject.URLSearchParams();
        }
        return this._internals.searchParams;
    }
    set searchParams(value) {
        assert.any([dist.string, dist.object, dist.undefined], value);
        const url = this._internals.url;
        if (value === undefined) {
            this._internals.searchParams = undefined;
            if (url) {
                url.search = '';
            }
            return;
        }
        const searchParameters = this.searchParams;
        let updated;
        if (dist.string(value)) {
            updated = new external_node_url_namespaceObject.URLSearchParams(value);
        }
        else if (value instanceof external_node_url_namespaceObject.URLSearchParams) {
            updated = value;
        }
        else {
            validateSearchParameters(value);
            updated = new external_node_url_namespaceObject.URLSearchParams();
            // eslint-disable-next-line guard-for-in
            for (const key in value) {
                const entry = value[key];
                if (entry === null) {
                    updated.append(key, '');
                }
                else if (entry === undefined) {
                    searchParameters.delete(key);
                }
                else {
                    updated.append(key, entry);
                }
            }
        }
        if (this._merging) {
            // These keys will be replaced
            for (const key of updated.keys()) {
                searchParameters.delete(key);
            }
            for (const [key, value] of updated) {
                searchParameters.append(key, value);
            }
        }
        else if (url) {
            url.search = searchParameters.toString();
        }
        else {
            this._internals.searchParams = searchParameters;
        }
    }
    get searchParameters() {
        throw new Error('The `searchParameters` option does not exist. Use `searchParams` instead.');
    }
    set searchParameters(_value) {
        throw new Error('The `searchParameters` option does not exist. Use `searchParams` instead.');
    }
    get dnsLookup() {
        return this._internals.dnsLookup;
    }
    set dnsLookup(value) {
        assert.any([dist.function_, dist.undefined], value);
        this._internals.dnsLookup = value;
    }
    /**
    An instance of [`CacheableLookup`](https://github.com/szmarczak/cacheable-lookup) used for making DNS lookups.
    Useful when making lots of requests to different *public* hostnames.

    `CacheableLookup` uses `dns.resolver4(..)` and `dns.resolver6(...)` under the hood and fall backs to `dns.lookup(...)` when the first two fail, which may lead to additional delay.

    __Note__: This should stay disabled when making requests to internal hostnames such as `localhost`, `database.local` etc.

    @default false
    */
    get dnsCache() {
        return this._internals.dnsCache;
    }
    set dnsCache(value) {
        assert.any([dist.object, dist.boolean, dist.undefined], value);
        if (value === true) {
            this._internals.dnsCache = getGlobalDnsCache();
        }
        else if (value === false) {
            this._internals.dnsCache = undefined;
        }
        else {
            this._internals.dnsCache = value;
        }
    }
    /**
    User data. `context` is shallow merged and enumerable. If it contains non-enumerable properties they will NOT be merged.

    @example
    ```
    import got from 'got';

    const instance = got.extend({
        hooks: {
            beforeRequest: [
                options => {
                    if (!options.context || !options.context.token) {
                        throw new Error('Token required');
                    }

                    options.headers.token = options.context.token;
                }
            ]
        }
    });

    const context = {
        token: 'secret'
    };

    const response = await instance('https://httpbin.org/headers', {context});

    // Let's see the headers
    console.log(response.body);
    ```
    */
    get context() {
        return this._internals.context;
    }
    set context(value) {
        assert.object(value);
        if (this._merging) {
            Object.assign(this._internals.context, value);
        }
        else {
            this._internals.context = { ...value };
        }
    }
    /**
    Hooks allow modifications during the request lifecycle.
    Hook functions may be async and are run serially.
    */
    get hooks() {
        return this._internals.hooks;
    }
    set hooks(value) {
        assert.object(value);
        // eslint-disable-next-line guard-for-in
        for (const knownHookEvent in value) {
            if (!(knownHookEvent in this._internals.hooks)) {
                throw new Error(`Unexpected hook event: ${knownHookEvent}`);
            }
            const typedKnownHookEvent = knownHookEvent;
            const typedValue = value;
            const hooks = typedValue[typedKnownHookEvent];
            assert.any([dist.array, dist.undefined], hooks);
            if (hooks) {
                for (const hook of hooks) {
                    assert.function_(hook);
                }
            }
            if (this._merging) {
                if (hooks) {
                    // @ts-expect-error FIXME
                    this._internals.hooks[typedKnownHookEvent].push(...hooks);
                }
            }
            else {
                if (!hooks) {
                    throw new Error(`Missing hook event: ${knownHookEvent}`);
                }
                // @ts-expect-error FIXME
                this._internals.hooks[knownHookEvent] = [...hooks];
            }
        }
    }
    /**
    Defines if redirect responses should be followed automatically.

    Note that if a `303` is sent by the server in response to any request type (`POST`, `DELETE`, etc.), Got will automatically request the resource pointed to in the location header via `GET`.
    This is in accordance with [the spec](https://tools.ietf.org/html/rfc7231#section-6.4.4).

    @default true
    */
    get followRedirect() {
        return this._internals.followRedirect;
    }
    set followRedirect(value) {
        assert.boolean(value);
        this._internals.followRedirect = value;
    }
    get followRedirects() {
        throw new TypeError('The `followRedirects` option does not exist. Use `followRedirect` instead.');
    }
    set followRedirects(_value) {
        throw new TypeError('The `followRedirects` option does not exist. Use `followRedirect` instead.');
    }
    /**
    If exceeded, the request will be aborted and a `MaxRedirectsError` will be thrown.

    @default 10
    */
    get maxRedirects() {
        return this._internals.maxRedirects;
    }
    set maxRedirects(value) {
        assert.number(value);
        this._internals.maxRedirects = value;
    }
    /**
    A cache adapter instance for storing cached response data.

    @default false
    */
    get cache() {
        return this._internals.cache;
    }
    set cache(value) {
        assert.any([dist.object, dist.string, dist.boolean, dist.undefined], value);
        if (value === true) {
            this._internals.cache = globalCache;
        }
        else if (value === false) {
            this._internals.cache = undefined;
        }
        else {
            this._internals.cache = value;
        }
    }
    /**
    Determines if a `got.HTTPError` is thrown for unsuccessful responses.

    If this is disabled, requests that encounter an error status code will be resolved with the `response` instead of throwing.
    This may be useful if you are checking for resource availability and are expecting error responses.

    @default true
    */
    get throwHttpErrors() {
        return this._internals.throwHttpErrors;
    }
    set throwHttpErrors(value) {
        assert.boolean(value);
        this._internals.throwHttpErrors = value;
    }
    get username() {
        const url = this._internals.url;
        const value = url ? url.username : this._internals.username;
        return decodeURIComponent(value);
    }
    set username(value) {
        assert.string(value);
        const url = this._internals.url;
        const fixedValue = encodeURIComponent(value);
        if (url) {
            url.username = fixedValue;
        }
        else {
            this._internals.username = fixedValue;
        }
    }
    get password() {
        const url = this._internals.url;
        const value = url ? url.password : this._internals.password;
        return decodeURIComponent(value);
    }
    set password(value) {
        assert.string(value);
        const url = this._internals.url;
        const fixedValue = encodeURIComponent(value);
        if (url) {
            url.password = fixedValue;
        }
        else {
            this._internals.password = fixedValue;
        }
    }
    /**
    If set to `true`, Got will additionally accept HTTP2 requests.

    It will choose either HTTP/1.1 or HTTP/2 depending on the ALPN protocol.

    __Note__: This option requires Node.js 15.10.0 or newer as HTTP/2 support on older Node.js versions is very buggy.

    __Note__: Overriding `options.request` will disable HTTP2 support.

    @default false

    @example
    ```
    import got from 'got';

    const {headers} = await got('https://nghttp2.org/httpbin/anything', {http2: true});

    console.log(headers.via);
    //=> '2 nghttpx'
    ```
    */
    get http2() {
        return this._internals.http2;
    }
    set http2(value) {
        assert.boolean(value);
        this._internals.http2 = value;
    }
    /**
    Set this to `true` to allow sending body for the `GET` method.
    However, the [HTTP/2 specification](https://tools.ietf.org/html/rfc7540#section-8.1.3) says that `An HTTP GET request includes request header fields and no payload body`, therefore when using the HTTP/2 protocol this option will have no effect.
    This option is only meant to interact with non-compliant servers when you have no other choice.

    __Note__: The [RFC 7321](https://tools.ietf.org/html/rfc7231#section-4.3.1) doesn't specify any particular behavior for the GET method having a payload, therefore __it's considered an [anti-pattern](https://en.wikipedia.org/wiki/Anti-pattern)__.

    @default false
    */
    get allowGetBody() {
        return this._internals.allowGetBody;
    }
    set allowGetBody(value) {
        assert.boolean(value);
        this._internals.allowGetBody = value;
    }
    /**
    Request headers.

    Existing headers will be overwritten. Headers set to `undefined` will be omitted.

    @default {}
    */
    get headers() {
        return this._internals.headers;
    }
    set headers(value) {
        assert.plainObject(value);
        if (this._merging) {
            Object.assign(this._internals.headers, lowercaseKeys(value));
        }
        else {
            this._internals.headers = lowercaseKeys(value);
        }
    }
    /**
    Specifies if the redirects should be [rewritten as `GET`](https://tools.ietf.org/html/rfc7231#section-6.4).

    If `false`, when sending a POST request and receiving a `302`, it will resend the body to the new location using the same HTTP method (`POST` in this case).

    @default false
    */
    get methodRewriting() {
        return this._internals.methodRewriting;
    }
    set methodRewriting(value) {
        assert.boolean(value);
        this._internals.methodRewriting = value;
    }
    /**
    Indicates which DNS record family to use.

    Values:
    - `undefined`: IPv4 (if present) or IPv6
    - `4`: Only IPv4
    - `6`: Only IPv6

    @default undefined
    */
    get dnsLookupIpVersion() {
        return this._internals.dnsLookupIpVersion;
    }
    set dnsLookupIpVersion(value) {
        if (value !== undefined && value !== 4 && value !== 6) {
            throw new TypeError(`Invalid DNS lookup IP version: ${value}`);
        }
        this._internals.dnsLookupIpVersion = value;
    }
    /**
    A function used to parse JSON responses.

    @example
    ```
    import got from 'got';
    import Bourne from '@hapi/bourne';

    const parsed = await got('https://example.com', {
        parseJson: text => Bourne.parse(text)
    }).json();

    console.log(parsed);
    ```
    */
    get parseJson() {
        return this._internals.parseJson;
    }
    set parseJson(value) {
        assert.function_(value);
        this._internals.parseJson = value;
    }
    /**
    A function used to stringify the body of JSON requests.

    @example
    ```
    import got from 'got';

    await got.post('https://example.com', {
        stringifyJson: object => JSON.stringify(object, (key, value) => {
            if (key.startsWith('_')) {
                return;
            }

            return value;
        }),
        json: {
            some: 'payload',
            _ignoreMe: 1234
        }
    });
    ```

    @example
    ```
    import got from 'got';

    await got.post('https://example.com', {
        stringifyJson: object => JSON.stringify(object, (key, value) => {
            if (typeof value === 'number') {
                return value.toString();
            }

            return value;
        }),
        json: {
            some: 'payload',
            number: 1
        }
    });
    ```
    */
    get stringifyJson() {
        return this._internals.stringifyJson;
    }
    set stringifyJson(value) {
        assert.function_(value);
        this._internals.stringifyJson = value;
    }
    /**
    An object representing `limit`, `calculateDelay`, `methods`, `statusCodes`, `maxRetryAfter` and `errorCodes` fields for maximum retry count, retry handler, allowed methods, allowed status codes, maximum [`Retry-After`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Retry-After) time and allowed error codes.

    Delays between retries counts with function `1000 * Math.pow(2, retry) + Math.random() * 100`, where `retry` is attempt number (starts from 1).

    The `calculateDelay` property is a `function` that receives an object with `attemptCount`, `retryOptions`, `error` and `computedValue` properties for current retry count, the retry options, error and default computed value.
    The function must return a delay in milliseconds (or a Promise resolving with it) (`0` return value cancels retry).

    By default, it retries *only* on the specified methods, status codes, and on these network errors:

    - `ETIMEDOUT`: One of the [timeout](#timeout) limits were reached.
    - `ECONNRESET`: Connection was forcibly closed by a peer.
    - `EADDRINUSE`: Could not bind to any free port.
    - `ECONNREFUSED`: Connection was refused by the server.
    - `EPIPE`: The remote side of the stream being written has been closed.
    - `ENOTFOUND`: Couldn't resolve the hostname to an IP address.
    - `ENETUNREACH`: No internet connection.
    - `EAI_AGAIN`: DNS lookup timed out.

    __Note__: If `maxRetryAfter` is set to `undefined`, it will use `options.timeout`.
    __Note__: If [`Retry-After`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Retry-After) header is greater than `maxRetryAfter`, it will cancel the request.
    */
    get retry() {
        return this._internals.retry;
    }
    set retry(value) {
        assert.plainObject(value);
        assert.any([dist.function_, dist.undefined], value.calculateDelay);
        assert.any([dist.number, dist.undefined], value.maxRetryAfter);
        assert.any([dist.number, dist.undefined], value.limit);
        assert.any([dist.array, dist.undefined], value.methods);
        assert.any([dist.array, dist.undefined], value.statusCodes);
        assert.any([dist.array, dist.undefined], value.errorCodes);
        assert.any([dist.number, dist.undefined], value.noise);
        if (value.noise && Math.abs(value.noise) > 100) {
            throw new Error(`The maximum acceptable retry noise is +/- 100ms, got ${value.noise}`);
        }
        for (const key in value) {
            if (!(key in this._internals.retry)) {
                throw new Error(`Unexpected retry option: ${key}`);
            }
        }
        if (this._merging) {
            Object.assign(this._internals.retry, value);
        }
        else {
            this._internals.retry = { ...value };
        }
        const { retry } = this._internals;
        retry.methods = [...new Set(retry.methods.map(method => method.toUpperCase()))];
        retry.statusCodes = [...new Set(retry.statusCodes)];
        retry.errorCodes = [...new Set(retry.errorCodes)];
    }
    /**
    From `http.RequestOptions`.

    The IP address used to send the request from.
    */
    get localAddress() {
        return this._internals.localAddress;
    }
    set localAddress(value) {
        assert.any([dist.string, dist.undefined], value);
        this._internals.localAddress = value;
    }
    /**
    The HTTP method used to make the request.

    @default 'GET'
    */
    get method() {
        return this._internals.method;
    }
    set method(value) {
        assert.string(value);
        this._internals.method = value.toUpperCase();
    }
    get createConnection() {
        return this._internals.createConnection;
    }
    set createConnection(value) {
        assert.any([dist.function_, dist.undefined], value);
        this._internals.createConnection = value;
    }
    /**
    From `http-cache-semantics`

    @default {}
    */
    get cacheOptions() {
        return this._internals.cacheOptions;
    }
    set cacheOptions(value) {
        assert.plainObject(value);
        assert.any([dist.boolean, dist.undefined], value.shared);
        assert.any([dist.number, dist.undefined], value.cacheHeuristic);
        assert.any([dist.number, dist.undefined], value.immutableMinTimeToLive);
        assert.any([dist.boolean, dist.undefined], value.ignoreCargoCult);
        for (const key in value) {
            if (!(key in this._internals.cacheOptions)) {
                throw new Error(`Cache option \`${key}\` does not exist`);
            }
        }
        if (this._merging) {
            Object.assign(this._internals.cacheOptions, value);
        }
        else {
            this._internals.cacheOptions = { ...value };
        }
    }
    /**
    Options for the advanced HTTPS API.
    */
    get https() {
        return this._internals.https;
    }
    set https(value) {
        assert.plainObject(value);
        assert.any([dist.boolean, dist.undefined], value.rejectUnauthorized);
        assert.any([dist.function_, dist.undefined], value.checkServerIdentity);
        assert.any([dist.string, dist.object, dist.array, dist.undefined], value.certificateAuthority);
        assert.any([dist.string, dist.object, dist.array, dist.undefined], value.key);
        assert.any([dist.string, dist.object, dist.array, dist.undefined], value.certificate);
        assert.any([dist.string, dist.undefined], value.passphrase);
        assert.any([dist.string, dist.buffer, dist.array, dist.undefined], value.pfx);
        assert.any([dist.array, dist.undefined], value.alpnProtocols);
        assert.any([dist.string, dist.undefined], value.ciphers);
        assert.any([dist.string, dist.buffer, dist.undefined], value.dhparam);
        assert.any([dist.string, dist.undefined], value.signatureAlgorithms);
        assert.any([dist.string, dist.undefined], value.minVersion);
        assert.any([dist.string, dist.undefined], value.maxVersion);
        assert.any([dist.boolean, dist.undefined], value.honorCipherOrder);
        assert.any([dist.number, dist.undefined], value.tlsSessionLifetime);
        assert.any([dist.string, dist.undefined], value.ecdhCurve);
        assert.any([dist.string, dist.buffer, dist.array, dist.undefined], value.certificateRevocationLists);
        for (const key in value) {
            if (!(key in this._internals.https)) {
                throw new Error(`HTTPS option \`${key}\` does not exist`);
            }
        }
        if (this._merging) {
            Object.assign(this._internals.https, value);
        }
        else {
            this._internals.https = { ...value };
        }
    }
    /**
    [Encoding](https://nodejs.org/api/buffer.html#buffer_buffers_and_character_encodings) to be used on `setEncoding` of the response data.

    To get a [`Buffer`](https://nodejs.org/api/buffer.html), you need to set `responseType` to `buffer` instead.
    Don't set this option to `null`.

    __Note__: This doesn't affect streams! Instead, you need to do `got.stream(...).setEncoding(encoding)`.

    @default 'utf-8'
    */
    get encoding() {
        return this._internals.encoding;
    }
    set encoding(value) {
        if (value === null) {
            throw new TypeError('To get a Buffer, set `options.responseType` to `buffer` instead');
        }
        assert.any([dist.string, dist.undefined], value);
        this._internals.encoding = value;
    }
    /**
    When set to `true` the promise will return the Response body instead of the Response object.

    @default false
    */
    get resolveBodyOnly() {
        return this._internals.resolveBodyOnly;
    }
    set resolveBodyOnly(value) {
        assert.boolean(value);
        this._internals.resolveBodyOnly = value;
    }
    /**
    Returns a `Stream` instead of a `Promise`.
    This is equivalent to calling `got.stream(url, options?)`.

    @default false
    */
    get isStream() {
        return this._internals.isStream;
    }
    set isStream(value) {
        assert.boolean(value);
        this._internals.isStream = value;
    }
    /**
    The parsing method.

    The promise also has `.text()`, `.json()` and `.buffer()` methods which return another Got promise for the parsed body.

    It's like setting the options to `{responseType: 'json', resolveBodyOnly: true}` but without affecting the main Got promise.

    __Note__: When using streams, this option is ignored.

    @example
    ```
    const responsePromise = got(url);
    const bufferPromise = responsePromise.buffer();
    const jsonPromise = responsePromise.json();

    const [response, buffer, json] = Promise.all([responsePromise, bufferPromise, jsonPromise]);
    // `response` is an instance of Got Response
    // `buffer` is an instance of Buffer
    // `json` is an object
    ```

    @example
    ```
    // This
    const body = await got(url).json();

    // is semantically the same as this
    const body = await got(url, {responseType: 'json', resolveBodyOnly: true});
    ```
    */
    get responseType() {
        return this._internals.responseType;
    }
    set responseType(value) {
        if (value === undefined) {
            this._internals.responseType = 'text';
            return;
        }
        if (value !== 'text' && value !== 'buffer' && value !== 'json') {
            throw new Error(`Invalid \`responseType\` option: ${value}`);
        }
        this._internals.responseType = value;
    }
    get pagination() {
        return this._internals.pagination;
    }
    set pagination(value) {
        assert.object(value);
        if (this._merging) {
            Object.assign(this._internals.pagination, value);
        }
        else {
            this._internals.pagination = value;
        }
    }
    get auth() {
        throw new Error('Parameter `auth` is deprecated. Use `username` / `password` instead.');
    }
    set auth(_value) {
        throw new Error('Parameter `auth` is deprecated. Use `username` / `password` instead.');
    }
    get setHost() {
        return this._internals.setHost;
    }
    set setHost(value) {
        assert.boolean(value);
        this._internals.setHost = value;
    }
    get maxHeaderSize() {
        return this._internals.maxHeaderSize;
    }
    set maxHeaderSize(value) {
        assert.any([dist.number, dist.undefined], value);
        this._internals.maxHeaderSize = value;
    }
    get enableUnixSockets() {
        return this._internals.enableUnixSockets;
    }
    set enableUnixSockets(value) {
        assert.boolean(value);
        this._internals.enableUnixSockets = value;
    }
    // eslint-disable-next-line @typescript-eslint/naming-convention
    toJSON() {
        return { ...this._internals };
    }
    [Symbol.for('nodejs.util.inspect.custom')](_depth, options) {
        return (0,external_node_util_namespaceObject.inspect)(this._internals, options);
    }
    createNativeRequestOptions() {
        const internals = this._internals;
        const url = internals.url;
        let agent;
        if (url.protocol === 'https:') {
            agent = internals.http2 ? internals.agent : internals.agent.https;
        }
        else {
            agent = internals.agent.http;
        }
        const { https } = internals;
        let { pfx } = https;
        if (dist.array(pfx) && dist.plainObject(pfx[0])) {
            pfx = pfx.map(object => ({
                buf: object.buffer,
                passphrase: object.passphrase,
            }));
        }
        return {
            ...internals.cacheOptions,
            ...this._unixOptions,
            // HTTPS options
            // eslint-disable-next-line @typescript-eslint/naming-convention
            ALPNProtocols: https.alpnProtocols,
            ca: https.certificateAuthority,
            cert: https.certificate,
            key: https.key,
            passphrase: https.passphrase,
            pfx: https.pfx,
            rejectUnauthorized: https.rejectUnauthorized,
            checkServerIdentity: https.checkServerIdentity ?? external_node_tls_namespaceObject.checkServerIdentity,
            ciphers: https.ciphers,
            honorCipherOrder: https.honorCipherOrder,
            minVersion: https.minVersion,
            maxVersion: https.maxVersion,
            sigalgs: https.signatureAlgorithms,
            sessionTimeout: https.tlsSessionLifetime,
            dhparam: https.dhparam,
            ecdhCurve: https.ecdhCurve,
            crl: https.certificateRevocationLists,
            // HTTP options
            lookup: internals.dnsLookup ?? internals.dnsCache?.lookup,
            family: internals.dnsLookupIpVersion,
            agent,
            setHost: internals.setHost,
            method: internals.method,
            maxHeaderSize: internals.maxHeaderSize,
            localAddress: internals.localAddress,
            headers: internals.headers,
            createConnection: internals.createConnection,
            timeout: internals.http2 ? getHttp2TimeoutOption(internals) : undefined,
            // HTTP/2 options
            h2session: internals.h2session,
        };
    }
    getRequestFunction() {
        const url = this._internals.url;
        const { request } = this._internals;
        if (!request && url) {
            return this.getFallbackRequestFunction();
        }
        return request;
    }
    getFallbackRequestFunction() {
        const url = this._internals.url;
        if (!url) {
            return;
        }
        if (url.protocol === 'https:') {
            if (this._internals.http2) {
                if (major < 15 || (major === 15 && minor < 10)) {
                    const error = new Error('To use the `http2` option, install Node.js 15.10.0 or above');
                    error.code = 'EUNSUPPORTED';
                    throw error;
                }
                return http2_wrapper_source.auto;
            }
            return external_node_https_namespaceObject.request;
        }
        return external_node_http_namespaceObject.request;
    }
    freeze() {
        const options = this._internals;
        Object.freeze(options);
        Object.freeze(options.hooks);
        Object.freeze(options.hooks.afterResponse);
        Object.freeze(options.hooks.beforeError);
        Object.freeze(options.hooks.beforeRedirect);
        Object.freeze(options.hooks.beforeRequest);
        Object.freeze(options.hooks.beforeRetry);
        Object.freeze(options.hooks.init);
        Object.freeze(options.https);
        Object.freeze(options.cacheOptions);
        Object.freeze(options.agent);
        Object.freeze(options.headers);
        Object.freeze(options.timeout);
        Object.freeze(options.retry);
        Object.freeze(options.retry.errorCodes);
        Object.freeze(options.retry.methods);
        Object.freeze(options.retry.statusCodes);
        Object.freeze(options.context);
    }
}

;// CONCATENATED MODULE: ./node_modules/app-base-v9/node_modules/got/dist/source/core/response.js

const isResponseOk = (response) => {
    const { statusCode } = response;
    const limitStatusCode = response.request.options.followRedirect ? 299 : 399;
    return (statusCode >= 200 && statusCode <= limitStatusCode) || statusCode === 304;
};
/**
An error to be thrown when server response code is 2xx, and parsing body fails.
Includes a `response` property.
*/
class ParseError extends RequestError {
    constructor(error, response) {
        const { options } = response.request;
        super(`${error.message} in "${options.url.toString()}"`, error, response.request);
        this.name = 'ParseError';
        this.code = 'ERR_BODY_PARSE_FAILURE';
    }
}
const parseBody = (response, responseType, parseJson, encoding) => {
    const { rawBody } = response;
    try {
        if (responseType === 'text') {
            return rawBody.toString(encoding);
        }
        if (responseType === 'json') {
            return rawBody.length === 0 ? '' : parseJson(rawBody.toString(encoding));
        }
        if (responseType === 'buffer') {
            return rawBody;
        }
    }
    catch (error) {
        throw new ParseError(error, response);
    }
    throw new ParseError({
        message: `Unknown body type '${responseType}'`,
        name: 'Error',
    }, response);
};

;// CONCATENATED MODULE: ./node_modules/app-base-v9/node_modules/got/dist/source/core/utils/is-client-request.js
function isClientRequest(clientRequest) {
    return clientRequest.writable && !clientRequest.writableEnded;
}
/* harmony default export */ const is_client_request = (isClientRequest);

;// CONCATENATED MODULE: ./node_modules/app-base-v9/node_modules/got/dist/source/core/utils/is-unix-socket-url.js
// eslint-disable-next-line @typescript-eslint/naming-convention
function isUnixSocketURL(url) {
    return url.protocol === 'unix:' || url.hostname === 'unix';
}

;// CONCATENATED MODULE: ./node_modules/app-base-v9/node_modules/got/dist/source/core/index.js























const supportsBrotli = dist.string(external_node_process_namespaceObject.versions.brotli);
const methodsWithoutBody = new Set(['GET', 'HEAD']);
const cacheableStore = new WeakableMap();
const redirectCodes = new Set([300, 301, 302, 303, 304, 307, 308]);
const proxiedRequestEvents = [
    'socket',
    'connect',
    'continue',
    'information',
    'upgrade',
];
const core_noop = () => { };
class Request extends external_node_stream_namespaceObject.Duplex {
    constructor(url, options, defaults) {
        super({
            // Don't destroy immediately, as the error may be emitted on unsuccessful retry
            autoDestroy: false,
            // It needs to be zero because we're just proxying the data to another stream
            highWaterMark: 0,
        });
        // @ts-expect-error - Ignoring for now.
        Object.defineProperty(this, 'constructor', {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_noPipe", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        // @ts-expect-error https://github.com/microsoft/TypeScript/issues/9568
        Object.defineProperty(this, "options", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "response", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "requestUrl", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "redirectUrls", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "retryCount", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_stopRetry", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_downloadedSize", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_uploadedSize", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_stopReading", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_pipedServerResponses", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_request", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_responseSize", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_bodySize", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_unproxyEvents", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_isFromCache", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_cannotHaveBody", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_triggerRead", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_cancelTimeouts", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_nativeResponse", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_flushed", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_aborted", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        // We need this because `this._request` if `undefined` when using cache
        Object.defineProperty(this, "_requestInitialized", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this._downloadedSize = 0;
        this._uploadedSize = 0;
        this._stopReading = false;
        this._pipedServerResponses = new Set();
        this._cannotHaveBody = false;
        this._unproxyEvents = core_noop;
        this._triggerRead = false;
        this._cancelTimeouts = core_noop;
        this._jobs = [];
        this._flushed = false;
        this._requestInitialized = false;
        this._aborted = false;
        this.redirectUrls = [];
        this.retryCount = 0;
        this._stopRetry = core_noop;
        this.on('pipe', source => {
            if (source.headers) {
                Object.assign(this.options.headers, source.headers);
            }
        });
        this.on('newListener', event => {
            if (event === 'retry' && this.listenerCount('retry') > 0) {
                throw new Error('A retry listener has been attached already.');
            }
        });
        try {
            this.options = new Options(url, options, defaults);
            if (!this.options.url) {
                if (this.options.prefixUrl === '') {
                    throw new TypeError('Missing `url` property');
                }
                this.options.url = '';
            }
            this.requestUrl = this.options.url;
        }
        catch (error) {
            const { options } = error;
            if (options) {
                this.options = options;
            }
            this.flush = async () => {
                this.flush = async () => { };
                this.destroy(error);
            };
            return;
        }
        if (this.options.signal?.aborted) {
            this.destroy(new AbortError(this));
        }
        this.options.signal?.addEventListener('abort', () => {
            this.destroy(new AbortError(this));
        });
        // Important! If you replace `body` in a handler with another stream, make sure it's readable first.
        // The below is run only once.
        const { body } = this.options;
        if (dist.nodeStream(body)) {
            body.once('error', error => {
                if (this._flushed) {
                    this._beforeError(new UploadError(error, this));
                }
                else {
                    this.flush = async () => {
                        this.flush = async () => { };
                        this._beforeError(new UploadError(error, this));
                    };
                }
            });
        }
    }
    async flush() {
        if (this._flushed) {
            return;
        }
        this._flushed = true;
        try {
            await this._finalizeBody();
            if (this.destroyed) {
                return;
            }
            await this._makeRequest();
            if (this.destroyed) {
                this._request?.destroy();
                return;
            }
            // Queued writes etc.
            for (const job of this._jobs) {
                job();
            }
            // Prevent memory leak
            this._jobs.length = 0;
            this._requestInitialized = true;
        }
        catch (error) {
            this._beforeError(error);
        }
    }
    _beforeError(error) {
        if (this._stopReading) {
            return;
        }
        const { response, options } = this;
        const attemptCount = this.retryCount + (error.name === 'RetryError' ? 0 : 1);
        this._stopReading = true;
        if (!(error instanceof RequestError)) {
            error = new RequestError(error.message, error, this);
        }
        const typedError = error;
        void (async () => {
            // Node.js parser is really weird.
            // It emits post-request Parse Errors on the same instance as previous request. WTF.
            // Therefore we need to check if it has been destroyed as well.
            //
            // Furthermore, Node.js 16 `response.destroy()` doesn't immediately destroy the socket,
            // but makes the response unreadable. So we additionally need to check `response.readable`.
            if (response?.readable && !response.rawBody && !this._request?.socket?.destroyed) {
                // @types/node has incorrect typings. `setEncoding` accepts `null` as well.
                response.setEncoding(this.readableEncoding);
                const success = await this._setRawBody(response);
                if (success) {
                    response.body = response.rawBody.toString();
                }
            }
            if (this.listenerCount('retry') !== 0) {
                let backoff;
                try {
                    let retryAfter;
                    if (response && 'retry-after' in response.headers) {
                        retryAfter = Number(response.headers['retry-after']);
                        if (Number.isNaN(retryAfter)) {
                            retryAfter = Date.parse(response.headers['retry-after']) - Date.now();
                            if (retryAfter <= 0) {
                                retryAfter = 1;
                            }
                        }
                        else {
                            retryAfter *= 1000;
                        }
                    }
                    const retryOptions = options.retry;
                    backoff = await retryOptions.calculateDelay({
                        attemptCount,
                        retryOptions,
                        error: typedError,
                        retryAfter,
                        computedValue: calculate_retry_delay({
                            attemptCount,
                            retryOptions,
                            error: typedError,
                            retryAfter,
                            computedValue: retryOptions.maxRetryAfter ?? options.timeout.request ?? Number.POSITIVE_INFINITY,
                        }),
                    });
                }
                catch (error_) {
                    void this._error(new RequestError(error_.message, error_, this));
                    return;
                }
                if (backoff) {
                    await new Promise(resolve => {
                        const timeout = setTimeout(resolve, backoff);
                        this._stopRetry = () => {
                            clearTimeout(timeout);
                            resolve();
                        };
                    });
                    // Something forced us to abort the retry
                    if (this.destroyed) {
                        return;
                    }
                    try {
                        for (const hook of this.options.hooks.beforeRetry) {
                            // eslint-disable-next-line no-await-in-loop
                            await hook(typedError, this.retryCount + 1);
                        }
                    }
                    catch (error_) {
                        void this._error(new RequestError(error_.message, error, this));
                        return;
                    }
                    // Something forced us to abort the retry
                    if (this.destroyed) {
                        return;
                    }
                    this.destroy();
                    this.emit('retry', this.retryCount + 1, error, (updatedOptions) => {
                        const request = new Request(options.url, updatedOptions, options);
                        request.retryCount = this.retryCount + 1;
                        external_node_process_namespaceObject.nextTick(() => {
                            void request.flush();
                        });
                        return request;
                    });
                    return;
                }
            }
            void this._error(typedError);
        })();
    }
    _read() {
        this._triggerRead = true;
        const { response } = this;
        if (response && !this._stopReading) {
            // We cannot put this in the `if` above
            // because `.read()` also triggers the `end` event
            if (response.readableLength) {
                this._triggerRead = false;
            }
            let data;
            while ((data = response.read()) !== null) {
                this._downloadedSize += data.length; // eslint-disable-line @typescript-eslint/restrict-plus-operands
                const progress = this.downloadProgress;
                if (progress.percent < 1) {
                    this.emit('downloadProgress', progress);
                }
                this.push(data);
            }
        }
    }
    _write(chunk, encoding, callback) {
        const write = () => {
            this._writeRequest(chunk, encoding, callback);
        };
        if (this._requestInitialized) {
            write();
        }
        else {
            this._jobs.push(write);
        }
    }
    _final(callback) {
        const endRequest = () => {
            // We need to check if `this._request` is present,
            // because it isn't when we use cache.
            if (!this._request || this._request.destroyed) {
                callback();
                return;
            }
            this._request.end((error) => {
                // The request has been destroyed before `_final` finished.
                // See https://github.com/nodejs/node/issues/39356
                if (this._request._writableState?.errored) {
                    return;
                }
                if (!error) {
                    this._bodySize = this._uploadedSize;
                    this.emit('uploadProgress', this.uploadProgress);
                    this._request.emit('upload-complete');
                }
                callback(error);
            });
        };
        if (this._requestInitialized) {
            endRequest();
        }
        else {
            this._jobs.push(endRequest);
        }
    }
    _destroy(error, callback) {
        this._stopReading = true;
        this.flush = async () => { };
        // Prevent further retries
        this._stopRetry();
        this._cancelTimeouts();
        if (this.options) {
            const { body } = this.options;
            if (dist.nodeStream(body)) {
                body.destroy();
            }
        }
        if (this._request) {
            this._request.destroy();
        }
        if (error !== null && !dist.undefined(error) && !(error instanceof RequestError)) {
            error = new RequestError(error.message, error, this);
        }
        callback(error);
    }
    pipe(destination, options) {
        if (destination instanceof external_node_http_namespaceObject.ServerResponse) {
            this._pipedServerResponses.add(destination);
        }
        return super.pipe(destination, options);
    }
    unpipe(destination) {
        if (destination instanceof external_node_http_namespaceObject.ServerResponse) {
            this._pipedServerResponses.delete(destination);
        }
        super.unpipe(destination);
        return this;
    }
    async _finalizeBody() {
        const { options } = this;
        const { headers } = options;
        const isForm = !dist.undefined(options.form);
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const isJSON = !dist.undefined(options.json);
        const isBody = !dist.undefined(options.body);
        const cannotHaveBody = methodsWithoutBody.has(options.method) && !(options.method === 'GET' && options.allowGetBody);
        this._cannotHaveBody = cannotHaveBody;
        if (isForm || isJSON || isBody) {
            if (cannotHaveBody) {
                throw new TypeError(`The \`${options.method}\` method cannot be used with a body`);
            }
            // Serialize body
            const noContentType = !dist.string(headers['content-type']);
            if (isBody) {
                // Body is spec-compliant FormData
                if (isFormData(options.body)) {
                    const encoder = new FormDataEncoder(options.body);
                    if (noContentType) {
                        headers['content-type'] = encoder.headers['Content-Type'];
                    }
                    headers['content-length'] = encoder.headers['Content-Length'];
                    options.body = encoder.encode();
                }
                // Special case for https://github.com/form-data/form-data
                if (is_form_data_isFormData(options.body) && noContentType) {
                    headers['content-type'] = `multipart/form-data; boundary=${options.body.getBoundary()}`;
                }
            }
            else if (isForm) {
                if (noContentType) {
                    headers['content-type'] = 'application/x-www-form-urlencoded';
                }
                const { form } = options;
                options.form = undefined;
                options.body = (new external_node_url_namespaceObject.URLSearchParams(form)).toString();
            }
            else {
                if (noContentType) {
                    headers['content-type'] = 'application/json';
                }
                const { json } = options;
                options.json = undefined;
                options.body = options.stringifyJson(json);
            }
            const uploadBodySize = await getBodySize(options.body, options.headers);
            // See https://tools.ietf.org/html/rfc7230#section-3.3.2
            // A user agent SHOULD send a Content-Length in a request message when
            // no Transfer-Encoding is sent and the request method defines a meaning
            // for an enclosed payload body.  For example, a Content-Length header
            // field is normally sent in a POST request even when the value is 0
            // (indicating an empty payload body).  A user agent SHOULD NOT send a
            // Content-Length header field when the request message does not contain
            // a payload body and the method semantics do not anticipate such a
            // body.
            if (dist.undefined(headers['content-length']) && dist.undefined(headers['transfer-encoding']) && !cannotHaveBody && !dist.undefined(uploadBodySize)) {
                headers['content-length'] = String(uploadBodySize);
            }
        }
        if (options.responseType === 'json' && !('accept' in options.headers)) {
            options.headers.accept = 'application/json';
        }
        this._bodySize = Number(headers['content-length']) || undefined;
    }
    async _onResponseBase(response) {
        // This will be called e.g. when using cache so we need to check if this request has been aborted.
        if (this.isAborted) {
            return;
        }
        const { options } = this;
        const { url } = options;
        this._nativeResponse = response;
        if (options.decompress) {
            response = decompress_response(response);
        }
        const statusCode = response.statusCode;
        const typedResponse = response;
        typedResponse.statusMessage = typedResponse.statusMessage ? typedResponse.statusMessage : external_node_http_namespaceObject.STATUS_CODES[statusCode];
        typedResponse.url = options.url.toString();
        typedResponse.requestUrl = this.requestUrl;
        typedResponse.redirectUrls = this.redirectUrls;
        typedResponse.request = this;
        typedResponse.isFromCache = this._nativeResponse.fromCache ?? false;
        typedResponse.ip = this.ip;
        typedResponse.retryCount = this.retryCount;
        typedResponse.ok = isResponseOk(typedResponse);
        this._isFromCache = typedResponse.isFromCache;
        this._responseSize = Number(response.headers['content-length']) || undefined;
        this.response = typedResponse;
        response.once('end', () => {
            this._responseSize = this._downloadedSize;
            this.emit('downloadProgress', this.downloadProgress);
        });
        response.once('error', (error) => {
            this._aborted = true;
            // Force clean-up, because some packages don't do this.
            // TODO: Fix decompress-response
            response.destroy();
            this._beforeError(new ReadError(error, this));
        });
        response.once('aborted', () => {
            this._aborted = true;
            this._beforeError(new ReadError({
                name: 'Error',
                message: 'The server aborted pending request',
                code: 'ECONNRESET',
            }, this));
        });
        this.emit('downloadProgress', this.downloadProgress);
        const rawCookies = response.headers['set-cookie'];
        if (dist.object(options.cookieJar) && rawCookies) {
            let promises = rawCookies.map(async (rawCookie) => options.cookieJar.setCookie(rawCookie, url.toString()));
            if (options.ignoreInvalidCookies) {
                promises = promises.map(async (promise) => {
                    try {
                        await promise;
                    }
                    catch { }
                });
            }
            try {
                await Promise.all(promises);
            }
            catch (error) {
                this._beforeError(error);
                return;
            }
        }
        // The above is running a promise, therefore we need to check if this request has been aborted yet again.
        if (this.isAborted) {
            return;
        }
        if (options.followRedirect && response.headers.location && redirectCodes.has(statusCode)) {
            // We're being redirected, we don't care about the response.
            // It'd be best to abort the request, but we can't because
            // we would have to sacrifice the TCP connection. We don't want that.
            response.resume();
            this._cancelTimeouts();
            this._unproxyEvents();
            if (this.redirectUrls.length >= options.maxRedirects) {
                this._beforeError(new MaxRedirectsError(this));
                return;
            }
            this._request = undefined;
            const updatedOptions = new Options(undefined, undefined, this.options);
            const shouldBeGet = statusCode === 303 && updatedOptions.method !== 'GET' && updatedOptions.method !== 'HEAD';
            if (shouldBeGet || updatedOptions.methodRewriting) {
                // Server responded with "see other", indicating that the resource exists at another location,
                // and the client should request it from that location via GET or HEAD.
                updatedOptions.method = 'GET';
                updatedOptions.body = undefined;
                updatedOptions.json = undefined;
                updatedOptions.form = undefined;
                delete updatedOptions.headers['content-length'];
            }
            try {
                // We need this in order to support UTF-8
                const redirectBuffer = external_node_buffer_namespaceObject.Buffer.from(response.headers.location, 'binary').toString();
                const redirectUrl = new external_node_url_namespaceObject.URL(redirectBuffer, url);
                if (!isUnixSocketURL(url) && isUnixSocketURL(redirectUrl)) {
                    this._beforeError(new RequestError('Cannot redirect to UNIX socket', {}, this));
                    return;
                }
                // Redirecting to a different site, clear sensitive data.
                if (redirectUrl.hostname !== url.hostname || redirectUrl.port !== url.port) {
                    if ('host' in updatedOptions.headers) {
                        delete updatedOptions.headers.host;
                    }
                    if ('cookie' in updatedOptions.headers) {
                        delete updatedOptions.headers.cookie;
                    }
                    if ('authorization' in updatedOptions.headers) {
                        delete updatedOptions.headers.authorization;
                    }
                    if (updatedOptions.username || updatedOptions.password) {
                        updatedOptions.username = '';
                        updatedOptions.password = '';
                    }
                }
                else {
                    redirectUrl.username = updatedOptions.username;
                    redirectUrl.password = updatedOptions.password;
                }
                this.redirectUrls.push(redirectUrl);
                updatedOptions.prefixUrl = '';
                updatedOptions.url = redirectUrl;
                for (const hook of updatedOptions.hooks.beforeRedirect) {
                    // eslint-disable-next-line no-await-in-loop
                    await hook(updatedOptions, typedResponse);
                }
                this.emit('redirect', updatedOptions, typedResponse);
                this.options = updatedOptions;
                await this._makeRequest();
            }
            catch (error) {
                this._beforeError(error);
                return;
            }
            return;
        }
        if (options.isStream && options.throwHttpErrors && !isResponseOk(typedResponse)) {
            this._beforeError(new HTTPError(typedResponse));
            return;
        }
        response.on('readable', () => {
            if (this._triggerRead) {
                this._read();
            }
        });
        this.on('resume', () => {
            response.resume();
        });
        this.on('pause', () => {
            response.pause();
        });
        response.once('end', () => {
            this.push(null);
        });
        if (this._noPipe) {
            const success = await this._setRawBody();
            if (success) {
                this.emit('response', response);
            }
            return;
        }
        this.emit('response', response);
        for (const destination of this._pipedServerResponses) {
            if (destination.headersSent) {
                continue;
            }
            // eslint-disable-next-line guard-for-in
            for (const key in response.headers) {
                const isAllowed = options.decompress ? key !== 'content-encoding' : true;
                const value = response.headers[key];
                if (isAllowed) {
                    destination.setHeader(key, value);
                }
            }
            destination.statusCode = statusCode;
        }
    }
    async _setRawBody(from = this) {
        if (from.readableEnded) {
            return false;
        }
        try {
            // Errors are emitted via the `error` event
            const rawBody = await (0,get_stream.buffer)(from);
            // On retry Request is destroyed with no error, therefore the above will successfully resolve.
            // So in order to check if this was really successfull, we need to check if it has been properly ended.
            if (!this.isAborted) {
                this.response.rawBody = rawBody;
                return true;
            }
        }
        catch { }
        return false;
    }
    async _onResponse(response) {
        try {
            await this._onResponseBase(response);
        }
        catch (error) {
            /* istanbul ignore next: better safe than sorry */
            this._beforeError(error);
        }
    }
    _onRequest(request) {
        const { options } = this;
        const { timeout, url } = options;
        dist_source(request);
        if (this.options.http2) {
            // Unset stream timeout, as the `timeout` option was used only for connection timeout.
            request.setTimeout(0);
        }
        this._cancelTimeouts = timedOut(request, timeout, url);
        const responseEventName = options.cache ? 'cacheableResponse' : 'response';
        request.once(responseEventName, (response) => {
            void this._onResponse(response);
        });
        request.once('error', (error) => {
            this._aborted = true;
            // Force clean-up, because some packages (e.g. nock) don't do this.
            request.destroy();
            error = error instanceof timed_out_TimeoutError ? new TimeoutError(error, this.timings, this) : new RequestError(error.message, error, this);
            this._beforeError(error);
        });
        this._unproxyEvents = proxyEvents(request, this, proxiedRequestEvents);
        this._request = request;
        this.emit('uploadProgress', this.uploadProgress);
        this._sendBody();
        this.emit('request', request);
    }
    async _asyncWrite(chunk) {
        return new Promise((resolve, reject) => {
            super.write(chunk, error => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve();
            });
        });
    }
    _sendBody() {
        // Send body
        const { body } = this.options;
        const currentRequest = this.redirectUrls.length === 0 ? this : this._request ?? this;
        if (dist.nodeStream(body)) {
            body.pipe(currentRequest);
        }
        else if (dist.generator(body) || dist.asyncGenerator(body)) {
            (async () => {
                try {
                    for await (const chunk of body) {
                        await this._asyncWrite(chunk);
                    }
                    super.end();
                }
                catch (error) {
                    this._beforeError(error);
                }
            })();
        }
        else if (!dist.undefined(body)) {
            this._writeRequest(body, undefined, () => { });
            currentRequest.end();
        }
        else if (this._cannotHaveBody || this._noPipe) {
            currentRequest.end();
        }
    }
    _prepareCache(cache) {
        if (!cacheableStore.has(cache)) {
            cacheableStore.set(cache, new src(((requestOptions, handler) => {
                const result = requestOptions._request(requestOptions, handler);
                // TODO: remove this when `cacheable-request` supports async request functions.
                if (dist.promise(result)) {
                    // We only need to implement the error handler in order to support HTTP2 caching.
                    // The result will be a promise anyway.
                    // @ts-expect-error ignore
                    // eslint-disable-next-line @typescript-eslint/promise-function-async
                    result.once = (event, handler) => {
                        if (event === 'error') {
                            (async () => {
                                try {
                                    await result;
                                }
                                catch (error) {
                                    handler(error);
                                }
                            })();
                        }
                        else if (event === 'abort') {
                            // The empty catch is needed here in case when
                            // it rejects before it's `await`ed in `_makeRequest`.
                            (async () => {
                                try {
                                    const request = (await result);
                                    request.once('abort', handler);
                                }
                                catch { }
                            })();
                        }
                        else {
                            /* istanbul ignore next: safety check */
                            throw new Error(`Unknown HTTP2 promise event: ${event}`);
                        }
                        return result;
                    };
                }
                return result;
            }), cache));
        }
    }
    async _createCacheableRequest(url, options) {
        return new Promise((resolve, reject) => {
            // TODO: Remove `utils/url-to-options.ts` when `cacheable-request` is fixed
            Object.assign(options, urlToOptions(url));
            let request;
            // TODO: Fix `cacheable-response`. This is ugly.
            const cacheRequest = cacheableStore.get(options.cache)(options, async (response) => {
                response._readableState.autoDestroy = false;
                if (request) {
                    const fix = () => {
                        if (response.req) {
                            response.complete = response.req.res.complete;
                        }
                    };
                    response.prependOnceListener('end', fix);
                    fix();
                    (await request).emit('cacheableResponse', response);
                }
                resolve(response);
            });
            cacheRequest.once('error', reject);
            cacheRequest.once('request', async (requestOrPromise) => {
                request = requestOrPromise;
                resolve(request);
            });
        });
    }
    async _makeRequest() {
        const { options } = this;
        const { headers, username, password } = options;
        const cookieJar = options.cookieJar;
        for (const key in headers) {
            if (dist.undefined(headers[key])) {
                // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
                delete headers[key];
            }
            else if (dist.null_(headers[key])) {
                throw new TypeError(`Use \`undefined\` instead of \`null\` to delete the \`${key}\` header`);
            }
        }
        if (options.decompress && dist.undefined(headers['accept-encoding'])) {
            headers['accept-encoding'] = supportsBrotli ? 'gzip, deflate, br' : 'gzip, deflate';
        }
        if (username || password) {
            const credentials = external_node_buffer_namespaceObject.Buffer.from(`${username}:${password}`).toString('base64');
            headers.authorization = `Basic ${credentials}`;
        }
        // Set cookies
        if (cookieJar) {
            const cookieString = await cookieJar.getCookieString(options.url.toString());
            if (dist.nonEmptyString(cookieString)) {
                headers.cookie = cookieString;
            }
        }
        // Reset `prefixUrl`
        options.prefixUrl = '';
        let request;
        for (const hook of options.hooks.beforeRequest) {
            // eslint-disable-next-line no-await-in-loop
            const result = await hook(options);
            if (!dist.undefined(result)) {
                // @ts-expect-error Skip the type mismatch to support abstract responses
                request = () => result;
                break;
            }
        }
        if (!request) {
            request = options.getRequestFunction();
        }
        const url = options.url;
        this._requestOptions = options.createNativeRequestOptions();
        if (options.cache) {
            this._requestOptions._request = request;
            this._requestOptions.cache = options.cache;
            this._prepareCache(options.cache);
        }
        // Cache support
        const fn = options.cache ? this._createCacheableRequest : request;
        try {
            // We can't do `await fn(...)`,
            // because stream `error` event can be emitted before `Promise.resolve()`.
            let requestOrResponse = fn(url, this._requestOptions);
            if (dist.promise(requestOrResponse)) {
                requestOrResponse = await requestOrResponse;
            }
            // Fallback
            if (dist.undefined(requestOrResponse)) {
                requestOrResponse = options.getFallbackRequestFunction()(url, this._requestOptions);
                if (dist.promise(requestOrResponse)) {
                    requestOrResponse = await requestOrResponse;
                }
            }
            if (is_client_request(requestOrResponse)) {
                this._onRequest(requestOrResponse);
            }
            else if (this.writable) {
                this.once('finish', () => {
                    void this._onResponse(requestOrResponse);
                });
                this._sendBody();
            }
            else {
                void this._onResponse(requestOrResponse);
            }
        }
        catch (error) {
            if (error instanceof src.CacheError) {
                throw new CacheError(error, this);
            }
            throw error;
        }
    }
    async _error(error) {
        try {
            for (const hook of this.options.hooks.beforeError) {
                // eslint-disable-next-line no-await-in-loop
                error = await hook(error);
            }
        }
        catch (error_) {
            error = new RequestError(error_.message, error_, this);
        }
        this.destroy(error);
    }
    _writeRequest(chunk, encoding, callback) {
        if (!this._request || this._request.destroyed) {
            // Probably the `ClientRequest` instance will throw
            return;
        }
        this._request.write(chunk, encoding, (error) => {
            if (!error) {
                this._uploadedSize += external_node_buffer_namespaceObject.Buffer.byteLength(chunk, encoding);
                const progress = this.uploadProgress;
                if (progress.percent < 1) {
                    this.emit('uploadProgress', progress);
                }
            }
            callback(error);
        });
    }
    /**
    The remote IP address.
    */
    get ip() {
        return this.socket?.remoteAddress;
    }
    /**
    Indicates whether the request has been aborted or not.
    */
    get isAborted() {
        return this._aborted;
    }
    get socket() {
        return this._request?.socket ?? undefined;
    }
    /**
    Progress event for downloading (receiving a response).
    */
    get downloadProgress() {
        let percent;
        if (this._responseSize) {
            percent = this._downloadedSize / this._responseSize;
        }
        else if (this._responseSize === this._downloadedSize) {
            percent = 1;
        }
        else {
            percent = 0;
        }
        return {
            percent,
            transferred: this._downloadedSize,
            total: this._responseSize,
        };
    }
    /**
    Progress event for uploading (sending a request).
    */
    get uploadProgress() {
        let percent;
        if (this._bodySize) {
            percent = this._uploadedSize / this._bodySize;
        }
        else if (this._bodySize === this._uploadedSize) {
            percent = 1;
        }
        else {
            percent = 0;
        }
        return {
            percent,
            transferred: this._uploadedSize,
            total: this._bodySize,
        };
    }
    /**
    The object contains the following properties:

    - `start` - Time when the request started.
    - `socket` - Time when a socket was assigned to the request.
    - `lookup` - Time when the DNS lookup finished.
    - `connect` - Time when the socket successfully connected.
    - `secureConnect` - Time when the socket securely connected.
    - `upload` - Time when the request finished uploading.
    - `response` - Time when the request fired `response` event.
    - `end` - Time when the response fired `end` event.
    - `error` - Time when the request fired `error` event.
    - `abort` - Time when the request fired `abort` event.
    - `phases`
        - `wait` - `timings.socket - timings.start`
        - `dns` - `timings.lookup - timings.socket`
        - `tcp` - `timings.connect - timings.lookup`
        - `tls` - `timings.secureConnect - timings.connect`
        - `request` - `timings.upload - (timings.secureConnect || timings.connect)`
        - `firstByte` - `timings.response - timings.upload`
        - `download` - `timings.end - timings.response`
        - `total` - `(timings.end || timings.error || timings.abort) - timings.start`

    If something has not been measured yet, it will be `undefined`.

    __Note__: The time is a `number` representing the milliseconds elapsed since the UNIX epoch.
    */
    get timings() {
        return this._request?.timings;
    }
    /**
    Whether the response was retrieved from the cache.
    */
    get isFromCache() {
        return this._isFromCache;
    }
    get reusedSocket() {
        return this._request?.reusedSocket;
    }
}

;// CONCATENATED MODULE: ./node_modules/app-base-v9/node_modules/got/dist/source/as-promise/types.js

/**
An error to be thrown when the request is aborted with `.cancel()`.
*/
class types_CancelError extends RequestError {
    constructor(request) {
        super('Promise was canceled', {}, request);
        this.name = 'CancelError';
        this.code = 'ERR_CANCELED';
    }
    /**
    Whether the promise is canceled.
    */
    get isCanceled() {
        return true;
    }
}

;// CONCATENATED MODULE: ./node_modules/app-base-v9/node_modules/got/dist/source/as-promise/index.js








const as_promise_proxiedRequestEvents = [
    'request',
    'response',
    'redirect',
    'uploadProgress',
    'downloadProgress',
];
function asPromise(firstRequest) {
    let globalRequest;
    let globalResponse;
    let normalizedOptions;
    const emitter = new external_node_events_namespaceObject.EventEmitter();
    const promise = new PCancelable((resolve, reject, onCancel) => {
        onCancel(() => {
            globalRequest.destroy();
        });
        onCancel.shouldReject = false;
        onCancel(() => {
            reject(new types_CancelError(globalRequest));
        });
        const makeRequest = (retryCount) => {
            // Errors when a new request is made after the promise settles.
            // Used to detect a race condition.
            // See https://github.com/sindresorhus/got/issues/1489
            onCancel(() => { });
            const request = firstRequest ?? new Request(undefined, undefined, normalizedOptions);
            request.retryCount = retryCount;
            request._noPipe = true;
            globalRequest = request;
            request.once('response', async (response) => {
                // Parse body
                const contentEncoding = (response.headers['content-encoding'] ?? '').toLowerCase();
                const isCompressed = contentEncoding === 'gzip' || contentEncoding === 'deflate' || contentEncoding === 'br';
                const { options } = request;
                if (isCompressed && !options.decompress) {
                    response.body = response.rawBody;
                }
                else {
                    try {
                        response.body = parseBody(response, options.responseType, options.parseJson, options.encoding);
                    }
                    catch (error) {
                        // Fall back to `utf8`
                        response.body = response.rawBody.toString();
                        if (isResponseOk(response)) {
                            request._beforeError(error);
                            return;
                        }
                    }
                }
                try {
                    const hooks = options.hooks.afterResponse;
                    for (const [index, hook] of hooks.entries()) {
                        // @ts-expect-error TS doesn't notice that CancelableRequest is a Promise
                        // eslint-disable-next-line no-await-in-loop
                        response = await hook(response, async (updatedOptions) => {
                            options.merge(updatedOptions);
                            options.prefixUrl = '';
                            if (updatedOptions.url) {
                                options.url = updatedOptions.url;
                            }
                            // Remove any further hooks for that request, because we'll call them anyway.
                            // The loop continues. We don't want duplicates (asPromise recursion).
                            options.hooks.afterResponse = options.hooks.afterResponse.slice(0, index);
                            throw new RetryError(request);
                        });
                        if (!(dist.object(response) && dist.number(response.statusCode) && !dist.nullOrUndefined(response.body))) {
                            throw new TypeError('The `afterResponse` hook returned an invalid value');
                        }
                    }
                }
                catch (error) {
                    request._beforeError(error);
                    return;
                }
                globalResponse = response;
                if (!isResponseOk(response)) {
                    request._beforeError(new HTTPError(response));
                    return;
                }
                request.destroy();
                resolve(request.options.resolveBodyOnly ? response.body : response);
            });
            const onError = (error) => {
                if (promise.isCanceled) {
                    return;
                }
                const { options } = request;
                if (error instanceof HTTPError && !options.throwHttpErrors) {
                    const { response } = error;
                    request.destroy();
                    resolve(request.options.resolveBodyOnly ? response.body : response);
                    return;
                }
                reject(error);
            };
            request.once('error', onError);
            const previousBody = request.options?.body;
            request.once('retry', (newRetryCount, error) => {
                firstRequest = undefined;
                const newBody = request.options.body;
                if (previousBody === newBody && dist.nodeStream(newBody)) {
                    error.message = 'Cannot retry with consumed body stream';
                    onError(error);
                    return;
                }
                // This is needed! We need to reuse `request.options` because they can get modified!
                // For example, by calling `promise.json()`.
                normalizedOptions = request.options;
                makeRequest(newRetryCount);
            });
            proxyEvents(request, emitter, as_promise_proxiedRequestEvents);
            if (dist.undefined(firstRequest)) {
                void request.flush();
            }
        };
        makeRequest(0);
    });
    promise.on = (event, fn) => {
        emitter.on(event, fn);
        return promise;
    };
    promise.off = (event, fn) => {
        emitter.off(event, fn);
        return promise;
    };
    const shortcut = (responseType) => {
        const newPromise = (async () => {
            // Wait until downloading has ended
            await promise;
            const { options } = globalResponse.request;
            return parseBody(globalResponse, responseType, options.parseJson, options.encoding);
        })();
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        Object.defineProperties(newPromise, Object.getOwnPropertyDescriptors(promise));
        return newPromise;
    };
    promise.json = () => {
        if (globalRequest.options) {
            const { headers } = globalRequest.options;
            if (!globalRequest.writableFinished && !('accept' in headers)) {
                headers.accept = 'application/json';
            }
        }
        return shortcut('json');
    };
    promise.buffer = () => shortcut('buffer');
    promise.text = () => shortcut('text');
    return promise;
}

;// CONCATENATED MODULE: ./node_modules/app-base-v9/node_modules/got/dist/source/create.js




// The `delay` package weighs 10KB (!)
const delay = async (ms) => new Promise(resolve => {
    setTimeout(resolve, ms);
});
const isGotInstance = (value) => dist.function_(value);
const aliases = [
    'get',
    'post',
    'put',
    'patch',
    'head',
    'delete',
];
const create = (defaults) => {
    defaults = {
        options: new Options(undefined, undefined, defaults.options),
        handlers: [...defaults.handlers],
        mutableDefaults: defaults.mutableDefaults,
    };
    Object.defineProperty(defaults, 'mutableDefaults', {
        enumerable: true,
        configurable: false,
        writable: false,
    });
    // Got interface
    const got = ((url, options, defaultOptions = defaults.options) => {
        const request = new Request(url, options, defaultOptions);
        let promise;
        const lastHandler = (normalized) => {
            // Note: `options` is `undefined` when `new Options(...)` fails
            request.options = normalized;
            request._noPipe = !normalized.isStream;
            void request.flush();
            if (normalized.isStream) {
                return request;
            }
            if (!promise) {
                promise = asPromise(request);
            }
            return promise;
        };
        let iteration = 0;
        const iterateHandlers = (newOptions) => {
            const handler = defaults.handlers[iteration++] ?? lastHandler;
            const result = handler(newOptions, iterateHandlers);
            if (dist.promise(result) && !request.options.isStream) {
                if (!promise) {
                    promise = asPromise(request);
                }
                if (result !== promise) {
                    const descriptors = Object.getOwnPropertyDescriptors(promise);
                    for (const key in descriptors) {
                        if (key in result) {
                            // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
                            delete descriptors[key];
                        }
                    }
                    // eslint-disable-next-line @typescript-eslint/no-floating-promises
                    Object.defineProperties(result, descriptors);
                    result.cancel = promise.cancel;
                }
            }
            return result;
        };
        return iterateHandlers(request.options);
    });
    got.extend = (...instancesOrOptions) => {
        const options = new Options(undefined, undefined, defaults.options);
        const handlers = [...defaults.handlers];
        let mutableDefaults;
        for (const value of instancesOrOptions) {
            if (isGotInstance(value)) {
                options.merge(value.defaults.options);
                handlers.push(...value.defaults.handlers);
                mutableDefaults = value.defaults.mutableDefaults;
            }
            else {
                options.merge(value);
                if (value.handlers) {
                    handlers.push(...value.handlers);
                }
                mutableDefaults = value.mutableDefaults;
            }
        }
        return create({
            options,
            handlers,
            mutableDefaults: Boolean(mutableDefaults),
        });
    };
    // Pagination
    const paginateEach = (async function* (url, options) {
        let normalizedOptions = new Options(url, options, defaults.options);
        normalizedOptions.resolveBodyOnly = false;
        const { pagination } = normalizedOptions;
        assert.function_(pagination.transform);
        assert.function_(pagination.shouldContinue);
        assert.function_(pagination.filter);
        assert.function_(pagination.paginate);
        assert.number(pagination.countLimit);
        assert.number(pagination.requestLimit);
        assert.number(pagination.backoff);
        const allItems = [];
        let { countLimit } = pagination;
        let numberOfRequests = 0;
        while (numberOfRequests < pagination.requestLimit) {
            if (numberOfRequests !== 0) {
                // eslint-disable-next-line no-await-in-loop
                await delay(pagination.backoff);
            }
            // eslint-disable-next-line no-await-in-loop
            const response = (await got(undefined, undefined, normalizedOptions));
            // eslint-disable-next-line no-await-in-loop
            const parsed = await pagination.transform(response);
            const currentItems = [];
            assert.array(parsed);
            for (const item of parsed) {
                if (pagination.filter({ item, currentItems, allItems })) {
                    if (!pagination.shouldContinue({ item, currentItems, allItems })) {
                        return;
                    }
                    yield item;
                    if (pagination.stackAllItems) {
                        allItems.push(item);
                    }
                    currentItems.push(item);
                    if (--countLimit <= 0) {
                        return;
                    }
                }
            }
            const optionsToMerge = pagination.paginate({
                response,
                currentItems,
                allItems,
            });
            if (optionsToMerge === false) {
                return;
            }
            if (optionsToMerge === response.request.options) {
                normalizedOptions = response.request.options;
            }
            else {
                normalizedOptions.merge(optionsToMerge);
                assert.any([dist.urlInstance, dist.undefined], optionsToMerge.url);
                if (optionsToMerge.url !== undefined) {
                    normalizedOptions.prefixUrl = '';
                    normalizedOptions.url = optionsToMerge.url;
                }
            }
            numberOfRequests++;
        }
    });
    got.paginate = paginateEach;
    got.paginate.all = (async (url, options) => {
        const results = [];
        for await (const item of paginateEach(url, options)) {
            results.push(item);
        }
        return results;
    });
    // For those who like very descriptive names
    got.paginate.each = paginateEach;
    // Stream API
    got.stream = ((url, options) => got(url, { ...options, isStream: true }));
    // Shortcuts
    for (const method of aliases) {
        got[method] = ((url, options) => got(url, { ...options, method }));
        got.stream[method] = ((url, options) => got(url, { ...options, method, isStream: true }));
    }
    if (!defaults.mutableDefaults) {
        Object.freeze(defaults.handlers);
        defaults.options.freeze();
    }
    Object.defineProperty(got, 'defaults', {
        value: defaults,
        writable: false,
        configurable: false,
        enumerable: true,
    });
    return got;
};
/* harmony default export */ const source_create = (create);

;// CONCATENATED MODULE: ./node_modules/app-base-v9/node_modules/got/dist/source/index.js


const defaults = {
    options: new Options(),
    handlers: [],
    mutableDefaults: false,
};
const got = source_create(defaults);
/* harmony default export */ const got_dist_source = (got);













/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(7787);
/******/ 	
/******/ })()
;