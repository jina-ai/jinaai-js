"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var JinaClient_1 = tslib_1.__importDefault(require("./JinaClient"));
var SceneXClient = (function (_super) {
    tslib_1.__extends(SceneXClient, _super);
    function SceneXClient(headers) {
        var baseURL = 'https://us-central1-causal-diffusion.cloudfunctions.net';
        var defaultHeaders = {
            'Content-Type': 'application/json',
        };
        var mergedHeaders = tslib_1.__assign(tslib_1.__assign({}, defaultHeaders), headers);
        return _super.call(this, baseURL, mergedHeaders) || this;
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
    SceneXClient.prototype.describe = function (data) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.post('/describe', data)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    return SceneXClient;
}(JinaClient_1.default));
exports.default = SceneXClient;
//# sourceMappingURL=SceneXClient.js.map