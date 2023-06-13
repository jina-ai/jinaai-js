import { isBase64, isUrl } from '../utils';
import JinaClient from './HTTPClient';

export type ChatCatInput = {
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
    logit_bias?: { [key: string]: number }
};

export type ChatCatOutput = {
    chatId: string,
    inputMessageId: string,
    responseMessageId: string,
    responseContent: string
    usage: {
        inputTokenCount: number,
        responseTokenCount: number
    }
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

    public fromArray(input: Array<string>, options?: ChatCatOptions): ChatCatInput {
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

    public fromString(input: string, options?: ChatCatOptions): ChatCatInput {
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

    public isOutput(obj: any): obj is ChatCatOutput {
        return typeof obj === 'object' && obj.chatId && obj.responseContent;
    }

    public async generate(data: ChatCatInput) {
        return await this.post<ChatCatOutput>('/completion', data);
    }
}
