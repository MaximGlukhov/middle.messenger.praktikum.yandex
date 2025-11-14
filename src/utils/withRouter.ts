import type { BlockProps } from '../core/block';
import type Block from '../core/block';

export function withRouter<P extends BlockProps>(WrappedBlock: new (props: P) => Block) {
  return class extends WrappedBlock {
    constructor(props: P) {
      super({ ...props, router: window.router });
    }
  };
}
