import { fetch, HeadersInit } from 'undici';

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
        const response = await fetch(this.baseURL + url, {
            headers: this.headers,
        });
        return response.json() as T;
    }

    public async post<T>(url: string, data?: any): Promise<T> {
        const response = await fetch(this.baseURL + url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: this.headers,
        });
        return response.json() as T;
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

