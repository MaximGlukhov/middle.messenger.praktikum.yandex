import sinon from 'sinon';
import { expect } from 'chai';
import { HTTPTransport, METHODS } from './httpTransport';

describe('http', () => {
  let fetch: HTTPTransport;

  beforeEach(() => {
    fetch = new HTTPTransport('auth');
  });

  it('GET запрос создаётся', () => {
    const stub = sinon.stub(fetch, 'request' as any);
    fetch.get('/profile');

    expect(stub.calledOnce).to.be.true;
    expect(stub.calledWith('https://ya-praktikum.tech/api/v2/auth/profile', { method: METHODS.GET })).to.be.true;
  });

  it('POST запрос создаётся', () => {
    const stub = sinon.stub(fetch, 'request' as any);
    fetch.post('/user');

    expect(stub.calledOnce).to.be.true;
    expect(stub.calledWith('https://ya-praktikum.tech/api/v2/auth/user', { method: METHODS.POST })).to.be.true;
  });

  it('PUT запрос создаётся', () => {
    const stub = sinon.stub(fetch, 'request' as any);
    fetch.put('/user');

    expect(stub.calledOnce).to.be.true;
    expect(stub.calledWith('https://ya-praktikum.tech/api/v2/auth/user', { method: METHODS.PUT })).to.be.true;
  });

  it('DELETE запрос создаётся', () => {
    const stub = sinon.stub(fetch, 'request' as any);
    fetch.delete('/user');

    expect(stub.calledOnce).to.be.true;
    expect(stub.calledWith('https://ya-praktikum.tech/api/v2/auth/user', { method: METHODS.DELETE })).to.be.true;
  });
});
