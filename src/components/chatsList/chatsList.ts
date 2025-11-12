import ChatsApi from '../../api/chats';
import type { GetChats } from '../../api/types';
import Block from '../../core/block';
import type { IUser } from '../../types';
import { connect } from '../../utils/connect';
import { formatTime } from '../../utils/formatTime';
import type { PlainObject } from '../../utils/isEqual';
import { ChatItem } from '../chatItem';

export interface IChatList {
  avatar: string;
  lastMessage: string;
  countMessage: number;
  time: string;
  chatsList: GetChats[];
  activeChat: number;
  user: IUser;
  click: () => void;
  [key: string]: unknown;
}

interface IChatListChildren {
  [key: string]: unknown;
}

class ChatsList extends Block<IChatList, IChatListChildren> {
  constructor(props: Partial<IChatList>) {
    super('ul', {
      ...props,
      className: 'chats__list',
      chatsList: props.chatsList || [],
    });
  }

  protected init(): void {
    this.updateChatItems();
  }

  private updateChatItems() {
    this.children.chatsItems = this.props.chatsList?.map(
      (props, _index) =>
        new ChatItem({
          avatar: props.last_message?.user.avatar
            ? `https://ya-praktikum.tech/api/v2/resources/${props.last_message?.user.avatar}`
            : '/src/assets/avatar-default.svg',
          countMessage: props.unread_count,
          name: props.title,
          time: formatTime(props.last_message?.time),
          lastMessage: props.last_message?.content,
          active: props.id === this.props.activeChat,
          onClick: () => {
            window.store.set({ activeChat: props.id });
            window.store.set({ isLoading: true });

            const chatsApi = new ChatsApi();
            chatsApi
              .create(props.id)
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
          },
        })
    );
  }

  componentDidUpdate(oldProps: IChatList, newProps: IChatList): boolean {
    if (oldProps !== newProps) {
      this.updateChatItems();
    }
    return true;
  }

  public render(): string {
    return `
      {{#each chatsItems}}
        {{{this}}}
      {{/each}}
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
  };
};

export default connect(mapStateToProps)(ChatsList);
