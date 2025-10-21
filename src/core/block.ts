import { nanoid } from 'nanoid';
import Handlebars from 'handlebars';

import EventBus from './eventBus';

export default class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  _id = nanoid(6);

  props: Record<string, any>;
  children: Record<string, any>;
  eventBus: () => EventBus<string>;

  _element: HTMLElement = document.createElement('div');
  _meta: Record<string, any>;
  _eventBus: any;

  constructor(tagName = 'div', propsWithChildren = {}) {
    const eventBus = new EventBus();
    this.eventBus = () => eventBus;

    const { props, children } = this._getChildrenAndProps(propsWithChildren);
    this.children = children;

    this._meta = {
      tagName,
      props,
    };

    this.props = this._makePropsProxy(props);

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  _registerEvents(eventBus: EventBus<string>) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _createResources() {
    const { tagName, props } = this._meta;
    this._element = this._createDocumentElement(tagName);
    if (typeof props.className === 'string') {
      const classes = props.className.split(' ');
      this._element.classList.add(...classes);
    }

    if (typeof props.attrs === 'object') {
      Object.entries(props.attrs).forEach(([attrName, attrValue]) => {
        this._element?.setAttribute(attrName, attrValue as any);
      });
    }
  }

  init() {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  _getChildrenAndProps(propsAndChildren: { [s: string]: unknown } | ArrayLike<unknown>) {
    const children: Record<string, unknown> = {};
    const props: Record<string, unknown> = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((obj) => {
          if (obj instanceof Block) {
            children[key] = value;
          } else {
            props[key] = value;
          }
        });

        return;
      }
      if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { children, props };
  }

  _componentDidMount() {
    this.componentDidMount();

    Object.values(this.children).forEach((child) => {
      child.dispatchComponentDidMount();
    });
  }

  componentDidMount(_oldProps?: undefined) {}

  dispatchComponentDidMount() {
    this._eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidUpdate(oldProps: any, newProps: any) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this._render();
  }

  componentDidUpdate(_oldProps: any, _newProps: any) {
    return true;
  }

  setProps = (nextProps: Record<string, any>) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  _addEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) => {
      this._element?.addEventListener(eventName, events[eventName]);
    });
  }

  _removeEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) => {
      this._element?.removeEventListener(eventName, events[eventName]);
    });
  }

  _compile() {
    const propsAndStubs = { ...this.props };

    Object.entries(this.children).forEach(([key, child]) => {
      if (Array.isArray(child)) {
        propsAndStubs[key] = child.map((component) => `<div data-id="${component._id}"></div>`);
      } else {
        propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
      }
    });

    const fragment = this._createDocumentElement('template');
    const template = Handlebars.compile(this.render());
    fragment.innerHTML = template(propsAndStubs);

    Object.values(this.children).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((component) => {
          const stub = (fragment as HTMLTemplateElement).content.querySelector(`[data-id="${component._id}"]`);

          stub?.replaceWith(component.getContent());
        });
      } else {
        const stub = (fragment as HTMLTemplateElement).content.querySelector(`[data-id="${child._id}"]`);

        stub?.replaceWith(child.getContent());
      }
    });

    return (fragment as HTMLTemplateElement).content;
  }

  _render() {
    this._removeEvents();
    const block = this._compile();

    if (this._element?.children.length === 0) {
      this._element.appendChild(block);
    } else {
      this._element?.replaceChildren(block);
    }

    this._addEvents();
  }

  render() {
    return '';
  }

  getContent() {
    return this.element;
  }

  _makePropsProxy(props: any) {
    const eventBus = this.eventBus();
    const emitBind = eventBus.emit.bind(eventBus);

    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target, prop, value) {
        const oldTarget = { ...target };
        target[prop] = value;
        emitBind(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    });
  }

  _createDocumentElement(tagName: string) {
    return document.createElement(tagName);
  }

  show() {
    this.getContent().style.display = 'block';
  }

  hide() {
    this.getContent().style.display = 'none';
  }
}
