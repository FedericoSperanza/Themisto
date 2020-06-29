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
var express = require('express');
var puppeteer = require('puppeteer');
var Router = /** @class */ (function () {
    function Router() {
        this.app = express();
        this.app.post('/scrapSearch', this.scrapSearch);
    }
    Router.prototype.scrapSearch = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var search;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        search = req.body.searchString;
                        return [4 /*yield*/, initPuppeteer(search)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return Router;
}());
function initPuppeteer(wordSearch) {
    return __awaiter(this, void 0, void 0, function () {
        var browser, page, CompleteProducts, index, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, puppeteer.launch()];
                case 1:
                    browser = _a.sent();
                    return [4 /*yield*/, browser.newPage()];
                case 2:
                    page = _a.sent();
                    return [4 /*yield*/, page.goto("https://www.amazon.com/s/?field-keywords=" + wordSearch)];
                case 3:
                    _a.sent();
                    console.log("Metodo 1, ej silla por default");
                    return [4 /*yield*/, page.evaluate(function () {
                            return Array.from(document.querySelectorAll("div.sg-col-4-of-12:nth-of-type(n+4) div.sg-col-inner"))
                                .map(function (compact, index) {
                                var _a, _b, _c, _d, _e;
                                return ({
                                    title: (_a = compact.querySelector('span.a-size-base-plus')) === null || _a === void 0 ? void 0 : _a.innerHTML.trim(),
                                    price: (_b = compact.querySelector('span.a-price-whole')) === null || _b === void 0 ? void 0 : _b.innerHTML.trim(),
                                    antprecio: (_d = ((_c = compact.querySelector('.a-text-price span[aria-hidden]')) === null || _c === void 0 ? void 0 : _c.innerHTML.trim())) === null || _d === void 0 ? void 0 : _d.replace(/(^.+)(\w\d+\w)(.+$)/i, '$2'),
                                    sku: (_e = document.querySelector("div[data-index='" + index + "']")) === null || _e === void 0 ? void 0 : _e.getAttribute("data-asin")
                                });
                            });
                        })];
                case 4:
                    CompleteProducts = _a.sent();
                    if (!!CompleteProducts.length) return [3 /*break*/, 8];
                    _a.label = 5;
                case 5:
                    _a.trys.push([5, 7, , 8]);
                    index = 3;
                    console.log(" es 0 voy por Metodo 2, ej impresora");
                    return [4 /*yield*/, page.evaluate(function () {
                            return Array.from(document.querySelectorAll("div.s-result-item:nth-of-type(n+2) > div"))
                                .map(function (products, index) {
                                var _a, _b, _c, _d;
                                return ({
                                    title: (_a = products.querySelector('span.a-size-medium')) === null || _a === void 0 ? void 0 : _a.innerHTML.trim(),
                                    price: (_b = products.querySelector('span.a-price-whole')) === null || _b === void 0 ? void 0 : _b.innerHTML.trim(),
                                    //antprice: (products.querySelector('span.a-text-price')?.innerHTML.trim())?.replace(/(^.+)(\w\d+\w)(.+$)/i,'$2'),
                                    //antprice: (products.querySelector('span.a-offscreen')?.innerHTML.trim())?.replace(/(^.+)(\w\d+\w)(.+$)/i,'$2'),
                                    antprice: (_c = products.querySelector("span.a-price.a-text-price [aria-hidden]")) === null || _c === void 0 ? void 0 : _c.innerHTML.trim(),
                                    sku: (_d = document.querySelector("div[data-index='" + index + "']")) === null || _d === void 0 ? void 0 : _d.getAttribute("data-asin")
                                });
                            });
                        })];
                case 6:
                    CompleteProducts = _a.sent();
                    return [3 /*break*/, 8];
                case 7:
                    e_1 = _a.sent();
                    console.log("error: ", e_1);
                    return [3 /*break*/, 8];
                case 8:
                    console.log("Completo ", CompleteProducts);
                    return [4 /*yield*/, browser.close()];
                case 9:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
