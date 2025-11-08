import Block from '../../core/block';
import type { IUser } from '../../types';
import { connect } from '../../utils/connect';
import type { PlainObject } from '../../utils/isEqual';

interface IUserCard {
  onClick: () => void;
  user: IUser;
}

class UserCard extends Block {
  constructor(props: IUserCard) {
    super('div', {
      ...props,
      className: 'userCard',
      events: {
        click: props.onClick,
      },
    });
  }

  public render(): string {
    return `
      <div class="userCard__avatar">
        {{#if user.avatar}}
          <img src="https://ya-praktikum.tech/api/v2{{user.avatar}}" alt="аватар">
        {{else}}
          <img src="/src/assets/avatar-default.svg" alt="аватар">
        {{/if}}
        <p class="userCard__avatarHidden">Поменять аватар</p>
      </div>
      <p class="userCard__name">{{user.name}}</p>
   `;
  }
}

const mapStateToProps = (state: PlainObject) => {
  return {
    isLoading: state.isLoading,
    user: state.user,
  };
};

export default connect(mapStateToProps)(UserCard);
