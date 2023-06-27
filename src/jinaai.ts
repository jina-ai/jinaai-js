import PromptPerfectClient, {
    PromptPerfectRawInput,
    PromptPerfectOptions,
    PromptPerfectOutput
} from './clients/PromptPerfectClient';
import SceneXClient, {
    SceneXRawInput,
    SceneXOptions,
    SceneXOutput,
} from './clients/SceneXClient';
import RationaleClient, {
    RationaleRawInput,
    RationaleOptions,
    RationaleOutput
} from './clients/RationaleClient';
import JinaChatClient, {
    JinaChatRawInput,
    JinaChatOptions,
    JinaChatOutput
} from './clients/JinaChatClient';

import utils from './utils';

type JinaAIParams = {
    tokens?: Record<'scenex-token' | 'promptperfect-token' | 'rationale-token' | 'jinachat-token', string>,
    useCache?: boolean
};

class JinaAI {

    private PPClient: PromptPerfectClient;
    private SXClient: SceneXClient;
    private RAClient: RationaleClient;
    private CCClient: JinaChatClient;

    constructor(params?: JinaAIParams) {
        const { tokens, useCache } = params || {};
        const PPToken = tokens ? `token ${tokens['promptperfect-token']}` : '';
        const SXToken = tokens ? `token ${tokens['scenex-token']}` : '';
        const RAToken = tokens ? `token ${tokens['rationale-token']}` : '';
        const CCToken = tokens ? `Bearer ${tokens['jinachat-token']}` : '';
        this.PPClient = new PromptPerfectClient({ headers: { 'x-api-key': PPToken }, useCache });
        this.SXClient = new SceneXClient({ headers: { 'x-api-key': SXToken }, useCache });
        this.RAClient = new RationaleClient({ headers: { 'x-api-key': RAToken }, useCache });
        this.CCClient = new JinaChatClient({ headers: { 'authorization': CCToken }, useCache });
    }

    public async decide(
        input: RationaleRawInput | Array<string> | string,
        options?: RationaleOptions
    ): Promise<RationaleOutput> {
        let data: RationaleRawInput;
        if (Array.isArray(input)) data = this.RAClient.fromArray(input, options);
        else if (typeof input === 'string') data = this.RAClient.fromString(input, options);
        else data = input;
        return await this.RAClient.decide(data, options);
    }

    public async optimize(
        input: PromptPerfectRawInput | Array<string> | string,
        options?: PromptPerfectOptions
    ): Promise<PromptPerfectOutput> {
        let data: PromptPerfectRawInput;
        if (Array.isArray(input)) data = this.PPClient.fromArray(input, options);
        else if (typeof input === 'string') data = this.PPClient.fromString(input, options);
        else data = input;
        return await this.PPClient.optimize(data, options);
    }

    public async describe(
        input: SceneXRawInput | Array<string> | string,
        options?: SceneXOptions
    ): Promise<SceneXOutput> {
        let data: SceneXRawInput;
        if (Array.isArray(input)) data = this.SXClient.fromArray(input, options);
        else if (typeof input === 'string') data = this.SXClient.fromString(input, options);
        else data = input;
        return await this.SXClient.describe(data, options);
    }

    public async generate(
        input: JinaChatRawInput | Array<string> | string,
        options?: JinaChatOptions
    ): Promise<JinaChatOutput> {
        let data: JinaChatRawInput;
        if (Array.isArray(input)) data = this.CCClient.fromArray(input, options);
        else if (typeof input === 'string') data = this.CCClient.fromString(input, options);
        else data = input;
        return await this.CCClient.generate(data, options);
    }

    public generate_image() { throw 'banner not implemented'; }

    public utils = utils;

}

module.exports = JinaAI;
export default JinaAI;
