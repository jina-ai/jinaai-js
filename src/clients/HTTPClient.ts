import { fetch, HeadersInit } from 'undici';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const CACHE_PATH = '.jinaai-sdk-cache';
const getCacheKey = (url: string, data?: any) => `${url}-${crypto.createHash('sha256').update(JSON.stringify(data)).digest('hex')}`;

type HTTPClientParams = {
    baseURL: string,
    headers: HeadersInit,
    options: Record<string, any>,
    useCache: boolean
};

export default class HTTPClient {
    private baseURL: string;
    private headers: HeadersInit;
    private options: Record<string, any>;
    private useCache: boolean;

    constructor(params: HTTPClientParams) {
        const { baseURL, headers, options, useCache } = params;
        this.baseURL = baseURL;
        this.headers = headers;
        this.options = options;
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
            if (await fs.existsSync(cacheFilePath)) {
                const cachedData = await fs.promises.readFile(cacheFilePath, 'utf-8');
                return JSON.parse(cachedData) as T;
            }
        }
        const response = await fetch(this.baseURL + url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: this.headers,
            ...this.options
        });
        const responseData = await response.json();
        if ((responseData as any).error) throw (responseData as any).error;
        if (this.useCache) {
            const cacheFilePath = path.join(CACHE_PATH, getCacheKey(url, data));
            if (!await fs.existsSync(CACHE_PATH)) await fs.promises.mkdir(CACHE_PATH);
            await fs.promises.writeFile(cacheFilePath, JSON.stringify(responseData));
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

