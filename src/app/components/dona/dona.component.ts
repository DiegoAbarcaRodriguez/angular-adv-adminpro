import { Component, Input } from '@angular/core';
import { ChartData } from 'chart.js';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent {
  @Input() title: string = 'Sin titulo'

  @Input('labels') public doughnutChartLabels: string[] = [
    'Download Sales',
    'In-Store Sales',
    'Mail-Order Sales',
  ];
 @Input('data') public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: [350, 450, 100] },
    ],
  };


}
