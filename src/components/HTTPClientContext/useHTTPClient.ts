import { useContext } from "react";
import HTTPClientContext from "./HTTPClientContext";

function useHTTPClient() {
    const state = useContext(HTTPClientContext)
    return state.client;
}

export default useHTTPClient;
