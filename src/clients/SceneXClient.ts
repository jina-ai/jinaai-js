import { Languages } from '../shared-types';
import { sleep } from '../utils';
import { HTTPClient } from './HTTPClient';

export type SceneXRawInput = {
    data: Array<{
        image?: string,
        video?: string,
        algorithm?: 'Aqua' | 'Bolt' | 'Comet' | 'Dune' | 'Ember' | 'Flash' | 'Glide' | 'Hearth' | 'Inception',
        features: Array<'high_quality' | 'question_answer' | 'tts' | 'opt-out'>,
        languages?: Array<Languages>,
        question?: string,
        style?: 'default' | 'concise' | 'prompt',
        output_length?: number | null
    }>
};

export type SceneXOptions = {
    algorithm?: 'Aqua' | 'Bolt' | 'Comet' | 'Dune' | 'Ember' | 'Flash' | 'Glide' | 'Hearth' | 'Inception',
    features?: Array<'high_quality' | 'question_answer' | 'tts' | 'opt-out'>,
    languages?: Array<Languages>,
    question?: string,
    style?: 'default' | 'concise' | 'prompt',
    output_length?: number | null,
    reportProgress?: (videoIndex: number, progress: string)=> void
    raw?: boolean
};

export type SceneXStoryOutput = Array<{
    isNarrator: boolean,
    message: string,
    name: string
}>;

export type SceneXSVideoOutput = {
    summary: string,
    events: Array<{
        description: string,
        timestamp: string
    }>
}; 

export type SceneXSceneRawOutput = {
    id: string,
    image?: string,
    video?: string,
    features: Array<'high_quality' | 'question_answer' | 'tts' | 'opt-out'>,
    question?: string,
    languages?: Array<Languages>,
    uid: string,
    optOut: boolean,
    algorithm: 'Aqua' | 'Bolt' | 'Comet' | 'Dune' | 'Ember' | 'Flash' | 'Glide' | 'Hearth' | 'Inception',
    text?: string,
    userId: string,
    createdAt: number,
    i18n: {
        [key: string]: string | SceneXStoryOutput | SceneXSVideoOutput
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
    } | null,

    status?: 'pending' | string,
    progress?: string
};

export type SceneXRawOutput = {
    result: Array<SceneXSceneRawOutput>
};

export type SceneXMonoRawOutput = {
    result: { data: SceneXSceneRawOutput }
};

export type SceneXOutput = {
    results: Array<{
        output: string,
        i18n?: {
            [key: string]: string | SceneXStoryOutput | SceneXSVideoOutput
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
    baseURL?: string
};

export const autoFillFeatures = (options?: SceneXOptions) => {
    const features: Array<'high_quality' | 'question_answer' | 'tts' | 'opt-out'> = options?.features || [];
    if (options?.question && features.includes('question_answer') == false) features.push('question_answer');
    return features;
};

export class SceneXClient extends HTTPClient {
    constructor(params: SceneXParams) {
        const { headers, options, baseURL = 'https://api.scenex.jina.ai/v1' } = params;
        const defaultHeaders = {
            'Content-Type': 'application/json',
        };
        const mergedHeaders = { ...defaultHeaders, ...headers };
        super({ baseURL, headers: mergedHeaders, options: options || {} });
    }

    public fromArray(input: Array<string>, options?: SceneXOptions): SceneXRawInput {
        return {
            data: input.map(i => ({
                image: i,
                ...(options && options.algorithm == 'Inception' && { video: i }),
                features: autoFillFeatures(options),
                ...options
            }))
        };
    }

    public fromString(input: string, options?: SceneXOptions): SceneXRawInput {
        return {
            data: [{
                image: input,
                ...(options && options.algorithm == 'Inception' && { video: input }),
                features: autoFillFeatures(options),
                ...options
            }]
        };
    }

    public isOutput(obj: any): obj is SceneXRawOutput {
        return typeof obj === 'object' &&
            obj.result &&
            obj.result.every((x: any) => x.image || x.video);
    }

    public toSimplifiedOutout(output: SceneXRawOutput): SceneXOutput {
        if (!output.result || output.result.every(x => x.image || x.video) == false)
            throw 'Remote API Error, bad output: ' + JSON.stringify(output);
        return {
            results: output.result.map(r => ({
                output: r.answer ? r.answer : r.text || 'Processing...',
                i18n: r.i18n,
                tts: r.tts || undefined,
                ssml: r.dialog?.ssml || undefined,
            }))
        };
    }

    public async describeVideo(output: SceneXRawOutput, options?: SceneXOptions): Promise<SceneXRawOutput> {
        await Promise.all(output.result.map(async (scene, i: number) => {
            try {
                let rawOutput: SceneXMonoRawOutput | null = null;
                let isDone = false;
                while (isDone == false) {
                    rawOutput = await this.get<SceneXMonoRawOutput>(`/scene/${scene.id}`);
                    if (options?.reportProgress) {
                        const progress = `${rawOutput.result.data.status || 'pending'} - ${rawOutput.result.data.progress || '???'}`;
                        options.reportProgress(i, progress);
                    }
                    if (rawOutput.result.data.status != 'pending') isDone = true;
                    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
                    await sleep(10000);
                }
                if (rawOutput) output.result[i] = rawOutput?.result.data;
            } catch (e) {
                if (options?.reportProgress) options.reportProgress(i, JSON.stringify(e));
            }
        }));
        return output;
    }

    public async describe(data: SceneXRawInput, options?: SceneXOptions): Promise<SceneXOutput> {
        let rawOutput = await this.post<SceneXRawOutput>('/describe', data);
        if (options?.algorithm == 'Inception') rawOutput = await this.describeVideo(rawOutput, options);
        const simplifiedOutput = this.toSimplifiedOutout(rawOutput);
        if (options?.raw == true) simplifiedOutput.raw = rawOutput;
        return simplifiedOutput;
    }
}
