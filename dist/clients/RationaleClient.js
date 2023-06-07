"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const JinaClient_1 = tslib_1.__importDefault(require("./JinaClient"));
class RationaleClient extends JinaClient_1.default {
    constructor(headers) {
        const baseURL = 'https://us-central1-rationale-ai.cloudfunctions.net';
        const defaultHeaders = {
            'Content-Type': 'application/json',
        };
        const mergedHeaders = { ...defaultHeaders, ...headers };
        super(baseURL, mergedHeaders);
    }
    fromArray(input, options) {
        return {
            data: input.map(i => ({
                decision: (i).substring(0, 300),
                ...options
            }))
        };
    }
    fromString(input, options) {
        return {
            data: [{
                    decision: (input).substring(0, 300),
                    ...options
                }]
        };
    }
    fromSceneX(input, options) {
        return {
            data: input.result.map(i => ({
                decision: (i.text).substring(0, 300),
                ...options
            }))
        };
    }
    fromPromptPerfect(input, options) {
        return {
            data: input.result.map(i => ({
                decision: (i.promptOptimized).substring(0, 300),
                ...options
            }))
        };
    }
    isOutput(obj) {
        return typeof obj === 'object' &&
            obj.result &&
            obj.result.result &&
            obj.result.result.every((x) => x.decision && x.keyResultsConclusion);
    }
    async decide(data) {
        return await this.post('/analysisApi', data);
    }
}
exports.default = RationaleClient;
//# sourceMappingURL=RationaleClient.js.map