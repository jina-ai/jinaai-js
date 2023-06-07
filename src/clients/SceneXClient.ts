import { Languages } from '../shared-types';
import JinaClient from './JinaClient';

export type SceneXInput = {
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
};

export type SceneXOutput = {
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

export default class SceneXClient extends JinaClient {
    constructor(headers?: Record<string, string>) {
        const baseURL = 'https://us-central1-causal-diffusion.cloudfunctions.net';
        const defaultHeaders = {
            'Content-Type': 'application/json',
        };
        const mergedHeaders = { ...defaultHeaders, ...headers };
        super(baseURL, mergedHeaders);
    }

    public fromArray(input: Array<string>, options?: SceneXOptions): SceneXInput {
        return {
            data: input.map(i => ({
                image: i,
                features: [],
                ...options
            }))
        };
    }

    public fromString(input: string, options?: SceneXOptions): SceneXInput {
        return {
            data: [{
                image: input,
                features: [],
                ...options
            }]
        };
    }

    public isOutput(obj: any): obj is SceneXOutput {
        return typeof obj === 'object' &&
            obj.result &&
            obj.result.every((x: any) => x.image && x.text);
    }

    public async describe(data: SceneXInput) {
        return await this.post<SceneXOutput>('/describe', data);
    }
}
