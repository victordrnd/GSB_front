import { Component, OnInit } from '@angular/core';
import { FraisService } from 'src/app/core/services/frais.service';
import { ChartDataSets, ChartOptions } from 'chart.js';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  lineChartData: ChartDataSets[] = [{ data: [1, 4, 5, 1, 3, 7, 10], label: "Stock" }];
  lineChartLabels;
  constructor(private fraisService: FraisService) { }
  data : Array<any>
  colorScheme = {
    domain: ['#D77DFF', '#A472E8', '#9B89FF', '#7280E8', '#7DAFFF']
  };
  stats


  async ngOnInit() {
    this.stats = await this.fraisService.stats().toPromise();
    this.data = await this.fraisService.groupByType().toPromise();
  }


  
}
