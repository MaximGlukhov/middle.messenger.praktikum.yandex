import AuthApi from '../api/auth';
import type { CreateUser, LoginRequestData } from '../api/types';
import { ROUTER } from '../const/routesPath';

const authApi = new AuthApi();

export const signinUser = (model: CreateUser) => {
  window.store.set({ isLoading: true });
  authApi
    .create(model)
    .then(() => {
      window.router.go(ROUTER.login);
      window.store.set({ signinError: false });
    })
    .catch((err) => {
      window.store.set({ signinError: err.reason });
    })
    .finally(() => {
      window.store.set({ isLoading: false });
    });
};

export const loginUser = (model: LoginRequestData) => {
  window.store.set({ isLoading: true });
  authApi
    .login(model)
    .then(() => {
      window.router.go(ROUTER.messenger);
      window.store.set({ signinError: false });
    })
    .catch((err) => {
      window.store.set({ signinError: err });
    })
    .finally(() => {
      window.store.set({ isLoading: false });
    });
};

export const getUserData = () => {
  window.store.set({ isLoading: true });
  authApi
    .me()
    .then((res) => {
      window.store.set({ user: res });
      window.store.set({ getUserError: false });
    })
    .catch((err) => {
      window.store.set({ getUserError: err });
    })
    .finally(() => {
      window.store.set({ isLoading: false });
    });
};

export const logout = () => {
  window.store.set({ isLoading: true });
  authApi
    .logout()
    .then(() => {
      window.store.set({ logoutError: false, user: null });
      window.router.go(ROUTER.login);
    })
    .catch((err) => {
      window.store.set({ logoutError: err });
    })
    .finally(() => {
      window.store.set({ isLoading: false });
    });
};
