import useHTTPClient from "components/HTTPClientContext/useHTTPClient";
import { useCallback } from "react";
import crashlytics from '@react-native-firebase/crashlytics';

interface ErrorResponse {
    errorCode: string;
    success: false,
    message: string;
}

class CallableError extends Error {
    errorCode: string;
    constructor(errorCode: string, message: string) {
        super(message);
        this.errorCode = errorCode;
    }
    toString() {
        return `Uncaught Callable Error: ${this.errorCode}, ${this.message} `
    }
}

export interface CallableResponse<R> {
    status: boolean;
    data: R
}

function useCallable<R>(path: string) {
    const httpClient = useHTTPClient();
    const callable = useCallback(async <B>(body?: B) => {
        if (httpClient) {
            try {
                const response = await httpClient.post<B>(path, body);
                if (response.ok) {
                    const data = await response.json() as CallableResponse<R>;
                    return data;
                } else {
                    const data = await response.json() as ErrorResponse;
                    throw new CallableError(data.errorCode, data.message);
                }
            } catch (e) {
                crashlytics().recordError(e, `HTTP Callable error for path ${path}`);
                throw e;
            }
        }
        throw Error('No HTTPClient');
    }, [httpClient, path]);
    return callable;
}

export default useCallable;