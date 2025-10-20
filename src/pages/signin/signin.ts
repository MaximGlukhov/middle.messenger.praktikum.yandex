import { Button, Input } from '../../components';
import Block from '../../core/block';

interface ILoginFields {
  email: string;
  login: string;
  firstName: string;
  secondName: string;
  phone: string;
  password: string;
  repeatPassword: string;
}

interface ILoginProps {
  formState: ILoginFields;
  errors: ILoginFields;
}

export default class SigninPage extends Block {
  constructor(props: ILoginProps) {
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
      className: 'container login signin',

      InputEmail: new Input({
        title: 'Почта',
        name: 'email',
        type: 'text',

        onChange: (e: InputEvent) => {
          const { value } = e.target as HTMLInputElement;
          const regEmail = /^[A-Za-z0-9._-]+@[A-Za-z]+\.[A-Za-z]+$/;
          let errorText = '';

          if (!regEmail.test(value)) {
            errorText = 'Некорректный емаил';
          }

          this.setProps({
            formState: {
              ...this.props.formState,
              email: value,
            },
            errors: {
              ...this.props.errors,
              email: errorText,
            },
          });

          this.children.InputEmail.setProps({
            errorText,
          });
        },
      }),

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

          this.children.InputLogin.setProps({
            errorText,
          });

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
        },
      }),

      InputName: new Input({
        title: 'Имя',
        name: 'first_name',
        type: 'text',
        onChange: (e: InputEvent) => {
          const { value } = e.target as HTMLInputElement;
          const regName = /^(?!.*--)(?!.*-$)[A-ZА-ЯЁ][a-zа-яё-]*$/;
          let errorText = '';

          if (!regName.test(value)) {
            errorText = 'Некорректное имя';
          }

          this.children.InputName.setProps({
            errorText,
          });

          this.setProps({
            formState: {
              ...this.props.formState,
              firstName: value,
            },
            errors: {
              ...this.props.errors,
              firstName: errorText,
            },
          });
        },
      }),

      InputSecondName: new Input({
        title: 'Фамилия',
        name: 'second_name',
        type: 'text',
        onChange: (e: InputEvent) => {
          const { value } = e.target as HTMLInputElement;
          const regName = /^(?!.*--)(?!.*-$)[A-ZА-ЯЁ][a-zа-яё-]*$/;
          let errorText = '';

          if (!regName.test(value)) {
            errorText = 'Некорректная фамилия';
          }

          this.children.InputSecondName.setProps({
            errorText,
          });

          this.setProps({
            formState: {
              ...this.props.formState,
              secondName: value,
            },
            errors: {
              ...this.props.errors,
              secondName: errorText,
            },
          });
        },
      }),

      InputPhone: new Input({
        title: 'Телефон',
        name: 'phone',
        type: 'text',
        onChange: (e: InputEvent) => {
          const { value } = e.target as HTMLInputElement;
          const regPhone = /^\+?\d{10,15}$/;
          let errorText = '';

          if (!regPhone.test(value)) {
            errorText = 'Некорректный телефон';
          }

          this.children.InputPhone.setProps({
            errorText,
          });

          this.setProps({
            formState: {
              ...this.props.formState,
              phone: value,
            },
            errors: {
              ...this.props.errors,
              phone: errorText,
            },
          });
        },
      }),

      InputPassword: new Input({
        title: 'Пароль',
        name: 'password',
        type: 'password',
        onChange: (e: Event) => {
          const { value } = e.target as HTMLInputElement;
          const regPassword = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]+$/;
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

      InputRepeatPassword: new Input({
        title: 'Пароль (ещё раз)',
        name: 'repeat_password',
        type: 'password',
        onChange: (e: InputEvent) => {
          const { value } = e.target as HTMLInputElement;
          let errorText = '';

          if (value !== this.children.InputPassword.value()) {
            errorText = 'Пароли не совпадают';
          }

          this.children.InputRepeatPassword.setProps({
            errorText,
          });

          this.setProps({
            formState: {
              ...this.props.formState,
              repeatPassword: value,
            },
            errors: {
              ...this.props.errors,
              repeatPassword: errorText,
            },
          });
        },
      }),

      SignInButton: new Button({
        title: 'Зарегистрироваться',
        color: 'primary',
        type: 'submit',
        onClick: (e: MouseEvent) => {
          e.preventDefault();
          const { email, login, firstName, secondName, phone, password, repeatPassword } = this.props.formState;
          const { formState, errors } = this.props;
          const hasErrors = Object.values(errors).some((err) => err);
          const hasEmpty = Object.values(formState).some((v) => !v);

          if (!hasErrors && !hasEmpty) {
            console.log(this.props.formState);
          } else if (hasEmpty) {
            if (!email) {
              this.setProps({
                ...this.props.formState,
                errors: {
                  ...this.props.errors,
                  email: 'Введите email',
                },
              });
              this.children.InputEmail.setProps({
                errorText: 'Введите email',
              });
            }
            if (!login) {
              this.setProps({
                ...this.props.formState,
                errors: {
                  ...this.props.errors,
                  login: 'Введите логин',
                },
              });
              this.children.InputLogin.setProps({
                errorText: 'Введите логин',
              });
            }
            if (!firstName) {
              this.setProps({
                ...this.props.formState,
                errors: {
                  ...this.props.errors,
                  firstName: 'Введите имя',
                },
              });
              this.children.InputName.setProps({
                errorText: 'Введите имя',
              });
            }
            if (!secondName) {
              this.setProps({
                ...this.props.formState,
                errors: {
                  ...this.props.errors,
                  secondName: 'Введите фамилию',
                },
              });
              this.children.InputSecondName.setProps({
                errorText: 'Введите фамилию',
              });
            }
            if (!phone) {
              this.setProps({
                ...this.props.formState,
                errors: {
                  ...this.props.errors,
                  phone: 'Введите фамилию',
                },
              });
              this.children.InputPhone.setProps({
                errorText: 'Введите фамилию',
              });
            }
            if (!password) {
              this.setProps({
                ...this.props.formState,
                errors: {
                  ...this.props.errors,
                  password: 'Введите пароль',
                },
              });

              this.children.InputPassword.setProps({
                errorText: 'Введите пароль',
              });
            }
            if (!repeatPassword) {
              this.setProps({
                ...this.props.formState,
                errors: {
                  ...this.props.errors,
                  repeatPassword: 'Повторите пароль',
                },
              });

              this.children.InputRepeatPassword.setProps({
                errorText: 'Повторите пароль',
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
          <h1 class="title">Регистрация</h1>
          {{{ InputEmail }}}
          {{{ InputLogin }}}
          {{{ InputName }}}
          {{{ InputSecondName }}}
          {{{ InputPhone }}} 
          {{{ InputPassword }}}
          {{{ InputRepeatPassword }}} 
        </div>
        <div class="login__group">
          {{{ SignInButton }}}
          {{{ SignUpButton }}}
        </div>
      </form>
    `;
  }
}
