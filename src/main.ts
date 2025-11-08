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
  loginError: false,
  signinError: false,
  getUserError: false,
  logoutError: false,
  user: null,
});

window.router = new Router(APP_ROOT_ELEMNT);
window.router
  .use('/', Pages.NavPage)
  .use(ROUTER.login, Pages.LoginPage)
  .use(ROUTER.signin, Pages.SigninPage)
  .use(ROUTER.settings, Pages.SettingsPage)
  .use(ROUTER.messenger, Pages.ChatsPage)
  .start();
