"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const PromptPerfectClient_1 = tslib_1.__importDefault(require("./clients/PromptPerfectClient"));
const SceneXClient_1 = tslib_1.__importDefault(require("./clients/SceneXClient"));
const RationaleClient_1 = tslib_1.__importDefault(require("./clients/RationaleClient"));
const promptPerfectClient = new PromptPerfectClient_1.default();
const sceneXClient = new SceneXClient_1.default();
const rationaleClient = new RationaleClient_1.default();
exports.default = {
    decide: async (input, options) => {
        let data;
        if (Array.isArray(input))
            data = rationaleClient.fromArray(input, options);
        else if (typeof input === 'string')
            data = rationaleClient.fromString(input, options);
        else if (sceneXClient.isOutput(input))
            data = rationaleClient.fromSceneX(input, options);
        else if (promptPerfectClient.isOutput(input))
            data = rationaleClient.fromPromptPerfect(input, options);
        else
            data = input;
        return await rationaleClient.decide(data);
    },
    optimize: async (input, options) => {
        let data;
        if (Array.isArray(input))
            data = promptPerfectClient.fromArray(input, options);
        else if (typeof input === 'string')
            data = promptPerfectClient.fromString(input, options);
        else if (sceneXClient.isOutput(input))
            data = promptPerfectClient.fromSceneX(input, options);
        else
            data = input;
        return await promptPerfectClient.optimize(data);
    },
    describe: async (input, options) => {
        let data;
        if (Array.isArray(input))
            data = sceneXClient.fromArray(input, options);
        else if (typeof input === 'string')
            data = sceneXClient.fromString(input, options);
        else
            data = input;
        return await sceneXClient.describe(data);
    },
    generate: () => { throw 'chatcat not implemented'; },
    generate_image: () => { throw 'banner not implemented'; },
    configure: (params) => {
        promptPerfectClient.addHeader({ 'x-api-key': `token ${params['promptperfect-token']}` });
        sceneXClient.addHeader({ 'x-api-key': `token ${params['scenex-token']}` });
        rationaleClient.addHeader({ 'x-api-key': `token ${params['rationale-token']}` });
    }
};
//# sourceMappingURL=jinaai.js.map