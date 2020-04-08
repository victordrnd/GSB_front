import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SocketService {
  newFraisEvent : Observable<any>;
  activeUsers : Observable<any>;
  fraisStatusChanged : Observable<any>
  constructor(private socket : Socket) {
     this.newFraisEvent = this.socket.fromEvent<any>('frais_created');
     this.activeUsers = this.socket.fromEvent<any>('users.connected');
     this.fraisStatusChanged = this.socket.fromEvent<any>('frais_status_change');
   }
}
