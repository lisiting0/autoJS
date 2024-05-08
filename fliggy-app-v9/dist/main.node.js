/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 998:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getChildById = exports.findChildById = exports.findClickableParent = exports.getById = exports.findAllById = exports.findAllByTextContains = exports.findByTextContains = exports.findById = exports.defaultTimeout = exports.defaultinterval = void 0;
var accessibility_1 = __webpack_require__(794);
var lang_1 = __webpack_require__(744);
exports.defaultinterval = 200; // 检查控件是否出现的间隔 单位 毫秒
exports.defaultTimeout = 15000; // 控件出现超时 单位 毫秒
function findById(id, interval, timeout) {
    return __awaiter(this, void 0, void 0, function () {
        var item, i, t, m;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    item = undefined;
                    i = interval || exports.defaultinterval;
                    t = timeout || exports.defaultTimeout;
                    m = new Date().getTime() + t;
                    console.log("开始查询" + id);
                    _a.label = 1;
                case 1:
                    if (!(item == null && m >= new Date().getTime())) return [3 /*break*/, 5];
                    return [4 /*yield*/, (0, accessibility_1.select)(function (x) { return x.id === id; }).first()];
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
                    item = undefined;
                    i = interval || exports.defaultinterval;
                    t = timeout || exports.defaultTimeout;
                    m = new Date().getTime() + t;
                    _a.label = 1;
                case 1:
                    if (!(item == null && m >= new Date().getTime())) return [3 /*break*/, 5];
                    return [4 /*yield*/, (0, accessibility_1.select)(function (x) { return x.text.includes(text); }).first()];
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
                    return [4 /*yield*/, (0, accessibility_1.select)(function (x) { return x.text.includes(text); }).all()];
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
                    return [4 /*yield*/, (0, accessibility_1.select)(function (x) { return x.id === id; }).all()];
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
    return undefined;
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


/***/ }),

/***/ 295:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.FliggyApp = void 0;
const appId = "com.taobao.trip";
const accessibility_1 = __webpack_require__(794);
const app = __importStar(__webpack_require__(863));
const lang_1 = __webpack_require__(744);
const selector = __importStar(__webpack_require__(998));
class FliggyApp {
    async startApp() {
        console.log(`启动APP: ${app.launch(appId)}`);
    }
    async openMine() {
        await this.clickByText("我的");
    }
    async backToHome() {
        let retry = 10;
        while (retry > 0) {
            retry--;
            const bottomView = await selector.findById("fliggy_bottom_view", 500, 2000);
            if (!bottomView) {
                (0, accessibility_1.back)();
            }
            else {
                break;
            }
        }
    }
    async deleteFrequentPassenger(max) {
        var _a;
        await this.clickByText("常用信息");
        await this.clickByText("出行人");
        const passengerListView = await selector.getById("passenger_list_view");
        let passengerList = await selector.findAllById("trip_passenger_list_item_container", 200, 2000);
        const passengerNames = [];
        let retry = 30;
        while (retry > 0) {
            retry--;
            const lengthWhenStart = passengerNames.length;
            for (const p of passengerList) {
                p.showOnScreen();
                const name = selector.findChildById(p, "usercenter_tv_name");
                if (!name) {
                    continue;
                }
                if (!passengerNames.find((x) => x === name.text)) {
                    passengerNames.push(name.text);
                    console.log(`当前乘机人数量 ${passengerNames.length} 最大数量 ${max}`);
                    if (passengerNames.length > max) {
                        (_a = p.parent) === null || _a === void 0 ? void 0 : _a.longClick();
                        const deleteBtn = await selector.findById("usercenter_tv_del", 500, 5000);
                        if (!deleteBtn) {
                            console.log(`未找到删除按钮 跳过乘机人 ${name.text}`);
                        }
                        else {
                            deleteBtn.click();
                            const confirmBtn = await selector.findByTextContains("删除");
                            confirmBtn === null || confirmBtn === void 0 ? void 0 : confirmBtn.click();
                            console.log(`已删除乘机人 ${name.text}`);
                            (0, accessibility_1.back)();
                            return true;
                        }
                    }
                }
            }
            if (passengerNames.length === lengthWhenStart) {
                break;
            }
            passengerListView.scrollForward();
            await (0, lang_1.delay)(1000);
            passengerList = await selector.findAllById("trip_passenger_list_item_container", 500, 2000);
        }
        (0, accessibility_1.back)();
        return false;
    }
    async clickByText(text) {
        const changyongxinxi = await selector.findByTextContains(text);
        if (!changyongxinxi) {
            throw new Error(`找不到${text}文字`);
        }
        const changyongxinxiBtn = selector.findClickableParent(changyongxinxi);
        if (!changyongxinxiBtn) {
            throw new Error(`找不到${text}按钮`);
        }
        changyongxinxiBtn.showOnScreen();
        changyongxinxiBtn.click();
    }
}
exports.FliggyApp = FliggyApp;


/***/ }),

/***/ 794:
/***/ ((module) => {

module.exports = require("accessibility");

/***/ }),

/***/ 863:
/***/ ((module) => {

module.exports = require("app");

/***/ }),

/***/ 744:
/***/ ((module) => {

module.exports = require("lang");

/***/ }),

/***/ 241:
/***/ ((module) => {

module.exports = require("settings");

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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
const lang_1 = __webpack_require__(744);
const settings_1 = __webpack_require__(241);
const fliggy_app_1 = __webpack_require__(295);
var isRunning = true;
function init() {
    settings_1.stableMode.value = false;
    settings_1.foregroundService.value = true;
}
async function main() {
    let failedCount = 0;
    let app = new fliggy_app_1.FliggyApp();
    while (isRunning) {
        try {
            await app.startApp();
            await app.backToHome();
            await app.openMine();
            while (await app.deleteFrequentPassenger(30)) {
                await (0, lang_1.delay)(2000);
            }
            failedCount = 0;
            let m = new Date().getTime() + 1000 * 60 * 5;
            while (isRunning && m >= new Date().getTime()) {
                await (0, lang_1.delay)(2000);
            }
        }
        catch (error) {
            failedCount++;
            console.error(error);
            await app.backToHome();
            await (0, lang_1.delay)(5000);
        }
    }
    console.log("程序已退出");
}
init();
main();

})();

/******/ })()
;