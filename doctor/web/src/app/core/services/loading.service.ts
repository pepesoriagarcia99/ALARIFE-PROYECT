import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  /**
   * Carga general de la aplicación
   */
  #loadingSubject = new BehaviorSubject<boolean>(false);

  constructor() {
  }

  getLoading() {
    return this.#loadingSubject.asObservable();
  }

  setLoading(loading: boolean) {
    setTimeout(() => {
      this.#loadingSubject.next(loading);
    });
  }
}
