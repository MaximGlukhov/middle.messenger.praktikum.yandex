import Block from '../../core/block';
import { AddNewAvatarModal, Button, Input } from '../../components';
import { UserCard } from '../../components/userCard';

interface IPropfileEditProps {
  formState: {
    email: string;
    login: string;
    firstName: string;
    secondName: string;
    displayName: string;
    phone: string;
  };
  errors: {
    email: string;
    login: string;
    firstName: string;
    secondName: string;
    phone: string;
  };
  showAddNewAvatarModal: boolean;
}

export default class ProfileEditPage extends Block {
  constructor(props: IPropfileEditProps) {
    super('main', {
      ...props,
      formState: {
        email: '',
        login: '',
        firstName: '',
        secondName: '',
        displayName: '',
        phone: '',
      },
      errors: {
        email: '',
        login: '',
        firstName: '',
        secondName: '',
        displayName: '',
        phone: '',
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
        className: 'profileEdit__input',

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

          this.children.EmailInput.setProps({
            errorText,
          });
        },
      }),

      LoginInput: new Input({
        name: 'login',
        type: 'text',
        className: 'profileEdit__input',

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

          this.children.LoginInput.setProps({
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

      NameInput: new Input({
        name: 'first_name',
        type: 'text',
        className: 'profileEdit__input',

        onChange: (e: InputEvent) => {
          const { value } = e.target as HTMLInputElement;
          const regName = /^(?!.*--)(?!.*-$)[A-ZА-ЯЁ][a-zа-яё-]*$/;
          let errorText = '';

          if (!regName.test(value)) {
            errorText = 'Некорректное имя';
          }

          this.children.NameInput.setProps({
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

      SecondNameInput: new Input({
        name: 'second_name',
        type: 'text',
        className: 'profileEdit__input',

        onChange: (e: InputEvent) => {
          const { value } = e.target as HTMLInputElement;
          const regName = /^(?!.*--)(?!.*-$)[A-ZА-ЯЁ][a-zа-яё-]*$/;
          let errorText = '';

          if (!regName.test(value)) {
            errorText = 'Некорректная фамилия';
          }

          this.children.SecondNameInput.setProps({
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

      NickNameInput: new Input({
        name: 'display_name',
        type: 'text',
        className: 'profileEdit__input',

        onChange: (e: InputEvent) => {
          const { value } = e.target as HTMLInputElement;

          this.setProps({
            formState: {
              ...this.props.formState,
              displayName: value,
            },
            errors: {
              ...this.props.errors,
              displayName: '',
            },
          });
        },
      }),

      PhoneInput: new Input({
        name: 'phone',
        type: 'text',
        className: 'profileEdit__input',

        onChange: (e: InputEvent) => {
          const { value } = e.target as HTMLInputElement;
          const regPhone = /^\+?\d{10,15}$/;
          let errorText = '';

          if (!regPhone.test(value)) {
            errorText = 'Некорректный телефон';
          }

          this.children.PhoneInput.setProps({
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

      SaveDataButton: new Button({
        type: 'submit',
        title: 'Сохранить',
        color: 'primary',
        className: 'profile__saveBtn',

        onClick: (e: MouseEvent) => {
          e.preventDefault();
          const { email, login, firstName, secondName, displayName, phone } = this.props.formState;
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
              this.children.EmailInput.setProps({
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
              this.children.LoginInput.setProps({
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
              this.children.NameInput.setProps({
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
              this.children.SecondNameInput.setProps({
                errorText: 'Введите фамилию',
              });
            }
            if (!displayName) {
              this.setProps({
                ...this.props.formState,
                errors: {
                  ...this.props.errors,
                  displayName: 'Введите никнейм',
                },
              });
              this.children.NickNameInput.setProps({
                errorText: 'Введите никнейм',
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
              this.children.PhoneInput.setProps({
                errorText: 'Введите фамилию',
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
          
          {{{ SaveDataButton }}}
        </div>
      </form>   
      {{#if showAddNewAvatarModal}}
        {{{ AddNewAvatarModal }}}
      {{/if}} 
    `;
  }
}
