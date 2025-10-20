import Block from '../../core/block';
import { Modal } from '../modal';
import { ModalBody } from './modalBody';

export default class AddUserModal extends Block {
  constructor(props: any) {
    super('div', {
      ...props,
      Modal: new Modal({
        title: 'Добавить пользователя',
        labelOk: 'Добавить',
        onOk: props.onOk,
        Body: new ModalBody(),
      }),
    });
  }

  render(): string {
    return `{{{ Modal }}}`;
  }
}
