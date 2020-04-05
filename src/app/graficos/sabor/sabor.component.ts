import { Component, OnInit} from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { DataService } from 'src/app/services/data.service';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-sabor',
  templateUrl: './sabor.component.html',
  styleUrls: ['./sabor.component.css']
})
export class SaborComponent implements OnInit{
  sabor: string;
  Banana: string;
  Kiwwi: string;
  Naranja: string;
  
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  public pieChartLabels: Label[] = [['Banana'], ['Kiwwi'], 'Naranja'];
  public pieChartData: number[] = [8, 10, 2];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
    },
  ];

  constructor(private dataService: DataService) {
   }

  ngOnInit() {
    this.actualizarSabores();
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  changeLegendPosition() {
    this.pieChartOptions.legend.position = this.pieChartOptions.legend.position === 'left' ? 'top' : 'left';
  }

  async actualizarSabores() {
    (await this.dataService.contarCh('http://localhost:3000/api/Banana')).subscribe((resultado) => {
      localStorage.setItem('Banana', resultado.toString());
    });
    (await this.dataService.contarCh('http://localhost:3000/api/Kiwwi')).subscribe((resultado) => {
      localStorage.setItem('Kiwwi', resultado.toString());
    });
    (await this.dataService.contarCh('http://localhost:3000/api/Naranja')).subscribe((resultado) => {
      localStorage.setItem('Naranja', resultado.toString());
    });

    this.Banana = localStorage.getItem('Banana');
    this.Kiwwi = localStorage.getItem('Kiwwi');
    this.Naranja = localStorage.getItem('Naranja');

    await console.log(this.Banana,this.Kiwwi,this.Naranja);
  }


  actualizarS() {
    this.actualizarSabores();
    this.pieChartData = [ parseInt(this.Banana), parseInt(this.Kiwwi), parseInt(this.Naranja) ];
  }
}
