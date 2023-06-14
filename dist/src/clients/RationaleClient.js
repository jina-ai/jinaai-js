"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var HTTPClient_1 = tslib_1.__importDefault(require("./HTTPClient"));
var MAXLEN = 300;
var RationaleClient = (function (_super) {
    tslib_1.__extends(RationaleClient, _super);
    function RationaleClient(params) {
        var headers = params.headers, useCache = params.useCache;
        var baseURL = 'https://us-central1-rationale-ai.cloudfunctions.net';
        var defaultHeaders = {
            'Content-Type': 'application/json',
        };
        var mergedHeaders = tslib_1.__assign(tslib_1.__assign({}, defaultHeaders), headers);
        return _super.call(this, { baseURL: baseURL, headers: mergedHeaders, useCache: useCache || false }) || this;
    }
    RationaleClient.prototype.fromArray = function (input, options) {
        return {
            data: input.map(function (i) { return (tslib_1.__assign({ decision: (i).substring(0, MAXLEN) }, options)); })
        };
    };
    RationaleClient.prototype.fromString = function (input, options) {
        return {
            data: [tslib_1.__assign({ decision: (input).substring(0, MAXLEN) }, options)]
        };
    };
    RationaleClient.prototype.isOutput = function (obj) {
        return typeof obj === 'object' &&
            obj.result &&
            obj.result.result &&
            obj.result.result.every(function (x) { return x.decision && x.keyResultsConclusion; });
    };
    RationaleClient.prototype.toSimplifiedOutout = function (ouput) {
        if (!ouput.result ||
            !ouput.result.result)
            throw 'Remote API Error';
        return {
            results: ouput.result.result.map(function (r) { return ({
                proscons: r.analysis == 'proscons' ? r.keyResults : undefined,
                swot: r.analysis == 'swot' ? r.keyResults : undefined,
                multichoice: r.analysis == 'multichoice' ? r.keyResults : undefined,
                outcomes: r.analysis == 'outcomes' ? r.keyResults : undefined,
            }); })
        };
    };
    RationaleClient.prototype.decide = function (data, options) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var rawOutput, simplifiedOutput;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.post('/analysisApi', data)];
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
    return RationaleClient;
}(HTTPClient_1.default));
exports.default = RationaleClient;
//# sourceMappingURL=RationaleClient.js.map