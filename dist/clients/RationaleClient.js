"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var JinaClient_1 = tslib_1.__importDefault(require("./JinaClient"));
var RationaleClient = (function (_super) {
    tslib_1.__extends(RationaleClient, _super);
    function RationaleClient(headers) {
        var baseURL = 'https://us-central1-rationale-ai.cloudfunctions.net';
        var defaultHeaders = {
            'Content-Type': 'application/json',
        };
        var mergedHeaders = tslib_1.__assign(tslib_1.__assign({}, defaultHeaders), headers);
        return _super.call(this, baseURL, mergedHeaders) || this;
    }
    RationaleClient.prototype.fromArray = function (input, options) {
        return {
            data: input.map(function (i) { return (tslib_1.__assign({ decision: (i).substring(0, 300) }, options)); })
        };
    };
    RationaleClient.prototype.fromString = function (input, options) {
        return {
            data: [tslib_1.__assign({ decision: (input).substring(0, 300) }, options)]
        };
    };
    RationaleClient.prototype.fromSceneX = function (input, options) {
        return {
            data: input.result.map(function (i) { return (tslib_1.__assign({ decision: (i.text).substring(0, 300) }, options)); })
        };
    };
    RationaleClient.prototype.fromPromptPerfect = function (input, options) {
        return {
            data: input.result.map(function (i) { return (tslib_1.__assign({ decision: (i.promptOptimized).substring(0, 300) }, options)); })
        };
    };
    RationaleClient.prototype.isOutput = function (obj) {
        return typeof obj === 'object' &&
            obj.result &&
            obj.result.result &&
            obj.result.result.every(function (x) { return x.decision && x.keyResultsConclusion; });
    };
    RationaleClient.prototype.decide = function (data) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.post('/analysisApi', data)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    return RationaleClient;
}(JinaClient_1.default));
exports.default = RationaleClient;
//# sourceMappingURL=RationaleClient.js.map