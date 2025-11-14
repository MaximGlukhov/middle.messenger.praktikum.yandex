import { nanoid } from 'nanoid';
import Handlebars from 'handlebars';
import EventBus from './eventBus';

export type BlockProps = Record<string, Block | Block[] | unknown>;
export default abstract class Block<Props extends Record<string, unknown> = {}, Children extends BlockProps = {}> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  } as const;

  private _id = nanoid(6);
  private _element: HTMLElement;
  private _meta: { tagName: string; props: Props };
  private _eventBus: EventBus<string>;

  props: Props;
  children: Children;

  constructor(tagName = 'div', propsWithChildren: Record<string, unknown> = {}) {
    const eventBus = new EventBus<string>();
    this._eventBus = eventBus;

    const { props, children } = this._getChildrenAndProps(propsWithChildren);
    this.children = children as Children;

    this._meta = {
      tagName,
      props: props as Props,
    };

    this._element = this._createDocumentElement(tagName);
    this.props = this._makePropsProxy(props);

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  private _registerEvents(eventBus: EventBus<string>) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _createResources() {
    const { tagName, props } = this._meta;
    this._element = this._createDocumentElement(tagName);

    if (typeof props.className === 'string') {
      this._element.classList.add(...props.className.split(' '));
    }

    if (props.attrs && typeof props.attrs === 'object') {
      Object.entries(props.attrs as Record<string, string>).forEach(([attr, value]) => {
        this._element.setAttribute(attr, value);
      });
    }
  }

  protected init() {
    this._createResources();
    this._eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  private _getChildrenAndProps(propsAndChildren: Record<string, unknown>) {
    const children: Record<string, unknown> = {};
    const props: Record<string, unknown> = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        if (value.every((v) => v instanceof Block)) {
          children[key] = value;
        } else {
          props[key] = value;
        }
      } else if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { children, props };
  }

  private _componentDidMount() {
    this.componentDidMount();

    Object.values(this.children).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((c) => c instanceof Block && c.dispatchComponentDidMount());
      } else if (child instanceof Block) {
        child.dispatchComponentDidMount();
      }
    });
  }

  componentDidMount(_oldProps?: Props): void {}

  dispatchComponentDidMount() {
    this._eventBus.emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate(oldProps: Props, newProps: Props) {
    const shouldRender = this.componentDidUpdate(oldProps, newProps);
    if (shouldRender) {
      this._render();
    }
  }

  componentDidUpdate(_oldProps: Props, _newProps: Props): boolean {
    return true;
  }

  setProps(nextProps: Partial<Props>) {
    if (!nextProps) return;
    Object.assign(this.props, nextProps);
  }

  get element(): HTMLElement {
    return this._element;
  }

  private _addEvents() {
    const { events = {} } = this.props as { events?: Record<string, EventListener> };
    Object.entries(events).forEach(([eventName, listener]) => {
      this._element.addEventListener(eventName, listener);
    });
  }

  private _removeEvents() {
    const { events = {} } = this.props as { events?: Record<string, EventListener> };
    Object.entries(events).forEach(([eventName, listener]) => {
      this._element.removeEventListener(eventName, listener);
    });
  }

  private _compile(): DocumentFragment {
    const propsAndStubs = { ...this.props } as Record<string, unknown>;

    Object.entries(this.children).forEach(([key, child]) => {
      if (Array.isArray(child)) {
        propsAndStubs[key] = child.map((component) =>
          component instanceof Block ? `<div data-id="${component._id}"></div>` : ''
        );
      } else if (child instanceof Block) {
        propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
      } else {
        propsAndStubs[key] = '';
      }
    });

    const template = Handlebars.compile(this.render());
    const fragment = this._createDocumentElement('template') as HTMLTemplateElement;
    fragment.innerHTML = template(propsAndStubs);

    Object.values(this.children).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((component) => {
          if (component instanceof Block) {
            const stub = fragment.content.querySelector(`[data-id="${component._id}"]`);
            stub?.replaceWith(component.getContent());
          }
        });
      } else if (child instanceof Block) {
        const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
        stub?.replaceWith(child.getContent());
      }
    });

    return fragment.content;
  }

  private _render() {
    this._removeEvents();
    const block = this._compile();

    if (this._element.children.length === 0) {
      this._element.appendChild(block);
    } else {
      this._element.replaceChildren(block);
    }

    this._addEvents();
  }

  protected render(): string {
    return '';
  }

  getContent(): HTMLElement {
    return this._element;
  }

  private _makePropsProxy(props: Record<string, unknown>): Props {
    const emit = this._eventBus.emit.bind(this._eventBus);

    return new Proxy(props, {
      get(target, prop: string) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target, prop: string, value) {
        const oldProps = { ...target } as Props;
        target[prop] = value;
        emit(Block.EVENTS.FLOW_CDU, oldProps, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа к удалению свойств');
      },
    }) as Props;
  }

  private _createDocumentElement(tagName: string): HTMLElement {
    return document.createElement(tagName);
  }

  show() {
    this._element.style.display = 'block';
  }

  hide() {
    this._element.style.display = 'none';
  }
}
