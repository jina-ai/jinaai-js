import JinaClient from './HTTPClient';
export type ChatCatRawInput = {
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
    raw?: boolean;
};
export type ChatCatRawOutput = {
    chatId: string;
    inputMessageId: string;
    responseMessageId: string;
    responseContent: string;
    usage: {
        inputTokenCount: number;
        responseTokenCount: number;
    };
};
export type ChatCatOutput = {
    output: string;
    chatId: string;
    raw?: ChatCatRawOutput;
};
type RationaleParams = {
    headers?: Record<string, string>;
    useCache?: boolean;
};
export default class ChatCatClient extends JinaClient {
    constructor(params: RationaleParams);
    fromArray(input: Array<string>, options?: ChatCatOptions): ChatCatRawInput;
    fromString(input: string, options?: ChatCatOptions): ChatCatRawInput;
    isOutput(obj: any): obj is ChatCatRawOutput;
    toSimplifiedOutout(ouput: ChatCatRawOutput): ChatCatOutput;
    generate(data: ChatCatRawInput, options?: ChatCatOptions): Promise<ChatCatOutput>;
}
export {};
