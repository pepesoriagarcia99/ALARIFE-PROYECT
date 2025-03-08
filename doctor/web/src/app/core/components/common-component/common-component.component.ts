import { Component, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs';

@Component({ template: '' })
export class CommonComponent {
  /**
   * Destructor
   * @protected
   */
  protected destroy: Subject<void> = new Subject<void>();

  renderer?: Renderer2;

  enterListener?: () => void;

  /**
   * TODO: incluir el callback del intro en todos los editores
   */
  constructor(renderer?: Renderer2) {
    this.renderer = renderer;
  }

  onDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }

  /**
   * TODO: mapeador de eventos
   */
  addEnterListener(callback: () => void) {
    this.enterListener = this.renderer?.listen(
      'document',
      'keydown',
      (event) => {
        if (event.key === 'Enter') {
          callback();
        }
      }
    );
  }

  removeEnterListener() {
    if (this.enterListener) {
      this.enterListener();
    }
  }

  /**
   * TODO: mapeador de promesas
   */

  promiseMap = new Map<string, Promise<any>>();

  addPromise(key: string, promise: Promise<any>) {
    const oldPromise = this.promiseMap.get(key);
    if (oldPromise) {
      // oldPromise.unsubscribe();
    }

    this.promiseMap.set(key, promise);
  }
}
