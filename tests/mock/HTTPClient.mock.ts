/* eslint-disable @typescript-eslint/no-unused-vars */
import { HeadersInit } from 'undici';
import NotImplementedResponse from './responses/NotImplemented.response.json';
import AuthKOResponse from './responses/Auth.KO.response.json';
import SceneXResponse from './responses/SceneX.response';
import PromptPerfectResponse from './responses/PromptPerfect.response';
import RationaleResponse from './responses/Rationale.response';
import ChatCatResponse from './responses/ChatCat.response';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const CACHE_PATH = '.jinaai-sdk-cache-tests';
const getCacheKey = (url: string, data?: any) => `${url}-${crypto.createHash('sha256').update(JSON.stringify(data)).digest('hex')}`;

const sleep = (milliseconds: number) => new Promise(resolve => setTimeout(resolve, milliseconds));
const hasAuthHeader = (headers: HeadersInit) => {
    const h = headers as Record<string, string>;
    if (h['x-api-key'] && h['x-api-key'] != '') return true;
    if (h['authorization'] && h['authorization'] != '') return true;
    return false;
};

type HTTPClientParams = {
    baseURL: string,
    headers: HeadersInit,
    useCache: boolean
};

export default class HTTPClient {
    private baseURL: string;
    private headers: HeadersInit;
    private useCache: boolean;

    constructor(params: HTTPClientParams) {
        const { baseURL, headers, useCache } = params;
        this.baseURL = baseURL;
        this.headers = headers;
        this.useCache = useCache;
    }

    public async post<T>(url: string, data?: any): Promise<T> {
        await sleep(1);
        if (this.useCache) {
            const cacheFilePath = path.join(CACHE_PATH, getCacheKey(url, data));
            if (fs.existsSync(cacheFilePath)) {
                const cachedData = fs.readFileSync(cacheFilePath, 'utf-8');
                return JSON.parse(cachedData) as T;
            }
        }
        let responseData: any = undefined;
        if (!hasAuthHeader(this.headers)) responseData = AuthKOResponse;
        else {
            switch (url) {
                case '/describe': responseData = SceneXResponse(data); break;
                case '/analysisApi': responseData = RationaleResponse(data); break;
                case '/optimizeBatch': responseData = PromptPerfectResponse(data); break;
                case '/completion': responseData = ChatCatResponse(data); break;
                default: responseData = NotImplementedResponse;
            }
        }
        if ((responseData as any).error) throw (responseData as any).error;
        if (this.useCache) {
            const cacheFilePath = path.join(CACHE_PATH, getCacheKey(url, data));
            if (!fs.existsSync(CACHE_PATH)) fs.mkdirSync(CACHE_PATH);
            fs.writeFileSync(cacheFilePath, JSON.stringify(responseData));
        }
        return responseData as T;
    }
}

