import axios, { CancelToken } from 'axios';
import { Tokens } from 'types/tokens';
import Storage from 'storage/Storage';

export const api = axios.create({
  baseURL: 'http://192.168.1.9:80'
});

api.interceptors.response.use((response) => {
  return response;
});

api.interceptors.request.use(async req => {
  // TODO: move since this will exectue everytime user makes a request.
  // Maybe use axios.defaults.headers.common['Authorization'] = token;  instead.
  const accessToken = await Storage.getItem<Tokens>(Storage.TOKENS);
  if (accessToken && Object.keys(accessToken).length !== 0) {
    req.headers.Authorization = accessToken.token
  }
  return req;
})

export const getCancelTokenSource = () => {
  return axios.CancelToken.source();
}
