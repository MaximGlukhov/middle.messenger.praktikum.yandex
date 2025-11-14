import type Router from '../core/router';
import type { Store } from '../core/store';

declare global {
  interface Window {
    router: Router;
    store: Store;
  }
}

export interface IUser {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string | null;
  login: string;
  avatar: string;
  email: string;
  phone: string;
}
