"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var PromptPerfectClient_1 = tslib_1.__importDefault(require("./clients/PromptPerfectClient"));
var SceneXClient_1 = tslib_1.__importDefault(require("./clients/SceneXClient"));
var RationaleClient_1 = tslib_1.__importDefault(require("./clients/RationaleClient"));
var ChatCatClient_1 = tslib_1.__importDefault(require("./clients/ChatCatClient"));
var utils_1 = tslib_1.__importDefault(require("./utils"));
var JinaAI = (function () {
    function JinaAI(params) {
        this.utils = utils_1.default;
        var _a = params || {}, tokens = _a.tokens, useCache = _a.useCache;
        var PPToken = tokens ? "token ".concat(tokens['promptperfect-token']) : '';
        var SXToken = tokens ? "token ".concat(tokens['scenex-token']) : '';
        var RAToken = tokens ? "token ".concat(tokens['rationale-token']) : '';
        var CCToken = tokens ? "Bearer ".concat(tokens['chatcat-token']) : '';
        this.PPClient = new PromptPerfectClient_1.default({ headers: { 'x-api-key': PPToken }, useCache: useCache });
        this.SXClient = new SceneXClient_1.default({ headers: { 'x-api-key': SXToken }, useCache: useCache });
        this.RAClient = new RationaleClient_1.default({ headers: { 'x-api-key': RAToken }, useCache: useCache });
        this.CCClient = new ChatCatClient_1.default({ headers: { 'authorization': CCToken }, useCache: useCache });
    }
    JinaAI.prototype.decide = function (input, options) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var data;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (Array.isArray(input))
                            data = this.RAClient.fromArray(input, options);
                        else if (typeof input === 'string')
                            data = this.RAClient.fromString(input, options);
                        else
                            data = input;
                        return [4, this.RAClient.decide(data)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    JinaAI.prototype.optimize = function (input, options) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var data;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (Array.isArray(input))
                            data = this.PPClient.fromArray(input, options);
                        else if (typeof input === 'string')
                            data = this.PPClient.fromString(input, options);
                        else
                            data = input;
                        return [4, this.PPClient.optimize(data)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    JinaAI.prototype.describe = function (input, options) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var data;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (Array.isArray(input))
                            data = this.SXClient.fromArray(input, options);
                        else if (typeof input === 'string')
                            data = this.SXClient.fromString(input, options);
                        else
                            data = input;
                        return [4, this.SXClient.describe(data)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    JinaAI.prototype.generate = function (input, options) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var data;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (Array.isArray(input))
                            data = this.CCClient.fromArray(input, options);
                        else if (typeof input === 'string')
                            data = this.CCClient.fromString(input, options);
                        else
                            data = input;
                        return [4, this.CCClient.generate(data)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    JinaAI.prototype.generate_image = function () { throw 'banner not implemented'; };
    return JinaAI;
}());
module.exports = JinaAI;
exports.default = JinaAI;
//# sourceMappingURL=jinaai.js.map