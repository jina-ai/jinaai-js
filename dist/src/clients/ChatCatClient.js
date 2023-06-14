"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var utils_1 = require("../utils");
var HTTPClient_1 = tslib_1.__importDefault(require("./HTTPClient"));
var ChatCatClient = (function (_super) {
    tslib_1.__extends(ChatCatClient, _super);
    function ChatCatClient(params) {
        var headers = params.headers, useCache = params.useCache;
        var baseURL = 'https://api-dyzugixgtq-uc.a.run.app/v1/chat';
        var defaultHeaders = {
            'Content-Type': 'application/json',
        };
        var mergedHeaders = tslib_1.__assign(tslib_1.__assign({}, defaultHeaders), headers);
        return _super.call(this, { baseURL: baseURL, headers: mergedHeaders, useCache: useCache || false }) || this;
    }
    ChatCatClient.prototype.fromArray = function (input, options) {
        return tslib_1.__assign({ messages: input.map(function (i) { return (tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({ content: i }, (((0, utils_1.isUrl)(i) || (0, utils_1.isBase64)(i)) && {
                image: i
            })), { role: 'user' }), options)); }) }, options);
    };
    ChatCatClient.prototype.fromString = function (input, options) {
        return tslib_1.__assign({ messages: [tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({ content: input }, (((0, utils_1.isUrl)(input) || (0, utils_1.isBase64)(input)) && {
                    image: input
                })), { role: 'user' }), options)] }, options);
    };
    ChatCatClient.prototype.isOutput = function (obj) {
        return typeof obj === 'object' && obj.chatId && obj.responseContent;
    };
    ChatCatClient.prototype.toSimplifiedOutout = function (ouput) {
        if (!ouput.responseContent || ouput.responseContent == '')
            throw 'Remote API Error';
        return {
            output: ouput.responseContent,
            chatId: ouput.chatId
        };
    };
    ChatCatClient.prototype.generate = function (data, options) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var rawOutput, simplifiedOutput;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.post('/completion', data)];
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
    return ChatCatClient;
}(HTTPClient_1.default));
exports.default = ChatCatClient;
//# sourceMappingURL=ChatCatClient.js.map