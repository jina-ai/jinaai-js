import JinaAI, { JinaAIParams } from 'jinaai';

import {
    OpenAIClient,
    OpenAIRawInput,
    OpenAIOptions,
    OpenAIOutput
} from './OpenAIClient';

export type AIClientParamsExtended = JinaAIParams & {
    secrets?: JinaAIParams['secrets'] & {
        'openai-secret': string;
    };
};

export default class JinaAIExended extends JinaAI {

    protected OAClient: OpenAIClient;

    constructor(params?: AIClientParamsExtended) {
        super(params as JinaAIParams)
        const { secrets, options, useCache } = params || {};
        const OASecret = secrets && secrets['openai-secret'] ? `Bearer ${secrets['openai-secret']}` : '';
        this.OAClient = new OpenAIClient({ headers: { 'authorization': OASecret }, options, useCache });
    }

    public async generate2<T extends OpenAIOptions>(
        input: OpenAIRawInput | Array<string> | string,
        options?: T
    ): Promise<OpenAIOutput> {
        let data: OpenAIRawInput;
        if (Array.isArray(input)) data = this.OAClient.fromArray(input, options);
        else if (typeof input === 'string') data = this.OAClient.fromString(input, options);
        else data = input;
        return await this.OAClient.generate(data, options);
    }

}

