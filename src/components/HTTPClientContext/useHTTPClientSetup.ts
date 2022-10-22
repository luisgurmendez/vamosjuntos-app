import { useContext } from "react";
import HTTPClientContext from "./HTTPClientContext";

function useHTTPClientSetup() {
    const state = useContext(HTTPClientContext)
    return { setJwt: state.setJwt, jwt: state._jwt };
}

export default useHTTPClientSetup;
