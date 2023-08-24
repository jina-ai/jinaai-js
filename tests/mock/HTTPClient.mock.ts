/* eslint-disable @typescript-eslint/no-unused-vars */
import NotImplementedResponse from './responses/NotImplemented.response.json';
import AuthKOResponse from './responses/Auth.KO.response.json';
import SceneXResponse from './responses/SceneX.response';
import PromptPerfectResponse from './responses/PromptPerfect.response';
import RationaleResponse from './responses/Rationale.response';
import JinaChatResponse from './responses/JinaChat.response';
import BestBannerResponse from './responses/BestBanner.response';


const sleep = (milliseconds: number) => new Promise(resolve => setTimeout(resolve, milliseconds));
const hasAuthHeader = (headers: HeadersInit) => {
    const h = headers as Record<string, string>;
    if (h['x-api-key'] && h['x-api-key'] != '') return true;
    if (h['authorization'] && h['authorization'] != '') return true;
    return false;
};


export type HTTPClientParams = {
    baseURL: string,
    headers: HeadersInit,
    options: Record<string, any>,
};

export class HTTPClient {
    protected baseURL: string;
    protected headers: HeadersInit;
    protected options: Record<string, any>;

    constructor(params: HTTPClientParams) {
        const { baseURL, headers, options } = params;
        this.baseURL = baseURL;
        this.headers = headers;
        this.options = options;
    }

    public async get<T>(url: string): Promise<T> {
        await sleep(1);
        return { error: 'not imlemented' } as T;
    }


    public async post<T>(url: string, data?: any): Promise<T> {
        await sleep(1);
        let responseData: any = undefined;
        if (!hasAuthHeader(this.headers)) responseData = AuthKOResponse;
        else {
            switch (url) {
                case '/describe': responseData = SceneXResponse(data); break;
                case '/analysisApi': responseData = RationaleResponse(data); break;
                case '/optimizeBatch': responseData = PromptPerfectResponse(data); break;
                case '/completions': responseData = JinaChatResponse(data); break;
                case '/generate': responseData = BestBannerResponse(data); break;
                default: responseData = NotImplementedResponse;
            }
        }
        if ((responseData as any).error) throw (responseData as any).error;
        return responseData as T;
    }

    public async put<T>(url: string, data?: any): Promise<T> {
        await sleep(1);
        return { error: 'not imlemented' } as T;
    }

    public async delete<T>(url: string): Promise<T> {
        await sleep(1);
        return { error: 'not imlemented' } as T;
    }

}

