import { Languages } from '../shared-types';
import { isBase64, isUrl } from '../utils';
import JinaClient from './JinaClient';
import { SceneXOutput } from './SceneXClient';

export type PromptPerfectInput = {
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
};

export type PromptPerfectOutput = {
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

export default class PromptPerfectClient extends JinaClient {
    constructor(headers?: Record<string, string>) {
        const baseURL = 'https://us-central1-prompt-ops.cloudfunctions.net';
        const defaultHeaders = {
            'Content-Type': 'application/json',
        };
        const mergedHeaders = { ...defaultHeaders, ...headers };
        super(baseURL, mergedHeaders);
    }

    public fromArray(input: Array<string>, options?: PromptPerfectOptions): PromptPerfectInput {
        return {
            data: input.map(i => ({
                ...((!isUrl(i) && !isBase64(i)) && { prompt: i }),
                ...((isUrl(i) || isBase64(i)) && { imagePrompt: i }),
                targetModel: 'chatgpt',
                features: [],
                ...options
            }))
        };
    }

    public fromString(input: string, options?: PromptPerfectOptions): PromptPerfectInput {
        return {
            data: [{
                ...((!isUrl(input) && !isBase64(input)) && { prompt: input }),
                ...((isUrl(input) || isBase64(input)) && { imagePrompt: input }),
                targetModel: 'chatgpt',
                features: [],
                ...options
            }]
        };
    }

    public fromSceneX(input: SceneXOutput, options?: PromptPerfectOptions): PromptPerfectInput {
        return {
            data: input.result.map(i => ({
                prompt: i.text,
                targetModel: 'chatgpt',
                features: [],
                ...options
            }))
        };
    }

    public isOutput(obj: any): obj is PromptPerfectOutput {
        return typeof obj === 'object' &&
            obj.result &&
            obj.result.every((x: any) => (x.prompt || x.imagePrompt) && x.promptOptimized);
    }

    public async optimize(data: PromptPerfectInput) {
        return await this.post<PromptPerfectOutput>('/optimizeBatch', data);
    }
}
