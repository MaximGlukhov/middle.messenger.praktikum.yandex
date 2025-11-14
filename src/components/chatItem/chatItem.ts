import Block from '../../core/block';
import { connect } from '../../utils/connect';
import type { PlainObject } from '../../utils/isEqual';

export interface IChat {
  avatar: string;
  lastMessage: string;
  countMessage: number;
  time: string;
  name: string;
  active: boolean;
  [key: string]: unknown;
}

class ChatItem extends Block<IChat, {}> {
  constructor(props: IChat) {
    super('li', {
      ...props,
      className: 'chats__item',
      events: {
        click: props.onClick,
      },
    });
  }

  public render(): string {
    return `
      <div class="user {{#if active}}user_active{{/if}}">
        <img src="{{avatar}}" class="user__avatar" alt="Аватар пользователя" />
        <div class="user__description">
          <p class="user__name"><strong>{{name}}</strong></p>
          <p class="user__lastMessage">
            <strong class="user__userMessage">{{userMessage}}</strong>
            {{lastMessage}}
          </p>
        </div>
        <div class="user__infoBlock">
          <span class="user__time">{{time}}</span>
        {{#if countMessage}}
          <span class="user__countMessage">{{countMessage}}</span>
        {{/if}}
         
        </div>
      </div>
    `;
  }
}

const mapStateToProps = (state: PlainObject) => {
  return {
    isLoading: state.isLoading,
    getUserError: state.loginError,
    user: state.user,
    chats: state.chats,
  };
};

export default connect(mapStateToProps)(ChatItem);
