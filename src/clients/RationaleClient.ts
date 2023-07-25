import { Languages } from '../shared-types';
import JinaClient from './HTTPClient';

const MAXLEN = 300;

export type RationaleRawInput = {
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
    raw?: boolean
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
    confidenceScore: number,
};

export type RationaleMultichoiceOutput = {
    [key: string]: string
};

export type RationaleOutcomesOutput = Array<{
    children: RationaleOutcomesOutput,
    labal: string,
    sentiment: string
}>;

export type RationaleRawOutput = {
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

export type RationaleOutput = {
    results: Array<{
        proscons?: RationaleProsConsOutput,
        swot?: RationaleSWOTOutput,
        multichoice?: RationaleMultichoiceOutput,
        outcomes?: RationaleOutcomesOutput
    }>,
    raw?: RationaleRawOutput
};

type RationaleParams = {
    headers?: Record<string, string>,
    options?: Record<string, any>,
    useCache?: boolean
};

export default class RationaleClient extends JinaClient {
    constructor(params: RationaleParams) {
        const { headers, options, useCache } = params;
        const baseURL = 'https://us-central1-rationale-ai.cloudfunctions.net';
        const defaultHeaders = {
            'Content-Type': 'application/json',
        };
        const mergedHeaders = { ...defaultHeaders, ...headers };
        super({ baseURL, headers: mergedHeaders, options: options || {}, useCache: useCache || false });
    }

    public fromArray(input: Array<string>, options?: RationaleOptions): RationaleRawInput {
        return {
            data: input.map(i => ({
                decision: (i).substring(0, MAXLEN),
                ...options
            }))
        };
    }

    public fromString(input: string, options?: RationaleOptions): RationaleRawInput {
        return {
            data: [{
                decision: (input).substring(0, MAXLEN),
                ...options
            }]
        };
    }

    public isOutput(obj: any): obj is RationaleRawOutput {
        return typeof obj === 'object' &&
            obj.result &&
            obj.result.result &&
            obj.result.result.every((x: any) => x.decision && x.keyResultsConclusion);
    }

    public toSimplifiedOutout(output: RationaleRawOutput): RationaleOutput {
        if (!output.result || !output.result.result)
            throw 'Remote API Error, bad output: ' + JSON.stringify(output);
        return {
            results: output.result.result.map(r => ({
                proscons: r.analysis == 'proscons' ? r.keyResults as RationaleProsConsOutput : undefined,
                swot: r.analysis == 'swot' ? r.keyResults as RationaleSWOTOutput : undefined,
                multichoice: r.analysis == 'multichoice' ? r.keyResults as RationaleMultichoiceOutput : undefined,
                outcomes: r.analysis == 'outcomes' ? r.keyResults as RationaleOutcomesOutput : undefined,
            }))
        };
    }

    public async decide(data: RationaleRawInput, options?: RationaleOptions) {
        const rawOutput = await this.post<RationaleRawOutput>('/analysisApi', data);
        const simplifiedOutput = this.toSimplifiedOutout(rawOutput);
        if (options?.raw == true) simplifiedOutput.raw = rawOutput;
        return simplifiedOutput;
    }
}
