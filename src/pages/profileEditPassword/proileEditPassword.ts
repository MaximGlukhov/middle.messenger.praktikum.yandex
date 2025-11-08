import Block from '../../core/block';
import { AddNewAvatarModal, Button, Input } from '../../components';
import { UserCard } from '../../components/userCard';
import type InputLabel from '../../components/input/inputLabel';
import { editPassword } from '../../actions/users';

export interface IPropfileEditPasswordsProps {
  formState: {
    oldPassword: string;
    newPassword: string;
    repeatNewPassword: string;
  };
  errors: {
    oldPassword: string;
    newPassword: string;
    repeatNewPassword: string;
  };
  showAddNewAvatarModal: boolean;
  onRoutProfile: () => void;
  [key: string]: unknown;
}

interface IPropfileEditPasswordsChildren {
  [key: string]: unknown;
  UserCard: Block;
  InputOldPassword: Block;
  InputPassword: Block;
  InputRepeatPassword: Block;
}

export default class ProfileEditPasswordPage extends Block<
  IPropfileEditPasswordsProps,
  IPropfileEditPasswordsChildren
> {
  constructor(props: Partial<IPropfileEditPasswordsProps>) {
    super('main', {
      ...props,
      formState: {
        oldPassword: '',
        newPassword: '',
        repeatNewPassword: '',
      },
      errors: {
        oldPassword: '',
        newPassword: '',
        repeatNewPassword: '',
      },

      showAddNewAvatarModal: false,
      UserCard: new UserCard({
        onClick: () => {
          this.setProps({ ...this.props, showAddNewAvatarModal: true });
        },
      }),
      AddNewAvatarModal: new AddNewAvatarModal({
        onOk: () => this.setProps({ ...this.props, showAddNewAvatarModal: false }),
      }),

      InputOldPassword: new Input({
        name: 'old_password',
        type: 'password',
        className: 'profileEdit__input',

        onChange: (e: Event) => {
          const { value } = e.target as HTMLInputElement;
          const regPassword = /^(?=.*[A-ZА-Я])(?=.*\d).+$/;
          let errorText = '';

          if (value.length < 8 || value.length > 40) {
            errorText = 'Пароль должен содержать от 8 до 40 символов';
          }

          if (!regPassword.test(value)) {
            errorText = 'Обязательно хотя бы одна заглавная буква и цифра';
          }

          this.children.InputOldPassword.setProps({
            errorText,
          });

          this.setProps({
            ...this.props,
            formState: {
              ...this.props.formState,
              oldPassword: value,
            },
            errors: {
              ...this.props.errors,
              oldPassword: errorText,
            },
          });
        },
      }),

      InputPassword: new Input({
        name: 'password',
        type: 'password',
        className: 'profileEdit__input',
        onChange: (e: Event) => {
          const { value } = e.target as HTMLInputElement;
          const regPassword = /^(?=.*[A-ZА-Я])(?=.*\d).+$/;
          let errorText = '';

          if (value.length < 8 || value.length > 40) {
            errorText = 'Пароль должен содержать от 8 до 40 символов';
          }

          if (!regPassword.test(value)) {
            errorText = 'Обязательно хотя бы одна заглавная буква и цифра';
          }

          this.children.InputPassword.setProps({
            errorText,
          });

          this.setProps({
            ...this.props,
            formState: {
              ...this.props.formState,
              newPassword: value,
            },
            errors: {
              ...this.props.errors,
              newPassword: errorText,
            },
          });
        },
      }),

      InputRepeatPassword: new Input({
        name: 'repeat_password',
        type: 'password',
        className: 'profileEdit__input',
        onChange: (e: InputEvent) => {
          const { value } = e.target as HTMLInputElement;
          let errorText = '';

          const inputPassword = this.children.InputPassword as InputLabel;

          if (value !== inputPassword.value()) {
            errorText = 'Пароли не совпадают';
          }

          this.children.InputRepeatPassword.setProps({
            errorText,
          });

          this.setProps({
            ...this.props,
            formState: {
              ...this.props.formState,
              repeatNewPassword: value,
            },
            errors: {
              ...this.props.errors,
              repeatNewPassword: errorText,
            },
          });
        },
      }),

      SaveDataButton: new Button({
        type: 'submit',
        title: 'Сохранить',
        color: 'primary',
        className: 'profile__saveBtn',

        onClick: (e: MouseEvent) => {
          e.preventDefault();
          const { oldPassword, newPassword, repeatNewPassword } = this.props.formState;
          const { formState, errors } = this.props;
          const hasErrors = Object.values(errors).some((err) => err);
          const hasEmpty = Object.values(formState).some((v) => !v);

          if (!hasErrors && !hasEmpty) {
            editPassword({
              oldPassword,
              newPassword,
            });
            if (props.onRoutProfile) {
              props.onRoutProfile();
            }
          } else if (hasEmpty) {
            if (!oldPassword) {
              this.setProps({
                ...this.props,
                ...this.props.formState,
                errors: {
                  ...this.props.errors,
                  oldPassword: 'Введите старый пароль',
                },
              });

              this.children.InputOldPassword.setProps({
                errorText: 'Введите старый пароль',
              });
            }
            if (!newPassword) {
              this.setProps({
                ...this.props,
                ...this.props.formState,
                errors: {
                  ...this.props.errors,
                  newPassword: 'Введите новый пароль',
                },
              });

              this.children.InputPassword.setProps({
                errorText: 'Введите новый пароль',
              });
            }
            if (!repeatNewPassword) {
              this.setProps({
                ...this.props,
                ...this.props.formState,
                errors: {
                  ...this.props.errors,
                  repeatNewPassword: 'Повторите новый пароль',
                },
              });

              this.children.InputRepeatPassword.setProps({
                errorText: 'Повторите новый пароль',
              });
            }

            console.warn(this.props.errors);
          } else {
            console.warn(this.props.errors);
          }
        },
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
              <p>Старый пароль</p>
              {{{ InputOldPassword }}}
            </div>
            <div class="profile__row">
              <p>Новый пароль</p>
              {{{ InputPassword }}}
            </div>
            <div class="profile__row">
              <p>Повторите новый пароль</p>
              {{{ InputRepeatPassword }}}
            </div>
          </div>  
          
          {{{ SaveDataButton }}}
        </div>
      </form>   
      {{#if showAddNewAvatarModal}}
        {{{ AddNewAvatarModal }}}
      {{/if}} 
    `;
  }
}
