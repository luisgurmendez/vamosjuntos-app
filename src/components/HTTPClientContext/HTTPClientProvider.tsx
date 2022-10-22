import React from 'react';
import { WithChildren } from 'components/types';
import HTTPClientContext, { HTTPClientState } from './HTTPClientContext';
import HTTPClient from './HTTPClient';

export class HTTPClientProvider extends React.Component<WithChildren, HTTPClientState> {
    state = {
        _jwt: null,
        client: null,
    };

    setJwt = (jwt: string | null) => {
        this.setState({ _jwt: jwt, client: this._buildClientWithJWT(jwt) });
    };

    _buildClientWithJWT(jwt: string | null) {
        if (jwt) {
            return new HTTPClient(jwt);
        }
        return null;
    }

    render() {
        return (
            <HTTPClientContext.Provider
                value={{
                    _jwt: this.state._jwt,
                    setJwt: this.setJwt,
                    client: this.state.client
                }}>
                {this.props.children}
            </HTTPClientContext.Provider>
        );
    }
}
