import { Languages } from '../shared-types';
import JinaClient from './HTTPClient';
export type SceneXRawInput = {
    data: Array<{
        image: string;
        algorithm?: 'Aqua' | 'Bolt' | 'Comet' | 'Dune' | 'Ember' | 'Flash';
        features: Array<'high_quality' | 'question_answer'>;
        languages?: Array<Languages>;
        question?: string;
        style?: 'default' | 'concise' | 'prompt';
    }>;
};
export type SceneXOptions = {
    algorithm?: 'Aqua' | 'Bolt' | 'Comet' | 'Dune' | 'Ember' | 'Flash';
    features?: Array<'high_quality' | 'question_answer'>;
    languages?: Array<Languages>;
    question?: string;
    style?: 'default' | 'concise' | 'prompt';
    raw?: boolean;
};
export type SceneXRawOutput = {
    result: Array<{
        id: string;
        image: string;
        features: Array<'high_quality' | 'question_answer'>;
        uid: string;
        algorithm: 'Aqua' | 'Bolt' | 'Comet' | 'Dune' | 'Ember' | 'Flash';
        text: string;
        userId: string;
        createdAt: number;
        i18n: {
            [key: string]: string;
        };
    }>;
};
export type SceneXOutput = {
    results: Array<{
        output: string;
    }>;
    raw?: SceneXRawOutput;
};
type SceneXParams = {
    headers?: Record<string, string>;
    useCache?: boolean;
};
export default class SceneXClient extends JinaClient {
    constructor(params: SceneXParams);
    fromArray(input: Array<string>, options?: SceneXOptions): SceneXRawInput;
    fromString(input: string, options?: SceneXOptions): SceneXRawInput;
    isOutput(obj: any): obj is SceneXRawOutput;
    toSimplifiedOutout(ouput: SceneXRawOutput): SceneXOutput;
    describe(data: SceneXRawInput, options?: SceneXOptions): Promise<SceneXOutput>;
}
export {};
