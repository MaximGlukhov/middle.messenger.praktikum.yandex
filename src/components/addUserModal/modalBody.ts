import Block from '../../core/block';
import { Input } from '../input';

export class ModalBody extends Block {
  constructor() {
    super('div', {
      className: 'addUserModal__body',
      AddUserInput: new Input({
        title: 'Логин',
        type: 'text',
        name: 'login',
      }),
    });
  }

  render(): string {
    return `{{{ AddUserInput }}}`;
  }
}
