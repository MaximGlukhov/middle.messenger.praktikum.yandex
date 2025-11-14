import { getUserData } from '../../actions/auth';
import Block from '../../core/block';
import { connect } from '../../utils/connect';
import type { PlainObject } from '../../utils/isEqual';
import { ProfilePage } from '../profile';
import { ProfileEditPage } from '../profileEdit';
import { ProfileEditPasswordPage } from '../profileEditPassword';

interface ISettingsProps {
  showProfile: boolean;
  showEditData: boolean;
  showEditPassword: boolean;
  [key: string]: unknown;
}

interface ISettingsChildren {
  ProfilePage: Block;
  ProfileEditPage: Block;
  ProfileEditPasswordPage: Block;
  [key: string]: unknown;
}

class SettingsPage extends Block<ISettingsProps, ISettingsChildren> {
  constructor(props: Partial<ISettingsProps>) {
    super('main', {
      ...props,
      showProfile: true,
      showEditData: false,
      showEditPassword: false,
      ProfilePage: new ProfilePage({
        onRouteEditData: () => {
          this.setProps({ ...this.props, showProfile: false, showEditPassword: false, showEditData: true });
        },
        onRouteEditPassword: () => {
          this.setProps({ ...this.props, showProfile: false, showEditData: false, showEditPassword: true });
        },
      }),
      ProfileEditPage: new ProfileEditPage({
        onRoutProfile: () => {
          this.setProps({ ...this.props, showProfile: true, showEditData: false, showEditPassword: false });
        },
      }),
      ProfileEditPasswordPage: new ProfileEditPasswordPage({
        onRoutProfile: () => {
          this.setProps({ ...this.props, showProfile: true, showEditData: false, showEditPassword: false });
        },
      }),
    });
  }

  public componentDidMount(_oldProps?: {} | undefined): void {
    getUserData();
  }

  public render(): string {
    return `
      {{#if showProfile}}
        {{{ProfilePage}}}
      {{/if}}

      {{#if showEditData}}
        {{{ProfileEditPage}}}
      {{/if}}

      {{#if showEditPassword}}
        {{{ProfileEditPasswordPage}}}
      {{/if}}
    `;
  }
}

const mapStateToProps = (state: PlainObject) => {
  return {
    isLoading: state.isLoading,
    user: state.user,
  };
};

export default connect(mapStateToProps)(SettingsPage);
