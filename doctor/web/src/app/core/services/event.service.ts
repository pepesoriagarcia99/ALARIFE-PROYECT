import { Injectable } from '@angular/core';
import { HttpCommon } from './httpCommon.service';
import { Observable } from 'rxjs';
import { MonitorEvent } from '../model/Event';

@Injectable({
  providedIn: 'root',
})
export class EventService {

  constructor(
    private http: HttpCommon
  ) {}

  getEvents(): Observable<MonitorEvent[]> {
    return this.http.get('/api/event');
  }
}
