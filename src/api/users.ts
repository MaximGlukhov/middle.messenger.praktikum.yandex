import { HTTPTransport } from '../core/httpTransport';
import type { APIError, ChangeUserData, ChangeUserPassword, SearchUserData } from './types';

const usersApi = new HTTPTransport('user');

export default class UsersApi {
  async editData(data: ChangeUserData): Promise<void | APIError> {
    return usersApi.put<void | APIError>('/profile', { data });
  }

  async editAvatar(data: FormData): Promise<void | APIError> {
    return usersApi.put<void | APIError>('/profile/avatar', { data });
  }

  async editPassword(data: ChangeUserPassword): Promise<void | APIError> {
    return usersApi.put<void | APIError>('/password', { data });
  }

  async search(data: SearchUserData): Promise<void | APIError> {
    return usersApi.post<void | APIError>('/search', { data });
  }
}
