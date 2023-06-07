/* eslint-disable max-len */
import { Languages } from '../shared-types';
import { isBase64, isUrl } from '../utils';
import JinaClient from './JinaClient';
import { SceneXOutput } from './SceneXClient';

export type PromptPerfectInput = {
    data: Array<{
        prompt?: string,
        imagePrompt?: string,
        targetModel: 'chatgpt' | 'gpt-4' | 'stablelm-tuned-alpha-7b' | 'claude' | 'cogenerate' | 'text-davinci-003' | 'dalle' | 'sd' | 'midjourney' | 'kandinsky' | 'lexica',
        features: Array<'preview' | 'no_spam' | 'shorten' | 'bypass_ethics' | 'same_language' | 'always_en' | 'high_quality' | 'redo_original_image' | 'variable_subs' | 'template_run'>,
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
    targetModel?: 'chatgpt' | 'gpt-4' | 'stablelm-tuned-alpha-7b' | 'claude' | 'cogenerate' | 'text-davinci-003' | 'dalle' | 'sd' | 'midjourney' | 'kandinsky' | 'lexica',
    features?: Array<'preview' | 'no_spam' | 'shorten' | 'bypass_ethics' | 'same_language' | 'always_en' | 'high_quality' | 'redo_original_image' | 'variable_subs' | 'template_run'>,
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

export interface PromptPerfectOutput {
    result: Array<{
        prompt: string,
        imagePrompt: string | null,
        targetModel: 'chatgpt' | 'gpt-4' | 'stablelm-tuned-alpha-7b' | 'claude' | 'cogenerate' | 'text-davinci-003' | 'dalle' | 'sd' | 'midjourney' | 'kandinsky' | 'lexica',
        features: Array<'preview' | 'no_spam' | 'shorten' | 'bypass_ethics' | 'same_language' | 'always_en' | 'high_quality' | 'redo_original_image' | 'variable_subs' | 'template_run'>,
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
}

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

/*
{
    data: [
        {
            prompt: 'write a python code to convert base ten to hex',
            targetModel: 'chatgpt',
            features: []
        }
    ]
}
*/

/*
{
    "result": [
        {
                "prompt": "write a python code to convert base ten to hex",
                "imagePrompt": null,
                "targetModel": "chatgpt",
                "features": [],
                "iterations": 1,
                "uiLanguage": null,
                "previewSettings": {},
                "timeout": 20000,
                "previewVariables": {},
                "targetLanguage": null,
                "promptOptimized": "Your task is to write a Python program that will convert a number in base ten to its equivalent in hexadecimal notation. Your program should be able to accept a decimal number as input, convert it to hexadecimal notation, and output the result in a format that can be easily read and understood by the user.\n\nTo accomplish this task, you will need to use the built-in functions in Python's standard library that handle decimal-to-hexadecimal conversion. Your program should also include error handling to ensure that the input is valid and that the output is correct.\n\nPlease provide clear and concise code that accomplishes the task, including comments to explain the steps taken and the reasoning behind the code. Additionally, please provide a brief explanation of how your code works and how it accomplishes the conversion from base ten to hexadecimal notation.",
                "credits": 1,
                "language": "en",
                "intermediateResults": [
                    {
                        "promptOptimized": "Your task is to write a Python program that will convert a number in base ten to its equivalent in hexadecimal notation. Your program should be able to accept a decimal number as input, convert it to hexadecimal notation, and output the result in a format that can be easily read and understood by the user.\n\nTo accomplish this task, you will need to use the built-in functions in Python's standard library that handle decimal-to-hexadecimal conversion. Your program should also include error handling to ensure that the input is valid and that the output is correct.\n\nPlease provide clear and concise code that accomplishes the task, including comments to explain the steps taken and the reasoning behind the code. Additionally, please provide a brief explanation of how your code works and how it accomplishes the conversion from base ten to hexadecimal notation.",
                        "explain": "The optimized prompt provides specific instructions on what the user is expected to do, and it provides details on the format that the output should take. The prompt also specifies that the program should have error handling and clear explanations to ensure that the program can be understood and executed by the end-user. The optimized prompt also encourages the user to provide a brief explanation of how the code works, which can help the end-user understand how to modify or improve the code."
                    }
                ],
                "explain": "The optimized prompt provides specific instructions on what the user is expected to do, and it provides details on the format that the output should take. The prompt also specifies that the program should have error handling and clear explanations to ensure that the program can be understood and executed by the end-user. The optimized prompt also encourages the user to provide a brief explanation of how the code works, which can help the end-user understand how to modify or improve the code.",
                "createdAt": 1685537244338,
                "userId": "zoyqq4zkwdZLiBgH0eyhx4fcN9b2",
                "id": "rlcu2cKNUSoecwaKRvZP"
        }
    ]
}
*/