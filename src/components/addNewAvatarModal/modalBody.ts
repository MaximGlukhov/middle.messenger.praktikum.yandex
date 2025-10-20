import Block from '../../core/block';
import { Input } from '../input';

export class ModalBody extends Block {
  constructor() {
    super('div', {
      className: 'addNewAvatarModal__body',
      CheckAvatarInput: new Input({
        title: 'Выбрать файл на компьютере',
        type: 'file',
        name: 'avatar',
      }),
    });
  }

  render(): string {
    return `{{{ CheckAvatarInput }}}`;
  }
}
