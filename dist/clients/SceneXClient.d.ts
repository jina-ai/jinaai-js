import { Languages } from '../shared-types';
import JinaClient from './JinaClient';
export type SceneXInput = {
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
};
export type SceneXOutput = {
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
export default class SceneXClient extends JinaClient {
    constructor(headers?: Record<string, string>);
    fromArray(input: Array<string>, options?: SceneXOptions): SceneXInput;
    fromString(input: string, options?: SceneXOptions): SceneXInput;
    isOutput(obj: any): obj is SceneXOutput;
    describe(data: SceneXInput): Promise<SceneXOutput>;
}
