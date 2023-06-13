"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var undici_1 = require("undici");
var JinaClient = (function () {
    function JinaClient(baseURL, headers) {
        this.baseURL = baseURL;
        this.headers = headers;
    }
    JinaClient.prototype.setHeaders = function (headers) {
        this.headers = headers;
    };
    JinaClient.prototype.addHeader = function (header) {
        this.headers = tslib_1.__assign(tslib_1.__assign({}, this.headers), header);
    };
    JinaClient.prototype.get = function (url) {
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
    JinaClient.prototype.post = function (url, data) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var response;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, (0, undici_1.fetch)(this.baseURL + url, {
                            method: 'POST',
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
    JinaClient.prototype.put = function (url, data) {
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
    JinaClient.prototype.delete = function (url) {
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
    return JinaClient;
}());
exports.default = JinaClient;
//# sourceMappingURL=JinaClient.js.map