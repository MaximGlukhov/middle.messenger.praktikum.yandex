import { expect } from 'chai';
import sinon from 'sinon';
import { describe, it } from 'mocha';

import Route from './route';
import Router from './router';
import Block, { type BlockProps } from './block';

describe('Route', () => {
  let PageComponent: any;
  let router: Router;
  let sandbox: sinon.SinonSandbox;

  before(() => {
    class Page extends Block {
      constructor(props: BlockProps) {
        super('div', props);
      }

      render() {
        return `<div>
                      <span id="test-text">{{text}}</span>
                      <button>{{text-button}}</button>
                  </div>`;
      }
    }

    PageComponent = Page;
    router = new Router('#app');
    sandbox = sinon.createSandbox();
    (router as any).history = {
      pushState: sandbox.spy(),
      back: sandbox.spy(),
      forward: sandbox.spy(),
    };
  });

  it('use() должен добавлять маршруты', () => {
    router.use('/login', PageComponent);
    expect(router.routes.length).to.equal(1);
    expect(router.routes[0]).to.be.instanceOf(Route);
  });

  it('go() должен добавлять путь в history', () => {
    router.use('/login', PageComponent);
    const onRouteSpy = sandbox.spy(router, '_onRoute');

    router.go('/profile');

    expect((router as any).history.pushState.calledOnceWith({}, '', '/profile')).to.be.true;
    expect(onRouteSpy.calledOnceWith('/profile')).to.be.true;
  });

  it('back() должен вызывать history.back', () => {
    router.back();
    expect((router as any).history.back.calledOnce).to.be.true;
  });

  it('forward() должен вызывать history.forward', () => {
    router.forward();
    expect((router as any).history.forward.calledOnce).to.be.true;
  });
});
