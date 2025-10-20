import Block from '../../core/block';

export default class UserCard extends Block {
  constructor(props: any) {
    super('div', {
      ...props,
      className: 'userCard',
      name: 'Andrey',
      avatar: props.avatar ?? '/src/assets/avatar-default.svg',
      events: {
        click: props.onClick,
      },
    });
  }

  public render(): string {
    return `
      <div class="userCard__avatar">
        <img src={{avatar}} alt="аватар пользователя">
        <p class="userCard__avatarHidden">Поменять аватар</p>
      </div>
      <p class="userCard__name">{{name}}</p>
   `;
  }
}
