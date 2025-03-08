import { Component } from '@angular/core';
import { LoadingService } from './core/services/loading.service';
import { SocketService } from './core/services/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(
    public loadingService: LoadingService,
    private _socketService: SocketService
  ) {
    this._socketService.connect('localhost:8088');
  }
}
