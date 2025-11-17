import { removeUserToChat } from '../../actions/chats';
import type { GetChats } from '../../api/types';
import Block from '../../core/block';
import { connect } from '../../utils/connect';
import type { PlainObject } from '../../utils/isEqual';
import { Modal } from '../modal';
import { ModalBody } from './modalBody';

interface IRemoveUserModalProps {
  onOk: () => void;
  login?: string;
  chats: GetChats[];
  activeChat: number;
  [key: string]: unknown;
}
class RemoveUserModal extends Block<IRemoveUserModalProps, {}> {
  constructor(props: IRemoveUserModalProps) {
    super('div', {
      ...props,
      Modal: new Modal({
        title: 'Удалить пользователя',
        labelOk: 'Удалить',
        onOk: () => {
          if (this.props.login) {
            removeUserToChat(this.props.activeChat, Number(this.props.login));
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

  componentDidUpdate(oldProps: IRemoveUserModalProps, newProps: IRemoveUserModalProps) {
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

const mapStateToProps = (state: PlainObject) => {
  return {
    chats: state.chats,
    activeChat: state.activeChat,
  };
};

export default connect(mapStateToProps)(RemoveUserModal);
