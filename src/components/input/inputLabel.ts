import Block from '../../core/block';
import Input from './input';

interface IInputLabelProps {
  title?: string;
  className?: string;
  name: string;
  type: string;
  placeholder?: string;
  readonly?: boolean;
  valueName?: string;
  onChange?: (e: InputEvent) => void;
  onBlur?: (e: FocusEvent) => void;
  onFocus?: (e: FocusEvent) => void;
  onInput?: (e: InputEvent) => void;
  [key: string]: unknown;
}

interface IInputLabelChildren {
  Input: Block;
  [key: string]: unknown;
}

export default class InputLabel extends Block<IInputLabelProps, IInputLabelChildren> {
  constructor(props: IInputLabelProps) {
    super('label', {
      ...props,
      className: `inputLabel ${props.className}`,
      Input: new Input({
        name: props.name,
        type: props.type,
        placeholder: props.placeholder,
        readonly: props.readonly,
        value: props.valueName,
        events: {
          change: props.onChange,
          blur: props.onBlur,
          focus: props.onFocus,
          input: props.onInput,
        },
      }),
    });
  }

  componentDidUpdate(oldProps: IInputLabelProps, newProps: IInputLabelProps) {
    if (oldProps.valueName !== newProps.valueName) {
      this.children.Input.setProps({
        ...this.children.Input.props,
        value: newProps.valueName,
      });
    }
    return true;
  }

  public value() {
    return (this.children.Input.getContent() as HTMLInputElement).value;
  }

  public render(): string {
    return `
      {{{Input}}}
      <span class="inputPlaceholder">{{title}}</span>
      <span class="inputError">{{#if errorText}}{{errorText}}{{/if}}</span>
    `;
  }
}
