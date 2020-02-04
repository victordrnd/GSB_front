import { Component, OnInit } from '@angular/core';
import { FraisService } from 'src/app/core/services/frais.service';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  lineChartData : ChartDataSets[] = [{data : [1,4,5], label : "Stock"}];
  lineChartLabels;
  constructor(private fraisService : FraisService) { }

  stats
  async ngOnInit() {
    this.stats = await this.fraisService.stats().toPromise();
  }


  public lineChartOptions: (ChartOptions) = {
    responsive: true,
    maintainAspectRatio: false,
    title : {
      display :true,
      text : 'Variation du stock',
      fontColor : 'white'
    },
    scales: {
      xAxes: [{
        display: true,
        gridLines : {color :'rgba(255,255,255,0.09)', zeroLineColor : 'transparent'},
        ticks :{
          fontColor : 'white'
        }
      }],
      yAxes: [
        {
          gridLines: { color: 'transparent', drawTicks: false, zeroLineColor : '#ffffff44' },
          display: true,
          ticks: {
            beginAtZero: true,
            fontColor : 'white',
            stepSize : 50
          }
          
        }
      ]
    }
  };
  public lineChartColors : Color[] = [
    {
      backgroundColor: 'rgba(255,255,255,0.1)',
      borderColor: '#fff',
      
    }
  ];
  
  public lineChartLegend = false;
  public lineChartType = 'line';


}
