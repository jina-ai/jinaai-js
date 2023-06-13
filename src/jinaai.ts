import PromptPerfectClient, { PromptPerfectInput, PromptPerfectOptions } from './clients/PromptPerfectClient';
import SceneXClient, { SceneXInput, SceneXOptions } from './clients/SceneXClient';
import RationaleClient, { RationaleInput, RationaleOptions } from './clients/RationaleClient';
import ChatCatClient, { ChatCatInput, ChatCatOptions } from './clients/ChatCatClient';

import utils from './utils';

type JinaAIParams = {
    tokens?: Record<'scenex-token' | 'promptperfect-token' | 'rationale-token' | 'chatcat-token', string>,
    useCache?: boolean
};

class JinaAI {

    private PPClient: PromptPerfectClient;
    private SXClient: SceneXClient;
    private RAClient: RationaleClient;
    private CCClient: ChatCatClient;

    constructor(params?: JinaAIParams) {
        const { tokens, useCache } = params || {};
        const PPToken = tokens ? `token ${tokens['promptperfect-token']}` : '';
        const SXToken = tokens ? `token ${tokens['scenex-token']}` : '';
        const RAToken = tokens ? `token ${tokens['rationale-token']}` : '';
        const CCToken = tokens ? `Bearer ${tokens['chatcat-token']}` : '';
        this.PPClient = new PromptPerfectClient({ headers: { 'x-api-key': PPToken }, useCache });
        this.SXClient = new SceneXClient({ headers: { 'x-api-key': SXToken }, useCache });
        this.RAClient = new RationaleClient({ headers: { 'x-api-key': RAToken }, useCache });
        this.CCClient = new ChatCatClient({ headers: { 'authorization': CCToken }, useCache });
    }

    public async decide(
        input: RationaleInput | Array<string> | string,
        options?: RationaleOptions
    ) {
        let data: RationaleInput;
        if (Array.isArray(input)) data = this.RAClient.fromArray(input, options);
        else if (typeof input === 'string') data = this.RAClient.fromString(input, options);
        else data = input;
        return await this.RAClient.decide(data);
    }

    public async optimize(
        input: PromptPerfectInput | Array<string> | string,
        options?: PromptPerfectOptions
    ) {
        let data: PromptPerfectInput;
        if (Array.isArray(input)) data = this.PPClient.fromArray(input, options);
        else if (typeof input === 'string') data = this.PPClient.fromString(input, options);
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

    public async generate(
        input: ChatCatInput | Array<string> | string,
        options?: ChatCatOptions
    ) {
        let data: ChatCatInput;
        if (Array.isArray(input)) data = this.CCClient.fromArray(input, options);
        else if (typeof input === 'string') data = this.CCClient.fromString(input, options);
        else data = input;
        return await this.CCClient.generate(data);
    }

    public generate_image() { throw 'banner not implemented'; }

    public utils = utils;

}

module.exports = JinaAI;
export default JinaAI;
