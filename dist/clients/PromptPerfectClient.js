"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var utils_1 = require("../utils");
var JinaClient_1 = tslib_1.__importDefault(require("./JinaClient"));
var PromptPerfectClient = (function (_super) {
    tslib_1.__extends(PromptPerfectClient, _super);
    function PromptPerfectClient(headers) {
        var baseURL = 'https://us-central1-prompt-ops.cloudfunctions.net';
        var defaultHeaders = {
            'Content-Type': 'application/json',
        };
        var mergedHeaders = tslib_1.__assign(tslib_1.__assign({}, defaultHeaders), headers);
        return _super.call(this, baseURL, mergedHeaders) || this;
    }
    PromptPerfectClient.prototype.fromArray = function (input, options) {
        return {
            data: input.map(function (i) { return (tslib_1.__assign(tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, ((!(0, utils_1.isUrl)(i) && !(0, utils_1.isBase64)(i)) && { prompt: i })), (((0, utils_1.isUrl)(i) || (0, utils_1.isBase64)(i)) && { imagePrompt: i })), { targetModel: 'chatgpt', features: [] }), options)); })
        };
    };
    PromptPerfectClient.prototype.fromString = function (input, options) {
        return {
            data: [tslib_1.__assign(tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, ((!(0, utils_1.isUrl)(input) && !(0, utils_1.isBase64)(input)) && { prompt: input })), (((0, utils_1.isUrl)(input) || (0, utils_1.isBase64)(input)) && { imagePrompt: input })), { targetModel: 'chatgpt', features: [] }), options)]
        };
    };
    PromptPerfectClient.prototype.fromSceneX = function (input, options) {
        return {
            data: input.result.map(function (i) { return (tslib_1.__assign({ prompt: i.text, targetModel: 'chatgpt', features: [] }, options)); })
        };
    };
    PromptPerfectClient.prototype.isOutput = function (obj) {
        return typeof obj === 'object' &&
            obj.result &&
            obj.result.every(function (x) { return (x.prompt || x.imagePrompt) && x.promptOptimized; });
    };
    PromptPerfectClient.prototype.optimize = function (data) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.post('/optimizeBatch', data)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    return PromptPerfectClient;
}(JinaClient_1.default));
exports.default = PromptPerfectClient;
//# sourceMappingURL=PromptPerfectClient.js.map