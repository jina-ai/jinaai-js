import PromptPerfectClient,
{ PromptPerfectInput, PromptPerfectOptions, PromptPerfectOutput }
    from './clients/PromptPerfectClient';
import SceneXClient,
{ SceneXInput, SceneXOptions, SceneXOutput }
    from './clients/SceneXClient';
import RationaleClient,
{ RationaleInput, RationaleOptions }
    from './clients/RationaleClient';

const promptPerfectClient = new PromptPerfectClient();
const sceneXClient = new SceneXClient();
const rationaleClient = new RationaleClient();

const jinaai = {

    decide: async (input: RationaleInput | SceneXOutput | PromptPerfectOutput | Array<string> | string,
        options?: RationaleOptions) => {
        let data: RationaleInput;
        if (Array.isArray(input)) data = rationaleClient.fromArray(input, options);
        else if (typeof input === 'string') data = rationaleClient.fromString(input, options);
        else if (sceneXClient.isOutput(input)) data = rationaleClient.fromSceneX(input, options);
        else if (promptPerfectClient.isOutput(input)) data = rationaleClient.fromPromptPerfect(input, options);
        else data = input;
        return await rationaleClient.decide(data);
    },

    optimize: async (input: PromptPerfectInput | SceneXOutput | Array<string> | string,
        options?: PromptPerfectOptions) => {
        let data: PromptPerfectInput;
        if (Array.isArray(input)) data = promptPerfectClient.fromArray(input, options);
        else if (typeof input === 'string') data = promptPerfectClient.fromString(input, options);
        else if (sceneXClient.isOutput(input)) data = promptPerfectClient.fromSceneX(input, options);
        else data = input;
        return await promptPerfectClient.optimize(data);
    },

    describe: async (input: SceneXInput | Array<string> | string,
        options?: SceneXOptions) => {
        let data: SceneXInput;
        if (Array.isArray(input)) data = sceneXClient.fromArray(input, options);
        else if (typeof input === 'string') data = sceneXClient.fromString(input, options);
        else data = input;
        return await sceneXClient.describe(data);
    },

    generate: () => { throw 'chatcat not implemented'; },

    generate_image: () => { throw 'banner not implemented'; },

    configure: (params: Record<'scenex-token' | 'promptperfect-token' | 'rationale-token', string>) => {
        promptPerfectClient.addHeader({ 'x-api-key': `token ${params['promptperfect-token']}` });
        sceneXClient.addHeader({ 'x-api-key': `token ${params['scenex-token']}` });
        rationaleClient.addHeader({ 'x-api-key': `token ${params['rationale-token']}` });
    }

};

module.exports = jinaai;
export default jinaai;
