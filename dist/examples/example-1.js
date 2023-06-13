"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jinaai_1 = tslib_1.__importDefault(require("../src/jinaai"));
var run = function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var jinaai, output;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                jinaai = new jinaai_1.default({
                    tokens: {
                        'promptperfect-token': process.env.PROMPTPERFECT_TOKEN || '',
                        'scenex-token': process.env.SCENEX_TOKEN || '',
                        'rationale-token': process.env.RATIONALE_TOKEN || '',
                        'chatcat-token': process.env.CHATCAT_TOKEN || '',
                    },
                    useCache: true
                });
                return [4, jinaai.generate([
                        'write a hellow world function in js',
                        'make it take a optional param NAME and replace world by NAME if set'
                    ])];
            case 1:
                output = _a.sent();
                console.log(JSON.stringify(output, null, 4));
                return [2];
        }
    });
}); };
run();
//# sourceMappingURL=example-1.js.map