"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jinaai_1 = tslib_1.__importDefault(require("../src/jinaai"));
var jinaai = new jinaai_1.default({
    tokens: {
        'promptperfect-token': process.env.PROMPTPERFECT_TOKEN || '',
        'scenex-token': process.env.SCENEX_TOKEN || '',
        'rationale-token': process.env.RATIONALE_TOKEN || '',
        'chatcat-token': process.env.CHATCAT_TOKEN || '',
    },
    useCache: true
});
var toB64 = function (img) { return jinaai.utils.imageToBase64("examples/images/".concat(img)); };
var situations = [
    'factory-1.png',
    'factory-2.png',
    'factory-3.png',
    'factory-4.png',
].map(function (i) { return toB64(i); });
var evaluate = function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var descriptions, analysis, recommendation, swot;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, jinaai.describe(situations)];
            case 1:
                descriptions = _a.sent();
                descriptions.result.forEach(function (desc, i) { return console.log('DESCRIPTION ' + (i + 1) + ':\n', desc.text, '\n'); });
                return [4, jinaai.generate(tslib_1.__spreadArray([
                        'Does any of those situations present a danger?',
                        'Reply with [SITUATION_NUMBER] [YES] or [NO] and explain why'
                    ], descriptions.result.map(function (desc, i) { return 'SITUATION ' + (i + 1) + ':\n' + desc.text; }), true).join('\n'))];
            case 2:
                analysis = _a.sent();
                console.log('ANALYSIS: \n', analysis.responseContent);
                return [4, jinaai.generate(tslib_1.__spreadArray([
                        'According to those situations, what should be done first to make everything safer?',
                        'I only want the most urgent situation'
                    ], descriptions.result.map(function (desc, i) { return 'SITUATION ' + (i + 1) + ':\n' + desc.text; }), true).join('\n'))];
            case 3:
                recommendation = _a.sent();
                console.log('RECOMMENDATION: \n', recommendation.responseContent);
                return [4, jinaai.decide(recommendation.responseContent, { analysis: 'swot' })];
            case 4:
                swot = _a.sent();
                console.log('SWOT: \n', swot.result.result[0].keyResults);
                return [2];
        }
    });
}); };
evaluate();
//# sourceMappingURL=ex1-factory-safety-report.js.map