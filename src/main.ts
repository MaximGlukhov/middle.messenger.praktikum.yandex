import Handlebars from 'handlebars';

import * as Components from './components';
import * as Pages from './pages';

import './styles/styles.scss';
import Router from './core/router';
import { ROUTER } from './const/routesPath';
import { Store } from './core/store';

Object.entries(Components).forEach(([name, template]) => {
  if (typeof template === 'function') {
    return;
  }
  Handlebars.registerPartial(name, template);
});

const APP_ROOT_ELEMNT = '#app';

window.store = new Store({
  isLoading: false,
  apiError: false,
  user: null,
  chats: [],
  activeChat: null,
  token: null,
  searchUser: null,
  messages: [],
});

window.router = new Router(APP_ROOT_ELEMNT);
window.router

  .use('/nav', Pages.NavPage)
  .use(ROUTER.login, Pages.LoginPage)
  .use(ROUTER.signin, Pages.SigninPage)
  .use(ROUTER.settings, Pages.SettingsPage)
  .use(ROUTER.messenger, Pages.ChatsPage)
  .start();
