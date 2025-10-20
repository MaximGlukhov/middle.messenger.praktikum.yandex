import { AddUserModal, Button, Input, RemoveUserModal } from '../../components';
import Block from '../../core/block';

interface IChatsFields {
  message: string;
}

interface IChatsProps {
  formState: IChatsFields;
  errors: IChatsFields;
  showModal: boolean;
}

export default class ChatsPage extends Block {
  constructor(props: IChatsProps) {
    super('main', {
      ...props,
      formState: {
        message: '',
      },
      errors: {
        message: '',
      },
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
            formState: {
              ...this.props.formState,
              message: value,
            },
            errors: {
              ...this.props.errors,
            },
          });
        },
      }),

      AddUserButton: new Button({
        title: '+',
        className: 'chats__addUserBtn',
        tooltip: 'Добавить пользователя',
        onClick: () => {
          this.setProps({ showAddUserModal: true });
        },
      }),

      RemoveUserButton: new Button({
        title: '-',
        className: 'chats__removeUserBtn',
        tooltip: 'Удалить пользователя',
        onClick: () => {
          this.setProps({ showRemoveUserModal: true });
        },
      }),

      AddUserModal: new AddUserModal({
        onOk: () => this.setProps({ showAddUserModal: false }),
      }),

      RemoveUserModal: new RemoveUserModal({
        onOk: () => this.setProps({ showRemoveUserModal: false }),
      }),

      SubmitMessageBtn: new Button({
        title: '',
        className: 'chats__messageBtn',
        type: 'submit',
        onClick: (e: MouseEvent) => {
          e.preventDefault();
          if (this.props.formState.message !== '') {
            console.log(this.props.formState);
          } else {
            this.setProps({
              ...this.props.formState,
              errors: {
                ...this.props.errors,
                message: 'Сообщение пустое',
              },
            });
            console.warn(this.props.errors);
          }
        },
      }),
    });
  }

  public render(): string {
    return `
  <div class="chats__bar">
    <a href="#" class="chats__profileLink">
      Профиль
    </a>
    <input name="search" class="chats__search" type="text" placeholder="Поиск" />
    <ul class="chats__list">
      
    </ul>
  </div>
  <div class="chats__messages">
    <div class="chats__notEmpty">
      <header class="chats__currentUser">
        <img class="chats__currentUserAvatar" src={{currentUserAvatar}} alt="аватар">
        <p class="chats__currentUserName"><strong>{{currentUserName}}</strong></p>
        <div class="chats__currentUserBtns">
          {{{ AddUserButton }}}
          {{{ RemoveUserButton }}}
        </div>
      </header>

      <section class="chats__history">
        <div class="chats__messageTime">19 июня</div>
        <article class="chats__message chats__message_sender">
          <p>Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила
            Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью
            500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с
            собой забрали только кассеты с пленкой.
          </p>
          <p>
            Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не
            попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.</p>
          <div class="chats__senderMessageTime">11:56</div>
        </article>
        <article class="chats__message chats__message_sender">
          <img class="chats__messagePhoto" src={{messagePhoto}} alt="картинка в сообщении">
          <div class="chats__senderMessageTime">11:56</div>
        </article>
        <article class="chats__message chats__message_owner">
          <p>Круто!</p>
          <div class="chats__ownerMessageTime">12:00</div>
        </article>

        <div class="chats__messageTime">19 июня</div>
        <article class="chats__message chats__message_sender">
          <p>Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила
            Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью
            500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с
            собой забрали только кассеты с пленкой.
          </p>
          <p>
            Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не
            попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.</p>
          <div class="chats__senderMessageTime">11:56</div>
        </article>
        <article class="chats__message chats__message_sender">
          <img class="chats__messagePhoto" src={{messagePhoto}} alt="картинка в сообщении">
          <div class="chats__senderMessageTime">11:56</div>
        </article>
        <article class="chats__message chats__message_owner">
          <p>Круто!</p>

          <div class="chats__ownerMessageTime">
            <div class="chats__message_ownerCheck">
              <svg width="10" height="5" viewBox="0 0 10 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line y1="-0.5" x2="3.765" y2="-0.5"
                  transform="matrix(0.705933 0.708278 -0.705933 0.708278 0.700195 2.33313)" stroke="currentColor" />
                <line y1="-0.5" x2="5.6475" y2="-0.5"
                  transform="matrix(0.705933 -0.708278 0.705933 0.708278 3.35828 5.00006)" stroke="currentColor" />
                <line y1="-0.5" x2="5.6475" y2="-0.5"
                  transform="matrix(0.705933 -0.708278 0.705933 0.708278 6.01587 5.00006)" stroke="currentColor" />
              </svg>
            </div>
            <span>12:00</span>
          </div>
        </article>
      </section>

      <form class="chats__messageForm">
        {{{ InputMessage }}}
        {{{ SubmitMessageBtn }}}
      </form>
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
