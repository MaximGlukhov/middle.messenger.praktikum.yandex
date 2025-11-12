import type { ChangeUserData, ChangeUserPassword } from '../api/types';
import UsersApi from '../api/users';

const usersApi = new UsersApi();

export const editUserData = (model: ChangeUserData) => {
  window.store.set({ isLoading: true });
  usersApi
    .editData(model)
    .then(() => {
      window.store.set({ apiError: false });
    })
    .catch((err) => {
      window.store.set({ apiError: err.reason });
    })
    .finally(() => {
      window.store.set({ isLoading: false });
    });
};

export const editPassword = (model: ChangeUserPassword) => {
  window.store.set({ isLoading: true });
  usersApi
    .editPassword(model)
    .then(() => {
      window.store.set({ apiError: false });
    })
    .catch((err) => {
      window.store.set({ apiError: err.reason });
    })
    .finally(() => {
      window.store.set({ isLoading: false });
    });
};

export const editAvatar = (model: FormData) => {
  window.store.set({ isLoading: true });
  usersApi
    .editAvatar(model)
    .then(() => {
      window.store.set({ apiError: false });
    })
    .catch((err) => {
      window.store.set({ apiError: err.reason });
    })
    .finally(() => {
      window.store.set({ isLoading: false });
    });
};

export const searchUser = (model: { login: string }) => {
  window.store.set({ isLoading: true });
  usersApi
    .search(model)
    .then((res) => {
      window.store.set({ apiError: false, searchUser: res[0] });
    })
    .catch((err) => {
      window.store.set({ apiError: err.reason });
    })
    .finally(() => {
      window.store.set({ isLoading: false });
    });
};
