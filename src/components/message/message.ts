import Block from '../../core/block';

interface IMessage {
  message: {
    chat_id: number;
    content: string;
    file: File | null;
    id: number;
    is_read: boolean;
    time: string;
    type: string;
    user_id: number;
  };
  [key: string]: unknown;
}

export default class Message extends Block<IMessage, {}> {
  constructor(props: IMessage) {
    super('article', {
      ...props,
    });
  }

  public render(): string {
    return `
      <div class="chats__messageTime">{{message.time}}</div>
        <article class="chats__message chats__message_sender">
        {{message.content}}
      </article>
    `;
  }
}
