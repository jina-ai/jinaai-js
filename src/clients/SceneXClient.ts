import { Languages } from '../shared-types';
import JinaClient from './HTTPClient';

export type SceneXRawInput = {
    data: Array<{
        image: string,
        algorithm?: 'Aqua' | 'Bolt' | 'Comet' | 'Dune' | 'Ember' | 'Flash',
        features: Array<'high_quality' | 'question_answer' | 'tts' | 'opt-out'>,
        languages?: Array<Languages>,
        question?: string,
        style?: 'default' | 'concise' | 'prompt',
    }>
};

export type SceneXOptions = {
    algorithm?: 'Aqua' | 'Bolt' | 'Comet' | 'Dune' | 'Ember' | 'Flash',
    features?: Array<'high_quality' | 'question_answer'>,
    languages?: Array<Languages>,
    question?: string,
    style?: 'default' | 'concise' | 'prompt',
    raw?: boolean
};

export type SceneXRawOutput = {
    result: Array<{
        id: string,
        image?: string,
        features: Array<'high_quality' | 'question_answer' | 'tts' | 'opt-out'>,
        question?: string,
        languages?: Array<Languages>,
        uid: string,
        optOut: boolean,
        algorithm: 'Aqua' | 'Bolt' | 'Comet' | 'Dune' | 'Ember' | 'Flash',
        text: string,
        userId: string,
        createdAt: number,
        i18n: {
            [key: string]: string
        },
        answer?: string
    }>
};

export type SceneXOutput = {
    results: Array<{
        output: string,
        i18n?: {
            [key: string]: string
        }
    }>
    raw?: SceneXRawOutput
};

type SceneXParams = {
    headers?: Record<string, string>,
    useCache?: boolean
};

const autoFillFeatures = (options?: SceneXOptions) => {
    const features: Array<'high_quality' | 'question_answer' | 'tts' | 'opt-out'> = options?.features || [];
    if (options?.question && features.includes('question_answer') == false) features.push('question_answer');
    return features;
};

export default class SceneXClient extends JinaClient {
    constructor(params: SceneXParams) {
        const { headers, useCache } = params;
        const baseURL = 'https://us-central1-causal-diffusion.cloudfunctions.net';
        const defaultHeaders = {
            'Content-Type': 'application/json',
        };
        const mergedHeaders = { ...defaultHeaders, ...headers };
        super({ baseURL, headers: mergedHeaders, useCache: useCache || false });
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
        if (!output.result || output.result.every(x => x.text != '') == false)
            throw 'Remote API Error, bad output: ' + JSON.stringify(output);
        return {
            results: output.result.map(r => ({
                output: r.answer ? r.answer : r.text,
                i18n: r.i18n
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
