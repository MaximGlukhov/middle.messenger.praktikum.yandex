import Block from '../../core/block';
import { Input } from '../input';

interface IModalBodyProps {
  onFileSelect: (file: File) => void;
  [key: string]: unknown;
}

export class ModalBody extends Block<IModalBodyProps, {}> {
  constructor(props: IModalBodyProps) {
    super('div', {
      ...props,
      className: 'addNewAvatarModal__body',
      CheckAvatarInput: new Input({
        title: 'Выбрать файл на компьютере',
        type: 'file',
        name: 'avatar',
        events: {
          change: (e: InputEvent) => this.handleFileSelect(e),
        },
      }),
    });
  }

  private handleFileSelect(e: InputEvent) {
    const target = e.target as HTMLInputElement;
    const file = target.files?.[0];

    if (file && this.props.onFileSelect) {
      this.props.onFileSelect(file);
    }
  }

  render(): string {
    return `{{{ CheckAvatarInput }}}`;
  }
}
