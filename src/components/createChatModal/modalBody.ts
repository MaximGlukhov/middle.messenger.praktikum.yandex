import Block from '../../core/block';
import { Input } from '../input';

interface IModalBodyProps {
  onChatSelect: (title: string) => void;
  [key: string]: unknown;
}

export class ModalBody extends Block<IModalBodyProps, {}> {
  constructor(props: IModalBodyProps) {
    super('div', {
      ...props,
      className: 'addUserModal__body',
      AddChatInput: new Input({
        title: 'Название чата',
        type: 'text',
        name: 'chat',
        events: {
          change: (e: InputEvent) => this.handleChatSelect(e),
        },
      }),
    });
  }

  private handleChatSelect(e: InputEvent) {
    const { value } = e.target as HTMLInputElement;

    if (value && this.props.onChatSelect) {
      this.props.onChatSelect(value);
    }
  }

  render(): string {
    return `{{{ AddChatInput }}}`;
  }
}
