import ChatsApi from '../api/chats';
import UsersApi from '../api/users';

const chatsApi = new ChatsApi();
const usersApi = new UsersApi();

export const getChats = () => {
  window.store.set({ isLoading: true });
  chatsApi
    .getChats()
    .then((res) => {
      window.store.set({ apiError: false });
      window.store.set({ chats: res });
    })
    .catch((err) => {
      window.store.set({ apiError: err.reason });
    })
    .finally(() => {
      window.store.set({ isLoading: false });
    });
};

export const addChat = (data: { title: string }) => {
  window.store.set({ isLoading: true });
  chatsApi
    .add(data)
    .then(() => {
      window.store.set({ apiError: false });
      getChats();
    })
    .catch((err) => {
      window.store.set({ apiError: err.reason });
    })
    .finally(() => {
      window.store.set({ isLoading: false });
    });
};

export const addUsersToChat = (login: { login: string }) => {
  window.store.set({ isLoading: true });
  usersApi.search(login).then((users) => {
    chatsApi.add({ title: login.login }).then((chatId) => {
      chatsApi.create(chatId.id).then((dataToken) => {
        window.store.set({ token: dataToken.token, activeChat: chatId.id });
        chatsApi.addUser({ users: [users[0].id], chatId: chatId.id });
        getChats();
      });
    });
  });
};

export const createTokenChat = (chatId: number) => {
  window.store.set({ isLoading: true });
  chatsApi
    .create(chatId)
    .then((res) => {
      window.store.set({ apiError: false });
      window.store.set({ token: res.token });
    })
    .catch((err) => {
      window.store.set({ apiError: err.reason });
    })
    .finally(() => {
      window.store.set({ isLoading: false });
    });
};

export const removeUser = (chatId: number) => {
  window.store.set({ isLoading: true });
  chatsApi
    .remove({ chatId })
    .then(() => {
      window.store.set({ apiError: false });
      getChats();
    })
    .catch((err) => {
      window.store.set({ apiError: err.reason });
    })
    .finally(() => {
      window.store.set({ isLoading: false });
    });
};
