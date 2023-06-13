import JinaClient from './HTTPClient';
export type ChatCatInput = {
    messages: Array<{
        role: 'user' | 'assistant';
        name?: string;
        content: string;
        image?: string;
    }>;
    chatId?: string;
    stream?: boolean;
    temperature?: number;
    top_p?: number;
    stop?: string | Array<string>;
    max_tokens?: number;
    presence_penalty?: number;
    frequency_penalty?: number;
    logit_bias?: {
        [key: string]: number;
    };
};
export type ChatCatOptions = {
    role?: 'user' | 'assistant';
    name?: string;
    chatId?: string;
    stream?: boolean;
    temperature?: number;
    top_p?: number;
    stop?: string | Array<string>;
    max_tokens?: number;
    presence_penalty?: number;
    frequency_penalty?: number;
    logit_bias?: {
        [key: string]: number;
    };
};
export type ChatCatOutput = {
    chatId: string;
    inputMessageId: string;
    responseMessageId: string;
    responseContent: string;
    usage: {
        inputTokenCount: number;
        responseTokenCount: number;
    };
};
type RationaleParams = {
    headers?: Record<string, string>;
    useCache?: boolean;
};
export default class ChatCatClient extends JinaClient {
    constructor(params: RationaleParams);
    fromArray(input: Array<string>, options?: ChatCatOptions): ChatCatInput;
    fromString(input: string, options?: ChatCatOptions): ChatCatInput;
    isOutput(obj: any): obj is ChatCatOutput;
    generate(data: ChatCatInput): Promise<ChatCatOutput>;
}
export {};
