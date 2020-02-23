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
  lineChartData : ChartDataSets[] = [{data : [1,4,5,1,3,7,10], label : "Stock"}];
  lineChartLabels;
  constructor(private fraisService : FraisService) { }

  stats
  async ngOnInit() {
    this.stats = await this.fraisService.stats().toPromise();
  }


  public lineChartOptions: (ChartOptions) = {
    responsive: true,
    maintainAspectRatio: true,
    title : {
      display :true,
      text : 'Variation du stock',
      fontColor : 'black'
    },
    scales: {
      xAxes: [{
        display: true,
        gridLines : {color :'rgba(0,0,0,0.09)', zeroLineColor : 'transparent'},
        ticks :{
          fontColor : 'black'
        }
      }],
      yAxes: [
        {
          gridLines: { color: 'transparent', drawTicks: false, zeroLineColor : 'black' },
          display: true,
          ticks: {
            beginAtZero: true,
            fontColor : 'black',
            stepSize : 50
          }
          
        }
      ]
    }
  };
  public lineChartColors : Color[] = [
    {
      backgroundColor: '#7a62ff',
      borderColor: '#fff',
      
    }
  ];
  
  public lineChartLegend = false;
  public lineChartType = 'line';


}
