import { HeadersInit } from 'undici';
type HTTPClientParams = {
    baseURL: string;
    headers?: HeadersInit;
    useCache: boolean;
};
export default class HTTPClient {
    private baseURL;
    private headers?;
    private useCache;
    constructor(params: HTTPClientParams);
    setHeaders(headers: HeadersInit): void;
    addHeader(header: HeadersInit): void;
    setUseCache(useCache: boolean): void;
    get<T>(url: string): Promise<T>;
    post<T>(url: string, data?: any): Promise<T>;
    put<T>(url: string, data?: any): Promise<T>;
    delete<T>(url: string): Promise<T>;
}
export {};
