import PromptPerfectClient,
{ PromptPerfectInput, PromptPerfectOptions, PromptPerfectOutput }
    from './clients/PromptPerfectClient';
import SceneXClient,
{ SceneXInput, SceneXOptions, SceneXOutput }
    from './clients/SceneXClient';
import RationaleClient,
{ RationaleInput, RationaleOptions }
    from './clients/RationaleClient';

import { imageToBase64 } from './utils';

type JinaAIParams = {
    tokens: Record<'scenex-token' | 'promptperfect-token' | 'rationale-token', string>,
    useCache?: boolean
};

class JinaAI {

    private PPClient: PromptPerfectClient;
    private SXClient: SceneXClient;
    private RAClient: RationaleClient;

    constructor(params: JinaAIParams) {
        const { tokens, useCache } = params;
        this.PPClient = new PromptPerfectClient({
            headers: { 'x-api-key': `token ${tokens['promptperfect-token']}` },
            useCache
        });
        this.SXClient = new SceneXClient({
            headers: { 'x-api-key': `token ${tokens['scenex-token']}` },
            useCache
        });
        this.RAClient = new RationaleClient({
            headers: { 'x-api-key': `token ${tokens['rationale-token']}` },
            useCache
        });
    }

    public async decide(
        input: RationaleInput | SceneXOutput | PromptPerfectOutput | Array<string> | string,
        options?: RationaleOptions
    ) {
        let data: RationaleInput;
        if (Array.isArray(input)) data = this.RAClient.fromArray(input, options);
        else if (typeof input === 'string') data = this.RAClient.fromString(input, options);
        else if (this.SXClient.isOutput(input)) data = this.RAClient.fromSceneX(input, options);
        else if (this.PPClient.isOutput(input)) data = this.RAClient.fromPromptPerfect(input, options);
        else data = input;
        return await this.RAClient.decide(data);
    }

    public async optimize(
        input: PromptPerfectInput | SceneXOutput | Array<string> | string,
        options?: PromptPerfectOptions
    ) {
        let data: PromptPerfectInput;
        if (Array.isArray(input)) data = this.PPClient.fromArray(input, options);
        else if (typeof input === 'string') data = this.PPClient.fromString(input, options);
        else if (this.SXClient.isOutput(input)) data = this.PPClient.fromSceneX(input, options);
        else data = input;
        return await this.PPClient.optimize(data);
    }

    public async describe(
        input: SceneXInput | Array<string> | string,
        options?: SceneXOptions
    ) {
        let data: SceneXInput;
        if (Array.isArray(input)) data = this.SXClient.fromArray(input, options);
        else if (typeof input === 'string') data = this.SXClient.fromString(input, options);
        else data = input;
        return await this.SXClient.describe(data);
    }

    public generate() { throw 'chatcat not implemented'; }

    public generate_image() { throw 'banner not implemented'; }

    public imageToBase64 = imageToBase64;

}

module.exports = JinaAI;
export default JinaAI;
