import Block from '../../core/block';

interface IButtonProps {
  title: string;
  color?: 'primary' | 'text';
  type?: string;
  className?: string;
  onClick?: (e: MouseEvent) => void;
  tooltip?: string;
}

export default class Button extends Block {
  constructor(props: IButtonProps) {
    super('button', {
      ...props,
      className: `button button_${props.color} ${props.className}`,
      events: {
        click: props.onClick,
      },
      attrs: {
        type: props.type ?? 'button',
        title: props.tooltip,
      },
    });
  }
  public render(): string {
    return `
      {{title}}
    `;
  }
}
