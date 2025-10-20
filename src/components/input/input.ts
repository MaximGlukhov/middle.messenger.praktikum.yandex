import Block from '../../core/block';

interface IInputProps {
  name: string;
  type: string;
  placeholder?: string;
  events: {
    change?: (e: InputEvent) => void;
    blur?: (e: FocusEvent) => void;
    focus?: (e: FocusEvent) => void;
    input?: (e: InputEvent) => void;
  };
}

export default class Input extends Block {
  constructor(props: IInputProps) {
    super('input', {
      ...props,
      className: 'input',
      attrs: {
        placeholder: props.placeholder ?? '',
        name: props.name,
        type: props.type,
      },
    });
  }
}
