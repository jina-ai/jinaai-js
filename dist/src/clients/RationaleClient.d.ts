import { Languages } from '../shared-types';
import JinaClient from './HTTPClient';
export type RationaleRawInput = {
    data: Array<{
        decision: string;
        analysis?: 'proscons' | 'swot' | 'multichoice' | 'outcomes';
        style?: 'concise' | 'professional' | 'humor' | 'sarcastic' | 'childish' | 'genZ';
        profileId?: string;
    }>;
};
export type RationaleOptions = {
    analysis?: 'proscons' | 'swot' | 'multichoice' | 'outcomes';
    style?: 'concise' | 'professional' | 'humor' | 'sarcastic' | 'childish' | 'genZ';
    profileId?: string;
    raw?: boolean;
};
export type RationaleProsConsOutput = {
    pros: {
        [key: string]: string;
    };
    cons: {
        [key: string]: string;
    };
    bestChoice: string;
    conclusion: string;
    confidenceScore: number;
};
export type RationaleSWOTOutput = {
    strengths: {
        [key: string]: string;
    };
    weaknesses: {
        [key: string]: string;
    };
    opportunities: {
        [key: string]: string;
    };
    threats: {
        [key: string]: string;
    };
    bestChoice: string;
    conclusion: string;
    confidenceScore: number;
};
export type RationaleMultichoiceOutput = {
    [key: string]: string;
};
export type RationaleOutcomesOutput = Array<{
    children: RationaleOutcomesOutput;
    labal: string;
    sentiment: string;
}>;
export type RationaleRawOutput = {
    result: {
        result: Array<{
            decision: string;
            decisionUserQuery: string;
            writingStyle: 'concise' | 'professional' | 'humor' | 'sarcastic' | 'childish' | 'genZ';
            hasUserProfile: Boolean;
            analysis: 'proscons' | 'swot' | 'multichoice' | 'outcomes';
            sourceLang: Languages;
            keyResults: RationaleProsConsOutput | RationaleSWOTOutput | RationaleMultichoiceOutput | RationaleOutcomesOutput;
            keyResultsConclusion: string;
            keyResultsBestChoice: string;
            confidence: number;
            createdAt: number;
            profileId: string | null;
            isQuality: Boolean;
            nonGibberish: Boolean;
            id: string;
        }>;
    };
};
export type RationaleOutput = {
    results: Array<{
        proscons?: RationaleProsConsOutput;
        swot?: RationaleSWOTOutput;
        multichoice?: RationaleMultichoiceOutput;
        outcomes?: RationaleOutcomesOutput;
    }>;
    raw?: RationaleRawOutput;
};
type RationaleParams = {
    headers?: Record<string, string>;
    useCache?: boolean;
};
export default class RationaleClient extends JinaClient {
    constructor(params: RationaleParams);
    fromArray(input: Array<string>, options?: RationaleOptions): RationaleRawInput;
    fromString(input: string, options?: RationaleOptions): RationaleRawInput;
    isOutput(obj: any): obj is RationaleRawOutput;
    toSimplifiedOutout(ouput: RationaleRawOutput): RationaleOutput;
    decide(data: RationaleRawInput, options?: RationaleOptions): Promise<RationaleOutput>;
}
export {};
