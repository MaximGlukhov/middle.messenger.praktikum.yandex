import { addUsersToChat } from '../../actions/chats';
import Block from '../../core/block';
import { connect } from '../../utils/connect';
import type { PlainObject } from '../../utils/isEqual';
import { Modal } from '../modal';
import { ModalBody } from './modalBody';

interface IAddUserModal {
  onOk: () => void;
  login?: string;
  activeChat: number;
  [key: string]: unknown;
}

class AddUserModal extends Block<IAddUserModal, {}> {
  constructor(props: IAddUserModal) {
    super('div', {
      ...props,
      Modal: new Modal({
        title: 'Добавить пользователя',
        labelOk: 'Добавить',
        onOk: () => {
          if (this.props.login) {
            addUsersToChat(this.props.login, this.props.activeChat);
          }
          props.onOk();
        },
        onClose: () => props.onOk(),
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

    if (oldProps.chats !== newProps.chats) {
      this.setProps({
        ...this.props,
        activeChat: newProps.activeChat,
      });
    }

    return true;
  }

  render(): string {
    return `{{{ Modal }}}`;
  }
}

const mapStateToProps = (state: PlainObject) => {
  return {
    activeChat: state.activeChat,
  };
};

export default connect(mapStateToProps)(AddUserModal);
