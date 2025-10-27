import { Button, Input } from '../../components';
import Block from '../../core/block';

interface ILoginFields {
  login: string;
  password: string;
}

export interface ILoginProps {
  formState: ILoginFields;
  errors: ILoginFields;
  [key: string]: unknown;
}

interface ILoginChildren {
  InputLogin: Block;
  InputPassword: Block;
  [key: string]: unknown;
}

export default class LoginPage extends Block<ILoginProps, ILoginChildren> {
  constructor(props: ILoginProps) {
    super('main', {
      ...props,
      formState: {
        login: '',
        password: '',
      },
      errors: {
        login: '',
        password: '',
      },
      className: 'container login',

      InputLogin: new Input({
        title: 'Логин',
        name: 'login',
        type: 'text',
        onChange: (e: InputEvent) => {
          const { value } = e.target as HTMLInputElement;

          const regLogin = /^(?=.*[A-Za-z])[A-Za-z0-9_-]+$/;
          let errorText = '';

          if (value.length < 3 || value.length > 20) {
            errorText = 'Логин должен содержать от 2 до 20 символов';
          }

          if (!regLogin.test(value)) {
            errorText = 'Не корректный логин';
          }

          this.setProps({
            formState: {
              ...this.props.formState,
              login: value,
            },
            errors: {
              ...this.props.errors,
              login: errorText,
            },
          });

          this.children.InputLogin.setProps({
            errorText,
          });
        },
      }),

      InputPassword: new Input({
        title: 'Пароль',
        name: 'password',
        type: 'password',
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
            formState: {
              ...this.props.formState,
              password: value,
            },
            errors: {
              ...this.props.errors,
              password: errorText,
            },
          });
        },
      }),

      SignInButton: new Button({
        title: 'Вход',
        color: 'primary',
        type: 'submit',
        onClick: (e: MouseEvent) => {
          e.preventDefault();
          const { login, password } = this.props.formState;

          if (this.props.errors.login === '' && this.props.errors.password === '' && login !== '' && password !== '') {
            console.log(this.props.formState);
          } else if (login === '' || password === '') {
            if (login === '') {
              this.setProps({
                errors: {
                  ...this.props.errors,
                  login: 'Введите логин',
                },
                formState: this.props.formState,
              });
              this.children.InputLogin.setProps({
                errorText: 'Введите логин',
              });
            }
            if (password === '') {
              this.setProps({
                formState: this.props.formState,
                errors: {
                  ...this.props.errors,
                  password: 'Введите пароль',
                },
              });

              this.children.InputPassword.setProps({
                errorText: 'Введите пароль',
              });
            }

            console.warn(this.props.errors);
          } else {
            console.warn(this.props.errors);
          }
        },
      }),

      SignUpButton: new Button({
        title: 'Нет аккаунта?',
        color: 'text',
        onClick(e: MouseEvent) {
          e.preventDefault();
        },
      }),
    });
  }

  public render(): string {
    return `
      <form class="login__form">
        <div class="login__group">
          <h1 class="title">Вход</h1>
          {{{ InputLogin }}}
          {{{ InputPassword }}}
        </div>
        <div class="login__group">
          {{{ SignInButton }}}
          {{{ SignUpButton }}}
        </div>
      </form>
    `;
  }
}
