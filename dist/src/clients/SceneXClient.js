"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var HTTPClient_1 = tslib_1.__importDefault(require("./HTTPClient"));
var SceneXClient = (function (_super) {
    tslib_1.__extends(SceneXClient, _super);
    function SceneXClient(params) {
        var headers = params.headers, useCache = params.useCache;
        var baseURL = 'https://us-central1-causal-diffusion.cloudfunctions.net';
        var defaultHeaders = {
            'Content-Type': 'application/json',
        };
        var mergedHeaders = tslib_1.__assign(tslib_1.__assign({}, defaultHeaders), headers);
        return _super.call(this, { baseURL: baseURL, headers: mergedHeaders, useCache: useCache || false }) || this;
    }
    SceneXClient.prototype.fromArray = function (input, options) {
        return {
            data: input.map(function (i) { return (tslib_1.__assign({ image: i, features: [] }, options)); })
        };
    };
    SceneXClient.prototype.fromString = function (input, options) {
        return {
            data: [tslib_1.__assign({ image: input, features: [] }, options)]
        };
    };
    SceneXClient.prototype.isOutput = function (obj) {
        return typeof obj === 'object' &&
            obj.result &&
            obj.result.every(function (x) { return x.image && x.text; });
    };
    SceneXClient.prototype.toSimplifiedOutout = function (ouput) {
        if (!ouput.result || ouput.result.every(function (x) { return x.text != ''; }) == false)
            throw 'Remote API Error';
        return {
            results: ouput.result.map(function (r) { return ({
                output: r.text
            }); })
        };
    };
    SceneXClient.prototype.describe = function (data, options) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var rawOutput, simplifiedOutput;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.post('/describe', data)];
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
    return SceneXClient;
}(HTTPClient_1.default));
exports.default = SceneXClient;
//# sourceMappingURL=SceneXClient.js.map