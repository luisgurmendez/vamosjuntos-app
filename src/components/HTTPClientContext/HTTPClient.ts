
const apiUrl = 'https://api.vamosjuntos.es';

class HTTPClient {
    jwt: string;
    baseUrl: string;

    constructor(_jwt: string, _baseUrl?: string) {
        this.jwt = _jwt;
        this.baseUrl = _baseUrl ?? apiUrl
    }

    async post<B>(path: string, body?: B) {
        const request = this._buildRequest('POST', body);
        const url = this._buildUrl(path);
        return await fetch(url, request);

    }

    async get(path: string) {
        const url = this._buildUrl(path);
        return fetch(url, this._buildRequest('GET'));
    }

    _buildUrl(path: string) {
        return `${apiUrl}${path}`
    }

    _buildRequest<B>(method: 'POST' | 'GET' | 'PUT', body?: B): RequestInit {
        return {
            method,
            body: body ? JSON.stringify(body) : null,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': this.jwt
            },
        }
    }

}


export default HTTPClient;