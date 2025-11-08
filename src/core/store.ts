import type { BlockProps } from './block';
import EventBus from './eventBus';

export enum StoreEvents {
  Updated = 'Updated',
}

export class Store extends EventBus<string> {
  private state = {};
  static __instance: Store | null = null;

  constructor(defaultState: Record<string, unknown>) {
    if (Store.__instance) {
      return Store.__instance;
    }
    super();

    this.set(defaultState);

    Store.__instance = this;
  }

  public getState() {
    return this.state;
  }

  public set(nextState: BlockProps) {
    const prevState = { ...this.state };

    this.state = { ...this.state, ...nextState };

    this.emit(StoreEvents.Updated, prevState, nextState);
  }
}
