import JinaAI from 'jinaai';

const defaultModel = 'gpt-4'
//const defaultModel = 'gpt-3.5-turbo'

export type OpenAIRawInput = {
    model: string,
    messages: Array<{
        role: 'user' | 'assistant'
        name?: string,
        content: string,
        image?: string,
    }>,
    chatId?: string,
    stream?: boolean,
    temperature?: number,
    top_p?: number,
    stop?: string | Array<string>,
    max_tokens?: number,
    presence_penalty?: number,
    frequency_penalty?: number,
    logit_bias?: { [key: string]: number }
};

export type OpenAIOptions = {
    role?: 'user' | 'assistant'
    name?: string,
    chatId?: string,
    stream?: boolean,
    temperature?: number,
    top_p?: number,
    stop?: string | Array<string>,
    max_tokens?: number,
    presence_penalty?: number,
    frequency_penalty?: number,
    logit_bias?: { [key: string]: number },
    raw?: boolean
};

export type OpenAIRawOutput = {
    chatId: string,
    inputMessageId: string,
    responseMessageId: string,
    choices: Array<{
        index: number,
        message: {
            role: string,
            content: string
        },
        finish_reason: string
    }>,
    usage: {
        prompt_tokens: number,
        completion_tokens: number,
        total_tokens: number
    }
};

export type OpenAIOutput = {
    output: string,
    raw?: OpenAIRawOutput
};

type OpenAIParams = {
    headers?: Record<string, string>,
    options?: Record<string, any>,
    useCache?: boolean
};

export class OpenAIClient extends JinaAI.HTTPClient {
    constructor(params: OpenAIParams) {
        const { headers, options, useCache } = params;
        const baseURL = 'https://api.openai.com/v1/chat';
        const defaultHeaders = {
            'Content-Type': 'application/json',
        };
        const mergedHeaders = { ...defaultHeaders, ...headers };
        super({ baseURL, headers: mergedHeaders, options: options || {}, useCache: useCache || false });
    }

    public fromArray(input: Array<string>, options?: OpenAIOptions): OpenAIRawInput {
        return {
            model: defaultModel,
            messages: input.map(i => ({
                content: i,
                ...((JinaAI.utils.isUrl(i) || JinaAI.utils.isBase64(i)) && {
                    image: i
                }),
                role: 'user',
                ...options
            })),
            ...options
        };
    }

    public fromString(input: string, options?: OpenAIOptions): OpenAIRawInput {
        return {
            model: defaultModel,
            messages: [{
                content: input,
                ...((JinaAI.utils.isUrl(input) || JinaAI.utils.isBase64(input)) && {
                    image: input
                }),
                role: 'user',
                ...options
            }],
            ...options
        };
    }

    public isOutput(obj: any): obj is OpenAIRawOutput {
        return typeof obj === 'object' && obj.chatId && obj.responseContent;
    }

    public toSimplifiedOutout(output: OpenAIRawOutput): OpenAIOutput {
        if (!output.choices || output.choices.length < 1 || output.choices[0].message.content == '')
            throw 'Remote API Error, bad output: ' + JSON.stringify(output);
        return {
            output: output.choices[0].message.content,
        };
    }

    public async generate(data: OpenAIRawInput, options?: OpenAIOptions) {
        const rawOutput = await this.post<OpenAIRawOutput>('/completions', data);
        const simplifiedOutput = this.toSimplifiedOutout(rawOutput);
        if (options?.raw == true) simplifiedOutput.raw = rawOutput;
        return simplifiedOutput;
    }
}
