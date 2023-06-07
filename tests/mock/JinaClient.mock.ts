/* eslint-disable @typescript-eslint/no-unused-vars */
import { HeadersInit } from 'undici';
import NotImplementedResponse from './responses/NotImplemented.response.json';
import AuthKOResponse from './responses/Auth.KO.response.json';
import SceneXResponse from './responses/SceneX.response';
import PromptPerfectResponse from './responses/PromptPerfect.response';
import RationaleResponse from './responses/Rationale.response';


const sleep = (milliseconds: number) => new Promise(resolve => setTimeout(resolve, milliseconds));
const hasAuthHeader = (headers: HeadersInit) => {
    for (const key in headers) if (key.toLowerCase() === 'x-api-key') return true;
    return false;
};

export default class JinaClient {
    private baseURL: string;
    private headers?: HeadersInit;

    constructor(baseURL: string, headers?: HeadersInit) {
        this.baseURL = baseURL;
        this.headers = headers;
    }

    public setHeaders(headers: HeadersInit): void {
        this.headers = headers;
    }

    public addHeader(header: HeadersInit): void {
        this.headers = { ...this.headers, ...header };
    }

    public async get<T>(url: string): Promise<T> {
        await sleep(1);
        return NotImplementedResponse as T;
    }

    public async post<T>(url: string, data?: any): Promise<T> {
        await sleep(1);
        if (this.headers && !hasAuthHeader(this.headers))
            return AuthKOResponse as T;
        switch (url) {
            case '/describe': return SceneXResponse(data) as T;
            case '/analysisApi': return RationaleResponse(data) as T;
            case '/optimizeBatch': return PromptPerfectResponse(data) as T;
            default: return NotImplementedResponse as T;
        }
    }

    public async put<T>(url: string, data?: any): Promise<T> {
        await sleep(1);
        return NotImplementedResponse as T;
    }

    public async delete<T>(url: string): Promise<T> {
        await sleep(1);
        return NotImplementedResponse as T;
    }
}

