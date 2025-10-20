import Handlebars from 'handlebars';

import * as Components from './components';
import * as Pages from './pages';

import avatarDefault from './assets/avatar-default.svg';
import messagePhoto from './assets/example-photo.jpg';
import renderDOM from './core/renderDom';

import './styles/styles.scss';

const pages = {
  nav: [Pages.NavPage],
  login: [Pages.LoginPage],
  signin: [Pages.SigninPage],
  error500: [Pages.Error500Page],
  error404: [Pages.Error404Page],
  chats: [
    Pages.ChatsPage,
    {
      users: [
        {
          name: 'Андрей',
          avatar: avatarDefault,
          message: 'Изображение',
          time: '10:49',
          countMessage: '2',
        },
        {
          name: 'Киноклуб',
          avatar: avatarDefault,
          message: 'стикер',
          userMessage: 'Вы: ',
          active: true,
          time: '10:49',
          countMessage: '2',
        },
        {
          name: 'Илья',
          avatar: avatarDefault,
          message: 'И Human Interface Guidelines и Material Design рекомендуют...',
          time: '10:49',
          countMessage: '2',
        },
        {
          name: 'Андрей',
          avatar: avatarDefault,
          message: 'Изображение',
          time: '10:49',
          countMessage: '2',
        },
        {
          name: 'Киноклуб',
          avatar: avatarDefault,
          message: 'стикер',
          userMessage: 'Вы: ',
          time: '10:49',
          countMessage: '2',
        },
        {
          name: 'Илья',
          avatar: avatarDefault,
          message: 'И Human Interface Guidelines и Material Design рекомендуют...',
          time: '10:49',
          countMessage: '2',
        },
        {
          name: 'Андрей',
          avatar: avatarDefault,
          message: 'Изображение',
          time: '10:49',
          countMessage: '2',
        },
        {
          name: 'Киноклуб',
          avatar: avatarDefault,
          message: 'стикер',
          userMessage: 'Вы: ',
          time: '10:49',
          countMessage: '2',
        },
        {
          name: 'Илья',
          avatar: avatarDefault,
          message: 'И Human Interface Guidelines и Material Design рекомендуют...',
          time: '10:49',
          countMessage: '2',
        },
        {
          name: 'Андрей',
          avatar: avatarDefault,
          message: 'Изображение',
          time: '10:49',
          countMessage: '2',
        },
        {
          name: 'Киноклуб',
          avatar: avatarDefault,
          message: 'стикер',
          userMessage: 'Вы: ',
          time: '10:49',
          countMessage: '2',
        },
        {
          name: 'Илья',
          avatar: avatarDefault,
          message: 'И Human Interface Guidelines и Material Design рекомендуют...',
          time: '10:49',
          countMessage: '2',
        },
        {
          name: 'Андрей',
          avatar: avatarDefault,
          message: 'Изображение',
          time: '10:49',
          countMessage: '2',
        },
        {
          name: 'Киноклуб',
          avatar: avatarDefault,
          message: 'стикер',
          userMessage: 'Вы: ',
          time: '10:49',
          countMessage: '2',
        },
        {
          name: 'Илья',
          avatar: avatarDefault,
          message: 'И Human Interface Guidelines и Material Design рекомендуют...',
          time: '10:49',
          countMessage: '2',
        },
        {
          name: 'Андрей',
          avatar: avatarDefault,
          message: 'Изображение',
          time: '10:49',
          countMessage: '2',
        },
        {
          name: 'Киноклуб',
          avatar: avatarDefault,
          message: 'стикер',
          userMessage: 'Вы: ',
          time: '10:49',
          countMessage: '2',
        },
        {
          name: 'Илья',
          avatar: avatarDefault,
          message: 'И Human Interface Guidelines и Material Design рекомендуют...',
          time: '10:49',
          countMessage: '2',
        },
        {
          name: 'Андрей',
          avatar: avatarDefault,
          message: 'Изображение',
          time: '10:49',
          countMessage: '2',
        },
        {
          name: 'Киноклуб',
          avatar: avatarDefault,
          message: 'стикер',
          userMessage: 'Вы: ',
          time: '10:49',
          countMessage: '2',
        },
        {
          name: 'Илья',
          avatar: avatarDefault,
          message: 'И Human Interface Guidelines и Material Design рекомендуют...',
          time: '10:49',
          countMessage: '2',
        },
      ],
      showModalAddUser: false,
      showModalRemoveUser: true,
      currentUserName: 'Андрей',
      currentUserAvatar: avatarDefault,
      messagePhoto,
      // closedChat: true
    },
  ],
  profile: [
    Pages.ProfilePage,
    {
      name: 'Maksim',
      avatar: avatarDefault,
    },
  ],
  profileEdit: [
    Pages.ProfileEditPage,
    {
      name: 'Maksim',
      avatar: avatarDefault,
      showModalAddNewAvtar: true,
    },
  ],
  profileEditPassword: [
    Pages.ProfileEditPasswordPage,
    {
      name: 'Maksim',
      avatar: avatarDefault,
    },
  ],
} as const;

Object.entries(Components).forEach(([name, template]) => {
  if (typeof template === 'function') {
    return;
  }
  Handlebars.registerPartial(name, template);
});

function navigate(page: keyof typeof pages) {
  const [source, context] = pages[page];
  if (typeof source === 'function') {
    renderDOM(new source({}));
    return;
  }

  const container = document.getElementById('app')!;

  const temlpatingFunction = Handlebars.compile(source);
  container.innerHTML = temlpatingFunction(context);
}

document.addEventListener('DOMContentLoaded', () => navigate('nav'));

document.addEventListener('click', (e: MouseEvent) => {
  const { target } = e;
  if (!(target instanceof HTMLElement)) {
    return;
  }
  const page = target.getAttribute('page');
  if (page && page in pages) {
    navigate(page as keyof typeof pages);

    e.preventDefault();
    e.stopImmediatePropagation();
  }
});
