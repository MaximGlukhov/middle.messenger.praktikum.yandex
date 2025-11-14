import { addUsersToChat } from '../../actions/chats';
import Block from '../../core/block';
import { Modal } from '../modal';
import { ModalBody } from './modalBody';

interface IAddUserModal {
  onOk: () => void;
  login?: string;
  [key: string]: unknown;
}

export default class AddUserModal extends Block<IAddUserModal, {}> {
  constructor(props: IAddUserModal) {
    super('div', {
      ...props,
      Modal: new Modal({
        title: 'Добавить пользователя',
        labelOk: 'Добавить',
        onOk: () => {
          if (this.props.login) {
            addUsersToChat({ login: this.props.login });
          }
          props.onOk();
        },
        Body: new ModalBody({
          onLoginSelect: (login: string) => this.handleLoginSelect(login),
        }),
      }),
    });
  }

  private handleLoginSelect(login: string) {
    this.setProps({
      ...this.props,
      login,
    });
  }

  componentDidUpdate(oldProps: IAddUserModal, newProps: IAddUserModal) {
    if (oldProps.login !== newProps.login) {
      this.setProps({
        ...this.props,
        login: newProps.login,
      });
    }
    return true;
  }

  render(): string {
    return `{{{ Modal }}}`;
  }
}
