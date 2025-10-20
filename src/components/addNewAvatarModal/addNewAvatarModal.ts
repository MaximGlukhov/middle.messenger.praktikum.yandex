import Block from '../../core/block';
import { Modal } from '../modal';
import { ModalBody } from './modalBody';

export default class AddNewAvatarModal extends Block {
  constructor(props: any) {
    super('div', {
      ...props,
      Modal: new Modal({
        title: 'Загрузите файл',
        labelOk: 'Поменять',
        onOk: props.onOk,
        Body: new ModalBody(),
      }),
    });
  }
  render(): string {
    return `{{{ Modal }}}`;
  }
}
