import { Languages } from '../shared-types';
import JinaClient from './HTTPClient';

export type SceneXRawInput = {
    data: Array<{
        image: string,
        algorithm?: 'Aqua' | 'Bolt' | 'Comet' | 'Dune' | 'Ember' | 'Flash',
        features: Array<'high_quality' | 'question_answer'>,
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
        image: string,
        features: Array<'high_quality' | 'question_answer'>,
        uid: string,
        algorithm: 'Aqua' | 'Bolt' | 'Comet' | 'Dune' | 'Ember' | 'Flash',
        text: string,
        userId: string,
        createdAt: number,
        i18n: {
            [key: string]: string
        }
    }>
};

export type SceneXOutput = {
    results: Array<{
        output: string,
    }>
    raw?: SceneXRawOutput
};

type SceneXParams = {
    headers?: Record<string, string>,
    useCache?: boolean
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
                features: [],
                ...options
            }))
        };
    }

    public fromString(input: string, options?: SceneXOptions): SceneXRawInput {
        return {
            data: [{
                image: input,
                features: [],
                ...options
            }]
        };
    }

    public isOutput(obj: any): obj is SceneXRawOutput {
        return typeof obj === 'object' &&
            obj.result &&
            obj.result.every((x: any) => x.image && x.text);
    }

    public toSimplifiedOutout(ouput: SceneXRawOutput): SceneXOutput {
        if (!ouput.result || ouput.result.every(x => x.text != '') == false) throw 'Remote API Error';
        return {
            results: ouput.result.map(r => ({
                output: r.text
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
