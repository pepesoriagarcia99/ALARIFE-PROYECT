import {
  HttpClient,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { AlertService } from './alert.service';
import { alertType } from '../model/Alert.model';

interface Options {
  headers?: HttpHeaders;
  params?: HttpParams;
}

@Injectable({
  providedIn: 'root',
})
export class HttpCommon {
  #apiUrl: string | undefined;

  constructor(private http: HttpClient, private _alertService: AlertService) {
    this.#apiUrl = 'localhost:8088';
  }

  get<T>(endpoint: string, options?: Options, showAlert: boolean = true): Observable<T> {
    return this.http.get<T>(`http://${this.#apiUrl}${endpoint}`, options).pipe(
      catchError((res) => {
        if(showAlert) {
          this._alertService.createAlert(alertType.danger, res.error.message || 'Error desconocido');
        }

        return throwError(() => res);
      })
    );
  }

  post<T>(endpoint: string, data: any, options?: Options): Observable<T> {
    return this.http.post<T>(`http://${this.#apiUrl}${endpoint}`, data, options).pipe(
      catchError((res) => {
        this._alertService.createAlert(alertType.danger, res.error.message || 'Error desconocido');
        return throwError(() => res);
      })
    );
  }

  put<T>(endpoint: string, data: any, options?: Options): Observable<T> {
    return this.http.put<T>(`http://${this.#apiUrl}${endpoint}`, data, options).pipe(
      catchError((res) => {
        this._alertService.createAlert(alertType.danger, res.error.message || 'Error desconocido');
        return throwError(() => res);
      })
    );
  }

  delete<T>(endpoint: string, options?: Options): Observable<T> {
    return this.http.delete<T>(`http://${this.#apiUrl}${endpoint}`, options).pipe(
      catchError((res) => {
        this._alertService.createAlert(alertType.danger, res.error.message || 'Error desconocido');
        return throwError(() => res);
      })
    );
  }
}
