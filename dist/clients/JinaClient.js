"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const undici_1 = require("undici");
class JinaClient {
    constructor(baseURL, headers) {
        this.baseURL = baseURL;
        this.headers = headers;
    }
    setHeaders(headers) {
        this.headers = headers;
    }
    addHeader(header) {
        this.headers = { ...this.headers, ...header };
    }
    async get(url) {
        const response = await (0, undici_1.fetch)(this.baseURL + url, {
            headers: this.headers,
        });
        return response.json();
    }
    async post(url, data) {
        const response = await (0, undici_1.fetch)(this.baseURL + url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: this.headers,
        });
        return response.json();
    }
    async put(url, data) {
        const response = await (0, undici_1.fetch)(this.baseURL + url, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: this.headers,
        });
        return response.json();
    }
    async delete(url) {
        const response = await (0, undici_1.fetch)(this.baseURL + url, {
            method: 'DELETE',
            headers: this.headers,
        });
        return response.json();
    }
}
exports.default = JinaClient;
//# sourceMappingURL=JinaClient.js.map