import Block from '../../core/block';
import { connect } from '../../utils/connect';
import type { PlainObject } from '../../utils/isEqual';
import Message from '../message/message';

interface IMessagesProps {
  messages: {
    chat_id: number;
    content: string;
    file: File | null;
    id: number;
    is_read: boolean;
    time: string;
    type: string;
    user_id: number;
  }[];
  [key: string]: unknown;
}

interface IMessagesChildren {
  [key: string]: unknown;
}

class Messages extends Block<IMessagesProps, IMessagesChildren> {
  constructor(props: IMessagesProps) {
    super('div', {
      ...props,
      className: 'messagesList',
      messages: props.messages || [],
    });
  }

  protected init(): void {
    this.updateChatItems();
  }

  private updateChatItems() {
    this.children.MessagesList = this.props.messages?.map((props) => new Message({ message: props }));
  }

  componentDidUpdate(oldProps: IMessagesProps, newProps: IMessagesProps): boolean {
    if (oldProps !== newProps) {
      this.updateChatItems();
    }
    return true;
  }

  public render(): string {
    return `
      {{#each MessagesList}}
        {{{this}}}
      {{/each}}
    `;
  }
}

const mapStateToProps = (state: PlainObject) => {
  return {
    messages: state.messages,
  };
};

export default connect(mapStateToProps)(Messages);
