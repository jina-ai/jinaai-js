"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var PromptPerfectClient_1 = tslib_1.__importDefault(require("./clients/PromptPerfectClient"));
var SceneXClient_1 = tslib_1.__importDefault(require("./clients/SceneXClient"));
var RationaleClient_1 = tslib_1.__importDefault(require("./clients/RationaleClient"));
var promptPerfectClient = new PromptPerfectClient_1.default();
var sceneXClient = new SceneXClient_1.default();
var rationaleClient = new RationaleClient_1.default();
exports.default = {
    decide: function (input, options) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var data;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (Array.isArray(input))
                        data = rationaleClient.fromArray(input, options);
                    else if (typeof input === 'string')
                        data = rationaleClient.fromString(input, options);
                    else if (sceneXClient.isOutput(input))
                        data = rationaleClient.fromSceneX(input, options);
                    else if (promptPerfectClient.isOutput(input))
                        data = rationaleClient.fromPromptPerfect(input, options);
                    else
                        data = input;
                    return [4, rationaleClient.decide(data)];
                case 1: return [2, _a.sent()];
            }
        });
    }); },
    optimize: function (input, options) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var data;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (Array.isArray(input))
                        data = promptPerfectClient.fromArray(input, options);
                    else if (typeof input === 'string')
                        data = promptPerfectClient.fromString(input, options);
                    else if (sceneXClient.isOutput(input))
                        data = promptPerfectClient.fromSceneX(input, options);
                    else
                        data = input;
                    return [4, promptPerfectClient.optimize(data)];
                case 1: return [2, _a.sent()];
            }
        });
    }); },
    describe: function (input, options) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var data;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (Array.isArray(input))
                        data = sceneXClient.fromArray(input, options);
                    else if (typeof input === 'string')
                        data = sceneXClient.fromString(input, options);
                    else
                        data = input;
                    return [4, sceneXClient.describe(data)];
                case 1: return [2, _a.sent()];
            }
        });
    }); },
    generate: function () { throw 'chatcat not implemented'; },
    generate_image: function () { throw 'banner not implemented'; },
    configure: function (params) {
        promptPerfectClient.addHeader({ 'x-api-key': "token ".concat(params['promptperfect-token']) });
        sceneXClient.addHeader({ 'x-api-key': "token ".concat(params['scenex-token']) });
        rationaleClient.addHeader({ 'x-api-key': "token ".concat(params['rationale-token']) });
    }
};
//# sourceMappingURL=jinaai.js.map