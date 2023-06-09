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
import BestBannerClient, {
    BestBannerRawInput,
    BestBannerOptions,
    BestBannerOutput
} from './clients/BestBannerClient';

import utils from './utils';

type JinaAIParams = {
    secrets?: Partial<Record<
        'scenex-secret' | 'promptperfect-secret' | 'rationale-secret' | 'jinachat-secret' | 'bestbanner-secret',
        string
    >>,
    useCache?: boolean
};

class JinaAI {

    private PPClient: PromptPerfectClient;
    private SXClient: SceneXClient;
    private RAClient: RationaleClient;
    private CCClient: JinaChatClient;
    private BBClient: BestBannerClient;

    constructor(params?: JinaAIParams) {
        const { secrets, useCache } = params || {};
        const PPSecret = secrets && secrets['promptperfect-secret'] ? `token ${secrets['promptperfect-secret']}` : '';
        const SXSecret = secrets && secrets['scenex-secret'] ? `token ${secrets['scenex-secret']}` : '';
        const RASecret = secrets && secrets['rationale-secret'] ? `token ${secrets['rationale-secret']}` : '';
        const CCSecret = secrets && secrets['jinachat-secret'] ? `Bearer ${secrets['jinachat-secret']}` : '';
        const BBClient = secrets && secrets['bestbanner-secret'] ? `token ${secrets['bestbanner-secret']}` : '';
        this.PPClient = new PromptPerfectClient({ headers: { 'x-api-key': PPSecret }, useCache });
        this.SXClient = new SceneXClient({ headers: { 'x-api-key': SXSecret }, useCache });
        this.RAClient = new RationaleClient({ headers: { 'x-api-key': RASecret }, useCache });
        this.CCClient = new JinaChatClient({ headers: { 'authorization': CCSecret }, useCache });
        this.BBClient = new BestBannerClient({ headers: { 'x-api-key': BBClient }, useCache });
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

    public async imagine(
        input: BestBannerRawInput | Array<string> | string,
        options?: BestBannerOptions
    ): Promise<BestBannerOutput> {
        let data: BestBannerRawInput;
        if (Array.isArray(input)) data = this.BBClient.fromArray(input, options);
        else if (typeof input === 'string') data = this.BBClient.fromString(input, options);
        else data = input;
        return await this.BBClient.imagine(data, options);
    }

    public utils = utils;

}

module.exports = JinaAI;
export default JinaAI;
