import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { TempI } from 'src/app/models/temperatura.interface';
import { ApiService } from 'src/app/services/api.service';
import { interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators'

@Component({
  selector: 'app-graficas',
  templateUrl: './graficas.component.html',
  styleUrls: ['./graficas.component.css']
})
export class GraficasComponent implements OnInit {

  multi: any[] = [];
  multi1: any[] = [];
  view: any = [700, 300];
  datos_temperatura: TempI[] = [];
  datos_humedad: any = [];
  public array1: Array<any> = []

  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'tiempo';
  yAxisLabel: string = 'Temperatura';
  timeline: boolean = true;




  colorScheme: any = {
    domain: ['#FFEB3B', '#8F3985' ]
  };



  constructor(private api: ApiService) {
    this.multi =
      [{
        "name": "Temperatura",
        "series": [

        ]
      },
      {
        "name": "Humedad",
        "series": [

        ]
      },{
        "name": "Pueba",
        "series": [{
          "name" : 2002,
          "value" : 75
        }
          
        ]
      }
      ]
  }

  ngOnInit(): void {
    this.getTemps();
    const contador = interval(5000)
    contador.pipe(takeWhile(() => !stop))
    contador.subscribe(() => {
      this.getTemps();
    });
  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Active', JSON.parse(JSON.stringify(data)));
  }
  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }



  async getTemps() {
    await this.api.getTemperature().subscribe((data: any) => {
      this.array1 = data;
      const valor1 = this.multi[0];
      const valor2 = this.multi[1];
      var fecha = 2000;
      for (let i = 0; i < this.array1.length; i++) {        
        let a1 = {
          "name": fecha + 1,
          "value": this.array1[i]['temp']
        }
        fecha = fecha + 1;
        /*this.multi[0].series["name"] = valor1.series.concat(1990 + i);*/
        this.multi[0].series = valor1.series.concat(a1)
      }
      var fecha = 2000;
      for (let i = 0; i < this.array1.length; i++) {        
        let a2 = {
          "name": fecha + 1,
          "value": this.array1[i]['humd']
        }
        fecha = fecha + 1;
        this.multi[1].series = valor2.series.concat(a2)
      }
      
      
      this.multi = [...this.multi ]
    });
  }

  /*
  <span *ngFor="let data of data_temp">
                                                <p>{{data.id_t}}</p>
                                                <p>{{data.temp}}</p>
                                                <p>{{data.humd}}</p>

                                                


                                            </span>
  */

}
