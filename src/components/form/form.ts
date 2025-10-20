import Block from '../../core/block';

export default class Form extends Block {
  constructor(props: any) {
    super('form', {
      ...props,
      className: props.className,
    });
  }

  render(): string {
    return `
      {{{ Body }}}
  `;
  }
}
