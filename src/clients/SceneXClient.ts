import { Languages } from '../shared-types';
import { HTTPClient } from './HTTPClient';

export type SceneXRawInput = {
    data: Array<{
        image: string,
        algorithm?: 'Aqua' | 'Bolt' | 'Comet' | 'Dune' | 'Ember' | 'Flash' | 'Glide' | 'Hearth',
        features: Array<'high_quality' | 'question_answer' | 'tts' | 'opt-out'>,
        languages?: Array<Languages>,
        question?: string,
        style?: 'default' | 'concise' | 'prompt',
        output_length?: number | null
    }>
};

export type SceneXOptions = {
    algorithm?: 'Aqua' | 'Bolt' | 'Comet' | 'Dune' | 'Ember' | 'Flash' | 'Glide' | 'Hearth',
    features?: Array<'high_quality' | 'question_answer'>,
    languages?: Array<Languages>,
    question?: string,
    style?: 'default' | 'concise' | 'prompt',
    output_length?: number | null,
    raw?: boolean
};

export type SceneXStoryOutput = Array<{
    isNarrator: boolean,
    message: string,
    name: string
}>; 

export type SceneXRawOutput = {
    result: Array<{
        id: string,
        image?: string,
        features: Array<'high_quality' | 'question_answer' | 'tts' | 'opt-out'>,
        question?: string,
        languages?: Array<Languages>,
        uid: string,
        optOut: boolean,
        algorithm: 'Aqua' | 'Bolt' | 'Comet' | 'Dune' | 'Ember' | 'Flash' | 'Glide' | 'Hearth',
        text: string,
        userId: string,
        createdAt: number,
        i18n: {
            [key: string]: string | SceneXStoryOutput
        },
        answer?: string,
        tts?: {
            [key: string]: string
        },
        dialog?: {
            names: Array<string>,
            ssml: {
                [key: string]: string
            }
        } | null
    }>
};

export type SceneXOutput = {
    results: Array<{
        output: string,
        i18n?: {
            [key: string]: string | SceneXStoryOutput
        },
        tts?: {
            [key: string]: string
        },
        ssml?: {
            [key: string]: string
        }
    }>
    raw?: SceneXRawOutput
};

export type SceneXParams = {
    headers?: Record<string, string>,
    options?: Record<string, any>,
    useCache?: boolean
};

export const autoFillFeatures = (options?: SceneXOptions) => {
    const features: Array<'high_quality' | 'question_answer' | 'tts' | 'opt-out'> = options?.features || [];
    if (options?.question && features.includes('question_answer') == false) features.push('question_answer');
    return features;
};

export class SceneXClient extends HTTPClient {
    constructor(params: SceneXParams) {
        const { headers, options, useCache } = params;
        const baseURL = 'https://api.scenex.jina.ai/v1';
        const defaultHeaders = {
            'Content-Type': 'application/json',
        };
        const mergedHeaders = { ...defaultHeaders, ...headers };
        super({ baseURL, headers: mergedHeaders, options: options || {}, useCache: useCache || false });
    }

    public fromArray(input: Array<string>, options?: SceneXOptions): SceneXRawInput {
        return {
            data: input.map(i => ({
                image: i,
                features: autoFillFeatures(options),
                ...options
            }))
        };
    }

    public fromString(input: string, options?: SceneXOptions): SceneXRawInput {
        return {
            data: [{
                image: input,
                features: autoFillFeatures(options),
                ...options
            }]
        };
    }

    public isOutput(obj: any): obj is SceneXRawOutput {
        return typeof obj === 'object' &&
            obj.result &&
            obj.result.every((x: any) => x.image && x.text);
    }

    public toSimplifiedOutout(output: SceneXRawOutput): SceneXOutput {
        if (!output.result || output.result.every(x => x.text && x.text != '') == false)
            throw 'Remote API Error, bad output: ' + JSON.stringify(output);
        return {
            results: output.result.map(r => ({
                output: r.answer ? r.answer : r.text,
                i18n: r.i18n,
                tts: r.tts || undefined,
                ssml: r.dialog?.ssml || undefined,
            }))
        };
    }

    public async describe(data: SceneXRawInput, options?: SceneXOptions): Promise<SceneXOutput> {
        const rawOutput = await this.post<SceneXRawOutput>('/describe', data);
        const simplifiedOutput = this.toSimplifiedOutout(rawOutput);
        if (options?.raw == true) simplifiedOutput.raw = rawOutput;
        return simplifiedOutput;
    }
}
