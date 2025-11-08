import type Block from './block';
import type { IRouteInterface } from './router';

interface RouteProps {
  rootQuery: string;
}

export interface BlockConstructor<T extends Block> {
  new (props: T extends Block<infer P> ? P : never): T;
}

class Route<T extends Block> implements IRouteInterface {
  private _pathname: string;
  private _blockClass: BlockConstructor<T>;
  private _block: T | null;
  private _props: RouteProps;

  constructor(pathname: string, view: BlockConstructor<T>, props: RouteProps) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  public navigate(pathname: string): void {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  public leave(): void {
    if (this._block) {
      // this._block.hide();
    }
  }

  public match(pathname: string): boolean {
    return pathname === this._pathname;
  }

  private _renderDom(query: string, block: T): void {
    const root = document.querySelector(query);
    if (root) {
      root.innerHTML = '';
      const content = block.getContent();
      if (content) root.append(content);
    }
  }

  public render(): void {
    if (!this._block) {
      this._block = new this._blockClass({} as T extends Block<infer P> ? P : never);
    }

    // this._block.show();
    if (this._block && this._props.rootQuery) {
      this._renderDom(this._props.rootQuery, this._block);
      this._block.componentDidMount?.();
    }
  }
}

export default Route;
