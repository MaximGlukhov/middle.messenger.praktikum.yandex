import Block from '../../core/block';

interface IInputProps {
  name: string;
  type: string;
  placeholder?: string;
  readonly?: boolean;
  value?: string;
  events: {
    change?: (e: InputEvent) => void;
    blur?: (e: FocusEvent) => void;
    focus?: (e: FocusEvent) => void;
    input?: (e: InputEvent) => void;
  };
}

export default class Input extends Block {
  constructor(props: IInputProps) {
    const attrs: Record<string, unknown> = {
      placeholder: props.placeholder ?? '',
      name: props.name,
      type: props.type,
    };

    if (props.readonly) {
      attrs.readonly = true;
    }

    if (props.value) {
      attrs.value = props.value;
    }

    super('input', {
      ...props,
      className: 'input',
      attrs,
    });
  }

  componentDidUpdate(oldProps: IInputProps, newProps: IInputProps): boolean {
    if (oldProps.value !== newProps.value) {
      const inputElement = this.getContent() as HTMLInputElement;
      if (inputElement && inputElement.value !== newProps.value) {
        inputElement.value = newProps.value || '';
      }
    }

    return true;
  }
}
