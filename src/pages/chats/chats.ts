import { getUserData } from '../../actions/auth';
import { getChats } from '../../actions/chats';
import { searchUser } from '../../actions/users';
import { AddUserModal, Button, Input, RemoveUserModal } from '../../components';
import { ChatsList } from '../../components/chatsList';
import { Messages } from '../../components/messages';
import { ROUTER } from '../../const/routesPath';
import Block from '../../core/block';
import { connect } from '../../utils/connect';
import { formatTime } from '../../utils/formatTime';
import { debounce } from '../../utils/mydash';

import type { GetChats } from '../../api/types';
import type { IUser } from '../../types';
import type { PlainObject } from '../../utils/isEqual';

interface IChatsFields {
  message: string;
}

export interface IChatsProps {
  formState: IChatsFields;
  errors: IChatsFields;
  showModal: boolean;
  user: IUser;
  chats: GetChats[];
  messages: {
    chat_id: number;
    content: string;
    file: File | null;
    id: number;
    is_read: boolean;
    time: string;
    type: string;
    user_id: number;
  }[];
  [key: string]: unknown;
}

export interface IChatsChildren {
  ChatsList: Block;
  InputMessage: Block;
  Messages: Block;
  [key: string]: unknown;
}

class ChatsPage extends Block<IChatsProps, IChatsChildren> {
  socket: WebSocket | undefined;
  searchInputDebounce: (...args: string[]) => void;
  constructor(props: Partial<IChatsProps>) {
    super('main', {
      ...props,
      formState: {
        message: '',
      },
      errors: {
        message: '',
      },

      ChatsList: new ChatsList({
        chatsList: props.chats,
      }),

      showAddUserModal: false,
      showRemoveUserModal: false,
      className: 'chats',
      InputMessage: new Input({
        name: 'message',
        type: 'text',
        className: 'chats__messageArea',
        placeholder: 'Сообщение',
        onChange: (e: InputEvent) => {
          const { value } = e.target as HTMLInputElement;

          this.setProps({
            ...this.props,
            formState: {
              message: value,
            },
          });
        },
      }),

      AddUserButton: new Button({
        title: '+',
        className: 'chats__addUserBtn',
        tooltip: 'Добавить пользователя',
        onClick: () => {
          this.setProps({ ...this.props, showAddUserModal: true });
        },
      }),

      RemoveUserButton: new Button({
        title: '-',
        className: 'chats__removeUserBtn',
        tooltip: 'Удалить пользователя',
        onClick: () => {
          this.setProps({ ...this.props, showRemoveUserModal: true });
        },
      }),

      AddUserModal: new AddUserModal({
        onOk: () => this.setProps({ ...this.props, showAddUserModal: false }),
      }),

      RemoveUserModal: new RemoveUserModal({
        onOk: () => this.setProps({ ...this.props, showRemoveUserModal: false }),
      }),

      ProfileLink: new Button({
        color: 'text',
        title: 'Профиль',
        className: 'chats__profileLink',
        onClick: () => window.router.go(ROUTER.settings),
      }),

      SubmitMessageBtn: new Button({
        title: '',
        className: 'chats__messageBtn',
        type: 'submit',
        onClick: (e: MouseEvent) => {
          e.preventDefault();
          if (this.props.formState.message !== '') {
            this.socket?.send(
              JSON.stringify({
                content: `${this.props.formState.message}`,
                type: 'message',
              })
            );
            this.setProps({
              ...this.props,
              formState: {
                message: '',
              },
            });
          } else {
            this.setProps({
              ...this.props,
              errors: {
                ...this.props.errors,
                message: 'Сообщение пустое',
              },
            });
            console.warn(this.props.errors);
          }
        },
      }),

      SearchInput: new Input({
        name: 'search',
        type: 'text',
        className: 'chats__search',
        placeholder: 'Поиск',
        onInput: (e: InputEvent) => {
          const { value } = e.currentTarget as HTMLInputElement;
          this.searchInputDebounce(value);
        },
      }),

      Messages: new Messages({
        messages: props.messages
          ?.map((prop) => ({
            chat_id: prop.chat_id,
            content: prop.content,
            file: prop.file,
            id: prop.id,
            is_read: prop.is_read,
            time: formatTime(prop.time),
            type: prop.type,
            user_id: prop.user_id,
          }))
          .reverse(),
      }),
    });

    this.searchInputDebounce = debounce((value: string) => {
      searchUser({ login: value });
    }, 500);
  }

  private initWebSocket() {
    this.socket = new WebSocket(
      `wss://ya-praktikum.tech/ws/chats/${this.props.user.id}/${this.props.activeChat}/${this.props.token}`
    );

    this.socket.addEventListener('open', () => {
      this.socket?.send(
        JSON.stringify({
          content: `0`,
          type: 'get old',
        })
      );
    });

    this.socket.addEventListener('message', (event) => {
      const mess = [...this.props.messages];
      if (Array.isArray(JSON.parse(event.data))) {
        window.store.set({ messages: JSON.parse(event.data) });
      } else {
        mess.unshift(JSON.parse(event.data));
        window.store.set({ messages: mess });
      }
    });

    this.socket.addEventListener('close', (event) => {
      if (event.wasClean) {
        console.log('Соединение закрыто чисто');
      } else {
        console.log('Обрыв соединения');
      }

      console.log(`Код: ${event.code} | Причина: ${event.reason}`);
    });
  }

  public componentDidMount(_oldProps?: IChatsProps | undefined): void {
    getUserData();
    getChats();
  }

  public componentDidUpdate(oldProps: IChatsProps, newProps: IChatsProps): boolean {
    if (oldProps.chats !== newProps.chats) {
      this.children.ChatsList.setProps({
        chatsList: newProps.chats,
      });
    }

    if (oldProps.token !== newProps.token) {
      this.initWebSocket();
    }

    if (oldProps.formState?.message !== newProps.formState?.message) {
      this.children.InputMessage.setProps({
        valueName: newProps.formState?.message || '',
      });
    }

    if (oldProps.messages !== newProps.messages) {
      this.children.Messages.setProps({
        messages: newProps.messages
          .map((prop) => ({
            chat_id: prop.chat_id,
            content: prop.content,
            file: prop.file,
            id: prop.id,
            is_read: prop.is_read,
            time: formatTime(prop.time),
            type: prop.type,
            user_id: prop.user_id,
          }))
          .reverse(),
      });
    }

    return true;
  }

  public render(): string {
    return `
  <div class="chats__bar">
    {{{ProfileLink}}}
    {{{SearchInput}}}
    {{{ ChatsList }}}
  </div>
  <div class="chats__messages">
    <div class="chats__notEmpty">
      <header class="chats__currentUser">
        {{#if user.avatar}}
          <img class="chats__currentUserAvatar"
          src="https://ya-praktikum.tech/api/v2/resources{{user.avatar}}" alt="аватар">
        {{else}}
          <img class="chats__currentUserAvatar" src="/src/assets/avatar-default.svg" alt="аватар">
        {{/if}}
        <p class="chats__currentUserName"><strong>{{user.first_name}}</strong></p>
        <div class="chats__currentUserBtns">
          {{{ AddUserButton }}}
          {{{ RemoveUserButton }}}
        </div>
      </header>

      <section class="chats__history">
        {{{Messages}}}
      </section>

      {{#if token}}
        <form class="chats__messageForm">
          {{{ InputMessage }}}
          {{{ SubmitMessageBtn }}}
        </form>
      {{/if}}  
    </div>
  </div>
  {{#if showAddUserModal}}
    {{{ AddUserModal }}}
  {{/if}}
  {{#if showRemoveUserModal}}
    {{{ RemoveUserModal }}}
  {{/if}}   
  `;
  }
}

const mapStateToProps = (state: PlainObject) => {
  return {
    isLoading: state.isLoading,
    getUserError: state.loginError,
    user: state.user,
    chats: state.chats,
    activeChat: state.activeChat,
    token: state.token,
    messages: state.messages,
  };
};

export default connect(mapStateToProps)(ChatsPage);
