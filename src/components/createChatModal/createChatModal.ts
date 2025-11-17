import { addChat } from '../../actions/chats';
import Block from '../../core/block';
import { Modal } from '../modal';
import { ModalBody } from './modalBody';

interface IAddUserModal {
  onOk: () => void;
  title?: string;
  [key: string]: unknown;
}

export default class CreateChatModal extends Block<IAddUserModal, {}> {
  constructor(props: IAddUserModal) {
    super('div', {
      ...props,
      Modal: new Modal({
        title: 'Добавить новый чат',
        labelOk: 'Добавить',
        onOk: () => {
          if (this.props.title) {
            console.log('asdsaasd');
            addChat({ title: this.props.title });
          }
          props.onOk();
        },
        onClose: () => props.onOk(),
        Body: new ModalBody({
          onChatSelect: (title: string) => this.handleChatSelect(title),
        }),
      }),
    });
  }

  private handleChatSelect(title: string) {
    this.setProps({
      ...this.props,
      title,
    });
  }

  componentDidUpdate(oldProps: IAddUserModal, newProps: IAddUserModal) {
    if (oldProps.title !== newProps.title) {
      this.setProps({
        ...this.props,
        title: newProps.title,
      });
    }
    return true;
  }

  render(): string {
    return `{{{ Modal }}}`;
  }
}
