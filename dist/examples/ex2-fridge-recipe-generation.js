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
var fridge = toB64('fridge-1.png');
var generate = function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var descriptions, prompt, recipe, swot;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, jinaai.describe(fridge, { question: 'What ingredients are in the fridge?', languages: ['en'] })];
            case 1:
                descriptions = _a.sent();
                console.log('DESCRIPTION:\n', descriptions.results[0].output, '\n');
                return [4, jinaai.optimize(tslib_1.__spreadArray([
                        'Give me one recipe based on this list for ingredients'
                    ], descriptions.results.map(function (desc) { return 'INGREDIENTS:\n' + desc.output; }), true).join('\n'))];
            case 2:
                prompt = _a.sent();
                console.log('PROMPT:\n', prompt.results[0].output, '\n');
                return [4, jinaai.generate(prompt.results[0].output)];
            case 3:
                recipe = _a.sent();
                console.log('RECIPE: \n', recipe.output);
                return [4, jinaai.decide(recipe.output, { analysis: 'swot' })];
            case 4:
                swot = _a.sent();
                console.log('SWOT: \n', swot.results[0].swot);
                return [2];
        }
    });
}); };
generate();
//# sourceMappingURL=ex2-fridge-recipe-generation.js.map