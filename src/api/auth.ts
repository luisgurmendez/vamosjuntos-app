import { api } from "./api";
import { ForgotPasswordResponse, GetUserResponse, LoginResponse, RefreshTokenResponse, RegisterResponse } from './responses';
import { User } from 'types/models';
import { Tokens } from 'types/tokens';

export const login = async (username: string, password: string): Promise<Tokens | undefined> => {
  const response = await api.post<LoginResponse>('/auth/login', { username, password });
  console.log(response.data.success);
  if (response.data.success) {
    return { token: response.data.token, refreshToken: response.data.refreshToken };
  }
  return undefined;
};

// TODO: type registration;
export const register = async (registrationForm: any): Promise<User | undefined> => {
  const response = await api.post<RegisterResponse>('/auth/register', registrationForm);
  console.log(response.data.success);
  if (response.data.success) {
    return response.data.user;
  }
  return undefined;
}

// TODO: define how this is going to work
export const forgotPassword = async (ci: string): Promise<void> => {
  const response = await api.post<ForgotPasswordResponse>('/auth/forgot-password', { ci });
  if (response.data.success) {
    // TODO: here
    return undefined;
  }
  return undefined;
}

export const refreshTokens = async (refreshToken: string): Promise<Tokens | undefined> => {
  const response = await api.post<RefreshTokenResponse>('/auth/refresh', { refreshToken });
  if (response.data.success) {
    return { token: response.data.token, refreshToken: response.data.refreshToken };
  }
  return undefined;
}

export const getUser = async (): Promise<User | undefined> => {
  const response = await api.get<GetUserResponse>('/user/me');
  if (response.data.success) {
    return response.data.user;
  }
  return undefined;
}