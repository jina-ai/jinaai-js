import { isBase64, isUrl, omit } from '../utils';
import { HTTPClient } from './HTTPClient';

export type JinaChatRawInput = {
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

export type JinaChatOptions = {
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
    raw?: boolean,
    image?: string
};

export type JinaChatRawOutput = {
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

export type JinaChatOutput = {
    output: string,
    chatId: string,
    raw?: JinaChatRawOutput
};

export type JinaChatParams = {
    headers?: Record<string, string>,
    options?: Record<string, any>,
};

export class JinaChatClient extends HTTPClient {
    constructor(params: JinaChatParams) {
        const { headers, options } = params;
        const baseURL = 'https://api.chat.jina.ai/v1/chat';
        const defaultHeaders = {
            'Content-Type': 'application/json',
        };
        const mergedHeaders = { ...defaultHeaders, ...headers };
        super({ baseURL, headers: mergedHeaders, options: options || {} });
    }

    public fromArray(input: Array<string>, options?: JinaChatOptions): JinaChatRawInput {
        return {
            messages: input.map(i => ({
                content: i,
                ...(options && options.image && (isUrl(options.image) || isBase64(options.image)) && {
                    image: options.image
                }),
                role: 'user',
                ...omit(options!, 'image')
            })),
            ...omit(options!, 'image')
        };
    }

    public fromString(input: string, options?: JinaChatOptions): JinaChatRawInput {
        return {
            messages: [{
                content: input,
                ...(options && options.image && (isUrl(options.image) || isBase64(options.image)) && {
                    image: options.image
                }),
                role: 'user',
                ...omit(options!, 'image')
            }],
            ...omit(options!, 'image')
        };
    }

    public isOutput(obj: any): obj is JinaChatRawOutput {
        return typeof obj === 'object' && obj.chatId && obj.responseContent;
    }

    public toSimplifiedOutout(output: JinaChatRawOutput): JinaChatOutput {
        if (!output.choices || output.choices.length < 1 || output.choices[0].message.content == '')
            throw 'Remote API Error, bad output: ' + JSON.stringify(output);
        return {
            output: output.choices[0].message.content,
            chatId: output.chatId
        };
    }

    public async generate(data: JinaChatRawInput, options?: JinaChatOptions): Promise<JinaChatOutput> {
        const rawOutput = await this.post<JinaChatRawOutput>('/completions', data);
        const simplifiedOutput = this.toSimplifiedOutout(rawOutput);
        if (options?.raw == true) simplifiedOutput.raw = rawOutput;
        return simplifiedOutput;
    }

    public async stream(data: JinaChatRawInput, _options?: JinaChatOptions): Promise<ReadableStreamDefaultReader> {
        return await this.post<ReadableStreamDefaultReader>('/completions', data, false);
    }
}
