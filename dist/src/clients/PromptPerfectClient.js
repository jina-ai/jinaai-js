"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var utils_1 = require("../utils");
var HTTPClient_1 = tslib_1.__importDefault(require("./HTTPClient"));
var PromptPerfectClient = (function (_super) {
    tslib_1.__extends(PromptPerfectClient, _super);
    function PromptPerfectClient(params) {
        var headers = params.headers, useCache = params.useCache;
        var baseURL = 'https://us-central1-prompt-ops.cloudfunctions.net';
        var defaultHeaders = {
            'Content-Type': 'application/json',
        };
        var mergedHeaders = tslib_1.__assign(tslib_1.__assign({}, defaultHeaders), headers);
        return _super.call(this, { baseURL: baseURL, headers: mergedHeaders, useCache: useCache || false }) || this;
    }
    PromptPerfectClient.prototype.fromArray = function (input, options) {
        return {
            data: input.map(function (i) { return (tslib_1.__assign(tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, ((!(0, utils_1.isUrl)(i) && !(0, utils_1.isBase64)(i)) && {
                prompt: i
            })), (((0, utils_1.isUrl)(i) || (0, utils_1.isBase64)(i)) && { imagePrompt: i })), { targetModel: 'chatgpt', features: [] }), options)); })
        };
    };
    PromptPerfectClient.prototype.fromString = function (input, options) {
        return {
            data: [tslib_1.__assign(tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, ((!(0, utils_1.isUrl)(input) && !(0, utils_1.isBase64)(input)) && {
                    prompt: input
                })), (((0, utils_1.isUrl)(input) || (0, utils_1.isBase64)(input)) && { imagePrompt: input })), { targetModel: 'chatgpt', features: [] }), options)]
        };
    };
    PromptPerfectClient.prototype.isOutput = function (obj) {
        return typeof obj === 'object' &&
            obj.result &&
            obj.result.every(function (x) { return (x.prompt || x.imagePrompt) && x.promptOptimized; });
    };
    PromptPerfectClient.prototype.toSimplifiedOutout = function (ouput) {
        if (!ouput.result || ouput.result.every(function (x) { return x.promptOptimized != ''; }) == false)
            throw 'Remote API Error';
        return {
            results: ouput.result.map(function (r) { return ({
                output: r.promptOptimized,
            }); })
        };
    };
    PromptPerfectClient.prototype.optimize = function (data, options) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var rawOutput, simplifiedOutput;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.post('/optimizeBatch', data)];
                    case 1:
                        rawOutput = _a.sent();
                        simplifiedOutput = this.toSimplifiedOutout(rawOutput);
                        if ((options === null || options === void 0 ? void 0 : options.raw) == true)
                            simplifiedOutput.raw = rawOutput;
                        return [2, simplifiedOutput];
                }
            });
        });
    };
    return PromptPerfectClient;
}(HTTPClient_1.default));
exports.default = PromptPerfectClient;
//# sourceMappingURL=PromptPerfectClient.js.map