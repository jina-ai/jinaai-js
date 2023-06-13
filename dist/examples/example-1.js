"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jinaai_1 = tslib_1.__importDefault(require("../src/jinaai"));
var run = function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var jinaai, input, descriptions, decisions;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                jinaai = new jinaai_1.default({
                    tokens: {
                        'promptperfect-token': process.env.PROMPTPERFECT_TOKEN || '',
                        'scenex-token': process.env.SCENEX_TOKEN || '',
                        'rationale-token': process.env.RATIONALE_TOKEN || '',
                    },
                    useCache: true
                });
                input = [
                    'factory-1.png',
                    'factory-2.png',
                    'factory-3.png',
                    'factory-4.png',
                ].map(function (i) { return jinaai.imageToBase64("examples/images/".concat(i)); });
                return [4, jinaai.describe(input)];
            case 1:
                descriptions = _a.sent();
                console.log('DESCRIPTIONS', JSON.stringify(descriptions, null, 4));
                return [4, jinaai.decide(descriptions, { analysis: 'swot', prepend: 'Should I work there: ' })];
            case 2:
                decisions = _a.sent();
                console.log('DECISIONS', JSON.stringify(decisions, null, 4));
                return [2];
        }
    });
}); };
run();
//# sourceMappingURL=example-1.js.map