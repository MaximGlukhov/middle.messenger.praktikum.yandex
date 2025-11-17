import Block from '../../core/block';
import { AddNewAvatarModal, Button, Input } from '../../components';
import { UserCard } from '../../components/userCard';
import { logout } from '../../actions/auth';
import { connect } from '../../utils/connect';
import type { PlainObject } from '../../utils/isEqual';
import type { IUser } from '../../types';

export interface IProfileProps {
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
  user: IUser | null;
  showAddNewAvatarModal: boolean;
  onRouteEditData: () => void;
  onRouteEditPassword: () => void;
  [key: string]: unknown;
}

export interface IProfileChildren {
  [key: string]: unknown;
  EmailInput: Block;
  LoginInput: Block;
  NameInput: Block;
  SecondNameInput: Block;
  NickNameInput: Block;
  PhoneInput: Block;
  UserCard: Block;
}

class ProfilePage extends Block<IProfileProps, IProfileChildren> {
  constructor(props: Partial<IProfileProps>) {
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
        onOk: () => {
          this.setProps({ showAddNewAvatarModal: false });
        },
        onClose: () => {
          this.setProps({ showAddNewAvatarModal: false });
        },
      }),

      EmailInput: new Input({
        name: 'email',
        type: 'text',
        readonly: true,
        valueName: props.user?.email,
      }),

      LoginInput: new Input({
        name: 'login',
        type: 'text',
        readonly: true,
        value: props.user?.login,
      }),

      NameInput: new Input({
        name: 'first_name',
        type: 'text',
        readonly: true,
        valueName: props.user?.first_name,
      }),

      SecondNameInput: new Input({
        name: 'second_name',
        type: 'text',
        readonly: true,
        valueName: props.user?.second_name,
      }),

      NickNameInput: new Input({
        name: 'display_name',
        type: 'text',
        readonly: true,
        valueName: props.user?.display_name ?? '',
      }),

      PhoneInput: new Input({
        name: 'phone',
        readonly: true,
        type: 'text',
        valueName: props.user?.phone,
      }),

      EditDataButton: new Button({
        title: 'Изменить данные',
        color: 'text',
        onClick: props.onRouteEditData,
      }),

      EditPasswordButton: new Button({
        title: 'Изменить пароль',
        color: 'text',
        onClick: props.onRouteEditPassword,
      }),

      ExitButton: new Button({
        title: 'Выйти',
        color: 'text',
        className: 'profile__exitBtn',
        onClick: () => {
          logout();
        },
      }),
    });
  }

  componentDidUpdate(oldProps: IProfileProps, newProps: IProfileProps) {
    if (oldProps.user !== newProps.user) {
      this.updateAllInputs(newProps.user);
    }
    return true;
  }

  private updateAllInputs(user: IUser | null) {
    const inputs = ['EmailInput', 'LoginInput', 'NameInput', 'SecondNameInput', 'NickNameInput', 'PhoneInput'] as const;

    inputs.forEach((inputName) => {
      if (this.children[inputName]) {
        this.children[inputName].setProps({
          valueName: this.getUserFieldValue(user, inputName),
        });
      }
    });
  }

  private getUserFieldValue(user: IUser | null, inputName: string): string {
    if (!user) return '';

    const fieldMap: Record<string, string> = {
      EmailInput: user.email,
      LoginInput: user.login,
      NameInput: user.first_name,
      SecondNameInput: user.second_name,
      NickNameInput: user.display_name ?? '',
      PhoneInput: user.phone,
    };

    return fieldMap[inputName] || '';
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

const mapStateToProps = (state: PlainObject) => {
  return {
    isLoading: state.isLoading,
    user: state.user,
  };
};

export default connect(mapStateToProps)(ProfilePage);
