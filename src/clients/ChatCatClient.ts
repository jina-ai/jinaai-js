import { isBase64, isUrl } from '../utils';
import JinaClient from './HTTPClient';

export type ChatCatRawInput = {
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

export type ChatCatOptions = {
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

export type ChatCatRawOutput = {
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

export type ChatCatOutput = {
    output: string,
    chatId: string,
    raw?: ChatCatRawOutput
};

type RationaleParams = {
    headers?: Record<string, string>,
    useCache?: boolean
};

export default class ChatCatClient extends JinaClient {
    constructor(params: RationaleParams) {
        const { headers, useCache } = params;
        const baseURL = 'https://api-dyzugixgtq-uc.a.run.app/v1/chat';
        const defaultHeaders = {
            'Content-Type': 'application/json',
        };
        const mergedHeaders = { ...defaultHeaders, ...headers };
        super({ baseURL, headers: mergedHeaders, useCache: useCache || false });
    }

    public fromArray(input: Array<string>, options?: ChatCatOptions): ChatCatRawInput {
        return {
            messages: input.map(i => ({
                content: i,
                ...((isUrl(i) || isBase64(i)) && {
                    image: i
                }),
                role: 'user',
                ...options
            })),
            ...options
        };
    }

    public fromString(input: string, options?: ChatCatOptions): ChatCatRawInput {
        return {
            messages: [{
                content: input,
                ...((isUrl(input) || isBase64(input)) && {
                    image: input
                }),
                role: 'user',
                ...options
            }],
            ...options
        };
    }

    public isOutput(obj: any): obj is ChatCatRawOutput {
        return typeof obj === 'object' && obj.chatId && obj.responseContent;
    }

    public toSimplifiedOutout(output: ChatCatRawOutput): ChatCatOutput {
        if (!output.choices || output.choices.length < 1 || output.choices[0].message.content == '')
            throw 'Remote API Error, bad output: ' + JSON.stringify(output);
        return {
            output: output.choices[0].message.content,
            chatId: output.chatId
        };
    }

    public async generate(data: ChatCatRawInput, options?: ChatCatOptions) {
        const rawOutput = await this.post<ChatCatRawOutput>('/completions', data);
        const simplifiedOutput = this.toSimplifiedOutout(rawOutput);
        if (options?.raw == true) simplifiedOutput.raw = rawOutput;
        return simplifiedOutput;
    }
}
