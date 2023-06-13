"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var PromptPerfectClient_1 = tslib_1.__importDefault(require("./clients/PromptPerfectClient"));
var SceneXClient_1 = tslib_1.__importDefault(require("./clients/SceneXClient"));
var RationaleClient_1 = tslib_1.__importDefault(require("./clients/RationaleClient"));
var utils_1 = require("./utils");
var JinaAI = (function () {
    function JinaAI(params) {
        this.imageToBase64 = utils_1.imageToBase64;
        var tokens = params.tokens, useCache = params.useCache;
        this.PPClient = new PromptPerfectClient_1.default({
            headers: { 'x-api-key': "token ".concat(tokens['promptperfect-token']) },
            useCache: useCache
        });
        this.SXClient = new SceneXClient_1.default({
            headers: { 'x-api-key': "token ".concat(tokens['scenex-token']) },
            useCache: useCache
        });
        this.RAClient = new RationaleClient_1.default({
            headers: { 'x-api-key': "token ".concat(tokens['rationale-token']) },
            useCache: useCache
        });
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
                        else if (this.SXClient.isOutput(input))
                            data = this.RAClient.fromSceneX(input, options);
                        else if (this.PPClient.isOutput(input))
                            data = this.RAClient.fromPromptPerfect(input, options);
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
                        else if (this.SXClient.isOutput(input))
                            data = this.PPClient.fromSceneX(input, options);
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
    JinaAI.prototype.generate = function () { throw 'chatcat not implemented'; };
    JinaAI.prototype.generate_image = function () { throw 'banner not implemented'; };
    return JinaAI;
}());
module.exports = JinaAI;
exports.default = JinaAI;
//# sourceMappingURL=jinaai.js.map