import { HeadersInit } from 'undici';
export default class JinaClient {
    private baseURL;
    private headers?;
    constructor(baseURL: string, headers?: HeadersInit);
    setHeaders(headers: HeadersInit): void;
    addHeader(header: HeadersInit): void;
    get<T>(url: string): Promise<T>;
    post<T>(url: string, data?: any): Promise<T>;
    put<T>(url: string, data?: any): Promise<T>;
    delete<T>(url: string): Promise<T>;
}
