
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
        const response = await fetch(this.baseURL + url, {
            headers: this.headers,
        });
        return response.json() as T;
    }

    public async post<T>(url: string, data?: any, toJson = true): Promise<T> {
        const response = await fetch(this.baseURL + url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: this.headers,
            ...this.options
        });
        if (toJson == false) {
            if (!response.body) throw 'Remote API Error, body is missing';
            return response.body.getReader() as T;
        } else {
            const responseData = await response.json();
            if ((responseData as any).error) throw (responseData as any).error;
            return responseData as T;
        }
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

