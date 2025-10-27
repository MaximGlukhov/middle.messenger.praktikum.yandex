import Block from '../../core/block';
import { Input } from '../input';

export class ModalBody extends Block {
  constructor() {
    super('div', {
      className: 'removeUserModal__body',
      RemoveUserInput: new Input({
        title: 'Логин',
        type: 'text',
        name: 'login',
      }),
    });
  }

  render(): string {
    return `{{{ RemoveUserInput }}}`;
  }
}
