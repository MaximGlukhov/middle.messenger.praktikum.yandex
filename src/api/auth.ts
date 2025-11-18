import { HTTPTransport } from '../core/httpTransport';
import type { APIError, CreateUser, LoginRequestData, SignUpResponse, UserDTO } from './types';

const authApi = new HTTPTransport('auth');

export default class AuthApi {
  async create(data: CreateUser): Promise<SignUpResponse | APIError> {
    return authApi.post<SignUpResponse | APIError>('/signup', { data });
  }

  async login(data: LoginRequestData): Promise<void | APIError> {
    return authApi.post<void | APIError>('/signin', { data });
  }

  async me(): Promise<UserDTO | APIError> {
    return authApi.get<UserDTO | APIError>('/user');
  }

  async logout(): Promise<void | APIError> {
    return authApi.post<void | APIError>('/logout');
  }
}
