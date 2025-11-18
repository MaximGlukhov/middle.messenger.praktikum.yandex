import Block from '../../core/block';
import { Input } from '../input';

interface IModalBodyProps {
  onLoginSelect: (title: string) => void;
  [key: string]: unknown;
}

export class ModalBody extends Block<IModalBodyProps, {}> {
  constructor(props: IModalBodyProps) {
    super('div', {
      ...props,
      className: 'removeUserModal__body',
      RemoveUserInput: new Input({
        title: 'ID пользователя',
        type: 'text',
        name: 'login',
        events: {
          change: (e: InputEvent) => this.handleLoginSelect(e),
        },
      }),
    });
  }

  private handleLoginSelect(e: InputEvent) {
    const { value } = e.target as HTMLInputElement;

    if (value && this.props.onLoginSelect) {
      this.props.onLoginSelect(value);
    }
  }

  render(): string {
    return `{{{ RemoveUserInput }}}`;
  }
}
