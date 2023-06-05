
import PromptPerfectClient, { PromptPerfectInput } from './clients/PromptPerfectClient';
import SceneXClient, { SceneXInput } from './clients/SceneXClient';
import RationaleClient, { RationaleInput } from './clients/RationaleClient';

const promptPerfectClient = new PromptPerfectClient();
const sceneXClient = new SceneXClient();
const rationaleClient = new RationaleClient();

export default {

    decide: async (input: RationaleInput) => await rationaleClient.decide(input),

    optimize: async (input: PromptPerfectInput) => await promptPerfectClient.optimize(input),

    describe: async (input: SceneXInput) => await sceneXClient.describe(input),

    generate: () => { throw 'chatcat not implemented'; },

    generate_image: () => { throw 'banner not implemented'; },

    configure: (params: Record<'scenex-token' | 'promptperfect-token' | 'rationale-token', string>) => {
        promptPerfectClient.addHeader({ 'x-api-key': `token ${params['promptperfect-token']}` });
        sceneXClient.addHeader({ 'x-api-key': `token ${params['scenex-token']}` });
        rationaleClient.addHeader({ 'x-api-key': `token ${params['rationale-token']}` });
    }

};
