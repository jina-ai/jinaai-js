"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const JinaClient_1 = tslib_1.__importDefault(require("./JinaClient"));
class SceneXClient extends JinaClient_1.default {
    constructor(headers) {
        const baseURL = 'https://us-central1-causal-diffusion.cloudfunctions.net';
        const defaultHeaders = {
            'Content-Type': 'application/json',
        };
        const mergedHeaders = { ...defaultHeaders, ...headers };
        super(baseURL, mergedHeaders);
    }
    fromArray(input, options) {
        return {
            data: input.map(i => ({
                image: i,
                features: [],
                ...options
            }))
        };
    }
    fromString(input, options) {
        return {
            data: [{
                    image: input,
                    features: [],
                    ...options
                }]
        };
    }
    isOutput(obj) {
        return typeof obj === 'object' &&
            obj.result &&
            obj.result.every((x) => x.image && x.text);
    }
    async describe(data) {
        return await this.post('/describe', data);
    }
}
exports.default = SceneXClient;
//# sourceMappingURL=SceneXClient.js.map