"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const utils_1 = require("../utils");
const JinaClient_1 = tslib_1.__importDefault(require("./JinaClient"));
class PromptPerfectClient extends JinaClient_1.default {
    constructor(headers) {
        const baseURL = 'https://us-central1-prompt-ops.cloudfunctions.net';
        const defaultHeaders = {
            'Content-Type': 'application/json',
        };
        const mergedHeaders = { ...defaultHeaders, ...headers };
        super(baseURL, mergedHeaders);
    }
    fromArray(input, options) {
        return {
            data: input.map(i => ({
                ...((!(0, utils_1.isUrl)(i) && !(0, utils_1.isBase64)(i)) && { prompt: i }),
                ...(((0, utils_1.isUrl)(i) || (0, utils_1.isBase64)(i)) && { imagePrompt: i }),
                targetModel: 'chatgpt',
                features: [],
                ...options
            }))
        };
    }
    fromString(input, options) {
        return {
            data: [{
                    ...((!(0, utils_1.isUrl)(input) && !(0, utils_1.isBase64)(input)) && { prompt: input }),
                    ...(((0, utils_1.isUrl)(input) || (0, utils_1.isBase64)(input)) && { imagePrompt: input }),
                    targetModel: 'chatgpt',
                    features: [],
                    ...options
                }]
        };
    }
    fromSceneX(input, options) {
        return {
            data: input.result.map(i => ({
                prompt: i.text,
                targetModel: 'chatgpt',
                features: [],
                ...options
            }))
        };
    }
    isOutput(obj) {
        return typeof obj === 'object' &&
            obj.result &&
            obj.result.every((x) => (x.prompt || x.imagePrompt) && x.promptOptimized);
    }
    async optimize(data) {
        return await this.post('/optimizeBatch', data);
    }
}
exports.default = PromptPerfectClient;
//# sourceMappingURL=PromptPerfectClient.js.map