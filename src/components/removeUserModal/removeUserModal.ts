import Block from '../../core/block';
import { Modal } from '../modal';
import { ModalBody } from './modalBody';

export default class RemoveUserModal extends Block {
  constructor(props: any) {
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
