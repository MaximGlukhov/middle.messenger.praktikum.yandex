import type Block from './block';
import Route, { type BlockConstructor } from './route';

export interface IRouteInterface {
  render: (route: IRouteInterface, pathname: string) => void;
  match: (path: string) => boolean;
  leave: () => void;
}

class Router {
  public routes: IRouteInterface[] = [];
  private _rootQuery: string | undefined;
  history: History | undefined;
  _currentRoute: IRouteInterface | null | undefined;
  static __instance: Router | null;

  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;

    Router.__instance = this;
  }

  use(pathname: string, block: BlockConstructor<Block> | any) {
    if (this._rootQuery) {
      const route = new Route(pathname, block, { rootQuery: this._rootQuery });
      this.routes.push(route);
    }
    return this;
  }

  start(): void {
    window.onpopstate = (event: PopStateEvent): void => {
      const location = (event.currentTarget as Window | null)?.location;
      if (location) {
        this._onRoute(location.pathname);
      }
    };

    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string) {
    const route = this.getRoute(pathname);

    if (!route) {
      return;
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route.render(route, pathname);
  }

  go(pathname: string) {
    this.history?.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  back() {
    this.history?.back();
  }

  forward() {
    this.history?.forward();
  }

  getRoute(pathname: string) {
    const route = this.routes.find((item) => item.match(pathname));
    if (!route) {
      return this.routes.find((item) => item.match('*'));
    }
    return route;
  }
}

export default Router;
