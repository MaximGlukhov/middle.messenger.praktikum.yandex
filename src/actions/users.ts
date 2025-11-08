import type { ChangeUserData, ChangeUserPassword } from '../api/types';
import UsersApi from '../api/users';

const usersApi = new UsersApi();

export const editUserData = (model: ChangeUserData) => {
  window.store.set({ isLoading: true });
  usersApi
    .editData(model)
    .then(() => {
      window.store.set({ signinError: false });
    })
    .catch((err) => {
      window.store.set({ signinError: err.reason });
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
      window.store.set({ signinError: false });
    })
    .catch((err) => {
      window.store.set({ signinError: err.reason });
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
      window.store.set({ signinError: false });
    })
    .catch((err) => {
      window.store.set({ signinError: err.reason });
    })
    .finally(() => {
      window.store.set({ isLoading: false });
    });
};
