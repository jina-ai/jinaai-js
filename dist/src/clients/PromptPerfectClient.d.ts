import { Languages } from '../shared-types';
import JinaClient from './HTTPClient';
import { SceneXOutput } from './SceneXClient';
export type PromptPerfectInput = {
    data: Array<{
        prompt?: string;
        imagePrompt?: string;
        targetModel: 'chatgpt' | 'gpt-4' | 'stablelm-tuned-alpha-7b' | 'claude' | 'cogenerate' | 'text-davinci-003' | 'dalle' | 'sd' | 'midjourney' | 'kandinsky' | 'lexica';
        features: Array<'preview' | 'no_spam' | 'shorten' | 'bypass_ethics' | 'same_language' | 'always_en' | 'high_quality' | 'redo_original_image' | 'variable_subs' | 'template_run'>;
        iterations?: number;
        previewSettings?: {
            'temperature': number;
            'topP': number;
            'topK': number;
            'frequencyPenalty': number;
            'presencePenalty': number;
        };
        previewVariables?: {
            [key: string]: string;
        };
        timeout?: number;
        target_language?: Languages;
    }>;
};
export type PromptPerfectOptions = {
    targetModel?: 'chatgpt' | 'gpt-4' | 'stablelm-tuned-alpha-7b' | 'claude' | 'cogenerate' | 'text-davinci-003' | 'dalle' | 'sd' | 'midjourney' | 'kandinsky' | 'lexica';
    features?: Array<'preview' | 'no_spam' | 'shorten' | 'bypass_ethics' | 'same_language' | 'always_en' | 'high_quality' | 'redo_original_image' | 'variable_subs' | 'template_run'>;
    iterations?: number;
    previewSettings?: {
        'temperature': number;
        'topP': number;
        'topK': number;
        'frequencyPenalty': number;
        'presencePenalty': number;
    };
    previewVariables?: {
        [key: string]: string;
    };
    timeout?: number;
    target_language?: Languages;
};
export type PromptPerfectOutput = {
    result: Array<{
        prompt: string;
        imagePrompt: string | null;
        targetModel: 'chatgpt' | 'gpt-4' | 'stablelm-tuned-alpha-7b' | 'claude' | 'cogenerate' | 'text-davinci-003' | 'dalle' | 'sd' | 'midjourney' | 'kandinsky' | 'lexica';
        features: Array<'preview' | 'no_spam' | 'shorten' | 'bypass_ethics' | 'same_language' | 'always_en' | 'high_quality' | 'redo_original_image' | 'variable_subs' | 'template_run'>;
        iterations: number;
        previewSettings: {
            'temperature'?: number;
            'topP'?: number;
            'topK'?: number;
            'frequencyPenalty'?: number;
            'presencePenalty'?: number;
        };
        previewVariables: {
            [key: string]: string;
        };
        timeout: number;
        targetLanguage?: Languages | null;
        promptOptimized: string;
        credits: number;
        language: Languages;
        intermediateResults: Array<{
            promptOptimized: string;
            explain: string;
        }>;
        explain: string;
        createdAt: number;
        userId: string;
        id: string;
    }>;
};
type PromptPerfectParams = {
    headers?: Record<string, string>;
    useCache?: boolean;
};
export default class PromptPerfectClient extends JinaClient {
    constructor(params: PromptPerfectParams);
    fromArray(input: Array<string>, options?: PromptPerfectOptions): PromptPerfectInput;
    fromString(input: string, options?: PromptPerfectOptions): PromptPerfectInput;
    fromSceneX(input: SceneXOutput, options?: PromptPerfectOptions): PromptPerfectInput;
    isOutput(obj: any): obj is PromptPerfectOutput;
    optimize(data: PromptPerfectInput): Promise<PromptPerfectOutput>;
}
export {};
