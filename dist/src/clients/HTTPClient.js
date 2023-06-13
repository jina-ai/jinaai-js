"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var undici_1 = require("undici");
var fs_1 = tslib_1.__importDefault(require("fs"));
var path_1 = tslib_1.__importDefault(require("path"));
var crypto_1 = tslib_1.__importDefault(require("crypto"));
var CACHE_PATH = '.jinaai-sdk-cache';
var getCacheKey = function (url, data) { return "".concat(url, "-").concat(crypto_1.default.createHash('sha256').update(JSON.stringify(data)).digest('hex')); };
var HTTPClient = (function () {
    function HTTPClient(params) {
        var baseURL = params.baseURL, headers = params.headers, useCache = params.useCache;
        this.baseURL = baseURL;
        this.headers = headers;
        this.useCache = useCache;
    }
    HTTPClient.prototype.setHeaders = function (headers) {
        this.headers = headers;
    };
    HTTPClient.prototype.addHeader = function (header) {
        this.headers = tslib_1.__assign(tslib_1.__assign({}, this.headers), header);
    };
    HTTPClient.prototype.setUseCache = function (useCache) {
        this.useCache = useCache;
    };
    HTTPClient.prototype.get = function (url) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var response;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, (0, undici_1.fetch)(this.baseURL + url, {
                            headers: this.headers,
                        })];
                    case 1:
                        response = _a.sent();
                        return [2, response.json()];
                }
            });
        });
    };
    HTTPClient.prototype.post = function (url, data) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var cacheFilePath, cachedData, response, responseData, cacheFilePath;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.useCache) return [3, 3];
                        cacheFilePath = path_1.default.join(CACHE_PATH, getCacheKey(url, data));
                        return [4, fs_1.default.existsSync(cacheFilePath)];
                    case 1:
                        if (!_a.sent()) return [3, 3];
                        return [4, fs_1.default.promises.readFile(cacheFilePath, 'utf-8')];
                    case 2:
                        cachedData = _a.sent();
                        return [2, JSON.parse(cachedData)];
                    case 3: return [4, (0, undici_1.fetch)(this.baseURL + url, {
                            method: 'POST',
                            body: JSON.stringify(data),
                            headers: this.headers,
                        })];
                    case 4:
                        response = _a.sent();
                        return [4, response.json()];
                    case 5:
                        responseData = _a.sent();
                        if (!(this.useCache && !responseData.error)) return [3, 10];
                        cacheFilePath = path_1.default.join(CACHE_PATH, getCacheKey(url, data));
                        return [4, fs_1.default.existsSync(CACHE_PATH)];
                    case 6:
                        if (!!(_a.sent())) return [3, 8];
                        return [4, fs_1.default.promises.mkdir(CACHE_PATH)];
                    case 7:
                        _a.sent();
                        _a.label = 8;
                    case 8: return [4, fs_1.default.promises.writeFile(cacheFilePath, JSON.stringify(responseData))];
                    case 9:
                        _a.sent();
                        _a.label = 10;
                    case 10: return [2, responseData];
                }
            });
        });
    };
    HTTPClient.prototype.put = function (url, data) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var response;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, (0, undici_1.fetch)(this.baseURL + url, {
                            method: 'PUT',
                            body: JSON.stringify(data),
                            headers: this.headers,
                        })];
                    case 1:
                        response = _a.sent();
                        return [2, response.json()];
                }
            });
        });
    };
    HTTPClient.prototype.delete = function (url) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var response;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, (0, undici_1.fetch)(this.baseURL + url, {
                            method: 'DELETE',
                            headers: this.headers,
                        })];
                    case 1:
                        response = _a.sent();
                        return [2, response.json()];
                }
            });
        });
    };
    return HTTPClient;
}());
exports.default = HTTPClient;
//# sourceMappingURL=HTTPClient.js.map