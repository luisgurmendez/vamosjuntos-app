import React from 'react';
import HTTPClient from './HTTPClient';

export interface HTTPClientState {
    client: HTTPClient | null;
    _jwt: string | null;
}

export interface HTTPClientApi {
    setJwt: (jwt: string | null) => void;
}

export interface HTTPClientContextState extends HTTPClientState, HTTPClientApi { }

const HTTPClientContext = React.createContext<HTTPClientContextState>({
    _jwt: null,
    client: null,
    setJwt: () => { },
});

export default HTTPClientContext;
