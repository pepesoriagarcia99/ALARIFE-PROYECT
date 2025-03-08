import { Injectable } from '@angular/core';
import { Socket, SocketIoConfig } from 'ngx-socket-io';
import { Observable } from 'rxjs';

export enum SocketEvent {
  signout = 'signout',
}

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket!: Socket;

  constructor() {}

  connect(url: string): void {
    if (this.socket) {
      this.socket.disconnect();
    }

    const config: SocketIoConfig = {
      url: 'http://' + url + '/event',
      options: {
        path: '/socket.io',
        transports: ['websocket'], 
        upgrade: false, 
      },
    };
    this.socket = new Socket(config);
    this.socket.connect();
  }

  onEvent(namespace: string): Observable<string> {
    return this.socket.fromEvent<string>(namespace);
  }
}
