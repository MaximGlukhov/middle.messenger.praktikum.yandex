import type { IUser } from '../types';

export type APIError = {
  reason: string;
};

export type SignUpResponse = {
  id: number;
};

export type UserDTO = {
  id: number;
  login: string;
  first_name: string;
  second_name: string;
  display_name: string;
  avatar: string;
  phone: string;
  email: string;
};

export type CreateUser = Omit<UserDTO, 'avatar' | 'display_name' | 'id'> & {
  password: string;
};

export type CreateChat = {
  title: string;
};

export type LoginRequestData = {
  login: string;
  password: string;
};

type LastMessage = {
  user: UserDTO;
  time: string;
  content: string;
};

export type ChatDTO = {
  id: number;
  title: string;
  avatar: string | null;
  unread_count: number;
  last_message: LastMessage | null;
};

export type ChangeUserData = {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
};

export type ChangeUserAvatarData = {
  avatar: File;
};

export type ChangeUserPassword = {
  oldPassword: string;
  newPassword: string;
};

export type SearchUserData = {
  login: string;
};

export type GetChats = {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  created_by: number;
  last_message?: {
    user: IUser;
    time: string;
    content: string;
  };
};

export interface IAddUsersChatData {
  users: number[];
  chatId: number;
}
