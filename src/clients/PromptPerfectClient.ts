import { Languages } from '../shared-types';
import { isBase64, isUrl } from '../utils';
import JinaClient from './HTTPClient';

export type PromptPerfectRawInput = {
    data: Array<{
        prompt?: string,
        imagePrompt?: string,
        targetModel: 'chatgpt' | 'gpt-4' | 'stablelm-tuned-alpha-7b' |
        'claude' | 'cogenerate' | 'text-davinci-003' | 'dalle' | 'sd' |
        'midjourney' | 'kandinsky' | 'lexica',
        features: Array<
            'preview' | 'no_spam' | 'shorten' | 'bypass_ethics' |
            'same_language' | 'always_en' | 'high_quality' |
            'redo_original_image' | 'variable_subs' | 'template_run'
        >,
        iterations?: number,
        previewSettings?: {
            'temperature': number,
            'topP': number,
            'topK': number,
            'frequencyPenalty': number,
            'presencePenalty': number
        },
        previewVariables?: {
            [key: string]: string
        }
        timeout?: number,
        target_language?: Languages,
    }>
};

export type PromptPerfectOptions = {
    targetModel?: 'chatgpt' | 'gpt-4' | 'stablelm-tuned-alpha-7b' |
    'claude' | 'cogenerate' | 'text-davinci-003' | 'dalle' | 'sd' |
    'midjourney' | 'kandinsky' | 'lexica',
    features?: Array<
        'preview' | 'no_spam' | 'shorten' | 'bypass_ethics' |
        'same_language' | 'always_en' | 'high_quality' |
        'redo_original_image' | 'variable_subs' | 'template_run'
    >,
    iterations?: number,
    previewSettings?: {
        'temperature': number,
        'topP': number,
        'topK': number,
        'frequencyPenalty': number,
        'presencePenalty': number
    },
    previewVariables?: {
        [key: string]: string
    }
    timeout?: number,
    target_language?: Languages,
    raw?: boolean
};

export type PromptPerfectRawOutput = {
    result: Array<{
        prompt: string,
        imagePrompt: string | null,
        targetModel: 'chatgpt' | 'gpt-4' | 'stablelm-tuned-alpha-7b' |
        'claude' | 'cogenerate' | 'text-davinci-003' | 'dalle' | 'sd' |
        'midjourney' | 'kandinsky' | 'lexica',
        features: Array<
            'preview' | 'no_spam' | 'shorten' | 'bypass_ethics' |
            'same_language' | 'always_en' | 'high_quality'
            | 'redo_original_image' | 'variable_subs' | 'template_run'
        >,
        iterations: number,
        previewSettings: {
            'temperature'?: number,
            'topP'?: number,
            'topK'?: number,
            'frequencyPenalty'?: number,
            'presencePenalty'?: number
        },
        previewVariables: {
            [key: string]: string
        }
        timeout: number,
        targetLanguage?: Languages | null,
        promptOptimized: string,
        credits: number,
        language: Languages,
        intermediateResults: Array<{
            promptOptimized: string,
            explain: string,
        }>,
        explain: string,
        createdAt: number,
        userId: string,
        id: string
    }>
};

export type PromptPerfectOutput = {
    results: Array<{
        output: string,
    }>,
    raw?: PromptPerfectRawOutput
};

type PromptPerfectParams = {
    headers?: Record<string, string>,
    options?: Record<string, any>,
    useCache?: boolean
};

export default class PromptPerfectClient extends JinaClient {
    constructor(params: PromptPerfectParams) {
        const { headers, options, useCache } = params;
        const baseURL = 'https://api.promptperfect.jina.ai';
        const defaultHeaders = {
            'Content-Type': 'application/json',
        };
        const mergedHeaders = { ...defaultHeaders, ...headers };
        super({ baseURL, headers: mergedHeaders, options: options || {}, useCache: useCache || false });
    }

    public fromArray(input: Array<string>, options?: PromptPerfectOptions): PromptPerfectRawInput {
        return {
            data: input.map(i => ({
                ...((!isUrl(i) && !isBase64(i)) && {
                    prompt: i
                }),
                ...((isUrl(i) || isBase64(i)) && { imagePrompt: i }),
                targetModel: 'chatgpt',
                features: [],
                ...options
            }))
        };
    }

    public fromString(input: string, options?: PromptPerfectOptions): PromptPerfectRawInput {
        return {
            data: [{
                ...((!isUrl(input) && !isBase64(input)) && {
                    prompt: input
                }),
                ...((isUrl(input) || isBase64(input)) && { imagePrompt: input }),
                targetModel: 'chatgpt',
                features: [],
                ...options
            }]
        };
    }

    public isOutput(obj: any): obj is PromptPerfectRawOutput {
        return typeof obj === 'object' &&
            obj.result &&
            obj.result.every((x: any) => (x.prompt || x.imagePrompt) && x.promptOptimized);
    }

    public toSimplifiedOutout(output: PromptPerfectRawOutput): PromptPerfectOutput {
        if (!output.result || output.result.every(x => x.promptOptimized != '') == false)
            throw 'Remote API Error, bad output: ' + JSON.stringify(output);
        return {
            results: output.result.map(r => ({
                output: r.promptOptimized,
            }))
        };
    }

    public async optimize(data: PromptPerfectRawInput, options?: PromptPerfectOptions): Promise<PromptPerfectOutput> {
        const rawOutput = await this.post<PromptPerfectRawOutput>('/optimizeBatch', data);
        const simplifiedOutput = this.toSimplifiedOutout(rawOutput);
        if (options?.raw == true) simplifiedOutput.raw = rawOutput;
        return simplifiedOutput;
    }
}
