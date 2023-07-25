import JinaClient from './HTTPClient';

export type BestBannerRawInput = {
    data: Array<{
        text: string,
        bannerCount?: number,
    }>
};

export type BestBannerOptions = {
    bannerCount?: number,
    raw?: boolean
};

export type BestBannerRawOutput = {
    result: Array<{
        id: string,
        userId: string,
        text: string,
        plainText?: string | null,
        algorithms: Array<string>,
        resolution: {
            width: number,
            height: number
        }
        banners: Array<{
            id: string,
            url: string
        }>,
        createdAt: {
            nanoseconds: number,
            seconds: number
        },
        metaData: {
            [key: string]: any
        },
    }>
};

export type BestBannerOutput = {
    results: Array<{
        output: Array<string>,
    }>
    raw?: BestBannerRawOutput
};

type BestBannerParams = {
    headers?: Record<string, string>,
    options?: Record<string, any>,
    useCache?: boolean
};

export default class BestBannerClient extends JinaClient {
    constructor(params: BestBannerParams) {
        const { headers, options, useCache } = params;
        const baseURL = 'https://api.bestbanner.jina.ai/v1';
        const defaultHeaders = {
            'Content-Type': 'application/json',
        };
        const mergedHeaders = { ...defaultHeaders, ...headers };
        super({ baseURL, headers: mergedHeaders, options: options || {}, useCache: useCache || false });
    }

    public fromArray(input: Array<string>, options?: BestBannerOptions): BestBannerRawInput {
        return {
            data: input.map(i => ({
                text: i,
                ...options
            }))
        };
    }

    public fromString(input: string, options?: BestBannerOptions): BestBannerRawInput {
        return {
            data: [{
                text: input,
                ...options
            }]
        };
    }

    public isOutput(obj: any): obj is BestBannerRawOutput {
        return typeof obj === 'object' &&
            obj.result &&
            obj.result.every((x: any) => x.banners);
    }

    public toSimplifiedOutout(output: BestBannerRawOutput): BestBannerOutput {
        if (!output.result || output.result.every(x => x.banners && x.banners.length != 0) == false)
            throw 'Remote API Error, bad output: ' + JSON.stringify(output);
        return {
            results: output.result.map(r => ({
                output: r.banners.map(b => b.url),
            }))
        };
    }

    public async imagine(data: BestBannerRawInput, options?: BestBannerOptions): Promise<BestBannerOutput> {
        const rawOutput = await this.post<BestBannerRawOutput>('/generate', data);
        const simplifiedOutput = this.toSimplifiedOutout(rawOutput);
        if (options?.raw == true) simplifiedOutput.raw = rawOutput;
        return simplifiedOutput;
    }
}
