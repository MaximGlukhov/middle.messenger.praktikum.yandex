import Block from '../../core/block';
import { Button } from '../index';

interface IModalProps {
  title: string;
  labelOk: string;
  onOk: () => void;
  onClose: () => void;
  Body: object;
}

export default class Modal extends Block {
  constructor(props: IModalProps) {
    super('div', {
      ...props,
      className: 'modal-container',
      OkButton: new Button({
        title: props.labelOk,
        color: 'primary',
        onClick: props.onOk,
      }),
      CancelButton: new Button({
        title: 'labelCancel',
        color: 'text',
      }),
      CloseButton: new Button({
        className: 'modal__closeBtn',
        onClick: props.onClose,
      }),
    });
  }

  render(): string {
    return `
    <div class="modal">
        {{{ CloseButton }}}
        <h2 class="title">{{title}}</h2>
        <div class="modal__body">
            {{{ Body }}}
        </div>
        <div class="modal__footer">
            {{{ OkButton }}}
            {{#if labelCancel}}
                {{{ CancelButton }}}
            {{/if}}
        </div>
    </div>
  `;
  }
}
