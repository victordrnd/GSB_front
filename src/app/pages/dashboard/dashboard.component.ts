import { Component, OnInit, OnDestroy } from '@angular/core';
import { FraisService } from 'src/app/core/services/frais.service';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { SocketService } from 'src/app/core/services/socket.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  constructor(private fraisService: FraisService, private socketService : SocketService) { }

  data : Array<any>
  colorScheme = {
    domain: ['#D77DFF', '#A472E8', '#9B89FF', '#7280E8', '#7DAFFF']
  };
  stats

  _fraisSub;

  async ngOnInit() {
    this.getData();
    this._fraisSub = this.socketService.newFraisEvent.subscribe(ev => {
      this.getData();
      console.log(ev);
      new Notification('Nouveau frais', {
        body: 'Un nouveau frais a été crée'
      })
    });

    this.socketService.fraisStatusChanged.subscribe(ev => {
      this.getData();
    });
  }


  async getData(){
    this.stats = await this.fraisService.stats().toPromise();
    this.data = await this.fraisService.groupByType().toPromise();
  }

  ngOnDestroy() {
    this._fraisSub.unsubscribe();
  }

  
}
