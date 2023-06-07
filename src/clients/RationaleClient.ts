import { Languages } from '../shared-types';
import JinaClient from './JinaClient';
import { PromptPerfectOutput } from './PromptPerfectClient';
import { SceneXOutput } from './SceneXClient';

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

export default class RationaleClient extends JinaClient {
    constructor(headers?: Record<string, string>) {
        const baseURL = 'https://us-central1-rationale-ai.cloudfunctions.net';
        const defaultHeaders = {
            'Content-Type': 'application/json',
        };
        const mergedHeaders = { ...defaultHeaders, ...headers };
        super(baseURL, mergedHeaders);
    }

    public fromArray(input: Array<string>, options?: RationaleOptions): RationaleInput {
        return {
            data: input.map(i => ({
                decision: (i).substring(0, 300),
                ...options
            }))
        };
    }

    public fromString(input: string, options?: RationaleOptions): RationaleInput {
        return {
            data: [{
                decision: (input).substring(0, 300),
                ...options
            }]
        };
    }

    public fromSceneX(input: SceneXOutput, options?: RationaleOptions): RationaleInput {
        return {
            data: input.result.map(i => ({
                decision: (i.text).substring(0, 300),
                ...options
            }))
        };
    }

    public fromPromptPerfect(input: PromptPerfectOutput, options?: RationaleOptions): RationaleInput {
        return {
            data: input.result.map(i => ({
                decision: (i.promptOptimized).substring(0, 300),
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
