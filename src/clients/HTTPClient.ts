import { fetch, HeadersInit } from 'undici';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const CACHE_PATH = '.jinaai-sdk-cache';
const getCacheKey = (url: string, data?: any) => `${url}-${crypto.createHash('sha256').update(JSON.stringify(data)).digest('hex')}`;

type HTTPClientParams = {
    baseURL: string,
    headers?: HeadersInit,
    useCache: boolean
};

export default class HTTPClient {
    private baseURL: string;
    private headers?: HeadersInit;
    private useCache: boolean;

    constructor(params: HTTPClientParams) {
        const { baseURL, headers, useCache } = params;
        this.baseURL = baseURL;
        this.headers = headers;
        this.useCache = useCache;
    }

    public setHeaders(headers: HeadersInit): void {
        this.headers = headers;
    }

    public addHeader(header: HeadersInit): void {
        this.headers = { ...this.headers, ...header };
    }

    public setUseCache(useCache: boolean): void {
        this.useCache = useCache;
    }

    public async get<T>(url: string): Promise<T> {
        const response = await fetch(this.baseURL + url, {
            headers: this.headers,
        });
        return response.json() as T;
    }

    public async post<T>(url: string, data?: any): Promise<T> {
        if (this.useCache) {
            const cacheFilePath = path.join(CACHE_PATH, getCacheKey(url, data));
            if (fs.existsSync(cacheFilePath)) {
                const cachedData = fs.readFileSync(cacheFilePath, 'utf-8');
                return JSON.parse(cachedData) as T;
            }
        }
        const response = await fetch(this.baseURL + url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: this.headers,
        });
        const responseData = await response.json();
        if (this.useCache && !(responseData as any).error) {
            const cacheFilePath = path.join(CACHE_PATH, getCacheKey(url, data));
            if (!fs.existsSync(CACHE_PATH)) fs.mkdirSync(CACHE_PATH);
            fs.writeFileSync(cacheFilePath, JSON.stringify(responseData));
        }
        return responseData as T;
    }

    public async put<T>(url: string, data?: any): Promise<T> {
        const response = await fetch(this.baseURL + url, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: this.headers,
        });
        return response.json() as T;
    }

    public async delete<T>(url: string): Promise<T> {
        const response = await fetch(this.baseURL + url, {
            method: 'DELETE',
            headers: this.headers,
        });
        return response.json() as T;
    }
}

