import Block from '../../core/block';
import { Modal } from '../modal';
import { ModalBody } from './modalBody';

interface IRemoveUserModalProps {
  onOk: () => void;
}

export default class RemoveUserModal extends Block {
  constructor(props: IRemoveUserModalProps) {
    super('div', {
      ...props,
      Modal: new Modal({
        title: 'Удалить пользователя',
        labelOk: 'Удалить',
        onOk: props.onOk,
        Body: new ModalBody(),
      }),
    });
  }

  render(): string {
    return `{{{ Modal }}}`;
  }
}
