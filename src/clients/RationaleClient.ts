import { Languages } from '../shared-types';
import JinaClient from './HTTPClient';
import { PromptPerfectOutput } from './PromptPerfectClient';
import { SceneXOutput } from './SceneXClient';

const MAXLEN = 350;

export type RationaleInput = {
    data: Array<{
        decision: string,
        analysis?: 'proscons' | 'swot' | 'multichoice' | 'outcomes',
        style?: 'concise' | 'professional' | 'humor' | 'sarcastic' | 'childish' | 'genZ',
        profileId?: string,
    }>
};

export type RationaleOptions = {
    analysis?: 'proscons' | 'swot' | 'multichoice' | 'outcomes',
    style?: 'concise' | 'professional' | 'humor' | 'sarcastic' | 'childish' | 'genZ',
    profileId?: string,
    append?: string,
    prepend?: string
};

export type RationaleProsConsOutput = {
    pros: {
        [key: string]: string
    },
    cons: {
        [key: string]: string
    },
    bestChoice: string,
    conclusion: string,
    confidenceScore: number
};

export type RationaleSWOTOutput = {
    strengths: {
        [key: string]: string
    },
    weaknesses: {
        [key: string]: string
    },
    opportunities: {
        [key: string]: string
    },
    threats: {
        [key: string]: string
    },
    bestChoice: string,
    conclusion: string,
    confidenceScore: number
};

export type RationaleMultichoiceOutput = {
    [key: string]: string
};

export type RationaleOutcomesOutput = Array<{
    children: RationaleOutcomesOutput,
    labal: string,
    sentiment: string
}>;

export type RationaleOutput = {
    result: {
        result: Array<{
            decision: string,
            decisionUserQuery: string,
            writingStyle: 'concise' | 'professional' | 'humor' | 'sarcastic' | 'childish' | 'genZ',
            hasUserProfile: Boolean,
            analysis: 'proscons' | 'swot' | 'multichoice' | 'outcomes',
            sourceLang: Languages,
            keyResults: RationaleProsConsOutput | RationaleSWOTOutput |
            RationaleMultichoiceOutput | RationaleOutcomesOutput,
            keyResultsConclusion: string,
            keyResultsBestChoice: string,
            confidence: number,
            createdAt: number,
            profileId: string | null,
            isQuality: Boolean,
            nonGibberish: Boolean,
            id: string
        }>
    }
};

type RationaleParams = {
    headers?: Record<string, string>,
    useCache?: boolean
};

export default class RationaleClient extends JinaClient {
    constructor(params: RationaleParams) {
        const { headers, useCache } = params;
        const baseURL = 'https://us-central1-rationale-ai.cloudfunctions.net';
        const defaultHeaders = {
            'Content-Type': 'application/json',
        };
        const mergedHeaders = { ...defaultHeaders, ...headers };
        super({ baseURL, headers: mergedHeaders, useCache: useCache || false });
    }

    public fromArray(input: Array<string>, options?: RationaleOptions): RationaleInput {
        return {
            data: input.map(i => ({
                decision: (options?.prepend || '') + (i).substring(0, MAXLEN) + (options?.append || ''),
                ...options
            }))
        };
    }

    public fromString(input: string, options?: RationaleOptions): RationaleInput {
        return {
            data: [{
                decision: (options?.prepend || '') + (input).substring(0, MAXLEN) + (options?.append || ''),
                ...options
            }]
        };
    }

    public fromSceneX(input: SceneXOutput, options?: RationaleOptions): RationaleInput {
        return {
            data: input.result.map(i => ({
                decision: (options?.prepend || '') + (i.text).substring(0, MAXLEN) + (options?.append || ''),
                ...options
            }))
        };
    }

    public fromPromptPerfect(input: PromptPerfectOutput, options?: RationaleOptions): RationaleInput {
        return {
            data: input.result.map(i => ({
                decision: (options?.prepend || '') +
                    (i.promptOptimized).substring(0, MAXLEN) +
                    (options?.append || ''),
                ...options
            }))
        };
    }

    public isOutput(obj: any): obj is RationaleOutput {
        return typeof obj === 'object' &&
            obj.result &&
            obj.result.result &&
            obj.result.result.every((x: any) => x.decision && x.keyResultsConclusion);
    }

    public async decide(data: RationaleInput) {
        return await this.post<RationaleOutput>('/analysisApi', data);
    }
}
