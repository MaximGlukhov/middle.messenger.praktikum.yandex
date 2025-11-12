import { Button } from '../../components';
import Block from '../../core/block';
import { ROUTER } from '../../const/routesPath';
import { withRouter } from '../../utils/withRouter';
import type Router from '../../core/router';

export interface INavProps {
  [key: string]: unknown;
  router?: Router;
}

interface INavChildren {
  [key: string]: unknown;
  Login: Block;
  Signin: Block;
  Settings: Block;
}

class Nav extends Block<INavProps, INavChildren> {
  constructor(props: Partial<INavProps>) {
    super('div', {
      ...props,
      Login: new Button({
        color: 'text',
        title: 'Login',
        onClick: () => props.router?.go(ROUTER.login),
      }),
      Signin: new Button({
        color: 'text',
        title: 'Signin',
        onClick: () => props.router?.go(ROUTER.signin),
      }),
      Settings: new Button({
        color: 'text',
        title: 'Profile',
        onClick: () => props.router?.go(ROUTER.settings),
      }),
      Messenger: new Button({
        color: 'text',
        title: 'Messenger',
        onClick: () => props.router?.go(ROUTER.messenger),
      }),
    });
  }
  render(): string {
    return `
      <main>
        <nav class="container nav">
          {{{Login}}}
          {{{Signin}}}
          {{{Settings}}}
          {{{Messenger}}}
        </nav>
      </main>
    `;
  }
}

export default withRouter(Nav);
