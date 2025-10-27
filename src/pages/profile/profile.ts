import Block from '../../core/block';
import { AddNewAvatarModal, Button, Input } from '../../components';
import { UserCard } from '../../components/userCard';

export interface IPropfileProps {
  formState: {
    email: string;
    login: string;
    firstName: string;
    secondName: string;
    phone: string;
    password: string;
    repeatPassword: string;
  };
  errors: {
    email: string;
    login: string;
    firstName: string;
    secondName: string;
    phone: string;
    password: string;
    repeatPassword: string;
  };
  showAddNewAvatarModal: boolean;
}

export default class ProfilePage extends Block {
  constructor(props: IPropfileProps) {
    super('main', {
      ...props,
      formState: {
        email: '',
        login: '',
        firstName: '',
        secondName: '',
        phone: '',
        password: '',
        repeatPassword: '',
      },
      errors: {
        email: '',
        login: '',
        firstName: '',
        secondName: '',
        phone: '',
        password: '',
        repeatPassword: '',
      },
      showAddNewAvatarModal: false,
      UserCard: new UserCard({
        onClick: () => {
          this.setProps({ showAddNewAvatarModal: true });
        },
      }),
      AddNewAvatarModal: new AddNewAvatarModal({
        onOk: () => this.setProps({ showAddNewAvatarModal: false }),
      }),

      EmailInput: new Input({
        name: 'email',
        type: 'text',
      }),

      LoginInput: new Input({
        name: 'login',
        type: 'text',
      }),

      NameInput: new Input({
        name: 'first_name',
        type: 'text',
      }),

      SecondNameInput: new Input({
        name: 'second_name',
        type: 'text',
      }),

      NickNameInput: new Input({
        name: 'display_name',
        type: 'text',
      }),

      PhoneInput: new Input({
        name: 'phone',
        type: 'text',
      }),

      EditDataButton: new Button({
        title: 'Изменить данные',
        color: 'text',
      }),

      EditPasswordButton: new Button({
        title: 'Изменить пароль',
        color: 'text',
      }),

      ExitButton: new Button({
        title: 'Выйти',
        color: 'text',
        className: 'profile__exitBtn',
      }),
    });
  }
  public render(): string {
    return `
      <form class="container profile">
        <div class="profile__container">
          {{{ UserCard }}}
          <div class="profile__data">
            <div class="profile__row">
              <p>Почта</p>
              {{{ EmailInput }}}
            </div>
            <div class="profile__row">
              <p>Логин</p>
              {{{ LoginInput }}}
            </div>
            <div class="profile__row">
              <p>Имя</p>
              {{{  NameInput }}}
            </div>
            <div class="profile__row">
              <p>Фамилия</p>
              {{{ SecondNameInput }}}
            </div>
            <div class="profile__row">
              <p>Имя в чате</p>
              {{{ NickNameInput }}}
            </div>
            <div class="profile__row">
              <p>Телефон</p>
              {{{ PhoneInput }}}
            </div>
          </div>  
          
          <div class="profile__row">
            {{{ EditDataButton }}}
           </div>
          <div class="profile__row">
            {{{ EditPasswordButton }}}
          </div>
          <div class="profile__row">
            {{{ ExitButton }}}
          </div>
        </div>
      </form>   
      {{#if showAddNewAvatarModal}}
        {{{ AddNewAvatarModal }}}
      {{/if}} 
    `;
  }
}
