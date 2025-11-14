import { editAvatar } from '../../actions/users';
import Block from '../../core/block';
import { Modal } from '../modal';
import { ModalBody } from './modalBody';

interface IAddNewAvatarModalProps {
  onOk: () => void;
  file?: File;
  [key: string]: unknown;
}

export default class AddNewAvatarModal extends Block<IAddNewAvatarModalProps, {}> {
  constructor(props: IAddNewAvatarModalProps) {
    super('div', {
      ...props,
      Modal: new Modal({
        title: 'Загрузите файл',
        labelOk: 'Поменять',
        onOk: () => {
          if (this.props.file) {
            const data = new FormData();
            data.append('avatar', this.props.file);
            editAvatar(data);
          }
          props.onOk();
        },
        Body: new ModalBody({
          onFileSelect: (file: File) => this.handleFileSelect(file),
        }),
      }),
    });
  }

  private handleFileSelect(file: File) {
    this.setProps({
      ...this.props,
      file,
    });
  }

  componentDidUpdate(oldProps: IAddNewAvatarModalProps, newProps: IAddNewAvatarModalProps) {
    if (oldProps.file !== newProps.file) {
      this.setProps({
        ...this.props,
        file: newProps.file,
      });
    }
    return true;
  }

  render(): string {
    return `{{{ Modal }}}`;
  }
}
