import { Injectable } from '@angular/core';
import { Alert, alertType } from '../model/Alert.model';
import { Subject } from 'rxjs';
import { generateId } from '../utils/object';

@Injectable({
  providedIn: 'root',
})
export class AlertService {

  alerts: Array<Alert>;

  #eventNewAlert: Subject<void>;

  constructor() {
    this.alerts = [];
    this.#eventNewAlert = new Subject<void>();
  }

  createAlert(type: alertType, message: string) {
    const alert: Alert = { 
      id: generateId(),
      type, 
      message 
    };

    this.alerts.push(alert);

    setTimeout(() => {
      const index = this.alerts.findIndex((a) => a.id === alert.id);
      this.closeAlert(index);
    }, 5000);

    this.#eventNewAlert.next();
  }

  closeAlert(index: number) {
    this.alerts.splice(index, 1);

    this.#eventNewAlert.next();
  }

  get changeAlert() {
    return this.#eventNewAlert.asObservable();
  }
}
