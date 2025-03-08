import { Component } from '@angular/core';
import { AlertService } from '../../services/alert.service';
import { Alert } from '../../model/Alert.model';

@Component({
  selector: 'nt-alert',
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss'
})
export class AlertComponent {
  alerts: Array<Alert>;

  alertStyles: any = {
    success: {
      marked: 'bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900',
      icon: 'check_circle'
    },
    warning: {
      marked: 'bg-amber-100 border-t-4 border-amber-500 rounded-b text-amber-900',
      icon: 'warning'
    },
    danger: {
      marked: 'bg-red-100 border-t-4 border-red-500 rounded-b text-red-900',
      icon: 'error'
    },
    info: {
      marked: 'bg-slate-100 border-t-4 border-slate-500 rounded-b text-slate-900',
      icon: 'info'
    }
  };

  constructor(private _alertService: AlertService) {
    this.alerts = [];

    this._alertService.changeAlert.subscribe(() => {
      this.alerts = this._alertService.alerts;
    });
  }

  getMarkedStyle(type: string) {
    return this.alertStyles[type].marked;
  }

  close(index: number) {
    this._alertService.closeAlert(index);
  }
}
