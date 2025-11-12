import { HTTPTransport } from '../core/httpTransport';
import type { APIError, GetChats, IAddUsersChatData } from './types';

const chatsApi = new HTTPTransport('chats');

export default class ChatsApi {
  async getChats(): Promise<GetChats | APIError> {
    return chatsApi.get<GetChats | APIError>('');
  }

  async add(data: { title: string }): Promise<{ id: number }> {
    return chatsApi.post<{ id: number }>('', { data });
  }

  async create(chatId: number): Promise<{ token: string }> {
    return chatsApi.post<{ token: string }>(`/token/${chatId}`);
  }

  async addUser(data: IAddUsersChatData): Promise<void | APIError> {
    return chatsApi.put('/users', { data });
  }

  async remove(data: { chatId: number }): Promise<void> {
    return chatsApi.delete('', { data });
  }
}
