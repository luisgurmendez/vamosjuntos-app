
const apiUrl = 'https://api.vamosjuntos.es';

class UnAuthedHTTPClient {
    baseUrl: string;

    constructor(_baseUrl?: string) {
        this.baseUrl = _baseUrl ?? apiUrl
        console.log(this.baseUrl);
    }

    async post<B>(path: string, body?: B) {
        const request = this._buildRequest('POST', body);
        const url = this._buildUrl(path);
        return await fetch(url, request);
    }

    async get(path: string, query?: object | string) {
        const url = this._buildUrl(path);
        const urlWithQueryParams = `${url}?${this._buildQueryParams(query)}`
        return fetch(urlWithQueryParams, this._buildRequest('GET'));
    }

    _buildQueryParams(obj: any) {
        if (typeof obj === 'string') {
            return obj;
        }
        const keyValuePairs = [];
        for (const key in obj) {
            keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
        }
        return keyValuePairs.join('&');
    }

    _buildUrl(path: string) {
        return `${this.baseUrl}${path}`
    }

    _buildRequest<B>(method: 'POST' | 'GET' | 'PUT', body?: B): RequestInit {
        return {
            method,
            body: body ? JSON.stringify(body) : null,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }
    }

}


export default UnAuthedHTTPClient;
